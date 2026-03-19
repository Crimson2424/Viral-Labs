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
 */

export const creatorGlobeState = {
    // Tooltip screen position (relative to the tracked container)
    tooltipX: 0,
    tooltipY: 0,
  
    // Hub data (set on hover enter, null on leave)
    hoveredData: null,
  
    // Interaction flags
    isDragging: false,
  };