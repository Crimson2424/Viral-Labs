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
    <section className="relative z-[25] w-full overflow-hidden py-40 px-38">
      <GlobalGrid />

      {/* Border lines */}
      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* Header */}
      <div className="relative z-40 flex flex-col items-center mb-16">
        <p className="font-host font-normal text-base text-vl-orange uppercase text-center">
          PROCESS
        </p>
        <h2 className="font-host font-medium text-[54px] text-[#f1f1f1] tracking-[-2.16px] leading-[56px] text-center mt-4">
          The Viral Ops
          <br />
          Playbook
        </h2>
        <p className="font-host font-normal text-lg text-white text-center tracking-[-0.36px] max-w-[328px] mx-auto mt-4">
          Every mission runs through a structured growth operation framework.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-40 max-w-[1200px] mx-auto grid grid-cols-12 gap-5 p-[30px]">

        {/* ━━━ RECON CARD (col-span-7) ━━━ */}
        <div className="col-span-7 relative isolate h-[300px] rounded overflow-hidden border border-solid border-[#383838] shadow-[0px_9px_12px_#00000052] bg-[#171717]">
          {/* SVG layers */}
          <LightRay1ReconSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none" />
          <LightRay2ReconSvg className="absolute top-0 left-[238px] h-[182px] w-auto pointer-events-none" />
          <GridLinesReconSvg className="absolute top-0 right-0 h-full w-auto opacity-70 pointer-events-none" />
          <ReconLinesRadarSvg className="absolute top-0 right-0 h-full w-auto pointer-events-none" />
          <CubesSvg className="absolute bottom-[50px] right-[10px] w-[27px] pointer-events-none" />

          {/* Text content */}
          <div className="absolute z-10 top-[30px] left-[30px]">
            <h3 className="font-bricolage font-medium text-[32px] text-[#dddddd] tracking-[-1.92px]">
              Recon
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-[-0.28px] max-w-[186px] mt-2">
              We identify where attention is forming before the market reacts.
            </p>
          </div>

          {/* Bottom caption */}
          <p className="absolute z-10 left-[30px] bottom-[30px] font-host font-normal text-xs text-[#a1a1a1] max-w-[170px]">
            Trend mapping, Attention mining, Platform signal analysis.
          </p>
        </div>

        {/* ━━━ BLUEPRINT CARD (col-span-5) ━━━ */}
        <div className="col-span-5 relative isolate h-[300px] rounded overflow-hidden border border-solid border-[#383838] bg-[#171717]">
          {/* SVG layers */}
          <LinesBlueprintSvg className="absolute bottom-0 left-0 w-full h-auto opacity-50 pointer-events-none" />
          <EllipseBlueprintSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none" />
          <LightRay1BlueprintSvg className="absolute bottom-0 left-0 w-[341px] h-[54px] pointer-events-none" />
          <LightRay2BlueprintSvg className="absolute top-0 right-0 w-[290px] h-full pointer-events-none" />
          <BlueprintFlowchartSvg className="absolute top-[28px] right-[10px] w-[291px] h-[274px] pointer-events-none" />

          {/* Text content */}
          <div className="absolute z-10 top-[30px] left-[30px]">
            <h3 className="font-bricolage font-medium text-[32px] text-[#dddddd] tracking-[-1.92px]">
              Blueprint
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-[-0.28px] max-w-[157px] mt-2">
              We design repeatable creative systems, not one off experiments.
            </p>
          </div>
        </div>

        {/* ━━━ DEPLOY CARD (col-span-5) ━━━ */}
        <div className="col-span-5 relative isolate h-[300px] rounded overflow-hidden border border-solid border-[#383838] bg-[#171717]">
          {/* SVG layers */}
          <LinesDeploySvg className="absolute top-[53%] -left-1.5 w-[90%] h-auto pointer-events-none" style={{ mixBlendMode: 'plus-lighter' }} />
          <ScreensDeploySvg className="absolute top-0 left-[58%] h-full w-auto pointer-events-none z-[1] isolate" />
          <CubesSvg className="absolute bottom-[6px] left-[11px] w-[27px] pointer-events-none z-[2]" />

          {/* Text content */}
          <div className="absolute z-10 top-[30px] left-[30px]">
            <h3 className="font-bricolage font-medium text-[32px] text-[#dddddd] tracking-[-1.92px]">
              Deploy
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-[-0.28px] max-w-[196px] mt-2">
              We activate our creator network in coordinated distribution waves.
            </p>
          </div>
        </div>

        {/* ━━━ OPTIMIZE CARD (col-span-7) ━━━ */}
        <div className="col-span-7 relative isolate h-[300px] rounded overflow-hidden border border-solid border-[#383838] bg-[#171717]">
          {/* SVG layers */}
          <LightRay1OptimizeSvg className="absolute top-0 left-0 h-full w-auto pointer-events-none" />
          <GridLinesOptimizeSvg className="absolute top-0 left-[245px] h-full w-auto opacity-70 pointer-events-none" />
          <GlobeAndMobileSvg className="absolute top-[21px] left-[164px] w-[496px] h-[279px] pointer-events-none" />
          <LightRay2OptimizeSvg className="absolute bottom-0 right-0 h-[118px] w-auto pointer-events-none" />
          <CubesSvg className="absolute bottom-[50px] right-[10px] w-[27px] pointer-events-none" />

          {/* Text content */}
          <div className="absolute z-10 top-[30px] left-[30px]">
            <h3 className="font-bricolage font-medium text-[32px] text-[#dddddd] tracking-[-1.92px]">
              Optimize
            </h3>
            <p className="font-host font-normal text-sm text-[#a1a1a1] tracking-[-0.28px] max-w-[200px] mt-2">
              We refine performance through live data and behavioral feedback loops.
            </p>
          </div>

          {/* Bottom caption */}
          <p className="absolute z-10 left-[30px] bottom-[30px] font-host font-normal text-xs text-[#a1a1a1] max-w-[170px]">
            Performance loops, retention angles, install conversion tuning.
          </p>
        </div>

      </div>
    </section>
  );
}
