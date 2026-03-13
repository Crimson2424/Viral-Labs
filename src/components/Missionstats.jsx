/**
 * MissionStats — "Operational Impact at Scale"
 *
 * MARQUEE:
 *   GSAP-driven infinite scroll via gsap.to(track, { x: -halfWidth }).
 *
 * DASHED ARC:
 *   Animated via strokeDashoffset — dashes march anti-clockwise.
 *
 * STAT CYCLING:
 *   Odometer digits: 3 vertical strips of 0–9, clipped to show one digit.
 *   GSAP rolls each strip to the target digit with a cascading stagger.
 *   Label: slides up/out, text swaps, new label slides in from below.
 *   Dots: color crossfade between steps.
 *
 *   Cycle: 100M+ → 150M+ → 200M+ → repeat
 *
 * GSAP class targets (for HeroSection scroll entrance):
 *   .impact-label, .impact-heading, .impact-desc, .screen-card,
 *   .frame-corner, .marquee-fade, .impact-quote,
 *   .stats-arc, .stat-number, .stat-sub, .stat-dot
 */

import { useRef, forwardRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ════════════════════════════════════════════════
// SVGs
// ════════════════════════════════════════════════

const BracketLeft = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="4" height="16" viewBox="0 0 4 16" fill="none" className={className}>
    <path d="M-6.24657e-05 15.2961V7.34329e-05H3.19994V0.928074H1.05594V14.3521H3.19994V15.2961H-6.24657e-05Z" fill="#FF6F21" />
  </svg>
));

const BracketRight = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="4" height="16" viewBox="0 0 4 16" fill="none" className={className} style={{ transform: "scaleX(-1)" }}>
    <path d="M-6.24657e-05 15.2961V7.34329e-05H3.19994V0.928074H1.05594V14.3521H3.19994V15.2961H-6.24657e-05Z" fill="#FF6F21" />
  </svg>
));

const PlayIcon = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="16" height="18" viewBox="0 0 16 18" fill="none" className={className}>
    <path d="M14.29 9L0.649414 16.875V1.125L14.29 9Z" stroke="white" strokeWidth="1.29909" />
  </svg>
));

const CornerLeft = forwardRef(({ className = "", ...props }, ref) => (
  <svg ref={ref} width="5" height="9" viewBox="0 0 5 9" fill="none" className={className} {...props}>
    <path d="M0.5 0L0.5 8M0.5 4L4.5 4" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
));

const CornerRight = forwardRef(({ className = "", ...props }, ref) => (
  <svg ref={ref} width="5" height="9" viewBox="0 0 5 9" fill="none" className={className} {...props}>
    <path d="M4.5 0L4.5 8M0.5 4H4.5" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
));

const FrameCorner = ({ className = "", ...props }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className} {...props}>
    <path d="M0.5 39.5V0.5H39.5" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
);

const DashedArc = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="1064" height="346" viewBox="0 0 1064 346" fill="none" className={className}>
    <circle className="arc-dash" cx="532" cy="532.5" r="532" stroke="url(#arcGrad0)" strokeDasharray="14 14" />
    <circle className="arc-glow" cx="532" cy="532.5" r="532" stroke="url(#arcGrad1)" strokeDasharray="14 14" />
    <defs>
      <linearGradient id="arcGrad0" x1="532" y1="-54.5" x2="532" y2="325" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F3F3F3" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="arcGrad1" x1="532" y1="0.438477" x2="532" y2="46.9385" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF6F21" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
));

const SCREENS = [
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
];

