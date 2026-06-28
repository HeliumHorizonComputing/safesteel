// Shared colors for the 3D scenes. The `surface` value MUST match the CSS
// background of the canvas frame (see --scene-surface in globals.css) so the
// background-filled member faces blend in and only the blueprint edges show.

export const SCENE = {
  /** Occlusion-fill color for member surfaces — matches the canvas frame bg. */
  surface: "#eef3fb",
  /** Primary blueprint edge color. */
  edge: "#1267d8",
  /** Softer secondary edge (bracing / lighter members). */
  edgeSoft: "#4d9bf6",
  /** Brand orange — active / highlighted elements, sparks. */
  accent: "#f7941d",
  /** Structural tone colors for annotations. */
  tension: "#e07d10",
  compression: "#124c9c",
  neutral: "#3a456b",
  /** Fog color (same as surface so depth fades to the page). */
  fog: "#eef3fb",
} as const;
