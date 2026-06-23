"use client";

import ProcessSection from "@/components/scenes/ProcessSection";
import GalvanizationScene from "@/components/scenes/galvanization/GalvanizationScene";

export default function Galvanization() {
  return (
    <ProcessSection
      id="galvanization"
      className="bg-steel-900"
      align="right"
      duration={6}
      figure="FIG. 02 — HOT-DIP / IMMERSION"
      kicker="Process · 02"
      title="Galvanization"
      description="Finished steel is hot-dip galvanized — lowered into molten zinc, dwelled, then withdrawn with a metallurgically bonded coating that protects for decades."
      scene={GalvanizationScene}
      phases={[
        { at: 0.0, label: "Lowering" },
        { at: 0.34, label: "Immersion" },
        { at: 0.5, label: "Withdrawal" },
        { at: 0.8, label: "Coated" },
      ]}
      specs={[
        { k: "BATH", v: "Molten zinc" },
        { k: "TEMP", v: "≈ 450 °C" },
        { k: "COATING", v: "85 µm typ." },
        { k: "STANDARD", v: "ISO 1461" },
      ]}
    />
  );
}
