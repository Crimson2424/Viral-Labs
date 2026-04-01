import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "./Gsapconfig";
import GlobalTexture from "./Globaltexture";

const VideoTransition = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // ── Blob fetch + metadata ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src = video.currentSrc || video.src;

    // iOS activation
    const activate = () => {
      video.play();
      video.pause();
    };
    document.documentElement.addEventListener("touchstart", activate, {
      once: true,
    });

    // Fetch as blob for reliable frame scrubbing
    fetch(src)
      .then((res) => res.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);
        const prevTime = video.currentTime;
        video.setAttribute("src", blobURL);
        video.currentTime = prevTime + 0.01;
      })
      .catch(() => {});

    const onMeta = () => setIsReady(true);

    if (video.readyState >= 1) {
      onMeta();
    } else {
      video.addEventListener("loadedmetadata", onMeta, { once: true });
    }

    return () => {
      document.documentElement.removeEventListener("touchstart", activate);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  // ── ScrollTrigger — only after metadata is confirmed ──
  useGSAP(
    () => {
      if (!isReady) return;

      const video = videoRef.current;
      const section = sectionRef.current;
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;

    //   gsap.set(section, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });

      // Fade in (0 → 1.5)
    //   tl.to(section, {
    //     opacity: 1,
    //     duration: 1.5,
    //     ease: "power1.inOut",
    //   });

      // Scrub full video — starts during fade-in, ends during fade-out
      tl.to(
        video,
        {
          currentTime: duration,
          duration: 7,
          ease: "none",
        },
        0
      );

      // Fade out — overlaps with the last portion of video scrub
      // Rocket section is sliding up over this during this phase
      tl.to(
        section,
        {
          opacity: 0,
          duration: 2,
          ease: "power1.inOut",
        },
        5
      );

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    },
    { dependencies: [isReady] }
  );

  return (
    <>
      <section
        ref={sectionRef}
        className="video-transition-wrapper relative z-[1] h-screen bg-[#121212]"
      >
        <GlobalTexture />
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/transitionvideo.mp4"
          className="absolute inset-0 size-full object-cover"
        />
        {/* Top gradient — softens hard edge into MissionReports bg */}
        <div
          className="absolute top-0 left-0 right-0 h-[25%] pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, transparent 0%, #121212 100%)",
          }}
        />
      </section>

      {/* Spacer — controls when the rocket section arrives. */}
      <div className="relative h-[300vh]" />
    </>
  );
};

export default VideoTransition;