
const skillsData = {
    heading: {
        eyebrow: "MY TECHNICAL UNIVERSE",
        title: "Skills & Expertise",
        description:
            "The technologies and tools I use to build modern web applications, intelligent systems, and creative digital experiences.",
    },

    filters: [
        { label: "All Skills", value: "all" },
        { label: "Frontend", value: "frontend" },
        { label: "Backend", value: "backend" },
        { label: "AI & ML", value: "ai" },
        { label: "Database", value: "database" },
        { label: "Tools", value: "tools" },
    ],

    categories: [
        {
            id: "frontend",
            name: "Frontend Development",
            description: "Creating interactive user experiences",
            number: "01",
            skills: [
                { name: "HTML5", icon: "html5.png" },
                { name: "CSS3", icon: "css3.png" },
                { name: "JavaScript", icon: "javascript.png" },
                { name: "React", icon: "react.png" },
                { name: "Tailwind CSS", icon: "tailwind.png" },
                { name: "Framer Motion", icon: "framer-motion.png" },
            ],
        },

        {
            id: "backend",
            name: "Backend Development",
            description: "Building powerful application logic",
            number: "02",
            skills: [
                { name: "Python", icon: "python.png" },
                { name: "Node.js", icon: "nodejs.png" },
                { name: "Express.js", icon: "express.png" },
                { name: "REST API", icon: "api.png" },
            ],
        },

        {
            id: "ai",
            name: "AI & Machine Learning",
            description: "Developing intelligent solutions",
            number: "03",
            skills: [
                { name: "Python", icon: "python.png" },
                { name: "TensorFlow", icon: "tensorflow.png" },
                { name: "Scikit-learn", icon: "scikit-learn.png" },
                { name: "NumPy", icon: "numpy.png" },
                { name: "Pandas", icon: "pandas.png" },
            ],
        },

        {
            id: "database",
            name: "Database Management",
            description: "Managing and organizing information",
            number: "04",
            skills: [
                { name: "MySQL", icon: "mysql.png" },
                { name: "MongoDB", icon: "mongodb.png" },
                { name: "PostgreSQL", icon: "postgresql.png" },
                { name: "Firebase", icon: "firebase.png" },
            ],
        },

        {
            id: "tools",
            name: "Tools & Technologies",
            description: "My everyday development toolkit",
            number: "05",
            skills: [
                { name: "Git", icon: "git.png" },
                { name: "GitHub", icon: "github.png" },
                { name: "VS Code", icon: "vscode.png" },
                { name: "Three.js", icon: "threejs.png" },
                { name: "Figma", icon: "figma.png" },
            ],
        },
    ],

    footer: {
        title: "Curiosity drives innovation.",
        description:
            "I continuously explore new technologies, experiment with ideas, and expand my development skills.",
    },
};

export default skillsData;
