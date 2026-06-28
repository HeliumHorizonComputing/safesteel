"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  MotionValue,
  animate,
  useInView,
  useMotionValue,
} from "framer-motion";

export interface AutoSceneRenderProps {
  /** 0 -> 1 timeline progress, advanced automatically over `duration`. */
  progress: MotionValue<number>;
  /** 1 while the pointer is over the canvas, 0 otherwise (desktop hover). */
  hovered: MotionValue<number>;
}

interface AutoSceneProps {
  id?: string;
  /** Seconds the 0 -> 1 build takes. */
  duration?: number;
  /** Replay every time the section re-enters view (default true). */
  replay?: boolean;
  loop?: boolean;
  /** Mount the canvas immediately (used by the hero, which loads in view). */
  eager?: boolean;
  /** Side the text panel sits on (desktop). */
  align?: "left" | "right";
  /** Small technical caption shown on the canvas frame. */
  figure?: string;
  scene: (p: AutoSceneRenderProps) => ReactNode;
  /** Text panel content — laid out BESIDE the canvas, never over it. */
  text: (p: AutoSceneRenderProps) => ReactNode;
  camera?: { position: [number, number, number]; fov?: number };
  /** On mobile, show the canvas ABOVE the text (desktop order is unchanged). */
  mobileSceneFirst?: boolean;
  /** Column gap utility classes (lets a section widen the split). */
  gap?: string;
  className?: string;
}

function Corner({ at }: { at: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "left-0 top-0 border-l border-t",
    tr: "right-0 top-0 border-r border-t",
    bl: "left-0 bottom-0 border-l border-b",
    br: "right-0 bottom-0 border-r border-b",
  } as const;
  return (
    <span
      className={`pointer-events-none absolute h-4 w-4 border-orange-500/80 ${map[at]}`}
    />
  );
}

/**
 * An auto-playing 3D section laid out as a responsive two-column split:
 * a text panel beside a framed canvas (stacked on mobile). The `progress`
 * motion value animates 0 -> 1 over `duration` once the section is in view
 * AND the canvas has finished initializing. After the build completes the
 * scene becomes interactive (orbit on hover / auto-spin) — driven by `hovered`.
 */
export default function AutoScene({
  id,
  duration = 6,
  replay = true,
  loop = false,
  eager = false,
  align = "left",
  figure,
  scene,
  text,
  camera = { position: [7, 4.4, 14.5], fov: 40 },
  mobileSceneFirst = false,
  gap = "gap-10 lg:gap-12",
  className = "",
}: AutoSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const hovered = useMotionValue(0);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);

  const inView = useInView(ref, { margin: "0px 0px -15% 0px" });
  const nearView = useInView(ref, { margin: "800px 0px 800px 0px" });
  const mount = eager || nearView;
  const playedOnce = useRef(false);

  useEffect(() => {
    if (!ready) return;
    if (!inView) {
      // out of view: reset so it can replay on re-entry
      if (replay) {
        progress.set(0);
        setDone(false);
      }
      return;
    }
    // don't replay if the section has already played and replay is disabled
    if (playedOnce.current && !replay) return;
    playedOnce.current = true;
    progress.set(0);
    setDone(false);
    const controls = animate(progress, 1, {
      duration,
      ease: "easeInOut",
      ...(loop ? { repeat: Infinity, repeatType: "loop" as const } : {}),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [inView, ready, duration, loop, replay, progress]);

  const renderProps: AutoSceneRenderProps = { progress, hovered };

  // Mobile order: by default text first; mobileSceneFirst flips the canvas above.
  const textCol = [
    mobileSceneFirst ? "order-2" : "",
    align === "left" ? "lg:order-1" : "lg:order-2",
    "lg:col-span-5",
  ].join(" ");
  const canvasCol = [
    mobileSceneFirst ? "order-1" : "",
    align === "left" ? "lg:order-2" : "lg:order-1",
    "lg:col-span-7",
  ].join(" ");

  return (
    <section id={id} ref={ref} className={`relative w-full ${className}`}>
      <div
        className={`mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center px-6 py-24 lg:grid-cols-12 lg:px-10 ${gap}`}
      >
        {/* Text panel */}
        <div className={`flex flex-col justify-center ${textCol}`}>
          {text(renderProps)}
        </div>

        {/* Framed canvas */}
        <div className={canvasCol}>
          <div
            className="scene-surface blueprint-grid relative h-[44svh] w-full overflow-hidden rounded-xl border border-navy-200 shadow-card sm:h-[52svh] lg:h-[76svh]"
            onPointerEnter={() => hovered.set(1)}
            onPointerLeave={() => hovered.set(0)}
          >
            {mount && (
              <Canvas
                camera={camera}
                dpr={[1, 2]}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
                onCreated={({ gl, scene, camera }) => {
                  // precompile shaders so the first frame doesn't hitch
                  gl.compile(scene, camera);
                  setReady(true);
                }}
                className="absolute inset-0"
              >
                {scene(renderProps)}
              </Canvas>
            )}

            <Corner at="tl" />
            <Corner at="tr" />
            <Corner at="bl" />
            <Corner at="br" />

            {figure && (
              <span className="tech-label pointer-events-none absolute left-3 top-3 text-[10px] text-navy-500/80">
                {figure}
              </span>
            )}

            {/* interaction hint once the build settles */}
            {done && (
              <span className="tech-label pointer-events-none absolute bottom-3 right-3 hidden text-[9px] text-navy-500/70 sm:block">
                Drag / hover to rotate
              </span>
            )}

            {/* graceful init state */}
            {mount && !ready && (
              <div className="absolute inset-0 grid place-items-center">
                <span className="tech-label animate-pulse text-[10px] text-navy-500/70">
                  Initializing model…
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
