import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import HeroSection from "./components/Herosection";
import GlobalGrid from "./components/Globalgrid";
import GlobalCanvas from "./components/GlobalCanvas";
import GlobalTexture from "./components/Globaltexture";
import LoadingScreen from "./components/LoadingScreen";
import { loadingState } from "./components/loadingState";
import { entranceState } from "./components/entranceState";

gsap.registerPlugin(ScrollTrigger);

function DummySection() {
  return (
    <section className="dummy-section relative z-[1] w-full py-40 px-38 overflow-hidden">
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

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    // Lock scroll while loading screen is active
    lenis.stop();

    // Poll for loading completion → re-enable scroll
    const checkReady = setInterval(() => {
      if (entranceState.isComplete) {
        clearInterval(checkReady);
        lenis.start();
        ScrollTrigger.refresh();
      }
    }, 100);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      clearInterval(checkReady);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <main className="relative bg-[#121212]">
      <LoadingScreen videoSrc="/videos/loader.webm" />
      <GlobalCanvas />
      <HeroSection />
      <DummySection />
      <GlobalGrid entranceDelay={2.2} />
      <GlobalTexture />
    </main>
  );
};

export default App;