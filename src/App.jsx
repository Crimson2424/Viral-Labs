import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { View, PerspectiveCamera } from "@react-three/drei";
import { gsap, ScrollTrigger } from "./components/Gsapconfig";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import HeroSection from "./components/Herosection";
import GlobalCanvas from "./components/GlobalCanvas";
import GlobalTexture from "./components/Globaltexture";
import LoadingScreen from "./components/LoadingScreen";
import GlobeContent from "./components/GlobeScene";
import GlobeCanvas from "./components/GlobeCanvas";
import ViralitySection from "./components/Viralitysection";
import PlaybookSection from "./components/PlaybookSection";
import ViralEngineSection from "./components/ViralEngineSection";
import BridgeTestimonial from "./components/BridgeTestimonial";
import CoreOperations from "./components/CoreOperations";
import GlobalGrid from "./components/Globalgrid";
import { loadingState } from "./components/loadingState";
import { entranceState } from "./components/entranceState";
import RocketLaunchSection from "./components/Rocketlaunchsection";
import CreatorNetworkSection from "./components/CreatorNetworkSection";

function DummySection() {
  return (
    <section className="dummy-section relative z-[1] w-full py-40 px-38 overflow-hidden">
      <GlobalGrid />

      <div className="pointer-events-none absolute top-0 left-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-[105px] w-px h-full bg-white/20 z-30" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-[105px] right-[105px] h-px bg-white/20 z-30" aria-hidden="true" />

      <div className="relative z-40 flex flex-col items-center justify-center min-h-[80vh] gap-6">
        <p
          className="dummy-label font-bricolage font-normal text-[16px] text-[#ff6f21] uppercase leading-normal opacity-0 translate-y-[30px]"
          style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}
        >
          Next Section
        </p>
        <h2 className="dummy-heading font-host font-medium text-[54px] text-[#f1f1f1] tracking-[-2.16px] leading-[56px] text-center max-w-[600px] opacity-0 translate-y-[50px]">
          This Is the Next Section
        </h2>
        <p className="dummy-text font-host font-light text-[16px] text-white/60 tracking-[-0.96px] leading-[20px] text-center max-w-[400px] opacity-0 translate-y-[30px]">
          Normal DOM flow. Single page scroll. GSAP animations work here too.
        </p>

        <div className="flex gap-8 mt-16">
          <div className="dummy-card w-[200px] h-[260px] border border-white/10 flex items-center justify-center opacity-0 translate-y-[40px] scale-[0.9]">
            <span className="font-host text-white/40 text-sm">Card A</span>
          </div>
          <div className="dummy-card w-[200px] h-[260px] border border-white/10 flex items-center justify-center opacity-0 translate-y-[40px] scale-[0.9]">
            <span className="font-host text-white/40 text-sm">Card B</span>
          </div>
          <div className="dummy-card w-[200px] h-[260px] border border-white/10 flex items-center justify-center opacity-0 translate-y-[40px] scale-[0.9]">
            <span className="font-host text-white/40 text-sm">Card C</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const App = () => {
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
        dpr={[1, 2]}
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
      <GlobeCanvas />

      <HeroSection />
      <CoreOperations />
      <ViralitySection globeContainerRef={globeContainerRef} />
      <PlaybookSection />
      {/* <BridgeTestimonial /> */}
      {/* <ViralEngineSection /> */}
      {/* <CreatorNetwork viewRef={creatorViewRef} /> */}
      <RocketLaunchSection />
      <CreatorNetworkSection />
      <DummySection />
      <GlobalTexture />
    </main>
  );
};

export default App;