
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  MeshTransmissionMaterial,
} from "@react-three/drei";

// ==========================================
// LEFT: FLOATING GLASS CRYSTAL
// ==========================================

function LeftGlassCrystal() {
  const crystalRef = useRef();
  const ringRef = useRef();
  const secondRingRef = useRef();

  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.x += delta * 0.2;
      crystalRef.current.rotation.y += delta * 0.3;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.15;
      ringRef.current.rotation.y -= delta * 0.2;
    }

    if (secondRingRef.current) {
      secondRingRef.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <group position={[-5, 0, -0.5]}>
      <Float speed={1.4} floatIntensity={0.5} rotationIntensity={0.3}>
        <mesh ref={crystalRef}>
          <octahedronGeometry args={[0.85, 1]} />
          <MeshTransmissionMaterial
            color="#a78bfa"
            transmission={0.95}
            thickness={1.2}
            roughness={0.08}
            ior={1.5}
            chromaticAberration={0.06}
            distortion={0.15}
            backside
          />
        </mesh>

        <mesh ref={ringRef}>
          <torusGeometry args={[1.15, 0.025, 12, 100]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.85}
          />
        </mesh>

        <mesh ref={secondRingRef} rotation={[Math.PI / 2, 0.5, 0]}>
          <torusGeometry args={[1.3, 0.018, 12, 100]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      <pointLight color="#8b5cf6" intensity={1.5} distance={4} />
    </group>
  );
}

// ==========================================
// CENTER: ROTATING GLASS PORTAL
// ==========================================

function GlassPortal() {
  const portalRef = useRef();

  useFrame((state, delta) => {
    if (portalRef.current) {
      portalRef.current.rotation.z += delta * 0.16;
      portalRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    }
  });

  return (
    <group ref={portalRef} position={[0, 0, -0.5]}>
      <mesh>
        <torusGeometry args={[2.05, 0.055, 16, 120]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          metalness={0.7}
          roughness={0.12}
          emissive="#6d28d9"
          emissiveIntensity={1.4}
        />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.92, 0.025, 12, 120]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>

      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[2.16, 0.018, 12, 120]} />
        <meshBasicMaterial color="#60a5fa" />
      </mesh>
    </group>
  );
}

// ==========================================
// CENTER: CRYSTAL ENERGY SPHERE
// ==========================================

function CrystalSphere() {
  const crystalRef = useRef();

  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.x += delta * 0.22;
      crystalRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.4}>
      <group ref={crystalRef} position={[0, 0, 0.3]}>
        <mesh>
          <icosahedronGeometry args={[0.85, 1]} />
          <MeshTransmissionMaterial
            color="#a5f3fc"
            transmission={0.95}
            thickness={1.5}
            roughness={0.08}
            ior={1.4}
            chromaticAberration={0.08}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            backside
          />
        </mesh>

        <mesh scale={0.48}>
          <octahedronGeometry args={[1, 1]} />
          <meshPhysicalMaterial
            color="#a78bfa"
            emissive="#7c3aed"
            emissiveIntensity={1.5}
            metalness={0.8}
            roughness={0.15}
            wireframe
          />
        </mesh>

        <pointLight color="#22d3ee" intensity={2} distance={4} />
      </group>
    </Float>
  );
}

// ==========================================
// CENTER: INFINITY-INSPIRED LOOP
// ==========================================

