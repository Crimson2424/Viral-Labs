/**
 * MissionStats — "Operational Impact at Scale"
 *
 * Content component only. No GSAP here — the parent HeroSection
 * owns the single pinned timeline that sequences both the dissolve
 * AND the MissionStats content animations.
 *
 * All elements have class names for GSAP targeting.
 * Initial states via Tailwind classes.
 */

import { forwardRef } from "react";

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

const CornerLeft = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="5" height="9" viewBox="0 0 5 9" fill="none" className={className}>
    <path d="M0.5 0L0.5 8M0.5 4L4.5 4" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
));

const CornerRight = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} width="5" height="9" viewBox="0 0 5 9" fill="none" className={className}>
    <path d="M4.5 0L4.5 8M0.5 4H4.5" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
));

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

const SCREENS = [
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
  { views: "1.6 Million", image: "/images/marquee-image.png" },
];

function ScreenCard({ views, image }) {
  return (
    <div className="screen-card flex flex-col gap-3 items-center w-[254px] shrink-0 opacity-0 translate-y-[80px] scale-[0.92]">
      <div className="relative w-full h-[495px] bg-white overflow-hidden">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full h-[233px] bg-gradient-to-b from-transparent to-black" />
      </div>
      <div className="flex items-center justify-between w-full">
        <BracketLeft />
        <div className="flex items-center justify-between w-[221px]">
          <PlayIcon />
          <span className="font-host font-medium text-[16px] text-white text-center leading-normal">{views}</span>
        </div>
        <BracketRight />
      </div>
    </div>
  );
}

export default function MissionStats() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Grid lines */}
      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      <CornerLeft className="pointer-events-none absolute top-[-3px] left-[105px] z-30" />
      <CornerRight className="pointer-events-none absolute top-[-3px] right-[105px] z-30" />
      <CornerLeft className="pointer-events-none absolute bottom-[-4px] left-[105px] z-30" style={{ transform: "scaleY(-1)" }} />
      <CornerRight className="pointer-events-none absolute bottom-[-4px] right-[105px] z-30" style={{ transform: "scaleY(-1)" }} />

      <div className="relative z-40 px-38 pt-20 pb-10">
        {/* Header */}
        <div className="impact-header flex justify-between items-start mb-[135px]">
          <div className="flex flex-col gap-1 w-[357px]">
            <p className="impact-label font-bricolage font-normal text-[16px] text-[#ff6f21] uppercase leading-normal"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              Impact Stats
            </p>
            <h2 className="impact-heading font-host font-medium text-[54px] text-[#f1f1f1] tracking-[-2.16px] leading-[56px]">
              Operational Impact at Scale
            </h2>
          </div>
          <p className="impact-desc font-host font-light text-[16px] text-white tracking-[-0.96px] leading-[20px] w-[293px] mt-[50px]">
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        {/* Screens Carousel */}
        <div className="screens-carousel flex gap-[120px] items-center justify-center p-[40px] overflow-visible mb-[80px]">
          {SCREENS.map((screen, i) => (
            <ScreenCard key={i} {...screen} />
          ))}
        </div>

        {/* Quote */}
        <div className="flex justify-center mb-[80px]">
          <p className="impact-quote font-host text-[40px] text-[#f1f1f1] text-center tracking-[-1.6px] leading-[40px] w-[419px]">
            Performance isn't accidental. It's deployed.
          </p>
        </div>

        {/* Stats Circle Area */}
        <div className="stats-arc relative flex flex-col items-center opacity-0 scale-90">
          <div className="relative w-[1064px] h-[346px] overflow-hidden">
            <DashedArc className="absolute left-0 top-[5px]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-[60px]">
              <div className="flex flex-col items-center text-center">
                <span className="stat-sub font-host font-medium text-sm text-[#ff6f21] tracking-[-0.28px] leading-none opacity-0 translate-y-[15px]">Views</span>
                <span className="stat-number font-bricolage font-normal text-[88px] text-white tracking-[-5.28px] leading-none whitespace-nowrap opacity-0 translate-y-[30px]"
                  style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>200M+</span>
                <span className="stat-sub font-host text-md text-white tracking-[-0.36px] leading-none opacity-0 translate-y-[15px]">Viral Views Generated</span>
              </div>
              <div className="flex gap-2 items-center mt-12">
                <div className="stat-dot w-[6px] h-[6px] bg-[#ff6f21] opacity-0 scale-0" />
                <div className="stat-dot w-[6px] h-[6px] bg-white opacity-0 scale-0" />
                <div className="stat-dot w-[6px] h-[6px] bg-white opacity-0 scale-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}