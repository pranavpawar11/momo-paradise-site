// Arm gestures as world-axis rotations applied on top of the idle/walk animation.
// Each entry: [boneName, axis, angleInRadians]. The guide stands on the left, so the character's
// left arm (screen right) is the one that points toward the content.
export const GESTURES = ['wave', 'point', 'present', 'explain', 'thumb', 'celebrate'];

export function gestureAngles(name, t, reduced) {
  const o = reduced ? 0 : 1;
  switch (name) {
    case 'wave':
      return [['LeftArm', 'z', 1.5], ['LeftForeArm', 'z', 1.25 + 0.45 * Math.sin(t * 8) * o]];
    case 'point':
      return [['LeftArm', 'z', 1.2]];
    case 'present':
      return [['LeftArm', 'z', 1.25], ['LeftForeArm', 'z', 0.35 + 0.12 * Math.sin(t * 3) * o]];
    case 'explain':
      return [
        ['LeftArm', 'x', -0.5], ['LeftForeArm', 'x', -1 + 0.25 * Math.sin(t * 3) * o],
        ['RightArm', 'x', -0.5], ['RightForeArm', 'x', -1 + 0.25 * Math.sin(t * 3 + 2) * o],
      ];
    case 'thumb':
      return [['LeftArm', 'z', 0.5], ['LeftForeArm', 'z', 2.1]];
    case 'celebrate': {
      const w = 0.2 * Math.sin(t * 12) * o;
      return [
        ['LeftArm', 'z', 1.9 + w], ['RightArm', 'z', -1.9 - w],
        ['LeftForeArm', 'z', 0.5], ['RightForeArm', 'z', -0.5],
      ];
    }
    default:
      return [];
  }
}
