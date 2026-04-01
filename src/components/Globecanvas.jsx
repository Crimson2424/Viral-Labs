/**
 * GlobeCanvas — Standalone fixed Canvas for the Creator Globe.
 *
 * SCROLL TRACKING — 3 phases, all continuous:
 *
 *  Phase 1 — Approach (cnRect.top goes vh → 0):
 *    Globe nudges UP in 3D space (globeYOffset decreases).
 *    NO CSS translateY — the movement is in 3D, so no clipping.
 *    Container stays at position: fixed, top: 0, height: 100vh.
 *    Uses a 2px threshold to prevent sub-pixel interference
 *    from overwriting GSAP values during CN pin.
 *
 *  Phase 2 — CN pinned (cnRect.top <= 0, cnRect.bottom >= vh):
 *    CN's timeline takes over globeYOffset and drives it to final.
 *    Starts at the nudged value = continuous, no snap.
 *
 *  Phase 3 — CN exit (cnRect.bottom < vh):
 *    translateY = cnRect.bottom - vh → globe follows CN off-screen.
 *
 * TUNING:
 *  NUDGE_3D — how much the globe rises in 3D units during approach.
 *             Higher = more rise. 0.4 is subtle, 0.8 is dramatic.
 *  Exported so CN section can compute its start value.
 */

import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import CreatorGlobe from "./Creatorglobe";
import CreatorGlobeOffsetGroup from "./Creatorglobeoffsetgroup";
import { creatorGlobeState } from "./Creatorglobestate";

// How much the globe rises in 3D units during the approach scroll.
// globeYOffset goes from ENTRY_Y → (ENTRY_Y - NUDGE_3D).
// Higher = more visible peek. Tune to taste.
const NUDGE_3D = 0.4;

// Rocket-phase end values — where the globe is when rocket section unpins.
// Globe stays centered during rocket phase (no X shift).
// Must match RocketLaunchSection: globeYOffset = GLOBE_3D_MID_Y (1.2),
// globeXOffset stays at initial 1.18 (no tween moves it).
const GLOBE_ENTRY_Y = 1.0;
const GLOBE_ENTRY_X = 1.18;  // adjusted for full-width canvas (was 1.05)

// Export for CN section to compute its start values.
export { NUDGE_3D, GLOBE_ENTRY_Y, GLOBE_ENTRY_X };

/* ══════════════════════════════════════════════════════
   TOOLTIP
   ══════════════════════════════════════════════════════ */

