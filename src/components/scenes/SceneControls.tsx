"use client";

import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import CameraDirector from "./CameraDirector";

/**
 * Camera coordinator for an auto-playing scene.
 *
 *  - During the build (`progress` < ~1) the {@link CameraDirector} dollies the
 *    camera along `from` -> `to`, exactly as before.
 *  - Once the build completes the scene becomes interactive: drei
 *    `OrbitControls` take over so the visitor can rotate the finished model.
 *      · Desktop  — auto-rotates while hovered, and can be click-dragged.
 *      · Touch    — gentle continuous auto-rotate (drag is disabled so the
 *                   page can still be scrolled past the canvas).
 */
export default function SceneControls({
  progress,
  hovered,
  target = [0, 1, 0],
  from,
  to,
  baseAspect = 1.5,
}: {
  progress: MotionValue<number>;
  hovered: MotionValue<number>;
  target?: [number, number, number];
  from?: [number, number, number];
  to?: [number, number, number];
  baseAspect?: number;
}) {
  const [done, setDone] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useMotionValueEvent(progress, "change", (v) => {
    const next = v > 0.999;
    setDone((d) => (d === next ? d : next));
  });
  useMotionValueEvent(hovered, "change", (v) => {
    const next = v > 0.5;
    setIsHovered((h) => (h === next ? h : next));
  });

  return (
    <>
      <CameraDirector
        progress={progress}
        target={target}
        from={from}
        to={to}
        baseAspect={baseAspect}
        active={!done}
      />
      {done && (
        <OrbitControls
          makeDefault
          target={target}
          enableZoom={false}
          enablePan={false}
          enableRotate={!coarse}
          autoRotate={isHovered || coarse}
          autoRotateSpeed={coarse ? 0.6 : 1.1}
          rotateSpeed={0.6}
          minPolarAngle={Math.PI * 0.18}
          maxPolarAngle={Math.PI * 0.52}
          enableDamping
          dampingFactor={0.08}
        />
      )}
    </>
  );
}
