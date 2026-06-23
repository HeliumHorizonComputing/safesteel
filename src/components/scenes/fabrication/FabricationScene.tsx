"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";
import Particles from "../Particles";
import CameraDirector from "../CameraDirector";
import WireMember from "../WireMember";
import { easeOutCubic, smoothstep, lerp, clamp } from "@/lib/anim";

// A built-up plate girder assembled from web + flanges + stiffeners — the
// bread-and-butter of structural fabrication, welded together automatically.
const LEN = 6;
const WEB_H = 1.6;
const FLANGE_W = 0.9;
const Y = 1.0; // beam centerline height

interface Part {
  id: string;
  dims: [number, number, number];
  pos: [number, number, number];
  offset: [number, number, number];
  appearAt: number;
  win: number;
}

function buildParts(): Part[] {
  const parts: Part[] = [
    { id: "web", dims: [LEN, WEB_H, 0.08], pos: [0, Y, 0], offset: [-9, 0, 0], appearAt: 0.02, win: 0.18 },
    { id: "flange-top", dims: [LEN, 0.12, FLANGE_W], pos: [0, Y + WEB_H / 2, 0], offset: [0, 3, 0], appearAt: 0.24, win: 0.16 },
    { id: "flange-bottom", dims: [LEN, 0.12, FLANGE_W], pos: [0, Y - WEB_H / 2, 0], offset: [0, -3, 0], appearAt: 0.24, win: 0.16 },
  ];
  [-2.1, -0.7, 0.7, 2.1].forEach((x, i) => {
    parts.push({
      id: `stiff-${i}`,
      dims: [0.1, WEB_H - 0.06, FLANGE_W - 0.06],
      pos: [x, Y, 0],
      offset: [0, 0, 3.2],
      appearAt: 0.46 + i * 0.04,
      win: 0.1,
    });
  });
  return parts;
}

/** smooth triangular bump, peaks at the middle of [a,b]. */
const bump = (p: number, a: number, b: number) => {
  const m = (a + b) / 2;
  return smoothstep(a, m, p) * (1 - smoothstep(m, b, p));
};

export default function FabricationScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const parts = useMemo(buildParts, []);
  const geoms = useMemo(
    () => parts.map((p) => new THREE.BoxGeometry(...p.dims)),
    [parts],
  );
  const rootRef = useRef<THREE.Group>(null);

  const topSeam = useMemo<[number, number, number][]>(
    () => Array.from({ length: 7 }, (_, i) => [-LEN / 2 + (i / 6) * LEN, Y + WEB_H / 2, 0]),
    [],
  );
  const botSeam = useMemo<[number, number, number][]>(
    () => Array.from({ length: 7 }, (_, i) => [-LEN / 2 + (i / 6) * LEN, Y - WEB_H / 2, 0]),
    [],
  );
  const stiffSeam = useMemo<[number, number, number][]>(
    () => [-2.1, -0.7, 0.7, 2.1].map((x) => [x, Y, 0.42] as [number, number, number]),
    [],
  );

  useFrame((state) => {
    const p = progress.get();
    if (rootRef.current) {
      const reveal = lerp(-0.35, 0.3, easeOutCubic(clamp(p)));
      const idle = p > 0.97 ? Math.sin(state.clock.elapsedTime * 0.2) * 0.05 : 0;
      rootRef.current.rotation.y = reveal + idle;
    }
  });

  return (
    <>
      <CameraDirector
        progress={progress}
        target={[0, 1, 0]}
        from={[3.5, 2.2, 9]}
        to={[2.2, 1.8, 7.5]}
      />
      <fog attach="fog" args={["#0a0c0f", 14, 34]} />

      <group ref={rootRef}>
        {parts.map((pt, i) => (
          <WireMember
            key={pt.id}
            geometry={geoms[i]}
            position={pt.pos}
            offset={pt.offset}
            appearAt={pt.appearAt}
            win={pt.win}
            progress={progress}
          />
        ))}

        {/* welding flash — monochrome white spatter at the seams */}
        <Particles seams={topSeam} progress={progress} intensity={(p) => bump(p, 0.3, 0.52)} count={90} color="#ffffff" size={0.06} />
        <Particles seams={botSeam} progress={progress} intensity={(p) => bump(p, 0.3, 0.52)} count={90} color="#ffffff" size={0.06} />
        <Particles seams={stiffSeam} progress={progress} intensity={(p) => bump(p, 0.5, 0.74)} count={70} color="#ffffff" size={0.06} />
      </group>
    </>
  );
}
