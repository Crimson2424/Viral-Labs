/**
 * RocketLaunchSection — Combined ViralEngine + CreatorNetwork
 */

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./gsapConfig";
import GlobalGrid from "./Globalgrid";
import { CubesSvg, GlowLineSvg, RocketThrustersSvg } from "./SvgAssets";
import { creatorGlobeState } from "./creatorGlobeState";

/* ══════════════════════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════════════════════ */

const FRAME_HEIGHTS = {
  f2: 148, f3: 144, f4: 166, f5: 63, f6: 235, f7: 305, thrusters: 42,
};
const FRAME_WIDTH = 450;
const THRUSTER_WIDTH = 182;
const TOTAL_HEIGHT = Object.values(FRAME_HEIGHTS).reduce((a, b) => a + b, 0);

/* ══════════════════════════════════════════════════════
   TUNING CONTROLS
   ══════════════════════════════════════════════════════ */

const ROCKET_START_TOP = "45%";
const ROCKET_RISE_TOP = "35%";
const ROCKET_TILT_TOP = "33%";
const ROCKET_TILT_LEFT = "72%";
const ROCKET_TILT_DEG = 45;
const ROCKET_START_SCALE = 0.75;
const ROCKET_FULL_SCALE = 1;

const GLOBE_3D_START_Y = 1.3;
const GLOBE_3D_MID_Y = 1.2;
const GLOBE_3D_START_X = 1.05;
const GLOBE_3D_MID_X = 1.05;

const SCROLL_LENGTH = "+=850%";    // extra room for CN reading hold at end
const SCRUB_SMOOTHING = 1.8;

/* ── Thruster flame origins ── */
const FLAME_ORIGINS = [
  { selector: ".thruster-center .thruster-flame", origin: "91 6.3" },
  { selector: ".thruster-left-inner .thruster-flame", origin: "49.5 12.7" },
  { selector: ".thruster-left-outer .thruster-flame", origin: "29 8.1" },
  { selector: ".thruster-right-outer .thruster-flame", origin: "153 6.3" },
  { selector: ".thruster-right-inner .thruster-flame", origin: "129.5 11.8" },
];

/* ── Thruster flame intensity ── */
const FLAME_IDLE_OPACITY = [0.4, 0.7];
const FLAME_IDLE_SCALE = [0.8, 1.4];
const FLAME_IGNITE_SCALE = 1.8;
const FLAME_EXIT_SCALES = [1.8, 1.5, 2.0, 1.6];
const BASE_IDLE_OPACITY = [0.5, 0.8];

const rand = (min, max) => min + Math.random() * (max - min);

const PIPELINE_STAGES = [
  { title: "SIGNAL INPUT", description: "ICP analysis, category patterns, platform behaviour, content signals" },
  { title: "PROCESSING LAYER", description: "Message development, content structuring, test design, iteration logic" },
  { title: "Distribution Layer", description: "Multi-account UGC engines, publishing systems, launch execution, channel coordination" },
  { title: "AMPLIFICATION LAYER", description: "Creator networks, engagement groups, reposting infrastructure, high-reach distribution nodes" },
];

const CN_STATS = [
  { value: "1BN+", label: "Views per month through our engagement network" },
  { value: "8,000+", label: "Videos per month uploaded" },
  { value: "300+", label: "Creators" },
];

/* ══════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════ */

// SplitText + overflow mask wrapper (reusable)
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
   CONNECTOR LINE
   ══════════════════════════════════════════════════════ */

const ConnectorLine = ({ className = "" }) => (
  <svg
    width="435" height="35" viewBox="0 0 435 35" fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <path d="M434 33.7852L409 0.5H0.5" stroke="#F1F1F1" strokeLinecap="square" />
  </svg>
);

/* ══════════════════════════════════════════════════════
   TOOLTIP
   ══════════════════════════════════════════════════════ */

