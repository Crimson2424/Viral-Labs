/**
 * GridOverlay — Grid lines, corner markers, screen grid, and texture overlay.
 *
 * Z-index stacking (front to back):
 * z-40 → Text, buttons, UI (set on content in HeroSection)
 * z-30 → Grid lines + crosshairs
 * z-20 → Texture (global, full page)
 * z-10 → Screen grid
 * z-0  → BG plane (R3F canvas)
 */

import {
    ScreenGrid,
    GridLineLeft,
    GridLineRight,
    GridCrosshair,
  } from "./SvgAssets";
  
  export default function GridOverlay({ children, showTexture = true }) {
    return (
      <div className="relative w-full h-full">
        {children}
  
        {/* ── z-30: Grid lines + crosshairs ── */}
        <GridLineLeft
          className="pointer-events-none absolute top-0 left-[105px] w-px h-full z-30"
          aria-hidden="true"
        />
        <GridLineRight
          className="pointer-events-none absolute top-0 right-[105px] w-px h-full z-30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[56px] left-[105px] right-[105px] h-px bg-white/20 z-30"
          aria-hidden="true"
        />
        <GridCrosshair
          className="pointer-events-none absolute top-[52px] left-[101px] z-30"
          aria-hidden="true"
        />
        <GridCrosshair
          className="pointer-events-none absolute top-[52px] right-[101px] z-30"
          aria-hidden="true"
        />
  
        {/* ── z-20: Grain texture overlay (global, full page) ── */}
        {showTexture && (
          <div
            className="pointer-events-none fixed inset-0 mix-blend-lighten  z-20"
            style={{
              backgroundImage: "url('/images/textures.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          />
        )}
  
        {/* ── z-10: Screen Grid ── */}
        <div
          className="pointer-events-none absolute top-[56px] left-[105px] right-[105px] bottom-0 overflow-hidden z-10"
          aria-hidden="true"
        >
          <ScreenGrid className="w-full h-full" />
        </div>
      </div>
    );
  }