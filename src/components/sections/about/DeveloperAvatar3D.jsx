
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  ContactShadows,
  MeshDistortMaterial,
} from "@react-three/drei";

function NeonMaterial({ color = "#A855F7" }) {
  return (
    <meshStandardMaterial
      color={color}
      metalness={0.65}
      roughness={0.25}
      emissive={color}
      emissiveIntensity={0.35}
    />
  );
}

// --------------------------------------------------
// FUTURISTIC DEVELOPER CHARACTER
// --------------------------------------------------

function CyberDeveloper() {
  const bodyRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const { x, y } = state.pointer;

    if (bodyRef.current) {
      bodyRef.current.rotation.y = x * 0.16;
      bodyRef.current.rotation.x = -y * 0.08;
      bodyRef.current.position.y = Math.sin(t * 1.2) * 0.06;
    }

    if (headRef.current) {
      headRef.current.rotation.y =
        Math.sin(t * 0.7) * 0.12 + x * 0.1;

      headRef.current.rotation.x =
        Math.sin(t * 0.5) * 0.04 - y * 0.06;
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z =
        -0.45 + Math.sin(t * 1.4) * 0.035;
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z =
        0.45 - Math.sin(t * 1.4) * 0.035;
    }
  });

  return (
    <group ref={bodyRef}>

      {/* HOODIE BODY */}
      <mesh position={[0, -0.35, 0]}>
        <capsuleGeometry args={[0.48, 0.8, 8, 24]} />
        <NeonMaterial color="#25215B" />
      </mesh>

      {/* HOODIE INNER PANEL */}
      <mesh position={[0, -0.12, 0.38]}>
        <boxGeometry args={[0.36, 0.7, 0.025]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.5}
          roughness={0.35}
        />
      </mesh>

      {/* HOODIE NEON ZIPPER */}
      <mesh position={[0, -0.12, 0.405]}>
        <boxGeometry args={[0.018, 0.6, 0.015]} />
        <meshBasicMaterial color="#22D3EE" />
      </mesh>

      {/* NECK */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.15, 0.17, 0.25, 24]} />
        <NeonMaterial color="#D9A58C" />
      </mesh>

      {/* HEAD */}
      <group ref={headRef} position={[0, 0.94, 0]}>

        <mesh>
          <sphereGeometry args={[0.43, 40, 40]} />
          <meshStandardMaterial
            color="#E6B99D"
            roughness={0.65}
          />
        </mesh>

        {/* HAIR */}
        <mesh position={[0, 0.22, -0.025]}>
          <sphereGeometry
            args={[0.445, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]}
          />
          <meshStandardMaterial
            color="#17152C"
            roughness={0.9}
          />
        </mesh>

        {/* FRONT HAIR STRANDS */}
        {[-0.2, -0.07, 0.08, 0.2].map((x, i) => (
          <mesh
            key={i}
            position={[x, 0.29 - Math.abs(x) * 0.25, 0.25]}
            rotation={[0, 0, x * 0.5]}
          >
            <capsuleGeometry args={[0.055, 0.22, 5, 10]} />
            <meshStandardMaterial color="#211B3B" />
          </mesh>
        ))}

        {/* EYES */}
        {[-0.15, 0.15].map((x, i) => (
          <group key={i} position={[x, 0.015, 0.395]}>
            <mesh>
              <sphereGeometry args={[0.045, 20, 20]} />
              <meshStandardMaterial color="#111827" />
            </mesh>

            <mesh position={[0, 0, 0.035]}>
              <sphereGeometry args={[0.018, 16, 16]} />
              <meshBasicMaterial color="#22D3EE" />
            </mesh>
          </group>
        ))}

        {/* NOSE */}
        <mesh position={[0, -0.08, 0.43]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#C98E79" />
        </mesh>

        {/* MOUTH */}
        <mesh position={[0, -0.19, 0.414]}>
          <boxGeometry args={[0.11, 0.018, 0.012]} />
          <meshStandardMaterial color="#7C3F49" />
        </mesh>

        {/* LEFT HEADPHONE */}
        <mesh position={[-0.43, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 32]} />
          <NeonMaterial color="#A855F7" />
        </mesh>

        {/* RIGHT HEADPHONE */}
        <mesh position={[0.43, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 32]} />
          <NeonMaterial color="#22D3EE" />
        </mesh>

        {/* HEADPHONE LIGHTS */}
        {[-0.43, 0.43].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.07]}>
            <circleGeometry args={[0.065, 24]} />
            <meshBasicMaterial
              color={i === 0 ? "#D8B4FE" : "#67E8F9"}
            />
          </mesh>
        ))}
      </group>

      {/* LEFT ARM */}
      <group ref={leftArmRef} position={[-0.42, 0.1, 0.05]}>
        <mesh rotation={[0, 0, -0.55]}>
          <capsuleGeometry args={[0.12, 0.55, 8, 16]} />
          <NeonMaterial color="#3730A3" />
        </mesh>

        <mesh position={[-0.16, -0.28, 0.12]}>
          <sphereGeometry args={[0.13, 20, 20]} />
          <NeonMaterial color="#D9A58C" />
        </mesh>
      </group>

      {/* RIGHT ARM */}
      <group ref={rightArmRef} position={[0.42, 0.1, 0.05]}>
        <mesh rotation={[0, 0, 0.55]}>
          <capsuleGeometry args={[0.12, 0.55, 8, 16]} />
          <NeonMaterial color="#3730A3" />
        </mesh>

        <mesh position={[0.16, -0.28, 0.12]}>
          <sphereGeometry args={[0.13, 20, 20]} />
          <NeonMaterial color="#D9A58C" />
        </mesh>
      </group>
    </group>
  );
}

