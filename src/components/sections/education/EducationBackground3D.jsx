
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

function AcademicOrbitalRing({ radius, color, rotationSpeed }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.3;

      ringRef.current.rotation.y += rotationSpeed * 0.01;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.012, 12, 120]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.65}
      />
    </mesh>
  );
}

function FloatingAcademicObjects() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.15;

      groupRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.12) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main academic crystal */}
      <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshPhysicalMaterial
            color="#8b5cf6"
            roughness={0.2}
            metalness={0.65}
            transparent
            opacity={0.55}
            wireframe
          />
        </mesh>
      </Float>

      {/* Floating book-like object */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh position={[-3, 1.3, -1]}>
          <boxGeometry args={[1.2, 0.12, 0.9]} />
          <meshStandardMaterial
            color="#06b6d4"
            metalness={0.6}
            roughness={0.3}
            wireframe
          />
        </mesh>
      </Float>

      {/* Floating knowledge sphere */}
      <Float speed={1.5} rotationIntensity={0.7} floatIntensity={1}>
        <mesh position={[3, -1.2, -1]}>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#2563eb"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* Small floating geometric object */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh position={[3.8, 2, -2]}>
          <octahedronGeometry args={[0.45]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#7c3aed"
            emissiveIntensity={0.4}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-3.8, -1.8, -2]}>
          <dodecahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#0891b2"
            emissiveIntensity={0.4}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

function EducationScene() {
  return (
    <>
      <ambientLight intensity={1.5} />

      <pointLight
        position={[4, 4, 5]}
        intensity={2}
        color="#8b5cf6"
      />

      <pointLight
        position={[-4, -3, 4]}
        intensity={1.8}
        color="#06b6d4"
      />

      <AcademicOrbitalRing
        radius={2}
        color="#8b5cf6"
        rotationSpeed={0.5}
      />

      <AcademicOrbitalRing
        radius={3}
        color="#06b6d4"
        rotationSpeed={-0.3}
      />

      <FloatingAcademicObjects />

      <Sparkles
        count={100}
        scale={12}
        size={2}
        speed={0.3}
        opacity={0.65}
        color="#a78bfa"
      />
    </>
  );
}

const EducationBackground3D = () => {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <EducationScene />
      </Canvas>
    </div>
  );
};

export default EducationBackground3D;
