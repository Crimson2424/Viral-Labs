/**
 * HeroSection — One pinned timeline with two acts.
 *
 * Since MissionStats is inside this pinned section, it's always at
 * viewport top — so it CAN'T have a separate ScrollTrigger with
 * start: "top top". Instead, one long pin covers everything:
 *
 *   +=400% scroll range, pinned + scrub:
 *
 *   ACT 1 — DISSOLVE (0.00 → 0.25)
 *     0.00–0.08 : Hero text fades out
 *     0.02      : MissionStats wrapper → opacity 1
 *     0.03–0.25 : Shader dissolve (revealProgress 0→1)
 *     0.08      : Hero content wrapper hidden
 *
 *   ACT 2 — MISSION STATS REVEAL (0.25 → 0.85)
 *     0.25–0.38 : Header (label, heading chars, description)
 *     0.38–0.55 : Screen cards stagger
 *     0.55–0.68 : Quote words blur-in
 *     0.68–0.85 : Stats arc + number + dots
 *
 *   HOLD (0.85 → 1.00) — everything visible, breathing room
 */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import GridOverlay from "./GridOverlay";
import Navbar from "./Navbar";
import { ArrowIcon, CtaGlowLine } from "./SvgAssets";
import { transitionState } from "./transitionState";
import MissionStats from "./Missionstats";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeroSection() {
  const sectionRef = useRef();
  const heroContentRef = useRef();
  const missionRef = useRef();
  const badgeRef = useRef();
  const headingRef = useRef();
  const subheadingRef = useRef();
  const ctaRef = useRef();

  useGSAP(
    () => {
      // ── SplitText with mask reveals ──
      // mask: "lines" wraps each line in overflow:hidden div
      // yPercent: 110 pushes text below the mask — invisible
      // .to yPercent: 0 slides it up into view

      // Heading — split into lines with mask
      const headingSplit = SplitText.create(".impact-heading", {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      gsap.set(headingSplit.lines, { yPercent: 110 });

      // Label — split into lines with mask
      const labelSplit = SplitText.create(".impact-label", {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      gsap.set(labelSplit.lines, { yPercent: 110 });

      // Description — split into lines with mask
      const descSplit = SplitText.create(".impact-desc", {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      gsap.set(descSplit.lines, { yPercent: 110 });

      // Quote — split into lines, words for stagger, mask on lines
      const quoteSplit = SplitText.create(".impact-quote", {
        type: "lines, words",
        mask: "lines",
        linesClass: "line",
        wordsClass: "word",
      });
      gsap.set(quoteSplit.words, { yPercent: 110 });

      // ── One pinned timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      // ═══════════════════════════════════════
      // ACT 1 — DISSOLVE (0.00 → 0.25)
      // ═══════════════════════════════════════

      // Hero text fades out
      tl.to(badgeRef.current,
        { opacity: 0, y: -40, duration: 0.05, ease: "power2.in" }, 0)
        .to(headingRef.current,
          { opacity: 0, y: -60, duration: 0.06, ease: "power2.in" }, 0.01)
        .to(subheadingRef.current,
          { opacity: 0, y: -40, duration: 0.05, ease: "power2.in" }, 0.02)
        .to(ctaRef.current,
          { opacity: 0, y: -30, duration: 0.05, ease: "power2.in" }, 0.03)

        // MissionStats wrapper visible (content still hidden via masks)
        .to(missionRef.current,
          { opacity: 1, duration: 0.001 }, 0.02)

        // Shader dissolve
        .to(transitionState,
          { revealProgress: 1, duration: 0.23, ease: "power2.inOut" }, 0.03)

        // Hide hero content completely
        .to(heroContentRef.current,
          { opacity: 0, duration: 0.001 }, 0.08)

      // ═══════════════════════════════════════
      // ACT 2 — MISSION STATS (0.25 → 0.85)
      // ═══════════════════════════════════════

      // ── Header (0.25 → 0.40) ──

        // Label lines slide up from mask
        .to(labelSplit.lines, {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.06,
          ease: "expo.out",
        }, 0.25)

        // Heading lines slide up from mask with stagger
        .to(headingSplit.lines, {
          yPercent: 0,
          stagger: 0.03,
          duration: 0.1,
          ease: "expo.out",
        }, 0.28)

        // Description lines slide up from mask
        .to(descSplit.lines, {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.08,
          ease: "expo.out",
        }, 0.34)

      // ── Screen cards (0.40 → 0.55) ──

        .to(".screen-card", {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.02, duration: 0.1, ease: "power3.out",
        }, 0.40)

      // ── Quote words slide up from mask (0.55 → 0.68) ──

        .to(quoteSplit.words, {
          yPercent: 0,
          stagger: 0.01,
          duration: 0.1,
          ease: "expo.out",
        }, 0.55)

      // ── Stats arc (0.68 → 0.85) ──

        // Arc scales up
        .to(".stats-arc", {
          opacity: 1, scale: 1, duration: 0.08, ease: "power2.out",
        }, 0.68)

        // Number
        .to(".stat-number", {
          opacity: 1, y: 0, duration: 0.06, ease: "power3.out",
        }, 0.72)

        // Sub-labels
        .to(".stat-sub", {
          opacity: 1, y: 0, stagger: 0.02, duration: 0.05, ease: "power2.out",
        }, 0.76)

        // Dots pop in
        .to(".stat-dot", {
          opacity: 1, scale: 1, stagger: 0.015, duration: 0.04, ease: "back.out(2)",
        }, 0.80);

      // 0.85 → 1.00 = HOLD — everything visible
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative z-[10] w-full min-h-screen"
    >
      {/* ═══ Hero Content — absolute, above canvas ═══ */}
      <div
        ref={heroContentRef}
        className="absolute inset-x-0 top-0 z-[10] h-screen min-h-[945px] overflow-hidden"
      >
        <GridOverlay showTexture={true}>
          <Navbar />
          <div className="relative z-40 flex flex-col items-center justify-center h-full pt-14">
            <div ref={badgeRef} className="mb-6">
              <div className="rounded-[52px] border border-white/20 p-1">
                <div className="rounded-[46px] border border-white/40 p-1">
                  <div className="rounded-[40px] border border-white/80 px-2.5 py-1 flex items-center justify-center">
                    <span className="font-host font-medium text-xs text-[#c5c5c5] tracking-[-0.24px] leading-normal whitespace-nowrap">
                      Engineered Virality
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h1
              ref={headingRef}
              className="font-bricolage font-medium text-center mb-8"
              style={{
                fontSize: "clamp(75px, 4.2vw, 85px)",
                lineHeight: 0.96,
                letterSpacing: "-2.5px",
                backgroundImage:
                  "linear-gradient(92.7deg, rgb(255,255,255) 21.4%, rgb(151,151,151) 49.6%, rgb(255,255,255) 79.1%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Engineering
              <br />
              Predictable Virality For
              <br />
              Consumer Apps
            </h1>

            <p
              ref={subheadingRef}
              className="font-host text-base text-[#a1a1aa] text-center tracking-[-0.32px] leading-normal max-w-[455px] mb-10"
            >
              We build short-form content systems that turn attention into installs
              consistently, at scale, without relying on luck.
            </p>

            <div ref={ctaRef} className="flex flex-col items-center gap-2">
              <a
                href="#results"
                className="flex items-center justify-center gap-3 w-40 h-10 border border-white px-1.5 py-2 hover:bg-white/10 transition-colors duration-300"
              >
                <span className="font-host font-medium text-base text-white text-center tracking-[-0.32px] leading-normal whitespace-nowrap">
                  Viral Results
                </span>
                <ArrowIcon size={11} />
              </a>
              <div className="flex flex-col items-center">
                <span className="font-host text-xs text-[#a1a1aa] text-center tracking-[-0.24px] leading-normal -mb-1">
                  Real missions. Real outcomes.
                </span>
                <CtaGlowLine className="pointer-events-none" />
              </div>
            </div>
          </div>
        </GridOverlay>
      </div>

      {/* ═══ MissionStats — in flow, starts opacity-0 ═══ */}
      <div ref={missionRef} className="relative z-[1] opacity-0">
        <MissionStats />
      </div>
    </section>
  );
}