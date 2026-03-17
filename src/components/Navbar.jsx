/**
 * Navbar — Glassmorphic nav with layered animations.
 *
 * ENTRANCE (page load):
 *   Controlled via `entranceDelay` prop (default 0.3s) for sync with parent timeline.
 *   Phase 1 — Nav bar slides down from yPercent: -120 → 0
 *   Phase 2 — Text mask reveals (inner wrappers slide up)
 *             Logo icon fades in
 *
 * HOVER — LOGO (logo icon + text area):
 *   Logo SVG scales up 1.2x + rotates 360° → stays scaled while hovered.
 *   On leave: reverses — rotates back + scales to 1.
 *   Paused timeline with play()/reverse().
 *
 * HOVER — NAV LINKS (after entrance):
 *   Character stagger via text-shadow + translateY.
 *
 * HOVER — CTA "Go Viral" + ARROW:
 *   Text: char stagger + centering shift
 *   Arrow: clip-masked slide-in from left + rotate 45° → 0°
 *   Glow line: DrawSVG grows from center outward (50% 50% → 0% 100%)
 *
 * All initial states via gsap.set() or CSS.
 * All tweens use .to() only.
 * useGSAP hook for cleanup.
 */

import { useRef } from "react";
import { gsap, SplitText, DrawSVGPlugin, useGSAP } from "./Gsapconfig";
import { ViralLabsLogo, ArrowIcon, NavGlowLine } from "./SvgAssets";
import { useState } from "react";
import { entranceState } from "./entranceState";

/* ─── Config ─── */
const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const CHAR_DELAY_INCREMENT = 0.01;

const ARROW_SIZE = 12;
const CTA_GAP = 8;
const TEXT_OFFSET = (ARROW_SIZE + CTA_GAP) / 2;

/* ─── CharSpans — pre-split characters for stagger hover ─── */
function CharSpans({ text }) {
  return [...text].map((char, i) => (
    <span
      key={i}
      className="nav-char"
      style={{
        display: "inline-block",
        position: "relative",
        textShadow: "0px 1.3em currentColor",
        transitionDelay: `${i * CHAR_DELAY_INCREMENT}s`,
        ...(char === " " ? { whiteSpace: "pre" } : {}),
      }}
    >
      {char}
    </span>
  ));
}

