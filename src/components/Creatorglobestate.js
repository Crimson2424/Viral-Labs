/**
 * creatorGlobeState — Shared mutable state for the Creator Network globe.
 *
 * Same pattern as viralityState.js — mutable object that GSAP/useFrame
 * can write to without triggering React re-renders.
 *
 * Used for:
 *  - tooltipX / tooltipY: screen-space position of hovered hub,
 *    updated every frame in useFrame, read by DOM tooltip via RAF poll.
 *  - hoveredData: the full hub data object, set on hover enter, cleared on leave.
 *  - isDragging: true when user is dragging the globe.
 *  - globeYOffset: 3D Y offset driven by GSAP ScrollTrigger in RocketLaunchSection,
 *    read by CreatorGlobeOffsetGroup useFrame to position the globe lower/higher.
 */

export const creatorGlobeState = {
  // Tooltip screen position (relative to the tracked container)
  tooltipX: 0,
  tooltipY: 0,

  // Hub data (set on hover enter, null on leave)
  hoveredData: null,

  // Interaction flags
  isDragging: false,

  // Globe vertical offset for rocket launch sequence.
  // GSAP animates this from GLOBE_3D_START_Y → 0.
  // CreatorGlobeOffsetGroup reads it every frame.
  globeYOffset: 1.2,

  // Globe horizontal offset for rocket launch sequence.
  // Starts at ~1.05 to center globe (cancels the group's -1.05 position).
  // GSAP animates this → 0 so globe drifts to its CN left-half position.
  globeXOffset: 1.05,

  // Pointer interaction gate — false during rocket phases, true during CN phase.
  // CreatorGlobe checks this before processing any pointer input.
  interactive: false,
};