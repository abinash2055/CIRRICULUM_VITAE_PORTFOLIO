
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    OrbitControls,
    Sparkles,
    Stars,
} from "@react-three/drei";
import * as THREE from "three";

// ---------------------------------------------
// ORBITAL PATHS
// ---------------------------------------------

function OrbitPath({ radius, color = "#8b7bff" }) {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.008, radius + 0.008, 180]} />

            <meshBasicMaterial
                color={color}
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

// ---------------------------------------------
// PLANET MOONS
// ---------------------------------------------

function PlanetMoons({ moons = [] }) {
    const orbitRefs = useRef([]);

    useFrame((state, delta) => {
        orbitRefs.current.forEach((orbit, index) => {
            if (orbit) {
                orbit.rotation.y += delta * (moons[index]?.speed || 1);
            }
        });
    });

    return (
        <>
            {moons.map((moon, index) => (
                <group
                    key={moon.name}
                    ref={(element) => {
                        orbitRefs.current[index] = element;
                    }}
                    rotation={[
                        moon.tilt || 0,
                        (index * Math.PI) / moons.length,
                        moon.inclination || 0,
                    ]}
                >
                    <mesh position={[moon.distance, 0, 0]}>
                        <sphereGeometry args={[moon.size, 20, 20]} />

                        <meshStandardMaterial
                            color={moon.color || "#d5d9e6"}
                            roughness={0.85}
                            metalness={0.05}
                        />
                    </mesh>

                    {/* Moon trail / orbit */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry
                            args={[
                                moon.distance - 0.003,
                                moon.distance + 0.003,
                                64,
                            ]}
                        />

                        <meshBasicMaterial
                            color={moon.color || "#d5d9e6"}
                            transparent
                            opacity={0.12}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </group>
            ))}
        </>
    );
}

// ---------------------------------------------
// PLANET COMPONENT
// ---------------------------------------------

function Planet({
    name,
    radius,
    size,
    color,
    speed,
    rotationSpeed,
    emissive = "#000000",
    emissiveIntensity = 0,
    moons = [],
    hasRings = false,
    ringColor = "#d6b98b",
    ringTilt = 0.35,
}) {
    const orbitRef = useRef();
    const planetRef = useRef();

    useFrame((state, delta) => {
        if (orbitRef.current) {
            orbitRef.current.rotation.y += delta * speed;
        }

        if (planetRef.current) {
            planetRef.current.rotation.y += delta * rotationSpeed;
        }
    });

    return (
        <group ref={orbitRef}>
            <group position={[radius, 0, 0]}>
                <Float
                    speed={0.6}
                    rotationIntensity={0.025}
                    floatIntensity={0.035}
                >
                    {/* Planet */}
                    <mesh ref={planetRef}>
                        <sphereGeometry args={[size, 48, 48]} />

                        <meshStandardMaterial
                            color={color}
                            roughness={0.72}
                            metalness={0.12}
                            emissive={emissive}
                            emissiveIntensity={emissiveIntensity}
                        />
                    </mesh>

                    {/* Planet rings */}
                    {hasRings && (
                        <group rotation={[ringTilt, 0, 0.2]}>
                            <mesh>
                                <ringGeometry
                                    args={[size * 1.35, size * 2.25, 100]}
                                />

                                <meshStandardMaterial
                                    color={ringColor}
                                    metalness={0.55}
                                    roughness={0.5}
                                    transparent
                                    opacity={0.78}
                                    side={THREE.DoubleSide}
                                />
                            </mesh>

                            <mesh>
                                <ringGeometry
                                    args={[size * 1.55, size * 1.75, 100]}
                                />

                                <meshBasicMaterial
                                    color="#fff0c2"
                                    transparent
                                    opacity={0.55}
                                    side={THREE.DoubleSide}
                                />
                            </mesh>
                        </group>
                    )}

                    {/* Moons */}
                    <PlanetMoons moons={moons} />
                </Float>
            </group>
        </group>
    );
}

// ---------------------------------------------
// SUN
// ---------------------------------------------

function Sun() {
    const sunRef = useRef();
    const glowRef = useRef();
    const coronaRef = useRef();

    useFrame((state, delta) => {
        if (sunRef.current) {
            sunRef.current.rotation.y += delta * 0.12;
        }

        if (glowRef.current) {
            const pulse =
                1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;

            glowRef.current.scale.setScalar(pulse);
        }

        if (coronaRef.current) {
            coronaRef.current.rotation.z += delta * 0.08;
        }
    });

    return (
        <group>
            {/* Outer glow */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[1.05, 48, 48]} />

                <meshBasicMaterial
                    color="#ff9f43"
                    transparent
                    opacity={0.12}
                />
            </mesh>

            {/* Inner glow */}
            <mesh>
                <sphereGeometry args={[0.78, 48, 48]} />

                <meshBasicMaterial
                    color="#ffb347"
                    transparent
                    opacity={0.16}
                />
            </mesh>

            {/* Sun */}
            <mesh ref={sunRef}>
                <sphereGeometry args={[0.5, 64, 64]} />

                <meshStandardMaterial
                    color="#ffbd59"
                    emissive="#ff7b19"
                    emissiveIntensity={2.5}
                    roughness={0.4}
                />
            </mesh>

            {/* Solar corona */}
            <mesh ref={coronaRef}>
                <torusGeometry args={[0.7, 0.018, 12, 100]} />

                <meshBasicMaterial
                    color="#ffb347"
                    transparent
                    opacity={0.6}
                />
            </mesh>

            <pointLight
                color="#ffb45e"
                intensity={22}
                distance={18}
                decay={2}
            />

            <pointLight
                color="#a78bfa"
                intensity={3}
                distance={12}
            />
        </group>
    );
}

// ---------------------------------------------
// COMPLETE NINE-PLANET SOLAR SYSTEM
// ---------------------------------------------

function PlanetarySystem() {
    return (
        <group rotation={[0.12, 0, -0.12]}>
            <Sun />

            {/* Orbital paths */}
            <OrbitPath radius={1.65} />
            <OrbitPath radius={2.35} />
            <OrbitPath radius={3.15} />
            <OrbitPath radius={4.0} />
            <OrbitPath radius={5.0} />
            <OrbitPath radius={6.1} />
            <OrbitPath radius={7.2} />
            <OrbitPath radius={8.3} />
            <OrbitPath radius={9.35} color="#22d3ee" />

            {/* 1. Mercury */}
            <Planet
                name="Mercury"
                radius={1.65}
                size={0.085}
                color="#aaa6a1"
                speed={1.25}
                rotationSpeed={1.8}
            />

            {/* 2. Venus */}
            <Planet
                name="Venus"
                radius={2.35}
                size={0.145}
                color="#e4b879"
                speed={0.92}
                rotationSpeed={0.45}
                emissive="#8b5424"
                emissiveIntensity={0.08}
            />

            {/* 3. Earth + Moon */}
            <Planet
                name="Earth"
                radius={3.15}
                size={0.19}
                color="#287de0"
                speed={0.68}
                rotationSpeed={1.7}
                emissive="#063b75"
                emissiveIntensity={0.35}
                moons={[
                    {
                        name: "Moon",
                        distance: 0.34,
                        size: 0.055,
                        color: "#d7dce9",
                        speed: 1.7,
                    },
                ]}
            />

            {/* 4. Mars + Phobos + Deimos */}
            <Planet
                name="Mars"
                radius={4.0}
                size={0.145}
                color="#c65e43"
                speed={0.5}
                rotationSpeed={1.2}
                emissive="#612016"
                emissiveIntensity={0.1}
                moons={[
                    {
                        name: "Phobos",
                        distance: 0.24,
                        size: 0.035,
                        color: "#9c897c",
                        speed: 2.1,
                    },
                    {
                        name: "Deimos",
                        distance: 0.34,
                        size: 0.025,
                        color: "#b8a89a",
                        speed: 1.2,
                        tilt: 0.25,
                    },
                ]}
            />

            {/* 5. Jupiter + Four Galilean Moons */}
            <Planet
                name="Jupiter"
                radius={5.0}
                size={0.34}
                color="#d5a77c"
                speed={0.34}
                rotationSpeed={0.85}
                emissive="#70452b"
                emissiveIntensity={0.08}
                moons={[
                    {
                        name: "Io",
                        distance: 0.49,
                        size: 0.055,
                        color: "#e9c56f",
                        speed: 1.8,
                    },
                    {
                        name: "Europa",
                        distance: 0.62,
                        size: 0.05,
                        color: "#c9bba2",
                        speed: 1.35,
                        tilt: 0.2,
                    },
                    {
                        name: "Ganymede",
                        distance: 0.77,
                        size: 0.075,
                        color: "#a89a85",
                        speed: 0.95,
                        tilt: -0.2,
                    },
                    {
                        name: "Callisto",
                        distance: 0.93,
                        size: 0.07,
                        color: "#77716d",
                        speed: 0.65,
                        tilt: 0.3,
                    },
                ]}
            />

            {/* 6. Saturn + Five Representative Moons */}
            <Planet
                name="Saturn"
                radius={6.1}
                size={0.29}
                color="#d8bd8a"
                speed={0.25}
                rotationSpeed={0.9}
                hasRings
                ringColor="#e5c99c"
                ringTilt={0.48}
                moons={[
                    {
                        name: "Titan",
                        distance: 0.52,
                        size: 0.065,
                        color: "#d8a45e",
                        speed: 1.1,
                    },
                    {
                        name: "Enceladus",
                        distance: 0.67,
                        size: 0.035,
                        color: "#e4e9f0",
                        speed: 0.95,
                    },
                    {
                        name: "Rhea",
                        distance: 0.82,
                        size: 0.045,
                        color: "#b7b9c0",
                        speed: 0.8,
                    },
                    {
                        name: "Dione",
                        distance: 0.97,
                        size: 0.04,
                        color: "#c8c8c5",
                        speed: 0.68,
                    },
                    {
                        name: "Iapetus",
                        distance: 1.12,
                        size: 0.05,
                        color: "#a89d8c",
                        speed: 0.5,
                    },
                ]}
            />

            {/* 7. Uranus + Representative Moons */}
            <Planet
                name="Uranus"
                radius={7.2}
                size={0.24}
                color="#77d5df"
                speed={0.17}
                rotationSpeed={0.65}
                hasRings
                ringColor="#9de7ec"
                ringTilt={1.05}
                moons={[
                    {
                        name: "Titania",
                        distance: 0.42,
                        size: 0.05,
                        color: "#b7c9d1",
                        speed: 1.15,
                    },
                    {
                        name: "Oberon",
                        distance: 0.55,
                        size: 0.047,
                        color: "#8f969d",
                        speed: 0.9,
                    },
                    {
                        name: "Umbriel",
                        distance: 0.67,
                        size: 0.04,
                        color: "#666b77",
                        speed: 0.75,
                    },
                    {
                        name: "Ariel",
                        distance: 0.78,
                        size: 0.04,
                        color: "#b9c4c7",
                        speed: 0.6,
                    },
                    {
                        name: "Miranda",
                        distance: 0.88,
                        size: 0.027,
                        color: "#c5bdb5",
                        speed: 0.48,
                    },
                ]}
            />

            {/* 8. Neptune + Triton + Nereid */}
            <Planet
                name="Neptune"
                radius={8.3}
                size={0.235}
                color="#315bdc"
                speed={0.12}
                rotationSpeed={0.85}
                emissive="#101f89"
                emissiveIntensity={0.3}
                moons={[
                    {
                        name: "Triton",
                        distance: 0.42,
                        size: 0.055,
                        color: "#d5c9c3",
                        speed: -0.9,
                        tilt: 0.5,
                    },
                    {
                        name: "Nereid",
                        distance: 0.59,
                        size: 0.025,
                        color: "#a6a9b5",
                        speed: 0.42,
                        tilt: 0.2,
                    },
                ]}
            />

            {/* 9. Pluto + Charon */}
            <Planet
                name="Pluto"
                radius={9.35}
                size={0.12}
                color="#b69b88"
                speed={0.085}
                rotationSpeed={0.55}
                moons={[
                    {
                        name: "Charon",
                        distance: 0.2,
                        size: 0.045,
                        color: "#d3c4b5",
                        speed: 0.75,
                    },
                ]}
            />
        </group>
    );
}

// ---------------------------------------------
// COMET FIELD
// ---------------------------------------------


// ---------------------------------------------
// MOVING COMETS
// ---------------------------------------------

function Comet({ delay = 0, color = "#a5f3fc", speed = 1 }) {
    const cometRef = useRef();

    useFrame((state) => {
        if (!cometRef.current) return;

        const time = state.clock.elapsedTime * speed + delay;

        // Move comet across the scene and repeat
        const progress = (time * 0.12) % 1;

        cometRef.current.position.x = -15 + progress * 30;
        cometRef.current.position.y =
            5 + Math.sin(time * 1.5) * 2;

        cometRef.current.position.z =
            -3 + Math.cos(time * 0.8) * 2;

        cometRef.current.rotation.z =
            Math.sin(time * 0.7) * 0.12;
    });

    return (
        <group ref={cometRef}>
            {/* Glowing comet head */}
            <mesh>
                <sphereGeometry args={[0.12, 24, 24]} />
                <meshBasicMaterial color={color} />
            </mesh>

            {/* Outer glow */}
            <mesh>
                <sphereGeometry args={[0.24, 24, 24]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.2}
                />
            </mesh>

            {/* Long comet tail */}
            <mesh
                position={[-1.15, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
            >
                <coneGeometry args={[0.17, 2.6, 24]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.22}
                    depthWrite={false}
                />
            </mesh>

            {/* Bright inner tail */}
            <mesh
                position={[-0.65, 0, 0]}
                rotation={[0, 0, Math.PI / 2]}
            >
                <coneGeometry args={[0.07, 1.4, 20]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.3}
                    depthWrite={false}
                />
            </mesh>

            <pointLight
                color={color}
                intensity={2}
                distance={3}
            />
        </group>
    );
}

// ---------------------------------------------
// COMET FIELD
// ---------------------------------------------

function CometField() {
    return (
        <>
            <Comet delay={0} color="#67e8f9" speed={1} />
            <Comet delay={8} color="#c084fc" speed={0.8} />
            <Comet delay={16} color="#f0abfc" speed={1.15} />
        </>
    );
}



// ---------------------------------------------
// AUSTRONAUR STAR FIELD
// ---------------------------------------------


// ---------------------------------------------
// FLOATING 3D ASTRONAUT
// ---------------------------------------------

function Astronaut({ phase = 0, scale = 1 }) {
    const astronautRef = useRef();

    useFrame((state) => {
        if (!astronautRef.current) return;

        const time = state.clock.elapsedTime * 0.35 + phase;

        // Floating movement
        astronautRef.current.position.x =
            Math.sin(time) * 10.5;

        astronautRef.current.position.y =
            3.2 + Math.sin(time * 1.8) * 1.2;

        astronautRef.current.position.z =
            -1.5 + Math.cos(time) * 1.2;

        // Gentle rotation
        astronautRef.current.rotation.z =
            Math.sin(time * 1.3) * 0.18;

        astronautRef.current.rotation.y =
            Math.sin(time * 0.7) * 0.5;
    });

    const suitMaterial = new THREE.MeshStandardMaterial({
        color: "#e8edf7",
        roughness: 0.35,
        metalness: 0.25,
    });

    const jointMaterial = new THREE.MeshStandardMaterial({
        color: "#94a3b8",
        metalness: 0.5,
        roughness: 0.35,
    });

    const visorMaterial = new THREE.MeshPhysicalMaterial({
        color: "#172554",
        metalness: 0.85,
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
    });

    const cyanMaterial = new THREE.MeshStandardMaterial({
        color: "#22d3ee",
        emissive: "#0891b2",
        emissiveIntensity: 0.8,
        metalness: 0.5,
    });

    return (
        <group ref={astronautRef} scale={scale}>
            {/* Spacesuit Body */}
            <mesh position={[0, 0, 0]}>
                <capsuleGeometry args={[0.28, 0.48, 8, 16]} />
                <primitive object={suitMaterial} attach="material" />
            </mesh>

            {/* Helmet */}
            <mesh position={[0, 0.57, 0]}>
                <sphereGeometry args={[0.31, 32, 32]} />
                <primitive object={suitMaterial} attach="material" />
            </mesh>

            {/* Dark Glass Visor */}
            <mesh position={[0, 0.58, 0.245]} scale={[0.78, 0.65, 0.25]}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <primitive object={visorMaterial} attach="material" />
            </mesh>

            {/* Visor reflection */}
            <mesh position={[-0.07, 0.67, 0.31]} scale={[0.16, 0.035, 0.015]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial
                    color="#a5f3fc"
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Backpack */}
            <mesh position={[0, 0.02, -0.34]}>
                <boxGeometry args={[0.35, 0.55, 0.2]} />
                <primitive object={jointMaterial} attach="material" />
            </mesh>

            {/* Chest control panel */}
            <mesh position={[0, 0.08, 0.27]}>
                <boxGeometry args={[0.22, 0.19, 0.035]} />
                <primitive object={cyanMaterial} attach="material" />
            </mesh>

            {/* Left arm */}
            <group position={[-0.36, 0.13, 0]} rotation={[0, 0, 0.45]}>
                <mesh>
                    <capsuleGeometry args={[0.105, 0.35, 6, 12]} />
                    <primitive object={suitMaterial} attach="material" />
                </mesh>

                <mesh position={[0, -0.27, 0]}>
                    <sphereGeometry args={[0.11, 16, 16]} />
                    <primitive object={jointMaterial} attach="material" />
                </mesh>
            </group>

            {/* Right arm */}
            <group position={[0.36, 0.13, 0]} rotation={[0, 0, -0.45]}>
                <mesh>
                    <capsuleGeometry args={[0.105, 0.35, 6, 12]} />
                    <primitive object={suitMaterial} attach="material" />
                </mesh>

                <mesh position={[0, -0.27, 0]}>
                    <sphereGeometry args={[0.11, 16, 16]} />
                    <primitive object={jointMaterial} attach="material" />
                </mesh>
            </group>

            {/* Left leg */}
            <mesh position={[-0.16, -0.48, 0]}>
                <capsuleGeometry args={[0.12, 0.27, 6, 12]} />
                <primitive object={suitMaterial} attach="material" />
            </mesh>

            {/* Right leg */}
            <mesh position={[0.16, -0.48, 0]}>
                <capsuleGeometry args={[0.12, 0.27, 6, 12]} />
                <primitive object={suitMaterial} attach="material" />
            </mesh>

            {/* Boots */}
            <mesh position={[-0.16, -0.7, 0.04]}>
                <boxGeometry args={[0.23, 0.14, 0.28]} />
                <primitive object={jointMaterial} attach="material" />
            </mesh>

            <mesh position={[0.16, -0.7, 0.04]}>
                <boxGeometry args={[0.23, 0.14, 0.28]} />
                <primitive object={jointMaterial} attach="material" />
            </mesh>

            {/* Small glowing suit details */}
            <mesh position={[0, 0.28, 0.27]}>
                <sphereGeometry args={[0.045, 16, 16]} />
                <primitive object={cyanMaterial} attach="material" />
            </mesh>
        </group>
    );
}

// ---------------------------------------------
// FLOATING ASTRONAUTS
// ---------------------------------------------

function AstronautField() {
    return (
        <>
            <Astronaut phase={0} scale={0.72} />
            <Astronaut phase={Math.PI} scale={0.48} />
        </>
    );
}

// ---------------------------------------------
// COSMIC STAR FIELD
// ---------------------------------------------


function CosmicStars({ isDark = true }) {
    const starGroup = useRef();

    const starColor = isDark ? "#ffffff" : "#4338ca";
    const sparkleColor = isDark ? "#a5f3fc" : "#4f46e5";
    const accentColor = isDark ? "#c084fc" : "#7c3aed";

    useFrame((state, delta) => {
        if (starGroup.current) {
            starGroup.current.rotation.y += delta * 0.006;
            starGroup.current.rotation.x += delta * 0.002;
        }
    });

    return (
        <group ref={starGroup}>
            <Stars
                radius={110}
                depth={80}
                count={4500}
                factor={4}
                saturation={0.5}
                fade
                speed={0.35}
            />

            <Stars
                radius={70}
                depth={45}
                count={1800}
                factor={2}
                saturation={0.8}
                fade
                speed={0.65}
            />

            <Sparkles
                count={220}
                scale={22}
                size={2.5}
                speed={0.25}
                opacity={0.9}
                color={sparkleColor}
            />

            <Sparkles
                count={100}
                scale={18}
                size={3}
                speed={0.4}
                opacity={0.85}
                color={accentColor}
            />

            <Sparkles
                count={65}
                scale={15}
                size={2}
                speed={0.3}
                opacity={0.8}
                color={starColor}
            />
        </group>
    );
}


// ---------------------------------------------
// MAIN UNIVERSE
// ---------------------------------------------


function UniverseScene() {
    return (
        <>
            <ambientLight intensity={0.7} />

            <directionalLight
                position={[8, 10, 10]}
                intensity={1.6}
            />

            <pointLight
                position={[-8, 5, -6]}
                color="#8b5cf6"
                intensity={5}
            />

            <pointLight
                position={[8, -5, 5]}
                color="#22d3ee"
                intensity={4}
            />

            {/* Nine planets and their moons */}
            <PlanetarySystem />

            {/* Moving comets */}
            <CometField />

            {/* Floating astronauts */}
            <AstronautField />

            {/* Cosmic stars and particles */}
            <CosmicStars />

            <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate
                autoRotate={false}
                rotateSpeed={0.35}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={(Math.PI * 3) / 4}
            />
        </>
    );
}


// ---------------------------------------------
// CONTACT 3D SCENE
// ---------------------------------------------

const Contact3DScene = () => {
    return (
        <div className="h-full w-full">
            <Canvas
                camera={{
                    position: [0, 12, 22],
                    fov: 48,
                }}
                dpr={[1, 1.5]}
                gl={{
                    alpha: true,
                    antialias: true,
                }}
                frameloop="always"
            >
                <UniverseScene />
            </Canvas>
        </div>
    );
};

export default Contact3DScene;