function ScreenCard({ views, image }) {
  return (
    <div className="screen-card flex flex-col gap-3 items-center w-64 shrink-0 opacity-0 translate-y-20 scale-92">
      <div className="relative w-full aspect-[254/495] bg-white overflow-hidden">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full h-58 bg-gradient-to-b from-transparent to-black" />
      </div>
      <div className="flex items-center justify-between w-full">
        <BracketLeft />
        <div className="flex items-center justify-between w-56">
          <PlayIcon />
          <span className="font-host font-medium text-base text-white text-center leading-normal">{views}</span>
        </div>
        <BracketRight />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// STAT CYCLE CONFIG
// ════════════════════════════════════════════════

const STAT_STEPS = [
  { value: 100, label: "Viral Impressions" },
  { value: 150, label: "Content Pieces Delivered" },
  { value: 200, label: "Viral Views Generated" },
];

export default function MissionStats() {
  const trackRef = useRef();
  const arcRef = useRef();
  const digitCols = useRef([]);
  const statLabelRef = useRef();
  const dotsRef = useRef([]);

  // ── GSAP marquee ──
  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstSet = track.querySelector(".marquee-set");
    if (!firstSet) return;

    const halfWidth = firstSet.offsetWidth;
    gsap.set(track, { x: 0 });
    gsap.to(track, { x: -halfWidth, duration: 35, ease: "none", repeat: -1 });
  }, { scope: trackRef });

  // ── GSAP dashed arc rotation ──
  useGSAP(() => {
    const svg = arcRef.current;
    if (!svg) return;

    const dashes = svg.querySelectorAll(".arc-dash, .arc-glow");
    const circumference = 2 * Math.PI * 532;

    gsap.set(dashes, { strokeDashoffset: 0 });
    gsap.to(dashes, { strokeDashoffset: circumference, duration: 60, ease: "none", repeat: -1 });
  }, { scope: arcRef });

  // ── Stat cycling: odometer + label slide + dot swap ──
  useGSAP(() => {
    const cols = digitCols.current.filter(Boolean);
    const labelEl = statLabelRef.current;
    const dots = dotsRef.current.filter(Boolean);
    if (cols.length < 3 || !labelEl || dots.length < 3) return;

    const orange = "#FF6F21";
    const white = "#FFFFFF";

    // ── Set initial state: first step ──
    const initialDigits = String(STAT_STEPS[0].value).padStart(3, "0").split("").map(Number);
    initialDigits.forEach((d, i) => {
      gsap.set(cols[i], { yPercent: -(d * 10) });
    });
    gsap.set(dots[0], { backgroundColor: orange });
    gsap.set(dots[1], { backgroundColor: white });
    gsap.set(dots[2], { backgroundColor: white });

    // ── Build cycling timeline ──
    const tl = gsap.timeline({ repeat: -1 });
    let pos = 0;

    STAT_STEPS.forEach((step, i) => {
      const nextI = (i + 1) % STAT_STEPS.length;
      const nextStep = STAT_STEPS[nextI];
      const nextDigits = String(nextStep.value).padStart(3, "0").split("").map(Number);

      // ── HOLD current state ──
      tl.to({}, { duration: 2.5 }, pos);
      pos += 2.5;

      // ── ODOMETER: roll each digit column with cascading stagger ──
      // Hundreds starts first, then tens, then ones — like a real counter
      nextDigits.forEach((d, colIdx) => {
        tl.to(cols[colIdx], {
          yPercent: -(d * 10),
          duration: 0.9,
          ease: "power3.inOut",
        }, pos + colIdx * 0.1);
      });

      // ── LABEL: slide out ──
      tl.to(labelEl, {
        yPercent: -120,
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
      }, pos);

      // ── LABEL: swap text + reposition below ──
      tl.call(() => {
        labelEl.textContent = nextStep.label;
      }, null, pos + 0.4);
      tl.set(labelEl, { yPercent: 120 }, pos + 0.4);

      // ── LABEL: slide in from below ──
      tl.to(labelEl, {
        yPercent: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      }, pos + 0.45);

      // ── DOTS: crossfade colors ──
      tl.to(dots[i], {
        backgroundColor: white,
        duration: 0.4,
        ease: "power2.inOut",
      }, pos);
      tl.to(dots[nextI], {
        backgroundColor: orange,
        duration: 0.4,
        ease: "power2.inOut",
      }, pos + 0.25);

      pos += 0.9;
    });
  });

  return (
    <div className="relative w-full overflow-visible">

      {/* Grid lines */}
      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      <CornerLeft className="pointer-events-none absolute -top-0.5 left-[105px] z-30" />
      <CornerRight className="pointer-events-none absolute -top-0.5 right-[105px] z-30" />
      <CornerLeft className="pointer-events-none absolute -bottom-1 left-[105px] z-30" style={{ transform: "scaleY(-1)" }} />
      <CornerRight className="pointer-events-none absolute -bottom-1 right-[105px] z-30" style={{ transform: "scaleY(-1)" }} />

      <div className="relative z-40 px-38 pt-20 pb-10">
        {/* Header */}
        <div className="impact-header flex justify-between items-start mb-34">
          <div className="flex flex-col gap-1 w-90">
            <p className="impact-label font-bricolage font-normal text-base text-[#ff6f21] uppercase leading-normal"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Impact Stats
            </p>
            <h2 className="impact-heading font-host font-medium text-[54px] text-[#f1f1f1] tracking-[-2.16px] leading-14">
              Operational Impact at Scale
            </h2>
          </div>
          <p className="impact-desc font-host font-light text-base text-white tracking-tight leading-5 w-73 mt-12">
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        {/* Screens Marquee */}
        <div className="relative mb-20">
          <FrameCorner className="frame-corner absolute -top-5 -left-5 z-10 opacity-0" />
          <FrameCorner className="frame-corner absolute -top-5 -right-5 z-10 opacity-0" style={{ transform: "scaleX(-1)" }} />
          <FrameCorner className="frame-corner absolute -bottom-5 -left-5 z-10 opacity-0" style={{ transform: "scaleY(-1)" }} />
          <FrameCorner className="frame-corner absolute -bottom-5 -right-5 z-10 opacity-0" style={{ transform: "scale(-1, -1)" }} />

          <div className="relative overflow-hidden py-10">
            <div
              className="marquee-fade absolute inset-y-0 left-0 w-40 z-10 pointer-events-none opacity-0"
              style={{ background: "linear-gradient(to right, #121212 0%, transparent 100%)" }}
            />
            <div
              className="marquee-fade absolute inset-y-0 right-0 w-40 z-10 pointer-events-none opacity-0"
              style={{ background: "linear-gradient(to left, #121212 0%, transparent 100%)" }}
            />

            <div ref={trackRef} className="flex w-max">
              <div className="marquee-set flex gap-30 shrink-0 pr-30">
                {SCREENS.map((screen, i) => (
                  <ScreenCard key={`a-${i}`} {...screen} />
                ))}
              </div>
              <div className="marquee-set flex gap-30 shrink-0 pr-30">
                {SCREENS.map((screen, i) => (
                  <ScreenCard key={`b-${i}`} {...screen} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="flex justify-center mb-20">
          <p className="impact-quote font-host text-[40px] text-[#f1f1f1] text-center tracking-[-1.6px] leading-10 w-[419px]">
            Performance isn't accidental. It's deployed.
          </p>
        </div>

        {/* Stats Circle Area */}
        <div className="stats-arc relative flex flex-col items-center opacity-0 scale-90">
          <div className="relative w-[1064px] h-[346px] overflow-hidden">
            <DashedArc ref={arcRef} className="absolute left-0 top-1.5" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-14">
              <div className="flex flex-col items-center gap-0 text-center">

                {/* "Views" — static, entrance only */}
                <span className="stat-sub font-host font-medium text-sm text-[#ff6f21] tracking-tight leading-none opacity-0 translate-y-4">
                  Views
                </span>

                {/* ══ ODOMETER NUMBER ══
                    3 digit columns, each a strip of 0–9 clipped to 1 digit.
                    GSAP rolls yPercent to show target digit.
                    "M+" suffix is static. */}
                <div
                  className="stat-number flex items-center font-bricolage font-normal text-[88px] text-white tracking-[-5.28px] leading-none whitespace-nowrap opacity-0 translate-y-8"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  {[0, 1, 2].map((colIndex) => (
                    <div
                      key={colIndex}
                      className="overflow-hidden"
                      style={{ height: "1em" }}
                    >
                      <div ref={(el) => (digitCols.current[colIndex] = el)}>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <div
                            key={n}
                            className="flex items-center justify-center"
                            style={{ height: "1em" }}
                          >
                            {n}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <span>M+</span>
                </div>

                {/* ══ CYCLING LABEL ══
                    Outer span: .stat-sub for entrance (opacity + y).
                    Inner wrapper: overflow-hidden clip for slide animation.
                    Innermost span: ref target for yPercent slide. */}
                <span className="stat-sub font-host font-medium text-lg text-white tracking-tight leading-none opacity-0 translate-y-4">
                  <span className="block overflow-hidden" style={{ height: "1.4em" }}>
                    <span ref={statLabelRef} className="block">
                      Viral Impressions
                    </span>
                  </span>
                </span>

              </div>

              {/* Indicator dots */}
              <div className="flex gap-2 items-center mt-12">
                <div ref={(el) => (dotsRef.current[0] = el)} className="stat-dot size-1.5 bg-[#ff6f21] opacity-0 scale-0" />
                <div ref={(el) => (dotsRef.current[1] = el)} className="stat-dot size-1.5 bg-white opacity-0 scale-0" />
                <div ref={(el) => (dotsRef.current[2] = el)} className="stat-dot size-1.5 bg-white opacity-0 scale-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}