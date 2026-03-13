/**
 * HeroSection — One pinned timeline with two acts + entrance animation.
 *
 * ENTRANCE — on page load:
 *   PHASE 0 — BG PLANE NOISE DISSOLVE (0.0s → 2.8s)
 *   PHASE 1 — GRID + OVERLAY REVEAL (2.2s → 3.2s)
 *
 *   PHASE 2 — ★ BIG TEXT + HEADING (3.0s → ~7.0s)
 *     The ACTUAL .hw-eng and .hw-vir spans from the h1 ARE the middle row.
 *     Scaled up + translated to match big text row 2 position.
 *     All ancestors have overflow:visible during this phase (dynamically found).
 *     heroContent z-index raised above bigTextWrap so heading spans render on top.
 *
 *     Decorative rows 1 & 3 slide in and compress toward the middle.
 *     Rows 1 & 3 use clip-path (not backgrounds) for the masking effect —
 *     they get clipped from the edge that overlaps with row 2.
 *
 *     3.0–3.8s  : Rows slide in (R / L / R)
 *     3.9–4.3s  : Compression + clip-path masking (rows 1&3 slide behind row 2)
 *     4.3s      : Decorative rows hidden
 *     4.3–4.7s  : SCALE TOGETHER from pair center
 *     4.7–5.2s  : SPLIT + FLY to scale:1, x:0, y:0 (natural heading position)
 *     5.25s     : Overflow restored, gradient applied, cleanup
 *     5.3–6.1s  : Remaining heading chars mask reveal
 *     6.1–6.9s  : Subheading, CTA, CTA subtitle
 *     7.0s      : Navbar (via entranceDelay prop)
 *
 *   SCROLL — unchanged (+=400%, pinned, scrub)
 *   ACT 1 — ZOOM TRANSITION (0.00 → 0.40)
 *   ACT 2 — MISSION STATS (0.55 → 0.95)
 *   HOLD (0.95 → 1.00)
 */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import GridOverlay from "./GridOverlay";
import Navbar from "./Navbar";
import { CtaGlowLine } from "./SvgAssets";
import { transitionState } from "./transitionState";
import { entranceState } from "./entranceState";
import MissionStats from "./Missionstats";
import { loadingState } from "./loadingState";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

