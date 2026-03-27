/**
 * RocketLaunchSection — Rocket + Viral Engine only.
 *
 * Pin releases after label animations + reading hold.
 * Rocket stays centered + vertical (no tilt).
 * Labels: top 2 right, bottom 2 left.
 * Globe stays centered — no X shift during rocket phase.
 */

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./Gsapconfig";
import GlobalGrid from "./Globalgrid";
import { CubesSvg, GlowLineSvg, RocketThrustersSvg } from "./Svgassets";
import { creatorGlobeState } from "./Creatorglobestate";

/* ══════════════════════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════════════════════ */

const FRAME_HEIGHTS = {
  f2: 148, f3: 144, f4: 166, f5: 63, f6: 235, f7: 305, thrusters: 42,
};
const FRAME_WIDTH = 450;
const TOTAL_HEIGHT = Object.values(FRAME_HEIGHTS).reduce((a, b) => a + b, 0);

const ROCKET_START_TOP = "45%";
const ROCKET_RISE_TOP = "35%";
const ROCKET_FINAL_TOP = "33%";
const ROCKET_START_SCALE = 0.75;
const ROCKET_FULL_SCALE = 0.8;

const GLOBE_3D_START_Y = 1.3;
const GLOBE_3D_MID_Y = 1.2;
const GLOBE_3D_START_X = 1.05;

const SCROLL_LENGTH = "+=500%";
const SCRUB_SMOOTHING = 1.8;

const FLAME_ORIGINS = [
  { selector: ".thruster-center .thruster-flame", origin: "91 6.3" },
  { selector: ".thruster-left-inner .thruster-flame", origin: "49.5 12.7" },
  { selector: ".thruster-left-outer .thruster-flame", origin: "29 8.1" },
  { selector: ".thruster-right-outer .thruster-flame", origin: "153 6.3" },
  { selector: ".thruster-right-inner .thruster-flame", origin: "129.5 11.8" },
];

const FLAME_IDLE_OPACITY = [0.4, 0.7];
const FLAME_IDLE_SCALE = [0.8, 1.4];
const FLAME_IGNITE_SCALE = 1.8;
const BASE_IDLE_OPACITY = [0.5, 0.8];

const rand = (min, max) => min + Math.random() * (max - min);

