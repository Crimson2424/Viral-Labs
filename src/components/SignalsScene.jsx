/**
 * SignalsScene — R3F scene for the "Stream of Data" signals visualization.
 *
 * Converted from vanilla Three.js (codepen) to R3F hooks pattern.
 * Runs inside a standalone SignalsCanvas with bloom.
 *
 * Architecture:
 *   - Background lines: 80 THREE.Line objects animated with wave per frame
 *   - Signal trails: 53 animated THREE.Line objects with vertex colors
 *   - All objects managed imperatively via group ref for performance
 *
 * Config values tuned from the codepen's lil-gui settings.
 */

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ══════════════════════════════════════════════════════
   CONFIGURATION (tuned values from codepen)
   ══════════════════════════════════════════════════════ */

const CONFIG = {
  // Geometry
  lineCount: 80,
  segmentCount: 150,
  positionX: -5,
  positionY: 2,
  spreadHeight: 38.07,
  spreadDepth: 0,
  curveLength: 60.58,
  straightLength: 113.76,
  curvePower: 1.0382,

  // Line appearance
  colorLine: "#2d2e2e",
  lineOpacity: 0.742,

  // Wave
  waveSpeed: 1.06,
  waveHeight: 0.515,

  // Signals
  signalCount: 73,
  speedGlobal: 0.603,
  trailLength: 26,
  colorSignal: "#ff6f21",
  useColor2: false,
  colorSignal2: "#a1687b",
  useColor3: false,
  colorSignal3: "#ffcc00",
};

/* ══════════════════════════════════════════════════════
   PATH COMPUTATION
   ══════════════════════════════════════════════════════ */

/**
 * Compute a point along a line's path.
 * Left side (x < 0) fans out with cosine shaping + wave animation.
 * Right side (x >= 0) is a straight horizontal line at y=0.
 *
 * @param {number} t — 0..1 progress along path
 * @param {number} lineIndex — which line (0..lineCount-1)
 * @param {number[]} out — [x, y, z] output array (mutated)
 * @param {number} time — elapsed time for wave animation
 */
function getPathPoint(t, lineIndex, out, time) {
  const {
    curveLength, straightLength, lineCount,
    spreadHeight, spreadDepth, curvePower,
    waveSpeed, waveHeight,
  } = CONFIG;

  const totalLen = curveLength + straightLength;
  const currentX = -curveLength + t * totalLen;

  let y = 0;
  let z = 0;

  if (currentX < 0) {
    const spreadFactor = (lineIndex / lineCount - 0.5) * 2;
    const ratio = (currentX + curveLength) / curveLength;
    const shapeFactor = Math.pow((Math.cos(ratio * Math.PI) + 1) / 2, curvePower);

    y = spreadFactor * spreadHeight * shapeFactor;
    z = spreadFactor * spreadDepth * shapeFactor;

    // Wave animation — only on curved section, strength follows shape
    const wave = Math.sin(time * waveSpeed + currentX * 0.1 + lineIndex) * waveHeight * shapeFactor;
    y += wave;
  }

  out[0] = currentX;
  out[1] = y;
  out[2] = z;
}

/* ══════════════════════════════════════════════════════
   SCENE COMPONENT
   ══════════════════════════════════════════════════════ */

