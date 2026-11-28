
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useTheme } from "../../../context/ThemeContext";

function FloatingCertificate({ position, rotation = [0, 0, 0], scale = 1 }) {
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;

        ref.current.rotation.y =
            rotation[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.12;
    });

    return (
        <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.5}>
            <group ref={ref} position={position} rotation={rotation} scale={scale}>
                {/* Glass certificate panel */}
                <mesh>
                    <boxGeometry args={[1.15, 1.45, 0.08]} />
                    <meshPhysicalMaterial
                        color="#8b5cf6"
                        metalness={0.25}
                        roughness={0.12}
                        transmission={0.55}
                        thickness={0.5}
                        transparent
                        opacity={0.8}
                    />
                </mesh>

                {/* Certificate border */}
                <mesh position={[0, 0, 0.052]}>
                    <boxGeometry args={[1.02, 1.32, 0.012]} />
                    <meshBasicMaterial color="#67e8f9" wireframe />
                </mesh>

                {/* Certificate emblem */}
                <mesh position={[0, 0.35, 0.09]}>
                    <torusGeometry args={[0.18, 0.025, 12, 48]} />
                    <meshStandardMaterial
                        color="#f0abfc"
                        emissive="#a855f7"
                        emissiveIntensity={1.5}
                    />
                </mesh>

                {/* Certificate text lines */}
                {[0, 1, 2].map((item) => (
                    <mesh key={item} position={[0, -0.05 - item * 0.13, 0.09]}>
                        <boxGeometry args={[0.65 - item * 0.08, 0.025, 0.012]} />
                        <meshBasicMaterial color="#a5f3fc" />
                    </mesh>
                ))}

                {/* Bottom award symbol */}
                <mesh position={[0, -0.48, 0.1]}>
                    <octahedronGeometry args={[0.1, 0]} />
                    <meshStandardMaterial
                        color="#fbbf24"
                        metalness={0.7}
                        roughness={0.2}
                        emissive="#f59e0b"
                        emissiveIntensity={0.6}
                    />
                </mesh>
            </group>
        </Float>
    );
}

function RotatingCrystal({ position, color, size = 0.7 }) {
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.x += 0.003;
        ref.current.rotation.y += 0.006;
        ref.current.position.y =
            position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.15;
    });

    return (
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh ref={ref} position={position}>
                <octahedronGeometry args={[size, 0]} />
                <meshPhysicalMaterial
                    color={color}
                    metalness={0.5}
                    roughness={0.12}
                    transmission={0.35}
                    thickness={0.8}
                    transparent
                    opacity={0.9}
                    wireframe
                />
            </mesh>
        </Float>
    );
}

function OrbitRing({ position, color, scale = 1 }) {
    const ref = useRef();

    useFrame(() => {
        if (!ref.current) return;
        ref.current.rotation.z += 0.002;
        ref.current.rotation.x += 0.001;
    });

    return (
        <mesh ref={ref} position={position} scale={scale}>
            <torusGeometry args={[1, 0.012, 12, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.65} />
        </mesh>
    );
}

function CertificationScene({ isDark }) {
    return (
        <>
            <ambientLight intensity={isDark ? 1.2 : 1.8} />
            <pointLight position={[-5, 3, 4]} color="#8b5cf6" intensity={35} />
            <pointLight position={[5, -2, 3]} color="#22d3ee" intensity={30} />
            <pointLight position={[0, 4, -2]} color="#6366f1" intensity={20} />

            {/* Floating glass certificates */}
            <FloatingCertificate
                position={[-4.4, 0.4, -1]}
                rotation={[0.1, 0.4, -0.12]}
                scale={0.85}
            />
            <FloatingCertificate
                position={[4.4, -0.3, -1]}
                rotation={[-0.1, -0.4, 0.12]}
                scale={0.85}
            />

            {/* Central crystal objects */}
            <RotatingCrystal position={[-2.8, 2, -1]} color="#a78bfa" size={0.55} />
            <RotatingCrystal position={[2.9, -1.8, -1]} color="#67e8f9" size={0.65} />
            <RotatingCrystal position={[0, 2.5, -2]} color="#c084fc" size={0.4} />
            <RotatingCrystal position={[0, -2.4, -1]} color="#22d3ee" size={0.5} />

            {/* Orbital glass rings */}
            <OrbitRing position={[0, 0, -2]} color="#8b5cf6" scale={2.5} />
            <OrbitRing position={[0, 0, -2.2]} color="#22d3ee" scale={3.2} />

            {/* Background particles */}
            <Sparkles
                count={isDark ? 140 : 90}
                scale={[13, 7, 5]}
                size={isDark ? 2.5 : 1.8}
                speed={0.35}
                opacity={isDark ? 0.8 : 0.55}
                color={isDark ? "#a5f3fc" : "#6366f1"}
            />
        </>
    );
}

export default function CertificationBackground3D() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
            frameloop="always"
        >
            <CertificationScene isDark={isDark} />
        </Canvas>
    );
}