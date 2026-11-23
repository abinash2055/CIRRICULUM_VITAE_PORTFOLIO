
const heroSceneData = {
    container: {
        height: "h-[340px] md:h-[480px]",
    },

    reveal: {
        delay: 4,
        duration: 7,
        initialScale: 0.35,
        initialY: 120,
    },

    camera: {
        position: [0, 0, 5],
        fov: 45,
    },

    lighting: {
        ambient: {
            intensity: 1.5,
        },

        lights: [
            {
                position: [3, 3, 3],
                intensity: 30,
                color: "#6366f1",
            },
            {
                position: [-3, -2, 2],
                intensity: 20,
                color: "#22d3ee",
            },
        ],
    },

    floatingObject: {
        scale: 1.4,

        geometry: {
            radius: 1,
            detail: 2,
        },

        movement: {
            radiusX: 0.9,
            radiusY: 0.55,
            speedX: 1.5,
        },

        material: {
            color: "#7771ff",
            emissive: "#4226b8",
            emissiveIntensity: 0.8,
            metalness: 0.8,
            roughness: 0.15,
            wireframe: true,
        },

        rotation: {
            x: 3.5,
            y: 5.0,
            z: 3.0,
        },
    },

    sparkles: {
        count: 80,
        scale: 5,
        size: 2,
        speed: 0.4,
        color: "#a78bfa",
    },
};

export default heroSceneData;