export default function SignalsScene() {
  const groupRef = useRef();
  const bgLinesRef = useRef([]);
  const signalsRef = useRef([]);
  const colorsRef = useRef([]);

  // Reusable temp array — avoids allocations in hot path
  const tempPt = useMemo(() => [0, 0, 0], []);

  /* ── Build all line objects once on mount ── */
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    group.position.set(CONFIG.positionX, CONFIG.positionY, 0);

    const pt = [0, 0, 0];
    const createdObjects = [];

    /* ── Background lines ── */
    const bgMat = new THREE.LineBasicMaterial({
      color: CONFIG.colorLine,
      transparent: true,
      opacity: CONFIG.lineOpacity,
      depthWrite: false,
    });
    createdObjects.push(bgMat);

    const bgLines = [];

    for (let i = 0; i < CONFIG.lineCount; i++) {
      const positions = new Float32Array(CONFIG.segmentCount * 3);

      // Initial positions (will be updated every frame with wave)
      for (let j = 0; j < CONFIG.segmentCount; j++) {
        getPathPoint(j / (CONFIG.segmentCount - 1), i, pt, 0);
        positions[j * 3] = pt[0];
        positions[j * 3 + 1] = pt[1];
        positions[j * 3 + 2] = pt[2];
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const line = new THREE.Line(geo, bgMat);
      line.renderOrder = 0;
      line.userData = { id: i };
      group.add(line);
      createdObjects.push(geo, line);
      bgLines.push(line);
    }

    bgLinesRef.current = bgLines;

    /* ── Signal colors ── */
    const sigColors = [new THREE.Color(CONFIG.colorSignal)];
    if (CONFIG.useColor2) sigColors.push(new THREE.Color(CONFIG.colorSignal2));
    if (CONFIG.useColor3) sigColors.push(new THREE.Color(CONFIG.colorSignal3));
    colorsRef.current = sigColors;

    /* ── Signal trail lines (animated per frame) ── */
    const sigMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      transparent: true,
    });
    createdObjects.push(sigMat);

    const maxTrail = CONFIG.trailLength + 10;
    const signals = [];

    for (let i = 0; i < CONFIG.signalCount; i++) {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(maxTrail * 3);
      const colors = new Float32Array(maxTrail * 3);
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const mesh = new THREE.Line(geo, sigMat);
      mesh.frustumCulled = false;
      mesh.renderOrder = 1;
      group.add(mesh);
      createdObjects.push(geo, mesh);

      signals.push({
        mesh,
        laneIndex: Math.floor(Math.random() * CONFIG.lineCount),
        speed: 0.2 + Math.random() * 0.5,
        progress: Math.random(),
        // Flat history: [x,y,z, x,y,z, ...] — avoids per-frame object creation
        history: [],
        color: sigColors[Math.floor(Math.random() * sigColors.length)],
      });
    }

    signalsRef.current = signals;

    /* ── Cleanup ── */
    return () => {
      signalsRef.current = [];
      bgLinesRef.current = [];
      createdObjects.forEach((obj) => {
        if (obj.isLine) group.remove(obj);
        if (obj.dispose) obj.dispose();
      });
    };
  }, []);

  /* ── Animate background lines + signals every frame ── */
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pt = tempPt;

    /* ── Update background lines with wave ── */
    const bgLines = bgLinesRef.current;
    for (let i = 0; i < bgLines.length; i++) {
      const line = bgLines[i];
      const posArr = line.geometry.attributes.position.array;
      const lineId = line.userData.id;

      for (let j = 0; j < CONFIG.segmentCount; j++) {
        getPathPoint(j / (CONFIG.segmentCount - 1), lineId, pt, time);
        posArr[j * 3] = pt[0];
        posArr[j * 3 + 1] = pt[1];
        posArr[j * 3 + 2] = pt[2];
      }
      line.geometry.attributes.position.needsUpdate = true;
    }

    /* ── Animate signals ── */
    const signals = signalsRef.current;
    const sigColors = colorsRef.current;
    const { trailLength, lineCount, speedGlobal } = CONFIG;

    for (let s = 0; s < signals.length; s++) {
      const sig = signals[s];

      // Advance along path
      sig.progress += sig.speed * 0.005 * speedGlobal;

      // Reset when reaching end
      if (sig.progress > 1.0) {
        sig.progress = 0;
        sig.laneIndex = Math.floor(Math.random() * lineCount);
        sig.history.length = 0;
        sig.color = sigColors[Math.floor(Math.random() * sigColors.length)];
      }

      // Compute current position with wave and push to flat history
      getPathPoint(sig.progress, sig.laneIndex, pt, time);
      sig.history.push(pt[0], pt[1], pt[2]);

      // Trim history
      const maxEntries = (trailLength + 1) * 3;
      while (sig.history.length > maxEntries) {
        sig.history.shift();
        sig.history.shift();
        sig.history.shift();
      }

      // Write to geometry buffers
      const posArr = sig.mesh.geometry.attributes.position.array;
      const colArr = sig.mesh.geometry.attributes.color.array;
      const histPoints = sig.history.length / 3;

      for (let i = 0; i < trailLength; i++) {
        let idx = histPoints - 1 - i;
        if (idx < 0) idx = 0;
        const base = idx * 3;

        posArr[i * 3] = sig.history[base] ?? 0;
        posArr[i * 3 + 1] = sig.history[base + 1] ?? 0;
        posArr[i * 3 + 2] = sig.history[base + 2] ?? 0;

        // Fade alpha along trail
        const alpha = trailLength > 0 ? Math.max(0, 1 - i / trailLength) : 1;
        colArr[i * 3] = sig.color.r * alpha;
        colArr[i * 3 + 1] = sig.color.g * alpha;
        colArr[i * 3 + 2] = sig.color.b * alpha;
      }

      sig.mesh.geometry.setDrawRange(0, trailLength);
      sig.mesh.geometry.attributes.position.needsUpdate = true;
      sig.mesh.geometry.attributes.color.needsUpdate = true;
    }
  });

  return <group ref={groupRef} />;
}