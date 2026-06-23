"use client";

import ProcessSection from "@/components/scenes/ProcessSection";
import FabricationScene from "@/components/scenes/fabrication/FabricationScene";

export default function Fabrication() {
  return (
    <ProcessSection
      id="fabrication"
      className="bg-steel-950"
      align="left"
      duration={6}
      figure="FIG. 01 — BUILT-UP GIRDER / WELD"
      kicker="Process · 01"
      title="Fabrication"
      description="Plate is cut, fit and welded into built-up girders — web, flanges and stiffeners assembled to tight tolerance in our Chitwan shop."
      scene={FabricationScene}
      phases={[
        { at: 0.0, label: "Web plate" },
        { at: 0.24, label: "Flanges" },
        { at: 0.3, label: "Welding" },
        { at: 0.46, label: "Stiffeners" },
        { at: 0.78, label: "Complete" },
      ]}
      specs={[
        { k: "CAPACITY", v: "5,000 MT/yr" },
        { k: "SECTION", v: "Built-up girder" },
        { k: "JOINING", v: "MIG / SAW weld" },
        { k: "TOLERANCE", v: "± 2 mm" },
      ]}
    />
  );
}
