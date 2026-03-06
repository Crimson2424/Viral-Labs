/**
 * Navbar — Glassmorphic navigation bar with glow effects.
 * All SVGs are inline (from SvgAssets) for GSAP animation.
 */

import { ViralLabsLogo, ArrowIcon, NavGlowLine } from "./SvgAssets";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("Home");

  const navStyle = {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(9.5px)",
    WebkitBackdropFilter: "blur(9.5px)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderImage: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(102,102,102,0.7) 100%) 1",
  };

  const fontStyle = {
    fontVariationSettings: "'opsz' 14, 'wdth' 100",
  };

  return (
    <header className="absolute top-[9px] left-1/2 -translate-x-1/2 z-50">
      <nav className="relative inline-flex items-center justify-center gap-9 px-5 py-0 overflow-hidden" style={navStyle}>
        <a href="#home" className="flex items-center gap-1 shrink-0" aria-label="Viral Labs Home">
          <ViralLabsLogo className="w-[14px] h-[14px]" />
          <span className="font-bricolage font-semibold text-white text-[18.3px] leading-none" style={{ letterSpacing: "-1.1px", ...fontStyle }}>
            Viral Labs
          </span>
        </a>

        <div className="inline-flex items-center gap-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveNav(item.label);
              }}
              className="relative font-bricolage font-normal text-white text-sm text-center tracking-[-0.56px] leading-none hover:opacity-80 transition-opacity duration-300"
              style={fontStyle}
              aria-current={activeNav === item.label ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="relative inline-flex items-center justify-center px-2.5 py-2">
          <a href="#go-viral" className="inline-flex items-center justify-center gap-2 hover:opacity-80 transition-opacity duration-300">
            <span className="font-bricolage font-normal text-white text-sm text-center tracking-[-0.56px] leading-none" style={fontStyle}>
              Go Viral
            </span>
            <ArrowIcon size={10} />
          </a>
          <NavGlowLine className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" />
        </div>

        <div className="absolute top-0 -left-[35px] w-9 h-9 rounded-[18px] pointer-events-none" style={{ background: "white", filter: "blur(17px)" }} aria-hidden="true" />
        <div className="absolute -top-[15px] -right-9 w-9 h-9 rounded-[18px] pointer-events-none" style={{ background: "#fbe7d4", filter: "blur(17px)" }} aria-hidden="true" />
      </nav>
    </header>
  );
}