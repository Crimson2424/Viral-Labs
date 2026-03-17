import { forwardRef } from "react";

/**
 * All SVG assets as inline React components.
 * Every element is accessible via refs for GSAP animation.
 *
 * Usage:
 *   import { ViralLabsLogo, ArrowIcon, ... } from "./SvgAssets";
 */

// ── Viral Labs Logo (13×13) ──
export const ViralLabsLogo = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 0.682246V1.3511V2.01878V2.40452C0 2.52779 0.0999335 2.62772 0.223208 2.62772H0.676259C3.10505 2.63021 8.11332 2.6337 8.71602 2.62772C9.31872 2.62175 9.42692 3.09595 9.40568 3.3338L9.43567 11.3883V11.7184C9.43567 11.9033 9.58557 12.0532 9.77048 12.0532H10.0466H11.4109H11.8287C11.9519 12.0532 12.0519 11.9533 12.0519 11.83V11.7917C12.0469 9.4805 12.0399 4.84083 12.0519 4.77209C12.0639 4.70336 11.9944 4.53425 11.9582 4.45828C10.5589 3.0586 7.73176 0.233068 7.61782 0.128464C7.50387 0.0238607 7.35295 -0.000751861 7.29173 1.72957e-05H7.10652H0.677771H0.223208C0.0999337 1.72957e-05 0 0.0999511 0 0.223226V0.682246Z"
      fill="white"
    />
    <path
      d="M9.04931 11.6991C9.0655 11.9803 8.83244 12.0524 8.71388 12.0532L6.69556 12.0363H6.65134C6.50968 12.0363 6.39484 11.9214 6.39484 11.7798C6.40159 10.1091 6.41103 6.65829 6.39484 6.22021C6.37865 5.78214 5.99291 5.65148 5.80206 5.64091H0.669517H0.467106H0.181571C0.0812922 5.64091 0 5.55962 0 5.45934V3.35542V3.23278C0 3.1095 0.0999337 3.00957 0.223208 3.00957H0.232889C1.49844 3.00669 4.07406 3.00265 4.25218 3.00957C4.4303 3.01649 4.54808 3.08162 4.58471 3.11333C5.92833 4.46502 8.66068 7.203 8.84111 7.34134C9.02155 7.47968 9.05509 7.71409 9.04931 7.81401V10.039C9.04256 10.4751 9.03311 11.4178 9.04931 11.6991Z"
      fill="white"
    />
  </svg>
));

// ── Arrow Icon (10×10) — used in "Go Viral" & "Viral Results" ──
export const ArrowIcon = forwardRef(({ className = "", size = 10 }, ref) => (
  <svg
    ref={ref}
    width={size}
    height={size}
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0.75 8.75L8.75 0.75M8.75 0.75H0.75M8.75 0.75V8.75"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
));

// ── Grid Crosshair (9×9) — corner markers ──
export const GridCrosshair = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="9"
    height="9"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line x1="4.5" y1="0.5" x2="4.5" y2="8.5" stroke="white" strokeLinecap="round" />
    <line x1="0.5" y1="4.5" x2="8.5" y2="4.5" stroke="white" strokeLinecap="round" />
  </svg>
));

// ── Grid Line Top (horizontal) — width controlled by CSS ──
export const GridLineTop = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="100%"
    height="1"
    viewBox="0 0 1280 1"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <line y1="0.5" x2="1280" y2="0.5" stroke="white" strokeOpacity="0.2" />
  </svg>
));

// ── Grid Line Left (1×945) — vertical line ──
export const GridLineLeft = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="1"
    height="945"
    viewBox="0 0 1 945"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <line x1="0.5" y1="1568" x2="0.500069" y2="-17" stroke="white" strokeOpacity="0.2" />
  </svg>
));

// ── Grid Line Right (1×945) — vertical line ──
export const GridLineRight = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="1"
    height="945"
    viewBox="0 0 1 945"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <line x1="0.5" y1="1509" x2="0.500067" y2="-17" stroke="white" strokeOpacity="0.2" />
  </svg>
));

