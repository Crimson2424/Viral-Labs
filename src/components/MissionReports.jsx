import { useRef, useState, useCallback, useEffect } from "react";
import { gsap, SplitText, ScrollTrigger, useGSAP } from "../components/Gsapconfig";

/* ─── Glow Line Blur Values (matches site pattern) ─── */
const LINE_BLURS = [0.5, 0.5, 3, 3, 5.5];

/* ─── CSS-replicated orange glow line ─── */
function GlowLine() {
  return (
    <div className="relative w-full h-[23px]">
      {LINE_BLURS.map((blur, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center"
          style={{ mixBlendMode: "plus-lighter", filter: `blur(${blur}px)` }}
        >
          <div className="w-full h-px bg-[#F05A1F]" />
        </div>
      ))}
    </div>
  );
}

/* ─── Arrow SVG ─── */
function ArrowIcon({ className = "" }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0.75 8.75L8.75 0.75M8.75 0.75H0.75M8.75 0.75V8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Corner-bracket CTA Button with hover micro-interactions ─── */
function CornerBracketButton({ label = "Go Viral", href = "#", className = "", children }) {
  const size = "8px";
  const thickness = "1.7px";
  const color = "#FF6F21";
  const offsetDefault = -10;
  const offsetHover = -14;
  const base = { position: "absolute", width: size, height: size };

  const btnRef = useRef(null);
  const tlCornerRef = useRef(null);
  const trCornerRef = useRef(null);
  const blCornerRef = useRef(null);
  const brCornerRef = useRef(null);
  const scrambleDataRef = useRef(null);

  const asciiChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

  /* Set up SplitText on the label once */
  useGSAP(
    () => {
      if (!btnRef.current) return;
      const textEl = btnRef.current.querySelector(".cta-scramble-text");
      if (!textEl) return;

      const split = SplitText.create(textEl, {
        type: "chars",
        charsClass: "btn-char",
      });

      const chars = split.chars;
      const originals = chars.map((c) => c.textContent);

      // Lock each char width so scramble doesn't resize
      chars.forEach((char) => {
        const w = char.offsetWidth;
        char.style.display = "inline-block";
        char.style.width = `${w}px`;
        char.style.textAlign = "center";
      });

      scrambleDataRef.current = { chars, originals };
    },
    { scope: btnRef }
  );

  const handleEnter = useCallback(() => {
    // Corners move outward
    gsap.to(tlCornerRef.current, { top: offsetHover, left: offsetHover, duration: 0.3, ease: "power2.out" });
    gsap.to(trCornerRef.current, { top: offsetHover, right: offsetHover, duration: 0.3, ease: "power2.out" });
    gsap.to(blCornerRef.current, { bottom: offsetHover, left: offsetHover, duration: 0.3, ease: "power2.out" });
    gsap.to(brCornerRef.current, { bottom: offsetHover, right: offsetHover, duration: 0.3, ease: "power2.out" });

    // Text scramble — GSAP proxy per char (same as HeroSection)
    const data = scrambleDataRef.current;
    if (!data) return;

    const { chars, originals } = data;
    const tl = gsap.timeline();

    chars.forEach((char, i) => {
      const original = originals[i];
      if (original.trim() === "") return;

      const proxy = { progress: 0 };
      tl.to(proxy, {
        progress: 1,
        duration: 0.3,
        ease: "none",
        onUpdate: () => {
          if (proxy.progress < 0.6) {
            char.textContent = asciiChars[Math.floor(Math.random() * asciiChars.length)];
          } else {
            char.textContent = original;
          }
        },
      }, i * 0.02);
    });
  }, [offsetHover]);

  const handleLeave = useCallback(() => {
    // Corners return
    gsap.to(tlCornerRef.current, { top: offsetDefault, left: offsetDefault, duration: 0.3, ease: "power2.out" });
    gsap.to(trCornerRef.current, { top: offsetDefault, right: offsetDefault, duration: 0.3, ease: "power2.out" });
    gsap.to(blCornerRef.current, { bottom: offsetDefault, left: offsetDefault, duration: 0.3, ease: "power2.out" });
    gsap.to(brCornerRef.current, { bottom: offsetDefault, right: offsetDefault, duration: 0.3, ease: "power2.out" });

    // Reset chars to original
    const data = scrambleDataRef.current;
    if (!data) return;
    data.chars.forEach((char, i) => {
      char.textContent = data.originals[i];
    });
  }, [offsetDefault]);

  return (
    <a
      ref={btnRef}
      href={href}
      className={`relative inline-flex items-center gap-2.5 border border-white/45 px-8 py-2 font-host text-md text-white transition-colors duration-300 ${className}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span ref={tlCornerRef} style={{ ...base, top: offsetDefault, left: offsetDefault, borderTop: `${thickness} solid ${color}`, borderLeft: `${thickness} solid ${color}` }} aria-hidden="true" />
      <span ref={trCornerRef} style={{ ...base, top: offsetDefault, right: offsetDefault, borderTop: `${thickness} solid ${color}`, borderRight: `${thickness} solid ${color}` }} aria-hidden="true" />
      <span ref={blCornerRef} style={{ ...base, bottom: offsetDefault, left: offsetDefault, borderBottom: `${thickness} solid ${color}`, borderLeft: `${thickness} solid ${color}` }} aria-hidden="true" />
      <span ref={brCornerRef} style={{ ...base, bottom: offsetDefault, right: offsetDefault, borderBottom: `${thickness} solid ${color}`, borderRight: `${thickness} solid ${color}` }} aria-hidden="true" />
      <span className="cta-scramble-text">{label}</span>
      {children}
    </a>
  );
}

/* ─── Brand Logo SVGs ─── */
function TNFLogo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 114 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#tnf-clip)">
        <path d="M40.1854 15.96H36.8794V2.907H32.0914V0.057H44.9734V2.907H40.1854V15.96ZM49.4764 8.835V15.96H46.1704V0.057H49.4764V6.099H55.6894V0.057H58.9954V15.96H55.6894V8.835H49.4764ZM71.8204 2.85H63.4984V6.213H70.8514V9.006H63.4984V13.167H71.8204V15.96H60.4204V0.057H71.8204V2.85ZM9.86137 18.411H12.9394V34.257H9.63337L3.13537 22.971H3.07837V34.257H0.000366211V18.411H3.47737L9.80437 29.412H9.86137V18.411ZM22.0594 17.955C24.1684 17.955 29.6974 18.867 29.6974 26.277C29.6974 33.687 24.1684 34.599 22.0594 34.599C19.9504 34.599 14.4214 33.687 14.4214 26.277C14.4214 18.867 19.9504 17.955 22.0594 17.955ZM22.0594 31.863C23.8264 31.863 26.3344 30.78 26.3344 26.334C26.3344 21.888 23.8264 20.805 22.0594 20.805C20.2924 20.805 17.7274 21.888 17.7274 26.334C17.7274 30.78 20.2924 31.863 22.0594 31.863ZM53.0674 34.257H49.7614V21.204H44.9164V18.411H57.8554V21.204H53.0674V34.257ZM62.3584 27.132V34.257H59.0524V18.411H62.3584V24.396H68.5144V18.411H71.8204V34.257H68.5144V27.132H62.3584ZM31.0654 18.411H39.1024C43.3204 18.411 44.1184 21.546 44.1184 22.914C44.1184 24.681 43.2064 26.163 41.6674 26.676C42.9784 27.246 43.6624 27.759 43.6624 30.723C43.6624 33.06 43.6624 33.63 44.3464 33.858V34.257H40.6984C40.4704 33.516 40.3564 32.718 40.3564 31.065C40.3564 28.899 40.2424 28.044 37.7914 28.044H34.3714V34.257H31.1224L31.0654 18.411ZM38.1904 25.365C39.9004 25.365 40.7554 24.738 40.7554 23.199C40.7554 22.344 40.3564 21.147 38.4184 21.147H34.3144V25.365H38.1904ZM23.3704 53.067H20.0074V36.765H31.5784V39.672H23.3704V43.32H30.5524V46.227H23.3704V53.067ZM33.1174 53.067H29.5264L35.3404 36.765H39.2734L45.0304 53.067H41.3254L40.2994 49.704H34.2004L33.1174 53.067ZM35.1124 46.911H39.2734L37.2784 40.47H37.2214L35.1124 46.911ZM55.4044 42.18C55.1194 41.211 54.6064 39.387 51.8134 39.387C50.1604 39.387 47.7664 40.47 47.7664 45.087C47.7664 47.994 48.9064 50.616 51.8134 50.616C53.6944 50.616 55.0054 49.533 55.4044 47.538H58.8244C58.1404 51.072 55.8604 53.523 51.7564 53.523C47.4244 53.523 44.3464 50.616 44.3464 44.973C44.3464 39.273 47.6524 36.366 51.8134 36.366C56.6584 36.366 58.6534 39.729 58.8244 42.123H55.4044V42.18ZM71.8774 39.672H63.3274V43.092H70.9084V45.942H63.3274V50.16H71.8774V53.067H60.1924V36.765H71.8774V39.672ZM13.8514 44.802C16.2454 44.802 18.2404 46.683 18.2404 49.191C18.2404 51.699 16.2454 53.58 13.8514 53.58C11.4574 53.58 9.40537 51.699 9.40537 49.191C9.40537 46.683 11.4574 44.802 13.8514 44.802ZM13.8514 52.953C15.9034 52.953 17.4424 51.357 17.4424 49.191C17.4424 47.082 15.8464 45.486 13.8514 45.486C11.7994 45.486 10.2034 47.082 10.2034 49.191C10.2034 51.3 11.7994 52.953 13.8514 52.953ZM12.1414 46.626H14.1364C15.3334 46.626 15.9604 47.082 15.9604 48.108C15.9604 49.02 15.3904 49.419 14.5924 49.533L16.0744 51.813H15.2194L13.7944 49.59H12.9394V51.813H12.1414V46.626ZM12.9394 48.906H13.7944C14.4784 48.906 15.1624 48.849 15.1624 48.051C15.1624 47.367 14.5924 47.253 14.0224 47.253H12.9394V48.906ZM82.7074 52.041V43.662C82.7074 39.9 79.6294 36.822 75.8674 36.822H75.1264V53.124H82.7074V52.041ZM114 52.041V38.133C114 17.1 96.9004 0 75.8674 0H75.4684H75.5254H75.1264V15.96H76.2094C88.5784 16.131 98.6674 26.22 98.8384 38.589V53.01H114V52.041Z" fill="white"/>
        <path d="M96.3878 52.6111V38.8171C96.3308 27.8161 87.5528 18.8671 76.6658 18.4111H75.4118H75.4688H75.0698V34.3141H75.8108C80.9408 34.3141 85.0448 38.4751 85.0448 43.5481V53.0101H96.3878V52.6111Z" fill="white"/>
      </g>
      <defs><clipPath id="tnf-clip"><rect width="114" height="53.58" fill="white"/></clipPath></defs>
    </svg>
  );
}

function FloLogo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 107 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#flo-clip)">
        <path fillRule="evenodd" clipRule="evenodd" d="M54.6908 42.6415C54.0233 42.6694 54.079 42.0574 55.0525 41.9461C57.0553 41.7236 58.9189 40.6388 60.0036 38.4692C61.4223 35.632 60.2818 32.8782 59.3639 31.6822C58.1956 30.1801 58.6408 30.4026 59.6977 30.9589C60.6435 31.4597 61.6448 32.0994 62.7574 33.073C61.8395 25.4515 64.9827 19.777 67.3749 16.8286C68.5969 15.335 68.3872 16.4394 68.1955 17.4504L68.1816 17.524C67.6808 20.2777 67.9868 23.4765 68.71 25.6183C68.4318 21.6129 70.3234 0 84.4259 0C98.5007 0 104.231 15.4656 100.058 27.927C96.1364 39.6375 83.202 40.5832 81.1993 40.5832C84.1478 41.3064 86.8181 41.0282 88.2646 40.7223C88.316 40.7125 88.3711 40.7014 88.428 40.6899C89.0174 40.5714 89.8003 40.4137 88.7095 41.2507C85.3717 43.8377 81.6444 45.3953 77.5833 45.8682C73.8559 46.2854 70.8797 45.7291 68.7935 45.1171C68.849 45.8404 68.8769 46.814 68.849 47.4816C68.808 48.1938 68.7601 48.1236 68.4531 47.6727C68.1366 47.2082 67.5448 46.3396 66.4013 45.5066C64.2912 43.9817 62.0908 43.9489 61.3706 43.9381C61.2158 43.9357 61.1295 43.9344 61.1271 43.9196C61.1241 43.9007 61.2551 43.8604 61.5515 43.7688C61.6414 43.7411 61.7463 43.7087 61.8673 43.6707C65.5112 42.5303 69.1551 41.0005 73.4108 38.052C79.3635 33.9074 82.5623 29.2066 82.3398 29.0397C82.3281 29.0319 82.2305 29.1402 82.0474 29.3433C80.9089 30.6059 76.4646 35.535 68.8213 39.0812C63.1746 41.668 57.7506 42.4469 54.6908 42.6415ZM23.0541 22.5307C24.556 22.7811 23.3322 25.2845 21.6911 25.4236C21.6371 25.4291 21.4951 25.4364 21.2826 25.4477C20.4001 25.4943 18.3017 25.6051 16.2392 25.8965C15.961 26.5919 15.6829 27.3151 15.4047 28.0661C12.4284 36.1605 11.4827 41.5568 11.2602 43.2535C11.0376 44.9224 6.86528 43.337 6.94873 40.3885C7.00436 38.052 8.50641 32.2663 9.84157 27.8715C8.17262 28.7059 6.80965 29.7629 6.28115 30.9032C4.47312 30.9868 2.16442 29.3456 3.33268 27.037C4.47312 24.7282 8.00573 23.7824 11.4271 23.2261C13.4854 17.4405 15.2657 13.2681 16.4339 11.6548C16.4617 11.627 16.4826 11.5992 16.5034 11.5714C16.5243 11.5435 16.5451 11.5157 16.573 11.4879C9.0071 12.9065 5.41886 15.5212 3.91681 17.7187C-0.00521113 17.6351 -2.17484 12.072 3.24923 9.56863C8.56204 7.12083 16.7398 6.42544 24.6674 6.48107C32.6505 6.53671 38.6031 7.78842 40.6058 8.53945C42.1357 9.12357 40.9117 11.5435 39.3262 11.4601C39.0805 11.4484 38.6548 11.3788 38.0558 11.2809C35.8081 10.9134 31.12 10.1468 24.3336 10.5422C24.3336 10.6082 24.2987 10.6742 24.2567 10.7541C24.2456 10.7751 24.2339 10.7971 24.2224 10.8203C22.6646 12.7118 20.1333 16.8841 17.6579 22.5307C20.2447 22.3917 22.4421 22.4473 23.0541 22.5307ZM42.3582 26.2859C43.3039 25.1732 45.4458 23.1984 48.5054 23.1427C51.7878 23.0593 55.1256 26.5919 51.8712 35.1314C49.785 40.611 46.1134 45.1171 40.9117 45.0894C38.019 45.0894 36.3779 42.8919 35.9884 40.0268C34.2638 42.1131 30.8981 45.1171 27.4489 45.1171C22.5256 45.1171 22.4421 39.0812 25.5852 29.4568C28.1165 21.724 31.3153 17.3013 32.5392 16.4669C35.6268 14.353 40.4945 16.5225 38.7699 18.1359C37.8798 18.9704 34.097 24.1997 31.5934 30.486C29.0623 36.7446 28.7563 40.0547 30.6756 40.0547C32.428 40.0547 35.5434 36.689 36.4056 35.326C36.4376 35.1984 36.4786 35.0798 36.5184 34.9652C36.5478 34.88 36.5767 34.797 36.6004 34.7141C37.9911 30.5696 39.827 27.482 41.1621 26.6475C41.5237 26.425 41.9132 26.3137 42.3582 26.2859ZM42.6363 39.9434C45.0008 39.9434 47.3651 37.0784 48.7558 33.7127C49.8407 31.0146 49.7571 27.6211 47.6432 27.6488C47.0313 27.6767 46.5306 27.8992 46.1134 28.233C46.1411 28.5112 46.0577 28.7893 45.8352 29.0396C45.2491 29.7478 43.1409 32.7928 42.3337 33.9586C42.2215 34.1208 42.1344 34.2466 42.08 34.3246C40.7727 36.7446 40.8283 39.9434 42.6363 39.9434Z" fill="#BBBBBB"/>
      </g>
      <defs><clipPath id="flo-clip"><rect width="106.667" height="49.2308" fill="white"/></clipPath></defs>
    </svg>
  );
}

/* ─── Reusable header row content ─── */
function HeaderRowContent({ data, bgClass = "", textClass = "text-white" }) {
  return (
    <div className={`w-full grid grid-cols-[auto_1fr_auto] sm:grid-cols-12 items-center gap-x-3 sm:gap-x-0 ${bgClass}`} style={{ padding: "1.75rem clamp(1rem, 4vw, 3rem)" }}>
      <span className={`sm:col-span-3 font-bricolage ${textClass}`} style={{ fontSize: "clamp(1.25rem, 2.8vw, 3.25rem)" }}>
        {data.id}
      </span>
      <h3 className={`sm:col-span-7 sm:col-start-4 font-bricolage ${textClass}`} style={{ fontSize: "clamp(1.4rem, 3.2vw, 3.75rem)" }}>
        {data.brand}
      </h3>
      <div className="sm:col-span-2 flex justify-end">
        {data.logo === "tnf" ? <TNFLogo className="h-10 md:h-13 w-auto" /> : <FloLogo className="h-9 md:h-12 w-auto" />}
      </div>
    </div>
  );
}

/* ─── Corner marks for line intersections ─── */
function CornerLeft({ className = "" }) {
  return (
    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0.5 0.5L0.5 8.5M0.5 4.5L4.5 4.5" stroke="#FF6F21" strokeLinecap="round" />
    </svg>
  );
}

function CornerRight({ className = "" }) {
  return (
    <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4.5 0.5L4.5 8.5M0.5 4.5H4.5" stroke="#FF6F21" strokeLinecap="round" />
    </svg>
  );
}

/* Bg wipe cascade colors */
const HOVER_BG = "#1a1a1a";
const BG_WIPE_COLORS = ["#3a3a3a", "#252525", "#171717", HOVER_BG];

/* ─── Case Study Data ─── */
const caseStudies = [
  {
    id: "01", brand: "The North Face", logo: "tnf",
    tagline: "Driving Sales Through\nOrganic Content.",
    objective: "Drive qualified traffic and convert it into purchases using organic content.",
    execution: "Built a 12 creator UGC engine producing high volume, discovery led content across TikTok, Instagram, and YouTube.",
    stats: [{ value: "6M+", label: "Organic Views" }, { value: "93.8K+", label: "Website visits in 1 month" }, { value: "29.2%+", label: "Traffic spike post campaign launch" }],
  },
  {
    id: "02", brand: "FLO", logo: "flo",
    tagline: "Engineering an Organic\nComeback.",
    objective: "Reverse negative brand perception and regain control of organic narrative.",
    execution: "Deployed a high-volume creator system with 3,500+ videos designed to dominate algorithmic distribution.",
    stats: [{ value: "123M+", label: "Organic Views" }, { value: "1M+", label: "22 Videos crossed" }, { value: "3,500+", label: "videos designed" }],
  },
];

const INNER_PAD = "clamp(1rem, 4vw, 3rem)";

/* ─────────────────────────────────────────────
   Accordion Item
   ───────────────────────────────────────────── */
function AccordionItem({ data, isActive, onEnter, onLeave, onClick }) {
  const containerRef = useRef(null);
  const headerClipRef = useRef(null);
  const contentWrapRef = useRef(null);
  const bgLayersRef = useRef(null);
  const contentInnerRef = useRef(null);
  const taglineRef = useRef(null);
  const objLabelRef = useRef(null);
  const objTextRef = useRef(null);
  const execLabelRef = useRef(null);
  const execTextRef = useRef(null);
  const linkRef = useRef(null);
  const statsRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!tlRef.current) return;
    if (isActive) {
      tlRef.current.timeScale(1).play();
    } else {
      tlRef.current.timeScale(2.5).reverse();
    }
  }, [isActive]);

  useGSAP(
    () => {
      const bgLayers = bgLayersRef.current?.querySelectorAll(".bg-wipe-layer") || [];
      const statItems = statsRef.current?.querySelectorAll(".stat-item") || [];

      const objSplit = SplitText.create(objTextRef.current, {
        type: "lines", mask: "lines", linesClass: "mr-obj-line",
      });
      objSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.08em";
      });

      const execSplit = SplitText.create(execTextRef.current, {
        type: "lines", mask: "lines", linesClass: "mr-exec-line",
      });
      execSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.05em";
      });

      gsap.set(bgLayers, { scaleY: 0, transformOrigin: "top" });
      gsap.set(contentWrapRef.current, { height: 0, overflow: "hidden" });
      gsap.set(contentInnerRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
      gsap.set(objSplit.lines, { yPercent: 110 });
      gsap.set(execSplit.lines, { yPercent: 110 });
      gsap.set(taglineRef.current, { opacity: 0, y: 20 });
      gsap.set(objLabelRef.current, { opacity: 0, y: 14 });
      gsap.set(execLabelRef.current, { opacity: 0, y: 14 });
      gsap.set(linkRef.current, { opacity: 0, y: 10 });
      gsap.set(statItems, { opacity: 0, y: 30 });

      const tl = gsap.timeline({ paused: true });

      tl.to(bgLayers, { scaleY: 1, duration: 0.6, stagger: 0.08, ease: "power3.inOut" });
      tl.to(contentWrapRef.current, { height: "auto", duration: 0.65, ease: "power4.inOut" }, "<0.15");
      tl.to(contentInnerRef.current, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.65, ease: "power3.inOut" }, "-=0.45");
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }, "-=0.3");
      tl.to(objLabelRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power4.out" }, "-=0.35");
      tl.to(objSplit.lines, { yPercent: 0, duration: 0.65, stagger: 0.04, ease: "power3.out" }, "-=0.3");
      tl.to(execLabelRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power4.out" }, "-=0.35");
      tl.to(execSplit.lines, { yPercent: 0, duration: 0.6, stagger: 0.04, ease: "power3.out" }, "-=0.3");
      tl.to(linkRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power4.out" }, "-=0.25");
      tl.to(statItems, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: "back.out(1.4)" }, "-=0.45");

      tlRef.current = tl;
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div ref={bgLayersRef} className="absolute inset-0 z-0 pointer-events-none">
        {BG_WIPE_COLORS.map((color, i) => (
          <div key={i} className="bg-wipe-layer absolute inset-0" style={{ backgroundColor: color, zIndex: i }} />
        ))}
      </div>

      <div ref={headerClipRef} className="cursor-pointer relative z-10" onClick={onClick}>
        <HeaderRowContent data={data} bgClass="border-t border-[#FF6F21]/70" textClass="text-white" />
      </div>

      <div ref={contentWrapRef} className="relative z-10 -mt-px">

        <div ref={contentInnerRef} className="relative z-10" style={{ padding: `1.25rem ${INNER_PAD} 3rem` }}>
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-16 md:mb-20">
            <div ref={taglineRef} className="col-span-12 md:col-span-3 pt-4">
              <p className="font-host text-sm font-thin text-white/50 whitespace-pre-line leading-relaxed tracking-tight">{data.tagline}</p>
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-4">
              <span ref={objLabelRef} className="inline-block font-host text-sm tracking-[0.15em] uppercase text-white mb-1.5">OBJECTIVE</span>
              <p ref={objTextRef} className="font-host text-white/80 leading-snug" style={{ fontSize: "clamp(1.25rem, 1.9vw, 2rem)" }}>{data.objective}</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <span ref={execLabelRef} className="inline-block font-host text-xs tracking-[0.15em] uppercase text-white mb-3">EXECUTION</span>
              <p ref={execTextRef} className="font-host text-sm font-thin text-white/50 leading-relaxed tracking-tight mb-4">{data.execution}</p>
              <a ref={linkRef} href="#" className="inline-flex items-center gap-1.5 font-host text-sm text-white/40 hover:text-[#FF6F21] transition-colors duration-300 underline underline-offset-4 decoration-white/15 hover:decoration-[#FF6F21]/50">
                View full case study <span className="text-xs">→</span>
              </a>
            </div>
            <div ref={statsRef} className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-2">
              {data.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <span className="block font-host text-[#FF6F21] leading-none mb-2" style={{ fontSize: "clamp(1.75rem, 2.8vw, 3rem)" }}>{stat.value}</span>
                  <span className="block font-host text-xs md:text-sm text-white/40 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MissionReports Section
   ───────────────────────────────────────────── */
export default function MissionReports() {
  const sectionRef = useRef(null);
  const headerContentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isTouchRef = useRef(false);

  const handleTouchStart = useCallback(() => { isTouchRef.current = true; }, []);
  const handleEnter = useCallback((i) => { if (!isTouchRef.current) setActiveIndex(i); }, []);
  const handleLeave = useCallback(() => { if (!isTouchRef.current) setActiveIndex(-1); }, []);
  const handleClick = useCallback((i) => {
    if (isTouchRef.current) setActiveIndex((prev) => (prev === i ? -1 : i));
  }, []);

  /* ── Scroll-triggered text reveal on header content ── */
  useGSAP(
    () => {
      if (!headerContentRef.current) return;

      // Split "Mission Reports" heading
      const headingSplit = SplitText.create(".mr-heading", {
        type: "lines", mask: "lines", linesClass: "mr-h-line",
      });
      headingSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.1em";
      });

      // Split "CASE STUDIES" label
      const labelSplit = SplitText.create(".mr-label", {
        type: "lines", mask: "lines", linesClass: "mr-l-line",
      });

      // Split tag texts
      const tagSplits = [];
      headerContentRef.current.querySelectorAll(".mr-tag").forEach((el) => {
        const split = SplitText.create(el, {
          type: "lines", mask: "lines", linesClass: "mr-t-line",
        });
        tagSplits.push(split);
      });
      const tagLines = tagSplits.flatMap((s) => s.lines);

      // Split the big paragraph
      const paraSplit = SplitText.create(".mr-para", {
        type: "lines", mask: "lines", linesClass: "mr-p-line",
      });
      paraSplit.lines.forEach((line) => {
        if (line.parentElement) line.parentElement.style.paddingBottom = "0.08em";
      });

      // CTA button
      const ctaEl = headerContentRef.current.querySelector(".mr-cta");

      // Initial states — everything hidden below mask
      gsap.set(headingSplit.lines, { y: "100%" });
      gsap.set(labelSplit.lines, { y: "100%" });
      gsap.set(tagLines, { y: "100%" });
      gsap.set(paraSplit.lines, { y: "100%" });
      gsap.set(ctaEl, { opacity: 0, y: 20 });

      // Heading reveal
      gsap.to(headingSplit.lines, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerContentRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Label reveal (slight delay)
      gsap.to(labelSplit.lines, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.15,
        scrollTrigger: {
          trigger: headerContentRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Tags reveal
      gsap.to(tagLines, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: headerContentRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Big paragraph reveal
      gsap.to(paraSplit.lines, {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: ".mr-para",
          start: "top 80%",
          once: true,
        },
      });

      // CTA fade in
      gsap.to(ctaEl, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: headerContentRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="mission-reports-section relative w-full" onTouchStart={handleTouchStart}>
      <div className="relative mx-auto w-[calc(100%-clamp(2.5rem,10vw,13.125rem))] max-w-[106.875rem]">
      <div className="pointer-events-none absolute top-0 left-0 w-px h-full bg-white/20 z-50" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 right-0 w-px h-full bg-white/20 z-50" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-white/20 z-50" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/20 z-50" aria-hidden="true" />

      <CornerLeft className="pointer-events-none absolute z-50 top-0 left-0 -translate-y-1/2" />
      <CornerRight className="pointer-events-none absolute z-50 top-0 right-0 -translate-y-1/2" />
      <CornerLeft className="pointer-events-none absolute z-50 bottom-0 left-0 translate-y-1/2" />
      <CornerRight className="pointer-events-none absolute z-50 bottom-0 right-0 translate-y-1/2" />

      <div ref={headerContentRef} className="relative z-40" style={{ padding: "clamp(4rem, 6vw, 6rem) clamp(0.75rem, 3vw, 3rem) 0" }}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between mb-3">
          <h2 className="mr-heading font-host text-white leading-none tracking-tight" style={{ fontSize: "clamp(2.25rem, 3.2vw, 3.75rem)" }}>Mission Reports</h2>
          <span className="mr-label font-host text-xs md:text-sm tracking-tight uppercase text-[#FF6F21] shrink-0 sm:ml-4">CASE STUDIES</span>
        </div>
        <GlowLine />
        <div className="grid grid-cols-12 gap-x-4 sm:gap-x-10 gap-y-8 mt-8 md:mt-10 mb-20 md:mb-28">
          <div className="col-span-12 md:col-span-5 flex flex-col">
            <div className="flex flex-wrap gap-x-8 gap-y-2 mb-auto justify-between">
              {["Real distribution", "Real operations", "Measurable outcomes"].map((tag) => (
                <span key={tag} className="mr-tag font-host text-sm font-thin text-white tracking-tight">{tag}</span>
              ))}
            </div>
            <div className="mr-cta self-start mt-12 md:mt-16">
              <CornerBracketButton href="#" label="Go Viral"><ArrowIcon /></CornerBracketButton>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <p className="mr-para font-bricolage text-white leading-[1.15] font-light tracking-tight" style={{ fontSize: "clamp(1.6rem, 2.8vw, 3.2rem)" }}>
              Every mission is executed through high&#8209;volume content, precise signals, and engineered feedback loops turning attention into traffic, and traffic into results.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-40">
        {caseStudies.map((study, index) => (
          <AccordionItem key={study.id} data={study} isActive={activeIndex === index} onEnter={() => handleEnter(index)} onLeave={handleLeave} onClick={() => handleClick(index)} />
        ))}
        <div className="h-px bg-[#FF6F21]/70" />
      </div>

      </div>
    </section>
  );
}