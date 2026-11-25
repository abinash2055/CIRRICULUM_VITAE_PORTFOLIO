
const educationData = {
    heading: {
        eyebrow: "MY ACADEMIC JOURNEY",
        title: "Education & Qualifications",
        description:
            "My academic background, educational qualifications, learning journey, and achievements.",
    },

    educations: [
        {
            id: 1,

            institutionName: "Tribhuvan University",
            institutionLogo: "/education/kec.png",
            institutionLocation: "Kathmandu, Nepal",

            degree: "Bachelor in Computer Engineering",
            fieldOfStudy: "Computer Engineering",

            period: "4 years",
            status: "Graduated",

            // Just uncomment it fron Education.jsx
            grade: "Value in Percentage",

            description:
                "Studied Computer Engineering with a focus on computer science, software development, programming, hardware systems, and modern computing technologies. Built a strong foundation in problem-solving, analytical thinking, and developing practical technology solutions.",

            majorSubjects: [
                "Programming",
                "Database Management / DSA",
                "Computer Networks",
                "Software Engineering",
                "ML / AI",
                "OPerating Systems"
            ],

            achievements: [
                "Completed Computer Engineering studies",
                "Developed programming and problem-solving skills",
                "Completed academic projects",
            ],

            institutionWebsite: "https://www.kecktm.edu.np/",
        },
        {
            id: 2,

            institutionName: "Prasadi Academy",
            institutionLogo: "/education/prasadi.png",
            institutionLocation: "Lalitpur, Nepal",

            degree: "Plus 2 Level",
            fieldOfStudy: "Biology with extra Mathematics",

            period: "2 years",
            status: "Graduated",

            grade: "Aggregate value of 11 and 12 in GPA",

            description:
                "Studied Biology with Additional Mathematics, developing a foundation in life sciences, mathematics, and analytical problem-solving.",

            majorSubjects: [
                "Chemistry",
                "Biology",
                "Mathematics",
                "Physics",
            ],

            achievements: [
                "Completed +2 Science with Biology and Additional Mathematics",
                "Developed analytical and problem-solving skills",
                "Gained knowledge of biological and mathematical concepts",
            ],

            institutionWebsite: "https://prasadi.edu.np/",
        },
        {
            id: 3,

            institutionName: "National Examination Board",
            institutionLogo: "/education/eps.png",
            institutionLocation: "Kathmandu, Nepal",

            degree: "School Leaving Certificate",
            fieldOfStudy: "Computer Science",

            period: "10 years",
            status: "Graduated",

            grade: "Grade 10 in SLC",

            description:
                "Completed Class 10, building a strong foundation in mathematics, science, languages, and essential academic skills.",

            majorSubjects: [
                "Computer Programming",
                "Account",
                "Optional Mathematics",
            ],

            achievements: [
                "Successfully completed Secondary Education (Class 10)",
                "Developed a strong foundation in core academic subjects",
                "Built analytical and problem-solving skills",
            ],

            institutionWebsite: "https://epsschool.edu.np/",
        },
        {
            id: 4,

            institutionName: "Manank Prasadi School",
            institutionLogo: "/education/manank.png",
            institutionLocation: "Kathmandu, Nepal",

            degree: "Kinder-Garden",
            fieldOfStudy: "Computer Science",

            period: "1 year",
            status: "Graduated",

            grade: "No Grade",

            description:
                "Completed kindergarten education, developing early foundations in basic learning, communication, creativity, and social skills.",

            majorSubjects: [
                "Social Activities",
                "Playing",
                "Drawing & Coloring",
                "Nursery",
            ],

            achievements: [
                "Completed early childhood education",
                "Developed basic reading, writing, and counting skills",
                "Built foundational communication and social skills",
            ],

            institutionWebsite: "https://example.com",
        },
    ],
};

export default educationData;