// ── Screen Grid (1280×892) — full grid mesh ──
// viewBox crops at 892px; paths extend to 1278 (matching Figma frame behavior)
// width/height 100% — container controls size
export const ScreenGrid = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="100%"
    height="100%"
    viewBox="0 0 1280 892"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    overflow="hidden"
    preserveAspectRatio="none"
  >
    <path
      d="M2.25294 1278L1280 1278L1280 0M1280 1210.74L2.25293 1210.74M1280 1143.47L2.25293 1143.47M1280 1076.21L2.25293 1076.21M1280 1008.95L2.25293 1008.95M1280 941.685L2.25292 941.685M1280 874.422L2.25292 874.422M1280 807.158L2.25292 807.159M1280 739.895L2.25291 739.896M1280 672.632L2.25291 672.632M1280 605.369L2.25291 605.369M1280 538.106L2.2529 538.106M1280 470.843L2.2529 470.843M1280 403.58L2.2529 403.58M1280 336.317L2.2529 336.317M1280 269.054L2.25289 269.054M1280 201.791L2.25289 201.791M1280 134.528L2.25289 134.528M1280 67.2646L2.25288 67.2649M1280 0.00158691L2.25288 0.00183105M1212.63 0V1278M1145.26 0L1145.26 1278M1077.89 0L1077.89 1278M1010.53 0L1010.53 1278M943.158 0V1278M875.789 0L875.79 1278M808.421 0L808.421 1278M741.053 0L741.053 1278M673.684 0L673.685 1278M606.316 0L606.316 1278M538.948 0L538.948 1278M471.579 0L471.579 1278M404.211 0L404.211 1278M336.842 0L336.842 1278M269.474 0L269.474 1278M202.105 0L202.106 1278M134.737 0L134.737 1278M67.3684 0L67.3686 1278M0 0L0.000187485 1278"
      stroke="white"
      strokeOpacity="0.08"
    />
  </svg>
));

// ── Navbar Glow Line — width controlled by CSS ──
export const NavGlowLine = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="100%"
    height="13"
    viewBox="0 0 88 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <g filter="url(#navGlow0)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="77" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#navGlow1)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="77" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#navGlow2)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="77" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#navGlow3)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="77" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#navGlow4)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="77" y2="11.5" stroke="#FF6F21" />
    </g>
    <defs>
      <filter id="navGlow0" x="10" y="10" width="68" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="navGlow1" x="10" y="10" width="68" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="navGlow2" x="5" y="5" width="78" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="navGlow3" x="5" y="5" width="78" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="navGlow4" x="0" y="0" width="88" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1" />
      </filter>
    </defs>
  </svg>
));

// ── CTA Glow Line (182×23) — wider orange glow under "Viral Results" ──
export const CtaGlowLine = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="182"
    height="23"
    viewBox="0 0 182 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g filter="url(#ctaGlow0)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="171" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#ctaGlow1)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="171" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#ctaGlow2)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="171" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#ctaGlow3)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="171" y2="11.5" stroke="#FF6F21" />
    </g>
    <g filter="url(#ctaGlow4)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="171" y2="11.5" stroke="#FF6F21" />
    </g>
    <defs>
      <filter id="ctaGlow0" x="10" y="10" width="162" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="ctaGlow1" x="10" y="10" width="162" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="ctaGlow2" x="5" y="5" width="172" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="ctaGlow3" x="5" y="5" width="172" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="ctaGlow4" x="0" y="0" width="182" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1" />
      </filter>
    </defs>
  </svg>
));

// ══════════════════════════════════════════════════
// Playbook Section SVGs
// ══════════════════════════════════════════════════

// ── Light Ray 1 Recon (154×300) — vertical orange glow, left edge ──
export const LightRay1ReconSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="154" height="300" viewBox="0 0 154 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_1_548)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M-42.3183 227.854L-31.6004 252.158L-20.8826 276.462L47.8703 200.3L-3.41347 33.5914L-42.3183 227.854Z" fill="url(#paint0_linear_1_548)" />
    </g>
    <g filter="url(#filter1_f_1_548)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M-42.3168 227.859L-31.599 252.163L-20.8812 276.467L103.956 185.409L26.9499 -60.0015L-42.3168 227.859Z" fill="url(#paint1_linear_1_548)" />
    </g>
    <g opacity="0.3" filter="url(#filter2_f_1_548)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M-42.3177 227.857L-31.5999 252.161L-20.8821 276.465L109.26 199.369L13.9267 -27.4233L-42.3177 227.857Z" fill="url(#paint2_linear_1_548)" />
    </g>
    <defs>
      <filter id="filter0_f_1_548" x="-76.3184" y="-0.408691" width="158.189" height="310.871" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="17" result="effect1_foregroundBlur_1_548" />
      </filter>
      <filter id="filter1_f_1_548" x="-86.3169" y="-104.001" width="234.272" height="424.469" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_548" />
      </filter>
      <filter id="filter2_f_1_548" x="-86.3176" y="-71.4233" width="239.577" height="391.888" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_548" />
      </filter>
      <linearGradient id="paint0_linear_1_548" x1="-38.8043" y1="253.949" x2="34.4351" y2="233.166" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF9F5" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint1_linear_1_548" x1="-6.81907" y1="212.529" x2="100.378" y2="174.631" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint2_linear_1_548" x1="-6.81993" y1="212.525" x2="81.4442" y2="192.774" gradientUnits="userSpaceOnUse">
        <stop stopColor="#CD4800" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
));

