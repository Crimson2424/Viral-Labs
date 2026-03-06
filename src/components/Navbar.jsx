/**
 * Navbar — Glassmorphic navigation bar with glow effects.
 * All SVGs are inline (from SvgAssets) for GSAP animation.
 */

import { ViralLabsLogo, ArrowIcon, NavGlowLine } from "./SvgAssets";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="absolute top-[9px] left-1/2 -translate-x-1/2 z-50">
      <nav
        className="relative inline-flex items-center justify-center gap-9 px-5 overflow-clip"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(9.5px)",
          WebkitBackdropFilter: "blur(9.5px)",
          borderWidth: "1px",
          borderStyle: "solid",
          borderImage:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(102,102,102,0.7) 100%) 1",
        }}
      >
        {/* ── Logo ── */}
        <a
          href="#home"
          className="relative flex items-center gap-[2px] shrink-0"
          aria-label="Viral Labs Home"
        >
          <ViralLabsLogo className="w-[13px] h-[13px]" />
          <span
            className="font-bricolage font-semibold text-white text-[18.3px] leading-none"
            style={{
              letterSpacing: "-1.1px",
              fontVariationSettings: "'opsz' 14, 'wdth' 100",
            }}
          >
            Viral Labs
          </span>
        </a>

        {/* ── Nav Links ── */}
        <div className="inline-flex items-center gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-bricolage font-normal text-white text-sm text-center tracking-[-0.56px] leading-none hover:opacity-80 transition-opacity duration-300"
              style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* ── CTA Button ── */}
        <a
          href="#go-viral"
          className="inline-flex items-center justify-center gap-2 px-2.5 py-2 hover:opacity-80 transition-opacity duration-300"
        >
          <span
            className="font-bricolage font-normal text-white text-sm text-center tracking-[-0.56px] leading-none"
            style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
          >
            Go Viral
          </span>
          <ArrowIcon size={10} />
        </a>

        {/* ── Glow lights (left & right corners) ── */}
        <div
          className="absolute -left-9 -top-px w-9 h-9 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(17px)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -right-9 -top-4 w-9 h-9 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,231,212,0.8) 0%, rgba(251,231,212,0) 70%)",
            filter: "blur(17px)",
          }}
          aria-hidden="true"
        />

        {/* ── Glow line accent (bottom of navbar) ── */}
        <NavGlowLine className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" />
      </nav>
    </header>
  );
}