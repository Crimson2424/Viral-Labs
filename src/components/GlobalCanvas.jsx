import { useRef, useEffect, useMemo } from "react";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader,
} from "@react-three/fiber";
import { shaderMaterial, useAspect } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";
import HeroParticles from "./HeroParticles";
import { transitionState } from "./transitionState";

// ============================================
// VERTEX SHADER
// ============================================

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// ============================================
// FRAGMENT — Hero BG + Grayscale + Sobel Edges + Blocky Dissolve
// ============================================

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform vec4 uResolution;
uniform float uRevealProgress;

uniform float uEtherealIntensity;
uniform float uRadius;
uniform float uSoftness;
uniform float uGlowStrength;
uniform float uBreathingSpeed;
uniform float uColorShift;
uniform float uRgbIntensity;
uniform float uRgbRadius;

varying vec2 vUv;

#define PI 3.14159265359

// ═══════════════════════════════════════════════
// SOBEL EDGE DETECTION
// ═══════════════════════════════════════════════

mat3 sobelX = mat3(
  -1.0, 0.0, 1.0,
  -2.0, 0.0, 2.0,
  -1.0, 0.0, 1.0
);

mat3 sobelY = mat3(
  -1.0, -2.0, -1.0,
   0.0,  0.0,  0.0,
   1.0,  2.0,  1.0
);