// ── Light Ray 2 Recon (423×182) — angled orange glow, top-right ──
export const LightRay2ReconSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="423" height="182" viewBox="0 0 423 182" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_1_426)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M515.429 -36.834L482.095 -8.11397L448.761 20.6061L234.929 -69.3946L394.43 -266.395L515.429 -36.834Z" fill="url(#paint0_linear_1_426)" />
    </g>
    <g filter="url(#filter1_f_1_426)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M515.429 -36.834L482.095 -8.11402L448.761 20.606L60.5 -86.9982L299.999 -377L515.429 -36.834Z" fill="url(#paint1_linear_1_426)" />
    </g>
    <g opacity="0.3" filter="url(#filter2_f_1_426)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M515.429 -36.8325L482.095 -8.11245L448.761 20.6076L44 -70.4965L340.501 -338.497L515.429 -36.8325Z" fill="url(#paint2_linear_1_426)" />
    </g>
    <defs>
      <filter id="filter0_f_1_426" x="200.929" y="-300.395" width="348.5" height="355.001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="17" result="effect1_foregroundBlur_1_426" />
      </filter>
      <filter id="filter1_f_1_426" x="16.5" y="-421" width="542.929" height="485.606" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_426" />
      </filter>
      <filter id="filter2_f_1_426" x="0" y="-382.498" width="559.429" height="447.105" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_426" />
      </filter>
      <linearGradient id="paint0_linear_1_426" x1="504.5" y1="-5.99805" x2="346.5" y2="-123.998" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF9F5" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint1_linear_1_426" x1="405.026" y1="-54.95" x2="204" y2="-241.998" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint2_linear_1_426" x1="405.026" y1="-54.9499" x2="191" y2="-180.998" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
));

// ── Light Ray 1 Blueprint (341×54) — bottom-left orange glow ──
export const LightRay1BlueprintSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="341" height="54" viewBox="0 0 341 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_1_614)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M8.27161 43.9996L-16.0323 54.7174L-40.3363 65.4353L35.8255 134.188L202.535 82.9044L8.27161 43.9996Z" fill="url(#paint0_linear_1_614)" />
    </g>
    <g filter="url(#filter1_f_1_614)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M8.26658 44.001L-16.0373 54.7189L-40.3413 65.4367L50.7174 190.273L296.127 113.268L8.26658 44.001Z" fill="url(#paint1_linear_1_614)" />
    </g>
    <g opacity="0.3" filter="url(#filter2_f_1_614)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M8.26917 44.0001L-16.0348 54.718L-40.3387 65.4358L36.7569 195.578L263.549 100.245L8.26917 44.0001Z" fill="url(#paint2_linear_1_614)" />
    </g>
    <defs>
      <filter id="filter0_f_1_614" x="-74.3364" y="9.99951" width="310.871" height="158.188" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="17" result="effect1_foregroundBlur_1_614" />
      </filter>
      <filter id="filter1_f_1_614" x="-84.3413" y="0.000976562" width="424.469" height="234.272" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_614" />
      </filter>
      <filter id="filter2_f_1_614" x="-84.3389" y="0" width="391.888" height="239.578" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_614" />
      </filter>
      <linearGradient id="paint0_linear_1_614" x1="-17.8229" y1="47.5136" x2="2.9595" y2="120.753" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF9F5" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint1_linear_1_614" x1="23.597" y1="79.4988" x2="61.4945" y2="186.696" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint2_linear_1_614" x1="23.6008" y1="79.4979" x2="43.3515" y2="167.762" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
));

