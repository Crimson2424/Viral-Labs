import React, { useRef, useEffect } from "react";
import { gsap, SplitText, useGSAP } from "./Gsapconfig";
import GlobalTexture from "./Globaltexture";
import fontReady from "./fontReady";

/* ─── BG image (drop Footer_BG.png into public/images/) ─── */
const FooterBG = "/images/Footer_BG.png";

/* ─── Clock config ─── */
const CLOCKS = [
  { city: "New York", tz: "America/New_York", label: "EDT" },
  { city: "San Francisco", tz: "America/Los_Angeles", label: "PDT" },
  { city: "London", tz: "Europe/London", label: "GMT" },
  { city: "Bangalore", tz: "Asia/Kolkata", label: "IST" },
];

/* ─── Scramble characters ─── */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

/* ─── Nav links ─── */
const NAV_COL_1 = ["Home", "About", "Contact"];
const NAV_COL_2 = ["Services", "Case Studies"];

/* ─── Corner bracket default/hover offsets ─── */
const CORNER_DEFAULT = -8;
const CORNER_HOVER = -12;

/* ─── Arrow SVG component ─── */
const ArrowIcon = () => (
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2 md:w-2.5 md:h-2 md:ml-1 lg:w-3 lg:h-2 lg:ml-1 xl:w-3.5 xl:h-2.5 xl:ml-1.5 2xl:w-4 2xl:h-3 2xl:ml-2 4xl:w-5 4xl:h-4 5xl:w-6 5xl:h-5">
    <path d="M7.92285 11.8463L6.65722 10.5554L10.3275 6.83441H0V5.0119H10.3275L6.65722 1.29094L7.92285 0L13.846 5.92315L7.92285 11.8463Z" fill="white" />
  </svg>
);

/* ════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════ */

const FooterSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const btnRef = useRef(null);
  const btnTextRef = useRef(null);
  const clocksRowRef = useRef(null);
  const footerBarRef = useRef(null);
  const logoNameRef = useRef(null);
  const taglineRef = useRef(null);
  const navCol1Ref = useRef(null);
  const navCol2Ref = useRef(null);
  const socialsRef = useRef(null);
  const copyLeftRef = useRef(null);
  const copyRightRef = useRef(null);

  /* corner bracket refs for button */
  const tlRef = useRef(null);
  const trRef = useRef(null);
  const blRef = useRef(null);
  const brRef = useRef(null);

  /* scramble state */
  const scrambleInterval = useRef(null);
  const originalText = "Reachout";

  /* ─── Button hover: scramble + corner spread ─── */
  const handleBtnEnter = () => {
    gsap.to(tlRef.current, { x: CORNER_HOVER - CORNER_DEFAULT, y: CORNER_HOVER - CORNER_DEFAULT, duration: 0.3, ease: "power2.out" });
    gsap.to(trRef.current, { x: -(CORNER_HOVER - CORNER_DEFAULT), y: CORNER_HOVER - CORNER_DEFAULT, duration: 0.3, ease: "power2.out" });
    gsap.to(blRef.current, { x: CORNER_HOVER - CORNER_DEFAULT, y: -(CORNER_HOVER - CORNER_DEFAULT), duration: 0.3, ease: "power2.out" });
    gsap.to(brRef.current, { x: -(CORNER_HOVER - CORNER_DEFAULT), y: -(CORNER_HOVER - CORNER_DEFAULT), duration: 0.3, ease: "power2.out" });

    if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    let iteration = 0;
    const text = originalText;
    scrambleInterval.current = setInterval(() => {
      if (!btnTextRef.current) return;
      btnTextRef.current.textContent = text
        .split("")
        .map((char, i) => {
          if (char === " ") return char;
          if (i < iteration) return text[i];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");
      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(scrambleInterval.current);
        btnTextRef.current.textContent = text;
      }
    }, 35);
  };

  const handleBtnLeave = () => {
    gsap.to(tlRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(trRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(blRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(brRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });

    if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    if (btnTextRef.current) btnTextRef.current.textContent = originalText;
  };

  /* Lock button text width so scramble doesn't resize it */
  useEffect(() => {
    if (btnTextRef.current) {
      btnTextRef.current.style.display = "inline-block";
      btnTextRef.current.style.width = `${btnTextRef.current.offsetWidth}px`;
    }
  }, []);

  /* ─── Scroll-triggered entrance animations ─── */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      let cancelled = false;
      const splits = [];
      fontReady.then(() => {
        if (cancelled) return;

      /* ── CTA heading split ── */
      const headingSplit = SplitText.create(headingRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      splits.push(headingSplit);

      /* Set initial states — CTA */
      gsap.set(headingSplit.lines, { y: "100%" });
      gsap.set(subtextRef.current, { opacity: 0, y: 20 });
      gsap.set(btnRef.current, { opacity: 0, y: 15 });
      gsap.set(clocksRowRef.current, { opacity: 0, y: 30 });

      /* CTA entrance timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      tl.to(headingSplit.lines, { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" })
        .to(subtextRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.4)
        .to(btnRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.6)
        .to(clocksRowRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.7);

      /* ── Footer bar reveals — simple opacity+y, no SplitText ── */
      const footerEls = [logoNameRef, taglineRef, navCol1Ref, navCol2Ref, copyLeftRef, copyRightRef];
      footerEls.forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { opacity: 0, y: 20 });
      });
      gsap.set(socialsRef.current, { opacity: 0, y: 15 });

      /* Footer entrance timeline */
      const ftl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          once: true,
        },
      });

      ftl.to(logoNameRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" })
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 0.15)
        .to(navCol1Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 0.2)
        .to(navCol2Ref.current, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 0.3)
        .to(socialsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.35)
        .to(copyLeftRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 0.5)
        .to(copyRightRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }, 0.55);

      }); // fontReady.then
      return () => {
        cancelled = true;
        splits.forEach((s) => s && s.revert());
      };
    },
    { scope: sectionRef }
  );

  return (
    <footer ref={sectionRef} className="footer-section relative w-full overflow-hidden md:-mt-[12rem] lg:-mt-[20rem] xl:-mt-[25rem] 2xl:-mt-[30rem] 3xl:-mt-[37.5rem] 4xl:-mt-[50rem] 5xl:-mt-[75rem]" style={{ aspectRatio: "1440 / 1484" }}>
      <style>{`@media(max-width:639px){.footer-section{aspect-ratio:unset!important;min-height:100vh}}@media(min-width:768px) and (max-width:1023px){.clock-face-lg{width:3.5rem!important;height:3.5rem!important}}@media(min-width:1024px){.clock-face-lg{width:clamp(4.5rem,2.5rem+3.9vw,16rem)!important;height:clamp(4.5rem,2.5rem+3.9vw,16rem)!important}}`}</style>
      <GlobalTexture />

      {/* ─── Background image ─── */}
      <div className="absolute inset-0">
        {/* Mobile BG */}
        <img
          src="/images/footer-mobile.png"
          alt=""
          className="absolute -right-[18%] top-0 h-auto w-[55%] object-contain object-top-right md:hidden"
          style={{ mixBlendMode: "lighten" }}
          draggable={false}
        />
        {/* Desktop BG */}
        <img
          src={FooterBG}
          alt=""
          className="w-full h-full object-cover hidden md:block"
          style={{ mixBlendMode: "lighten" }}
          draggable={false}
        />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 mx-auto flex h-full flex-col w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem]">

        {/* ═══ CTA AREA ═══ */}
        <div className="flex flex-1 flex-col items-start sm:items-center pt-40 max-mob:pt-28 pb-12 max-mob:pb-8 text-left sm:text-center px-6 max-mob:px-4 sm:px-0 sm:pt-36 sm:pb-12 md:pt-56 md:pb-4 lg:pt-85 lg:pb-6 xl:pt-106 xl:pb-8 2xl:pt-128 2xl:pb-10 3xl:pt-160 3xl:pb-12 4xl:pt-212 4xl:pb-16 5xl:pt-320 5xl:pb-24">
          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-bricolage text-left sm:text-center text-3xl max-mob:text-2xl max-mob:leading-[1.08] max-mob:max-w-44 font-normal leading-[1.05] tracking-tight text-white max-w-[14rem] sm:max-w-none sm:text-4xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-[7rem] 5xl:text-[10.5rem]"
          >
            Engineering<br />predictable growth<br />starts here
          </h2>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="mt-2 max-w-[14rem] max-mob:text-xs max-mob:max-w-48 sm:max-w-[34rem] md:max-w-[22rem] lg:max-w-[27rem] xl:max-w-[34rem] 2xl:max-w-[40rem] 3xl:max-w-[50rem] 4xl:max-w-[66rem] 5xl:max-w-[100rem] font-host text-sm font-thin leading-tight text-white/70 text-left sm:text-center sm:text-base md:text-sm lg:text-sm xl:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl sm:mt-2 4xl:mt-4 5xl:mt-6"
            style={{ opacity: 0 }}
          >
            If you're ready to move beyond guesswork and scale through structured
            distribution systems, let's build your next growth engine.
          </p>

          {/* CTA Button — corner brackets + scramble, no bevel */}
          <div
            ref={btnRef}
            className="relative mt-5 inline-block cursor-pointer md:mt-6 4xl:mt-10 5xl:mt-14"
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
            style={{ opacity: 0 }}
          >
            {/* Corner brackets — positioned via top/left/right/bottom, animated via transform only */}
            <span ref={tlRef} className="pointer-events-none absolute md:w-1.5 md:h-1.5 lg:w-[0.4rem] lg:h-[0.4rem] xl:w-[0.45rem] xl:h-[0.45rem] 2xl:w-2 2xl:h-2 4xl:w-2.5 4xl:h-2.5 5xl:w-3 5xl:h-3" style={{ top: CORNER_DEFAULT, left: CORNER_DEFAULT, borderTop: "1.7px solid #FF6F21", borderLeft: "1.7px solid #FF6F21" }} />
            <span ref={trRef} className="pointer-events-none absolute md:w-1.5 md:h-1.5 lg:w-[0.4rem] lg:h-[0.4rem] xl:w-[0.45rem] xl:h-[0.45rem] 2xl:w-2 2xl:h-2 4xl:w-2.5 4xl:h-2.5 5xl:w-3 5xl:h-3" style={{ top: CORNER_DEFAULT, right: CORNER_DEFAULT, borderTop: "1.7px solid #FF6F21", borderRight: "1.7px solid #FF6F21" }} />
            <span ref={blRef} className="pointer-events-none absolute md:w-1.5 md:h-1.5 lg:w-[0.4rem] lg:h-[0.4rem] xl:w-[0.45rem] xl:h-[0.45rem] 2xl:w-2 2xl:h-2 4xl:w-2.5 4xl:h-2.5 5xl:w-3 5xl:h-3" style={{ bottom: CORNER_DEFAULT, left: CORNER_DEFAULT, borderBottom: "1.7px solid #FF6F21", borderLeft: "1.7px solid #FF6F21" }} />
            <span ref={brRef} className="pointer-events-none absolute md:w-1.5 md:h-1.5 lg:w-[0.4rem] lg:h-[0.4rem] xl:w-[0.45rem] xl:h-[0.45rem] 2xl:w-2 2xl:h-2 4xl:w-2.5 4xl:h-2.5 5xl:w-3 5xl:h-3" style={{ bottom: CORNER_DEFAULT, right: CORNER_DEFAULT, borderBottom: "1.7px solid #FF6F21", borderRight: "1.7px solid #FF6F21" }} />

            {/* Thin white border box */}
            <div className="flex items-center border border-white/30 px-8 max-mob:px-6 py-2 max-mob:py-3 md:px-3 md:py-1.5 lg:px-3 lg:py-2 xl:px-5 xl:py-2 2xl:px-6 2xl:py-2.5 3xl:px-8 3xl:py-3 4xl:px-12 4xl:py-4 5xl:px-16 5xl:py-5">
              <span
                ref={btnTextRef}
                className="font-host text-sm sm:text-md md:text-xs lg:text-xs xl:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl 5xl:text-2xl font-thin tracking-wider text-white"
              >
                {originalText}
              </span>
              <ArrowIcon />
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM SECTION — 2-col grid on mobile, normal flow on sm+ ═══ */}
        <div className="mt-auto grid grid-cols-[1fr_auto] sm:block items-start gap-x-6 max-mob:gap-x-4 px-4 max-mob:px-3 sm:px-0">

          {/* Right column on mobile: clocks stacked vertically */}
          <div
            className="relative max-md:order-2 md:absolute w-full flex md:justify-center md:bottom-44 lg:bottom-50 xl:bottom-56 2xl:bottom-64 3xl:bottom-80 4xl:bottom-112 5xl:bottom-160"
          >
            <div ref={clocksRowRef}
            className="order-2 max-sm:order-2 sm:order-none flex flex-col items-center gap-6 max-mob:gap-4 py-4 max-mob:pt-8 max-mob:scale-90 max-mob:origin-top sm:grid sm:grid-cols-2 sm:justify-items-center sm:gap-6 sm:pb-10 md:w-max md:flex md:flex-row md:justify-center md:gap-4 md:pb-0 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-14 4xl:gap-20 5xl:gap-28"
            style={{ opacity: 0 }} >
            {CLOCKS.map((clock) => (
              <AnalogClock key={clock.tz} {...clock} />
            ))}
            </div>
          </div>

          {/* Left column on mobile: logo + nav */}
          <div className="order-1 max-sm:order-1 sm:order-none">
            <div ref={footerBarRef} className="py-8 max-mob:pt-10 max-mob:pb-5 sm:py-8 md:py-3 lg:py-4 xl:py-5 2xl:py-6 3xl:py-8 4xl:py-12 5xl:py-16">
              <div className="flex flex-col items-start sm:flex-row sm:items-start sm:justify-center gap-8 max-mob:gap-5 sm:gap-12 md:gap-8 md:mx-auto md:max-w-md lg:gap-10 lg:max-w-xl xl:max-w-2xl xl:gap-14 2xl:max-w-3xl 2xl:gap-18 3xl:max-w-4xl 3xl:gap-24 4xl:max-w-6xl 4xl:gap-36 5xl:max-w-[80rem] 5xl:gap-52">
                {/* Logo + tagline */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-0.5">
                    <img src="/svgs/Viral-Labs-logo.svg" alt="Viral Labs" className="h-5 w-5 2xl:h-6 2xl:w-6 4xl:h-9 4xl:w-9 5xl:h-12 5xl:w-12" draggable={false} />
                    <span ref={logoNameRef} className="font-bricolage text-3xl max-mob:text-2xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-4xl 4xl:text-6xl 5xl:text-7xl font-semibold tracking-tight text-white">
                      Viral Labs
                    </span>
                  </div>
                  <span ref={taglineRef} className="font-host text-xs md:text-[0.6rem] md:text-center lg:text-[0.65rem] xl:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl font-thin text-white/50 lg:text-center">
                    Engineering Distribution
                  </span>
                </div>

                {/* Nav links + Social icons grouped closer */}
                <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-16 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-16 3xl:gap-20 4xl:gap-28 5xl:gap-36">
                  {/* Nav columns */}
                  <div ref={navCol1Ref} className="flex flex-col gap-1">
                    {NAV_COL_1.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className={`font-host text-xl max-mob:text-base sm:text-sm md:text-xs xl:text-sm 2xl:text-base 3xl:text-base 4xl:text-xl 5xl:text-2xl font-thin transition-colors duration-200 hover:text-[#FF6F21] ${link === "Home" ? "text-[#FF6F21]" : "text-white"}`}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                  <div ref={navCol2Ref} className="flex flex-col gap-0.5">
                    {NAV_COL_2.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="font-host text-xl max-mob:text-base sm:text-sm md:text-xs xl:text-sm 2xl:text-base 3xl:text-base 4xl:text-xl 5xl:text-2xl font-thin text-white transition-colors duration-200 hover:text-[#FF6F21]"
                      >
                        {link}
                      </a>
                    ))}
                  </div>

                  {/* Social icons — hidden on mobile */}
                  <div ref={socialsRef} className="hidden sm:flex items-center gap-8 4xl:gap-14 5xl:gap-18" style={{ opacity: 0 }}>
                    {[
                      { key: "x", href: "https://x.com/EashanShetty", content: <span className="font-host text-xs 4xl:text-base 5xl:text-lg font-thin text-white transition-colors duration-200">X</span> },
                      { key: "in", href: "https://www.linkedin.com/company/virallabs/", content: <span className="font-host text-xs 4xl:text-base 5xl:text-lg font-thin text-white transition-colors duration-200">In</span> },
                    ].map(({ key, href, content }) => (
                      <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex h-4 w-8 4xl:h-6 4xl:w-12 5xl:h-8 5xl:w-16 items-center justify-center"
                      >
                        <span className="pointer-events-none absolute -left-1.5 -top-1.5 h-[8px] w-[8px] border-l border-t border-[#FF6F21]/60 transition-all duration-200 group-hover:-left-2.5 group-hover:-top-2.5 group-hover:border-[#FF6F21]" />
                        <span className="pointer-events-none absolute -right-1.5 -top-1.5 h-[8px] w-[8px] border-r border-t border-[#FF6F21]/60 transition-all duration-200 group-hover:-right-2.5 group-hover:-top-2.5 group-hover:border-[#FF6F21]" />
                        <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-[8px] w-[8px] border-b border-l border-[#FF6F21]/60 transition-all duration-200 group-hover:-bottom-2.5 group-hover:-left-2.5 group-hover:border-[#FF6F21]" />
                        <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-[8px] w-[8px] border-b border-r border-[#FF6F21]/60 transition-all duration-200 group-hover:-bottom-2.5 group-hover:-right-2.5 group-hover:border-[#FF6F21]" />

                        {content}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ MOBILE SOCIALS — visible only below sm ═══ */}
          <div className="order-3 sm:hidden col-span-2 flex items-center gap-8 max-mob:gap-6 pt-4 max-mob:pt-3">
            {[
              { key: "x", href: "https://x.com/EashanShetty", content: <span className="font-host text-xs font-thin text-white">X</span> },
              { key: "in", href: "https://www.linkedin.com/company/virallabs/", content: <span className="font-host text-xs font-thin text-white">In</span> },
            ].map(({ key, href, content }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-4 w-8 items-center justify-center"
              >
                <span className="pointer-events-none absolute -left-1.5 -top-1.5 h-[8px] w-[8px] border-l border-t border-[#FF6F21]/60" />
                <span className="pointer-events-none absolute -right-1.5 -top-1.5 h-[8px] w-[8px] border-r border-t border-[#FF6F21]/60" />
                <span className="pointer-events-none absolute -bottom-1.5 -left-1.5 h-[8px] w-[8px] border-b border-l border-[#FF6F21]/60" />
                <span className="pointer-events-none absolute -bottom-1.5 -right-1.5 h-[8px] w-[8px] border-b border-r border-[#FF6F21]/60" />
                {content}
              </a>
            ))}
          </div>

          {/* ═══ COPYRIGHT ═══ */}
          <div className="order-4 sm:order-none col-span-2 sm:col-span-1 mx-auto flex flex-col sm:flex-row w-full max-w-4xl md:max-w-md lg:max-w-2xl xl:max-w-2xl 2xl:max-w-3xl 3xl:max-w-[80rem] 4xl:max-w-[100rem] 5xl:max-w-[120rem] items-start sm:items-center sm:justify-between gap-1 sm:gap-0 py-6 max-mob:py-4 md:py-2 lg:py-3 xl:py-4 2xl:py-5 3xl:py-6 4xl:py-8 5xl:py-12">
            <span ref={copyLeftRef} className="font-host text-xs 2xl:text-sm 3xl:text-sm 4xl:text-lg 5xl:text-xl font-thin text-white/40">
              © Copyright 2026 Viral Labs
            </span>
            <a ref={copyRightRef} href="#" className="font-host text-xs 2xl:text-sm 3xl:text-sm 4xl:text-lg 5xl:text-xl font-thin text-white/40 transition-colors duration-200 hover:text-white/70">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

/* ════════════════════════════════════════════════════════════════════
   ANALOG CLOCK SUB-COMPONENT
   ════════════════════════════════════════════════════════════════════ */

const AnalogClock = ({ city, tz, label }) => {
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const digitalRef = useRef(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    const fmt12 = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const update = () => {
      const now = new Date();
      const parts = fmt.formatToParts(now);

      const h = parseInt(parts.find((p) => p.type === "hour").value, 10) % 12;
      const m = parseInt(parts.find((p) => p.type === "minute").value, 10);
      const s = parseInt(parts.find((p) => p.type === "second").value, 10);

      const hourDeg = h * 30 + m * 0.5;
      const minDeg = m * 6 + s * 0.1;
      const secDeg = s * 6;

      if (hourRef.current) hourRef.current.style.transform = `rotate(${hourDeg}deg)`;
      if (minuteRef.current) minuteRef.current.style.transform = `rotate(${minDeg}deg)`;
      if (secondRef.current) secondRef.current.style.transform = `rotate(${secDeg}deg)`;

      if (digitalRef.current) {
        digitalRef.current.textContent = `${fmt12.format(now)} ${label}`;
      }
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [tz, label]);

  const clockSize = 'clamp(6.25rem, 3.75rem + 5.2vw, 16.25rem)';
// clamp(6.25rem, 2.75rem + 5.2vw, 16.25rem)
  return (
    <div className="flex flex-col items-center gap-4 md:gap-0.5 lg:gap-1 xl:gap-2 2xl:gap-2.5 3xl:gap-3 4xl:gap-5 5xl:gap-7">
      {/* Clock face — fluid size via clamp (100px → 260px) */}
      <div
        className="clock-face-lg relative flex items-center justify-center rounded-full border border-white/15"
        style={{ width: clockSize, height: clockSize }}
      >
        {/* Minimal tick marks — only 12, 3, 6, 9 */}
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute bottom-1/2 inset-x-0 mx-auto origin-bottom"
            style={{
              width: 'clamp(0.0625rem, 0.04rem + 0.05vw, 0.2rem)',
              height: '48%',
              transform: `rotate(${deg}deg)`,
            }}
          >
            <div className="w-full bg-white/25" style={{ height: '14%' }} />
          </div>
        ))}

        {/* Center dot */}
        <span
          className="absolute rounded-full bg-white/50"
          style={{
            width: 'clamp(0.1875rem, 0.1rem + 0.15vw, 0.5rem)',
            height: 'clamp(0.1875rem, 0.1rem + 0.15vw, 0.5rem)',
          }}
        />

        {/* Hour hand */}
        <div
          ref={hourRef}
          className="absolute bottom-1/2 inset-x-0 mx-auto origin-bottom"
          style={{ width: 'clamp(0.1rem, 0.04rem + 0.06vw, 0.25rem)', height: '31%' }}
        >
          <div className="h-full w-full rounded-full bg-white/60" />
        </div>

        {/* Minute hand */}
        <div
          ref={minuteRef}
          className="absolute bottom-1/2 inset-x-0 mx-auto origin-bottom"
          style={{ width: 'clamp(0.0625rem, 0.025rem + 0.04vw, 0.1875rem)', height: '42%' }}
        >
          <div className="h-full w-full rounded-full bg-white/40" />
        </div>

        {/* Second hand */}
        <div
          ref={secondRef}
          className="absolute bottom-1/2 inset-x-0 mx-auto origin-bottom"
          style={{ width: 'clamp(0.03rem, 0.015rem + 0.025vw, 0.1rem)', height: '47%' }}
        >
          <div className="h-full w-full bg-[#FF6F21]/60" />
        </div>
      </div>

      {/* Digital time */}
      <span ref={digitalRef} className="font-host text-xs md:text-[0.5rem] lg:text-[0.6rem] xl:text-[0.65rem] 2xl:text-xs 3xl:text-sm 4xl:text-base 5xl:text-lg font-thin uppercase tracking-widest text-white/50">
        --:-- --
      </span>

      {/* City name */}
      <span className="-mt-4 md:-mt-0.5 lg:-mt-0.5 xl:-mt-1 2xl:-mt-1.5 3xl:-mt-2 4xl:-mt-3 5xl:-mt-4 font-host text-xs md:text-[0.5rem] lg:text-[0.6rem] xl:text-[0.65rem] 2xl:text-xs 3xl:text-sm 4xl:text-base 5xl:text-lg font-thin text-white/35">
        {city}
      </span>
    </div>
  );
};