float getLuminance(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

float sobel(sampler2D tex, vec2 uv, vec2 texelSize) {
  float gx = 0.0;
  float gy = 0.0;

  for (int i = -1; i <= 1; i++) {
    for (int j = -1; j <= 1; j++) {
      vec2 offset = vec2(float(i), float(j)) * texelSize;
      float lum = getLuminance(texture2D(tex, uv + offset).rgb);
      gx += lum * sobelX[i + 1][j + 1];
      gy += lum * sobelY[i + 1][j + 1];
    }
  }

  return sqrt(gx * gx + gy * gy);
}

// ═══════════════════════════════════════════════
// BLOCKY GRUNGE DISSOLVE
// ═══════════════════════════════════════════════

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return value;
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════

void main() {
  vec2 newUV = (vUv - vec2(0.5)) * uResolution.zw + vec2(0.5);

  float aspect = uResolution.x / uResolution.y;
  vec2 aspectUV = vUv;
  vec2 aspectMouse = uMouse;
  aspectUV.x *= aspect;
  aspectMouse.x *= aspect;

  float dist = distance(aspectUV, aspectMouse);

  float ethFalloff = 1.0 - smoothstep(0.0, uRadius, dist);
  ethFalloff = pow(ethFalloff, uSoftness);

  float velocityMag = length(uVelocity);
  vec2 velocityDir = normalize(uVelocity + vec2(0.0001));

  float breathing = sin(uTime * uBreathingSpeed) * 0.5 + 0.5;
  breathing = pow(breathing, 2.0);

  vec3 color = texture2D(uTexture, newUV).rgb;

  float colorAngle = atan(velocityDir.y, velocityDir.x);
  float colorPhase = colorAngle + uTime * 0.2;
  vec3 warmShift = vec3(1.02, 1.0, 0.98);
  vec3 coolShift = vec3(0.98, 1.0, 1.02);
  vec3 colorInfluence = mix(warmShift, coolShift, sin(colorPhase) * 0.5 + 0.5);
  float shiftAmount = velocityMag * uColorShift * ethFalloff * 0.5 + breathing * 0.1 * ethFalloff;
  color = mix(color, color * colorInfluence, shiftAmount);

  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  float highlightMask = smoothstep(0.25, 0.85, luminance);

  float proximity = 1.0 - smoothstep(0.0, uRadius, dist);
  proximity = pow(proximity, uSoftness);

  float drive = breathing * 0.4 + velocityMag * 1.5 + 0.15;
  float boost = highlightMask * proximity * uGlowStrength * drive;
  color += color * boost;

  float brightnessLift = 1.0 + proximity * highlightMask * velocityMag * 0.1;
  color *= brightnessLift;

  float rgbFalloff = 1.0 - smoothstep(0.0, uRgbRadius, dist);
  rgbFalloff = rgbFalloff * rgbFalloff * (3.0 - 2.0 * rgbFalloff);

  vec2 rgbDir = uVelocity * uRgbIntensity * rgbFalloff;

  float r = texture2D(uTexture, newUV + rgbDir).r;
  float b = texture2D(uTexture, newUV - rgbDir).b;

  color.r = mix(color.r, r, rgbFalloff);
  color.b = mix(color.b, b, rgbFalloff);

  color = clamp(color, 0.0, 1.0);

  // ── Grayscale transition (reaches full grayscale at 40% progress) ──
  float grayscaleProgress = clamp(uRevealProgress / 3.99, 0.0, 1.0);
  float gray = getLuminance(color);
  vec3 grayscaleColor = vec3(gray);
  color = mix(color, grayscaleColor, grayscaleProgress);

  // ── Sobel edge detection ──
  vec2 texelSize = 1.0 / uResolution.xy;
  float edge = sobel(uTexture, newUV, texelSize);
  edge = pow(edge, 0.7) * 2.0;
  edge = clamp(edge, 0.0, 1.0);

  // ── Edge glow — intensifies as grayscale kicks in, image goes dark with edges visible ──
  float edgeIntensity = uRevealProgress * 0.5;
  float edgeBrightnessVal = 1.0 - uRevealProgress;
  vec3 edgeColor = vec3(1.0, 1.0, 1.0);

  // Darken base toward black as grayscale increases (only edges remain)
  vec3 baseColor = mix(color, vec3(0.0), grayscaleProgress);

  // Edge glow scales up when grayscaled
  float edgeGlowIntensity = edgeIntensity * 2.0;
  float edgeGlow = edge * edgeGlowIntensity * (1.0 + grayscaleProgress * 3.0);
  baseColor += edgeColor * edgeGlow * edgeBrightnessVal;

  color = baseColor;

  // ═══════════════════════════════════════════════
  // TWO INDEPENDENT RADIAL SYSTEMS:
  //
  // 1. DISSOLVE — eats from center outward the whole time (alpha → 0)
  // 2. BLOOM — opaque white, grows then shrinks from center
  //    Where bloom is active: alpha=1, color=white (hides dissolve)
  //    Where bloom has receded past dissolve: alpha=0 (section 2 visible)
  //
  // Bloom radius > dissolve radius initially → you see white, not dissolve
  // Bloom shrinks → reveals already-dissolved transparent area behind it
  // ═══════════════════════════════════════════════

  vec2 centeredUv = vUv - vec2(0.5);
  centeredUv.x *= aspect;
  float centerDist = length(centeredUv);
  float maxDist = length(vec2(aspect * 0.5, 0.5));

  // ── DISSOLVE — runs from the start, eats center outward ──
  float dissolveProgress = smoothstep(0.05, 1.0, uRevealProgress);

  // Noise for dissolve edge — mix of smooth organic + subtle blocky
  float noiseScale = 2.0; // smaller blocks (was 6.0)
  vec2 pixelRes = vec2(uResolution.x, uResolution.y);
  vec2 pixelatedUv = floor(vUv * pixelRes / noiseScale) * noiseScale / pixelRes;
  float blockNoise = fbm(pixelatedUv * 100.0) * 0.06; // subtle blocky contribution

  // Smooth organic noise — dominant
  float smoothNoise = fbm(vUv * 80.0) * 0.12;

  float angle = atan(centeredUv.y, centeredUv.x);
  float angularNoise = fbm(vec2(angle * 5.0, 0.0)) * 0.1;

  float noisyDist = centerDist + smoothNoise + blockNoise + angularNoise;
  float normalizedDist = noisyDist / maxDist;

  float dissolveThreshold = dissolveProgress * 1.5;
  // dissolveMask: 0 = dissolved (transparent), 1 = intact (opaque)
  float dissolveMask = smoothstep(dissolveThreshold - 0.03, dissolveThreshold, normalizedDist);

  // ── BLOOM — opaque white, grows then shrinks ──
  // Grows fast, peaks around 0.3, shrinks slower
  float bloomGrow = smoothstep(0.0, 0.25, uRevealProgress);
  float bloomShrink = smoothstep(0.3, 0.65, uRevealProgress);
  float bloomRadius = 0.5 * maxDist * bloomGrow * (1.0 - bloomShrink);

  // Soft radial falloff — smooth white glow, no hard edges
  float bloomMask = 1.0 - smoothstep(bloomRadius * 0.3, bloomRadius, centerDist);
  bloomMask = pow(bloomMask, 1.5);
  // Kill bloom when radius is basically 0
  bloomMask *= step(0.001, bloomRadius);

  // ── Sparkle at dissolve edge (only visible where bloom has receded) ──
  float edgeZoneWidth = 0.12 * (1.0 - dissolveProgress) + 0.02;
  float edgeZone = smoothstep(dissolveThreshold - edgeZoneWidth, dissolveThreshold - edgeZoneWidth + 0.04, normalizedDist)
                 * smoothstep(dissolveThreshold + 0.02, dissolveThreshold - 0.02, normalizedDist);

  float sparkle = hash(floor(vUv * pixelRes / 4.0)) * edgeZone;

  vec2 starUv = fract(vUv * pixelRes / 6.0) - 0.5;
  float starCross = max(
    smoothstep(0.04, 0.0, abs(starUv.x)) * smoothstep(0.3, 0.0, abs(starUv.y)),
    smoothstep(0.04, 0.0, abs(starUv.y)) * smoothstep(0.3, 0.0, abs(starUv.x))
  );
  float starSeed = hash(floor(vUv * pixelRes / 6.0));
  float starMask = step(0.85, starSeed);
  float starGlint = starCross * starMask * edgeZone;

  float sparkleEdgeBrightness = (1.0 - dissolveProgress) * (1.0 + grayscaleProgress * 2.0);

  // ── COMPOSITE ──
  // Start with dark edge-detected image + sparkles
  color += edgeColor * sparkle * 3.0 * sparkleEdgeBrightness;
  color += edgeColor * starGlint * 2.5 * sparkleEdgeBrightness;

  // Where bloom is active: override color to white (overexposed)
  color = mix(color, vec3(1.0), bloomMask);

  // Alpha: opaque where either dissolve OR bloom says so
  // dissolveMask = 1 outside dissolve edge (intact image)
  // bloomMask = 1 inside bloom radius (white curtain)
  // Transparent only where both are 0 (dissolved AND bloom has receded)
  float alpha = max(dissolveMask, bloomMask);

  gl_FragColor = vec4(color, alpha);
}
`;

// ============================================
// SHADER MATERIAL
// ============================================

const EtherealRgbMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uVelocity: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector4(1, 1, 1, 1),
    uRevealProgress: 0,
    uEtherealIntensity: 1.0,
    uRadius: 0.6,
    uSoftness: 1.5,
    uGlowStrength: 0.8,
    uBreathingSpeed: 0.8,
    uColorShift: 1.0,
    uRgbIntensity: 0.015,
    uRgbRadius: 0.45,
  },
  vertexShader,
  fragmentShader
);

extend({ EtherealRgbMaterial });

// ============================================
// TUNING
// ============================================

const SHADER_CONFIG = {
  etherealIntensity: 1.0,
  radius: 0.6,
  softness: 1.5,
  glowStrength: 0.8,
  breathingSpeed: 0.8,
  colorShift: 1.0,
  mouseLag: 0.06,
  rgbIntensity: 0.015,
  rgbRadius: 0.45,
  velocityDecay: 0.92,
  velocityScale: 1.2,
};

// ============================================
// SCENE
// ============================================

function Scene() {
  const { camera, size, viewport } = useThree();
  const materialRef = useRef();
  const rawTexture = useLoader(THREE.TextureLoader, "/images/bg-image.png");
  const texture = useMemo(() => rawTexture.clone(), [rawTexture]);
  const scale = useAspect(viewport.width, viewport.height, 1);

  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const smoothMouse = useRef({ x: 0.5, y: 0.5 });
  const laggedMouse = useRef({ x: 0.5, y: 0.5 });
  const smoothVelocity = useRef({ x: 0, y: 0 });
  const rawMouseWorld = useRef(new THREE.Vector3(9999, 9999, 0));
  const _ndcVec = useMemo(() => new THREE.Vector3(), []);
  const _camPos = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const onMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x != null && y != null) {
        targetMouse.current.x = x / window.innerWidth;
        targetMouse.current.y = 1 - y / window.innerHeight;
      }
    };
    const onLeave = () => {
      targetMouse.current.x = -10;
      targetMouse.current.y = -10;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat) return;

    mat.uResolution.set(size.width, size.height, 1, 1);
    mat.uTime = state.clock.elapsedTime;

    // Scroll-driven reveal
    mat.uRevealProgress = transitionState.revealProgress;

    // Smooth mouse
    const prevX = smoothMouse.current.x;
    const prevY = smoothMouse.current.y;
    smoothMouse.current.x +=
      (targetMouse.current.x - smoothMouse.current.x) * 0.1;
    smoothMouse.current.y +=
      (targetMouse.current.y - smoothMouse.current.y) * 0.1;
    laggedMouse.current.x +=
      (smoothMouse.current.x - laggedMouse.current.x) * SHADER_CONFIG.mouseLag;
    laggedMouse.current.y +=
      (smoothMouse.current.y - laggedMouse.current.y) * SHADER_CONFIG.mouseLag;
    mat.uMouse.set(laggedMouse.current.x, laggedMouse.current.y);

    const rawVX = smoothMouse.current.x - prevX;
    const rawVY = smoothMouse.current.y - prevY;
    smoothVelocity.current.x =
      smoothVelocity.current.x * SHADER_CONFIG.velocityDecay +
      rawVX * SHADER_CONFIG.velocityScale;
    smoothVelocity.current.y =
      smoothVelocity.current.y * SHADER_CONFIG.velocityDecay +
      rawVY * SHADER_CONFIG.velocityScale;
    mat.uVelocity.set(smoothVelocity.current.x, smoothVelocity.current.y);

    mat.uEtherealIntensity = SHADER_CONFIG.etherealIntensity;
    mat.uRadius = SHADER_CONFIG.radius;
    mat.uSoftness = SHADER_CONFIG.softness;
    mat.uGlowStrength = SHADER_CONFIG.glowStrength;
    mat.uBreathingSpeed = SHADER_CONFIG.breathingSpeed;
    mat.uColorShift = SHADER_CONFIG.colorShift;
    mat.uRgbIntensity = SHADER_CONFIG.rgbIntensity;
    mat.uRgbRadius = SHADER_CONFIG.rgbRadius;

    // Particles world-space mouse
    const ndcX = targetMouse.current.x * 2 - 1;
    const ndcY = targetMouse.current.y * 2 - 1;
    _ndcVec.set(ndcX, ndcY, 0.5).unproject(camera);
    _camPos.copy(camera.position);
    _ndcVec.sub(_camPos).normalize();
    const t = -_camPos.z / _ndcVec.z;
    rawMouseWorld.current.set(
      _camPos.x + _ndcVec.x * t,
      _camPos.y + _ndcVec.y * t,
      0
    );
  });

  return (
    <>
      {/* Hero bg plane — reveal mask controls alpha */}
      <mesh scale={scale} renderOrder={0}>
        <planeGeometry />
        <etherealRgbMaterial
          ref={materialRef}
          uTexture={texture}
          transparent
          depthWrite={false}
          depthTest={false}
          toneMapped={false}
        />
      </mesh>

      {/* Particles — renders after bg plane */}
      <HeroParticles mouseWorld={rawMouseWorld} />
    </>
  );
}

// ============================================
// GLOBAL CANVAS — z-[5]
// ============================================

export default function GlobalCanvas() {
  return (
    <div
      id="global-canvas"
      className="fixed inset-0 z-[5]"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}