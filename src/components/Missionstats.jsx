/**
 * MissionStats — "Operational Impact at Scale" section
 *
 * Structure (top to bottom):
 * 1. Section grid (own grid, independent from hero)
 * 2. Header: "IMPACT STATS" label + heading + description
 * 3. Screens carousel: 5 phone mockups with view counts
 * 4. Quote: "Performance isn't accidental. It's deployed."
 * 5. Stats circle: dashed arc + 200M+ + dot indicators
 */

import { forwardRef } from "react";

// ════════════════════════════════════════════════
// INLINE SVG COMPONENTS
// ════════════════════════════════════════════════

// Orange bracket "[" (4×16) — used in view count labels
const BracketLeft = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="4" height="16" viewBox="0 0 4 16" fill="none" className={className}>
    <path d="M-6.24657e-05 15.2961V7.34329e-05H3.19994V0.928074H1.05594V14.3521H3.19994V15.2961H-6.24657e-05Z" fill="#FF6F21" />
  </svg>
));

// Orange bracket "]" — mirrored version
const BracketRight = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="4" height="16" viewBox="0 0 4 16" fill="none" className={className} style={{ transform: "scaleX(-1)" }}>
    <path d="M-6.24657e-05 15.2961V7.34329e-05H3.19994V0.928074H1.05594V14.3521H3.19994V15.2961H-6.24657e-05Z" fill="#FF6F21" />
  </svg>
));

// Play triangle icon (16×18)
const PlayIcon = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="16" height="18" viewBox="0 0 16 18" fill="none" className={className}>
    <path d="M14.29 9L0.649414 16.875V1.125L14.29 9Z" stroke="white" strokeWidth="1.29909" />
  </svg>
));

// Corner marker left (5×9) — orange crosshair
const CornerLeft = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="5" height="9" viewBox="0 0 5 9" fill="none" className={className}>
    <path d="M0.5 0L0.5 8M0.5 4L4.5 4" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
));

// Corner marker right (5×9) — orange crosshair
const CornerRight = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="5" height="9" viewBox="0 0 5 9" fill="none" className={className}>
    <path d="M4.5 0L4.5 8M0.5 4H4.5" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
));

// Dashed semicircle arc (1064×346) with gradient
const DashedArc = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="1064" height="346" viewBox="0 0 1064 346" fill="none" className={className}>
    <circle cx="532" cy="532.5" r="532" stroke="url(#arcGrad0)" strokeDasharray="14 14" />
    <circle cx="532" cy="532.5" r="532" stroke="url(#arcGrad1)" strokeDasharray="14 14" />
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

// ════════════════════════════════════════════════
// SCREEN CARD DATA
// ════════════════════════════════════════════════

const SCREENS = [
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
];

// ════════════════════════════════════════════════
// SCREEN CARD COMPONENT
// ════════════════════════════════════════════════

function ScreenCard({ views, image }) {
  return (
    <div className="flex flex-col gap-3 items-center w-[254px] shrink-0">
      {/* Phone screen */}
      <div className="relative w-full h-[495px] bg-white overflow-hidden">
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Bottom gradient fade to black */}
        <div className="absolute bottom-0 left-0 w-full h-[233px] bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* View count label: [ ▶ 1.6 Million ] */}
      <div className="flex items-center justify-between w-full">
        <BracketLeft />
        <div className="flex items-center justify-between w-[221px]">
          <PlayIcon />
          <span className="font-host font-medium text-[16px] text-white text-center leading-normal">
            {views}
          </span>
        </div>
        <BracketRight />
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════
// STATS DATA
// ════════════════════════════════════════════════

const STATS = [
  { label: "Views", value: "200M+", subtitle: "Viral Views Generated" },
  { label: "Installs", value: "50M+", subtitle: "App Installs Driven" },
  { label: "Clients", value: "120+", subtitle: "Brands Served" },
];

// ════════════════════════════════════════════════
// MAIN SECTION COMPONENT
// ════════════════════════════════════════════════

export default function MissionStats() {
  return (
    <section className="relative w-full  overflow-hidden">
      {/* ── Left & Right vertical grid lines (z-30) ── */}
      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />

      {/* ── Top horizontal line (z-30) ── */}
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* ── Bottom horizontal line (z-30) ── */}
      <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* ── Corner markers (z-30) ── */}
      <CornerLeft className="pointer-events-none absolute top-[-3px] left-[105px] z-30" />
      <CornerRight className="pointer-events-none absolute top-[-3px] right-[105px] z-30" />
      <CornerLeft className="pointer-events-none absolute bottom-[-4px] left-[105px] z-30" style={{ transform: "scaleY(-1)" }} />
      <CornerRight className="pointer-events-none absolute bottom-[-4px] right-[105px] z-30" style={{ transform: "scaleY(-1)" }} />

      {/* ── Content (z-40) ── */}
      <div className="relative z-40 px-38 pt-20 pb-10">
        {/* ── Header Area ── */}
        <div className="flex justify-between items-start mb-[135px]">
          {/* Left: Label + Heading */}
          <div className="flex flex-col gap-1 w-[357px]">
            <p
              className="font-bricolage font-normal text-[16px] text-[#ff6f21] uppercase leading-normal"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              Impact Stats
            </p>
            <h2 className="font-host font-medium text-[54px] text-[#f1f1f1] tracking-[-2.16px] leading-[56px]">
              Operational Impact at Scale
            </h2>
          </div>

          {/* Right: Description */}
          <p className="font-host font-light text-[16px] text-white tracking-[-0.96px] leading-[20px] w-[293px] mt-[50px]">
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        {/* ── Screens Carousel ── */}
        <div className="flex gap-[120px] items-center justify-center p-[40px] overflow-visible mb-[80px]">
          {SCREENS.map((screen, i) => (
            <ScreenCard key={i} {...screen} />
          ))}
        </div>

        {/* ── Quote ── */}
        <div className="flex justify-center mb-[80px]">
          <p className="font-host text-[40px] text-[#f1f1f1] text-center tracking-[-1.6px] leading-[40px] w-[419px]">
            Performance isn't accidental. It's deployed.
          </p>
        </div>

        {/* ── Stats Circle Area ── */}
        <div className="relative flex flex-col items-center">
          {/* Dashed arc */}
          <div className="relative w-[1064px] h-[346px] overflow-hidden">
            <DashedArc className="absolute left-0 top-[5px]" />

            {/* Stats content centered inside the arc */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-[60px]">
              {/* Text stack */}
              <div className="flex flex-col items-center text-center">
                <span className="font-host font-medium text-sm text-[#ff6f21] tracking-[-0.28px] leading-none">
                  Views
                </span>
                <span
                  className="font-bricolage font-normal text-[88px] text-white tracking-[-5.28px] leading-none whitespace-nowrap"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  200M+
                </span>
                <span className="font-host  text-md text-white tracking-[-0.36px] leading-none">
                  Viral Views Generated
                </span>
              </div>

              {/* Dot indicators */}
              <div className="flex gap-2 items-center mt-12">
                <div className="w-[6px] h-[6px] bg-[#ff6f21]" />
                <div className="w-[6px] h-[6px] bg-white" />
                <div className="w-[6px] h-[6px] bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}