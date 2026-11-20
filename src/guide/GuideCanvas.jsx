import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import GuideRig from './GuideRig.jsx';

// Render at ~30 fps and never while the tab is hidden.
function Ticker() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const id = setInterval(() => !document.hidden && invalidate(), 33);
    return () => clearInterval(id);
  }, [invalidate]);
  return null;
}

export default function GuideCanvas() {
  return (
    <Canvas
      className="guide-canvas"
      aria-hidden="true"
      orthographic
      flat
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      camera={{ manual: true, near: -3000, far: 3000, position: [0, 0, 500] }}
    >
      <Suspense fallback={null}>
        <GuideRig />
      </Suspense>
      <Ticker />
    </Canvas>
  );
}
