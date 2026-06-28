"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";
import { easeOutCubic, smoothstep } from "@/lib/anim";
import { SCENE } from "@/lib/theme";

const BG = SCENE.surface;
const EDGE = SCENE.edge;

/**
 * A single skeleton-wireframe member: white edges over a background-filled
 * surface (so hidden edges are occluded). It animates itself into place on the
 * shared `progress` timeline — sliding in from `offset` and fading its edges
 * over the [appearAt, appearAt+win] window.
 */
export default function WireMember({
  geometry,
  position,
  offset = [0, 0, 0],
  quaternion,
  appearAt,
  win,
  progress,
  color = EDGE,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  offset?: [number, number, number];
  quaternion?: [number, number, number, number];
  appearAt: number;
  win: number;
  progress: MotionValue<number>;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    const b = smoothstep(appearAt, appearAt + win, progress.get());
    g.visible = b > 0.001;
    if (!g.visible) return;
    const e = easeOutCubic(b);
    g.position.set(
      position[0] + offset[0] * (1 - e),
      position[1] + offset[1] * (1 - e),
      position[2] + offset[2] * (1 - e),
    );
    if (matRef.current) matRef.current.opacity = b;
  });

  return (
    <group ref={groupRef} quaternion={quaternion} visible={false}>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={BG}
          polygonOffset
          polygonOffsetFactor={1}
          polygonOffsetUnits={1}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial ref={matRef} color={color} transparent opacity={0} />
      </lineSegments>
    </group>
  );
}
