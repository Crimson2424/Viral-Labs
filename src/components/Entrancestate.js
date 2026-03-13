/**
 * entranceState — shared reactive object for page-load warp entrance.
 *
 * warpProgress: 0 = fully warped & dimmed, 1 = flat & bright
 *
 * GSAP tweens this directly from HeroSection.
 * GlobalCanvas reads it every frame in useFrame.
 */
export const entranceState = {
    warpProgress: 0,
    particleOpacity: 0,
    isComplete: false,
    playNavbar: null,
  };