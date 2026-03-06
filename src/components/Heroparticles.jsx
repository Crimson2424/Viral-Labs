import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GOLD_COUNT = 1200;
const WHITE_COUNT = 3000;
const TOTAL = GOLD_COUNT + WHITE_COUNT;

function gaussRandom() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

const ARCH = {
  bottomX: 2.8,
  topX:    1.2,
  yMin:   -2.0,
  yMax:    1.4,
  curve:   0.7,
};

function archEdgeX(y) {
  const t = Math.max(0, Math.min(1, (y - ARCH.yMin) / (ARCH.yMax - ARCH.yMin)));
  return THREE.MathUtils.lerp(ARCH.bottomX, ARCH.topX, Math.pow(t, ARCH.curve));
}

function edgePosition(spreadX) {
  const side = Math.random() < 0.5 ? 1 : -1;
  const y = THREE.MathUtils.lerp(ARCH.yMin, ARCH.yMax, Math.random())
            + gaussRandom() * 0.2;
  const edgeX = archEdgeX(y);
  const x = (edgeX + gaussRandom() * spreadX) * side;
  const z = (Math.random() - 0.5) * 0.8;
  return [x, y, z];
}

const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec3  uMouse;
uniform float uMouseRadius;
uniform float uMouseForce;

attribute float aSize;
attribute float aOffset;
attribute float aOpacity;
attribute vec3  aColor;
attribute float aDriftSpeed;
attribute float aFloatSpeed;
attribute float aBobSpeed;

varying float vOpacity;
varying vec3  vColor;

void main() {
  vOpacity = aOpacity;
  vColor   = aColor;

  vec3 pos = position;

  pos.x += sin(uTime * aDriftSpeed + aOffset) * 0.06;
  pos.y += cos(uTime * aBobSpeed + aOffset * 1.7) * 0.05;
  pos.y += mod(uTime * aFloatSpeed + aOffset, 3.0) - 1.5;

  vec2 delta = pos.xy - uMouse.xy;
  float dist = length(delta);
  float influence = smoothstep(uMouseRadius, 0.0, dist);
  vec2 push = (dist > 0.001)
    ? normalize(delta) * influence * uMouseForce
    : vec2(0.0);
  pos.xy += push;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (1.0 / -mvPosition.z);
  gl_Position  = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
varying float vOpacity;
varying vec3  vColor;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  float alpha = smoothstep(0.5, 0.05, dist) * vOpacity;

  if (alpha < 0.01) discard;

  gl_FragColor = vec4(vColor, alpha);
}
`;

export default function HeroParticles({ mouseWorld }) {
  const materialRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    const positions  = new Float32Array(TOTAL * 3);
    const sizes      = new Float32Array(TOTAL);
    const offsets    = new Float32Array(TOTAL);
    const opacities  = new Float32Array(TOTAL);
    const colors     = new Float32Array(TOTAL * 3);
    const driftSpeed = new Float32Array(TOTAL);
    const floatSpeed = new Float32Array(TOTAL);
    const bobSpeed   = new Float32Array(TOTAL);

    const warmColor = new THREE.Color("#FFFFF2");
    const whiteColor = new THREE.Color("#FFFFFF");

    let i = 0;

    // ── Warm particles — tight to the edge line ──
    for (let g = 0; g < GOLD_COUNT; g++, i++) {
      const [x, y, z] = edgePosition(0.2);
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const speed = Math.random() * 3 + 0.08;
      sizes[i]      = Math.random() * 16 + 12;
      offsets[i]    = Math.random() * Math.PI * 2;
      opacities[i]  = Math.random() * 0.2 + 0.05;
      driftSpeed[i] = speed * 0.6;
      floatSpeed[i] = speed * 0.02;
      bobSpeed[i]   = speed * 0.4;

      colors[i * 3]     = warmColor.r;
      colors[i * 3 + 1] = warmColor.g;
      colors[i * 3 + 2] = warmColor.b;
    }

    // ── White particles — wider halo around edges ──
    for (let w = 0; w < WHITE_COUNT; w++, i++) {
      const [x, y, z] = edgePosition(0.4);
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const speed = Math.random() * 0.25 + 0.05;
      sizes[i]      = Math.random() * 10 + 3;
      offsets[i]    = Math.random() * Math.PI * 2;
      opacities[i]  = Math.random() * 0.2 + 0.06;
      driftSpeed[i] = speed * 0.6;
      floatSpeed[i] = speed * 0.02;
      bobSpeed[i]   = speed * 0.4;

      colors[i * 3]     = whiteColor.r;
      colors[i * 3 + 1] = whiteColor.g;
      colors[i * 3 + 2] = whiteColor.b;
    }

    geo.setAttribute("position",    new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("aSize",       new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute("aOffset",     new THREE.Float32BufferAttribute(offsets, 1));
    geo.setAttribute("aOpacity",    new THREE.Float32BufferAttribute(opacities, 1));
    geo.setAttribute("aColor",      new THREE.Float32BufferAttribute(colors, 3));
    geo.setAttribute("aDriftSpeed", new THREE.Float32BufferAttribute(driftSpeed, 1));
    geo.setAttribute("aFloatSpeed", new THREE.Float32BufferAttribute(floatSpeed, 1));
    geo.setAttribute("aBobSpeed",   new THREE.Float32BufferAttribute(bobSpeed, 1));

    return geo;
  }, []);

  const uniforms = useMemo(() => ({
    uTime:        { value: 0 },
    uMouse:       { value: new THREE.Vector3(9999, 9999, 0) },
    uMouseRadius: { value: 0.7 },
    uMouseForce:  { value: 0.06 },
  }), []);

  useFrame((state) => {
    if (!materialRef.current) return;

    const u = materialRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;

    if (mouseWorld?.current) {
      u.uMouse.value.copy(mouseWorld.current);
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}