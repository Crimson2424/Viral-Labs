import GlobalGrid from "./Globalgrid";
import {
  LightRay1ReconSvg,
  LightRay2ReconSvg,
  LightRay1BlueprintSvg,
  LightRay2BlueprintSvg,
  LightRay1OptimizeSvg,
  LightRay2OptimizeSvg,
  GridLinesOptimizeSvg,
  GridLinesReconSvg,
  ReconLinesRadarSvg,
  CubesSvg,
  GlobeAndMobileSvg,
  LinesDeploySvg,
  ScreensDeploySvg,
  LinesBlueprintSvg,
  EllipseBlueprintSvg,
  GridLineLeft,
  GridLineRight,
  GridCrosshair,
} from "./SvgAssets";

/* Reusable grid icon used across all blueprint element boxes */
const BlueprintGridIcon = () => (
  <svg className="shrink-0" width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.07542 0.549316H1.72466C1.41295 0.549316 1.11402 0.672448 0.893552 0.893195C0.67317 1.11306 0.549316 1.41119 0.549316 1.72164V4.0672M4.07542 0.549316H9.95229C10.264 0.549316 10.5629 0.672448 10.7834 0.893195C11.0038 1.11306 11.1276 1.41119 11.1276 1.72164V4.0672M4.07542 0.549316V11.103M0.549316 4.0672V9.93064C0.549316 10.2411 0.67317 10.5392 0.893552 10.7591C1.11402 10.9798 1.41295 11.103 1.72466 11.103H4.07542M0.549316 4.0672H11.1276M11.1276 4.0672V9.93064C11.1276 10.2411 11.0038 10.5392 10.7834 10.7591C10.5629 10.9798 10.264 11.103 9.95229 11.103H4.07542"
      stroke="#707070"
      strokeWidth="0.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PlaybookSection() {
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
          <ReconLinesRadarSvg className="absolute top-0 right-0 h-full w-auto pointer-events-none" />
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
          <LinesBlueprintSvg className="absolute top-0 bottom-0 my-auto left-0 w-full h-auto opacity-50 pointer-events-none" />
          <EllipseBlueprintSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none" />
          <LightRay1BlueprintSvg className="absolute bottom-0 -left-15 w-4/5 h-14 pointer-events-none" />
          <LightRay2BlueprintSvg className="absolute top-0 right-0 w-3/5 h-full pointer-events-none" />

          {/* Blueprint Flowchart Elements — positioned to match SVG viewBox 0 0 291 274 */}
          <div
            className="absolute top-0 bottom-0 my-auto left-0 w-full pointer-events-none z-[5]"
            style={{ aspectRatio: '291 / 274' }}
          >
            {/* ═══ ROW 1 — Strategy rect + empty pill ═══ */}
            <div
              className="absolute flex items-center gap-1.5 bg-[#1C1C1C] border border-[#FF6F21]/50 rounded px-2.5"
              style={{ left: '37.3%', top: '5.6%', width: '28.5%', height: '10.2%' }}
            >
              <BlueprintGridIcon />
              <span className="text-[#707070] text-[10px] font-host font-normal whitespace-nowrap leading-none">Strategy</span>
            </div>
            <div
              className="absolute bg-[#282828] border border-[#3E3E3E] rounded-full"
              style={{ left: '72.8%', top: '5.6%', width: '34.2%', height: '10.2%' }}
            />

            {/* ═══ ROW 2 — Icon-only rect + "Format" pill ═══ */}
            <div
              className="absolute flex items-center justify-center bg-[#1C1C1C] border border-[#343434] rounded"
              style={{ left: '22.2%', top: '19.4%', width: '30.3%', height: '10%' }}
            >
              <BlueprintGridIcon />
            </div>
            <div
              className="absolute flex items-center justify-center bg-[#282828] border border-[#3E3E3E] rounded-full"
              style={{ left: '59.5%', top: '19.4%', width: '36.1%', height: '10%' }}
            >
              <span className="text-[#999999] text-xs font-host font-normal whitespace-nowrap leading-none">Format</span>
            </div>

            {/* ═══ ROW 3 — Icon-only rect (orange) + "Trend" pill (orange) ═══ */}
            <div
              className="absolute flex items-center justify-center bg-[#1C1C1C] border border-[#FF6F21]/50 rounded"
              style={{ left: '11%', top: '33.2%', width: '21.6%', height: '10%' }}
            >
              <BlueprintGridIcon />
            </div>
            <div
              className="absolute flex items-center justify-center bg-[#282828] border border-[#FF6F21]/50 rounded-full"
              style={{ left: '39.5%', top: '33.2%', width: '27.8%', height: '10%' }}
            >
              <span className="text-[#999999] text-xs font-host font-normal whitespace-nowrap leading-none">Trend</span>
            </div>

            {/* ═══ ROW 4 — Icon-only rect + empty pill ═══ */}
            <div
              className="absolute flex items-center justify-center bg-[#1C1C1C] border border-[#343434] rounded"
              style={{ left: '52.4%', top: '49.8%', width: '23%', height: '10%' }}
            >
              <BlueprintGridIcon />
            </div>
            <div
              className="absolute bg-[#282828] border border-[#3E3E3E] rounded-full"
              style={{ left: '82.5%', top: '49.8%', width: '28.9%', height: '10%' }}
            />

            {/* ═══ ROW 5 — "Content style" rect (orange) + "Creative" pill ═══ */}
            <div
              className="absolute flex items-center gap-1.5 bg-[#1C1C1C] border border-[#FF6F21]/50 rounded px-2.5"
              style={{ left: '22.2%', top: '67.2%', width: '37.1%', height: '10%' }}
            >
              <BlueprintGridIcon />
              <span className="text-[#999999] text-xs font-host font-normal whitespace-nowrap leading-none">Content style</span>
            </div>
            <div
              className="absolute flex items-center justify-center bg-[#282828] border border-[#3E3E3E] rounded-full"
              style={{ left: '66.3%', top: '67.2%', width: '43.1%', height: '10%' }}
            >
              <span className="text-[#999999] text-xs font-host font-normal whitespace-nowrap leading-none">Creative</span>
            </div>

            {/* ═══ ROW 6 — Icon-only rect + empty pill ═══ */}
            <div
              className="absolute flex items-center justify-center bg-[#1C1C1C] border border-[#343434] rounded"
              style={{ left: '22.2%', top: '81%', width: '24.7%', height: '10%' }}
            >
              <BlueprintGridIcon />
            </div>
            <div
              className="absolute bg-[#282828] border border-[#3E3E3E] rounded-full"
              style={{ left: '54%', top: '81%', width: '30.6%', height: '10%' }}
            />

            {/* ═══ ORANGE ACCENT SQUARES (bottom-right) ═══ */}
            <div className="absolute bottom-[3%] right-[1.5%] flex flex-col gap-1">
              <div className="w-2.5 h-2.5 bg-[#FF6F21] rounded-sm" />
              <div className="w-2.5 h-2.5 bg-[#FF6F21] rounded-sm" />
            </div>
          </div>

          <CubesSvg className="absolute bottom-1.5 right-2.5 w-7 pointer-events-none z-2" />

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