// ── Light Ray 2 Blueprint (290×300) — right-side angled glow ──
export const LightRay2BlueprintSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="290" height="300" viewBox="0 0 290 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_1_607)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M515.429 -42.2187L482.095 -70.9388L448.761 -99.6588L234.929 -9.65818L394.429 187.342L515.429 -42.2187Z" fill="url(#paint0_linear_1_607)" />
    </g>
    <g filter="url(#filter1_f_1_607)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M515.429 -42.2187L482.095 -70.9387L448.761 -99.6587L60.4998 7.94543L299.999 297.947L515.429 -42.2187Z" fill="url(#paint1_linear_1_607)" />
    </g>
    <g opacity="0.3" filter="url(#filter2_f_1_607)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M515.429 -42.2202L482.095 -70.9403L448.761 -99.6603L43.9998 -8.55624L340.5 259.445L515.429 -42.2202Z" fill="url(#paint2_linear_1_607)" />
    </g>
    <defs>
      <filter id="filter0_f_1_607" x="200.929" y="-133.659" width="348.5" height="355.001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="17" result="effect1_foregroundBlur_1_607" />
      </filter>
      <filter id="filter1_f_1_607" x="16.5" y="-143.659" width="542.929" height="485.606" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_607" />
      </filter>
      <filter id="filter2_f_1_607" x="0" y="-143.66" width="559.429" height="447.105" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_607" />
      </filter>
      <linearGradient id="paint0_linear_1_607" x1="504.5" y1="-73.0547" x2="346.5" y2="44.9453" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF9F5" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint1_linear_1_607" x1="405.025" y1="-24.1028" x2="204" y2="162.945" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint2_linear_1_607" x1="405.025" y1="-24.1028" x2="191" y2="101.945" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
));

// ── Light Ray 1 Optimize (62×300) — vertical orange glow, left edge ──
export const LightRay1OptimizeSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="62" height="300" viewBox="0 0 62 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_1_1018)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M17.5741 21.2701L6.85629 -3.03381L-3.86154 -27.3378L-72.6144 48.8241L-21.3307 215.533L17.5741 21.2701Z" fill="url(#paint0_linear_1_1018)" />
    </g>
    <g filter="url(#filter1_f_1_1018)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M17.5727 21.2651L6.85488 -3.03881L-3.86295 -27.3428L-128.7 63.7159L-51.694 309.126L17.5727 21.2651Z" fill="url(#paint1_linear_1_1018)" />
    </g>
    <g opacity="0.3" filter="url(#filter2_f_1_1018)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M17.5736 21.2677L6.85576 -3.03625L-3.86208 -27.3402L-134.004 49.7554L-38.6709 276.548L17.5736 21.2677Z" fill="url(#paint2_linear_1_1018)" />
    </g>
    <defs>
      <filter id="filter0_f_1_1018" x="-106.615" y="-61.3379" width="158.189" height="310.871" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="17" result="effect1_foregroundBlur_1_1018" />
      </filter>
      <filter id="filter1_f_1_1018" x="-172.7" y="-71.3428" width="234.272" height="424.469" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_1018" />
      </filter>
      <filter id="filter2_f_1_1018" x="-178.004" y="-71.3403" width="239.578" height="391.888" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_1018" />
      </filter>
      <linearGradient id="paint0_linear_1_1018" x1="14.0601" y1="-4.82438" x2="-59.1792" y2="15.958" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF9F5" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint1_linear_1_1018" x1="-17.9251" y1="36.5955" x2="-125.122" y2="74.493" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint2_linear_1_1018" x1="-17.9242" y1="36.5994" x2="-106.188" y2="56.35" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
));

