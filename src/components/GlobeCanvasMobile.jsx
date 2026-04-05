/**
 * GlobeCanvasMobile — Inline globe canvas for mobile/<lg viewports.
 *
 * Rendered directly inside CreatorNetworkSection as a normal flow element.
 * No scroll tracking, no fixed positioning, no tooltips. The globe just sits
 * there with constellation visible, auto-rotates, and plays auto-trajectory
 * animations.
 *
 * The RAF re-enforces creatorGlobeState values every frame so any other
 * section (RocketLaunch etc.) mutating the shared state can't disturb us.
 */

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import CreatorGlobe from "./Creatorglobe";
import { creatorGlobeState } from "./Creatorglobestate";

export default function GlobeCanvasMobile() {
  const containerRef = useRef(null);

  useEffect(() => {
    const apply = () => {
      creatorGlobeState.constellationOpacity = 1;
      creatorGlobeState.interactive = false; // no drag/hover on mobile — scroll wins
      creatorGlobeState.globeOpacity = 1;
    };
    apply();

    let rafId;
    const tick = () => {
      apply();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[320px] sm:max-w-[380px] md:max-w-[440px] mx-auto"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <group rotation={[-0.2, 0.64, 1.23]}>
          <CreatorGlobe containerRef={containerRef} />
        </group>
      </Canvas>
    </div>
  );
}