// --------------------------------------------------
// HOLOGRAPHIC LAPTOP
// --------------------------------------------------

function HolographicLaptop() {
  const laptopRef = useRef();
  const codeRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(t * 0.5) * 0.04;
    }

    if (codeRef.current) {
      codeRef.current.children.forEach((line, index) => {
        line.material.opacity =
          0.55 + Math.sin(t * 2 + index) * 0.35;
      });
    }
  });

  return (
    <group ref={laptopRef} position={[0, -0.82, 0.68]}>

      {/* SCREEN */}
      <mesh position={[0, 0.3, -0.18]}>
        <boxGeometry args={[1.1, 0.72, 0.055]} />
        <meshStandardMaterial
          color="#10182D"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* SCREEN DISPLAY */}
      <mesh position={[0, 0.3, -0.145]}>
        <planeGeometry args={[1, 0.62]} />
        <meshBasicMaterial color="#101C3A" />
      </mesh>

      {/* CODE LINES */}
      <group ref={codeRef}>
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              -0.28 + (i % 2) * 0.08,
              0.51 - i * 0.075,
              -0.13,
            ]}
          >
            <boxGeometry
              args={[
                0.35 + (i % 3) * 0.09,
                0.018,
                0.006,
              ]}
            />
            <meshBasicMaterial
              color={
                i % 2 === 0 ? "#22D3EE" : "#A855F7"
              }
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* LAPTOP KEYBOARD BASE */}
      <mesh position={[0, -0.09, 0.13]}>
        <boxGeometry args={[1.25, 0.07, 0.72]} />
        <meshStandardMaterial
          color="#64748B"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* LAPTOP NEON EDGE */}
      <mesh position={[0, -0.045, 0.49]}>
        <boxGeometry args={[1.12, 0.018, 0.025]} />
        <meshBasicMaterial color="#22D3EE" />
      </mesh>
    </group>
  );
}

// --------------------------------------------------
// NEON ORBIT SYSTEM
// --------------------------------------------------

