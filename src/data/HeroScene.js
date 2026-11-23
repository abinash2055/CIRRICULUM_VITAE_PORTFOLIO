
const heroSceneData = {
  camera: {
    position: [0, 0, 8],
    fov: 45,
  },

  galaxy: {
    scale: 1.65,
    rotationSpeed: {
      x: 0.12,
      y: 0.28,
    },

    particles: {
      count: 1800,
      radius: 1.35,
      size: 0.025,
    },

    rings: {
      innerRadius: 1.65,
      outerRadius: 1.9,
    },
  },

  stars: {
    count: 1800,
    radius: 12,
    depth: 10,
    factor: 4,
    speed: 1.2,
    saturation: 0.7,
    fade: true,
  },

  sparkles: {
    count: 180,
    scale: 12,
    size: 2.5,
    speed: 0.5,
  },

  comets: {
    count: 4,
    speed: 0.7,
    trailLength: 5,
    trailWidth: 2,
  },

  lighting: {
    ambient: 1.2,
  },

  themes: {
    dark: {
      background: "#050816",
      particleColors: [
        "#8B5CF6",
        "#22D3EE",
        "#60A5FA",
        "#FFFFFF",
      ],
      coreColor: "#312E81",
      coreEmissive: "#6366F1",
      coreEmissiveIntensity: 1.8,
      coreOpacity: 0.22,
      ringColor: "#8B5CF6",
      ringOpacity: 0.35,
      sparkleColor: "#A78BFA",
      starColor: "#FFFFFF",
      cometColors: [
        "#22D3EE",
        "#8B5CF6",
        "#60A5FA",
        "#FFFFFF",
      ],
      lights: [
        {
          position: [4, 3, 4],
          intensity: 35,
          color: "#8B5CF6",
        },
        {
          position: [-4, -2, 3],
          intensity: 25,
          color: "#22D3EE",
        },
      ],
    },

    light: {
      background: "#F8FAFF",
      particleColors: [
        "#6366F1",
        "#0891B2",
        "#3B82F6",
        "#7C3AED",
        "#FFFFFF",
      ],
      coreColor: "#C7D2FE",
      coreEmissive: "#818CF8",
      coreEmissiveIntensity: 0.65,
      coreOpacity: 0.5,
      ringColor: "#6366F1",
      ringOpacity: 0.5,
      sparkleColor: "#818CF8",
      starColor: "#64748B",
      cometColors: [
        "#0891B2",
        "#6366F1",
        "#3B82F6",
        "#7C3AED",
      ],
      lights: [
        {
          position: [4, 3, 4],
          intensity: 22,
          color: "#A5B4FC",
        },
        {
          position: [-4, -2, 3],
          intensity: 18,
          color: "#67E8F9",
        },
      ],
    },
  },
};

export default heroSceneData;
