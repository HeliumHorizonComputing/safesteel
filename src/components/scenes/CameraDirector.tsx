"use client";

import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";
import { easeInOutCubic, clamp } from "@/lib/anim";

/**
 * Trains the camera on a target and (optionally) dollies between two positions
 * across progress. Also pulls the camera back on narrow/tall canvases so the
 * model always fits — important now that the canvas lives in a column and
 * stacks on mobile.
 */
export default function CameraDirector({
  progress,
  target = [0, 1, 0],
  from,
  to,
  /** Canvas aspect at/above which no extra pull-back is applied. */
  baseAspect = 1.5,
  /** Maximum extra pull-back factor on very narrow canvases. */
  maxFit = 2.1,
  /** When false, the director stops writing the camera (hands off to orbit). */
  active = true,
}: {
  progress: MotionValue<number>;
  target?: [number, number, number];
  from?: [number, number, number];
  to?: [number, number, number];
  baseAspect?: number;
  maxFit?: number;
  active?: boolean;
}) {
  const { camera, size } = useThree();
  const tgt = useMemo(() => new THREE.Vector3(...target), [target]);
  const a = useMemo(() => (from ? new THREE.Vector3(...from) : null), [from]);
  const b = useMemo(() => (to ? new THREE.Vector3(...to) : null), [to]);
  const pos = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!active) return;
    if (a && b) {
      pos.lerpVectors(a, b, easeInOutCubic(clamp(progress.get())));
    } else {
      pos.copy(camera.position);
    }
    // Fit: when the canvas is narrower than baseAspect, push the camera out
    // along its view direction so the (wide) model stays in frame.
    const aspect = size.width / Math.max(1, size.height);
    const fit = clamp(baseAspect / aspect, 1, maxFit);
    const dir = pos.clone().sub(tgt).multiplyScalar(fit);
    camera.position.copy(tgt).add(dir);
    camera.lookAt(tgt);
  });
  return null;
}
