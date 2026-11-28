
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import { useTheme } from "../../../context/ThemeContext";
import * as THREE from "three";

/* --------------------------------
   NEURAL NETWORK DATA
--------------------------------- */

const nodes = [
    { id: 1, position: [-7, 1.1, 0], size: 0.19, color: "#8b5cf6" },
    { id: 2, position: [-6, -1, 0.2], size: 0.15, color: "#22d3ee" },
    { id: 3, position: [-4.8, 2, -0.2], size: 0.22, color: "#6366f1" },
    { id: 4, position: [-4.1, -1.8, 0.3], size: 0.18, color: "#22d3ee" },
    { id: 5, position: [-3, 0.8, 0], size: 0.15, color: "#a78bfa" },

    { id: 6, position: [0, 2.1, 0], size: 0.2, color: "#22d3ee" },
    { id: 7, position: [0, -2, 0], size: 0.2, color: "#8b5cf6" },

    { id: 8, position: [3, 0.8, 0], size: 0.15, color: "#a78bfa" },
    { id: 9, position: [4.1, -1.8, 0.3], size: 0.18, color: "#22d3ee" },
    { id: 10, position: [4.8, 2, -0.2], size: 0.22, color: "#6366f1" },
    { id: 11, position: [6, -1, 0.2], size: 0.15, color: "#22d3ee" },
    { id: 12, position: [7, 1.1, 0], size: 0.19, color: "#8b5cf6" },
];

/* --------------------------------
   NEURAL CONNECTIONS
--------------------------------- */

const connections = [
    [0, 1], [0, 2], [1, 2], [1, 3],
    [2, 4], [3, 4], [4, 5], [4, 6],
    [5, 6], [5, 7], [6, 8], [7, 8],
    [7, 9], [8, 9], [8, 10], [9, 11],
    [10, 11], [5, 9], [2, 6], [6, 10],
];

/* --------------------------------
   ANIMATED NEURAL NODE
--------------------------------- */

function NeuralNode({ position, size, color, isDark }) {
    const nodeRef = useRef();
    const glowRef = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (nodeRef.current) {
            const pulse = 1 + Math.sin(time * 2.2 + position[0]) * 0.12;
            nodeRef.current.scale.setScalar(pulse);
            nodeRef.current.rotation.y += 0.008;
        }

        if (glowRef.current) {
            glowRef.current.material.opacity =
                0.12 + (Math.sin(time * 2 + position[1]) + 1) * 0.1;
        }
    });

    return (
        <group position={position}>
            <mesh ref={glowRef}>
                <sphereGeometry args={[size * 2.8, 24, 24]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.2}
                    depthWrite={false}
                />
            </mesh>

            <mesh ref={nodeRef}>
                <icosahedronGeometry args={[size, 2]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={isDark ? 3 : 1.8}
                    metalness={0.6}
                    roughness={0.2}
                />
            </mesh>

            <pointLight
                color={color}
                intensity={isDark ? 1.4 : 0.8}
                distance={2.5}
            />
        </group>
    );
}

/* --------------------------------
   NEURAL NETWORK CONNECTIONS
--------------------------------- */

function NeuralConnections({ isDark }) {
    return (
        <group>
            {connections.map(([start, end], index) => {
                const startPoint = nodes[start].position;
                const endPoint = nodes[end].position;

                return (
                    <Line
                        key={index}
                        points={[startPoint, endPoint]}
                        color={index % 2 === 0 ? "#8b5cf6" : "#22d3ee"}
                        lineWidth={isDark ? 1.3 : 1}
                        transparent
                        opacity={isDark ? 0.65 : 0.42}
                    />
                );
            })}
        </group>
    );
}

/* --------------------------------
   MOVING DATA PARTICLES
--------------------------------- */

function DataPulse({ start, end, color, speed = 1 }) {
    const pulseRef = useRef();

    useFrame((state) => {
        if (!pulseRef.current) return;

        const progress = (state.clock.elapsedTime * speed * 0.35) % 1;

        pulseRef.current.position.set(
            THREE.MathUtils.lerp(start[0], end[0], progress),
            THREE.MathUtils.lerp(start[1], end[1], progress),
            THREE.MathUtils.lerp(start[2], end[2], progress) +
            Math.sin(progress * Math.PI) * 0.12
        );
    });

    return (
        <mesh ref={pulseRef}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshBasicMaterial color={color} />
            <pointLight color={color} intensity={1.2} distance={1.2} />
        </mesh>
    );
}

function DataPulseField() {
    return (
        <group>
            {connections.slice(0, 14).map(([start, end], index) => (
                <DataPulse
                    key={index}
                    start={nodes[start].position}
                    end={nodes[end].position}
                    color={index % 2 === 0 ? "#22d3ee" : "#c084fc"}
                    speed={0.7 + (index % 4) * 0.25}
                />
            ))}
        </group>
    );
}

/* --------------------------------
   CENTRAL AI CORE
--------------------------------- */

