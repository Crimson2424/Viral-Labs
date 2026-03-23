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
      // ═══════════════════════════════════════
      // SPLITTEXT — LABEL + HEADING (mask lines)
      // ═══════════════════════════════════════

      const labelSplit = SplitText.create(".v-label", {
        type: "lines", mask: "lines", linesClass: "v-label-line",
      });
      labelSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.1em";
      });

      const headingSplit = SplitText.create(".v-heading", {
        type: "lines", mask: "lines", linesClass: "v-heading-line",
      });
      headingSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.1em";
      });

      // ═══════════════════════════════════════
      // INITIAL STATES
      // ═══════════════════════════════════════

      gsap.set(viralityState, { globeProgress: 0 });

      // Label lines — hidden below mask with blur + invisible
      gsap.set(labelSplit.lines, {
        yPercent: 110, filter: "blur(6px)", opacity: 0,
      });

      // Heading lines — hidden below mask with blur + invisible
      gsap.set(headingSplit.lines, {
        yPercent: 110, filter: "blur(8px)", opacity: 0,
      });

      // Dynamically center the header on screen
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const headerRect = headerRef.current.getBoundingClientRect();
      const headerTopInSection = headerRect.top - sectionRect.top;
      const headerCenterInSection = headerTopInSection + headerRect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const centerOffset = viewportCenter - headerCenterInSection;
      gsap.set(headerRef.current, { y: centerOffset });

      // Globe glow — hidden
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 });

      // Cards — hidden, offset from their final positions
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

      // Glow lines + cubes — hidden
      gsap.set(".v-glow-v", { clipPath: "inset(0 0 100% 0)" });
      gsap.set(".v-glow-h", { clipPath: "inset(0 100% 0 0)" });
      gsap.set(".v-cubes", { opacity: 0, scale: 0, transformOrigin: "center center" });

      // Bottom text — hidden until pin releases
      gsap.set(bottomTextRef.current, { opacity: 0 });

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
      // BOTTOM TEXT TIMELINE (paused)
      // Plays once when the pin releases.
      // ═══════════════════════════════════════

      const bottomTl = gsap.timeline({ paused: true });

      bottomTl.to(bottomTextRef.current, {
        opacity: 1, duration: 0.4, ease: "power2.out",
      }, 0);

      bottomTl.to(bottomLeftSplit.lines, {
        yPercent: 0,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 0.8,
        ease: "power4.out",
      }, 0);

      bottomTl.to(".v-bottom-tag", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.12,
        duration: 0.7,
        ease: "power4.out",
      }, 0.15);

      bottomTl.to(bottomMostSplit.lines, {
        yPercent: 0,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 0.8,
        ease: "power4.out",
      }, 0.5);

      // ═══════════════════════════════════════
      // PINNED SCRUB TIMELINE
      // ═══════════════════════════════════════

      let bottomPlayed = false;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 2,
          pinSpacing: true,
          onLeave: () => {
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

      // ── PHASE 0 — TEXT ENTRANCE (mask reveal + blur) ──
      tl.set(labelSplit.lines, { opacity: 1 }, 1);
      tl.to(labelSplit.lines, {
        yPercent: 0, filter: "blur(0px)", duration: 8, ease: "power4.out",
      }, 1);

      tl.set(headingSplit.lines, { opacity: 1, stagger: 3 }, 4);
      tl.to(headingSplit.lines, {
        yPercent: 0, filter: "blur(0px)", stagger: 3, duration: 10, ease: "power4.out",
      }, 4);

      // ── PHASE A — HEADING UP + GLOBE SLIDES IN ──
      tl.to(headerRef.current, {
        y: 0,
        duration: 20,
        ease: "power2.inOut",
      }, 18);

      tl.to(viralityState, {
        globeProgress: 1,
        duration: 30,
        ease: "power3.inOut",
      }, 22);

      // ── PHASE B — GLOBE GLOW ──
      tl.to(glowRef.current, {
        opacity: 1,
        scale: 1,
        duration: 15,
        ease: "power4.out",
      }, 45);

      // ── PHASE C — CARDS ANIMATE IN ──
      tl.to(".v-card-tl", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)",
        duration: 16, ease: "power3.out",
      }, 60);
      tl.to(".v-card-tr", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)",
        duration: 16, ease: "power3.out",
      }, 62);
      tl.to(".v-card-bl", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)",
        duration: 16, ease: "power3.out",
      }, 66);
      tl.to(".v-card-br", {
        xPercent: 0, y: 0, opacity: 1, rotation: 0, scale: 1, filter: "blur(0px)",
        duration: 16, ease: "power3.out",
      }, 68);

      // ── PHASE D — GLOW LINES + CUBES ──
      tl.to(".v-glow-v", {
        clipPath: "inset(0 0 0% 0)", stagger: 1.5, duration: 8, ease: "power3.out",
      }, 80);
      tl.to(".v-glow-h", {
        clipPath: "inset(0 0% 0 0)", stagger: 1.5, duration: 7, ease: "power3.out",
      }, 83);
      tl.to(".v-cubes", {
        opacity: 1, scale: 1, transformOrigin: "center center", stagger: 1, duration: 5, ease: "back.out(1.7)",
      }, 87);

    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="virality-section relative w-full min-h-screen overflow-hidden">

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-[35%] z-[8]"
        aria-hidden="true"
        style={{
          width: "1100px", height: "1100px", borderRadius: "50%",
          background: "radial-gradient(circle, #5a1a12 0%, #351010 40%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Clip wrapper — clips globe at section bounds, prevents bleed into section above */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div ref={globeContainerRef} className="absolute -top-40 bottom-0 w-full -translate-y-12" />
      </div>

      <GlobalGrid />

      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* ═══ Main viewport content — heading + cards fit within 100vh ═══ */}
      <div className="relative z-40 px-38 pt-8 pointer-events-none h-screen">

        <div ref={headerRef} className="flex flex-col items-center gap-1 mb-12" style={{ perspective: "600px" }}>
          <p className="v-label virality-label font-host text-base text-[#ff6f21] text-center leading-none">
            WHY VIRALITY CAN BE ENGINEERED
          </p>
          <h2 className="v-heading virality-heading font-host text-5xl text-[#f1f1f1] tracking-tighter leading-none text-center">
            Distribution isn't luck. It
            <br />
            can be engineered.
          </h2>
        </div>

        <div className="relative mx-auto max-w-6xl min-h-[500px] h-[calc(100vh-200px)] max-h-[700px]">

          {/* ── Distribution Architecture (top-left) ── */}
          <div className="v-card-tl absolute left-26 top-3 z-30 pointer-events-auto overflow-visible">
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
          <div className="v-card-tr absolute right-15 top-20 z-30 pointer-events-auto overflow-visible">
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
          <div className="v-card-bl absolute left-20 bottom-0 z-30 pointer-events-auto overflow-visible">
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
          <div className="v-card-br absolute right-6 -bottom-3 z-30 pointer-events-auto overflow-visible">
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
      </div>

      {/* ══ BOTTOM TEXT — lives outside the h-screen block, scrolled to after pin ══ */}
      <div ref={bottomTextRef} className="relative z-40 px-38 pb-40 pointer-events-none">
        <div className="flex items-start justify-between max-w-6xl mx-auto gap-16 pt-24">

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