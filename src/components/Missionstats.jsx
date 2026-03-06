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

// Section screen grid (1280×1483)
const SectionGrid = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="100%"
    height="100%"
    viewBox="0 0 1280 1483"
    fill="none"
    className={className}
    preserveAspectRatio="none"
    overflow="hidden"
  >
    <g opacity="0.7" clipPath="url(#clipSG0)">
      <path
        d="M2.25294 1278L1280 1278L1280 0M1280 1210.74L2.25293 1210.74M1280 1143.47L2.25293 1143.47M1280 1076.21L2.25293 1076.21M1280 1008.95L2.25293 1008.95M1280 941.685L2.25292 941.685M1280 874.422L2.25292 874.422M1280 807.158L2.25292 807.159M1280 739.895L2.25291 739.896M1280 672.632L2.25291 672.632M1280 605.369L2.25291 605.369M1280 538.106L2.2529 538.106M1280 470.843L2.2529 470.843M1280 403.58L2.2529 403.58M1280 336.317L2.2529 336.317M1280 269.054L2.25289 269.054M1280 201.791L2.25289 201.791M1280 134.528L2.25289 134.528M1280 67.2646L2.25288 67.2649M1280 0.00158691L2.25288 0.00183105M1212.63 0V1278M1145.26 0L1145.26 1278M1077.89 0L1077.89 1278M1010.53 0L1010.53 1278M943.158 0V1278M875.789 0L875.79 1278M808.421 0L808.421 1278M741.053 0L741.053 1278M673.684 0L673.685 1278M606.316 0L606.316 1278M538.948 0L538.948 1278M471.579 0L471.579 1278M404.211 0L404.211 1278M336.842 0L336.842 1278M269.474 0L269.474 1278M202.105 0L202.106 1278M134.737 0L134.737 1278M67.3684 0L67.3686 1278M0 0L0.000187485 1278"
        stroke="white"
        strokeOpacity="0.06"
      />
      <g clipPath="url(#clipSG1)">
        <path
          d="M2.25294 2553L1280 2553L1280 1275M1280 2485.74L2.25293 2485.74M1280 2418.47L2.25293 2418.47M1280 2351.21L2.25293 2351.21M1280 2283.95L2.25293 2283.95M1280 2216.68L2.25292 2216.68M1280 2149.42L2.25292 2149.42M1280 2082.16L2.25292 2082.16M1280 2014.9L2.25291 2014.9M1280 1947.63L2.25291 1947.63M1280 1880.37L2.25291 1880.37M1280 1813.11L2.2529 1813.11M1280 1745.84L2.2529 1745.84M1280 1678.58L2.2529 1678.58M1280 1611.32L2.2529 1611.32M1280 1544.05L2.25289 1544.05M1280 1476.79L2.25289 1476.79M1280 1409.53L2.25289 1409.53M1280 1342.26L2.25288 1342.26M1280 1275L2.25288 1275M1212.63 1275V2553M1145.26 1275L1145.26 2553M1077.89 1275L1077.89 2553M1010.53 1275L1010.53 2553M943.158 1275V2553M875.789 1275L875.79 2553M808.421 1275L808.421 2553M741.053 1275L741.053 2553M673.684 1275L673.685 2553M606.316 1275L606.316 2553M538.948 1275L538.948 2553M471.579 1275L471.579 2553M404.211 1275L404.211 2553M336.842 1275L336.842 2553M269.474 1275L269.474 2553M202.105 1275L202.106 2553M134.737 1275L134.737 2553M67.3684 1275L67.3686 2553M0 1275L0.000187485 2553"
          stroke="white"
          strokeOpacity="0.06"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clipSG0">
        <rect width="1280" height="1483" fill="white" />
      </clipPath>
      <clipPath id="clipSG1">
        <rect width="1280" height="1275" fill="white" transform="translate(0 1278)" />
      </clipPath>
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
    <section className="relative w-full bg-black overflow-hidden">
      {/* ── Section Grid (z-10) ── */}
      <div
        className="pointer-events-none absolute top-[5px] left-[105px] right-[105px] bottom-0 overflow-hidden z-10"
        aria-hidden="true"
      >
        <SectionGrid className="w-full h-full" />
      </div>

      {/* ── Left & Right vertical grid lines (z-30) ── */}
      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />

      {/* ── Top horizontal line (z-30) ── */}
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* ── Bottom horizontal line (z-30) ── */}
      <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* ── Corner markers (z-30) ── */}
      <CornerLeft className="pointer-events-none absolute top-[-1px] left-[101px] z-30" />
      <CornerRight className="pointer-events-none absolute top-[-1px] right-[101px] z-30" />
      <CornerLeft className="pointer-events-none absolute bottom-[-1px] left-[101px] rotate-180 origin-center z-30" style={{ transform: "scaleY(-1)" }} />
      <CornerRight className="pointer-events-none absolute bottom-[-1px] right-[101px] z-30" style={{ transform: "scaleY(-1)" }} />

      {/* ── Content (z-40) ── */}
      <div className="relative z-40 px-[147px] pt-[80px] pb-[40px]">
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
        <div className="flex gap-[120px] items-center justify-center p-[40px] -mx-[147px] overflow-visible mb-[80px]">
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
              <div className="flex flex-col gap-4 items-center text-center">
                <span className="font-host font-medium text-[14px] text-[#ff6f21] tracking-[-0.28px] leading-normal">
                  Views
                </span>
                <span
                  className="font-bricolage font-normal text-[88px] text-white tracking-[-5.28px] leading-normal whitespace-nowrap"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
                >
                  200M+
                </span>
                <span className="font-host font-medium text-[18px] text-white tracking-[-0.36px] leading-normal">
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