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
  BlueprintFlowchartSvg,
  LinesBlueprintSvg,
  EllipseBlueprintSvg,
} from "./SvgAssets";

export default function PlaybookSection() {
  return (
    <section className="relative z-25 w-full overflow-hidden py-40 px-8 md:px-16 lg:px-24 xl:px-36">
      <GlobalGrid />

      {/* Border lines */}
      <div className="pointer-events-none absolute top-0 left-[7%] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[7%] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[7%] right-[7%] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* Header */}
      <div className="relative z-40 flex flex-col items-center mb-16">
        <p className="font-host font-normal text-base text-vl-orange uppercase text-center">
          PROCESS
        </p>
        <h2 className="font-host font-medium text-5xl text-[#f1f1f1] tracking-tighter leading-none text-center mt-4">
          The Viral Ops
          <br />
          Playbook
        </h2>
        <p className="font-host font-normal text-lg text-white text-center tracking-tight max-w-xs mx-auto mt-4">
          Every mission runs through a structured growth operation framework.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-40 max-w-7xl mx-auto grid grid-cols-12 gap-5 p-7">

        {/* ━━━ RECON CARD (col-span-7) ━━━ */}
        <div className="col-span-7 relative isolate h-72 rounded overflow-hidden border border-solid border-[#383838] shadow-lg shadow-black/30 bg-[#171717]">
          {/* SVG layers */}
          <LightRay1ReconSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none" />
          <LightRay2ReconSvg className="absolute top-0 right-0 h-3/5 w-auto pointer-events-none" />
          <GridLinesReconSvg className="absolute top-0 right-0 h-full w-auto opacity-70 pointer-events-none" />
          <ReconLinesRadarSvg className="absolute top-0 right-0 h-full w-auto pointer-events-none" />
          <CubesSvg className="absolute bottom-4 right-2.5 w-7 pointer-events-none" />

          {/* Text content */}
          <div className="absolute z-10 top-7 left-7">
            <h3 className="font-bricolage font-medium text-3xl text-[#dddddd] tracking-tighter">
              Recon
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-tight max-w-48 mt-2">
              We identify where attention is forming before the market reacts.
            </p>
          </div>

          {/* Bottom caption */}
          <p className="absolute z-10 left-7 bottom-7 font-host font-normal text-xs text-[#a1a1a1] max-w-44">
            Trend mapping, Attention mining, Platform signal analysis.
          </p>
        </div>

        {/* ━━━ BLUEPRINT CARD (col-span-5) ━━━ */}
        <div className="col-span-5 relative isolate h-72 rounded overflow-hidden border border-solid border-[#383838] bg-[#171717]">
          {/* SVG layers */}
          <LinesBlueprintSvg className="absolute top-0 bottom-0 my-auto left-0 w-full h-auto opacity-50 pointer-events-none" />
          <EllipseBlueprintSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none" />
          <LightRay1BlueprintSvg className="absolute bottom-0 left-0 w-4/5 h-14 pointer-events-none" />
          <LightRay2BlueprintSvg className="absolute top-0 right-0 w-3/5 h-full pointer-events-none" />
          <BlueprintFlowchartSvg className="absolute top-7 right-2.5 w-3/5 h-[90%] pointer-events-none" />

          {/* Text content */}
          <div className="absolute z-10 top-7 left-7">
            <h3 className="font-bricolage font-medium text-3xl text-[#dddddd] tracking-tighter">
              Blueprint
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-tight max-w-40 mt-2">
              We design repeatable creative systems, not one off experiments.
            </p>
          </div>
        </div>

        {/* ━━━ DEPLOY CARD (col-span-5) ━━━ */}
        <div className="col-span-5 relative isolate h-72 rounded overflow-hidden border border-solid border-[#383838] bg-[#171717]">
          {/* SVG layers */}
          <LinesDeploySvg className="absolute top-[53%] -left-1.5 w-[90%] h-auto pointer-events-none" style={{ mixBlendMode: 'plus-lighter' }} />
          <ScreensDeploySvg className="absolute top-0 left-[58%] h-full w-auto pointer-events-none z-1 isolate" />
          <CubesSvg className="absolute bottom-1.5 left-3 w-7 pointer-events-none z-2" />

          {/* Text content */}
          <div className="absolute z-10 top-7 left-7">
            <h3 className="font-bricolage font-medium text-3xl text-[#dddddd] tracking-tighter">
              Deploy
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-tight max-w-48 mt-2">
              We activate our creator network in coordinated distribution waves.
            </p>
          </div>
        </div>

        {/* ━━━ OPTIMIZE CARD (col-span-7) ━━━ */}
        <div className="col-span-7 relative isolate h-72 rounded overflow-hidden border border-solid border-[#383838] bg-[#171717]">
          {/* SVG layers */}
          <LightRay1OptimizeSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none" />
          <GridLinesOptimizeSvg className="absolute top-0 left-1/3 h-full w-auto opacity-70 pointer-events-none" />
          <GlobeAndMobileSvg className="absolute top-5 left-1/4 w-3/4 h-[90%] pointer-events-none" />
          <LightRay2OptimizeSvg className="absolute bottom-0 right-0 h-28 w-auto pointer-events-none" />
          <CubesSvg className="absolute bottom-12 right-2.5 w-7 pointer-events-none" />

          {/* Text content */}
          <div className="absolute z-10 top-7 left-7">
            <h3 className="font-bricolage font-medium text-3xl text-[#dddddd] tracking-tighter">
              Optimize
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-tight max-w-52 mt-2">
              We refine performance through live data and behavioral feedback loops.
            </p>
          </div>

          {/* Bottom caption */}
          <p className="absolute z-10 left-7 bottom-7 font-host font-normal text-xs text-[#a1a1a1] max-w-44">
            Performance loops, retention angles, install conversion tuning.
          </p>
        </div>

      </div>
    </section>
  );
}
