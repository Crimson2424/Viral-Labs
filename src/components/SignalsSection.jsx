/**
 * SignalsSection — "Stream of Data" section.
 *
 * DOM layer for the signals visualization.
 * The R3F scene renders via SignalsCanvas (standalone),
 * which tracks this section's DOM element for positioning.
 *
 * Layout (from Figma):
 *   - Center: "STREAM OF DATA" subtitle + "Signals drive everything" heading
 *   - Bottom-right: "WHAT RESULTS CAN I EXPECT?" + input + disclaimer
 *
 * Text animations:
 *   SplitText line reveal (mask + translateY) via ScrollTrigger.
 *   Heading group animates first, bottom-right content follows.
 */

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, ScrollTrigger } from "./Gsapconfig";
import GlobalTexture from "./Globaltexture";
import { signalsCanvasState } from "./SignalsCanvas";

/* ─── ASCII chars for scramble effect ─── */
const ASCII_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

/* ─── Corner bracket config ─── */
const CORNER_SIZE = 8;
const CORNER_THICKNESS = "1.7px";
const CORNER_COLOR = "#FF6F21";
const OFFSET_DEFAULT = -6;
const OFFSET_HOVER = -10;

/* ─────────────────────────────────────────────
   SignalsCTA — isolated button with hover effects
   (same pattern as CornerBracketButton in MissionReports)
   ───────────────────────────────────────────── */
