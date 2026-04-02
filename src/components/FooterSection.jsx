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
  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2">
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

      /* ── Footer bar SplitText reveals ── */
      const logoSplit = SplitText.create(logoNameRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      const taglineSplit = SplitText.create(taglineRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      const nav1Split = SplitText.create(navCol1Ref.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      const nav2Split = SplitText.create(navCol2Ref.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      const copyLSplit = SplitText.create(copyLeftRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      const copyRSplit = SplitText.create(copyRightRef.current, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });

      splits.push(logoSplit, taglineSplit, nav1Split, nav2Split, copyLSplit, copyRSplit);

      const footerLines = [
        ...logoSplit.lines,
        ...taglineSplit.lines,
        ...nav1Split.lines,
        ...nav2Split.lines,
        ...copyLSplit.lines,
        ...copyRSplit.lines,
      ];

      /* Set initial states — footer */
      gsap.set(footerLines, { y: "100%" });
      gsap.set(socialsRef.current, { opacity: 0, y: 15 });

      /* Footer entrance timeline */
      const ftl = gsap.timeline({
        scrollTrigger: {
          trigger: footerBarRef.current,
          start: "top 85%",
          once: true,
        },
      });

      ftl.to(logoSplit.lines, { y: "0%", duration: 0.9, stagger: 0.08, ease: "power4.out" })
        .to(taglineSplit.lines, { y: "0%", duration: 0.7, stagger: 0.06, ease: "power4.out" }, 0.15)
        .to(nav1Split.lines, { y: "0%", duration: 0.7, stagger: 0.06, ease: "power4.out" }, 0.2)
        .to(nav2Split.lines, { y: "0%", duration: 0.7, stagger: 0.06, ease: "power4.out" }, 0.3)
        .to(socialsRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.35)
        .to(copyLSplit.lines, { y: "0%", duration: 0.7, ease: "power4.out" }, 0.5)
        .to(copyRSplit.lines, { y: "0%", duration: 0.7, ease: "power4.out" }, 0.55);

      }); // fontReady.then
      return () => {
        cancelled = true;
        splits.forEach((s) => s && s.revert());
      };
    },
    { scope: sectionRef }
  );

  return (
    <footer ref={sectionRef} className="footer-section relative w-full overflow-hidden" style={{ minHeight: "calc(100vw * 1484 / 1440)" }}>
      <style>{`@media(max-width:639px){.footer-section{min-height:100svh!important}}`}</style>
      <GlobalTexture />

      {/* ─── Background image ─── */}
      <div className="absolute inset-0">
        {/* Mobile BG — right-aligned, ~55% width so left side stays dark */}
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
          className="h-full w-full object-cover hidden md:block"
          style={{ mixBlendMode: "lighten" }}
          draggable={false}
        />
        <div className="absolute inset-0" />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] flex-col w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem]">

        {/* ═══ CTA AREA ═══ */}
        <div className="flex flex-1 flex-col items-start sm:items-center pt-40 pb-12 text-left sm:text-center px-6 sm:px-0 sm:pt-36 sm:pb-12 md:pt-48 md:pb-12 lg:pt-104 lg:pb-40 xl:pt-112 xl:pb-44 2xl:pt-120 2xl:pb-48 3xl:pt-128 3xl:pb-52 4xl:pt-172 4xl:pb-64 5xl:pt-220 5xl:pb-80">
          {/* Heading */}
          <h2
            ref={headingRef}
            className="font-bricolage text-left sm:text-center text-3xl font-normal leading-[1.05] tracking-tight text-white max-w-[14rem] sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] 2xl:text-[4.5rem] 3xl:text-[4.75rem] 4xl:text-[6.5rem] 5xl:text-[8.5rem]"
          >
            Engineering<br />predictable growth<br />starts here
          </h2>

          {/* Subtext */}
          <p
            ref={subtextRef}
            className="mt-2 max-w-[14rem] sm:max-w-[34rem] lg:max-w-[36rem] 2xl:max-w-[38rem] 3xl:max-w-[40rem] 4xl:max-w-[52rem] 5xl:max-w-[64rem] font-host text-sm font-thin leading-tight text-white/70 text-left sm:text-center sm:text-base lg:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl sm:mt-2 4xl:mt-4 5xl:mt-6"
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
            <span ref={tlRef} className="pointer-events-none absolute" style={{ top: CORNER_DEFAULT, left: CORNER_DEFAULT, width: 8, height: 8, borderTop: "1.7px solid #FF6F21", borderLeft: "1.7px solid #FF6F21" }} />
            <span ref={trRef} className="pointer-events-none absolute" style={{ top: CORNER_DEFAULT, right: CORNER_DEFAULT, width: 8, height: 8, borderTop: "1.7px solid #FF6F21", borderRight: "1.7px solid #FF6F21" }} />
            <span ref={blRef} className="pointer-events-none absolute" style={{ bottom: CORNER_DEFAULT, left: CORNER_DEFAULT, width: 8, height: 8, borderBottom: "1.7px solid #FF6F21", borderLeft: "1.7px solid #FF6F21" }} />
            <span ref={brRef} className="pointer-events-none absolute" style={{ bottom: CORNER_DEFAULT, right: CORNER_DEFAULT, width: 8, height: 8, borderBottom: "1.7px solid #FF6F21", borderRight: "1.7px solid #FF6F21" }} />

            {/* Thin white border box */}
            <div className="flex items-center border border-white/30 px-8 py-2 lg:px-10 lg:py-2.5 4xl:px-16 4xl:py-4 5xl:px-20 5xl:py-5">
              <span
                ref={btnTextRef}
                className="font-host text-sm sm:text-md lg:text-base 3xl:text-lg 4xl:text-xl 5xl:text-2xl font-thin tracking-wider text-white"
              >
                {originalText}
              </span>
              <ArrowIcon />
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM SECTION — 2-col grid on mobile, normal flow on sm+ ═══ */}
        <div className="mt-auto grid grid-cols-[1fr_auto] sm:block items-start gap-x-6 px-4 sm:px-0">

          {/* Right column on mobile: clocks stacked vertically */}
          <div
            ref={clocksRowRef}
            className="order-2 max-sm:order-2 sm:order-none flex flex-col items-center gap-6 py-4 sm:grid sm:grid-cols-2 sm:justify-items-center sm:gap-6 sm:pb-10 md:pb-40 lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10 xl:gap-12 2xl:gap-14 3xl:gap-16 4xl:gap-28 5xl:gap-36 lg:pb-60 xl:pb-68 2xl:pb-72 3xl:pb-80 4xl:pb-104 5xl:pb-128"
            style={{ opacity: 0 }}
          >
            {CLOCKS.map((clock) => (
              <AnalogClock key={clock.tz} {...clock} />
            ))}
          </div>

          {/* Left column on mobile: logo + nav */}
          <div className="order-1 max-sm:order-1 sm:order-none">
            <div ref={footerBarRef} className="py-8 sm:py-8 md:py-12 lg:py-22 xl:py-24 2xl:py-26 3xl:py-28 4xl:py-40 5xl:py-52">
              <div className="flex flex-col items-start sm:flex-row sm:items-start sm:justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-38 xl:gap-40 2xl:gap-42 3xl:gap-44 4xl:gap-64 5xl:gap-80">
                {/* Logo + tagline */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-0.5">
                    <img src="/svgs/Viral-Labs-logo.svg" alt="Viral Labs" className="h-5 w-5 2xl:h-6 2xl:w-6 4xl:h-9 4xl:w-9 5xl:h-12 5xl:w-12" draggable={false} />
                    <span ref={logoNameRef} className="font-bricolage text-3xl 2xl:text-4xl 3xl:text-4xl 4xl:text-6xl 5xl:text-7xl font-semibold tracking-tight text-white">
                      Viral Labs
                    </span>
                  </div>
                  <span ref={taglineRef} className="font-host text-xs xl:text-sm 3xl:text-sm 4xl:text-lg 5xl:text-xl font-thin text-white/50">
                    Engineering Distribution
                  </span>
                </div>

                {/* Nav links + Social icons grouped closer */}
                <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-16 xl:gap-20 4xl:gap-28 5xl:gap-36">
                  {/* Nav columns */}
                  <div ref={navCol1Ref} className="flex flex-col gap-1">
                    {NAV_COL_1.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className={`font-host text-xl sm:text-sm 2xl:text-base 3xl:text-base 4xl:text-xl 5xl:text-2xl font-thin transition-colors duration-200 hover:text-[#FF6F21] ${link === "Home" ? "text-[#FF6F21]" : "text-white"}`}
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
                        className="font-host text-xl sm:text-sm 2xl:text-base 3xl:text-base 4xl:text-xl 5xl:text-2xl font-thin text-white transition-colors duration-200 hover:text-[#FF6F21]"
                      >
                        {link}
                      </a>
                    ))}
                  </div>

                  {/* Social icons — hidden on mobile */}
                  <div ref={socialsRef} className="hidden sm:flex items-center gap-8 4xl:gap-14 5xl:gap-18" style={{ opacity: 0 }}>
                    {[
                      { key: "ig", href: "https://www.instagram.com", content: <img src="/svgs/insta.svg" alt="Instagram" className="h-3 w-3 4xl:h-5 4xl:w-5 5xl:h-7 5xl:w-7" draggable={false} /> },
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
          <div className="order-3 sm:hidden col-span-2 flex items-center gap-8 pt-4">
            {[
              { key: "ig", href: "https://www.instagram.com", content: <img src="/svgs/insta.svg" alt="Instagram" className="h-3 w-3" draggable={false} /> },
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
          <div className="order-4 sm:order-none col-span-2 sm:col-span-1 mx-auto flex flex-col sm:flex-row w-full max-w-4xl 2xl:max-w-5xl 3xl:max-w-5xl 4xl:max-w-7xl 5xl:max-w-[96rem] items-start sm:items-center sm:justify-between gap-1 sm:gap-0 py-6 4xl:py-10 5xl:py-14">
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

  return (
    <div className="flex flex-col items-center gap-4 4xl:gap-6 5xl:gap-8">
      {/* Clock face — fluid size via clamp (100px → 260px) */}
      <div
        className="relative flex items-center justify-center rounded-full border border-white/15"
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
      <span ref={digitalRef} className="font-host text-xs 3xl:text-sm 4xl:text-base 5xl:text-lg font-thin uppercase tracking-widest text-white/50">
        --:-- --
      </span>

      {/* City name */}
      <span className="-mt-4 font-host text-xs 3xl:text-sm 4xl:text-base 5xl:text-lg font-thin text-white/35">
        {city}
      </span>
    </div>
  );
};