// ── Light Ray 2 Optimize (336×118) — bottom-right orange glow ──
export const LightRay2OptimizeSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="336" height="118" viewBox="0 0 336 118" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_1_1004)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M331.856 195.578L356.16 184.86L380.464 174.142L304.302 105.389L137.593 156.673L331.856 195.578Z" fill="url(#paint0_linear_1_1004)" />
    </g>
    <g filter="url(#filter1_f_1_1004)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M331.861 195.577L356.165 184.859L380.469 174.141L289.41 49.3043L44 126.31L331.861 195.577Z" fill="url(#paint1_linear_1_1004)" />
    </g>
    <g opacity="0.3" filter="url(#filter2_f_1_1004)" style={{ mixBlendMode: "plus-lighter" }}>
      <path d="M331.858 195.577L356.162 184.86L380.466 174.142L303.371 43.9999L76.5782 139.333L331.858 195.577Z" fill="url(#paint2_linear_1_1004)" />
    </g>
    <defs>
      <filter id="filter0_f_1_1004" x="103.593" y="71.3896" width="310.871" height="158.188" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="17" result="effect1_foregroundBlur_1_1004" />
      </filter>
      <filter id="filter1_f_1_1004" x="0" y="5.3042" width="424.469" height="234.272" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_1004" />
      </filter>
      <filter id="filter2_f_1_1004" x="32.5781" y="0" width="391.888" height="239.578" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="22" result="effect1_foregroundBlur_1_1004" />
      </filter>
      <linearGradient id="paint0_linear_1_1004" x1="357.95" y1="192.064" x2="337.168" y2="118.825" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF9F5" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint1_linear_1_1004" x1="316.53" y1="160.079" x2="278.633" y2="52.882" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="paint2_linear_1_1004" x1="316.527" y1="160.08" x2="296.776" y2="71.8156" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF5100" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
));

// ── Grid Lines Optimize (415×300) — background grid mesh ──
export const GridLinesOptimizeSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="415" height="300" viewBox="0 0 415 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7" clipPath="url(#clip0_1_734)">
      <path d="M1.01734 486.096L578 486.096L578 -91.0007M578 455.723L1.01734 455.723M578 425.349L1.01734 425.349M578 394.976L1.01734 394.976M578 364.602L1.01734 364.602M578 334.229L1.01734 334.229M578 303.855L1.01733 303.855M578 273.482L1.01733 273.482M578 243.108L1.01733 243.108M578 212.735L1.01733 212.735M578 182.361L1.01733 182.361M578 151.988L1.01733 151.988M578 121.614L1.01733 121.615M578 91.241L1.01732 91.2411M578 60.8675L1.01732 60.8676M578 30.494L1.01732 30.4941M578 0.120468L1.01732 0.120578M578 -30.253L1.01732 -30.2529M578 -60.6265L1.01732 -60.6264M578 -91L1.01732 -90.9998M547.579 -91.0007V486.096M517.158 -91.0007L517.158 486.096M486.737 -91.0007L486.737 486.096M456.316 -91.0007L456.316 486.096M425.895 -91.0007V486.096M395.474 -91.0007L395.474 486.096M365.053 -91.0007L365.053 486.096M334.632 -91.0007L334.632 486.096M304.211 -91.0007L304.211 486.096M273.79 -91.0007L273.79 486.096M243.369 -91.0007L243.369 486.096M212.947 -91.0007L212.948 486.096M182.526 -91.0007L182.526 486.096M152.105 -91.0007L152.105 486.096M121.684 -91.0007L121.684 486.096M91.2632 -91.0007L91.2633 486.096M60.8421 -91.0007L60.8422 486.096M30.4211 -91.0007L30.4211 486.096M0 -91.0007L8.46611e-05 486.096" stroke="white" strokeOpacity="0.06" strokeWidth="0.451562" />
    </g>
    <defs>
      <clipPath id="clip0_1_734">
        <rect width="578" height="550.455" fill="white" transform="translate(0 -91)" />
      </clipPath>
    </defs>
  </svg>
));

// ── Recon Lines + Radar (388×300) — combined circuit lines and radar dial ──
export const ReconLinesRadarSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/reconLinesRadar.svg" alt="" className={className} />
));

// ── Cubes (27×42) — two small orange glowing squares ──
export const CubesSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="27" height="42" viewBox="0 0 27 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
    <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    <g filter="url(#filter0_f_1_474)">
      <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
      <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    </g>
    <g filter="url(#filter1_f_1_474)">
      <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
      <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    </g>
    <defs>
      <filter id="filter0_f_1_474" x="0" y="0" width="27" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_1_474" />
      </filter>
      <filter id="filter1_f_1_474" x="0" y="0" width="27" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_1_474" />
      </filter>
    </defs>
  </svg>
));

// ── IMG-based components (too large to inline) ──

export const GlobeAndMobileSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Globe and mobile.svg" alt="" className={className} />
));

export const LinesDeploySvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/lines deploy.svg" alt="" className={className} />
));

export const ScreensDeploySvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/screens deploy.svg" alt="" className={className} />
));

export const BlueprintFlowchartSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/blueprint-flowchart.svg" alt="" className={className} />
));

