"use client";

/**
 * Shared lighting rig for the steel scenes. Cool key + warm rim gives the
 * steel members a technical, fabricated look without needing an HDR env map
 * (keeps the site fully self-contained / offline-friendly).
 */
export default function Rig() {
  return (
    <>
      <hemisphereLight args={["#aab6c4", "#0a0c0f", 0.7]} />
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={2.1}
        color="#dfe9f5"
      />
      <directionalLight
        position={[-10, 4, -6]}
        intensity={0.8}
        color="#7dd3fc"
      />
      {/* warm rim from low/front to catch beam edges */}
      <pointLight position={[2, 1.5, 10]} intensity={30} color="#ff8a5c" distance={40} decay={2} />
    </>
  );
}
