/**
 * CreatorNetworkSection — Pinned section for Creator Network content.
 *
 * The globe arrives at this section after the approach nudge:
 *  globeYOffset = GLOBE_ENTRY_Y - NUDGE_3D (e.g. 1.2 - 0.4 = 0.8)
 *  globeXOffset = GLOBE_ENTRY_X (0.525)
 *
 * This section scrubs both to final CN position via GSAP timeline tweens.
 * Globe settle lives inside the master timeline (not onUpdate) so it
 * receives the same scrub: 1.8 smoothing — no snap on pin release.
 *
 * Tune CN_FINAL_Y / CN_FINAL_X at the top to position the globe.
 */

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./Gsapconfig";
import GlobalGrid from "./Globalgrid";
import { creatorGlobeState } from "./Creatorglobestate";
import { NUDGE_3D, GLOBE_ENTRY_Y, GLOBE_ENTRY_X } from "./Globecanvas";
import GlobalTexture from "./Globaltexture";

/* ══════════════════════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════════════════════ */

const SCROLL_LENGTH = "+=350%";
const SCRUB_SMOOTHING = 1.8;

// Globe 3D offsets at CN start (after approach nudge)
const CN_START_Y = GLOBE_ENTRY_Y - NUDGE_3D;  // e.g. 1.2 - 0.4 = 0.8
const CN_START_X = GLOBE_ENTRY_X;              // e.g. 1.18

// ┌─────────────────────────────────────────────────────┐
// │  TUNE THESE — Globe final resting position in CN.   │
// │  Y: more negative = higher on screen                │
// │  X: 0 = left (child group's -1.18 takes effect)    │
// └─────────────────────────────────────────────────────┘
const CN_FINAL_Y = -0.35;
const CN_FINAL_X = 0;

const CN_STATS = [
  { value: "1BN+", label: "Views per month through our engagement network" },
  { value: "8,000+", label: "Videos per month uploaded" },
  { value: "300+", label: "Creators" },
];

/* ══════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════ */

