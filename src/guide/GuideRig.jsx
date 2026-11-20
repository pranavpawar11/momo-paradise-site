import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { guideStore, guidePos, guideApi } from './store.js';
import { gestureAngles } from './gestures.js';
import { SECTION_LINES } from '../config/characterDialogue.js';
import { prefersReducedMotion } from '../lib/scroll.js';

export const MODEL_URL = `${import.meta.env.BASE_URL}models/guide.glb`;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t * t * (3 - 2 * t);
const AXES = { x: new THREE.Vector3(1, 0, 0), z: new THREE.Vector3(0, 0, 1) };
const qParent = new THREE.Quaternion();
const qBone = new THREE.Quaternion();
const qDelta = new THREE.Quaternion();

// Rotate a bone around a WORLD axis, independent of the bone's local axes.
function rotateWorld(bone, axis, angle) {
  if (!bone || !angle) return;
  bone.parent.getWorldQuaternion(qParent);
  bone.getWorldQuaternion(qBone);
  qDelta.setFromAxisAngle(axis, angle);
  qBone.premultiply(qDelta);
  bone.quaternion.copy(qParent.invert().multiply(qBone));
  bone.updateMatrixWorld(true);
}

/**
 * The 3D delivery-boy guide.
 * - In the hero he stands on the stage (#hero-stage) and waves.
 * - Scrolling past the hero, he walks to the left side of the screen and walks in place while you scroll.
 * - Each section (marked with data-guide) triggers short speech bubbles and gestures.
 */
