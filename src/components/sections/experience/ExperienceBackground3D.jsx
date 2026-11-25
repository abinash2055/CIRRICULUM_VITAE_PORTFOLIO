
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

function OrbitRing({ radius, color, speed, rotation }) {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * speed;
      ringRef.current.rotation.x += delta * speed * 0.15;
    }
  });

  return (
    <mesh
      ref={ringRef}
      rotation={rotation}
    >
      <torusGeometry args={[radius, 0.012, 12, 160]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent
        opacity={0.45}
      />
    </mesh>
  );
}

function FloatingGeometry({ position, color, shape = "box", scale = 0.35 }) {
  return (
    <Float
      speed={1.5}
      rotationIntensity={1.2}
      floatIntensity={1.5}
    >
      <mesh position={position} scale={scale}>
        {shape === "sphere" ? (
          <icosahedronGeometry args={[1, 1]} />
        ) : shape === "torus" ? (
          <torusGeometry args={[0.8, 0.15, 12, 32]} />
        ) : (
          <boxGeometry args={[1, 1, 1]} />
        )}

        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

function NetworkLines() {
  const lines = [
    [[-5, 1.8, -2], [-2.5, 0.5, -1]],
    [[-2.5, 0.5, -1], [0, 1.8, -2]],
    [[0, 1.8, -2], [2.8, 0.2, -1]],
    [[2.8, 0.2, -1], [5, 1.8, -2]],
    [[-4, -2, -1], [-1.5, -0.8, -2]],
    [[-1.5, -0.8, -2], [1.5, -2, -1]],
    [[1.5, -2, -1], [4, -0.8, -2]],
  ];

  return (
    <group>
      {lines.map((points, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flat())}
              itemSize={3}
            />
          </bufferGeometry>

          <lineBasicMaterial
            color={index % 2 === 0 ? "#8B5CF6" : "#22D3EE"}
            transparent
            opacity={0.25}
          />
        </line>
      ))}
    </group>
  );
}

function OrbitScene() {
  const sceneRef = useRef();

  useFrame((state, delta) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y += delta * 0.025;
      sceneRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />

      <pointLight
        position={[0, 3, 5]}
        intensity={2}
        color="#8B5CF6"
      />

      <pointLight
        position={[-5, -3, 2]}
        intensity={2}
        color="#22D3EE"
      />

      <group ref={sceneRef}>
        {/* Main Orbital Rings */}
        <OrbitRing
          radius={3.2}
          color="#8B5CF6"
          speed={0.12}
          rotation={[0.8, 0.2, 0]}
        />

        <OrbitRing
          radius={4.1}
          color="#3B82F6"
          speed={-0.09}
          rotation={[1.2, 0.4, 0.5]}
        />

        <OrbitRing
          radius={5}
          color="#22D3EE"
          speed={0.07}
          rotation={[0.4, 1, 0.8]}
        />

        {/* Floating Geometric Objects */}
        <FloatingGeometry
          position={[-4.5, 1.5, -1]}
          color="#8B5CF6"
          shape="box"
          scale={0.45}
        />

        <FloatingGeometry
          position={[4.5, -1.5, -1]}
          color="#22D3EE"
          shape="sphere"
          scale={0.4}
        />

        <FloatingGeometry
          position={[-3.5, -2, -2]}
          color="#3B82F6"
          shape="torus"
          scale={0.5}
        />

        <FloatingGeometry
          position={[3.5, 2, -2]}
          color="#A78BFA"
          shape="box"
          scale={0.35}
        />

        <FloatingGeometry
          position={[0, 3, -2]}
          color="#22D3EE"
          shape="sphere"
          scale={0.3}
        />

        <FloatingGeometry
          position={[0, -3, -2]}
          color="#8B5CF6"
          shape="torus"
          scale={0.35}
        />

        {/* Digital Network */}
        <NetworkLines />

        {/* Background Particles */}
        <Sparkles
          count={90}
          scale={[15, 9, 7]}
          size={2}
          speed={0.25}
          opacity={0.5}
          color="#A78BFA"
        />

        <Sparkles
          count={45}
          scale={[12, 7, 6]}
          size={1.5}
          speed={0.15}
          opacity={0.4}
          color="#22D3EE"
        />
      </group>
    </>
  );
}

const ExperienceBackground3D = () => {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [0, 0, 12],
          fov: 50,
        }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <OrbitScene />
      </Canvas>
    </div>
  );
};

export default ExperienceBackground3D;
