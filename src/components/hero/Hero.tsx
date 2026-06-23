"use client";

import AutoScene from "@/components/scroll/AutoScene";
import BridgeScene from "@/components/scenes/bridge/BridgeScene";
import HeroOverlay from "@/components/hero/HeroOverlay";

export default function Hero() {
  return (
    <AutoScene
      id="hero"
      duration={6}
      eager
      align="left"
      mobileSceneFirst
      gap="gap-10 lg:gap-20"
      figure="FIG. 00 — PRATT TRUSS / ASSEMBLY"
      className="bg-steel-950"
      camera={{ position: [6.5, 4.2, 15], fov: 38 }}
      scene={({ progress }) => <BridgeScene progress={progress} />}
      text={({ progress }) => <HeroOverlay progress={progress} />}
    />
  );
}
