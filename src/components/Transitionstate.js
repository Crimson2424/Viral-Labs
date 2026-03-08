/**
 * Shared mutable state — GSAP writes, R3F reads every frame.
 *
 * revealProgress : 0 → 1  (scroll-driven)
 *   Controls the Shadertoy shockwave dissolve.
 *   0 = hero fully visible
 *   1 = hero fully dissolved, MissionStats visible through canvas
 */

export const transitionState = {
  revealProgress: 0,
};