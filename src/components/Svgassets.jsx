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

export const CardGlowH = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="82"
    height="23"
    viewBox="0 0 82 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g filter="url(#cardGlowH0)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="71" y2="11.5" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowH1)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="71" y2="11.5" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowH2)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="71" y2="11.5" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowH3)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="71" y2="11.5" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowH4)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11" y1="11.5" x2="71" y2="11.5" stroke="#F05A1F" />
    </g>
    <defs>
      <filter id="cardGlowH0" x="10" y="10" width="62" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="cardGlowH1" x="10" y="10" width="62" height="3" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="cardGlowH2" x="5" y="5" width="72" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="cardGlowH3" x="5" y="5" width="72" height="13" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="cardGlowH4" x="0" y="0" width="82" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1" />
      </filter>
    </defs>
  </svg>
));
 
// ── Card Vertical Glow Line (23×122) — orange glow accent on card edges ──
export const CardGlowV = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="23"
    height="122"
    viewBox="0 0 23 122"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g filter="url(#cardGlowV0)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11.5" y1="111" x2="11.5" y2="11" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowV1)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11.5" y1="111" x2="11.5" y2="11" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowV2)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11.5" y1="111" x2="11.5" y2="11" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowV3)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11.5" y1="111" x2="11.5" y2="11" stroke="#F05A1F" />
    </g>
    <g filter="url(#cardGlowV4)" style={{ mixBlendMode: "plus-lighter" }}>
      <line x1="11.5" y1="111" x2="11.5" y2="11" stroke="#F05A1F" />
    </g>
    <defs>
      <filter id="cardGlowV0" x="10" y="10" width="3" height="102" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="cardGlowV1" x="10" y="10" width="3" height="102" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="0.5" result="effect1" />
      </filter>
      <filter id="cardGlowV2" x="5" y="5" width="13" height="112" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="cardGlowV3" x="5" y="5" width="13" height="112" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="3" result="effect1" />
      </filter>
      <filter id="cardGlowV4" x="0" y="0" width="23" height="122" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5.5" result="effect1" />
      </filter>
    </defs>
  </svg>
));
 
// ── Card Cubes (27×42) — two glowing orange squares ──
export const CardCubes = forwardRef(({ className = "" }, ref) => (
  <svg
    ref={ref}
    width="27"
    height="42"
    viewBox="0 0 27 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
    <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    <g filter="url(#cardCubes0)">
      <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
      <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    </g>
    <g filter="url(#cardCubes1)">
      <rect x="10" y="32" width="7" height="7" transform="rotate(-90 10 32)" fill="#FF6F21" />
      <rect x="10" y="17" width="7" height="7" transform="rotate(-90 10 17)" fill="#FF6F21" />
    </g>
    <defs>
      <filter id="cardCubes0" x="0" y="0" width="27" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1" />
      </filter>
      <filter id="cardCubes1" x="0" y="0" width="27" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="5" result="effect1" />
      </filter>
    </defs>
  </svg>
));