export default function Navbar({ entranceDelay = 0.3 }) {
  const [activeNav, setActiveNav] = useState("Home");

  const headerRef = useRef();
  const navRef = useRef();
  const logoAreaRef = useRef();
  const logoIconRef = useRef();
  const logoTextRef = useRef();
  const glowLineRef = useRef();
  const ctaItemRef = useRef();

  useGSAP(
    () => {
      // ── Initial states ──
      gsap.set(navRef.current, { yPercent: -120 });
      gsap.set(logoIconRef.current, { opacity: 0, scale: 0.8 });

      // ── Logo text — SplitText mask ──
      const logoSplit = SplitText.create(logoTextRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      gsap.set(logoSplit.lines, { yPercent: 110 });

      // ── Nav links + CTA — inner mask wrappers ──
      const linkInners = navRef.current.querySelectorAll(".nav-link-inner");
      gsap.set(linkInners, { yPercent: 110 });

      const ctaInner = navRef.current.querySelector(".nav-cta-inner");
      gsap.set(ctaInner, { yPercent: 110 });

      // ── DrawSVG — glow lines start collapsed at center ──
      const glowLines = glowLineRef.current.querySelectorAll("line");
      gsap.set(glowLines, { drawSVG: "50% 50%" });

      // ═══════════════════════════════════════
      // HOVER TIMELINES (all paused)
      // ═══════════════════════════════════════

      // ── Logo hover: scale up + full 360° rotation ──
      const logoTl = gsap.timeline({ paused: true });
      logoTl.to(logoIconRef.current, {
        scale: 1.2,
        rotation: 360,
        duration: 0.6,
        ease: "power2.inOut",
        transformOrigin: "center center",
      });

      const logoArea = logoAreaRef.current;
      const onLogoEnter = () => logoTl.play();
      const onLogoLeave = () => logoTl.reverse();

      logoArea.addEventListener("mouseenter", onLogoEnter);
      logoArea.addEventListener("mouseleave", onLogoLeave);

      // ── Glow line hover: expand from center ──
      const glowTl = gsap.timeline({ paused: true });
      glowTl.to(glowLines, {
        drawSVG: "0% 100%",
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.02,
      });

      const ctaEl = ctaItemRef.current;
      const onCtaEnter = () => glowTl.play();
      const onCtaLeave = () => glowTl.reverse();

      ctaEl.addEventListener("mouseenter", onCtaEnter);
      ctaEl.addEventListener("mouseleave", onCtaLeave);

      // ═══════════════════════════════════════
      // ENTRANCE TIMELINE
      // ═══════════════════════════════════════

      const tl = gsap.timeline({ paused: true });

      // Phase 1 — Navbar slides down
      tl.to(navRef.current, {
        yPercent: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      // Phase 2 — Text reveals
      tl.to(
        logoIconRef.current,
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      );

      tl.to(
        logoSplit.lines,
        { yPercent: 0, duration: 0.5, ease: "expo.out" },
        "<0.05"
      );

      tl.to(
        linkInners,
        { yPercent: 0, stagger: 0.06, duration: 0.5, ease: "expo.out" },
        "<0.08"
      );

      tl.to(
        ctaInner,
        { yPercent: 0, duration: 0.5, ease: "expo.out" },
        "<0.06"
      );

      // ── After entrance: hand off to CSS hover ──
      tl.call(() => {
        gsap.set(linkInners, { clearProps: "transform" });
        gsap.set(ctaInner, { clearProps: "transform" });
        navRef.current.classList.add("hover-ready");
      });

      entranceState.playNavbar = () => tl.play();

      // ── Cleanup listeners ──
      return () => {
        logoArea.removeEventListener("mouseenter", onLogoEnter);
        logoArea.removeEventListener("mouseleave", onLogoLeave);
        ctaEl.removeEventListener("mouseenter", onCtaEnter);
        ctaEl.removeEventListener("mouseleave", onCtaLeave);
      };
    },
    { scope: headerRef }
  );

  /* ─── Styles ─── */
  const navStyle = {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(9.5px)",
    WebkitBackdropFilter: "blur(9.5px)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderImage:
      "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(102,102,102,0.7) 100%) 1",
  };

  const fontStyle = {
    fontVariationSettings: "'opsz' 14, 'wdth' 100",
  };

  /* Height of text line — controls the overflow clip */
  const textClipHeight = "1em";

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════
           CHARACTER STAGGER HOVER
           ═══════════════════════════════════ */
        .nav-char {
          transform: translateY(0em) rotate(0.001deg);
        }

        .hover-ready .nav-char {
          transition: transform 0.6s cubic-bezier(0.625, 0.05, 0, 1);
        }

        .hover-ready .nav-link-item:hover .nav-char,
        .hover-ready .nav-cta-item:hover .nav-char {
          transform: translateY(-1.3em) rotate(0.001deg);
        }

        /* ═══════════════════════════════════
           CTA TEXT — CENTERING SHIFT
           ═══════════════════════════════════ */
        .cta-text-shift {
          transform: translateX(${TEXT_OFFSET}px);
        }

        .hover-ready .cta-text-shift {
          transition: transform 0.5s cubic-bezier(0.625, 0.05, 0, 1);
        }

        .hover-ready .nav-cta-item:hover .cta-text-shift {
          transform: translateX(0px);
        }

        /* ═══════════════════════════════════
           CTA ARROW — CLIP MASK REVEAL
           ═══════════════════════════════════ */
        .cta-arrow-clip {
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: ${ARROW_SIZE}px;
          height: ${ARROW_SIZE}px;
          flex-shrink: 0;
        }

        .cta-arrow-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateX(-110%) rotate(45deg);
        }

        .hover-ready .cta-arrow-inner {
          transition: transform 0.5s cubic-bezier(0.625, 0.05, 0, 1);
        }

        .hover-ready .nav-cta-item:hover .cta-arrow-inner {
          transform: translateX(0%) rotate(0deg);
        }

        /* ═══════════════════════════════════
           TEXT CLIP WRAPPER — constrains height
           ═══════════════════════════════════ */
        .text-clip {
          display: inline-block;
          position: relative;
          overflow: hidden;
          height: ${textClipHeight};
          line-height: ${textClipHeight};
        }
      `}</style>

      <header
        ref={headerRef}
        className="absolute top-[9px] left-1/2 -translate-x-1/2 z-50"
      >
        <nav
          ref={navRef}
          className="relative inline-flex items-center justify-center gap-9 px-5 py-1 overflow-hidden"
          style={navStyle}
        >
          {/* ── Logo ── */}
          <a
            ref={logoAreaRef}
            href="#home"
            className="flex items-center gap-0.5 shrink-0 cursor-pointer"
            aria-label="Viral Labs Home"
          >
            <span
              ref={logoIconRef}
              className="inline-flex items-center justify-center"
            >
              <ViralLabsLogo className="w-[16px] h-[15px] translate-y-[1px]" />
            </span>
            <span
              ref={logoTextRef}
              className="font-bricolage font-semibold text-white text-[18.3px] leading-none"
              style={{ letterSpacing: "-1.1px", ...fontStyle }}
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
                onClick={(e) => {
                  e.preventDefault();
                  setActiveNav(item.label);
                }}
                className="nav-link-item relative font-bricolage font-light text-white text-sm text-center tracking-[-0.56px] leading-none"
                style={fontStyle}
                aria-current={activeNav === item.label ? "page" : undefined}
              >
                <span className="text-clip">
                  <span className="nav-link-inner inline-block">
                    <CharSpans text={item.label} />
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* ── CTA Button with Glow ── */}
          <div className="relative inline-flex items-center justify-center px-2.5 py-0">
            <a
              ref={ctaItemRef}
              href="#go-viral"
              className="nav-cta-item inline-flex items-center justify-center gap-2"
            >
              {/* CTA text — shifted right by default, slides left on hover */}
              <span className="cta-text-shift">
                <span className="text-clip">
                  <span className="nav-cta-inner inline-block">
                    <span
                      className="font-bricolage font-normal text-white text-sm text-center tracking-[-0.56px] leading-none"
                      style={fontStyle}
                    >
                      <CharSpans text="Go Viral" />
                    </span>
                  </span>
                </span>
              </span>

              {/* Arrow — clip-masked, slides in from left on hover */}
              <span className="cta-arrow-clip">
                <span className="cta-arrow-inner">
                  <ArrowIcon size={ARROW_SIZE} />
                </span>
              </span>
            </a>

            {/* Glow line — DrawSVG animates from center outward on hover */}
            <NavGlowLine
              ref={glowLineRef}
              className="absolute bottom-0 -left-2 w-[calc(100%+16px)] pointer-events-none"
            />
          </div>

          {/* ── Glow lights ── */}
          <div
            className="absolute top-0 -left-[35px] w-9 h-9 rounded-[18px] pointer-events-none"
            style={{ background: "white", filter: "blur(17px)" }}
            aria-hidden="true"
          />
          <div
            className="absolute -top-[15px] -right-9 w-9 h-9 rounded-[18px] pointer-events-none"
            style={{ background: "#fbe7d4", filter: "blur(17px)" }}
            aria-hidden="true"
          />
        </nav>
      </header>
    </>
  );
}