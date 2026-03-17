/**
 * ViralitySection — "Virality Isn't Luck. It's Physics."
 *
 * PINNED SCRUB ANIMATION — single timeline, fully scroll-driven.
 *
 *   0  → 40   GLOBE ENTRANCE (viralityState.globeProgress 0→1)
 *   30 → 45   HEADER (label + heading lines)
 *   45 → 70   CARDS (clip-path wipe + slide)
 *   65 → 80   GLOW ELEMENTS (vertical/horizontal lines + cubes)
 *   78 → 90   BOTTOM TEXT (fade + slide up)
 *
 * All initial states via gsap.set(). All tweens use .to() only.
 * useGSAP hook for cleanup + scope.
 */

import { useRef } from "react";
import GlobalGrid from "./Globalgrid";
import GlobeScene from "./GlobeScene";
import { CardGlowH, CardGlowV, CardCubes } from "./SvgAssets";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../components/Gsapconfig";
import { viralityState } from "./viralityState";

// ════════════════════════════════════════════════
// MAIN SECTION
// ════════════════════════════════════════════════

export default function ViralitySection() {
  const sectionRef = useRef();
  const glowRef = useRef();

  useGSAP(
    () => {
      // ═══════════════════════════════════════
      // INITIAL STATES
      // ═══════════════════════════════════════

      gsap.set(viralityState, { globeProgress: 0 });

      gsap.set(".v-label", { opacity: 0, y: 20, filter: "blur(6px)" });

      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });

      gsap.set(".v-card-tl", {
        xPercent: -40,
        y: -30,
        opacity: 0,
        rotation: -4,
        scale: 0.92,
        filter: "blur(8px)",
      });
      gsap.set(".v-card-tr", {
        xPercent: 40,
        y: -30,
        opacity: 0,
        rotation: 4,
        scale: 0.92,
        filter: "blur(8px)",
      });
      gsap.set(".v-card-bl", {
        xPercent: -40,
        y: 30,
        opacity: 0,
        rotation: -4,
        scale: 0.92,
        filter: "blur(8px)",
      });
      gsap.set(".v-card-br", {
        xPercent: 40,
        y: 30,
        opacity: 0,
        rotation: 4,
        scale: 0.92,
        filter: "blur(8px)",
      });

      gsap.set(".v-glow-v", { clipPath: "inset(0 0 100% 0)" });
      gsap.set(".v-glow-h", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".v-cubes", { opacity: 0, scale: 0, transformOrigin: "center center" });

      gsap.set(".v-bottom-line", { opacity: 0, y: 24, filter: "blur(6px)" });

      // ═══════════════════════════════════════
      // SPLITTEXT
      // ═══════════════════════════════════════

      const headingSplit = SplitText.create(".v-heading", {
        type: "lines",
        mask: "lines",
        linesClass: "v-heading-line",
      });
      headingSplit.lines.forEach((line) => {
        if (line.parentElement) {
          line.parentElement.style.paddingBottom = "0.1em";
        }
      });
      gsap.set(headingSplit.lines, {
        yPercent: 110,
        rotationX: 40,
        transformOrigin: "left bottom",
      });

      // ═══════════════════════════════════════
      // PINNED SCRUB TIMELINE
      // ═══════════════════════════════════════

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top -10%",
          end: "+=250%",
          pin: true,
          scrub: 2,
          pinSpacing: true,
          anticipatePin: 1,
        },
        defaults: { ease: "none" },
      });

      // ── GLOBE ENTRANCE (0 → 40) ──

      tl.to(
        viralityState,
        { globeProgress: 1, duration: 40, ease: "power3.inOut" },
        0
      );

      // ── GLOW FADE IN (28 → 48) ──
      tl.to(
        glowRef.current,
        { opacity: 1, scale: 1, duration: 20, ease: "power4.out" },
        28
      );

      // ── HEADER (30 → 45) ──

      tl.to(
        ".v-label",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 10,
          ease: "power4.out",
        },
        30
      );

      tl.to(
        headingSplit.lines,
        {
          yPercent: 0,
          rotationX: 0,
          stagger: 2,
          duration: 12,
          ease: "power4.out",
        },
        32
      );

      // ── CARDS (45 → 70) ──

      tl.to(
        ".v-card-tl",
        {
          xPercent: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 16,
          ease: "power3.out",
        },
        45
      );

      tl.to(
        ".v-card-tr",
        {
          xPercent: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 16,
          ease: "power3.out",
        },
        47
      );

      tl.to(
        ".v-card-bl",
        {
          xPercent: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 16,
          ease: "power3.out",
        },
        51
      );

      tl.to(
        ".v-card-br",
        {
          xPercent: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 16,
          ease: "power3.out",
        },
        53
      );

      // ── GLOW ELEMENTS (65 → 80) ──

      tl.to(
        ".v-glow-v",
        {
          clipPath: "inset(0 0 0% 0)",
          stagger: 1.5,
          duration: 8,
          ease: "power3.out",
        },
        65
      );

      tl.to(
        ".v-glow-h",
        {
          clipPath: "inset(0 0% 0 0)",
          stagger: 1.5,
          duration: 7,
          ease: "power3.out",
        },
        68
      );

      tl.to(
        ".v-cubes",
        {
          opacity: 1,
          scale: 1,
          transformOrigin: "center center",
          stagger: 1,
          duration: 5,
          ease: "back.out(1.7)",
        },
        72
      );

      // ── BOTTOM TEXT (78 → 90) ──

      tl.to(
        ".v-bottom-line",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 3,
          duration: 10,
          ease: "power4.out",
        },
        78
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="virality-section relative w-full overflow-hidden">

      {/* Globe glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] z-[8]"
        aria-hidden="true"
        style={{
          width: "1100px",
          height: "1100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #5a1a12 0%, #351010 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Globe canvas — clipped between vertical border lines */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: "inset(0 105px)" }}
      >
        <GlobeScene className="absolute inset-0" />
      </div>

      <GlobalGrid />

      {/* Section border lines */}
      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      <div className="relative z-40 px-38 pt-24 pb-20 pointer-events-none">

        {/* ══ HEADER ══ */}
        <div className="flex flex-col items-center gap-1 mb-16" style={{ perspective: "600px" }}>
          <p className="v-label virality-label font-host font-normal text-base text-[#ff6f21] text-center leading-normal">
            WHY VIRALITY CAN BE ENGINEERED
          </p>
          <h2 className="v-heading virality-heading font-host font-medium text-6xl text-[#f1f1f1] tracking-tighter leading-none text-center">
            Virality Isn't Luck.
            <br />
            It's Physics.
          </h2>
        </div>

        {/* ══ GLOBE + CARDS AREA ══ */}
        <div className="relative mx-auto max-w-6xl min-h-[600px] mb-20">

          {/* ── Distribution (top-left) ── */}
          <div className="v-card-tl absolute left-10 top-24 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-55 h-25 flex flex-col items-start gap-2 px-5 py-2.5 bg-[#1d1d1d]/70 overflow-visible">
              <div className="absolute left-0 bottom-0 w-full h-13 bg-[#101010]/50" />
              <div className="relative font-bricolage text-2xl text-white tracking-tight leading-normal">
                Distribution
              </div>
              <p className="relative font-host text-sm font-thin text-white leading-5 tracking-normal self-stretch">
                Distribution networks amplify signal
              </p>
              <CardGlowH className="v-glow-h absolute -top-3 left-37.5 w-20 h-6" />
              <CardGlowV className="v-glow-v absolute -top-2.5 -left-3 w-6 h-30" />
              <CardCubes className="v-cubes absolute -top-2.5 -right-6 w-7 h-10" />
            </div>
          </div>

          {/* ── Attention (top-right) ── */}
          <div className="v-card-tr absolute right-10 top-0 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-55 h-25 flex flex-col items-start gap-2 px-5 py-2.5 bg-[#1d1d1d]/70 overflow-visible">
              <div className="absolute left-0 bottom-0 w-full h-13 bg-[#101010]/50" />
              <div className="relative font-bricolage text-2xl text-white tracking-tight leading-normal">
                Attention
              </div>
              <p className="relative font-host text-sm font-thin text-white leading-5 tracking-normal self-stretch">
                Attention behaves in measurable cycles
              </p>
              <CardGlowH className="v-glow-h absolute -top-3 left-37.5 w-20 h-6" />
              <CardGlowV className="v-glow-v absolute -top-2.5 -left-3 w-6 h-30" />
              <CardCubes className="v-cubes absolute -top-2.5 -left-6 w-7 h-10" />
            </div>
          </div>

          {/* ── Creative Angles (bottom-left) ── */}
          <div className="v-card-bl absolute left-14 bottom-0 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-64 h-25 flex flex-col items-start gap-2 px-5 py-2.5 bg-[#1d1d1d]/70 overflow-visible">
              <div className="absolute left-0 bottom-0 w-full h-13 bg-[#101010]/50" />
              <div className="relative font-bricolage text-2xl text-white tracking-tight leading-normal">
                Creative Angles
              </div>
              <p className="relative font-host text-sm font-thin text-white leading-5 tracking-normal max-w-42">
                Creative angles can be systemized
              </p>
              <CardGlowH className="v-glow-h absolute -top-3 -right-2.5 w-20 h-6" />
              <CardGlowV className="v-glow-v absolute -top-2.5 -left-3 w-6 h-30" />
              <CardCubes className="v-cubes absolute -top-2.5 -right-6 w-7 h-10" />
            </div>
          </div>

          {/* ── Growth (bottom-right) ── */}
          <div className="v-card-br absolute right-14 bottom-0 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-63 h-25 flex flex-col items-start gap-2 px-5 py-2.5 bg-[#1d1d1d]/70 overflow-visible">
              <div className="absolute left-0 bottom-0 w-full h-13 bg-[#101010]/50" />
              <div className="relative font-bricolage text-2xl text-white tracking-tight leading-normal">
                Growth
              </div>
              <p className="relative font-host text-sm font-thin text-white leading-5 tracking-normal max-w-52">
                Growth becomes repeatable when engineered
              </p>
              <CardGlowH className="v-glow-h absolute -top-3 -right-2.5 w-20 h-6" />
              <CardGlowV className="v-glow-v absolute -top-2.5 -left-3 w-6 h-30" />
              <CardCubes className="v-cubes absolute -top-2.5 -left-6 w-7 h-10" />
            </div>
          </div>

        </div>

        {/* ══ BOTTOM TEXT ══ */}
        <div className="flex flex-col items-center gap-1 max-w-xl mx-auto">
          <p className="v-bottom-line font-host font-thin text-white text-center tracking-tight leading-normal">
            Most brands chase trends. We model attention. Virality follows patterns
          </p>
          <div className="v-bottom-line inline-flex items-center gap-3 py-2.5">
            <span className="font-host font-thin text-white tracking-tight">Signal Amplification</span>
            <span className="w-1.5 h-1.5 bg-[#FF6F21] rounded-full" />
            <span className="font-host font-thin text-white tracking-tight">Behavioral Loops</span>
            <span className="w-1.5 h-1.5 bg-[#FF6F21] rounded-full" />
            <span className="font-host font-thin text-white tracking-tight">Distribution Mechanics</span>
          </div>
          <p className="v-bottom-line font-host font-thin text-white text-center tracking-tight leading-tight">
            <span className="font-semibold">Viral Labs</span>
            {" "}studies these patterns and turns them into structured systems that
            drive predictable growth for consumer apps. We don't hope
            content spreads. We design systems that make it spread.
          </p>
        </div>
      </div>
    </section>
  );
}