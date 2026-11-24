
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";

function SkillOrb({ skill, position }) {
    const groupRef = useRef();
    const sphereRef = useRef();
    const logoTexture = useTexture(`/icons/${skill.icon}`);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        groupRef.current.rotation.y += delta * 0.22;
        groupRef.current.rotation.x =
            Math.sin(state.clock.elapsedTime * 0.7) * 0.08;

        if (sphereRef.current) {
            sphereRef.current.rotation.y -= delta * 0.12;
        }
    });

    return (
        <Float
            speed={1.8}
            rotationIntensity={0.18}
            floatIntensity={0.35}
        >
            <group ref={groupRef} position={position}>
                {/* Glass Sphere */}
                <mesh ref={sphereRef}>
                    <sphereGeometry args={[0.72, 64, 64]} />

                    <meshPhysicalMaterial
                        color="#9B8CFF"
                        metalness={0.15}
                        roughness={0.08}
                        transmission={0.88}
                        thickness={1.2}
                        ior={1.35}
                        transparent
                        opacity={0.95}
                        clearcoat={1}
                        clearcoatRoughness={0.05}
                    />
                </mesh>

                {/* Inner glowing sphere */}
                <mesh scale={0.88}>
                    <sphereGeometry args={[0.72, 48, 48]} />
                    <meshBasicMaterial
                        color="#6366F1"
                        transparent
                        opacity={0.07}
                    />
                </mesh>

                {/* Technology logo */}
                <mesh position={[0, 0, 0.55]}>
                    <planeGeometry args={[0.62, 0.62]} />

                    <meshBasicMaterial
                        map={logoTexture}
                        transparent
                        alphaTest={0.05}
                        side={THREE.DoubleSide}
                        toneMapped={false}
                    />
                </mesh>

                {/* Outer energy ring */}
                <mesh rotation={[Math.PI / 2.8, 0.3, 0]}>
                    <torusGeometry args={[0.9, 0.012, 12, 100]} />

                    <meshBasicMaterial
                        color="#22D3EE"
                        transparent
                        opacity={0.7}
                    />
                </mesh>

                {/* Technology name */}
                <Html
                    position={[0, -1.05, 0]}
                    center
                    distanceFactor={10}
                    style={{ pointerEvents: "none" }}
                >
                    <div className="whitespace-nowrap rounded-full border border-white/10 bg-[#080D20]/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
                        {skill.name}
                    </div>
                </Html>
            </group>
        </Float>
    );
}

function OrbCollection({ skills, columns }) {
    const spacingX = 3;
    const spacingY = 2.65;

    return (
        <>
            {skills.map((skill, index) => {
                const row = Math.floor(index / columns);
                const column = index % columns;

                const itemsInRow = Math.min(
                    columns,
                    skills.length - row * columns
                );

                const x = (column - (itemsInRow - 1) / 2) * spacingX;
                const y = -row * spacingY + 0.9;

                return (
                    <SkillOrb
                        key={`${skill.name}-${index}`}
                        skill={skill}
                        position={[x, y, 0]}
                    />
                );
            })}
        </>
    );
}

const SkillOrbScene = ({ skills, columns = 4, isDark }) => {
    const rows = Math.ceil(skills.length / columns);
    const sceneHeight = Math.max(rows * 210, 230);

    return (
        <div
            style={{ height: `${sceneHeight}px` }}
            className="relative w-full"
        >
            <Canvas
                orthographic
                camera={{
                    position: [0, 0, 12],
                    zoom: 75,
                }}
                dpr={[1, 1.5]}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance",
                }}
            >
                <ambientLight intensity={isDark ? 1.1 : 1.5} />

                <directionalLight
                    position={[4, 5, 8]}
                    intensity={2}
                    color="#FFFFFF"
                />

                <pointLight
                    position={[-5, 2, 4]}
                    intensity={25}
                    color="#8B5CF6"
                />

                <pointLight
                    position={[5, -2, 4]}
                    intensity={20}
                    color="#22D3EE"
                />

                <OrbCollection
                    skills={skills}
                    columns={columns}
                />
            </Canvas>
        </div>
    );
};

export default SkillOrbScene;

