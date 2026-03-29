import React, { useRef } from "react";
import GlobalTexture from "./Globaltexture";
import { gsap, SplitText, useGSAP } from "./Gsapconfig";

/* ─── SVG paths (served from public/svgs/) ─── */
const QuoteIcon = "/svgs/Quote_Icon.svg";
const ShiftLine = "/svgs/shift_line.svg";

/* ─── Testimonial data ─── */
const testimonials = [
  {
    id: 0,
    quote:
      "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make.!",
    founderName: "Founder Name",
    founderTitle: "Founder, XYZ",
    founderAvatar: "",
    companyName: "XYZ.",
  },
  {
    id: 1,
    quote:
      "Their strategic approach transformed our brand presence overnight. The team's creative vision and relentless execution turned our ambitious goals into measurable results that exceeded every benchmark.",
    founderName: "Sarah Mitchell",
    founderTitle: "CEO, NovaTech",
    companyName: "NovaTech.",
  },
  {
    id: 2,
    quote:
      "Working with this team felt like having an unfair advantage. They didn't just deliver a campaign, they engineered a growth system that keeps compounding month after month.",
    founderName: "James Carter",
    founderTitle: "Head of Growth, Arcline",
    companyName: "Arcline.",
  },
];

const BridgeTestimonial = () => {
  const sectionRef = useRef(null);
  const quoteWrapperRef = useRef(null);
  const quoteRef = useRef(null);
  const founderNameRef = useRef(null);
  const founderTitleRef = useRef(null);
  const companyRef = useRef(null);
  const shiftLineRef = useRef(null);
  const glowLineRef = useRef(null);
  const cubeRefs = useRef([]);

  const splitInstances = useRef([]);
  const activeIndex = useRef(0);
  const isAnimating = useRef(false);
  const cycleTimer = useRef(null);
  const goToRef = useRef(null);

  /* ─── Smoothly transition cube pagination highlight ─── */
  const updateCubes = (newIndex) => {
    cubeRefs.current.forEach((cube, i) => {
      if (!cube) return;
      if (i === newIndex) {
        gsap.to(cube, {
          backgroundColor: "#FF6F21",
          boxShadow: "0 0 6px #FF6F21, 0 0 14px rgba(255,111,33,0.5)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(cube, {
          backgroundColor: "rgba(255,255,255,0.3)",
          boxShadow: "0 0 0px transparent",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    });
  };

  /* ─── Cleanup all SplitText instances ─── */
  const revertSplits = () => {
    splitInstances.current.forEach((s) => s && s.revert());
    splitInstances.current = [];
  };

  /* ─── Animate text IN (reveal) ─── */
  const animateIn = (onComplete) => {
    const data = testimonials[activeIndex.current];

    /* Update raw text content before splitting */
    if (quoteRef.current) quoteRef.current.textContent = data.quote;
    if (founderNameRef.current) founderNameRef.current.textContent = data.founderName;
    if (founderTitleRef.current) founderTitleRef.current.textContent = data.founderTitle;
    if (companyRef.current) companyRef.current.textContent = data.companyName;

    /* Split all text elements into masked lines */
    const quoteSplit = SplitText.create(quoteRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const nameSplit = SplitText.create(founderNameRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const titleSplit = SplitText.create(founderTitleRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });
    const companySplit = SplitText.create(companyRef.current, {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });

    splitInstances.current = [quoteSplit, nameSplit, titleSplit, companySplit];

    const allLines = [
      ...quoteSplit.lines,
      ...nameSplit.lines,
      ...titleSplit.lines,
      ...companySplit.lines,
    ];

    /* Set initial hidden state */
    gsap.set(allLines, { y: "100%" });
    gsap.set(shiftLineRef.current, { opacity: 0, scaleX: 0, transformOrigin: "left center" });
    gsap.set(glowLineRef.current, { opacity: 0, scaleY: 0, transformOrigin: "center top" });

    /* Reveal timeline — only .to() */
    const tl = gsap.timeline({ onComplete });

    tl.to(glowLineRef.current, { opacity: 1, scaleY: 1, duration: 0.7, ease: "power3.out" }, 0)
      .to(quoteSplit.lines, { y: "0%", duration: 0.9, stagger: 0.08, ease: "power4.out" }, 0.15)
      .to(shiftLineRef.current, { opacity: 1, scaleX: 1, duration: 0.7, ease: "power3.out" }, 0.6)
      .to(
        [...nameSplit.lines, ...titleSplit.lines],
        { y: "0%", duration: 0.7, stagger: 0.06, ease: "power4.out" },
        0.5
      )
      .to(companySplit.lines, { y: "0%", duration: 0.7, ease: "power4.out" }, 0.6);

    return tl;
  };

  /* ─── Animate text OUT (exit upward) ─── */
  const animateOut = () => {
    return new Promise((resolve) => {
      const allLines = splitInstances.current.flatMap((s) => (s ? s.lines : []));

      if (allLines.length === 0) {
        revertSplits();
        resolve();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          revertSplits();
          resolve();
        },
      });

      tl.to(allLines, { y: "-100%", duration: 0.6, stagger: 0.03, ease: "power3.in" })
        .to(shiftLineRef.current, { opacity: 0, scaleX: 0, duration: 0.4, ease: "power3.in" }, 0)
        .to(glowLineRef.current, { opacity: 0, scaleY: 0, duration: 0.4, ease: "power3.in" }, 0);
    });
  };

  /* ─── Start auto-cycle timer (always calls latest goTo via ref) ─── */
  const startCycleTimer = () => {
    if (cycleTimer.current) clearTimeout(cycleTimer.current);
    cycleTimer.current = setTimeout(() => {
      const next = (activeIndex.current + 1) % testimonials.length;
      goToRef.current(next);
    }, 5000);
  };

  /* ─── Go to a specific testimonial ─── */
  const goTo = async (index) => {
    if (isAnimating.current || index === activeIndex.current) return;
    isAnimating.current = true;

    if (cycleTimer.current) clearTimeout(cycleTimer.current);

    await animateOut();

    activeIndex.current = index;
    updateCubes(index);

    animateIn(() => {
      isAnimating.current = false;
      startCycleTimer();
    });
  };

  /* Keep ref always pointing to latest goTo (survives re-renders) */
  goToRef.current = goTo;

  /* ─── Stable click handler that reads from ref ─── */
  const handleCubeClick = (index) => {
    goToRef.current(index);
  };

  /* ─── Initial entrance on scroll + start cycling ─── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.set(quoteRef.current, { opacity: 1 });

      /* ── Measure all testimonials, lock to tallest ── */
      if (quoteWrapperRef.current && quoteRef.current) {
        let maxHeight = 0;
        const originalText = quoteRef.current.textContent;

        testimonials.forEach((t) => {
          quoteRef.current.textContent = t.quote;
          const h = quoteWrapperRef.current.offsetHeight;
          if (h > maxHeight) maxHeight = h;
        });

        quoteRef.current.textContent = originalText;
        quoteWrapperRef.current.style.height = `${maxHeight}px`;
      }

      /* Lock animation on initial entrance */
      isAnimating.current = true;

      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
          onEnter: () => {
            updateCubes(0);
            animateIn(() => {
              isAnimating.current = false;
              startCycleTimer();
            });
          },
        },
      });

      return () => {
        if (cycleTimer.current) clearTimeout(cycleTimer.current);
        revertSplits();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-28 lg:py-32">
      <GlobalTexture />

      {/* ── centred wrapper ── */}
      <div className="relative z-10 mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem]">
        {/* ── testimonial card ── */}
        <div className="relative mx-auto max-w-[52rem] px-6 py-10 sm:px-10 md:px-14 md:py-14 lg:px-16 lg:py-16">
          {/* ─── Four orange corner brackets ─── */}
          <CornerBrackets />

          {/* ─── Glowing vertical line – left side ─── */}
          <span
            ref={glowLineRef}
            className="pointer-events-none absolute left-8 top-1/2 hidden h-[52%] w-[2px] -translate-y-1/2 sm:block"
            style={{
              background: "#F05A1F",
              boxShadow: "0 0 3px #F05A1F, 0 0 8px #F05A1Fcc, 0 0 18px #F05A1F99",
              mixBlendMode: "plus-lighter",
              opacity: 0,
            }}
          />

          {/* ─── Quote icon (static, doesn't animate) ─── */}
          <img
            src={QuoteIcon}
            alt="quote"
            className="mb-5 h-7 w-8 select-none opacity-80 sm:mb-6 sm:h-8 sm:w-10 md:h-9 md:w-11"
            draggable={false}
          />

          {/* ─── Quote text + decorative cubes ─── */}
          <div ref={quoteWrapperRef} className="relative">
            <p
              ref={quoteRef}
              className="font-bricolage text-base font-thin leading-[1.75] tracking-wide text-white sm:text-lg md:text-2xl md:leading-tight"
            >
              {testimonials[0].quote}
            </p>

            <GlowCubes />
          </div>

          {/* ─── Shift / curve line ─── */}
          <img
            ref={shiftLineRef}
            src={ShiftLine}
            alt=""
            className="mt-0 h-auto w-full max-w-[48rem] select-none"
            style={{ opacity: 0 }}
            draggable={false}
          />

          {/* ─── Bottom row: founder info + company ─── */}
          <div className="mt-8 flex items-center justify-between sm:mt-10">
            {/* founder */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 shrink-0 rounded-full bg-[#2a2a2a] sm:h-10 sm:w-10" />
              <div className="flex flex-col">
                <span
                  ref={founderNameRef}
                  className="font-host text-sm font-thin leading-tight text-white sm:text-sm"
                >
                  {testimonials[0].founderName}
                </span>
                <span
                  ref={founderTitleRef}
                  className="font-host text-xs leading-tight text-white/70 sm:text-[13px]"
                >
                  {testimonials[0].founderTitle}
                </span>
              </div>
            </div>

            {/* company name */}
            <span
              ref={companyRef}
              className="font-host text-xl font-semibold tracking-tight text-white sm:text-2xl md:text-2xl"
            >
              {testimonials[0].companyName}
            </span>
          </div>

          {/* ─── Pagination cubes (below founder row) ─── */}
          <div className="mt-6 flex items-center justify-center gap-0">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => handleCubeClick(i)}
                aria-label={`Testimonial ${i + 1}`}
                className="group relative flex h-8 w-6 cursor-pointer items-center justify-center transition-transform duration-200 hover:scale-125"
              >
                <span
                  ref={(el) => (cubeRefs.current[i] = el)}
                  className="block h-[12px] w-[12px]"
                  style={{
                    backgroundColor: i === 0 ? "#FF6F21" : "rgba(255,255,255,0.3)",
                    boxShadow: i === 0 ? "0 0 6px #FF6F21, 0 0 14px rgba(255,111,33,0.5)" : "none",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridgeTestimonial;

/* ════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ════════════════════════════════════════════════════════════════════ */

const CORNER_THICKNESS = "2px";
const CORNER_COLOR = "#FF6F21";

const cornerBase = "pointer-events-none absolute h-[28px] w-[28px]";

const CornerBrackets = () => (
  <>
    <span
      className={`${cornerBase} left-0 top-10`}
      style={{
        borderTop: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
        borderLeft: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
      }}
    />
    <span
      className={`${cornerBase} right-0 top-10`}
      style={{
        borderTop: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
        borderRight: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
      }}
    />
    <span
      className={`${cornerBase} bottom-10 left-0`}
      style={{
        borderBottom: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
        borderLeft: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
      }}
    />
    <span
      className={`${cornerBase} bottom-10 right-0`}
      style={{
        borderBottom: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
        borderRight: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`,
      }}
    />
  </>
);

const GlowCubes = () => {
  const cubeStyle = {
    width: "10px",
    height: "10px",
    backgroundColor: "#FF6F21",
    boxShadow: "0 0 10px #FF6F21, 0 0 20px #FF6F21aa",
  };

  return (
    <div className="absolute -right-3 top-0 hidden flex-col gap-[8px] sm:flex md:-right-3">
      <span style={cubeStyle} />
      <span style={cubeStyle} />
    </div>
  );
};