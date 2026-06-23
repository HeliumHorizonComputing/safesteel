// Small animation math helpers shared across the 3D scenes.

export const clamp = (v: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, v));

/** Map a value from [inMin,inMax] to [outMin,outMax], clamped. */
export const remap = (
  v: number,
  inMin: number,
  inMax: number,
  outMin = 0,
  outMax = 1,
) => {
  if (inMax === inMin) return outMin;
  return clamp(((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin, outMin, outMax);
};

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Smoothstep between edge0 and edge1. */
export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