export default function HeroSection() {
  const sectionRef = useRef();
  const heroContentRef = useRef();
  const missionRef = useRef();
  const headingRef = useRef();
  const missionTextRef = useRef();
  const subheadingRef = useRef();
  const ctaRef = useRef();

  // Decorative big text
  const bigTextWrapRef = useRef();
  const bigRow1Ref = useRef();
  const bigRow2SpacerRef = useRef();
  const bigRow3Ref = useRef();

  // Store CTA scramble data for hover interaction
  const ctaScrambleRef = useRef(null);

  useGSAP(
    () => {
      // ═══════════════════════════════════════
      // STEP 0 — SPLITTEXT FIRST, THEN MEASURE
      // ═══════════════════════════════════════

      const engSpan = headingRef.current.querySelector(".hw-eng");
      const virSpan = headingRef.current.querySelector(".hw-vir");
      gsap.set([engSpan, virSpan], { display: "inline-block" });

      // Run SplitText so DOM structure is final before measuring
      const heroHeadingSplit = SplitText.create(".hero-heading", {
        type: "chars, lines",
        mask: "lines",
        linesClass: "hero-line",
        charsClass: "hero-char",
      });

      // ── Measure heading span natural positions ──
      const engNatRect = engSpan.getBoundingClientRect();
      const virNatRect = virSpan.getBoundingClientRect();
      const engNatCX = engNatRect.left + engNatRect.width / 2;
      const engNatCY = engNatRect.top + engNatRect.height / 2;
      const virNatCX = virNatRect.left + virNatRect.width / 2;
      const virNatCY = virNatRect.top + virNatRect.height / 2;

      // ── Measure row layout ──
      const row1Rect = bigRow1Ref.current.getBoundingClientRect();
      const spacerRect = bigRow2SpacerRef.current.getBoundingClientRect();
      const rowHeight = row1Rect.height;

      // Scale: decorative row font-size / heading font-size
      // (using font-size not element height, so lineHeight doesn't affect it)
      const row1FontSize = parseFloat(window.getComputedStyle(bigRow1Ref.current.querySelector("p")).fontSize);
      const headingFontSize = parseFloat(window.getComputedStyle(headingRef.current).fontSize);
      const bigScale = row1FontSize / headingFontSize;

      // ── Calculate big text positions MATHEMATICALLY ──
      // Scaled widths of each heading span when at bigScale
      const engScaledW = engNatRect.width * bigScale;
      const virScaledW = virNatRect.width * bigScale;

      // Gap between the two words (proportional to row height)
      const wordGap = rowHeight * 0.3;

      // Total width of both words + gap
      const totalW = engScaledW + wordGap + virScaledW;

      // Center the pair horizontally on screen
      const screenCX = window.innerWidth / 2;
      // Vertical center = middle of the spacer row
      const bigCY = spacerRect.top + spacerRect.height / 2;

      // Absolute center positions for each word at big size
      const engBigAbsCX = screenCX - totalW / 2 + engScaledW / 2;
      const virBigAbsCX = screenCX + totalW / 2 - virScaledW / 2;

      // GSAP offsets from natural heading position → big position
      const engBigX = engBigAbsCX - engNatCX;
      const engBigY = bigCY - engNatCY;
      const virBigX = virBigAbsCX - virNatCX;
      const virBigY = bigCY - virNatCY;

      // Offscreen shift (slide from left)
      const offscreenX = -(window.innerWidth + 500);

      // ═══════════════════════════════════════
      // STEP 1 — FIND ALL CLIPPING ANCESTORS
      // ═══════════════════════════════════════
      // Walk from each heading span up to sectionRef, collect every
      // ancestor with non-visible overflow. This catches .hero-line
      // masks, GridOverlay, heroContent, flex wrappers, etc.
      const clippingAncestors = [];
      const collectClippers = (startEl) => {
        let node = startEl.parentElement;
        while (node && node !== sectionRef.current) {
          const cs = window.getComputedStyle(node);
          if (
            (cs.overflow !== "visible" ||
              cs.overflowX !== "visible" ||
              cs.overflowY !== "visible") &&
            !clippingAncestors.includes(node)
          ) {
            clippingAncestors.push(node);
          }
          node = node.parentElement;
        }
      };
      collectClippers(engSpan);
      collectClippers(virSpan);

      // ═══════════════════════════════════════
      // STEP 2 — INITIAL STATES
      // ═══════════════════════════════════════

      // Open all overflow during big text phase
      gsap.set(clippingAncestors, { overflow: "visible" });

      // Raise heroContent above bigTextWrap so heading spans render on top
      gsap.set(heroContentRef.current, { opacity: 0, zIndex: 25 });

      // Gradient on ALL chars (including keyword chars)
      heroHeadingSplit.lines.forEach((line) => {
        const lineWidth = line.offsetWidth;
        line.querySelectorAll(".hero-char").forEach((char) => {
          const charLeft = char.offsetLeft;
          Object.assign(char.style, {
            backgroundImage:
              "linear-gradient(92.7deg, rgb(255,255,255) 21.4%, rgb(151,151,151) 49.6%, rgb(255,255,255) 79.1%)",
            backgroundSize: `${lineWidth}px 100%`,
            backgroundPosition: `-${charLeft}px 0`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          });
        });
      });

      // Char groups
      const engChars = [...headingRef.current.querySelectorAll(".hw-eng .hero-char")];
      const virChars = [...headingRef.current.querySelectorAll(".hw-vir .hero-char")];
      const keywordChars = [...engChars, ...virChars];
      const allChars = heroHeadingSplit.chars;
      const otherChars = allChars.filter((c) => !keywordChars.includes(c));

      // Keyword chars: visible (inside scaled-up span = the big text)
      gsap.set(keywordChars, { yPercent: 0, opacity: 1, filter: "blur(0px)" });
      // Other chars: hidden below mask
      gsap.set(otherChars, { yPercent: 110, opacity: 0, filter: "blur(14px)" });

      // Position heading spans at big size, offscreen left
      gsap.set(engSpan, {
        scale: bigScale,
        x: engBigX + offscreenX,
        y: engBigY,
        transformOrigin: "center center",
      });
      gsap.set(virSpan, {
        scale: bigScale,
        x: virBigX + offscreenX,
        y: virBigY,
        transformOrigin: "center center",
      });

      // Decorative rows
      gsap.set(bigTextWrapRef.current, { opacity: 1 });
      gsap.set(bigRow1Ref.current, {
        xPercent: 100, y: 0, opacity: 1, clipPath: "inset(0 0 0 0)",
      });
      gsap.set(bigRow2SpacerRef.current, { visibility: "hidden" });
      gsap.set(bigRow3Ref.current, {
        xPercent: 100, y: 0, opacity: 1, clipPath: "inset(0 0 0 0)",
      });

      // Subheading — ASCII scramble effect
      // Split into chars so we can scramble each one individually
      const heroSubSplit = SplitText.create(".hero-subheading", {
        type: "chars, words, lines",
        mask: "lines",
        linesClass: "hero-line",
        charsClass: "sub-char",
      });

      const asciiChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";
      const subChars = heroSubSplit.chars;

      // Store original text for each char
      const originalTexts = subChars.map((c) => c.textContent);

      // Lock each char's natural width BEFORE scrambling
      // This prevents layout shifts when chars change
      subChars.forEach((char) => {
        const w = char.offsetWidth;
        char.style.display = "inline-block";
        char.style.width = `${w}px`;
        char.style.textAlign = "center";
      });

      // Set initial state: lines visible (no mask slide), chars show random ASCII
      gsap.set(heroSubSplit.lines, { yPercent: 0 });
      gsap.set(subheadingRef.current, { opacity: 0 });
      subChars.forEach((char) => {
        char.textContent = asciiChars[Math.floor(Math.random() * asciiChars.length)];
      });

      // CTA — multi-step animation setup
      // Hide the entire CTA wrapper initially
      gsap.set(ctaRef.current, { opacity: 0 });

      // 1. Border: SVG stroke draws in
      const ctaBorderRect = document.querySelector(".cta-border rect");
      // Measure actual perimeter from the rendered rect
      const ctaBorderPath = document.querySelector(".cta-border-path");
gsap.set(ctaBorderPath, { drawSVG: "0%" });

      // 2. Text: ASCII scramble (like subheading)
      const ctaTextSplit = SplitText.create(".cta-text", {
        type: "chars",
        charsClass: "cta-char",
      });
      const ctaChars = ctaTextSplit.chars;
      const ctaOriginals = ctaChars.map((c) => c.textContent);
      // Lock widths to prevent layout shift during scramble
      ctaChars.forEach((char) => {
        const w = char.offsetWidth;
        char.style.display = "inline-block";
        char.style.width = `${w}px`;
        char.style.textAlign = "center";
      });
      // Scramble initial text + hide
      ctaChars.forEach((char) => {
        char.textContent = asciiChars[Math.floor(Math.random() * asciiChars.length)];
      });
      gsap.set(".cta-text", { opacity: 0 });

      // Store scramble data for hover interaction
      ctaScrambleRef.current = { chars: ctaChars, originals: ctaOriginals, asciiChars };

      // 3. Arrow: stroke-draw setup
      const arrowPath = document.querySelector(".arrow-path");
      const arrowLen = arrowPath.getTotalLength();
      gsap.set(arrowPath, {
        strokeDasharray: arrowLen,
        strokeDashoffset: arrowLen,
      });

      // 4. CTA subtitle: still uses mask slide
      gsap.set(".cta-sub", { yPercent: 110 });

      // 5. CTA glow line: draw from center
      const ctaGlowLines = document.querySelectorAll(".cta-glow-svg line");
      gsap.set(ctaGlowLines, { drawSVG: "50% 50%" });

      // Scroll elements — headingRef transform set AFTER entrance (step F)
      gsap.set(missionTextRef.current, { opacity: 0, scale: 0.8, filter: "blur(0px)" });

      // ═══════════════════════════════════════
      // ENTRANCE TIMELINE
      // ═══════════════════════════════════════
      const entrance = gsap.timeline({ paused: true, });

      // Phase 0: BG Plane dissolve
      entrance.to(entranceState, {
        warpProgress: 1, duration: 2.8, ease: "power2.inOut",
      }, 0);
      entrance.to(entranceState, {
        particleOpacity: 1, duration: 1.2, ease: "power2.out",
      }, 1.8);

      // Phase 1: Hero content fades in
      entrance.to(heroContentRef.current, {
        opacity: 1, duration: 1.0, ease: "power2.inOut",
      }, 2.2);

      // ═══════════════════════════════════════
      // ★ PHASE 2: BIG TEXT ANIMATION
      // ═══════════════════════════════════════

      // A: Slide in (3.0s → 4.0s) — longer duration, staggered, cinematic ease
      entrance.to(bigRow1Ref.current,
        { xPercent: 0, duration: 1.0, ease: "power4.out" }, 3.0);
      entrance.to(engSpan,
        { x: engBigX, duration: 1.0, ease: "power4.out" }, 3.15);
      entrance.to(virSpan,
        { x: virBigX, duration: 1.0, ease: "power4.out" }, 3.15);
      entrance.to(bigRow3Ref.current,
        { xPercent: 0, duration: 1.0, ease: "power4.out" }, 3.3);

      // B: Compression + clip-path masking (4.2s → 4.8s) — slower, more dramatic
      entrance.to(bigRow1Ref.current, {
        y: rowHeight,
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "power3.inOut",
      }, 4.2);
      entrance.to(bigRow3Ref.current, {
        y: -rowHeight,
        clipPath: "inset(100% 0 0 0)",
        duration: 0.6,
        ease: "power3.inOut",
      }, 4.2);

      // C: Hide decorative elements (at end of compression)
      entrance.set(bigTextWrapRef.current, { visibility: "hidden" }, 4.8);

      // D+E: SCALE DOWN + SPLIT + FLY as ONE continuous motion
      // Engineering starts first (moves UP to line 1) and is mostly
      // clear before Virality starts (moves to line 2).
      // 0.4s stagger gives Engineering time to move away.
      entrance.to(engSpan, {
        scale: 1, x: 0, y: 0,
        duration: 1.0, ease: "power2.inOut",
      }, 4.8);
      entrance.to(virSpan, {
        scale: 1, x: 0, y: 0,
        duration: 1.0, ease: "power2.inOut",
      }, 5.2);

      // F: Restore overflow + cleanup (6.25s)
      entrance.set(clippingAncestors, { overflow: "hidden" }, 6.25);
      entrance.set(heroContentRef.current, {
        overflow: "hidden", zIndex: 10,
      }, 6.25);
      entrance.set(headingRef.current, {
        scale: 1, filter: "blur(0px)",
      }, 6.25);

      // G: Remaining heading chars mask reveal (6.1s → 6.9s)
      entrance.to(otherChars, {
        yPercent: 0, filter: "blur(0px)", opacity: 1,
        stagger: 0.03, duration: 0.8, ease: "expo.out",
      }, 6.1);

      // H: Subheading — ASCII scramble decode (6.9s)
      // First fade in the element
      entrance.to(subheadingRef.current, {
        opacity: 1, duration: 0.3, ease: "power2.out",
      }, 6.9);

      // Then decode each character: cycles through random ASCII symbols
      // before settling on the real character, staggered left to right
      subChars.forEach((char, i) => {
        const original = originalTexts[i];
        // Skip spaces
        if (original.trim() === "") return;

        const delay = 6.9 + i * 0.025;
        const proxy = { progress: 0 };

        entrance.to(proxy, {
          progress: 1,
          duration: 0.4,
          ease: "none",
          onUpdate: () => {
            if (proxy.progress < 0.7) {
              // Cycling through random chars
              char.textContent =
                asciiChars[Math.floor(Math.random() * asciiChars.length)];
            } else {
              // Settled — show real character
              char.textContent = original;
            }
          },
        }, delay);
      });

      // I: CTA — Step 1: Show wrapper + border draws in (7.3s → 8.0s)
      entrance.set(ctaRef.current, { opacity: 1 }, 7.3);
      entrance.to(ctaBorderPath, {
        drawSVG: "100%",
        duration: 0.7,
        ease: "power2.inOut",
      }, 7.3);

      // I: CTA — Step 2: Text scramble decode (7.8s)
      // Fade text container in
      entrance.to(".cta-text", {
        opacity: 1, duration: 0.1, ease: "power1.out",
      }, 7.8);
      // Scramble each char
      ctaChars.forEach((char, i) => {
        const original = ctaOriginals[i];
        if (original.trim() === "") return;

        const delay = 7.8 + i * 0.025;
        const proxy = { progress: 0 };
        entrance.to(proxy, {
          progress: 1,
          duration: 0.35,
          ease: "none",
          onUpdate: () => {
            if (proxy.progress < 0.65) {
              char.textContent =
                asciiChars[Math.floor(Math.random() * asciiChars.length)];
            } else {
              char.textContent = original;
            }
          },
        }, delay);
      });

      // I: CTA — Step 3: Arrow draws in (8.2s)
      entrance.to(arrowPath, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: "power2.inOut",
      }, 8.2);

      // J: CTA subtitle (8.5s)
      entrance.to(".cta-sub",
        { yPercent: 0, duration: 0.7, ease: "expo.out" }, 8.5);

      // K: CTA glow line draws from center outward (8.7s)
      entrance.to(ctaGlowLines, {
        drawSVG: "0% 100%",
        duration: 0.6,
        ease: "power2.inOut",
      }, 8.7);

      // L: Navbar — via entranceDelay prop (7.0s)
      entrance.call(() => {
        if (entranceState.playNavbar) entranceState.playNavbar();
      }, null, 9.1);

      // ═══════════════════════════════════════
      // SCROLL TIMELINE
      // ═══════════════════════════════════════

      const headingSplit = SplitText.create(".impact-heading", {
        type: "lines", mask: "lines", linesClass: "line",
      });
      gsap.set(headingSplit.lines, { yPercent: 110 });

      const labelSplit = SplitText.create(".impact-label", {
        type: "lines", mask: "lines", linesClass: "line",
      });
      gsap.set(labelSplit.lines, { yPercent: 110 });

      const descSplit = SplitText.create(".impact-desc", {
        type: "lines", mask: "lines", linesClass: "line",
      });
      gsap.set(descSplit.lines, { yPercent: 110 });

      const quoteSplit = SplitText.create(".impact-quote", {
        type: "lines, words", mask: "lines", linesClass: "line", wordsClass: "word",
      });
      gsap.set(quoteSplit.words, { yPercent: 110 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
        },
      });

      // ACT 1 — ZOOM TRANSITION (0.00 → 0.40)

      // ── Fade out elements ──
      tl.to(subheadingRef.current,
        { opacity: 0, y: -40, duration: 0.03, ease: "power2.in" }, 0)
        .to(ctaRef.current,
          { opacity: 0, y: -30, duration: 0.03, ease: "power2.in" }, 0.01)
        .to("header",
          { opacity: 0, y: -30, duration: 0.03, ease: "power2.in" }, 0)

        .to(headingRef.current,
          { scale: 2.5, opacity: 0, duration: 0.11, ease: "power2.in" }, 0.03)
        .to(headingRef.current,
          { filter: "blur(12px)", duration: 0.04, ease: "power2.in" }, 0.10)

        .to(transitionState,
          { zoomProgress: 1, duration: 0.25, ease: "power1.in" }, 0.03)

        .to(missionTextRef.current,
          { scale: 2.5, duration: 0.13, ease: "power2.in" }, 0.14)
        .to(missionTextRef.current,
          { opacity: 1, duration: 0.03, ease: "power2.out" }, 0.14)
        .to(missionTextRef.current,
          { opacity: 0, duration: 0.05, ease: "power2.in" }, 0.22)
        .to(missionTextRef.current,
          { filter: "blur(14px)", duration: 0.03, ease: "power2.in" }, 0.24)

        .to(missionRef.current, { opacity: 1, duration: 0.02 }, 0.28)

        .to(transitionState,
          { revealProgress: 1, duration: 0.25, ease: "power2.inOut" }, 0.28);

      tl.set(heroContentRef.current, { opacity: 1 }, 0)
        .to(heroContentRef.current,
          { opacity: 0, duration: 0.04, ease: "power1.in" }, 0.40);

      // ACT 2 — MISSION STATS (0.55 → 0.95)

      tl.to(labelSplit.lines,
        { yPercent: 0, stagger: 0.02, duration: 0.06, ease: "expo.out" }, 0.55)

        .to(headingSplit.lines,
          { yPercent: 0, stagger: 0.03, duration: 0.1, ease: "expo.out" }, 0.58)

        .to(descSplit.lines,
          { yPercent: 0, stagger: 0.02, duration: 0.08, ease: "expo.out" }, 0.64)

        .to(".screen-card", {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.02, duration: 0.1, ease: "power3.out",
        }, 0.68)

        .to(quoteSplit.words,
          { yPercent: 0, stagger: 0.01, duration: 0.1, ease: "expo.out" }, 0.76)

        .to(".stats-arc",
          { opacity: 1, scale: 1, duration: 0.08, ease: "power2.out" }, 0.84)

        .to(".stat-number",
          { opacity: 1, y: 0, duration: 0.06, ease: "power3.out" }, 0.87)

        .to(".stat-sub",
          { opacity: 1, y: 0, stagger: 0.02, duration: 0.05, ease: "power2.out" }, 0.90)

        .to(".stat-dot",
          { opacity: 1, scale: 1, stagger: 0.015, duration: 0.04, ease: "back.out(2)" }, 0.93);

      // ── After entrance finishes, force scroll timeline to re-capture ──
      // 1. invalidate() clears all cached start/end values
      // 2. progress(tl.progress()) forces immediate re-render at current
      //    scroll position, recording the now-visible element states
      entrance.eventCallback("onComplete", () => {
        tl.invalidate();
        tl.progress(tl.progress());
        entranceState.isComplete = true;
      });

      // Let LoadingScreen trigger the entrance after its exit animation
      loadingState.onReady = () => entrance.play();
    },
    { scope: sectionRef }
  );

  // ── CTA hover: replay ASCII scramble ──
  const handleCtaHover = () => {
    const data = ctaScrambleRef.current;
    if (!data) return;

    const { chars, originals, asciiChars } = data;
    const tl = gsap.timeline();

    chars.forEach((char, i) => {
      const original = originals[i];
      if (original.trim() === "") return;

      const proxy = { progress: 0 };
      tl.to(proxy, {
        progress: 1,
        duration: 0.3,
        ease: "none",
        onUpdate: () => {
          if (proxy.progress < 0.6) {
            char.textContent =
              asciiChars[Math.floor(Math.random() * asciiChars.length)];
          } else {
            char.textContent = original;
          }
        },
      }, i * 0.02);
    });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative z-[10] w-full min-h-screen"
    >
      {/* ═══ Hero Content ═══ */}
      <div
        ref={heroContentRef}
        className="absolute inset-x-0 top-0 z-[10] h-screen min-h-[945px] overflow-hidden"
      >
        <GridOverlay showTexture={true} entranceDelay={2.8}>
          <Navbar entranceDelay={9.1} />
          <div className="relative z-40 flex flex-col items-center justify-center h-full pt-14">
            <div className="mb-6 h-[30px]" />

            <h1
              ref={headingRef}
              className="hero-heading font-bricolage font-medium text-center mb-8"
              style={{
                fontSize: "clamp(75px, 4.2vw, 85px)",
                lineHeight: 0.96,
                letterSpacing: "-2.5px",
              }}
            >
              <span className="hw-eng">Engineering</span>
              <br />
              Predictable <span className="hw-vir">Virality</span> For
              <br />
              Consumer Apps
            </h1>

            <p
              ref={missionTextRef}
              className="mission-text absolute inset-x-0 font-host font-normal text-center text-[#a1a1aa]"
              style={{
                fontSize: "clamp(40px, 2.8vw, 50px)",
                lineHeight: 1.2,
                letterSpacing: "-1.5px",
                maxWidth: "900px",
                margin: "0 auto",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              A special-ops inspired team using science-backed systems, creator
              networks, and disciplined execution to turn apps into{" "}
              <span style={{ color: "#F05A1F" }}>viral hits</span>.
            </p>

            <p
              ref={subheadingRef}
              className="hero-subheading font-host text-base text-[#a1a1aa] text-center tracking-[-0.32px] leading-normal max-w-[540px] mb-5"
            >
              We build short-form content systems that turn attention into
              installs consistently, at scale, without relying on luck.
            </p>

            <div ref={ctaRef} className="flex flex-col items-center gap-2">
              <div className="cta-inner overflow-visible">
                <a
                  href="#results"
                  onMouseEnter={handleCtaHover}
                  className="relative flex items-center justify-center gap-3 w-40 h-10 px-1.5 py-2 overflow-visible hover:bg-white/10 transition-colors duration-300"
                >
                  {/* SVG border — draws in via strokeDashoffset animation */}
                  <svg
                    className="cta-border absolute"
                    style={{ top: "-1px", left: "-1px", width: "calc(100% + 2px)", height: "calc(100% + 2px)" }}
                    viewBox="0 0 162 42"
                    preserveAspectRatio="none"
                    fill="none"
                    overflow="visible"
                  >
                    <path
  className="cta-border-path"
  d="M1,1 L161,1 L161,41 L1,41 Z"
  stroke="white" strokeWidth="1"
  vectorEffect="non-scaling-stroke"
/>
                  </svg>
                  <span className="cta-text font-host font-medium text-base text-white text-center tracking-[-0.32px] leading-normal whitespace-nowrap">
                    Viral Results
                  </span>
                  <span className="cta-arrow" style={{ display: "inline-flex", alignItems: "center" }}>
                    <svg
                      className="cta-arrow-svg"
                      width="11"
                      height="11"
                      viewBox="0 0 10 10"
                      fill="none"
                      overflow="visible"
                    >
                      <path
                        className="arrow-path"
                        d="M0.75 8.75L8.75 0.75M8.75 0.75H0.75M8.75 0.75V8.75"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </div>
              <div className="overflow-hidden">
                <div className="cta-sub flex flex-col items-center">
                  <span className="font-host text-xs text-[#a1a1aa] text-center tracking-[-0.24px] leading-normal -mb-1">
                    Real missions. Real outcomes.
                  </span>
                  <CtaGlowLine className="cta-glow-svg pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </GridOverlay>
      </div>

      {/* ═══════════════════════════════════════════════════════
          DECORATIVE BIG TEXT ROWS
          Rows 1 & 3 slide in + compress with clip-path masking.
          Row 2 is invisible spacer (measurement only).
          The ACTUAL .hw-eng + .hw-vir heading spans are the
          visible middle row — same element start to finish.
      ═══════════════════════════════════════════════════════ */}
      <div
        ref={bigTextWrapRef}
        className="absolute inset-x-0 top-0 z-[20] h-screen min-h-[945px] flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Row 1 — decorative (slides from right) */}
        <div
          ref={bigRow1Ref}
          className="relative w-full flex-shrink-0"
          style={{ zIndex: 1 }}
        >
          <p
            className="font-bricolage font-medium text-white text-center w-full whitespace-nowrap select-none"
            style={{
              fontSize: "clamp(60px, 7vw, 120px)",
              lineHeight: 0.85,
              letterSpacing: "-3px",
            }}
          >
            Engineering Virality
          </p>
        </div>

        {/* Row 2 — INVISIBLE SPACER (holds vertical layout space only) */}
        <div
          ref={bigRow2SpacerRef}
          className="relative w-full flex-shrink-0"
          style={{ zIndex: 2, visibility: "hidden" }}
        >
          <p
            className="font-bricolage font-medium text-white text-center w-full whitespace-nowrap select-none"
            style={{
              fontSize: "clamp(60px, 7vw, 120px)",
              lineHeight: 0.85,
              letterSpacing: "-3px",
            }}
          >
            Engineering Virality
          </p>
        </div>

        {/* Row 3 — decorative (slides from right) */}
        <div
          ref={bigRow3Ref}
          className="relative w-full flex-shrink-0"
          style={{ zIndex: 1 }}
        >
          <p
            className="font-bricolage font-medium text-white text-center w-full whitespace-nowrap select-none"
            style={{
              fontSize: "clamp(60px, 7vw, 120px)",
              lineHeight: 0.85,
              letterSpacing: "-3px",
            }}
          >
            Engineering Virality
          </p>
        </div>
      </div>

      {/* ═══ MissionStats ═══ */}
      <div ref={missionRef} className="relative z-[1] opacity-0">
        <MissionStats />
      </div>
    </section>
  );
}