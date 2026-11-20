// @vitest-environment node
import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'node:fs';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gestureAngles, GESTURES } from '../gestures.js';

// The rig depends on the model exposing these clips and bones. Fail loudly if a replacement model breaks them.
let gltf;
beforeAll(async () => {
  globalThis.self = globalThis;
  globalThis.createImageBitmap = async () => ({ width: 1, height: 1, close() {} });
  const buf = fs.readFileSync('public/models/guide.glb');
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  gltf = await new Promise((res, rej) => new GLTFLoader().parse(ab, '', res, rej));
});

describe('guide.glb', () => {
  it('has Idle and Walk clips', () => {
    const names = gltf.animations.map((a) => a.name);
    expect(names).toContain('Idle');
    expect(names).toContain('Walk');
  });
  it('has a skinned mesh and the arm bones used by gestures', () => {
    let skinned = null;
    const bones = {};
    gltf.scene.traverse((o) => {
      if (o.isSkinnedMesh) skinned = o;
      if (o.isBone) bones[o.name.replace(/^mixamorig:?/, '')] = o;
    });
    expect(skinned).toBeTruthy();
    for (const b of ['LeftArm', 'LeftForeArm', 'RightArm', 'RightForeArm']) expect(bones[b]).toBeTruthy();
    expect(typeof skinned.getVertexPosition).toBe('function');
  });
  it('carries the painted face/logo texture and vertex colours', () => {
    let skinned = null;
    gltf.scene.traverse((o) => o.isSkinnedMesh && (skinned = o));
    expect(skinned.material.map).toBeTruthy();
    expect(skinned.geometry.attributes.color).toBeTruthy();
    expect(skinned.geometry.attributes.uv.count).toBe(skinned.geometry.attributes.position.count);
  });
  it('animates: the walk clip moves the skeleton and measuring works', () => {
    const mixer = new THREE.AnimationMixer(gltf.scene);
    const walk = mixer.clipAction(gltf.animations.find((a) => a.name === 'Walk'));
    walk.play();
    mixer.update(0);
    gltf.scene.updateMatrixWorld(true);
    const sk = [];
    gltf.scene.traverse((o) => o.isSkinnedMesh && sk.push(o));
    const v = new THREE.Vector3();
    let min = Infinity, max = -Infinity;
    for (let i = 0; i < sk[0].geometry.attributes.position.count; i += 7) {
      sk[0].getVertexPosition(i, v).applyMatrix4(sk[0].matrixWorld);
      min = Math.min(min, v.y); max = Math.max(max, v.y);
    }
    expect(max - min).toBeGreaterThan(1);
    expect(max - min).toBeLessThan(4);
  });
});

describe('gestures', () => {
  it('every gesture returns valid bone/axis/angle triples', () => {
    for (const g of GESTURES) {
      const list = gestureAngles(g, 1.2, false);
      expect(list.length).toBeGreaterThan(0);
      for (const [bone, axis, angle] of list) {
        expect(bone).toMatch(/^(Left|Right)(Arm|ForeArm)$/);
        expect(['x', 'z']).toContain(axis);
        expect(Number.isFinite(angle)).toBe(true);
      }
    }
    expect(gestureAngles('unknown', 0, false)).toEqual([]);
  });
});
