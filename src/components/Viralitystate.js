/**
 * viralityState.js — Shared state between GSAP (DOM) and R3F (Canvas).
 *
 * GSAP ScrollTrigger scrubs globeProgress from 0 → 1.
 * GlobeScene's useFrame reads it every frame to position + scale the globe.
 *
 * Globe starts: far left, much closer to camera, scaled up (huge)
 * Globe ends:   center, normal distance, normal scale
 */

export const viralityState = {
  // 0 → 1, scrubbed by ScrollTrigger
  globeProgress: 0,

  // Position endpoints
  startX: -3.0,
  startZ: 2.0,
  endX: 0,
  endZ: 0,

  // Scale endpoints
  startScale: 3.5,
  endScale: 1.2,
};