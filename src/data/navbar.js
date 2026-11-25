
const navbarData = {
    // Logo settings
    logo: {
        image: "/images/logo.png",
        alt: "Abinash Nath Pandey Logo",
        fallback: "Abinash | Computer Engineer",
        showImage: true,
    },

    // Name and title
    title: {
        name: "ABINASH",
        designation: "Full Stack Developer",
        subtitle: "Python AI/ML Engineer",
    },

    // Navigation links
    navLinks: [
        { name: "HOME", href: "#home", icon: "Home" },
        { name: "ABOUT", href: "#about", icon: "User" },
        { name: "SKILLS", href: "#skills", icon: "Code" },
        { name: "PROJECTS", href: "#projects", icon: "FolderKanban" },
        { name: "EXPERIENCE", href: "#experience", icon: "BriefcaseBusiness" },
        { name: "EDUCATION", href: "#education", icon: "GraduationCap" },
        { name: "CONTACT", href: "#contact", icon: "Mail" },
    ],

    // Resume settings
    resume: {
        label: "RESUME",
        options: [
            {
                name: "Full Stack",
                pdf: {
                    href: "/resumes/FullStack.pdf",
                    fileName: "Abinash-Nath-Pandey-Full-Stack-CV.pdf",
                },
                docx: {
                    href: "/resumes/FullStack.docx",
                    fileName: "Abinash-Nath-Pandey-Full-Stack.docx",
                },
            },
            {
                name: "Python AI/ML",
                pdf: {
                    href: "/resumes/MachineLearning.pdf",
                    fileName: "Abinash-Nath-Pandey-Python-AI-ML.pdf",
                },
                docx: {
                    href: "/resumes/MachineLearning.docx",
                    fileName: "Abinash-Nath-Pandey-Python-AI-ML.docx",
                },
            },
        ],
    },

};

export default navbarData;
