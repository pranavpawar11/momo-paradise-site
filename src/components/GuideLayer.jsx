import { lazy, Suspense, useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary.jsx';
import GuideBubble from '../guide/GuideBubble.jsx';
import { guideStore } from '../guide/store.js';
import { hasWebGL } from '../guide/useWebGL.js';

// three.js + the model load lazily, after first paint, so the page stays fast on ordinary phones.
const GuideCanvas = lazy(() => import('../guide/GuideCanvas.jsx'));

export default function GuideLayer() {
  const [enabled3d, setEnabled3d] = useState(false);

  useEffect(() => {
    if (!hasWebGL()) {
      guideStore.set({ failed: true });
      return undefined;
    }
    const id = setTimeout(() => setEnabled3d(true), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {enabled3d && (
        <ErrorBoundary onError={() => guideStore.set({ failed: true, modelReady: false })}>
          <Suspense fallback={null}>
            <GuideCanvas />
          </Suspense>
        </ErrorBoundary>
      )}
      <GuideBubble />
    </>
  );
}