function splitAndMask(el, type = "lines") {
  const split = new SplitText(el, { type, linesClass: "split-mask-line" });
  const elements = type.includes("chars") ? split.chars : split.lines;
  split.lines.forEach((line) => {
    const mask = document.createElement("div");
    mask.style.overflow = "hidden";
    mask.style.display = "block";
    line.parentNode.insertBefore(mask, line);
    mask.appendChild(line);
  });
  return { split, elements };
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════ */

export default function CreatorNetworkSection() {
  const sectionRef = useRef(null);

  const cnLabelRef = useRef(null);
  const cnHeadingRef = useRef(null);
  const cnGlowRef = useRef(null);
  const cnDesc1Ref = useRef(null);
  const cnDesc2Ref = useRef(null);
  const cnStatsRef = useRef(null);

  /* ── Register section element for GlobeCanvas exit tracking ── */
  useEffect(() => {
    creatorGlobeState.cnSectionEl = sectionRef.current;
    return () => {
      creatorGlobeState.cnSectionEl = null;
    };
  }, []);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* ── SplitText ── */
    const cnLabelSplit = splitAndMask(cnLabelRef.current, "lines");
    const cnHeadingSplit = splitAndMask(cnHeadingRef.current, "lines, chars");
    const cnDesc1Split = splitAndMask(cnDesc1Ref.current, "lines");
    const cnDesc2Split = splitAndMask(cnDesc2Ref.current, "lines");
    const cnStatsEl = cnStatsRef.current;

    /* ── INITIAL STATES ── */
    gsap.set(cnLabelSplit.elements, { yPercent: 110, filter: "blur(6px)" });
    gsap.set(cnHeadingSplit.split.chars, { yPercent: 120, opacity: 0, filter: "blur(6px)" });
    gsap.set(cnGlowRef.current, { scaleX: 0, transformOrigin: "right center", opacity: 0 });
    gsap.set(cnDesc1Split.elements, { yPercent: 110, filter: "blur(5px)" });
    gsap.set(cnDesc2Split.elements, { yPercent: 110, filter: "blur(5px)" });
    gsap.set(cnStatsEl, { opacity: 0, y: 30, filter: "blur(6px)" });

    /* ── MASTER TIMELINE ── */
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: SCROLL_LENGTH,
        pin: true,
        scrub: SCRUB_SMOOTHING,
        anticipatePin: 1,

        onUpdate: (self) => {
          /* Interactive gate only — globe offsets are timeline tweens */
          const settleRatio = Math.min(1, self.progress / 0.25);
          creatorGlobeState.interactive = settleRatio > 0.8;
        },

        onLeaveBack: () => {
          // creatorGlobeState.globeXOffset = CN_START_X;
          // creatorGlobeState.globeYOffset = CN_START_Y;
          // creatorGlobeState.constellationOpacity = 0;
          creatorGlobeState.interactive = false;
        },
      },
    });

    /* ═══ GLOBE SETTLE — positions 0→2 (first ~25% of scroll) ═══
       Inside the timeline so it gets scrub: 1.8 smoothing.
       Tune CN_FINAL_Y / CN_FINAL_X at the top of this file. */
    master.to(creatorGlobeState, {
      globeXOffset: CN_FINAL_X,
      duration: 2,
      ease: "power2.out",
    }, 0);

    master.to(creatorGlobeState, {
      globeYOffset: CN_FINAL_Y,
      duration: 2,
      ease: "power2.out",
    }, 0);

    master.to(creatorGlobeState, {
      constellationOpacity: 1,
      duration: 2,
      ease: "power2.out",
    }, 0);

    /* ═══ CN LABEL ═══ */
    master.to(cnLabelSplit.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "none",
    }, 2);

    /* ═══ CN HEADING ═══ */
    master.to(cnHeadingSplit.split.chars, {
      yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.04, ease: "none",
    }, 2.3);

    /* ═══ CN GLOW LINE ═══ */
    master.to(cnGlowRef.current, {
      scaleX: 1, opacity: 1, duration: 0.8, ease: "none",
    }, 3);

    /* ═══ CN DESCRIPTIONS ═══ */
    master.to(cnDesc1Split.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.2, ease: "none",
    }, 3.2);
    master.to(cnDesc2Split.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "none",
    }, 3.8);

    /* ═══ CN STATS ═══ */
    master.to(cnStatsEl, {
      opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "none",
    }, 4.2);

    /* ═══ READING HOLD ═══ */
    master.set({}, {}, 8);

  }, { scope: sectionRef });

  /* ══════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════ */
  return (
    <section
      ref={sectionRef}
      className="creator-network-section relative z-25 w-full h-[140vh]"
    >
      {/* <GlobalGrid /> */}
      <GlobalTexture />

      <div className="absolute inset-0 overflow-hidden">

        {/* <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" /> */}

        {/* CN RIGHT-SIDE CONTENT */}
        <div className="absolute z-40 right-35 top-[4%] flex flex-col items-end max-w-[440px] pointer-events-none">
          <div className="flex flex-col gap-0 items-end">
            <p ref={cnLabelRef} className="font-host font-thin text-sm text-[#FF6F21] text-right uppercase tracking-normal">
              Creator Network
            </p>
            <h2 ref={cnHeadingRef} className="font-host font-medium text-5xl tracking-tighter leading-none text-right">
              Creator Operator<br />Network
            </h2>
          </div>

          <div className="flex flex-col items-end gap-3 mt-12">
            <svg ref={cnGlowRef} width="193" height="23" viewBox="0 0 193 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0">
              <g filter="url(#cn-glow0)" style={{ mixBlendMode: "plus-lighter" }}><line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" /></g>
              <g filter="url(#cn-glow1)" style={{ mixBlendMode: "plus-lighter" }}><line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" /></g>
              <g filter="url(#cn-glow2)" style={{ mixBlendMode: "plus-lighter" }}><line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" /></g>
              <defs>
                <filter id="cn-glow0" x="10" y="10" width="173" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="0.5" /></filter>
                <filter id="cn-glow1" x="5" y="5" width="183" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3" /></filter>
                <filter id="cn-glow2" x="0" y="0" width="193" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="5.5" /></filter>
              </defs>
            </svg>

            <p ref={cnDesc1Ref} className="font-host font-thin text-md text-right leading-tight -mt-1">
              We operate a coordinated network of 300+ creators, executing at a scale of 8,000+ monthly videos to meet specific category and audience objectives.
            </p>
            <p ref={cnDesc2Ref} className="font-host font-thin text-md text-right leading-relaxed">
              Our distribution model cumulatively reaches 1B+ views per month, ensuring consistent output and high-impact performance across all major platforms.
            </p>

            <div ref={cnStatsRef} className="grid grid-cols-1 gap-y-3 w-full max-w-[260px] mt-2">
              {CN_STATS.map((stat, i) => (
                <div key={i} className="relative flex flex-col gap-0.5 px-4 py-3">
                  <svg className="absolute top-0 left-0" width="14" height="14" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
                  <svg className="absolute top-0 right-0 scale-x-[-1]" width="14" height="14" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
                  <svg className="absolute bottom-0 left-0 scale-y-[-1]" width="14" height="14" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
                  <svg className="absolute bottom-0 right-0 scale-[-1]" width="14" height="14" viewBox="0 0 10 10" fill="none"><path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" /></svg>
                  <span className="font-host text-2xl tracking-tight">{stat.value}</span>
                  <svg width="100%" height="1" viewBox="0 0 134 1" fill="none" preserveAspectRatio="none"><line y1="0.5" x2="134" y2="0.5" stroke="#A1A1A1" /></svg>
                  <span className="font-host font-thin text-xs text-white/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}