function SignalsCTA() {
    const btnRef = useRef(null);
    const tlCornerRef = useRef(null);
    const trCornerRef = useRef(null);
    const blCornerRef = useRef(null);
    const brCornerRef = useRef(null);
    const scrambleDataRef = useRef(null);

    /* Set up SplitText on mount for char scramble */
    useGSAP(
        () => {
            if (!btnRef.current) return;
            const textEl = btnRef.current.querySelector(".cta-scramble-text");
            if (!textEl) return;

            const split = SplitText.create(textEl, {
                type: "chars",
                charsClass: "btn-char",
            });

            const chars = split.chars;
            const originals = chars.map((c) => c.textContent);

            // Lock each char width so scramble doesn't cause layout shift
            chars.forEach((char) => {
                const w = char.offsetWidth;
                char.style.display = "inline-block";
                char.style.width = `${w}px`;
                char.style.textAlign = "center";
            });

            scrambleDataRef.current = { chars, originals };
        },
        { scope: btnRef }
    );

    const handleEnter = useCallback(() => {
        // Corners spread outward
        gsap.to(tlCornerRef.current, { top: OFFSET_HOVER, left: OFFSET_HOVER, duration: 0.3, ease: "power2.out" });
        gsap.to(trCornerRef.current, { top: OFFSET_HOVER, right: OFFSET_HOVER, duration: 0.3, ease: "power2.out" });
        gsap.to(blCornerRef.current, { bottom: OFFSET_HOVER, left: OFFSET_HOVER, duration: 0.3, ease: "power2.out" });
        gsap.to(brCornerRef.current, { bottom: OFFSET_HOVER, right: OFFSET_HOVER, duration: 0.3, ease: "power2.out" });

        // Text scramble
        const data = scrambleDataRef.current;
        if (!data) return;
        const { chars, originals } = data;
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
                        char.textContent = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
                    } else {
                        char.textContent = original;
                    }
                },
            }, i * 0.02);
        });
    }, []);

    const handleLeave = useCallback(() => {
        // Corners return
        gsap.to(tlCornerRef.current, { top: OFFSET_DEFAULT, left: OFFSET_DEFAULT, duration: 0.3, ease: "power2.out" });
        gsap.to(trCornerRef.current, { top: OFFSET_DEFAULT, right: OFFSET_DEFAULT, duration: 0.3, ease: "power2.out" });
        gsap.to(blCornerRef.current, { bottom: OFFSET_DEFAULT, left: OFFSET_DEFAULT, duration: 0.3, ease: "power2.out" });
        gsap.to(brCornerRef.current, { bottom: OFFSET_DEFAULT, right: OFFSET_DEFAULT, duration: 0.3, ease: "power2.out" });

        // Reset chars to original
        const data = scrambleDataRef.current;
        if (!data) return;
        data.chars.forEach((char, i) => {
            char.textContent = data.originals[i];
        });
    }, []);

    const cornerBase = { position: "absolute", width: CORNER_SIZE, height: CORNER_SIZE };

    return (
        <div
            ref={btnRef}
            className="signals-cta relative inline-block cursor-pointer"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            {/* Animated orange corner brackets */}
            <span ref={tlCornerRef} style={{ ...cornerBase, top: OFFSET_DEFAULT, left: OFFSET_DEFAULT, borderTop: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`, borderLeft: `${CORNER_THICKNESS} solid ${CORNER_COLOR}` }} aria-hidden="true" />
            <span ref={trCornerRef} style={{ ...cornerBase, top: OFFSET_DEFAULT, right: OFFSET_DEFAULT, borderTop: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`, borderRight: `${CORNER_THICKNESS} solid ${CORNER_COLOR}` }} aria-hidden="true" />
            <span ref={blCornerRef} style={{ ...cornerBase, bottom: OFFSET_DEFAULT, left: OFFSET_DEFAULT, borderBottom: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`, borderLeft: `${CORNER_THICKNESS} solid ${CORNER_COLOR}` }} aria-hidden="true" />
            <span ref={brCornerRef} style={{ ...cornerBase, bottom: OFFSET_DEFAULT, right: OFFSET_DEFAULT, borderBottom: `${CORNER_THICKNESS} solid ${CORNER_COLOR}`, borderRight: `${CORNER_THICKNESS} solid ${CORNER_COLOR}` }} aria-hidden="true" />

            {/* Beveled hollow border via clip-path */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "rgba(255,255,255,0.45)",
                    clipPath: "polygon(0 0,100% 0,100% calc(100% - 24px),calc(100% - 24px) 100%,0 100%,0 0,1px 1px,1px calc(100% - 1px),calc(100% - 24px - 0.62px) calc(100% - 1px),calc(100% - 1px) calc(100% - 24px - 0.62px),calc(100% - 1px) 1px,1px 1px)",
                }}
            />

            <div className="relative px-4.5 py-3.5 5xl:px-7 5xl:py-5">
                <span className="cta-scramble-text font-host font-thin text-xs md:text-sm 4xl:text-base 5xl:text-xl text-white uppercase tracking-tight">
                    ASK ABOUT THE SYSTEM …
                </span>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   SignalsSection
   ───────────────────────────────────────────── */
export default function SignalsSection() {
    const sectionRef = useRef(null);
    const canvasTrackRef = useRef(null);
    const headingGroupRef = useRef(null);
    const bottomGroupRef = useRef(null);
    const ctaRef = useRef(null);

    /* Register tracking element for SignalsCanvas scroll positioning.
       The tracking div is hidden md:block — on mobile the canvas gets
       no sectionEl and stays invisible (matching GlobeCanvas pattern). */
    useGSAP(() => {
        signalsCanvasState.sectionEl = canvasTrackRef.current;
        return () => {
            signalsCanvasState.sectionEl = null;
        };
    }, []);

    /* ── Text reveal animations ── */
    useGSAP(
        () => {
            if (!headingGroupRef.current || !bottomGroupRef.current) return;

            const splitInstances = [];

            /* ── 1. Heading group: subtitle + h2 ── */
            const headingEls = Array.from(headingGroupRef.current.children);
            const headingLines = [];

            headingEls.forEach((el) => {
                const split = SplitText.create(el, {
                    type: "lines",
                    mask: "lines",
                    linesClass: "line++",
                    lineThreshold: 0.1,
                });
                splitInstances.push(split);

                // Give masked lines room for descenders without changing line-height
                split.lines.forEach((line) => {
                    line.style.paddingBottom = "6px";
                });

                headingLines.push(...split.lines);
            });

            // Set initial state (below the mask)
            gsap.set(headingLines, { y: "100%" });

            // Animate into view
            gsap.to(headingLines, {
                y: "0%",
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: headingGroupRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            /* ── 2. Bottom-right group: label + disclaimer (skip .signals-cta) ── */
            const bottomEls = Array.from(bottomGroupRef.current.children);
            const bottomLines = [];

            bottomEls.forEach((el) => {
                // Skip the CTA wrapper — it has its own entrance + hover logic
                if (el === ctaRef.current) return;

                const split = SplitText.create(el, {
                    type: "lines",
                    mask: "lines",
                    linesClass: "line++",
                    lineThreshold: 0.1,
                });
                splitInstances.push(split);
                bottomLines.push(...split.lines);
            });

            // Set initial state
            gsap.set(bottomLines, { y: "100%", opacity: 0 });

            // Animate into view (delayed so heading finishes first)
            gsap.to(bottomLines, {
                y: "0%",
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.3,
                scrollTrigger: {
                    trigger: bottomGroupRef.current,
                    start: "top 85%",
                    once: true,
                },
            });

            /* ── 3. CTA button entrance ── */
            if (ctaRef.current) {
                gsap.set(ctaRef.current, { opacity: 0, y: 20 });
                gsap.to(ctaRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power4.out",
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: bottomGroupRef.current,
                        start: "top 85%",
                        once: true,
                    },
                });
            }

            // Cleanup: revert all SplitText instances
            return () => {
                splitInstances.forEach((split) => split && split.revert());
            };
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="signals-section relative z-25 w-full h-auto min-h-screen md:h-[130vh] bg-[#121212]"
        >
            <GlobalTexture />

            {/* Canvas tracking div — hidden on mobile so SignalsCanvas stays invisible,
                visible on md+ so canvas positions itself against this element.
                Matches the globeContainerRef pattern in ViralitySection. */}
            <div ref={canvasTrackRef} className="absolute inset-0 hidden md:block" />

            {/* Mobile fallback background */}
            <img
              src="/images/signal-mobile.png"
              alt=""
              className="absolute inset-0 z-1 h-full w-full object-cover mix-blend-lighten md:hidden object-[25%]"
              draggable={false}
            />

            {/* DOM content overlay */}
            <div className="absolute inset-0 z-40 pointer-events-none flex flex-col md:block">

                

                {/* Center heading group */}
                <div
                    ref={headingGroupRef}
                    className="relative md:absolute md:top-[36%] md:left-[48%] md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col items-center pt-[20vh] md:pt-0 px-6 md:px-0"
                >
                    <p className="font-host text-xs md:text-sm 4xl:text-base 5xl:text-2xl text-[#FF6F21] uppercase tracking-wide">
                        STREAM OF DATA
                    </p>
                    <h2 className="font-host text-center text-[clamp(1.75rem,6vw,3.375rem)] md:text-[54px] 4xl:text-[4rem] 5xl:text-[6.5rem] tracking-[-2px] leading-tight md:leading-[64px] 5xl:leading-[1.05] text-white">
                        Signals drive<br />everything
                    </h2>
                </div>

                {/* Spacer — pushes bottom group down on mobile flex layout */}
                <div className="flex-1 md:hidden" />

                {/* Bottom-right content — pointer-events-auto so CTA is interactive */}
                <div
                    ref={bottomGroupRef}
                    className="relative md:absolute md:bottom-[22%] md:right-[8%] flex flex-col items-center md:items-end gap-4 5xl:gap-8 pointer-events-auto px-6 md:px-0 pb-16 md:pb-0 5xl:scale-150 5xl:origin-bottom-right"
                >

                    {/* Results label */}
                    <div className="flex flex-col items-center md:items-end gap-1 mb-6 pointer-events-none">
                        <span className="font-host text-sm 4xl:text-base 5xl:text-2xl font-thin text-white/50 uppercase tracking-tight">
                            WHAT RESULTS CAN I EXPECT?
                        </span>
                        <div className="flex gap-1 5xl:gap-2">
                            <span className="w-2 h-3 5xl:w-3 5xl:h-5 bg-[#FF6F21]" />
                            <span className="w-2 h-3 5xl:w-3 5xl:h-5 bg-[#FF6F21]/70" />
                            <span className="w-2 h-3 5xl:w-3 5xl:h-5 bg-[#FF6F21]/45" />
                        </div>
                    </div>

                    {/* CTA button */}
                    <div ref={ctaRef}>
                        <SignalsCTA />
                    </div>

                    {/* Disclaimer */}
                    <p className="font-host font-thin text-[11px] md:text-[12px] 5xl:text-base text-white/50 uppercase tracking-tight max-w-[260px] md:max-w-[300px] 4xl:max-w-[380px] 5xl:max-w-[550px] leading-tight pointer-events-none text-center md:text-right">
                        SESSIONS MAY BE RECORDED. BY USING CHAT,<br />
                        YOU ACKNOWLEDGE OUR <span className="underline">PRIVACY POLICY</span>.
                    </p>
                </div>

            </div>
        </section>
    );
}