const PIPELINE_STAGES = [
  { title: "SIGNAL INPUT", description: "ICP analysis, category patterns, platform behaviour, content signals" },
  { title: "PROCESSING LAYER", description: "Message development, content structuring, test design, iteration logic" },
  { title: "Distribution Layer", description: "Multi-account UGC engines, publishing systems, launch execution, channel coordination" },
  { title: "AMPLIFICATION LAYER", description: "Creator networks, engagement groups, reposting infrastructure, high-reach distribution nodes" },
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

/* Connector pointing LEFT → RIGHT (default direction) */
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
   MAIN COMPONENT
   ══════════════════════════════════════════════════════ */

export default function RocketLaunchSection() {
  const sectionRef = useRef(null);

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

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rocketGroup = rocketGroupRef.current;
    const thrusterSvg = thrusterRef.current;
    const frames = [f2Ref.current, f3Ref.current, f4Ref.current, f5Ref.current, f6Ref.current, f7Ref.current, thrusterSvg];
    const labels = [label1Ref.current, label2Ref.current, label3Ref.current, label4Ref.current];
    const veGlow = veGlowRef.current;

    const veSubtitleSplit = splitAndMask(veSubtitleRef.current, "lines");
    const veHeadingSplit = splitAndMask(veHeadingRef.current, "lines, chars");
    const veBody1Split = splitAndMask(veBody1Ref.current, "lines");
    const veBody2Split = splitAndMask(veBody2Ref.current, "lines");

    /* ── INITIAL STATES ── */
    gsap.set(rocketGroup, {
      xPercent: -50, yPercent: -50, x: 0, y: 0,
      rotation: 0, scale: ROCKET_START_SCALE,
      left: "50%", top: ROCKET_START_TOP,
    });
    frames.forEach((frame) => gsap.set(frame, { y: 0 }));
    gsap.set(veSubtitleSplit.elements, { yPercent: 120, filter: "blur(6px)" });
    gsap.set(veHeadingSplit.split.chars, { yPercent: 120, opacity: 0, filter: "blur(6px)" });
    gsap.set(veGlow, { scaleX: 0, transformOrigin: "left center", opacity: 0 });
    gsap.set(veBody1Split.elements, { yPercent: 120, filter: "blur(5px)" });
    gsap.set(veBody2Split.elements, { yPercent: 120, filter: "blur(5px)" });
    labels.forEach((label) => gsap.set(label, { opacity: 0, scale: 0.85, filter: "blur(6px)" }));

    creatorGlobeState.globeOpacity = 0;
    creatorGlobeState.globeYOffset = GLOBE_3D_START_Y;
    creatorGlobeState.globeXOffset = GLOBE_3D_START_X;
    creatorGlobeState.interactive = false;

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
            gsap.to(base, {
              opacity: rand(BASE_IDLE_OPACITY[0], BASE_IDLE_OPACITY[1]),
              duration: rand(0.2, 0.5), repeat: -1, yoyo: true, ease: "sine.inOut",
            });
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
        trigger: section,
        start: "top top",
        end: SCROLL_LENGTH,
        pin: true,
        scrub: SCRUB_SMOOTHING,
        anticipatePin: 1,
      },
    });

    /* ═══ PHASE 0 — ENTRY ═══ */
    master.to(rocketGroup, { scale: ROCKET_START_SCALE + 0.03, duration: 1, ease: "none" }, 0);

    /* ═══ PHASE 1A — ROCKET RISES ═══ */
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

    // Globe fades in
    master.to(creatorGlobeState, { globeOpacity: 1, duration: 1, ease: "none" }, 1.5);
    master.to(creatorGlobeState, { globeYOffset: GLOBE_3D_MID_Y, duration: 1.5, ease: "none" }, 1.5);

    /* ═══ PHASE 1B — SCALE UP (stays centered, no tilt) ═══ */
    master.to(rocketGroup, {
      top: ROCKET_FINAL_TOP,
      scale: ROCKET_FULL_SCALE, duration: 1.5, ease: "none",
    }, 2.5);

    /* ═══ PHASE 2 — VE TEXT IN ═══ */
    master.to(veSubtitleSplit.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "none",
    }, 4);
    master.to(veHeadingSplit.split.chars, {
      yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, stagger: 0.05, ease: "none",
    }, 4.3);
    master.to(veGlow, { scaleX: 1, opacity: 1, duration: 1, ease: "none" }, 5.2);
    master.to(veBody1Split.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.2, ease: "none",
    }, 5.5);
    master.to(veBody2Split.elements, {
      yPercent: 0, filter: "blur(0px)", duration: 1, stagger: 0.15, ease: "none",
    }, 6);

    /* ═══ PHASE 3 — LABELS + SEPARATION ═══ */
    const GAP = 28;

    /* Label 1 — Signal Input (RIGHT) */
    master.to(labels[0], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 6.5);
    [f3Ref, f4Ref, f5Ref, f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 1.2, ease: "none" }, 6.7);
    });

    /* Label 2 — Processing Layer (RIGHT) */
    master.to(labels[1], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 8);
    [f4Ref, f5Ref, f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 0.8, ease: "none" }, 8.2);
    });
    [f5Ref, f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 0.8, ease: "none" }, 8.7);
    });

    /* Label 3 — Distribution Layer (LEFT) */
    master.to(labels[2], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 9.5);
    [f6Ref, f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 1, ease: "none" }, 9.7);
    });

    /* Label 4 — Amplification Layer (LEFT) */
    master.to(labels[3], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "none" }, 10.7);
    [f7Ref, thrusterRef].forEach((ref) => {
      master.to(ref.current, { y: `+=${GAP}`, duration: 0.8, ease: "none" }, 10.9);
    });

    /* ═══ PHASE 4 — READING HOLD → PIN RELEASES ═══ */
    master.set({}, {}, 13);

    return () => {
      idleTweens.forEach((t) => t.kill());
      idleTweens.length = 0;
    };

  }, { scope: sectionRef });

  /* ══════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════ */
  return (
    <section ref={sectionRef} className="rocket-launch-section relative z-25 w-full h-screen">
      {/* <GlobalGrid /> */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
        <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
        <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

        {/* ROCKET ASSEMBLY — stays centered */}
        <div
          ref={rocketGroupRef}
          className="absolute z-40 flex flex-col items-center"
          style={{
            width: `calc(82vh * ${FRAME_WIDTH} / ${TOTAL_HEIGHT})`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
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

        {/* VE LEFT-SIDE TEXT — title + subtitle only */}
        <div className="absolute z-40 left-40 top-[2%] max-w-[460px] pointer-events-none flex flex-col">
          <div className="flex flex-col gap-0">
            <p ref={veSubtitleRef} className="font-host text-sm text-vl-orange uppercase tracking-wide">
              STRUCTURED IN. VIRAL OUT.
            </p>
            <h2 ref={veHeadingRef} className="font-host text-5xl tracking-tight leading-[1.06]">
              Inside The<br />Viral Engine
            </h2>
          </div>
        </div>

        {/* VE BODY — right side, bottom of rocket */}
        <div className="absolute z-40 right-[8%] top-[62%] bottom-[18%] max-w-[420px] pointer-events-none flex flex-col gap-0">
          <GlowLineSvg ref={veGlowRef} className="w-48 h-auto -ml-2.5" />
          <p ref={veBody1Ref} className="font-host text-sm font-thin text-white tracking-tighter leading-snug mt-0.5">
            Behind every <span className="font-medium">Engagement</span> is a structured distribution system. It starts with <span className="font-medium">Audience</span> and <span className="font-medium">Market signals</span>, converts them into content and <span className="font-medium">Message systems</span>, and executes them through coordinated <span className="font-medium">Publishing</span> and <span className="font-medium">Amplification infrastructure</span>.
          </p>

        </div>

        {/* ── STAGE LABELS ── */}

        {/* LABEL 1 — Signal Input (RIGHT side) */}
        <div ref={label1Ref} className="absolute z-40 pointer-events-none right-[24%] top-[5%] w-[420px]">
          <ConnectorLine className="w-full h-auto -mb-4 scale-x-[-1]" />
          <div className="flex items-start gap-1 w-fit ml-auto">
            <CubesSvg className="w-5 h-auto mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bricolage text-lg text-white tracking-tighter leading-normal">{PIPELINE_STAGES[0].title}</h4>
              <p className="font-host text-sm text-[#a1a1a1] tracking-tighter leading-tight mt-0 max-w-[280px]">{PIPELINE_STAGES[0].description}</p>
            </div>
          </div>
        </div>

        {/* LABEL 2 — Processing Layer (RIGHT side) */}
        <div ref={label2Ref} className="absolute z-40 pointer-events-none left-[24%] top-[20%] w-[420px]">
          <ConnectorLine className="w-full h-auto -mb-4" />
          <div className="flex items-start gap-1 w-fit ml-2">
            <CubesSvg className="w-5 h-auto mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bricolage text-lg text-white tracking-tighter leading-normal">{PIPELINE_STAGES[1].title}</h4>
              <p className="font-host text-sm text-[#a1a1a1] tracking-tighter leading-tight mt-1 max-w-[280px]">{PIPELINE_STAGES[1].description}</p>
            </div>
          </div>
        </div>

        {/* LABEL 3 — Distribution Layer (LEFT side) */}
        <div ref={label3Ref} className="absolute z-40 pointer-events-none right-[23%] top-[44%] w-[420px]">
          <ConnectorLine className="w-full h-auto -mb-4 scale-x-[-1]" />
          <div className="flex items-start gap-1 w-fit ml-auto">
            <CubesSvg className="w-5 h-auto mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bricolage text-lg text-white tracking-tighter leading-normal">{PIPELINE_STAGES[2].title}</h4>
              <p className="font-host text-sm text-[#a1a1a1] tracking-tighter leading-tight mt-1 max-w-[280px]">{PIPELINE_STAGES[2].description}</p>
            </div>
          </div>
        </div>

        {/* LABEL 4 — Amplification Layer (LEFT side) */}
        <div ref={label4Ref} className="absolute z-40 pointer-events-none left-[23%] top-[62%] w-[420px]">
          <ConnectorLine className="w-full h-auto -mb-4" />
          <div className="flex items-start gap-1 w-fit ml-2">
            <CubesSvg className="w-5 h-auto mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bricolage text-lg text-white tracking-tighter leading-normal">{PIPELINE_STAGES[3].title}</h4>
              <p className="font-host text-sm text-[#a1a1a1] tracking-tighter leading-tight mt-1 max-w-[280px]">{PIPELINE_STAGES[3].description}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}