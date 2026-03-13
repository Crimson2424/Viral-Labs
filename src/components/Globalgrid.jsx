/**
 * GlobalGrid — Fixed grid overlay with entrance animation.
 *
 * ENTRANCE:
 *   Grid starts clipped to center (invisible) + opacity 0.
 *   Clip-path expands outward from center while opacity fades in.
 *   Controlled via `entranceDelay` prop for sync with parent timeline.
 *
 * All initial states via gsap.set().
 * All tweens use .to() only.
 * useGSAP hook for cleanup.
 */

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GlobalGrid({ entranceDelay = 0.2 }) {
  const gridRef = useRef();
  const lineColor = "rgba(255, 255, 255, 0.06)";

  useGSAP(() => {
    // ── Initial state: invisible + clipped to center ──
    gsap.set(gridRef.current, {
      opacity: 0,
      clipPath: "inset(50% 50% 50% 50%)",
    });

    // ── Entrance: expand from center + fade in ──
    const tl = gsap.timeline({ delay: entranceDelay });

    tl.to(gridRef.current, {
      opacity: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      ease: "power3.inOut",
    });
  });

  return (
    <div
      ref={gridRef}
      className="pointer-events-none fixed inset-0 top-11 z-[15]"
      aria-hidden="true"
      style={{
        left: "105px",
        right: "105px",
        backgroundImage: `
          linear-gradient(to right, ${lineColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `calc(100% / 19) calc((100vw - 210px) / 19)`,
      }}
    />
  );
}