function CreatorTooltip({ data, tooltipRef }) {
  if (!data) return null;
  return (
    <div
      ref={tooltipRef}
      className="absolute z-50 pointer-events-none transition-opacity duration-150 ease-out"
      style={{ left: 0, top: 0, opacity: 0 }}
    >
      <div
        className="relative w-[260px] p-4"
        style={{
          background: "rgba(10,10,14,0.65)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span className="absolute top-0 left-0 w-3.5 h-px bg-[#FF6F21]" />
        <span className="absolute top-0 left-0 w-px h-3.5 bg-[#FF6F21]" />
        <span className="absolute top-0 right-0 w-3.5 h-px bg-[#FF6F21]" />
        <span className="absolute top-0 right-0 w-px h-3.5 bg-[#FF6F21]" />
        <span className="absolute bottom-0 left-0 w-3.5 h-px bg-[#FF6F21]" />
        <span className="absolute bottom-0 left-0 w-px h-3.5 bg-[#FF6F21]" />
        <span className="absolute bottom-0 right-0 w-3.5 h-px bg-[#FF6F21]" />
        <span className="absolute bottom-0 right-0 w-px h-3.5 bg-[#FF6F21]" />

        <div className="flex items-center gap-3 mb-4">
          <img src={data.avatar} alt="" className="w-9 h-9 rounded-full border border-white/15 object-cover" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-[13px] font-semibold truncate">{data.handle}</span>
              {data.platform === "x" && (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-300 shrink-0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              )}
              {data.platform === "instagram" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-pink-500 shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              )}
              {data.platform === "tiktok" && (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white shrink-0"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              )}
            </div>
            <span className="text-white/30 text-[9px] uppercase tracking-[0.12em] mt-0.5">{data.nodeId}</span>
          </div>
        </div>

        <div className="flex gap-4 mb-3.5 pb-3.5 border-b border-white/[0.07]">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-1.5 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" /><span className="text-white/45 text-[10px] font-medium">Monthly</span></div>
            <span className="text-white text-xl font-bold leading-none">{data.monthlyInstalls}</span>
            <span className="text-[10px] font-medium mt-1"><span className="text-[#4ade80]">{data.growth}</span><span className="text-white/30 ml-1">v. last mo</span></span>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-1.5 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF8C21]" /><span className="text-white/45 text-[10px] font-medium">Total Reach</span></div>
            <span className="text-white text-xl font-bold leading-none">{data.totalInstalls}</span>
            <span className="text-[10px] font-medium mt-1"><span className="text-[#FF8C21]">+{data.viralCoeff}x</span><span className="text-white/30 ml-1">viral coeff</span></span>
          </div>
        </div>

        <div className="flex flex-col gap-[7px]">
          {data.sources.map((source, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-white/50 text-[12px]">{source.name}</span>
              <span className="text-white font-semibold text-[12px] tabular-nums">{source.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   GLOBE CANVAS
   ══════════════════════════════════════════════════════ */

export default function GlobeCanvas() {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const lastDataRef = useRef(null);
  const [tooltipData, setTooltipData] = useState(null);

  useEffect(() => {
    let rafId;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const el = containerRef.current;
      if (!el) return;

      // ── Opacity ──
      el.style.opacity = String(creatorGlobeState.globeOpacity);

      // ── Scroll tracking ──
      const cnEl = creatorGlobeState.cnSectionEl;
      const vh = window.innerHeight;
      let offsetY = 0;

      if (cnEl) {
        const cnRect = cnEl.getBoundingClientRect();

        if (cnRect.top > vh * 0.25) {
          // Phase 1: CN approaching — nudge globe UP in 3D.
          // Threshold of 2px prevents sub-pixel rounding from
          // triggering this during CN pin and overwriting GSAP values.
          // approach: 0 (CN at bottom of viewport) → 1 (CN at top, about to pin)
          const approach = Math.max(0, 1 - cnRect.top / vh);
          const targetY = GLOBE_ENTRY_Y - (NUDGE_3D * approach);
          // Lerp instead of snap — lets scrubbed timeline hand off smoothly
          creatorGlobeState.globeYOffset += (targetY - creatorGlobeState.globeYOffset) * 0.04;
          offsetY = 0;
        } else if (cnRect.bottom < vh) {
          // Phase 3: CN leaving — follow via top position
          offsetY = cnRect.top;
        } else {
          // Phase 2: CN pinned or post-pin gap
          offsetY = Math.min(0, cnRect.top);
        }
      }

      el.style.transform = `translateY(${offsetY}px)`;

      // ── Tooltip ──
      const currentData = creatorGlobeState.hoveredData;
      if (currentData !== lastDataRef.current) {
        lastDataRef.current = currentData;
        if (currentData) {
          const { position, ...safeData } = currentData;
          setTooltipData(safeData);
        } else {
          setTooltipData(null);
        }
      }
      if (tooltipRef.current) {
        if (currentData) {
          tooltipRef.current.style.transform = `translate(${creatorGlobeState.tooltipX + 25}px, ${creatorGlobeState.tooltipY - 100}px)`;
          tooltipRef.current.style.opacity = "1";
        } else {
          tooltipRef.current.style.opacity = "0";
        }
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 right-0 z-30 hidden md:block"
      style={{ opacity: 0, pointerEvents: "none", height: "130vh" }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <CreatorGlobeOffsetGroup>
          <group position={[-1.18, -0.25, 0.73]} rotation={[-0.2, 0.64, 1.23]}>
            <CreatorGlobe containerRef={containerRef} />
          </group>
        </CreatorGlobeOffsetGroup>
      </Canvas>
      <CreatorTooltip data={tooltipData} tooltipRef={tooltipRef} />
    </div>
  );
}