function InfinityLoop() {
  const loopRef = useRef();

  useFrame((state) => {
    if (loopRef.current) {
      loopRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.18;

      loopRef.current.rotation.y =
        state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group
      ref={loopRef}
      position={[0, 0, -1.1]}
      scale={[1.15, 0.48, 0.3]}
    >
      <mesh>
        <torusKnotGeometry args={[1.6, 0.025, 180, 12, 2, 3]} />
        <meshPhysicalMaterial
          color="#22d3ee"
          emissive="#0891b2"
          emissiveIntensity={1.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// ==========================================
// CENTER: FLOATING GLASS CUBES
// ==========================================

function FloatingCubes() {
  const cubesRef = useRef();

  const cubes = [
    [-3.1, 0.9, 0.2, 0.32],
    [3.1, -0.8, 0.3, 0.38],
    [-2.7, -1.1, -0.5, 0.2],
    [2.7, 1.1, -0.5, 0.24],
    [0, 2.3, -0.8, 0.18],
    [0, -2.3, -0.8, 0.22],
  ];

  useFrame((state, delta) => {
    if (cubesRef.current) {
      cubesRef.current.rotation.y += delta * 0.12;
      cubesRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
    }
  });

  return (
    <group ref={cubesRef}>
      {cubes.map(([x, y, z, size], index) => (
        <Float
          key={index}
          speed={1 + index * 0.15}
          floatIntensity={0.7}
          rotationIntensity={0.8}
        >
          <mesh position={[x, y, z]} rotation={[0.4, 0.3, 0]}>
            <boxGeometry args={[size, size, size]} />
            <meshPhysicalMaterial
              color={index % 2 ? "#22d3ee" : "#a78bfa"}
              metalness={0.35}
              roughness={0.08}
              transmission={0.85}
              thickness={0.6}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ==========================================
// CENTER: HOLOGRAPHIC GLASS BRIDGE
// ==========================================

function GlassBridge() {
  const bridgeRef = useRef();

  useFrame((state) => {
    if (bridgeRef.current) {
      bridgeRef.current.position.y =
        -2.15 + Math.sin(state.clock.elapsedTime * 1.2) * 0.035;
    }
  });

  return (
    <group ref={bridgeRef} position={[0, -2.15, 0]}>
      <mesh scale={[2.8, 0.055, 0.65]}>
        <boxGeometry />
        <meshPhysicalMaterial
          color="#818cf8"
          transmission={0.85}
          thickness={0.5}
          roughness={0.12}
          metalness={0.3}
          transparent
          opacity={0.65}
        />
      </mesh>

      <mesh position={[0, -0.08, 0]} scale={[2.8, 0.015, 0.65]}>
        <boxGeometry />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.8}
        />
      </mesh>

      <pointLight
        position={[0, 0.2, 0]}
        color="#8b5cf6"
        intensity={2}
        distance={5}
      />
    </group>
  );
}

// ==========================================
// CENTER: LIQUID GLASS WAVES
// ==========================================

function LiquidWaves() {
  const waveOne = useRef();
  const waveTwo = useRef();

  useFrame((state, delta) => {
    if (waveOne.current) {
      waveOne.current.rotation.z += delta * 0.09;
      waveOne.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    }

    if (waveTwo.current) {
      waveTwo.current.rotation.z -= delta * 0.07;
    }
  });

  return (
    <group position={[0, 0, -1.8]}>
      <mesh ref={waveOne} rotation={[0.8, 0.2, 0]}>
        <torusGeometry args={[2.6, 0.035, 12, 120]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          metalness={0.6}
          roughness={0.12}
          transparent
          opacity={0.65}
          emissive="#6d28d9"
          emissiveIntensity={0.8}
        />
      </mesh>

      <mesh ref={waveTwo} rotation={[0.7, 0.4, Math.PI / 3]}>
        <torusGeometry args={[2.8, 0.025, 12, 120]} />
        <meshBasicMaterial
          color="#22d3ee"
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// ==========================================
// RIGHT: FLOATING GLASS INFINITY SCULPTURE
// ==========================================

function RightGlassSculpture() {
  const sculptureRef = useRef();
  const orbitRef = useRef();

  useFrame((state, delta) => {
    if (sculptureRef.current) {
      sculptureRef.current.rotation.y += delta * 0.2;
      sculptureRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }

    if (orbitRef.current) {
      orbitRef.current.rotation.z -= delta * 0.18;
    }
  });

  return (
    <group position={[5, 0, -0.5]}>
      <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.4}>
        <group ref={sculptureRef}>
          <mesh>
            <torusKnotGeometry args={[0.75, 0.09, 120, 12, 2, 3]} />
            <MeshTransmissionMaterial
              color="#67e8f9"
              transmission={0.9}
              thickness={0.8}
              roughness={0.1}
              metalness={0.4}
              chromaticAberration={0.05}
              backside
            />
          </mesh>

          <mesh scale={0.35}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color="#a78bfa" wireframe />
          </mesh>
        </group>

        <mesh ref={orbitRef}>
          <torusGeometry args={[1.2, 0.025, 12, 100]} />
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>

      <pointLight color="#22d3ee" intensity={1.5} distance={4} />
    </group>
  );
}

// ==========================================
// COMPLETE GLASSFUSION SCENE
// ==========================================

function GlassFusionScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={1.2} />
      <pointLight
        position={[0, 3, 4]}
        intensity={2.5}
        color="#8b5cf6"
      />
      <pointLight
        position={[-4, 0, 2]}
        intensity={2}
        color="#22d3ee"
      />
      <pointLight
        position={[4, -1, 1]}
        intensity={2}
        color="#3b82f6"
      />

      {/* Left composition */}
      <LeftGlassCrystal />

      {/* Center composition */}
      <GlassPortal />
      <InfinityLoop />
      <CrystalSphere />
      <FloatingCubes />
      <GlassBridge />
      <LiquidWaves />

      {/* Right composition */}
      <RightGlassSculpture />

      {/* Ambient particles */}
      <Sparkles
        count={100}
        scale={[10, 5, 4]}
        size={2}
        speed={0.35}
        color="#a5f3fc"
        opacity={0.8}
      />

      <Sparkles
        count={55}
        scale={[8, 4, 3]}
        size={3}
        speed={0.2}
        color="#c4b5fd"
        opacity={0.65}
      />
    </>
  );
}

// ==========================================
// MAIN CANVAS
// ==========================================

export default function ExperienceEducationScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      frameloop="always"
    >
      <GlassFusionScene />
    </Canvas>
  );
}
