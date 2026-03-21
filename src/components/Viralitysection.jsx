import { useRef } from "react";
import GlobalGrid from "./Globalgrid";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../components/Gsapconfig";
import { viralityState } from "./viralityState";

const LINE_BLURS = [0.5, 0.5, 3, 3, 5.5];
const CUBE_BLURS = [0, 5, 5];

function GlowH({ className }) {
  return (
    <div className={`v-glow-h ${className} flex items-center`}>
      {LINE_BLURS.map((blur, i) => (
        <div key={i} className="absolute inset-0 flex items-center"
          style={{ mixBlendMode: "plus-lighter", filter: `blur(${blur}px)` }}>
          <div className="w-full h-px bg-[#F05A1F]" />
        </div>
      ))}
    </div>
  );
}

function GlowV({ className }) {
  return (
    <div className={`v-glow-v ${className} flex justify-center`}>
      {LINE_BLURS.map((blur, i) => (
        <div key={i} className="absolute inset-0 flex justify-center"
          style={{ mixBlendMode: "plus-lighter", filter: `blur(${blur}px)` }}>
          <div className="h-full w-px bg-[#F05A1F]" />
        </div>
      ))}
    </div>
  );
}

function GlowCubes({ className }) {
  return (
    <div className={`v-cubes ${className}`}>
      {CUBE_BLURS.map((blur, i) => (
        <div key={i} className="absolute inset-0 flex flex-col items-center justify-center gap-[8px]"
          style={blur > 0 ? { mixBlendMode: "plus-lighter", filter: `blur(${blur}px)` } : undefined}>
          <div className="w-[8px] h-[8px] bg-[#FF6F21]" />
          <div className="w-[8px] h-[8px] bg-[#FF6F21]" />
        </div>
      ))}
    </div>
  );
}

