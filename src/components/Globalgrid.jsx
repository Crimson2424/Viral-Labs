/**
 * GlobalGrid — Reusable grid overlay, absolute-positioned.
 *
 * Drop an instance inside any section. Since it's position:absolute,
 * it fills the section and scrolls naturally with it.
 *
 * Props:
 *   animated (default: false)
 *     true  → starts hidden, entrance triggered via entranceState.playGlobalGrid()
 *     false → visible immediately (for sections after the hero)
 *
 *   navOffset (default: false)
 *     true  → top-11 (44px offset for navbar, used in HeroSection)
 *     false → top-0 (flush with section top, used everywhere else)
 *
 * All initial states via gsap.set().
 * All tweens use .to() only.
 * useGSAP hook for cleanup.
 */

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { entranceState } from "./entranceState";

export default function GlobalGrid({ animated = false, navOffset = false }) {
  const gridRef = useRef();
  const lineColor = "rgba(255, 255, 255, 0.06)";

  useGSAP(() => {
    const el = gridRef.current;
    if (!el) return;

    if (animated) {
      gsap.set(el, {
        opacity: 0,
        clipPath: "inset(50% 50% 50% 50%)",
      });

      const tl = gsap.timeline({ paused: true });

      tl.to(el, {
        opacity: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.2,
        ease: "power3.inOut",
      });

      entranceState.playGlobalGrid = () => tl.play();
    }
  });

  return (
    <div
      ref={gridRef}
      className={`global-grid pointer-events-none absolute inset-0 ${navOffset ? "top-11" : "top-0"} z-[15]`}
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