function CreatorTooltip({ data, tooltipRef }) {
  if (!data) return null;
  return (
    <div ref={tooltipRef} className="absolute z-50 pointer-events-none transition-opacity duration-150 ease-out" style={{ left: 0, top: 0, opacity: 0 }}>
      <div className="relative w-[260px] p-4" style={{ background: "rgba(10,10,14,0.65)", backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <span className="absolute top-0 left-0 w-3.5 h-px bg-[#FF6F21]" /><span className="absolute top-0 left-0 w-px h-3.5 bg-[#FF6F21]" />
        <span className="absolute top-0 right-0 w-3.5 h-px bg-[#FF6F21]" /><span className="absolute top-0 right-0 w-px h-3.5 bg-[#FF6F21]" />
        <span className="absolute bottom-0 left-0 w-3.5 h-px bg-[#FF6F21]" /><span className="absolute bottom-0 left-0 w-px h-3.5 bg-[#FF6F21]" />
        <span className="absolute bottom-0 right-0 w-3.5 h-px bg-[#FF6F21]" /><span className="absolute bottom-0 right-0 w-px h-3.5 bg-[#FF6F21]" />
        <div className="flex items-center gap-3 mb-4">
          <img src={data.avatar} alt="" className="w-9 h-9 rounded-full border border-white/15 object-cover" />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-white text-[13px] font-semibold truncate">{data.handle}</span>
              {data.platform === "x" && (<svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-gray-300 shrink-0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>)}
              {data.platform === "instagram" && (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-pink-500 shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>)}
              {data.platform === "tiktok" && (<svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white shrink-0"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>)}
            </div>
            <span className="text-white/30 text-[9px] uppercase tracking-[0.12em] mt-0.5">{data.nodeId}</span>
          </div>
        </div>
        <div className="flex gap-4 mb-3.5 pb-3.5 border-b border-white/[0.07]">
          <div className="flex-1 flex flex-col"><div className="flex items-center gap-1.5 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" /><span className="text-white/45 text-[10px] font-medium">Monthly</span></div><span className="text-white text-xl font-bold leading-none">{data.monthlyInstalls}</span><span className="text-[10px] font-medium mt-1"><span className="text-[#4ade80]">{data.growth}</span><span className="text-white/30 ml-1">v. last mo</span></span></div>
          <div className="flex-1 flex flex-col"><div className="flex items-center gap-1.5 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF8C21]" /><span className="text-white/45 text-[10px] font-medium">Total Reach</span></div><span className="text-white text-xl font-bold leading-none">{data.totalInstalls}</span><span className="text-[10px] font-medium mt-1"><span className="text-[#FF8C21]">+{data.viralCoeff}x</span><span className="text-white/30 ml-1">viral coeff</span></span></div>
        </div>
        <div className="flex flex-col gap-[7px]">
          {data.sources.map((source, index) => (<div key={index} className="flex justify-between items-center"><span className="text-white/50 text-[12px]">{source.name}</span><span className="text-white font-semibold text-[12px] tabular-nums">{source.value.toLocaleString()}</span></div>))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════ */

export default function RocketLaunchSection({ viewRef }) {
  const sectionRef = useRef(null);
  const tooltipRef = useRef(null);
  const lastDataRef = useRef(null);
  const [tooltipData, setTooltipData] = useState(null);

  const rocketGroupRef = useRef(null);
  const f2Ref = useRef(null);
  const f3Ref = useRef(null);
  const f4Ref = useRef(null);
  const f5Ref = useRef(null);
  const f6Ref = useRef(null);
  const f7Ref = useRef(null);
  const thrusterRef = useRef(null);
  const idleTweensRef = useRef([]);

  const veSubtitleRef = useRef(null);
  const veHeadingRef = useRef(null);
  const veGlowRef = useRef(null);
  const veBody1Ref = useRef(null);
  const veBody2Ref = useRef(null);

  const label1Ref = useRef(null);
  const label2Ref = useRef(null);
  const label3Ref = useRef(null);
  const label4Ref = useRef(null);

  const cnLabelRef = useRef(null);
  const cnHeadingRef = useRef(null);
  const cnGlowRef = useRef(null);
  const cnDesc1Ref = useRef(null);
  const cnDesc2Ref = useRef(null);
  const cnStatsRef = useRef(null);
  const globeDivRef = useRef(null);
  const globeBlockerRef = useRef(null);

  /* ── TOOLTIP RAF POLL ── */
  useGSAP(() => {
    let rafId;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const currentData = creatorGlobeState.hoveredData;
      if (currentData !== lastDataRef.current) {
        lastDataRef.current = currentData;
        if (currentData) { const { position, ...safeData } = currentData; setTooltipData(safeData); }
        else setTooltipData(null);
      }
      if (!tooltipRef.current) return;
      if (currentData) {
        tooltipRef.current.style.transform = `translate(${creatorGlobeState.tooltipX + 25}px, ${creatorGlobeState.tooltipY - 100}px)`;
        tooltipRef.current.style.opacity = "1";
      } else { tooltipRef.current.style.opacity = "0"; }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, { scope: sectionRef });

  /* ══════════════════════════════════════════════
     MASTER SCROLL TIMELINE
     ══════════════════════════════════════════════ */
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rocketGroup = rocketGroupRef.current;
    const globeDiv = globeDivRef.current;
    const thrusterSvg = thrusterRef.current;
    const frames = [f2Ref.current, f3Ref.current, f4Ref.current, f5Ref.current, f6Ref.current, f7Ref.current, thrusterSvg];
    const labels = [label1Ref.current, label2Ref.current, label3Ref.current, label4Ref.current];
    const veGlow = veGlowRef.current;

    /* ── SplitText all text elements with mask wrappers ── */

    // VE texts
    const veSubtitleSplit = splitAndMask(veSubtitleRef.current, "lines");
    const veHeadingSplit = splitAndMask(veHeadingRef.current, "lines, chars");
    const veBody1Split = splitAndMask(veBody1Ref.current, "lines");
    const veBody2Split = splitAndMask(veBody2Ref.current, "lines");

    // CN texts
    const cnLabelSplit = splitAndMask(cnLabelRef.current, "lines");
    const cnHeadingSplit = splitAndMask(cnHeadingRef.current, "lines, chars");
    const cnDesc1Split = splitAndMask(cnDesc1Ref.current, "lines");
    const cnDesc2Split = splitAndMask(cnDesc2Ref.current, "lines");

    // CN non-text elements (stats + tags animated via refs directly)
    const cnStatsEl = cnStatsRef.current;

    /* ── SET INITIAL STATES ── */
    gsap.set(rocketGroup, { xPercent: -50, yPercent: -50, x: 0, y: 0, rotation: 0, scale: ROCKET_START_SCALE, left: "50%", top: ROCKET_START_TOP });
    frames.forEach((frame) => gsap.set(frame, { y: 0 }));

    // VE subtitle — lines pushed down + blurred
    gsap.set(veSubtitleSplit.elements, { yPercent: 110, filter: "blur(6px)" });

    // VE heading — chars pushed down + blurred
    gsap.set(veHeadingSplit.split.chars, { yPercent: 120, opacity: 0, filter: "blur(6px)" });

    // VE glow line
    gsap.set(veGlow, { scaleX: 0, transformOrigin: "left center", opacity: 0 });

    // VE body — lines pushed down + blurred
    gsap.set(veBody1Split.elements, { yPercent: 110, filter: "blur(5px)" });
    gsap.set(veBody2Split.elements, { yPercent: 110, filter: "blur(5px)" });

    // Stage labels
    labels.forEach((label) => gsap.set(label, { opacity: 0, scale: 0.85, filter: "blur(6px)" }));

    // Globe
    gsap.set(globeDiv, { opacity: 0, pointerEvents: "none" });
    // Blocker — intercepts clicks above globe during rocket phases
    gsap.set(globeBlockerRef.current, { pointerEvents: "auto" });
    creatorGlobeState.globeYOffset = GLOBE_3D_START_Y;
    creatorGlobeState.globeXOffset = GLOBE_3D_START_X;
    creatorGlobeState.interactive = false;

    // CN label — lines pushed down + blurred
    gsap.set(cnLabelSplit.elements, { yPercent: 110, filter: "blur(6px)" });

    // CN heading — chars pushed down + blurred
    gsap.set(cnHeadingSplit.split.chars, { yPercent: 120, opacity: 0, filter: "blur(6px)" });

    // CN glow
    gsap.set(cnGlowRef.current, { scaleX: 0, transformOrigin: "right center", opacity: 0 });

    // CN descriptions — lines pushed down + blurred
    gsap.set(cnDesc1Split.elements, { yPercent: 110, filter: "blur(5px)" });
    gsap.set(cnDesc2Split.elements, { yPercent: 110, filter: "blur(5px)" });

    // CN stats
    gsap.set(cnStatsEl, { opacity: 0, y: 30, filter: "blur(6px)" });

    /* ── THRUSTER IDLE FLICKER ── */
    const flames = thrusterSvg ? thrusterSvg.querySelectorAll(".thruster-flame") : [];
    const bases = thrusterSvg ? thrusterSvg.querySelectorAll(".thruster-base") : [];
    const idleTweens = idleTweensRef.current;

    gsap.set(flames, { opacity: 0, scaleY: 0 });
    gsap.set(bases, { opacity: 0 });

    if (thrusterSvg) {
      FLAME_ORIGINS.forEach(({ selector, origin }) => {
        const el = thrusterSvg.querySelector(selector);
        if (el) gsap.set(el, { svgOrigin: origin });
      });
    }

    function flickerFlame(flame) {
      const tween = gsap.to(flame, {
        opacity: rand(FLAME_IDLE_OPACITY[0], FLAME_IDLE_OPACITY[1]),
        scaleY: rand(FLAME_IDLE_SCALE[0], FLAME_IDLE_SCALE[1]),
        duration: rand(0.12, 0.35),
        ease: "sine.inOut",
        onComplete: () => flickerFlame(flame),
      });
      idleTweens.push(tween);
    }

    let flickerStarted = false;
    function startIdleFlicker() {
      if (flickerStarted) return;
      flickerStarted = true;
      bases.forEach((base) => {
        gsap.to(base, {
          opacity: rand(BASE_IDLE_OPACITY[0], BASE_IDLE_OPACITY[1]),
          duration: 0.3, ease: "power2.out",
          onComplete: () => {
            gsap.to(base, { opacity: rand(BASE_IDLE_OPACITY[0], BASE_IDLE_OPACITY[1]), duration: rand(0.2, 0.5), repeat: -1, yoyo: true, ease: "sine.inOut" });
          },
        });
      });
      flames.forEach((flame, i) => {
        gsap.to(flame, {
          opacity: FLAME_IDLE_OPACITY[0], scaleY: FLAME_IDLE_SCALE[0],
          duration: 0.35, delay: i * 0.05, ease: "power2.out",
          onComplete: () => flickerFlame(flame),
        });
      });
    }

    /* ── MASTER TIMELINE ── */
    const master = gsap.timeline({
      scrollTrigger: {
        trigger: section, start: "top top", end: SCROLL_LENGTH,
        pin: true, scrub: SCRUB_SMOOTHING, anticipatePin: 1,
        onUpdate: (self) => {
          // Timeline goes 0–20. Position 16 = CN phase starts.
          // 16/20 = 0.8 progress.
          const cnActive = self.progress > 0.78;
          creatorGlobeState.interactive = cnActive;
        },
        onLeaveBack: () => {
          gsap.set(globeDiv, { opacity: 0, pointerEvents: "none" });
          gsap.set(globeBlockerRef.current, { pointerEvents: "auto" });
          creatorGlobeState.globeYOffset = GLOBE_3D_START_Y;
          creatorGlobeState.globeXOffset = GLOBE_3D_START_X;
          creatorGlobeState.interactive = false;
        },
        onLeave: () => {
          gsap.set(globeDiv, { opacity: 1, pointerEvents: "auto" });
          gsap.set(globeBlockerRef.current, { pointerEvents: "none" });
          creatorGlobeState.globeYOffset = 0;
          creatorGlobeState.globeXOffset = 0;
          creatorGlobeState.interactive = true;
        },
      },
    });

    /* ═══ PHASE 0 — ENTRY (0 → 1) ═══ */
    master.to(rocketGroup, { scale: ROCKET_START_SCALE + 0.03, duration: 1, ease: "none" }, 0);

    /* ═══ PHASE 1A — ROCKET RISES (1 → 2.5) ═══ */
    master.call(startIdleFlicker, [], 0.8);
    master.to(rocketGroup, {
      top: ROCKET_RISE_TOP,
      scale: ROCKET_START_SCALE + (ROCKET_FULL_SCALE - ROCKET_START_SCALE) * 0.4,
      duration: 1.5, ease: "none",
    }, 1);
    master.to(flames, {
      opacity: 1, scaleY: FLAME_IGNITE_SCALE, duration: 1,
      stagger: { each: 0.06, from: "random" }, ease: "none", overwrite: true,
    }, 1);
    master.to(bases, { opacity: 1, duration: 0.8, ease: "none", overwrite: true }, 1.1);
    master.to(globeDiv, { opacity: 1, duration: 1, ease: "none" }, 1.5);
    master.to(creatorGlobeState, { globeYOffset: GLOBE_3D_MID_Y, duration: 1.5, ease: "none" }, 1.5);

    /* ═══ PHASE 1B — TILT + SHIFT RIGHT (2.5 → 4) ═══ */
    master.to(rocketGroup, {
      rotation: ROCKET_TILT_DEG, left: ROCKET_TILT_LEFT, top: ROCKET_TILT_TOP,
      scale: ROCKET_FULL_SCALE, duration: 1.5, ease: "none",
    }, 2.5);
    master.to(creatorGlobeState, { globeXOffset: GLOBE_3D_MID_X * 0.5, duration: 2, ease: "none" }, 2.5);

    /* ═══ PHASE 2 — VE TEXT IN (4 → 6) ═══
       All text uses masked line/char reveal + deblur */

    // Subtitle — lines rise + deblur
    master.to(veSubtitleSplit.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "none",
    }, 4);

    // Heading — chars rise + deblur
    master.to(veHeadingSplit.split.chars, {
      yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.05, ease: "none",
    }, 4.3);

    // Glow line
    master.to(veGlow, { scaleX: 1, opacity: 1, duration: 1, ease: "none" }, 5.2);

    // Body paragraphs — lines rise + deblur
    master.to(veBody1Split.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.2, ease: "none",
    }, 5.5);
    master.to(veBody2Split.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "none",
    }, 6);

    /* ═══ PHASE 3 — LABELS + SEPARATION (6.5 → 11.5) ═══ */
    const GAP = 28;

    master.to(labels[0], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 6.5);
    [f3Ref, f4Ref, f5Ref, f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 1.2, ease: "none" }, 6.7);
    });

    master.to(labels[1], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 8);
    [f4Ref, f5Ref, f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 0.8, ease: "none" }, 8.2);
    });
    [f5Ref, f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 0.8, ease: "none" }, 8.7);
    });

    master.to(labels[2], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 9.5);
    [f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 1, ease: "none" }, 9.7);
    });

    master.to(labels[3], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 10.7);
    [f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 0.8, ease: "none" }, 10.9);
    });

    /* ═══ PHASE 4 — ROCKET EXIT + TEXT OUT (13 → 15.5) ═══
       ~2 units of hold after last label for reading time */

    // Disable globe interactivity during exit
    master.set(globeDiv, { pointerEvents: "none" }, 13);
    master.set(globeBlockerRef.current, { pointerEvents: "auto" }, 13);

    master.to(rocketGroup, { left: "130%", top: "-30%", scale: 0.7, duration: 2.5, ease: "none" }, 13);
    master.to(flames, {
      keyframes: [
        { scaleY: FLAME_EXIT_SCALES[0], opacity: 1, duration: 0.12 },
        { scaleY: FLAME_EXIT_SCALES[1], opacity: 0.85, duration: 0.15 },
        { scaleY: FLAME_EXIT_SCALES[2], opacity: 1, duration: 0.1 },
        { scaleY: FLAME_EXIT_SCALES[3], opacity: 0.9, duration: 0.13 },
      ],
      stagger: { each: 0.04, from: "random" }, ease: "none", overwrite: true,
    }, 13);

    // VE subtitle out — lines rise up + blur
    master.to(veSubtitleSplit.elements, {
      yPercent: -110, filter: "blur(6px)", duration: 1, stagger: 0.1, ease: "none",
    }, 13);

    // VE heading out — chars rise up + blur
    master.to(veHeadingSplit.split.chars, {
      yPercent: -120, opacity: 0, filter: "blur(6px)", duration: 1.2, stagger: 0.03, ease: "none",
    }, 13);

    // VE glow out
    master.to(veGlow, { scaleX: 0, opacity: 0, duration: 0.8, ease: "none" }, 13);

    // VE body out — lines rise up + blur
    master.to(veBody1Split.elements, {
      yPercent: -110, filter: "blur(5px)", duration: 0.8, stagger: 0.08, ease: "none",
    }, 13.3);
    master.to(veBody2Split.elements, {
      yPercent: -110, filter: "blur(5px)", duration: 0.8, stagger: 0.08, ease: "none",
    }, 13.5);

    // Labels out
    labels.forEach((label, i) => {
      master.to(label, { opacity: 0, scale: 0.85, filter: "blur(6px)", duration: 0.8, ease: "none" }, 13 + i * 0.12);
    });

    /* ═══ PHASE 5 — GLOBE FINAL + CN CONTENT (15.5 → 18) ═══ */

    master.to(creatorGlobeState, { globeYOffset: 0, globeXOffset: 0, duration: 2, ease: "none" }, 15.5);

    // Enable globe interactivity once CN section is active
    master.set(globeDiv, { pointerEvents: "auto" }, 16);
    master.set(globeBlockerRef.current, { pointerEvents: "none" }, 16);

    // CN label — lines rise + deblur
    master.to(cnLabelSplit.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "none",
    }, 16);

    // CN heading — chars rise + deblur
    master.to(cnHeadingSplit.split.chars, {
      yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.04, ease: "none",
    }, 16.2);

    // CN glow line — scales in from right
    master.to(cnGlowRef.current, {
      scaleX: 1, opacity: 1, duration: 0.8, ease: "none",
    }, 16.7);

    // CN descriptions — lines rise + deblur
    master.to(cnDesc1Split.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.2, ease: "none",
    }, 16.8);
    master.to(cnDesc2Split.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "none",
    }, 17.1);

    // CN stats — fade up + deblur
    master.to(cnStatsEl, {
      opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "none",
    }, 17.3);

    // ═══ END HOLD — empty space so CN stays visible before unpin ═══
    // This extends the timeline to ~20, giving ~2 units of reading time
    master.set({}, {}, 20);

    return () => { idleTweens.forEach((t) => t.kill()); idleTweens.length = 0; };

  }, { scope: sectionRef });

  /* ══════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════ */
  return (
    <section ref={sectionRef} className="rocket-launch-section relative z-25 w-full h-screen">
      <GlobalGrid />

      <div ref={(el) => { globeDivRef.current = el; if (viewRef) viewRef.current = el; }}
        className="absolute z-10 top-0 bottom-0 left-[105px] right-[105px] opacity-0" />

      {/* Blocker — sits above globe to intercept pointer events during rocket phases */}
      <div ref={globeBlockerRef}
        className="absolute z-20 top-0 bottom-0 left-[105px] right-[105px]"
        style={{ pointerEvents: "auto" }} />

      <CreatorTooltip data={tooltipData} tooltipRef={tooltipRef} />

      <div className="absolute inset-0 overflow-hidden">

        <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
        <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
        <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

        {/* ROCKET ASSEMBLY */}
        <div ref={rocketGroupRef} className="absolute z-40 flex flex-col items-center"
          style={{ width: `calc(82vh * ${FRAME_WIDTH} / ${TOTAL_HEIGHT})`, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <img ref={f2Ref} src="/svgs/Rocket frame 2.svg" alt="" className="w-full h-auto block" draggable={false} />
          <img ref={f3Ref} src="/svgs/Rocket frame 3.svg" alt="" className="w-full h-auto block" style={{ marginTop: "-4px" }} draggable={false} />
          <img ref={f4Ref} src="/svgs/Rocket frame 4.svg" alt="" className="w-full h-auto block" style={{ marginTop: "-4px" }} draggable={false} />
          <img ref={f5Ref} src="/svgs/Rocket Frame 5.svg" alt="" className="w-full h-auto block" style={{ marginTop: "-4px" }} draggable={false} />
          <img ref={f6Ref} src="/svgs/Rocket frame 6.svg" alt="" className="w-full h-auto block" style={{ marginTop: "-4px" }} draggable={false} />
          <img ref={f7Ref} src="/svgs/Rocket Frame 7.svg" alt="" className="w-full h-auto block" style={{ marginTop: "-4px" }} draggable={false} />
          <RocketThrustersSvg
            ref={thrusterRef}
            className="block h-auto pointer-events-none w-[36%] -mt-2.5 relative z-[1]"
          />
        </div>

        {/* VE LEFT-SIDE TEXT */}
        <div className="absolute z-40 left-42 top-[5%] max-w-[460px] pointer-events-none flex flex-col">
          <div className="flex flex-col gap-0">
            <p ref={veSubtitleRef} className="font-host text-sm text-vl-orange uppercase tracking-wide">
              STRUCTURED IN. VIRAL OUT.
            </p>
            <h2 ref={veHeadingRef} className="font-host text-5xl tracking-tight leading-[1.06]">
              Inside The<br />Viral Engine
            </h2>
          </div>
          <div className="flex flex-col gap-0 mt-16">
            <GlowLineSvg ref={veGlowRef} className="w-48 h-auto -ml-2.5" />
            <p ref={veBody1Ref} className="font-host text-base text-white tracking-tighter leading-normal mt-2">
              Behind every campaign is a structured growth system. The Viral Engine connects creator networks, content distribution pathways, and performance feedback loops into a single operating framework.
            </p>
            <p ref={veBody2Ref} className="font-host text-base text-white tracking-tight leading-normal">
              It&apos;s designed to turn attention into installs. It&apos;s not a campaign. It&apos;s a machine.
            </p>
          </div>
        </div>

        {/* STAGE LABELS */}

        <div ref={label1Ref} className="absolute z-40 pointer-events-none right-[24%] top-[5%] w-[450px]">
          <ConnectorLine className="w-full h-auto -mb-4" />
          <div className="flex items-start gap-1 w-fit ml-2">
            <CubesSvg className="w-5 h-auto mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bricolage text-lg text-white tracking-tighter leading-normal">{PIPELINE_STAGES[0].title}</h4>
              <p className="font-host text-sm text-[#a1a1a1] tracking-tighter leading-tight mt-0 max-w-[220px]">{PIPELINE_STAGES[0].description}</p>
            </div>
          </div>
        </div>

        <div ref={label2Ref} className="absolute z-40 pointer-events-none right-[32%] top-[20%] w-[450px]">
          <ConnectorLine className="w-full h-auto -mb-4" />
          <div className="flex items-start gap-1 w-fit ml-2">
            <CubesSvg className="w-5 h-auto mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bricolage text-lg text-white tracking-tighter leading-normal">{PIPELINE_STAGES[1].title}</h4>
              <p className="font-host text-sm text-[#a1a1a1] tracking-tighter leading-tight mt-1 max-w-[220px]">{PIPELINE_STAGES[1].description}</p>
            </div>
          </div>
        </div>

        <div ref={label3Ref} className="absolute z-40 pointer-events-none right-[8%] top-[50%] w-[400px]">
          <ConnectorLine className="w-full h-auto mb-2 scale-x-[-1] scale-y-[-1]" />
          <div className="flex items-start gap-3 ml-auto w-fit">
            <CubesSvg className="w-5 h-auto mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bricolage text-lg text-white tracking-tighter leading-normal">{PIPELINE_STAGES[2].title}</h4>
              <p className="font-host text-sm text-[#a1a1a1] tracking-tighter leading-tight mt-1 max-w-[220px]">{PIPELINE_STAGES[2].description}</p>
            </div>
          </div>
        </div>

        <div ref={label4Ref} className="absolute z-40 pointer-events-none right-[16%] top-[68%] w-[400px]">
          <ConnectorLine className="w-full h-auto mb-2 scale-x-[-1] scale-y-[-1]" />
          <div className="flex items-start gap-3 ml-auto w-fit">
            <CubesSvg className="w-5 h-auto mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bricolage text-lg text-white tracking-tighter leading-normal">{PIPELINE_STAGES[3].title}</h4>
              <p className="font-host text-sm text-[#a1a1a1] tracking-tighter leading-tight mt-1 max-w-[220px]">{PIPELINE_STAGES[3].description}</p>
            </div>
          </div>
        </div>

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
              <g filter="url(#rl-glow0)" style={{ mixBlendMode: "plus-lighter" }}><line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" /></g>
              <g filter="url(#rl-glow1)" style={{ mixBlendMode: "plus-lighter" }}><line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" /></g>
              <g filter="url(#rl-glow2)" style={{ mixBlendMode: "plus-lighter" }}><line x1="11" y1="11.5" x2="182" y2="11.5" stroke="#F05A1F" /></g>
              <defs>
                <filter id="rl-glow0" x="10" y="10" width="173" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="0.5" /></filter>
                <filter id="rl-glow1" x="5" y="5" width="183" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="3" /></filter>
                <filter id="rl-glow2" x="0" y="0" width="193" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="bg" /><feBlend in="SourceGraphic" in2="bg" result="shape" /><feGaussianBlur stdDeviation="5.5" /></filter>
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