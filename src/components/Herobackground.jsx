import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { useAspect } from "@react-three/drei";
import * as THREE from "three";
import { Suspense, useMemo } from "react";

/**
 * BackgroundPlane — Fullscreen plane using useAspect for cover behavior.
 * useAspect(w, h, factor) returns [width, height, 1] that fills viewport.
 */
function BackgroundPlane() {
  const texture = useLoader(THREE.TextureLoader, "/images/bg-image.png");
  const { viewport} = useThree()
  const scale = useAspect(viewport.width , viewport.height, 1);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  return (
    <mesh scale={scale}>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 2]}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <BackgroundPlane />
        </Suspense>
      </Canvas>
    </div>
  );
}