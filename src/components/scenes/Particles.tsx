"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";
import { clamp } from "@/lib/anim";

interface ParticlesProps {
  /** Emit origins in local space. */
  seams: [number, number, number][];
  progress: MotionValue<number>;
  /** 0..1 emission intensity for a given scroll progress. */
  intensity: (p: number) => number;
  count?: number;
  color?: string;
  size?: number;
  mode?: "spark" | "rise";
  /** Lateral scatter radius. */
  spread?: number;
  /** Travel distance per life cycle. */
  reach?: number;
  /** Life-cycle speed. */
  speed?: number;
}

/**
 * Lightweight GPU-points particle system shared by the process scenes.
 *  - "spark": welding sparks — burst outward from seams, arc down under gravity.
 *  - "rise":  bubbles / steam — drift upward from the source.
 * Emission is gated by `intensity(progress)` so particles only appear during
 * the relevant phase of the scroll timeline.
 */
export default function Particles({
  seams,
  progress,
  intensity,
  count = 120,
  color = "#ff8a3c",
  size = 0.08,
  mode = "spark",
  spread = 0.35,
  reach = 1.4,
  speed = 1.6,
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const { positions, seeds, dirs, origins } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const dirs = new Float32Array(count * 3);
    const origins = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      seeds[i] = Math.random();
      const o = seams[i % seams.length];
      origins[i * 3] = o[0];
      origins[i * 3 + 1] = o[1];
      origins[i * 3 + 2] = o[2];
      if (mode === "spark") {
        // outward hemisphere
        const a = Math.random() * Math.PI * 2;
        const up = 0.3 + Math.random() * 0.9;
        dirs[i * 3] = Math.cos(a) * (0.6 + Math.random());
        dirs[i * 3 + 1] = up;
        dirs[i * 3 + 2] = Math.sin(a) * (0.6 + Math.random());
      } else {
        dirs[i * 3] = (Math.random() - 0.5) * 0.3;
        dirs[i * 3 + 1] = 1;
        dirs[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      }
    }
    return { positions, seeds, dirs, origins };
  }, [count, seams, mode]);

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const inten = clamp(intensity(progress.get()));
    if (matRef.current) matRef.current.opacity = inten;
    pts.visible = inten > 0.01;
    if (!pts.visible) return;

    const t = state.clock.elapsedTime;
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const life = (t * speed + seeds[i]) % 1; // 0..1
      const ox = origins[i * 3];
      const oy = origins[i * 3 + 1];
      const oz = origins[i * 3 + 2];
      if (mode === "spark") {
        const sx = (seeds[i] - 0.5) * spread;
        arr[i * 3] = ox + dirs[i * 3] * reach * life + sx;
        arr[i * 3 + 1] =
          oy + dirs[i * 3 + 1] * reach * life - 2.6 * life * life; // gravity
        arr[i * 3 + 2] = oz + dirs[i * 3 + 2] * reach * life;
      } else {
        const wobble = Math.sin((t + seeds[i] * 6.28) * 2) * spread * 0.4;
        arr[i * 3] = ox + dirs[i * 3] * spread + wobble;
        arr[i * 3 + 1] = oy + dirs[i * 3 + 1] * reach * life;
        arr[i * 3 + 2] = oz + dirs[i * 3 + 2] * spread;
      }
    }
    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
