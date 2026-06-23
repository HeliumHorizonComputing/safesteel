"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import { smoothstep } from "@/lib/anim";
import { BRIDGE } from "./truss";

/*
 * Structural-analysis markup for the hero truss. Numbers are a self-consistent
 * worked example for a simply-supported Pratt truss under a uniform load:
 *
 *   w   = 30 kN/m         (uniform deck load)
 *   L   = 18 m            (span)               -> W = wL = 540 kN
 *   R   = W / 2 = 270 kN  (each reaction)
 *   M   = wL²/8 = 1215 kN·m   (midspan moment)
 *   F   = M / h = 405 kN  (chord force, h = 3 m)  -> +T bottom, −C top
 *   D   = V / sin45° = 270 / 0.707 ≈ 382 kN   (end diagonal)
 */

const ACCENT = "#7dd3fc";
const SPAN = BRIDGE.SPAN;
const H = BRIDGE.H;
const X0 = -SPAN / 2;
const ZF = -BRIDGE.W / 2; // front truss plane

type Tone = "tension" | "compression" | "neutral";

interface Label {
  pos: [number, number, number];
  text: string;
  tone: Tone;
  mono?: boolean;
}

const LABELS: Label[] = [
  { pos: [X0, -0.35, ZF], text: "R₁ = 270 kN ↑", tone: "neutral" },
  { pos: [-X0, -0.35, ZF], text: "R₂ = 270 kN ↑", tone: "neutral" },
  { pos: [0, -0.1, ZF], text: "T = +405 kN", tone: "tension" },
  { pos: [0, H + 0.3, ZF], text: "C = −405 kN", tone: "compression" },
  { pos: [-4.3, 1.55, ZF], text: "D = −382 kN", tone: "compression" },
  { pos: [3.0, H + 1.25, ZF], text: "w = 30 kN/m", tone: "neutral" },
  { pos: [7.6, H + 1.5, ZF], text: "M = wL²/8", tone: "neutral", mono: true },
  { pos: [7.6, H + 0.7, ZF], text: "F = M/h", tone: "neutral", mono: true },
  { pos: [-7.7, H + 1.5, ZF], text: "ΣFy = 0", tone: "neutral", mono: true },
];

function toneClass(tone: Tone) {
  if (tone === "tension") return "text-zinc-accent border-zinc-accent/50";
  if (tone === "compression") return "text-white border-steel-500";
  return "text-steel-100 border-steel-600";
}

/** Builds the cyan dimension line + uniform-load arrows as one line geometry. */
function useDiagramGeometry() {
  return useMemo(() => {
    const pts: number[] = [];
    const seg = (
      a: [number, number, number],
      b: [number, number, number],
    ) => pts.push(...a, ...b);

    // span dimension line at y = -1, with end ticks
    const yd = -1.0;
    seg([X0, yd - 0.3, ZF], [X0, yd + 0.3, ZF]);
    seg([-X0, yd - 0.3, ZF], [-X0, yd + 0.3, ZF]);
    seg([X0, yd, ZF], [-X0, yd, ZF]);
    // arrow heads on the dimension line
    seg([X0, yd, ZF], [X0 + 0.35, yd + 0.16, ZF]);
    seg([X0, yd, ZF], [X0 + 0.35, yd - 0.16, ZF]);
    seg([-X0, yd, ZF], [-X0 - 0.35, yd + 0.16, ZF]);
    seg([-X0, yd, ZF], [-X0 - 0.35, yd - 0.16, ZF]);

    // uniform load: header line + down arrows onto the top chord
    const yTop = H + 0.95;
    seg([-7.5, yTop, ZF], [7.5, yTop, ZF]);
    for (const x of [-7.5, -4.5, -1.5, 1.5, 4.5, 7.5]) {
      seg([x, yTop, ZF], [x, H + 0.25, ZF]); // shaft
      seg([x, H + 0.25, ZF], [x - 0.18, H + 0.55, ZF]); // head
      seg([x, H + 0.25, ZF], [x + 0.18, H + 0.55, ZF]);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(pts), 3),
    );
    return geom;
  }, []);
}

export default function HeroAnnotations({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const [show, setShow] = useState(false);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const geom = useDiagramGeometry();

  useMotionValueEvent(progress, "change", (v) => {
    const next = v > 0.8;
    setShow((s) => (s === next ? s : next));
  });

  useFrame(() => {
    if (lineMat.current) {
      lineMat.current.opacity = smoothstep(0.8, 0.97, progress.get()) * 0.85;
    }
  });

  return (
    <group>
      <lineSegments geometry={geom}>
        <lineBasicMaterial ref={lineMat} color={ACCENT} transparent opacity={0} />
      </lineSegments>

      {LABELS.map((l, i) => (
        <Html
          key={i}
          position={l.pos}
          center
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            className={`whitespace-nowrap border bg-steel-950/90 px-2.5 py-1 font-mono text-[13px] font-medium leading-none tracking-tight shadow-lg shadow-black/60 backdrop-blur-sm transition-all duration-500 ${toneClass(
              l.tone,
            )}`}
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "scale(1)" : "scale(0.85)",
              transformOrigin: "center",
              transitionDelay: `${i * 45}ms`,
            }}
          >
            {l.text}
          </div>
        </Html>
      ))}
    </group>
  );
}