export default function ViralitySection({ globeContainerRef }) {
  const sectionRef = useRef();
  const headerRef = useRef();
  const glowRef = useRef();
  const bottomTextRef = useRef();

  useGSAP(
    () => {
      gsap.set(viralityState, { globeProgress: 0 });
      gsap.set(".v-label", { opacity: 0, y: 20, filter: "blur(6px)" });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });

      gsap.set(".v-card-tl", {
        xPercent: -40, y: -30, opacity: 0, rotation: -4, scale: 0.92, filter: "blur(8px)",
      });
      gsap.set(".v-card-tr", {
        xPercent: 40, y: -30, opacity: 0, rotation: 4, scale: 0.92, filter: "blur(8px)",
      });
      gsap.set(".v-card-bl", {
        xPercent: -40, y: 30, opacity: 0, rotation: -4, scale: 0.92, filter: "blur(8px)",
      });
      gsap.set(".v-card-br", {
        xPercent: 40, y: 30, opacity: 0, rotation: 4, scale: 0.92, filter: "blur(8px)",
      });

      gsap.set(".v-glow-v", { clipPath: "inset(0 0 100% 0)" });
      gsap.set(".v-glow-h", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".v-cubes", { opacity: 0, scale: 0, transformOrigin: "center center" });

      // ═══════════════════════════════════════
      // SPLITTEXT — HEADING
      // ═══════════════════════════════════════

      const headingSplit = SplitText.create(".v-heading", {
        type: "lines", mask: "lines", linesClass: "v-heading-line",
      });
      headingSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.1em";
      });
      gsap.set(headingSplit.lines, {
        yPercent: 110, filter: "blur(6px)", rotationX: 40, transformOrigin: "left bottom",
      });

      // ═══════════════════════════════════════
      // SPLITTEXT — BOTTOM LEFT PARAGRAPH
      // ═══════════════════════════════════════

      const bottomLeftSplit = SplitText.create(".v-bottom-left-text", {
        type: "lines", mask: "lines", linesClass: "v-bl-line",
      });
      bottomLeftSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.05em";
      });
      gsap.set(bottomLeftSplit.lines, {
        yPercent: 120, filter: "blur(4px)",
      });

      // ═══════════════════════════════════════
      // SPLITTEXT — BOTTOM "MOST BRANDS" TEXT
      // ═══════════════════════════════════════

      const bottomMostSplit = SplitText.create(".v-bottom-most-text", {
        type: "lines", mask: "lines", linesClass: "v-bm-line",
      });
      bottomMostSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.05em";
      });
      gsap.set(bottomMostSplit.lines, {
        yPercent: 120, filter: "blur(4px)",
      });

      // ═══════════════════════════════════════
      // BOTTOM RIGHT TAGS — initial states
      // ═══════════════════════════════════════

      gsap.set(".v-bottom-tag", {
        opacity: 0, y: 16, filter: "blur(4px)",
      });

      // ═══════════════════════════════════════
      // PHASE 1 — HEADER (non-pinned scrub)
      // ═══════════════════════════════════════

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current, start: "top 85%", end: "top 25%", scrub: 1.5,
        },
        defaults: { ease: "none" },
      });

      headerTl.to(".v-label", {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 4, ease: "power4.out",
      }, 0);

      headerTl.to(headingSplit.lines, {
        yPercent: 0, filter: "blur(0px)", rotationX: 0, stagger: 2, duration: 6, ease: "power4.out",
      }, 1);

      // ═══════════════════════════════════════
      // PHASE 3 — BOTTOM TEXT (paused, fired when pin ends)
      // Plays once when the pinned section releases.
      // Cannot use ScrollTrigger on elements inside a pin
      // because positions get distorted.
      // ═══════════════════════════════════════

      const bottomTl = gsap.timeline({ paused: true });

      // Left paragraph — lines mask reveal with blur
      bottomTl.to(bottomLeftSplit.lines, {
        yPercent: 0,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 0.8,
        ease: "power4.out",
      }, 0);

      // Right column tags — staggered slide + blur
      bottomTl.to(".v-bottom-tag", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.12,
        duration: 0.7,
        ease: "power4.out",
      }, 0.15);

      // "Most brands" text — lines mask reveal with blur
      bottomTl.to(bottomMostSplit.lines, {
        yPercent: 0,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 0.8,
        ease: "power4.out",
      }, 0.5);

      // ═══════════════════════════════════════
      // PHASE 2 — PINNED SCRUB TIMELINE
      // onLeave fires the bottom text animation
      // when the pin releases.
      // ═══════════════════════════════════════

      let bottomPlayed = false;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, start: "top -35%", end: "+=250%",
          pin: true, scrub: 2, pinSpacing: true, anticipatePin: 1,
          onLeave: () => {
            // Pin is done — positions are accurate now.
            // Create a fresh ScrollTrigger on the bottom text.
            if (!bottomPlayed) {
              bottomPlayed = true;
              ScrollTrigger.create({
                trigger: bottomTextRef.current,
                start: "top 80%",
                once: true,
                onEnter: () => bottomTl.play(),
              });
            }
          },
        },
        defaults: { ease: "none" },
      });

      tl.to(viralityState, { globeProgress: 1, duration: 40, ease: "power3.inOut" }, 0);
      tl.to(glowRef.current, { opacity: 1, scale: 1, duration: 20, ease: "power4.out" }, 28);

      tl.to(".v-card-tl", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)", duration: 16, ease: "power3.out",
      }, 45);
      tl.to(".v-card-tr", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)", duration: 16, ease: "power3.out",
      }, 47);
      tl.to(".v-card-bl", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)", duration: 16, ease: "power3.out",
      }, 51);
      tl.to(".v-card-br", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)", duration: 16, ease: "power3.out",
      }, 53);

      tl.to(".v-glow-v", {
        clipPath: "inset(0 0 0% 0)", stagger: 1.5, duration: 8, ease: "power3.out",
      }, 65);
      tl.to(".v-glow-h", {
        clipPath: "inset(0 0% 0 0)", stagger: 1.5, duration: 7, ease: "power3.out",
      }, 68);
      tl.to(".v-cubes", {
        opacity: 1, scale: 1, transformOrigin: "center center", stagger: 1, duration: 5, ease: "back.out(1.7)",
      }, 72);


    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="virality-section relative w-full overflow-hidden">

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-[45%] z-[8]"
        aria-hidden="true"
        style={{
          width: "1100px", height: "1100px", borderRadius: "50%",
          background: "radial-gradient(circle, #5a1a12 0%, #351010 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <div ref={globeContainerRef} className="absolute -top-40 bottom-0 w-full z-10 translate-y-12" />

      <GlobalGrid />

      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      <div className="relative z-40 px-38 pt-24 pb-40 pointer-events-none">

        <div ref={headerRef} className="flex flex-col items-center gap-1 mb-32" style={{ perspective: "600px" }}>
          <p className="v-label virality-label font-host text-base text-[#ff6f21] text-center leading-none">
            WHY VIRALITY CAN BE ENGINEERED
          </p>
          <h2 className="v-heading virality-heading font-host text-5xl text-[#f1f1f1] tracking-tighter leading-none text-center">
            Distribution isn't luck. It
            <br />
            can be engineered.
          </h2>
        </div>

        <div className="relative mx-auto max-w-6xl min-h-[600px] mb-20">

          {/* ── Distribution Architecture (top-left) ── */}
          <div className="v-card-tl absolute left-10 -top-1 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-48 flex flex-col overflow-visible">
              <div className="relative px-5 py-2 bg-[#1d1d1d]/70">
                <div className="font-bricolage text-xl text-white tracking-tight leading-5 text-right">
                  Distribution
                  <br />
                  Architecture
                </div>
              </div>
              <div className="relative px-5 py-2 bg-[#101010]/60">
                <p className="font-host text-xs font-thin text-white leading-5 tracking-wide text-right">
                  Distribution systems amplify signal.
                </p>
              </div>
              <GlowH className="absolute -top-3 left-28 w-20 h-6" />
              <GlowV className="absolute -top-0 -left-4 w-7 h-[calc(100%+0px)]" />
              <GlowCubes className="absolute -top-3 -right-7 w-7 h-10" />
            </div>
          </div>

          {/* ── Attention Dynamics (top-right) ── */}
          <div className="v-card-tr absolute right-5 top-20 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-48 flex flex-col overflow-visible">
              <div className="relative px-5 py-2 bg-[#1d1d1d]/70">
                <div className="font-bricolage text-xl text-white tracking-tight leading-5 text-left">
                  Attention
                  <br />
                  Dynamics
                </div>
              </div>
              <div className="relative px-5 py-2 bg-[#101010]/60">
                <p className="font-host text-xs font-thin text-white leading-5 tracking-wide text-left">
                  Attention follows observable patterns.
                </p>
              </div>
              <GlowH className="absolute -top-3 left-28 w-20 h-6" />
              <GlowV className="absolute -top-0 -left-4 w-7 h-[calc(100%+0px)]" />
              <GlowCubes className="absolute -top-3 -left-7 w-7 h-10" />
            </div>
          </div>

          {/* ── Creative Methodology (bottom-left) ── */}
          <div className="v-card-bl absolute left-10 -bottom-28 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-56 flex flex-col overflow-visible">
              <div className="relative px-5 py-2 bg-[#1d1d1d]/70">
                <div className="font-bricolage text-xl text-white tracking-tight leading-5 text-right">
                  Creative
                  <br />
                  Methodology
                </div>
              </div>
              <div className="relative px-5 py-2 bg-[#101010]/60">
                <p className="font-host text-xs font-thin text-white leading-5 tracking-wide text-right">
                  Creative can be developed and tested systematically.
                </p>
              </div>
              <GlowH className="absolute -top-3 right-0 w-20 h-6" />
              <GlowV className="absolute -top-0 -left-4 w-7 h-[calc(100%+0px)]" />
              <GlowCubes className="absolute -top-3 -right-7 w-7 h-10" />
            </div>
          </div>

          {/* ── Performance Outcomes (bottom-right) ── */}
          <div className="v-card-br absolute right-12 -bottom-38 z-30 pointer-events-auto overflow-visible">
            <div className="relative w-69 flex flex-col overflow-visible">
              <div className="relative px-5 py-2 bg-[#1d1d1d]/70">
                <div className="font-bricolage text-xl text-white tracking-tight leading-5 text-left">
                  Performance
                  <br />
                  Outcomes
                </div>
              </div>
              <div className="relative px-5 py-2 bg-[#101010]/60">
                <p className="font-host text-xs font-thin text-white leading-5 tracking-wide text-left">
                  Growth becomes more predictable when distribution is managed as a system.
                </p>
              </div>
              <GlowH className="absolute -top-3 right-0 w-20 h-6" />
              <GlowV className="absolute -top-0 -left-4 w-7 h-[calc(100%+0px)]" />
              <GlowCubes className="absolute -top-3 -left-7 w-7 h-10" />
            </div>
          </div>

        </div>

        {/* ══ BOTTOM TEXT — plays once when scrolled into view, stays visible ══ */}
        <div ref={bottomTextRef} className="flex items-start justify-between max-w-6xl mx-auto gap-16 mt-68">

          {/* Left column */}
          <div className="max-w-md">
            <p className="v-bottom-left-text font-host font-thin text-white tracking-tight">
              <span className="font-semibold">Viral Labs</span>
              {" "}studies how attention moves through markets, channels,
              and audiences, then turns those patterns into structured distribution
              systems. We do not rely on chance. We build repeatable conditions for
              reach, influence, and commercial impact.
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-3">
              <div className="v-bottom-tag flex items-center gap-3">
                <div
                  className="w-[10px] h-[10px] bg-[#FF6F21] shrink-0"
                  style={{ boxShadow: "0 0 6px #FF6F21, 0 0 12px #FF6F21" }}
                />
                <span className="font-host font-thin text-white tracking-tight">Signal Amplification</span>
              </div>
              <div className="v-bottom-tag flex items-center gap-3">
                <div
                  className="w-[10px] h-[10px] bg-[#FF6F21] shrink-0"
                  style={{ boxShadow: "0 0 6px #FF6F21, 0 0 12px #FF6F21" }}
                />
                <span className="font-host font-thin text-white tracking-tight">Behavioral Loops</span>
              </div>
              <div className="v-bottom-tag flex items-center gap-3">
                <div
                  className="w-[10px] h-[10px] bg-[#FF6F21] shrink-0"
                  style={{ boxShadow: "0 0 6px #FF6F21, 0 0 12px #FF6F21" }}
                />
                <span className="font-host font-thin text-white tracking-tight">Distribution Mechanics</span>
              </div>
            </div>

            <p className="v-bottom-most-text font-host font-thin text-white tracking-tight leading-normal max-w-xs">
              Most brands chase trends. We model attention. Virality follows patterns.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}