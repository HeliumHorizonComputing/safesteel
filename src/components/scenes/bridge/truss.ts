import * as THREE from "three";

/**
 * Generates an idealized parallel-chord PRATT truss bridge as a flat list of
 * structural members, each tagged with the assembly phase it belongs to and a
 * normalized `appearAt` so the scene can build it sequentially on scroll.
 *
 * Coordinate frame:
 *   X = along the span,  Y = up,  Z = across (two parallel trusses).
 */

export type MemberGroup =
  | "foundation"
  | "vertical"
  | "bottomChord"
  | "topChord"
  | "diagonal"
  | "bracing"
  | "deck";

export interface Member {
  id: string;
  group: MemberGroup;
  /** Final world-space midpoint. */
  mid: [number, number, number];
  /** Orientation (beam local +X aligned to the member axis). */
  quat: [number, number, number, number];
  /** Length along local X (for beams) or box dims (for blocks). */
  length: number;
  size: number;
  /** Set for foundation blocks / deck planks that are boxes, not square beams. */
  dims?: [number, number, number];
  /** Where the member slides in from while being "erected". */
  offset: [number, number, number];
  /** Progress [0..1] at which this member starts appearing. */
  appearAt: number;
  /** Progress window over which it finishes appearing. */
  win: number;
}

// ---- bridge parameters -----------------------------------------------------
const N = 6; // panels
const PANEL = 3; // panel width
const SPAN = N * PANEL; // total span = 18
const H = 3; // truss height
const W = 4; // distance between the two trusses
const BEAM = 0.18; // structural member thickness
const X0 = -SPAN / 2; // center the span on origin

export const BRIDGE = { N, PANEL, SPAN, H, W, BEAM };

const ZF = -W / 2; // front truss
const ZB = W / 2; // back truss

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const bottom = (i: number, z: number) => v(X0 + i * PANEL, 0, z);
const top = (i: number, z: number) => v(X0 + i * PANEL, H, z);

const X_AXIS = new THREE.Vector3(1, 0, 0);
function beamFrom(
  id: string,
  group: MemberGroup,
  a: THREE.Vector3,
  b: THREE.Vector3,
  appearAt: number,
  win: number,
  offset: [number, number, number],
  size = BEAM,
): Member {
  const dir = new THREE.Vector3().subVectors(b, a);
  const length = dir.length();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  const quat = new THREE.Quaternion().setFromUnitVectors(
    X_AXIS,
    dir.clone().normalize(),
  );
  return {
    id,
    group,
    mid: [mid.x, mid.y, mid.z],
    quat: [quat.x, quat.y, quat.z, quat.w],
    length,
    size,
    offset,
    appearAt,
    win,
  };
}

/** Linear fraction across the span used to stagger a group left-to-right. */
const span01 = (i: number) => i / N;

export function buildTruss(): Member[] {
  const m: Member[] = [];
  const trusses = [ZF, ZB];

  // --- foundation: ground + two abutment blocks ---------------------------
  m.push({
    id: "abut-L",
    group: "foundation",
    mid: [X0 - 0.4, -0.9, 0],
    quat: [0, 0, 0, 1],
    length: 0,
    size: 0,
    dims: [1.6, 1.8, W + 1.4],
    offset: [0, -2.2, 0],
    appearAt: 0.0,
    win: 0.08,
  });
  m.push({
    id: "abut-R",
    group: "foundation",
    mid: [-X0 + 0.4, -0.9, 0],
    quat: [0, 0, 0, 1],
    length: 0,
    size: 0,
    dims: [1.6, 1.8, W + 1.4],
    offset: [0, -2.2, 0],
    appearAt: 0.04,
    win: 0.08,
  });

  // --- verticals (incl. end posts): rise up from the ground ---------------
  // Build outer end posts first, then inner verticals, left-to-right.
  for (const z of trusses) {
    for (let i = 0; i <= N; i++) {
      const a = bottom(i, z);
      const b = top(i, z);
      m.push(
        beamFrom(
          `vert-${z}-${i}`,
          "vertical",
          a,
          b,
          0.12 + span01(i) * 0.14,
          0.06,
          [0, -2.4, 0],
        ),
      );
    }
  }

  // --- bottom chords ------------------------------------------------------
  for (const z of trusses) {
    for (let i = 0; i < N; i++) {
      m.push(
        beamFrom(
          `bchord-${z}-${i}`,
          "bottomChord",
          bottom(i, z),
          bottom(i + 1, z),
          0.28 + span01(i) * 0.12,
          0.05,
          [0, 0.9, 0],
        ),
      );
    }
  }

  // --- top chords ---------------------------------------------------------
  for (const z of trusses) {
    for (let i = 0; i < N; i++) {
      m.push(
        beamFrom(
          `tchord-${z}-${i}`,
          "topChord",
          top(i, z),
          top(i + 1, z),
          0.42 + span01(i) * 0.12,
          0.05,
          [0, 1.4, 0],
        ),
      );
    }
  }

  // --- diagonals (Pratt: slope down toward midspan) -----------------------
  const mid = N / 2;
  for (const z of trusses) {
    for (let i = 0; i < N; i++) {
      let a: THREE.Vector3;
      let b: THREE.Vector3;
      if (i < mid) {
        a = top(i, z);
        b = bottom(i + 1, z);
      } else {
        a = top(i + 1, z);
        b = bottom(i, z);
      }
      m.push(
        beamFrom(
          `diag-${z}-${i}`,
          "diagonal",
          a,
          b,
          0.55 + span01(i) * 0.14,
          0.05,
          [0, 1.4, 0],
          BEAM * 0.85,
        ),
      );
    }
  }

  // --- lateral bracing between the two trusses ----------------------------
  // transverse struts top & bottom at every node + top cross-bracing
  for (let i = 0; i <= N; i++) {
    m.push(
      beamFrom(
        `topstrut-${i}`,
        "bracing",
        top(i, ZF),
        top(i, ZB),
        0.66 + span01(i) * 0.1,
        0.05,
        [0, 1.0, 0],
        BEAM * 0.8,
      ),
    );
    m.push(
      beamFrom(
        `botstrut-${i}`,
        "bracing",
        bottom(i, ZF),
        bottom(i, ZB),
        0.64 + span01(i) * 0.1,
        0.05,
        [0, 0.8, 0],
        BEAM * 0.8,
      ),
    );
  }
  // a few top-plane cross braces for realism
  for (let i = 0; i < N; i++) {
    const a = i % 2 === 0 ? top(i, ZF) : top(i, ZB);
    const b = i % 2 === 0 ? top(i + 1, ZB) : top(i + 1, ZF);
    m.push(
      beamFrom(
        `xbrace-${i}`,
        "bracing",
        a,
        b,
        0.7 + span01(i) * 0.08,
        0.05,
        [0, 1.0, 0],
        BEAM * 0.6,
      ),
    );
  }

  // --- deck: planks laid between the bottom chords ------------------------
  for (let i = 0; i < N; i++) {
    const cx = X0 + (i + 0.5) * PANEL;
    m.push({
      id: `deck-${i}`,
      group: "deck",
      mid: [cx, 0.12, 0],
      quat: [0, 0, 0, 1],
      length: 0,
      size: 0,
      dims: [PANEL * 0.98, 0.12, W - 0.1],
      offset: [0, 0.8, 0],
      appearAt: 0.74 + span01(i) * 0.12,
      win: 0.05,
    });
  }

  return m;
}
