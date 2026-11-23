
import { useMemo, useRef } from "react";
import {
  Canvas,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  Sparkles,
  Stars,
  Trail,
} from "@react-three/drei";

import { useTheme } from "../../context/ThemeContext";
import heroSceneData from "../../data/HeroScene";

// Galaxy particles
const GalaxyParticles = ({ colors }) => {
  const pointsRef = useRef();
  const { galaxy } = heroSceneData;

  const { positions, particleColors } = useMemo(() => {
    const positions = [];
    const particleColors = [];

    for (let i = 0; i < galaxy.particles.count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;

      const radius =
        galaxy.particles.radius *
        (0.65 + Math.random() * 0.35);

      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      const color = colors[
        Math.floor(Math.random() * colors.length)
      ];

      const hex = parseInt(color.replace("#", ""), 16);

      particleColors.push(
        ((hex >> 16) & 255) / 255,
        ((hex >> 8) & 255) / 255,
        (hex & 255) / 255
      );
    }

    return {
      positions: new Float32Array(positions),
      particleColors: new Float32Array(particleColors),
    };
  }, [colors, galaxy]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y +=
        delta * galaxy.rotationSpeed.y;

      pointsRef.current.rotation.x +=
        delta * galaxy.rotationSpeed.x;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />

        <bufferAttribute
          attach="attributes-color"
          args={[particleColors, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={galaxy.particles.size}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// Glowing galaxy core
const GalaxyCore = ({ colors }) => {
  const coreRef = useRef();

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={coreRef}>
      <icosahedronGeometry args={[0.72, 2]} />

      <meshPhysicalMaterial
        color={colors.coreColor}
        emissive={colors.coreEmissive}
        emissiveIntensity={colors.coreEmissiveIntensity}
        roughness={0.25}
        metalness={0.8}
        transparent
        opacity={colors.coreOpacity}
        wireframe
      />
    </mesh>
  );
};

// Galaxy orbital rings
const GalaxyRings = ({ colors }) => {
  const ringRef = useRef();
  const { galaxy } = heroSceneData;

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
      ringRef.current.rotation.x = 1.1;
    }
  });

  return (
    <group ref={ringRef}>
      <mesh>
        <torusGeometry
          args={[galaxy.rings.innerRadius, 0.008, 8, 120]}
        />

        <meshBasicMaterial
          color={colors.ringColor}
          transparent
          opacity={colors.ringOpacity}
        />
      </mesh>

      <mesh rotation={[0.4, 0.5, 0.8]}>
        <torusGeometry
          args={[galaxy.rings.outerRadius, 0.006, 8, 120]}
        />

        <meshBasicMaterial
          color={colors.cometColors[0]}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

// Galaxy positioned on the right
const Galaxy = ({ colors }) => {
  const { viewport } = useThree();

  const galaxyX = Math.min(viewport.width * 0.23, 2.4);

  return (
    <group
      position={[galaxyX, 0, 0]}
      scale={heroSceneData.galaxy.scale}
    >
      <GalaxyParticles colors={colors.particleColors} />
      <GalaxyCore colors={colors} />
      <GalaxyRings colors={colors} />
    </group>
  );
};

// Shooting comets
const Comet = ({ index, colors }) => {
  const cometRef = useRef();
  const { comets } = heroSceneData;

  const color = colors.cometColors[
    index % colors.cometColors.length
  ];

  useFrame((state) => {
    if (!cometRef.current) return;

    const time = state.clock.elapsedTime * comets.speed;
    const phase = index * 2.1;
    const progress = (time + phase) % 8;

    cometRef.current.position.set(
      5.5 - progress * 1.35,
      3.2 - progress * 0.85,
      -1.5 + index * 0.35
    );
  });

  return (
    <Trail
      width={comets.trailWidth}
      length={comets.trailLength}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={cometRef}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
};

// Scene lighting
const SceneLights = ({ colors }) => {
  return (
    <>
      <ambientLight intensity={heroSceneData.lighting.ambient} />

      {colors.lights.map((light, index) => (
        <pointLight
          key={index}
          position={light.position}
          intensity={light.intensity}
          color={light.color}
        />
      ))}
    </>
  );
};

// Main 3D scene
const HeroScene = () => {
  const { theme } = useTheme();

  const colors = heroSceneData.themes[theme] ||
    heroSceneData.themes.dark;

  const { camera, stars, sparkles, comets } = heroSceneData;

  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={camera}
        dpr={[1, 1.7]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <SceneLights colors={colors} />

        <Stars
          radius={stars.radius}
          depth={stars.depth}
          count={stars.count}
          factor={stars.factor}
          saturation={stars.saturation}
          fade={stars.fade}
          speed={stars.speed}
          color={colors.starColor}
        />

        <Sparkles
          count={sparkles.count}
          scale={sparkles.scale}
          size={sparkles.size}
          speed={sparkles.speed}
          color={colors.sparkleColor}
        />

        <Galaxy colors={colors} />

        {Array.from({ length: comets.count }).map((_, index) => (
          <Comet
            key={index}
            index={index}
            colors={colors}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default HeroScene;
