/**
 * SignalsSection — "Stream of Data" section.
 *
 * DOM layer for the signals visualization.
 * The R3F scene renders via a <View> in the shared Canvas,
 * tracked to the div that receives `viewRef`.
 *
 * Layout (from Figma):
 *   - Center: "STREAM OF DATA" subtitle + "Signals drive everything" heading
 *   - Bottom-right: "WHAT RESULTS CAN I EXPECT?" + input + disclaimer
 */

import { useRef } from "react";
import GlobalTexture from "./Globaltexture";

export default function SignalsSection({ viewRef }) {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="signals-section relative z-25 w-full h-screen "
    >
      <GlobalTexture />

      {/* R3F View tracking div — full section */}
      <div ref={viewRef} className="absolute inset-0 z-10" />

      {/* DOM content overlay */}
      <div className="absolute inset-0 z-40 pointer-events-none">

        {/* Center heading group */}
        <div className="absolute top-[38%] left-[42%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <p className="font-host text-sm text-[#FF6F21] uppercase tracking-wide mb-2">
            STREAM OF DATA
          </p>
          <h2 className="font-host font-medium text-[54px] tracking-[-2px] leading-[56px] text-center text-white">
            Signals drive<br />everything
          </h2>
        </div>

        {/* Bottom-right content */}
        <div className="absolute bottom-[6%] right-[8%] flex flex-col items-end gap-3">

          {/* Results label */}
          <div className="flex items-center gap-3">
            <span className="font-host text-[10px] text-white/50 uppercase tracking-[0.15em]">
              WHAT RESULTS CAN I EXPECT?
            </span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-[#FF6F21]" />
              <span className="w-1.5 h-1.5 bg-[#FF6F21]" />
              <span className="w-1.5 h-1.5 bg-[#FF6F21]" />
            </div>
          </div>

          {/* Input field with corner brackets */}
          <div className="relative pointer-events-auto px-5 py-3 w-[300px] border border-white/15">
            <svg className="absolute top-0 left-0" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" />
            </svg>
            <svg className="absolute top-0 right-0 scale-x-[-1]" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" />
            </svg>
            <svg className="absolute bottom-0 left-0 scale-y-[-1]" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" />
            </svg>
            <svg className="absolute bottom-0 right-0 scale-[-1]" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M9.36328 0.5H0.5V9.45225" stroke="#FF6F21" />
            </svg>
            <span className="font-host text-xs text-white/40 uppercase tracking-[0.15em]">
              ASK ABOUT THE SYSTEM …
            </span>
          </div>

          {/* Disclaimer */}
          <p className="font-host text-[8px] text-white/30 uppercase tracking-[0.1em] text-right max-w-[300px] leading-relaxed">
            SESSIONS MAY BE RECORDED. BY USING CHAT,<br />
            YOU ACKNOWLEDGE OUR PRIVACY POLICY.
          </p>
        </div>

      </div>
    </section>
  );
}