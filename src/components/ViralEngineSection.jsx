import GlobalGrid from "./Globalgrid";
import {
  CubesSvg,
  RocketFrame2Svg,
  RocketFrame3Svg,
  RocketFrame4Svg,
  RocketFrame5Svg,
  RocketFrame6Svg,
  RocketFrame7Svg,
  LinesVectorRocketSvg,
  GlowLineSvg,
  Line744Svg,
  CornerVectorRocketSvg,
} from "./SvgAssets";

const pipelineStages = [
  {
    title: "SIGNAL INPUT",
    description: "Trend Data → Platform Trend Momentum",
  },
  {
    title: "PROCESSING LAYER",
    description: "Creative Testing + Iteration",
  },
  {
    title: "DISTRIBUTION GRID",
    description: "Creator Deployment + Reach Expansion",
  },
  {
    title: "OUTPUT VIRALITY",
    description: "Views → Viral Engagement → Installs",
  },
];

const statsData = [
  { label: "Signals Tracked", value: "25,000+" },
  { label: "Tests Per Cycle", value: "500+" },
  { label: "Creator Nodes", value: "3,200+" },
  { label: "AVG Install Lift", value: "42%" },
];

function StageLabel({ title, description }) {
  return (
    <div className="relative ml-[45%] ">
      <CubesSvg className="absolute -left-9 top-0.5 w-7 pointer-events-none" />
      <h4 className="font-bricolage text-2xl text-white tracking-tighter leading-normal">
        {title}
      </h4>
      <p className="font-host text-lg text-[#a1a1a1] tracking-tighter leading-tight mt-2">
        {description}
      </p>
    </div>
  );
}

export default function ViralEngineSection() {
  return (
    <section className="relative z-25 w-full overflow-hidden py-20 px-8 md:px-16 lg:px-24 xl:px-36">
      <GlobalGrid />

      {/* Border lines */}
      <div className="pointer-events-none absolute top-0 left-[7%] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[7%] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[7%] right-[7%] h-px bg-white/20 z-30" aria-hidden="true" />

      {/* Main Content */}
      <div className="relative z-40 max-w-7xl mx-auto">

        {/* LEFT COLUMN — absolutely positioned alongside the grid */}
        <div className="absolute left-0 top-0 w-[24%] flex flex-col h-full z-10">

          {/* Header */}
          <div className="flex flex-col gap-1">
            <p className="font-host text-base text-vl-orange uppercase tracking-wide">
              STRUCTURED IN. VIRAL OUT.
            </p>
            <h2 className="font-host font-medium text-6xl text-[#f1f1f1] tracking-tighter leading-[1.04]">
              Inside The
              <br />
              Viral Engine
            </h2>
          </div>

          {/* Glow line */}
          <GlowLineSvg className="w-54 h-auto mt-35 -ml-3" />

          {/* Body text */}
          <div className="flex flex-col gap-6 mt-6">
            <p className="font-host text-base text-white tracking-tighter leading-normal">
              Behind every campaign is a structured growth system. The Viral
              Engine connects creator networks, content distribution pathways,
              and performance feedback loops into a single operating framework.
            </p>
            <p className="font-host text-base text-white tracking-tight leading-normal">
              It&apos;s designed to turn attention into installs. It&apos;s not a
              campaign. It&apos;s a machine.
            </p>
          </div>

          {/* Spacer */}
          <div className="flex my-25" />

          {/* Stats box with corner brackets
              Base SVG is ⌞ (bottom-left: lines go UP and RIGHT).
              ⌜ top-left     = scaleY(-1)   → flip vertical
              ⌝ top-right    = scale(-1,-1)  → flip both
              ⌟ bottom-right = scaleX(-1)    → flip horizontal
              ⌞ bottom-left  = (none)        → base orientation
          */}
          <div className=" relative inline-flex flex-col gap-4 p-5 max-w-50 items-center">
            {/* ⌜ Top-left */}
            {/* ⌝ Top-right */}
            <CornerVectorRocketSvg
              className="absolute top-0 right-0 w-2.5 h-2.5"
              style={{ transform: "scaleY(-1)" }}
            />
            <CornerVectorRocketSvg
              className="absolute top-0 left-0 w-2.5 h-2.5"
              style={{ transform: "scale(-1, -1)" }}
            />
            {/* ⌟ Bottom-right */}
            <CornerVectorRocketSvg
              className="absolute bottom-0 left-0 w-2.5 h-2.5"
              style={{ transform: "scaleX(-1)" }}
            />
            {/* ⌞ Bottom-left */}
            <CornerVectorRocketSvg
              className="absolute bottom-0 right-0 w-2.5 h-2.5"
            />

            {statsData.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 my-2">
                <span className="font-host text-sm text-[#a1a1a1] leading-2 tracking-tighter">
                  {stat.label}
                </span>
                <Line744Svg className="w-32 h-px" />
                <span className="font-host text-xl text-white leading-2">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER + RIGHT COLUMNS */}
        <div className="ml-[28%] pt-35 grid grid-cols-9 gap-x-4 gap-y-6">

          {/* ━━━ ROW 1: Frames 2 + 3 → SIGNAL INPUT ━━━ */}
          <div className="col-span-5 flex flex-col gap-6">
            <RocketFrame2Svg className="w-full" />
            <RocketFrame3Svg className="w-full" />
          </div>
          <div className="col-span-4 flex flex-col justify-start">
            <LinesVectorRocketSvg className="w-full h-auto pointer-events-none" />
            <StageLabel {...pipelineStages[0]} />
          </div>

          {/* ━━━ ROW 2: Frames 4 + 5 → PROCESSING LAYER ━━━ */}
          <div className="col-span-5 flex flex-col gap-6">
            <RocketFrame4Svg className="w-full" />
            <RocketFrame5Svg className="w-full" />
          </div>
          <div className="col-span-4 flex flex-col justify-start">
            <LinesVectorRocketSvg className="w-full h-auto pointer-events-none" />
            <StageLabel {...pipelineStages[1]} />
          </div>

          {/* ━━━ ROW 3: Frame 6 → DISTRIBUTION GRID ━━━ */}
          <div className="col-span-5">
            <RocketFrame6Svg className="w-full" />
          </div>
          <div className="col-span-4 flex flex-col justify-start">
            <LinesVectorRocketSvg className="w-full h-auto pointer-events-none" />
            <StageLabel {...pipelineStages[2]} />
          </div>

          {/* ━━━ ROW 4: Frame 7 → OUTPUT VIRALITY ━━━ */}
          <div className="col-span-5">
            <RocketFrame7Svg className="w-full" />
          </div>
          <div className="col-span-4 flex flex-col justify-start">
            <LinesVectorRocketSvg className="w-full h-auto pointer-events-none" />
            <StageLabel {...pipelineStages[3]} />
          </div>

        </div>
      </div>

      {/* Bottom border line */}
      <div className="pointer-events-none absolute bottom-0 left-[7%] right-[7%] h-px bg-white/20 z-30" aria-hidden="true" />
    </section>
  );
}