function AICore({ isDark }) {
    const coreRef = useRef();
    const ringOneRef = useRef();
    const ringTwoRef = useRef();
    const innerRef = useRef();

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (coreRef.current) {
            coreRef.current.rotation.y = time * 0.25;
            coreRef.current.rotation.x = Math.sin(time * 0.4) * 0.15;
        }

        if (ringOneRef.current) {
            ringOneRef.current.rotation.x = time * 0.45;
            ringOneRef.current.rotation.y = time * 0.25;
        }

        if (ringTwoRef.current) {
            ringTwoRef.current.rotation.y = -time * 0.5;
            ringTwoRef.current.rotation.x = Math.PI / 2 + Math.sin(time) * 0.15;
        }

        if (innerRef.current) {
            const scale = 1 + Math.sin(time * 2) * 0.08;
            innerRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group position={[0, 0, 0.7]}>
            <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.2}>
                {/* Central glowing shell */}
                <mesh ref={coreRef}>
                    <icosahedronGeometry args={[1.05, 3]} />
                    <meshPhysicalMaterial
                        color={isDark ? "#312e81" : "#818cf8"}
                        emissive="#6366f1"
                        emissiveIntensity={isDark ? 1.4 : 0.7}
                        metalness={0.8}
                        roughness={0.18}
                        wireframe
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Inner energy sphere */}
                <mesh ref={innerRef}>
                    <sphereGeometry args={[0.55, 32, 32]} />
                    <meshStandardMaterial
                        color="#22d3ee"
                        emissive="#06b6d4"
                        emissiveIntensity={isDark ? 3 : 1.5}
                        metalness={0.5}
                        roughness={0.15}
                    />
                </mesh>

                {/* Outer orbit ring */}
                <mesh ref={ringOneRef}>
                    <torusGeometry args={[1.45, 0.025, 12, 120]} />
                    <meshBasicMaterial
                        color="#8b5cf6"
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Inner orbit ring */}
                <mesh ref={ringTwoRef}>
                    <torusGeometry args={[1.25, 0.018, 12, 120]} />
                    <meshBasicMaterial
                        color="#22d3ee"
                        transparent
                        opacity={0.9}
                    />
                </mesh>

                {/* Outer halo */}
                <mesh rotation={[Math.PI / 2, 0.2, 0]}>
                    <torusGeometry args={[1.8, 0.012, 8, 120]} />
                    <meshBasicMaterial
                        color="#6366f1"
                        transparent
                        opacity={0.55}
                    />
                </mesh>
            </Float>

            <pointLight
                color="#8b5cf6"
                intensity={isDark ? 3 : 1.5}
                distance={5}
            />
            <pointLight
                color="#22d3ee"
                intensity={isDark ? 2 : 1}
                distance={4}
            />
        </group>
    );
}

/* --------------------------------
   FLOATING DATA ORBS
--------------------------------- */

function FloatingDataOrbs({ isDark }) {
    const orbPositions = [
        [-2.1, 1.6, 0.3],
        [2.1, 1.6, 0.3],
        [-2.1, -1.6, 0.3],
        [2.1, -1.6, 0.3],
    ];

    return (
        <group>
            {orbPositions.map((position, index) => (
                <Float
                    key={index}
                    speed={1.5 + index * 0.25}
                    floatIntensity={0.4}
                    rotationIntensity={0.5}
                >
                    <mesh position={position}>
                        <octahedronGeometry args={[0.18, 1]} />
                        <meshStandardMaterial
                            color={index % 2 === 0 ? "#a78bfa" : "#22d3ee"}
                            emissive={index % 2 === 0 ? "#8b5cf6" : "#06b6d4"}
                            emissiveIntensity={isDark ? 2 : 1}
                            metalness={0.7}
                            roughness={0.2}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
}

/* --------------------------------
   LIGHTING
--------------------------------- */

function NeuralLighting({ isDark }) {
    return (
        <>
            <ambientLight intensity={isDark ? 0.7 : 1.3} />

            <directionalLight
                position={[0, 5, 8]}
                intensity={isDark ? 1.5 : 2}
            />

            <pointLight
                position={[-6, 3, 4]}
                color="#8b5cf6"
                intensity={isDark ? 3 : 1.5}
                distance={12}
            />

            <pointLight
                position={[6, -3, 4]}
                color="#06b6d4"
                intensity={isDark ? 3 : 1.5}
                distance={12}
            />
        </>
    );
}

/* --------------------------------
   COMPLETE NEURAL NETWORK SCENE
--------------------------------- */

function NeuralNetworkScene({ isDark }) {
    const { width } = useThree((state) => state.viewport);
    const networkRef = useRef();

    const responsiveScale = Math.min(1, Math.max(0.48, width / 18));

    useFrame((state) => {
        if (!networkRef.current) return;

        networkRef.current.scale.setScalar(responsiveScale);
        networkRef.current.position.y =
            Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    });

    return (
        <>
            <NeuralLighting isDark={isDark} />

            <group ref={networkRef}>
                <NeuralConnections isDark={isDark} />

                {nodes.map((node) => (
                    <NeuralNode
                        key={node.id}
                        position={node.position}
                        size={node.size}
                        color={node.color}
                        isDark={isDark}
                    />
                ))}

                <DataPulseField />
                <AICore isDark={isDark} />
                <FloatingDataOrbs isDark={isDark} />

                <Sparkles
                    count={isDark ? 150 : 90}
                    scale={[17, 5, 4]}
                    size={isDark ? 2.5 : 1.8}
                    speed={0.35}
                    color={isDark ? "#a78bfa" : "#6366f1"}
                    opacity={isDark ? 0.9 : 0.55}
                />

                <Sparkles
                    count={60}
                    scale={[15, 4, 3]}
                    size={1.5}
                    speed={0.6}
                    color="#22d3ee"
                />
            </group>
        </>
    );
}

/* --------------------------------
   MAIN COMPONENT
--------------------------------- */

export default function CertificationContactScene3D() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="h-full w-full">
            <Canvas
                camera={{ position: [0, 0, 16], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance",
                }}
                frameloop="always"
            >
                <NeuralNetworkScene isDark={isDark} />
            </Canvas>
        </div>
    );
}