function NeonOrbit() {
  const orbitRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (orbitRef.current) {
      orbitRef.current.rotation.y = t * 0.3;
      orbitRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.35;
    }
  });

  return (
    <>
      <group ref={ringRef}>
        <mesh rotation={[1.2, 0.2, 0.4]}>
          <torusGeometry args={[1.55, 0.012, 12, 120]} />
          <meshBasicMaterial color="#A855F7" />
        </mesh>

        <mesh rotation={[1.2, 0.2, 0.4]}>
          <torusGeometry args={[1.7, 0.009, 12, 120]} />
          <meshBasicMaterial color="#22D3EE" />
        </mesh>
      </group>

      <group ref={orbitRef}>
        <Float speed={2} floatIntensity={1.4}>
          <mesh position={[-1.4, 1, 0]}>
            <icosahedronGeometry args={[0.19, 1]} />
            <meshStandardMaterial
              color="#A855F7"
              wireframe
              emissive="#A855F7"
              emissiveIntensity={1.5}
            />
          </mesh>
        </Float>

        <Float speed={2.5} floatIntensity={1.2}>
          <mesh position={[1.45, 0.7, 0]}>
            <octahedronGeometry args={[0.19, 0]} />
            <meshStandardMaterial
              color="#22D3EE"
              wireframe
              emissive="#22D3EE"
              emissiveIntensity={1.5}
            />
          </mesh>
        </Float>

        <Float speed={1.8} floatIntensity={1.5}>
          <mesh position={[1.2, -1.05, 0]}>
            <torusGeometry args={[0.17, 0.035, 12, 32]} />
            <NeonMaterial color="#818CF8" />
          </mesh>
        </Float>
      </group>
    </>
  );
}

// --------------------------------------------------
// ENERGY CORE
// --------------------------------------------------

function EnergyCore() {
  const coreRef = useRef();

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y =
        state.clock.elapsedTime * 0.35;
      coreRef.current.rotation.x =
        state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.6} floatIntensity={0.4}>
      <mesh ref={coreRef} position={[0, 1.8, -0.6]}>
        <icosahedronGeometry args={[0.23, 2]} />

        <MeshDistortMaterial
          color="#A855F7"
          emissive="#7E22CE"
          emissiveIntensity={1.1}
          roughness={0.2}
          metalness={0.7}
          distort={0.35}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

// --------------------------------------------------
// MAIN AVATAR
// --------------------------------------------------

export default function DeveloperAvatar3D() {
  return (
    <div className="h-[390px] w-full sm:h-[470px] lg:h-[510px]">

      <Canvas
        camera={{ position: [0, 0.1, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        {/* LIGHTING */}
        <ambientLight intensity={1.5} />

        <directionalLight
          position={[3, 5, 4]}
          intensity={2.5}
        />

        <pointLight
          position={[-3, 2, 3]}
          color="#A855F7"
          intensity={35}
        />

        <pointLight
          position={[3, 0, 2]}
          color="#22D3EE"
          intensity={30}
        />

        <pointLight
          position={[0, -2, -2]}
          color="#6366F1"
          intensity={20}
        />

        {/* CHARACTER */}
        <Float
          speed={1.4}
          rotationIntensity={0.12}
          floatIntensity={0.3}
        >
          <CyberDeveloper />
        </Float>

        {/* LAPTOP */}
        <HolographicLaptop />

        {/* ORBIT */}
        <NeonOrbit />

        {/* ENERGY CORE */}
        <EnergyCore />

        {/* PARTICLES */}
        <Sparkles
          count={85}
          scale={[4.5, 4.5, 3.5]}
          size={2.3}
          speed={0.45}
          color="#A78BFA"
        />

        <Sparkles
          count={35}
          scale={[3.5, 3.5, 3]}
          size={1.3}
          speed={0.8}
          color="#22D3EE"
        />

        {/* SHADOW */}
        <ContactShadows
          position={[0, -1.75, 0]}
          opacity={0.3}
          scale={4}
          blur={2.5}
        />
      </Canvas>
    </div>
  );
}
