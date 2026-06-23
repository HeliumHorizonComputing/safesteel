"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";
import { buildTruss, Member } from "./truss";
import CameraDirector from "../CameraDirector";
import { easeOutCubic, smoothstep, lerp, clamp } from "@/lib/anim";

const BG = "#0a0c0f"; // surfaces match the page background
const EDGE = "#ffffff"; // skeleton edge color

export default function BridgeScene({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const members = useMemo<Member[]>(() => buildTruss(), []);
  const geoms = useMemo(
    () =>
      members.map((m) =>
        m.dims
          ? new THREE.BoxGeometry(...m.dims)
          : new THREE.BoxGeometry(m.length, m.size, m.size),
      ),
    [members],
  );

  const groupRefs = useRef<(THREE.Group | null)[]>([]);
  const lineMatRefs = useRef<(THREE.LineBasicMaterial | null)[]>([]);
  const rootRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const p = progress.get();

    for (let i = 0; i < members.length; i++) {
      const g = groupRefs.current[i];
      if (!g) continue;
      const m = members[i];
      const b = smoothstep(m.appearAt, m.appearAt + m.win, p);
      g.visible = b > 0.001;
      if (!g.visible) continue;

      const e = easeOutCubic(b);
      g.position.set(
        m.mid[0] + m.offset[0] * (1 - e),
        m.mid[1] + m.offset[1] * (1 - e),
        m.mid[2] + m.offset[2] * (1 - e),
      );
      const lm = lineMatRefs.current[i];
      if (lm) lm.opacity = b;
    }

    if (rootRef.current) {
      const reveal = lerp(-0.5, 0.08, easeOutCubic(clamp(p)));
      const idle =
        p > 0.98 ? Math.sin(state.clock.elapsedTime * 0.16) * 0.05 : 0;
      rootRef.current.rotation.y = reveal + idle;
    }
  });

  return (
    <>
      <CameraDirector
        progress={progress}
        target={[0, 0.8, 0]}
        from={[7, 4.6, 15.5]}
        to={[7, 3.6, 12.8]}
        baseAspect={1.6}
      />
      <fog attach="fog" args={[BG, 16, 52]} />

      <group ref={rootRef} scale={0.72}>
        {members.map((m, i) => (
          <group
            key={m.id}
            ref={(el) => {
              groupRefs.current[i] = el;
            }}
            quaternion={m.quat}
            visible={false}
          >
            {/* background-filled surface occludes the edges behind it */}
            <mesh geometry={geoms[i]}>
              <meshBasicMaterial
                color={BG}
                polygonOffset
                polygonOffsetFactor={1}
                polygonOffsetUnits={1}
              />
            </mesh>
            {/* white skeleton edges */}
            <lineSegments>
              <edgesGeometry args={[geoms[i]]} />
              <lineBasicMaterial
                ref={(el) => {
                  lineMatRefs.current[i] = el;
                }}
                color={EDGE}
                transparent
                opacity={0}
              />
            </lineSegments>
          </group>
        ))}
      </group>
    </>
  );
}
