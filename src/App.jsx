import React, { Suspense, lazy, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { View, PerspectiveCamera } from "@react-three/drei";
import useIsDesktop from "./components/useIsDesktop";
import { gsap, ScrollTrigger } from "./components/Gsapconfig";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { entranceState } from "./components/Entrancestate";

// ── All DOM sections: eagerly loaded ──
// ScrollTrigger pin calculations require full document height at creation time.
// Lazy loading DOM sections causes pin spacer miscalculation.
import LoadingScreen from "./components/Loadingscreen";
import GlobalCanvas from "./components/GlobalCanvas";
import GlobeContent from "./components/Globescene";
import HeroSection from "./components/Herosection";
import CoreOperations from "./components/CoreOperations";
import ViralitySection from "./components/Viralitysection";
import MissionReports from "./components/MissionReports";
import RocketLaunchSection from "./components/Rocketlaunchsection";
import CreatorNetworkSection from "./components/Creatornetworksection";
import SignalsSection from "./components/SignalsSection";
import BridgeTestimonial from "./components/BridgeTestimonial";
import FooterSection from "./components/FooterSection";

import SignalsCanvas from "./components/SignalsCanvas";

// ── Fixed-position WebGL canvas: lazy loaded (doesn't affect document flow) ──
const GlobeCanvas = lazy(() => import("./components/Globecanvas"));

const App = () => {
  const isDesktop = useIsDesktop();
  const lenisRef = useRef(null);
  const containerRef = useRef(null);

  // View tracking ref — only the GPGPU globe uses the shared Canvas now
  const globeContainerRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
    });
    lenisRef.current = lenis;

    lenis.stop();

    const checkReady = setInterval(() => {
      if (entranceState.isComplete) {
        clearInterval(checkReady);
        lenis.start();
        ScrollTrigger.refresh();
      }
    }, 100);

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      clearInterval(checkReady);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} className="relative bg-[#121212]">
      <LoadingScreen videoSrc="/videos/loader.webm" />
      <GlobalCanvas />

      {/* Shared Canvas — only GPGPU globe View remains here */}
      <Canvas
        eventSource={containerRef}
        eventPrefix="client"
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        {/* GPGPU particle globe — tracks ViralitySection container */}
        <View track={globeContainerRef}>
          <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={45} />
          <GlobeContent containerRef={globeContainerRef} />
        </View>
      </Canvas>

      {/* Creator Globe — standalone fixed Canvas (3rd WebGL context) */}
      {isDesktop && (
        <Suspense fallback={null}>
          <GlobeCanvas />
        </Suspense>
      )}

      {/* Signals — standalone fixed Canvas with bloom (4th WebGL context) */}
      {isDesktop && <SignalsCanvas />}

      <HeroSection />
      <CoreOperations />
      <ViralitySection globeContainerRef={globeContainerRef} />
      <MissionReports />
      <RocketLaunchSection />
      <CreatorNetworkSection />
      <SignalsSection />
      <BridgeTestimonial />
      <FooterSection />
    </main>
  );
};

export default App;