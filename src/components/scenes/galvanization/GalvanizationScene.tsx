"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";
import Particles from "../Particles";
import SceneControls from "../SceneControls";
import WireMember from "../WireMember";
import { remap, lerp, easeInOutCubic, smoothstep } from "@/lib/anim";
import { SCENE } from "@/lib/theme";

// A fabricated braced frame is lowered into the galvanizing bath, dwelled, then
// withdrawn — all in wireframe. Y-trajectory below drives the dip.
const Y_TOP = 4.5;
const Y_SUB = -0.6;
const Y_OUT = 2.4;
const FRAME_TOP = 0.95;

function dipY(p: number) {
  if (p < 0.34) return lerp(Y_TOP, Y_SUB, easeInOutCubic(remap(p, 0.06, 0.34)));
  if (p < 0.5) return Y_SUB;
  if (p < 0.8) return lerp(Y_SUB, Y_OUT, easeInOutCubic(remap(p, 0.5, 0.8)));
  return Y_OUT;
}

interface FramePart {
  id: string;
  dims: [number, number, number];
  pos: [number, number, number];
  quat?: [number, number, number, number];
}

function buildFrame(): FramePart[] {
  const diagLen = Math.sqrt(1.4 * 1.4 + 1.6 * 1.6);
  const q = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, 0, Math.atan2(1.6, 1.4)),
  );
  return [
    { id: "post-l", dims: [0.12, 1.6, 0.12], pos: [-0.7, 0, 0] },
    { id: "post-r", dims: [0.12, 1.6, 0.12], pos: [0.7, 0, 0] },
    { id: "beam-t", dims: [1.52, 0.14, 0.12], pos: [0, 0.8, 0] },
    { id: "beam-b", dims: [1.52, 0.14, 0.12], pos: [0, -0.8, 0] },
    {
      id: "diag",
      dims: [diagLen, 0.1, 0.1],
      pos: [0, 0, 0],
      quat: [q.x, q.y, q.z, q.w],
    },
  ];
}

export default function GalvanizationScene({
  progress,
  hovered,
}: {
  progress: MotionValue<number>;
  hovered: MotionValue<number>;
}) {
  const frame = useMemo(buildFrame, []);
  const frameGeoms = useMemo(
    () => frame.map((f) => new THREE.BoxGeometry(...f.dims)),
    [frame],
  );
  const tankGeom = useMemo(() => new THREE.BoxGeometry(3, 1.2, 2.2), []);
  const surfaceGeom = useMemo(() => new THREE.BoxGeometry(2.8, 0.02, 2.0), []);

  const pieceRef = useRef<THREE.Group>(null);
  const cableRef = useRef<THREE.Mesh>(null);
  const surfaceRef = useRef<THREE.Group>(null);

  const surfacePts = useMemo<[number, number, number][]>(
    () =>
      Array.from({ length: 8 }, () => [
        (Math.random() - 0.5) * 2.4,
        -0.05,
        (Math.random() - 0.5) * 1.6,
      ]),
    [],
  );

  useFrame((state) => {
    const p = progress.get();
    const dy = dipY(p);

    if (pieceRef.current) {
      pieceRef.current.position.y = dy;
      pieceRef.current.rotation.y = p > 0.8 ? (p - 0.8) * 2.2 : 0;
    }

    // cable from a fixed anchor down to the top of the piece
    if (cableRef.current) {
      const bottom = dy + FRAME_TOP;
      const top = Y_TOP + 1.4;
      const len = Math.max(0.01, top - bottom);
      cableRef.current.position.y = (top + bottom) / 2;
      cableRef.current.scale.y = len;
    }

    // molten surface ripple while the piece is in the bath
    if (surfaceRef.current) {
      const ripple = smoothstep(0.28, 0.36, p) * (1 - smoothstep(0.6, 0.74, p));
      surfaceRef.current.position.y =
        -0.03 + Math.sin(state.clock.elapsedTime * 5) * 0.04 * ripple;
      const s = 1 + ripple * 0.04 * Math.sin(state.clock.elapsedTime * 7);
      surfaceRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <>
      <SceneControls
        progress={progress}
        hovered={hovered}
        target={[0, 0.4, 0]}
        from={[4.5, 2.6, 8]}
        to={[3.4, 2.1, 7]}
      />
      <fog attach="fog" args={[SCENE.fog, 16, 40]} />

      {/* galvanizing bath (static wireframe tank) */}
      <WireMember geometry={tankGeom} position={[0, -0.6, 0]} appearAt={0.0} win={0.06} progress={progress} />
      <group ref={surfaceRef}>
        <WireMember geometry={surfaceGeom} position={[0, 0, 0]} appearAt={0.0} win={0.06} progress={progress} />
      </group>

      {/* cable */}
      <mesh ref={cableRef}>
        <boxGeometry args={[0.03, 1, 0.03]} />
        <meshBasicMaterial color={SCENE.edge} />
      </mesh>

      {/* the workpiece */}
      <group ref={pieceRef}>
        {frame.map((f, i) => (
          <WireMember
            key={f.id}
            geometry={frameGeoms[i]}
            position={f.pos}
            quaternion={f.quat}
            appearAt={0.0}
            win={0.05}
            progress={progress}
          />
        ))}
      </group>

      {/* bubbles + steam rising off the bath */}
      <Particles
        seams={surfacePts}
        progress={progress}
        intensity={(p) => smoothstep(0.3, 0.38, p) * (1 - smoothstep(0.56, 0.7, p))}
        mode="rise"
        count={70}
        color={SCENE.accent}
        size={0.05}
        reach={1.2}
        spread={0.5}
        speed={0.8}
      />
      <Particles
        seams={surfacePts}
        progress={progress}
        intensity={(p) =>
          0.6 * smoothstep(0.34, 0.46, p) * (1 - smoothstep(0.72, 0.9, p))
        }
        mode="rise"
        count={50}
        color={SCENE.edgeSoft}
        size={0.12}
        reach={2.6}
        spread={0.9}
        speed={0.4}
      />
    </>
  );
}
