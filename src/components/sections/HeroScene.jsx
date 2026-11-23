
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

import heroSceneData from "../../data/HeroScene";

// ==========================================
// FLOATING 3D OBJECT
// ==========================================

const FloatingObject = () => {
  const meshRef = useRef();
  const startTime = useRef(null);

  const { floatingObject, reveal } = heroSceneData;

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (startTime.current === null) {
      startTime.current = state.clock.elapsedTime;
    }

    const time = state.clock.elapsedTime - startTime.current;

    const { movement, rotation } = floatingObject;

    // 1. Continuous 3D rotation
    meshRef.current.rotation.x += delta * rotation.x;
    meshRef.current.rotation.y += delta * rotation.y;
    meshRef.current.rotation.z += delta * rotation.z;

    // 2. Calculate actual visible Canvas boundary
    const camera = state.camera;

    const cameraDistance = camera.position.z;

    const aspect =
      state.size.width / state.size.height;

    const halfHeight =
      Math.tan((camera.fov * Math.PI) / 360) *
      cameraDistance;

    const halfWidth = halfHeight * aspect;

    // Account for the size of the 3D object
    const objectRadius =
      floatingObject.geometry.radius *
      floatingObject.scale;

    const margin = 0.02;

    const width = Math.max(
      halfWidth - objectRadius - margin,
      0.1
    );

    const height = Math.max(
      halfHeight - objectRadius - margin,
      0.1
    );

    // 3. Elliptical (circular) orbit covering the full boundary
    const angle = time * movement.speedX;

    const x = Math.cos(angle) * width;
    const y = Math.sin(angle) * height;

    // Apply position
    meshRef.current.position.set(x, y, 0);

    // 4. Gradually increase net size
    const progress = Math.min(
      time / reveal.duration,
      1
    );

    const smoothProgress =
      progress * progress * (3 - 2 * progress);

    meshRef.current.scale.setScalar(
      floatingObject.scale * smoothProgress
    );
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry
        args={[
          floatingObject.geometry.radius,
          floatingObject.geometry.detail,
        ]}
      />

      <meshStandardMaterial
        color={floatingObject.material.color}
        emissive={floatingObject.material.emissive}
        emissiveIntensity={floatingObject.material.emissiveIntensity}
        metalness={floatingObject.material.metalness}
        roughness={floatingObject.material.roughness}
        wireframe={floatingObject.material.wireframe}
        wireframeLinewidth={3}
      />
    </mesh>
  );
};

// ==========================================
// MAIN HERO SCENE
// ==========================================

const HeroScene = () => {
  const [showScene, setShowScene] = useState(false);

  const {
    container,
    camera,
    lighting,
    sparkles,
    reveal,
  } = heroSceneData;

  // Delay 3D scene rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScene(true);
    }, reveal.delay * 1000);

    return () => clearTimeout(timer);
  }, [reveal.delay]);

  return (
    <div className={`${container.height} relative w-full`}>

      {/* Loading Placeholder */}
      {!showScene && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 animate-pulse rounded-full bg-violet-500/10 blur-xl" />
        </div>
      )}

      {/* Animated 3D Scene */}
      {showScene && (
        <motion.div
          className="h-full w-full"
          initial={{
            opacity: 0,
            scale: reveal.initialScale,
            y: reveal.initialY,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: reveal.duration,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Canvas
            camera={camera}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {/* Ambient Lighting */}
            <ambientLight
              intensity={lighting.ambient.intensity}
            />

            {/* Point Lights */}
            {lighting.lights.map((light, index) => (
              <pointLight
                key={index}
                position={light.position}
                intensity={light.intensity}
                color={light.color}
              />
            ))}

            {/* Main 3D Object */}
            <FloatingObject />

            {/* Floating Particles */}
            <Sparkles
              count={sparkles.count}
              scale={sparkles.scale}
              size={sparkles.size}
              speed={sparkles.speed}
              color={sparkles.color}
            />
          </Canvas>
        </motion.div>
      )}
    </div>
  );
};

export default HeroScene;
