import { useRef } from "react";
import { gsap, useGSAP } from "./Gsapconfig";
import GlobalGrid from "./Globalgrid";

// ── Orange corner marker SVGs (matching MissionStats pattern) ──

const CornerLeft = ({ className = "", ...props }) => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" className={className} {...props}>
    <path d="M0.5 0L0.5 8M0.5 4L4.5 4" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
);

const CornerRight = ({ className = "", ...props }) => (
  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" className={className} {...props}>
    <path d="M4.5 0L4.5 8M0.5 4H4.5" stroke="#FF6F21" strokeLinecap="round" />
  </svg>
);

export default function BridgeTestimonial() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      const targets = el.querySelectorAll(
        ".bt-quote, .bt-text, .bt-curve, .bt-author"
      );

      gsap.set(targets, { opacity: 0, y: 30 });

      gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })
        .to(".bt-quote", {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
        })
        .to(".bt-text", {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        }, "-=0.3")
        .to(".bt-curve", {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
        }, "-=0.4")
        .to(".bt-author", {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
        }, "-=0.3");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-25 w-full overflow-hidden py-24 md:py-32 lg:py-40"
    >
      {/* ── Layer 1: Background grid mesh (z-15) ── */}
      <GlobalGrid />

      {/* ── Layer 2: Grid lines (z-30) — percentage-based offsets ── */}
      <div
        className="pointer-events-none absolute top-0 left-[5%] xl:left-[7%] w-px h-full bg-white/20 z-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 right-[5%] xl:right-[7%] w-px h-full bg-white/20 z-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[5%] xl:left-[7%] right-[5%] xl:right-[7%] h-px bg-white/20 z-30"
        aria-hidden="true"
      />

      {/* ── Orange corner markers (z-30) ── */}
      <CornerLeft
        className="pointer-events-none absolute -top-0.5 left-[5%] xl:left-[7%] z-30"
        aria-hidden="true"
      />
      <CornerRight
        className="pointer-events-none absolute -top-0.5 right-[5%] xl:right-[7%] z-30"
        aria-hidden="true"
      />
      <CornerLeft
        className="pointer-events-none absolute -bottom-1 left-[5%] xl:left-[7%] z-30"
        style={{ transform: "scaleY(-1)" }}
        aria-hidden="true"
      />
      <CornerRight
        className="pointer-events-none absolute -bottom-1 right-[5%] xl:right-[7%] z-30"
        style={{ transform: "scaleY(-1)" }}
        aria-hidden="true"
      />

      {/* ── Layer 3: Content (z-40) ── */}
      <div className="relative z-40 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 xl:px-36">
        <div className="relative max-w-3xl w-full flex flex-col items-start">
          {/* ── Decorations (absolute) ── */}
          <img
            src="/images/vertical-glowLine.png"
            alt=""
            className="absolute left-0 md:-left-6 top-0 h-full w-auto opacity-50 pointer-events-none hidden md:block"
            aria-hidden="true"
          />
          <img
            src="/images/cubes.png"
            alt=""
            className="absolute -top-1 -right-2 md:-right-4 w-5 md:w-7 pointer-events-none"
            aria-hidden="true"
          />

          {/* ── Quote icon ── */}
          <img
            src="/images/Quote Icon.png"
            alt=""
            className="bt-quote w-6 md:w-8 lg:w-10 mb-6 md:mb-8"
          />

          {/* ── Testimonial text ── */}
          <p className="bt-text font-bricolage text-lg sm:text-xl md:text-2xl lg:text-[28px] text-[#f1f1f1] leading-snug tracking-tight mb-8 md:mb-12">
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make.!
          </p>

          {/* ── Curved orange line (inline SVG) ── */}
          <svg
            className="bt-curve w-full mb-8 md:mb-12"
            viewBox="0 0 100 6"
            fill="none"
            preserveAspectRatio="none"
            style={{ height: "clamp(20px, 3vw, 40px)" }}
          >
            <path
              d="M0 5 Q50 0 100 3"
              stroke="rgb(255, 111, 33)"
              strokeWidth="0.4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* ── Author row ── */}
          <div className="bt-author flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
            {/* Left: avatar + info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#d9d9d9] shrink-0" />
              <div>
                <p className="font-host font-semibold text-sm text-white tracking-tight leading-tight">
                  Founder Name
                </p>
                <p className="font-host font-medium text-xs text-vl-muted tracking-tight leading-tight">
                  Founder, XYZ
                </p>
              </div>
            </div>

            {/* Right: company name */}
            <span className="font-host font-bold text-lg md:text-[22px] text-white tracking-tight">
              XYZ.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