export default function GuideRig() {
  const { scene, animations } = useGLTF(MODEL_URL);
  const { camera, size, invalidate, gl } = useThree();
  const pivot = useRef(null);
  const run = useRef({ ready: false });

  // Orthographic camera in viewport pixels (origin bottom-left).
  useEffect(() => {
    camera.left = 0;
    camera.right = size.width;
    camera.top = size.height;
    camera.bottom = 0;
    camera.near = -3000;
    camera.far = 3000;
    camera.position.set(0, 0, 500);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size, invalidate]);

  // Set up bones, animation mixer, size measurement and speech logic.
  useEffect(() => {
    const bones = {};
    let skinned = null;
    scene.traverse((o) => {
      if (o.isBone) bones[o.name.replace(/^mixamorig:?/, '')] = o;
      if (o.isSkinnedMesh) {
        skinned = o;
        o.frustumCulled = false;
      }
    });
    const idleClip = animations.find((a) => a.name === 'Idle');
    const walkClip = animations.find((a) => a.name === 'Walk');
    if (!skinned || !idleClip || !walkClip) {
      guideStore.set({ failed: true });
      return undefined;
    }

    // Reset first: React StrictMode runs this effect twice in development.
    scene.position.set(0, 0, 0);
    scene.updateMatrixWorld(true);

    // Keep the painted face crisp at oblique angles.
    const faceMap = skinned.material?.map;
    if (faceMap) {
      faceMap.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
      faceMap.needsUpdate = true;
    }

    const mixer = new THREE.AnimationMixer(scene);
    const idle = mixer.clipAction(idleClip);
    const walk = mixer.clipAction(walkClip);
    idle.play();
    walk.play();
    idle.setEffectiveWeight(1);
    walk.setEffectiveWeight(0);
    walk.timeScale = 1.15;
    mixer.update(0);
    scene.updateMatrixWorld(true);

    // Measure the real animated size so the feet always sit on the ground.
    let minY = Infinity, maxY = -Infinity, minX = Infinity, maxX = -Infinity;
    const pos = skinned.geometry.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i += 5) {
      skinned.getVertexPosition(i, v);
      v.applyMatrix4(skinned.matrixWorld);
      minY = Math.min(minY, v.y); maxY = Math.max(maxY, v.y);
      minX = Math.min(minX, v.x); maxX = Math.max(maxX, v.x);
    }
    scene.position.set(-(minX + maxX) / 2, -minY, 0);

    const state = run.current;
    Object.assign(state, {
      ready: true, bones, mixer, idle, walk, height: maxY - minY,
      walkAmt: 0, face: 1, yaw: 0, prevCx: 0, lastY: window.scrollY, blend: 0,
      gesture: '', curSec: -1, curKey: '', msgI: 0, tops: [], keys: [], bubbleId: 0,
      holdUntil: 0, hideT: 0, cycleT: 0,
    });

    // --- speech bubbles ---
    const pop = (text, gesture) => {
      clearTimeout(state.hideT);
      state.gesture = gesture || '';
      guideStore.set({ bubble: { id: ++state.bubbleId, text } });
      state.hideT = setTimeout(() => {
        guideStore.set({ bubble: null });
        state.gesture = '';
      }, 4800);
    };
    const cycle = () => {
      clearTimeout(state.cycleT);
      const lines = SECTION_LINES[state.curKey];
      if (!lines || state.curSec < 0) return;
      if (Date.now() > state.holdUntil) {
        const [text, gesture] = lines[state.msgI % lines.length];
        pop(text, gesture);
      }
      state.msgI += 1;
      state.cycleT = setTimeout(cycle, 6400);
    };
    state.cycle = cycle;
    state.stopSpeech = () => {
      clearTimeout(state.hideT);
      clearTimeout(state.cycleT);
      state.gesture = '';
      guideStore.set({ bubble: null });
    };
    guideApi.say = (text, gesture) => {
      state.holdUntil = Date.now() + 5200;
      pop(text, gesture);
    };

    // --- section map (cached; sections are marked with data-guide) ---
    const refresh = () => {
      const secs = [...document.querySelectorAll('[data-guide]')];
      state.tops = secs.map((s) => s.offsetTop);
      state.keys = secs.map((s) => s.dataset.guide);
    };
    refresh();
    const refreshTimer = setInterval(refresh, 900);
    window.addEventListener('resize', refresh);

    // --- never cover form fields ---
    const onFocusIn = (e) => e.target.closest?.('form') && guideStore.set({ away: true });
    const onFocusOut = () => guideStore.set({ away: false });
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    guideStore.set({ modelReady: true, failed: false });
    invalidate();

    return () => {
      state.ready = false;
      state.stopSpeech();
      guideApi.say = null;
      clearInterval(refreshTimer);
      window.removeEventListener('resize', refresh);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      mixer.stopAllAction();
      guideStore.set({ modelReady: false });
    };
  }, [scene, animations, invalidate, gl]);

  useFrame((frame, delta) => {
    const s = run.current;
    if (!s.ready) return;
    const heroEl = document.getElementById('top');
    const stageEl = document.getElementById('hero-stage');
    if (!heroEl || !stageEl) return;

    const dt = Math.min(delta, 0.1);
    const t = frame.clock.elapsedTime;
    const reduced = prefersReducedMotion();
    const g = guideStore.get();
    const vh = window.innerHeight, vw = window.innerWidth, sy = window.scrollY;

    // Layout: phones keep him bottom-left, desktops use the left gutter.
    const mobile = vw < 760;
    const gh = mobile ? clamp(vh * 0.22, 112, 150) : clamp(vh * 0.3, 170, 260);
    const tt = clamp(sy / (heroEl.offsetHeight * 0.55), 0, 1);
    const e = ease(tt);
    const gw = gh * 0.5;
    const gutter = (vw - 1080) / 2;
    const sideX = mobile ? 8 + gw / 2 : gutter > gw + 24 ? gutter / 2 : 8 + gw / 2;
    const groundY = vh - 8;
    const hr = stageEl.getBoundingClientRect();
    const H = lerp(hr.height * 0.8, gh, e);
    const cx = lerp(hr.left + hr.width * 0.3, sideX, e);
    const feet = lerp(hr.bottom - 6, groundY, e);

    // Facing + walking
    const dxm = cx - s.prevCx;
    s.prevCx = cx;
    if (Math.abs(dxm) > 0.4) s.face = dxm > 0 ? 1 : -1;
    if (tt >= 0.99) s.face = 1;
    const sp = Math.abs(sy - s.lastY);
    s.lastY = sy;
    const moving = tt > 0.02 && sp > 0.5;
    s.walkAmt = lerp(s.walkAmt, moving ? 1 : 0, moving ? 0.35 : 0.15);

    guidePos.x = cx;
    guidePos.top = feet - H;
    guidePos.h = H;

    // Speech: starts instantly when a section becomes active.
    const show = g.enabled && !g.away && tt >= 0.99;
    let active = 0;
    s.tops.forEach((top, i) => { if (top <= sy + vh / 2) active = i; });
    if (!show) {
      if (s.curSec !== -1) {
        s.curSec = -1;
        s.stopSpeech();
      }
    } else if (active !== s.curSec && SECTION_LINES[s.keys[active]]) {
      s.curSec = active;
      s.curKey = s.keys[active];
      s.msgI = 0;
      s.cycle();
    }

    // Animation: blend idle/walk, then add the gesture on top.
    pivot.current.visible = tt < 0.99 || (g.enabled && !g.away);
    s.walk.setEffectiveWeight(s.walkAmt);
    s.idle.setEffectiveWeight(1 - s.walkAmt);
    s.mixer.update(reduced ? 0 : dt);
    scene.updateMatrixWorld(true);

    const gesture = tt < 0.04 ? g.heroGesture : s.gesture;
    s.blend = lerp(s.blend, gesture && s.walkAmt < 0.4 ? 1 : 0, 0.12);
    if (s.blend > 0.02) {
      gestureAngles(gesture, t, reduced).forEach(([bone, axis, angle]) =>
        rotateWorld(s.bones[bone], AXES[axis], angle * s.blend));
    }

    const targetYaw = s.walkAmt > 0.3 ? s.face * 1.35 : tt < 0.5 ? 0.12 : mobile ? 0.35 : 0.4;
    s.yaw = lerp(s.yaw, targetYaw, 0.18);
    const hop = gesture === 'celebrate' && !reduced ? Math.abs(Math.sin(t * 8)) * 0.07 * H * s.blend : 0;
    const p = pivot.current;
    p.position.set(cx, vh - feet + hop, 0);
    p.scale.setScalar(H / s.height);
    p.rotation.y = s.yaw;
  });

  return (
    <>
      {/* Intensities match the approved look (physically based units = legacy x pi). */}
      <hemisphereLight args={[0xffffff, 0xb99a6a, 2.67]} />
      <directionalLight position={[-1, 2, 3]} intensity={2.83} />
      <directionalLight position={[2, 1, -2]} intensity={1.41} color="#fff0cc" />
      <group ref={pivot}>
        <primitive object={scene} />
      </group>
    </>
  );
}
