import { useRef } from "react";
import { gsap, useGSAP } from "./Gsapconfig";
import GlobalGrid from "./Globalgrid";

// ── Orange corner marker SVGs (same pattern as MissionStats) ──

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

// ── Card data ──

const cards = [
  {
    num: "01",
    title: "UGC Engine",
    desc: "Continuous content systems designed to generate, test, and scale high-performing user-generated content.",
    img: "/images/image 489.png",
  },
  {
    num: "02",
    title: "Product Launch",
    desc: "Structured launch execution that drives immediate traction through coordinated content and creator distribution.",
    img: "/images/image 493.png",
  },
  {
    num: "03",
    title: "Pre-IPO Distribution",
    desc: "High-scale distribution systems built to maximize visibility during critical growth phases.",
    img: "/images/image 494.png",
  },
  {
    num: "04",
    title: "Social Media Transformation",
    desc: "Turning social presence into a disciplined, performance-driven growth system.",
    img: "/images/image 495.png",
  },
];

export default function CoreOperations() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;

      const targets = el.querySelectorAll(
        ".co-label, .co-title, .co-tagline, .co-card"
      );
      gsap.set(targets, { opacity: 0, y: 30 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
        .to(".co-label", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(".co-title", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .to(".co-tagline", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .to(".co-card", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
        }, "-=0.2");
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-25 w-full overflow-hidden pt-24 md:pt-32 lg:pt-40 pb-0"
    >
      {/* ── Background grid mesh ── */}
      <GlobalGrid />

      {/* ── Grid lines (z-30) ── */}
      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-50" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-50" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* ── Orange corner markers (z-30) ── */}
      <CornerLeft className="pointer-events-none absolute -top-0.5 left-[105px] z-30" aria-hidden="true" />
      <CornerRight className="pointer-events-none absolute -top-0.5 right-[105px] z-30" aria-hidden="true" />
      <CornerLeft className="pointer-events-none absolute -bottom-1 left-[105px] z-30" style={{ transform: "scaleY(-1)" }} aria-hidden="true" />
      <CornerRight className="pointer-events-none absolute -bottom-1 right-[105px] z-30" style={{ transform: "scale(-1, -1)" }} aria-hidden="true" />

      {/* ── Content (z-40) ── */}
      <div className="relative z-40 max-w-[147rem] mx-auto px-8 md:px-16 lg:px-24 xl:px-25">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row justify-between w-full items-start gap-8 lg:gap-16 mb-16 md:mb-24">
          {/* Left: label + heading */}
          <div className="flex flex-col ">
            <p className="co-label font-host font-normal text-2xl uppercase text-vl-orange mb-2">
              What We Do
            </p>
            <h2 className="co-title font-bricolage font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] text-white tracking-tighter">
              Core Operations
            </h2>
          </div>

          {/* Right: glow line + tagline */}
          <div className="co-tagline flex flex-col items-end lg:mt-10">
            {/* CSS glow line */}
            {/* <div className="relative w-40 md:w-56 h-1 mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vl-orange to-vl-orange rounded-full blur-sm opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-vl-orange to-vl-orange rounded-full" />
            </div> */}
            <p className="font-host font-normal text-base sm:text-lg md:text-xl text-vl-muted text-right tracking-tight">
              Precision over noise.
            </p>
          </div>
        </div>

      </div>

      {/* ── Cards grid — spans full width between grid lines, flush to section bottom ── */}
      <div className="relative z-40 mx-[105px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#383838]">
        {cards.map((card, i) => {
          const isFirst = i === 0;
          const isLast = i === cards.length - 1;

          return (
            <div
              key={card.num}
              className={`co-card relative flex flex-col ${
                !isLast ? "lg:border-r border-[#383838]" : ""
              }`}
            >
              {/* Image area */}
              <div className="relative aspect-square bg-[#0a0a0a] overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover mix-blend-lighten"
                />

                {/* Number badge — bottom-left of image, flush to bottom */}
                <div className="absolute bottom-0 left-0 z-10">
                  <span className="inline-block font-host text-base md:text-lg text-white/90 bg-[#2a2a2a] px-3 py-1.5">
                    {card.num}
                  </span>
                </div>
              </div>

              {/* Horizontal divider */}
              <div className="h-px bg-white/20" />

              {/* Content */}
              <div
                className={`relative p-6 md:p-8 lg:p-10 flex flex-col aspect-square ${
                  isFirst ? "bg-[#1a1a1a]" : "bg-transparent"
                }`}
              >
                <h3 className="font-alliance font-bold text-2xl md:text-3xl lg:text-[3.5rem] uppercase tracking-tighter leading-tight text-white">
                  {card.title}
                </h3>
                <p
                  className="absolute top-[50%] font-host text-base md:text-3xl tracking-tight leading-relaxed text-[hsla(0,0%,63%,1)] my-auto"
                  
                >
                  {card.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
