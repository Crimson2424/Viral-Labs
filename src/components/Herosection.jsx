/**
 * HeroSection — Full hero section composer.
 * Layers: R3F background → Grid overlay → Content
 * Content is centered within a 1440px max-width to match Figma.
 */

import HeroBackground from "./HeroBackground";
import GridOverlay from "./GridOverlay";
import Navbar from "./Navbar";
import { ArrowIcon, CtaGlowLine } from "./SvgAssets";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[945px] bg-black overflow-hidden"
    >
      {/* ── Layer 1: R3F Background Plane ── */}
      <HeroBackground />

      {/* ── Layer 2: Grid + Texture Overlay wrapping content ── */}
      <GridOverlay showTexture={true}>
        {/* ── Layer 3: Navbar ── */}
        <Navbar />

        {/* ── Layer 4: Hero Content (z-40 — topmost) ── */}
        <div className="relative z-40 flex flex-col items-center justify-center h-full pt-[53px]">
          {/* ── Badge / Label ── */}
          <div className="mb-6">
            <div className="rounded-[52px] border border-white/20 p-[6px]">
              <div className="rounded-[46px] border border-white/40 p-[6px]">
                <div className="rounded-[40px] border border-white/80 px-[10px] py-[4px] flex items-center justify-center">
                  <span className="font-alliance font-medium text-[12px] text-[#c5c5c5] tracking-[-0.24px] leading-normal whitespace-nowrap">
                    Engineered Virality
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Heading ── */}
          <h1
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
            Engineering<br />
            Predictable Virality For<br />
            Consumer Apps
          </h1>

          {/* ── Subheading ── */}
          <p className="font-host text-[16px] text-[#a1a1aa] text-center tracking-[-0.32px] leading-normal max-w-[455px] mb-10">
            We build short-form content systems that turn attention into installs
            consistently, at scale, without relying on luck.
          </p>

          {/* ── CTA Button ── */}
          <div className="flex flex-col items-center gap-2">
            <a
              href="#results"
              className="flex items-center justify-center gap-4 w-[160px] h-[40px] border border-white px-[6px] py-[8px] hover:bg-white/10 transition-colors duration-300"
            >
              <span className="font-host font-medium text-[16px] text-white text-center tracking-[-0.32px] leading-normal whitespace-nowrap">
                Viral Results
              </span>
              <ArrowIcon size={8} />
            </a>

            {/* ── CTA sub-text + glow line ── */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-host text-[12px] text-[#a1a1aa] text-center tracking-[-0.24px] leading-normal">
                Real missions. Real outcomes.
              </span>
              <CtaGlowLine className="pointer-events-none" />
            </div>
          </div>
        </div>
      </GridOverlay>
    </section>
  );
}