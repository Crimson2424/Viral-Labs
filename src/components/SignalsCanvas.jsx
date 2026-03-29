/**
 * SignalsCanvas — Standalone fixed Canvas for the Signals visualization.
 *
 * 4th WebGL context. Uses @react-three/postprocessing for bloom.
 * Tracks the SignalsSection DOM element for scroll positioning.
 *
 * Pattern matches GlobeCanvas — fixed container, RAF-driven positioning.
 */

import { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import SignalsScene from "./SignalsScene";

/* ══════════════════════════════════════════════════════
   SHARED STATE — signals section element reference
   ══════════════════════════════════════════════════════ */

export const signalsCanvasState = {
  sectionEl: null,
};

/* ══════════════════════════════════════════════════════
   CANVAS COMPONENT
   ══════════════════════════════════════════════════════ */

export default function SignalsCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    let rafId;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const el = containerRef.current;
      if (!el) return;

      const sectionEl = signalsCanvasState.sectionEl;
      if (!sectionEl) {
        el.style.opacity = "0";
        return;
      }

      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight;

      // Only visible when section is in viewport
      if (rect.bottom < 0 || rect.top > vh) {
        el.style.opacity = "0";
      } else {
        el.style.opacity = "1";
        // Position canvas to align with section
        el.style.transform = `translateY(${rect.top}px)`;
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-22"
      style={{ opacity: 0, pointerEvents: "none", height: "130vh" }}
    >
      <Canvas
        camera={{ position: [0, 0, 95], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
        }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <SignalsScene />
        <EffectComposer>
          <Bloom
            intensity={1.065}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            radius={0.8}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}