export const LinesBlueprintSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Lines blueprint.svg" alt="" className={className} />
));

export const ImageHiddenBlueprintSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Image [hidden] blueprint.svg" alt="" className={className} />
));

export const EllipseBlueprintSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="276" height="300" viewBox="0 0 276 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_1_606)">
      <ellipse cx="56.5" cy="152" rx="163.5" ry="211" fill="#171717" />
    </g>
    <defs>
      <filter id="filter0_f_1_606" x="-163" y="-115" width="439" height="534" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="28" result="effect1_foregroundBlur_1_606" />
      </filter>
    </defs>
  </svg>
));

// ══════════════════════════════════════════════════
// Viral Engine Section SVGs
// ══════════════════════════════════════════════════

// ── Rocket Frame parts (img-based, too complex to inline) ──

export const RocketFrame2Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket frame 2.svg" alt="" className={className} />
));

export const RocketFrame3Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket frame 3.svg" alt="" className={className} />
));

export const RocketFrame4Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket frame 4.svg" alt="" className={className} />
));

export const RocketFrame5Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket Frame 5.svg" alt="" className={className} />
));

export const RocketFrame6Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket frame 6.svg" alt="" className={className} />
));

export const RocketFrame7Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Rocket Frame 7.svg" alt="" className={className} />
));

// ── Connector line (diagonal + horizontal, bridges rocket to labels) ──
export const LinesVectorRocketSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/lines vector rocket.svg" alt="" className={className} />
));

// ── Glow Line (193×23) — orange glow scan line ──
export const GlowLineSvg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Glow-line.svg" alt="" className={className} />
));

// ── Line 744 (134×1) — gray stat divider line ──
export const Line744Svg = forwardRef(({ className = "" }, ref) => (
  <img ref={ref} src="/svgs/Line 744.svg" alt="" className={className} />
));

// ── Corner bracket (10×10) — orange L-shaped corner marker ──
export const CornerVectorRocketSvg = forwardRef(({ className = "", style = {} }, ref) => (
  <img ref={ref} src="/svgs/corner Vector rocket.svg" alt="" className={className} style={style} />
));

// ── Grid Lines Recon (445×300) — background grid mesh for recon card ──
export const GridLinesReconSvg = forwardRef(({ className = "" }, ref) => (
  <svg ref={ref} className={className} width="445" height="300" viewBox="0 0 445 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.7" clipPath="url(#clip0_1_430)">
      <path d="M1.01734 486.096L578 486.096L578 -91.0007M578 455.723L1.01734 455.723M578 425.349L1.01734 425.349M578 394.976L1.01734 394.976M578 364.602L1.01734 364.602M578 334.229L1.01734 334.229M578 303.855L1.01733 303.855M578 273.482L1.01733 273.482M578 243.108L1.01733 243.108M578 212.735L1.01733 212.735M578 182.361L1.01733 182.361M578 151.988L1.01733 151.988M578 121.614L1.01733 121.615M578 91.241L1.01732 91.2411M578 60.8675L1.01732 60.8676M578 30.494L1.01732 30.4941M578 0.120468L1.01732 0.120578M578 -30.253L1.01732 -30.2529M578 -60.6265L1.01732 -60.6264M578 -91L1.01732 -90.9998M547.579 -91.0007V486.096M517.158 -91.0007L517.158 486.096M486.737 -91.0007L486.737 486.096M456.316 -91.0007L456.316 486.096M425.895 -91.0007V486.096M395.474 -91.0007L395.474 486.096M365.053 -91.0007L365.053 486.096M334.632 -91.0007L334.632 486.096M304.211 -91.0007L304.211 486.096M273.79 -91.0007L273.79 486.096M243.369 -91.0007L243.369 486.096M212.947 -91.0007L212.948 486.096M182.526 -91.0007L182.526 486.096M152.105 -91.0007L152.105 486.096M121.684 -91.0007L121.684 486.096M91.2632 -91.0007L91.2633 486.096M60.8421 -91.0007L60.8422 486.096M30.4211 -91.0007L30.4211 486.096M0 -91.0007L8.46611e-05 486.096" stroke="white" strokeOpacity="0.06" strokeWidth="0.451562" />
    </g>
    <defs>
      <clipPath id="clip0_1_430">
        <rect width="578" height="550.455" fill="white" transform="translate(0 -91)" />
      </clipPath>
    </defs>
  </svg>
));