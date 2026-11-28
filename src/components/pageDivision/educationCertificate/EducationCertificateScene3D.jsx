
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Float,
    Sparkles,
    MeshTransmissionMaterial,
} from "@react-three/drei";

const objects = [
    { type: "sphere", color: "#a78bfa", position: -8, size: 1.25 },
    { type: "knot", color: "#22d3ee", position: -4, size: 1.25 },
    { type: "crystal", color: "#8b5cf6", position: 0, size: 1.45 },
    { type: "cube", color: "#67e8f9", position: 4, size: 1.25 },
    { type: "helix", color: "#6366f1", position: 8, size: 1.3 },
];

function GlassObject({ item, index }) {
    const objectRef = useRef();

    useFrame((state, delta) => {
        if (!objectRef.current) return;

        objectRef.current.rotation.x += delta * (0.2 + index * 0.04);
        objectRef.current.rotation.y += delta * (0.35 + index * 0.05);
        objectRef.current.rotation.z += delta * 0.12;
    });

    const material = (
        <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={256}
            transmission={1}
            thickness={1.5}
            roughness={0.08}
            chromaticAberration={0.12}
            anisotropy={0.3}
            color={item.color}
        />
    );

    return (
        <Float
            speed={1.5 + index * 0.2}
            rotationIntensity={0.3}
            floatIntensity={0.6}
        >
            <group
                ref={objectRef}
                position={[item.position, 0, 0]}
                scale={item.size}
            >
                {item.type === "sphere" && (
                    <>
                        <mesh>{/* Glass sphere */}
                            <sphereGeometry args={[1, 48, 48]} />
                            {material}
                        </mesh>
                        <mesh scale={1.08}>
                            <sphereGeometry args={[1, 24, 24]} />
                            <meshBasicMaterial
                                color={item.color}
                                wireframe
                                transparent
                                opacity={0.25}
                            />
                        </mesh>
                    </>
                )}

                {item.type === "knot" && (
                    <>
                        <mesh>
                            <torusKnotGeometry args={[0.72, 0.2, 160, 24, 2, 3]} />
                            {material}
                        </mesh>
                    </>
                )}

                {item.type === "crystal" && (
                    <>
                        <mesh>
                            <octahedronGeometry args={[1, 1]} />
                            {material}
                        </mesh>
                        <mesh scale={1.12}>
                            <octahedronGeometry args={[1, 1]} />
                            <meshBasicMaterial
                                color="#c4b5fd"
                                wireframe
                                transparent
                                opacity={0.4}
                            />
                        </mesh>
                    </>
                )}

                {item.type === "cube" && (
                    <>
                        <mesh>
                            <boxGeometry args={[1.35, 1.35, 1.35]} />
                            {material}
                        </mesh>
                        <mesh scale={1.12}>
                            <boxGeometry args={[1.35, 1.35, 1.35]} />
                            <meshBasicMaterial
                                color={item.color}
                                wireframe
                                transparent
                                opacity={0.35}
                            />
                        </mesh>
                    </>
                )}

                {item.type === "helix" && (
                    <>
                        <mesh rotation={[0.4, 0.3, 0]}>
                            <torusKnotGeometry args={[0.7, 0.13, 180, 20, 3, 5]} />
                            {material}
                        </mesh>
                        <mesh rotation={[0.4, 0.3, 0]} scale={1.13}>
                            <torusKnotGeometry args={[0.7, 0.13, 100, 12, 3, 5]} />
                            <meshBasicMaterial
                                color="#22d3ee"
                                wireframe
                                transparent
                                opacity={0.3}
                            />
                        </mesh>
                    </>
                )}
            </group>
        </Float>
    );
}

function GlassGallery() {
    const { width } = useThree((state) => state.viewport);
    const groupRef = useRef();

    // Automatically scale the gallery on smaller screens.
    const responsiveScale = Math.min(1, width / 12);

    useFrame((state) => {
        if (!groupRef.current) return;

        groupRef.current.scale.setScalar(responsiveScale);
        groupRef.current.position.y =
            Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    });

    return (
        <group ref={groupRef}>
            {objects.map((item, index) => (
                <GlassObject key={item.type} item={item} index={index} />
            ))}
        </group>
    );
}

function GalleryScene() {
    return (
        <>
            <ambientLight intensity={1.5} />

            <pointLight
                position={[0, 3, 5]}
                intensity={40}
                color="#a78bfa"
                distance={15}
            />

            <pointLight
                position={[-5, -2, 3]}
                intensity={30}
                color="#22d3ee"
                distance={12}
            />

            <pointLight
                position={[5, 2, 3]}
                intensity={30}
                color="#6366f1"
                distance={12}
            />

            <GlassGallery />

            <Sparkles
                count={100}
                scale={[13, 5, 5]}
                size={2}
                speed={0.35}
                opacity={0.7}
                color="#a78bfa"
            />

            <Sparkles
                count={60}
                scale={[12, 4, 4]}
                size={2.5}
                speed={0.5}
                opacity={0.6}
                color="#22d3ee"
            />
        </>
    );
}

export default function EducationCertificateScene3D() {
    return (
        <Canvas
            camera={{ position: [0, 0, 19], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true }}
            frameloop="always"
        >
            <GalleryScene />
        </Canvas>
    );
}
