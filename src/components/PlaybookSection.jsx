import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GlobalGrid from "./Globalgrid";
import ReconRadarInlineSvg from "./SvgAssets";
import {
  LightRay1ReconSvg,
  LightRay2ReconSvg,
  LightRay1BlueprintSvg,
  LightRay2BlueprintSvg,
  LightRay1OptimizeSvg,
  LightRay2OptimizeSvg,
  GridLinesOptimizeSvg,
  GridLinesReconSvg,
  // ReconLinesRadarSvg,  ← replaced by inline version
  CubesSvg,
  GlobeAndMobileSvg,
  LinesDeploySvg,
  ScreensDeploySvg,
  // LinesBlueprintSvg,  ← replaced by CSS dotted lines
  EllipseBlueprintSvg,
  GridLineLeft,
  GridLineRight,
  GridCrosshair,
} from "./SvgAssets";

/* Grid icon — matches the 12×12 icon rendered in blueprint-flowchart.svg
   stroke: #707070, strokeWidth: ~1.1 (matches SVG stroke-width="1.09841") */
const BlueprintGridIcon = () => (
  <svg
    className="shrink-0"
    width="11"
    height="11"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.07542 0.549316H1.72466C1.41295 0.549316 1.11402 0.672448 0.893552 0.893195C0.67317 1.11306 0.549316 1.41119 0.549316 1.72164V4.0672M4.07542 0.549316H9.95229C10.264 0.549316 10.5629 0.672448 10.7834 0.893195C11.0038 1.11306 11.1276 1.41119 11.1276 1.72164V4.0672M4.07542 0.549316V11.103M0.549316 4.0672V9.93064C0.549316 10.2411 0.67317 10.5392 0.893552 10.7591C1.11402 10.9798 1.41295 11.103 1.72466 11.103H4.07542M0.549316 4.0672H11.1276M11.1276 4.0672V9.93064C11.1276 10.2411 11.0038 10.5392 10.7834 10.7591C10.5629 10.9798 10.264 11.103 9.95229 11.103H4.07542"
      stroke="#707070"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PlaybookSection() {
  const radarRef = useRef(null);

  /* ─────────────────────────────────────────────
     Radar sweep + signal pulse animations
     ───────────────────────────────────────────── */
  useGSAP(
    () => {
      const svg = radarRef.current;
      if (!svg) return;

      const sweepGroup = svg.querySelector(".radar-sweep-group");
      const dotBottom = svg.querySelector(".radar-dot-bottom");
      const dotRight = svg.querySelector(".radar-dot-right");
      const dotTop = svg.querySelector(".radar-dot-top");

      // ── Initial states ──
      gsap.set(dotBottom, { opacity: 0.15 });
      gsap.set(dotRight, { opacity: 0.15 });
      gsap.set(dotTop, { opacity: 0.15 });

      // ── Compute each dot's angle relative to sweep start ──
      const CX = 242.49;
      const CY = 150.57;

      function angleFromDown(px, py) {
        const dx = px - CX;
        const dy = py - CY;
        let deg = Math.atan2(-dx, dy) * (180 / Math.PI);
        if (deg < 0) deg += 360;
        return deg;
      }

      const dots = [
        { el: dotBottom, angle: angleFromDown(248.43, 234.02), ox: "248.43", oy: "234.02" },
        { el: dotRight,  angle: angleFromDown(304.99, 147.6),  ox: "304.99", oy: "147.6"  },
        { el: dotTop,    angle: angleFromDown(241.19, 80.84),  ox: "241.19", oy: "80.84"  },
      ];

      const fired = new Set();
      const DURATION = 4;

      const sweepTween = gsap.to(sweepGroup, {
        rotation: "+=360",
        svgOrigin: `${CX} ${CY}`,
        duration: DURATION,
        repeat: -1,
        ease: "none",
        onUpdate() {
          const currentAngle = ((sweepTween.totalTime() % DURATION) / DURATION) * 360;

          dots.forEach((dot, i) => {
            if (!fired.has(i) && currentAngle >= dot.angle) {
              fired.add(i);
              gsap.to(dot.el, {
                opacity: 1,
                scale: 1.6,
                svgOrigin: `${dot.ox} ${dot.oy}`,
                duration: 0.3,
                ease: "power2.out",
              });
              gsap.to(dot.el, {
                opacity: 0.15,
                scale: 1,
                svgOrigin: `${dot.ox} ${dot.oy}`,
                duration: 0.8,
                ease: "power2.in",
                delay: 0.3,
              });
            }
          });
        },
        onRepeat() {
          fired.clear();
        },
      });

      // ── Signal pulses along left connectors ──
      const gradBottom = svg.querySelector("#pulseGradBottom");
      const gradMiddle = svg.querySelector("#pulseGradMiddle");
      const gradTop = svg.querySelector("#pulseGradTop");
      const cubeBottom = svg.querySelector(".cube-glow-bottom");
      const cubeMiddle = svg.querySelector(".cube-glow-middle");
      const cubeTop = svg.querySelector(".cube-glow-top");

      // Bottom signal: right → down → right (L-shape)
      const bottomTl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 0 });
      bottomTl.to(cubeBottom, { opacity: 0.9, duration: 0.25, ease: "power2.out" }, 0);
      bottomTl.to(cubeBottom, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.25);
      bottomTl.to(gradBottom, { attr: { cx: 3.5, cy: 181.5 }, duration: 0 }, 0.15);
      bottomTl.to(gradBottom, { attr: { cx: 64.5 }, duration: 0.5, ease: "none" }, 0.15);
      bottomTl.to(gradBottom, { attr: { cy: 213.5 }, duration: 0.3, ease: "none" });
      bottomTl.to(gradBottom, { attr: { cx: 126 }, duration: 0.5, ease: "none" });
      bottomTl.to(gradBottom, { attr: { cx: -50 }, duration: 0 });

      // Middle signal: straight horizontal
      const middleTl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 0.5 });
      middleTl.to(cubeMiddle, { opacity: 0.9, duration: 0.25, ease: "power2.out" }, 0);
      middleTl.to(cubeMiddle, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.25);
      middleTl.to(gradMiddle, { attr: { cx: 3.5, cy: 152 }, duration: 0 }, 0.15);
      middleTl.to(gradMiddle, { attr: { cx: 113 }, duration: 0.85, ease: "none" }, 0.15);
      middleTl.to(gradMiddle, { attr: { cx: -50 }, duration: 0 });

      // Top signal: right → up → right (inverted-L)
      const topTl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 1 });
      topTl.to(cubeTop, { opacity: 0.9, duration: 0.25, ease: "power2.out" }, 0);
      topTl.to(cubeTop, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.25);
      topTl.to(gradTop, { attr: { cx: 3.5, cy: 121.5 }, duration: 0 }, 0.15);
      topTl.to(gradTop, { attr: { cx: 64 }, duration: 0.5, ease: "none" }, 0.15);
      topTl.to(gradTop, { attr: { cy: 91.5 }, duration: 0.3, ease: "none" });
      topTl.to(gradTop, { attr: { cx: 127 }, duration: 0.5, ease: "none" });
      topTl.to(gradTop, { attr: { cx: -50 }, duration: 0 });
    },
    { scope: radarRef }
  );

  return (
    <section className="relative z-25 w-full  overflow-hidden py-40 px-8 md:px-16 lg:px-24 xl:px-36">
      <GlobalGrid />

      {/* Border lines */}
      {/* <GridLineLeft className="pointer-events-none absolute top-0 w-px h-full opacity-80 z-30" aria-hidden="true" />
      <GridLineRight className="pointer-events-none absolute top-0 right-[7%] w-px h-full opacity-80 z-30" aria-hidden="true" /> */}
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute bottom-0 left-[105px] right-[105px] h-px bg-white/20 z-30"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-40 flex flex-col items-center mb-25">
        <p className="font-host font-normal text-base text-vl-orange uppercase text-center leading-normal ">
          PROCESS
        </p>
        <h2 className="font-host font-medium text-6xl text-[#f1f1f1] tracking-tighter leading-tighter text-center mb-6">
          The Viral Ops
          <br />
          Playbook
        </h2>
        <p className="font-host font-thin text-xl text-white text-center tracking-tight max-w-2xl leading-tight mx-auto">
          Every mission runs through a structured <br /> growth operation framework.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-40 max-w-[95.5rem] mx-auto grid grid-cols-12 gap-6 px-0">
        {/* ━━━ RECON CARD (col-span-7) ━━━ */}
        <div className="col-span-7 relative isolate h-96 rounded overflow-hidden border border-solid border-[#383838] shadow-lg shadow-black/30 bg-[#171717]">
          {/* SVG layers */}
          <LightRay1ReconSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none" />
          <LightRay2ReconSvg className="absolute top-0 right-0 h-3/5 w-auto pointer-events-none" />
          <GridLinesReconSvg className="absolute top-0 right-0 h-full w-auto opacity-70 pointer-events-none" />

          {/* ✦ Inline animated radar ✦ */}
          <ReconRadarInlineSvg
            ref={radarRef}
            className="absolute top-0 right-0 h-full w-auto pointer-events-none"
          />

          <CubesSvg className="absolute bottom-4 right-2.5 w-7 pointer-events-none" />

          {/* Text content */}
          <div className="absolute z-10 top-10 left-7">
            <h3 className="font-bricolage font-medium text-4xl text-[#dddddd] tracking-tighter">
              Recon
            </h3>
            <p className="font-host font-normal text-md text-[#a1a1a1] tracking-tight max-w-56 mt-3">
              We identify where attention is forming before the market reacts.
            </p>
          </div>

          {/* Bottom caption */}
          <p className="absolute z-10 left-7 bottom-7 font-host font-normal text-sm text-[#a1a1a1] max-w-56">
            Trend mapping, Attention mining, Platform signal analysis.
          </p>
        </div>

        {/* ━━━ BLUEPRINT CARD (col-span-5) ━━━ */}
        <div className="col-span-5 relative isolate h-96 rounded overflow-hidden border border-solid border-[#383838] bg-[#171717]">
          {/* SVG layers */}
          <EllipseBlueprintSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none z-[6]" />
          <LightRay1BlueprintSvg className="absolute bottom-0 -left-15 w-4/5 h-14 pointer-events-none z-[7]" />
          <LightRay2BlueprintSvg className="absolute top-0 right-0 w-3/5 h-full pointer-events-none z-6" />

          {/*
            Blueprint Flowchart Rows + dotted lines
            ────────────────────────────────────────
            Dotted lines sit at each row's vertical center.
            Line 3 is orange, rest are gray.
            All in the same container = always aligned.
          */}
          <div
            className="absolute top-0 bottom-0 my-auto left-0 w-full pointer-events-none z-[5]"
            style={{ aspectRatio: '291 / 274' }}
          >
            {/* ── Dashed background lines (one per row, extend edge-to-edge) ── */}
            {[10.575, 26.375, 41.475, 56.785, 72.195, 87.995].map((y, i) => (
              <div
                key={i}
                className="absolute -left-[200%] w-[500%] h-px"
                style={{
                  top: `${y}%`,
                  backgroundImage: `repeating-linear-gradient(to right, ${i === 2 ? '#FF6F21' : '#B2B2B2'} 0px, ${i === 2 ? '#FF6F21' : '#B2B2B2'} 4px, transparent 4px, transparent 12px)`,
                  opacity: 0.5,
                }}
              />
            ))}
            {/* ── ROW 1 · y 15–43 ─────────────────────────── */}
            {/* Rect — orange border, icon only */}
            <div
              className="absolute flex items-center pl-3 bg-[#1C1C1C] border border-[#FF6F21]/50 rounded-md"
              style={{ left: '54.32%', top: '5.60%', width: '20.48%', height: '9.95%' }}
            >
              <BlueprintGridIcon />
            </div>
            {/* Pill — gray border, empty (extends past card edge) */}
            <div
              className="absolute bg-[#282828] border border-[#3E3E3E] rounded-full"
              style={{ left: '82.76%', top: '5.60%', width: '24.23%', height: '9.95%' }}
            />

            {/* ── ROW 2 · y 53–80 ─────────────────────────── */}
            {/* Rect — gray border, icon only */}
            <div
              className="absolute flex items-center pl-3 bg-[#1C1C1C] border border-[#343434] rounded-md"
              style={{ left: '32.22%', top: '21.40%', width: '20.29%', height: '9.95%' }}
            >
              <BlueprintGridIcon />
            </div>
            {/* Pill — gray border, "Format" */}
            <div
              className="absolute flex items-center justify-center bg-[#282828] border border-[#3E3E3E] rounded-full"
              style={{ left: '58.48%', top: '21.40%', width: '26.05%', height: '9.95%' }}
            >
              <span className="text-[#707070] text-xs font-host font-normal whitespace-nowrap leading-none">Format</span>
            </div>

            {/* ── ROW 3 · y 91–118 ────────────────────────── */}
            {/* Rect — orange border, icon only */}
            <div
              className="absolute flex items-center pl-3 bg-[#1C1C1C] border border-[#FF6F21]/50 rounded-md"
              style={{ left: '60.89%', top: '36.5%', width: '21.81%', height: '9.95%' }}
            >
              <BlueprintGridIcon />
            </div>
            {/* Pill — orange border, "Trend" */}
            <div
              className="absolute flex items-center justify-center bg-[#282828] border border-[#FF6F21]/50 rounded-full"
              style={{ left: '85.67%', top: '36.5%', width: '20.57%', height: '9.95%' }}
            >
              <span className="text-[#707070] text-xs font-host font-normal whitespace-nowrap leading-none">Trend</span>
            </div>

            {/* ── ROW 4 · y 136–164 ───────────────────────── */}
            {/* Rect — gray border, icon only */}
            <div
              className="absolute flex items-center pl-3 bg-[#1C1C1C] border border-[#343434] rounded-md"
              style={{ left: '52.41%', top: '51.81%', width: '17.02%', height: '9.95%' }}
            >
              <BlueprintGridIcon />
            </div>
            {/* Pill — gray border, empty (extends past card edge) */}
            <div
              className="absolute bg-[#282828] border border-[#3E3E3E] rounded-full"
              style={{ left: '77.40%', top: '51.81%', width: '17.77%', height: '9.95%' }}
            />

            {/* ── ROW 5 · y 184–211 ───────────────────────── */}
            {/* Rect — orange border, icon + "Content style" */}
            <div
              className="absolute flex items-center gap-2 pl-3 bg-[#1C1C1C] border border-[#FF6F21]/50 rounded-md"
              style={{ left: '22.22%', top: '67.22%', width: '27.26%', height: '9.95%' }}
            >
              <BlueprintGridIcon />
              <span className="text-[#707070] text-xs font-host font-normal whitespace-nowrap leading-none">Content style</span>
            </div>
            {/* Pill — gray border, "Creative" */}
            <div
              className="absolute flex items-center justify-center bg-[#282828] border border-[#3E3E3E] rounded-full"
              style={{ left: '66.44%', top: '67.22%', width: '23.01%', height: '9.95%' }}
            >
              <span className="text-[#707070] text-xs font-host font-normal whitespace-nowrap leading-none">Creative</span>
            </div>

            {/* ── ROW 6 · y 222–249 ───────────────────────── */}
            {/* Rect — gray border, icon only */}
            <div
              className="absolute flex items-center pl-3 bg-[#1C1C1C] border border-[#343434] rounded-md"
              style={{ left: '48.22%', top: '83.02%', width: '17.84%', height: '9.95%' }}
            >
              <BlueprintGridIcon />
            </div>
            {/* Pill — gray border, empty */}
            <div
              className="absolute bg-[#282828] border border-[#3E3E3E] rounded-full"
              style={{ left: '80.02%', top: '83.02%', width: '17.60%', height: '9.95%' }}
            />

          </div>

          <CubesSvg className="absolute bottom-1.5 right-2.5 w-7 pointer-events-none z-6" />

          {/* Text content */}
          <div className="absolute z-10 top-10 left-7">
            <h3 className="font-bricolage font-medium text-4xl text-[#dddddd] tracking-tighter">
              Blueprint
            </h3>
            <p className="font-host font-normal text-md text-[#a1a1a1] tracking-tight max-w-48 mt-3">
              We design repeatable creative systems, not one off experiments.
            </p>
          </div>
        </div>

        {/* ━━━ DEPLOY CARD (col-span-5) ━━━ */}
        <div className="col-span-5 relative isolate h-96 rounded overflow-hidden border border-solid border-[#383838] bg-[#171717]">
          {/* SVG layers */}
          <LinesDeploySvg
            className="absolute top-[53%] -left-1.5 w-[90%] h-auto pointer-events-none"
            style={{ mixBlendMode: "plus-lighter" }}
          />
          <ScreensDeploySvg className="absolute top-0 left-[58%] h-full w-auto pointer-events-none z-1 isolate" />
          <CubesSvg className="absolute bottom-1.5 left-3 w-7 pointer-events-none z-2" />

          {/* Text content */}
          <div className="absolute z-10 top-10 left-7">
            <h3 className="font-bricolage font-medium text-4xl text-[#dddddd] tracking-tighter">
              Deploy
            </h3>
            <p className="font-host font-normal text-md text-[#a1a1a1] tracking-tight max-w-56 mt-3">
              We activate our creator network in coordinated distribution waves.
            </p>
          </div>
        </div>

        {/* ━━━ OPTIMIZE CARD (col-span-7) ━━━ */}
        <div className="col-span-7 relative isolate h-96 rounded overflow-hidden border border-solid border-[#383838] bg-[#171717]">
          {/* SVG layers */}
          <LightRay1OptimizeSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none" />
          <GridLinesOptimizeSvg className="absolute top-0 left-1/3 h-full w-auto opacity-70 pointer-events-none" />
          <GlobeAndMobileSvg className="absolute top-5 left-1/4 w-3/4 h-[90%] pointer-events-none" />
          <LightRay2OptimizeSvg className="absolute bottom-0 right-0 h-28 w-auto pointer-events-none" />
          <CubesSvg className="absolute bottom-1.5 right-2.5 w-7 pointer-events-none" />

          {/* Text content */}
          <div className="absolute z-10 top-10 left-7">
            <h3 className="font-bricolage font-medium text-4xl text-[#dddddd] tracking-tighter">
              Optimize
            </h3>
            <p className="font-host font-normal text-md text-[#a1a1a1] tracking-tight max-w-56 mt-3">
              We refine performance through live data and behavioral feedback
              loops.
            </p>
          </div>

          {/* Bottom caption */}
          <p className="absolute z-10 left-7 bottom-7 font-host font-normal text-sm text-[#a1a1a1] max-w-56">
            Performance loops, retention angles, install conversion tuning.
          </p>
        </div>
      </div>
    </section>
  );
}