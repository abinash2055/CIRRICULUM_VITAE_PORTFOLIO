
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import skillsData from "../../data/skills";

const ToolsMarquee = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    // Extract all unique tool icons
    const allTools = [
        ...new Map(
            skillsData.categories
                .flatMap((category) => category.skills)
                .map((skill) => [skill.icon, skill])
        ).values(),
    ];

    // Duplicate icons for seamless animation
    const marqueeItems = [...allTools, ...allTools];

    return (
        <section
            className={`relative isolate w-full overflow-hidden py-10 ${isDark ? "bg-[#050816]" : "bg-[#F8FAFF]"
                }`}
        >

            {/* Title & Description */}
            <div className="relative z-10 mb-10 px-5 text-center">

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`mb-3 text-xs font-bold uppercase tracking-[0.4em] ${isDark ? "text-cyan-400" : "text-violet-600"
                        }`}
                >
                    Technology Ecosystem
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className={`text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl ${isDark
                        ? "bg-gradient-to-r from-violet-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent"
                        }`}
                >
                    Powered By Innovation
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className={`mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"
                        }`}
                >
                    A collection of technologies, frameworks, and tools I use
                    to build modern applications and intelligent digital experiences.
                </motion.p>

            </div>

            {/* Animated Background Lighting */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

                {/* Violet Glow */}
                <motion.div
                    className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-violet-600/20 blur-[100px]"
                    animate={{
                        x: [0, 180, 80, 0],
                        y: [0, 50, -30, 0],
                        scale: [1, 1.3, 0.9, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Cyan Glow */}
                <motion.div
                    className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-[110px]"
                    animate={{
                        x: [0, -150, -50, 0],
                        y: [0, 70, -40, 0],
                        scale: [1, 0.8, 1.3, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Blue Glow */}
                <motion.div
                    className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-blue-500/15 blur-[100px]"
                    animate={{
                        x: [0, 120, -100, 0],
                        scale: [1, 1.4, 0.8, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Animated Gradient Overlay */}
                <motion.div
                    className={`absolute inset-0 ${isDark
                        ? "bg-gradient-to-r from-violet-500/[0.04] via-cyan-400/[0.06] to-blue-500/[0.04]"
                        : "bg-gradient-to-r from-violet-300/15 via-cyan-200/20 to-blue-300/15"
                        }`}
                    animate={{
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Moving Icons */}
            <div className="relative w-full overflow-hidden">

                {/* Left Fade */}
                <div
                    className={`pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r ${isDark
                        ? "from-[#050816] to-transparent"
                        : "from-[#F8FAFF] to-transparent"
                        } sm:w-28`}
                />

                <motion.div
                    className="flex w-max items-center gap-8 sm:gap-12"
                    animate={{ x: ["-50%", "0%"] }}
                    transition={{
                        x: {
                            duration: 35,
                            repeat: Infinity,
                            ease: "linear",
                        },
                    }}
                >
                    {marqueeItems.map((tool, index) => (
                        <motion.div
                            key={`${tool.icon}-${index}`}
                            className="group relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] p-3 shadow-[0_0_20px_rgba(139,92,246,0.08)] backdrop-blur-xl transition-colors duration-500 sm:h-[76px] sm:w-[76px]"
                            whileHover={{
                                scale: 1.2,
                                rotate: 8,
                                y: -8,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                            }}
                        >
                            {/* Icon Background Glow */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 via-cyan-400/10 to-blue-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                            />

                            {/* Animated Border */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-cyan-300/0 transition-all duration-500 group-hover:border-cyan-300/50 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]" />

                            {/* Tool Icon */}
                            <img
                                src={`/icons/${tool.icon}`}
                                alt={tool.name}
                                loading="lazy"
                                draggable="false"
                                className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Right Fade */}
                <div
                    className={`pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l ${isDark
                        ? "from-[#050816] to-transparent"
                        : "from-[#F8FAFF] to-transparent"
                        } sm:w-28`}
                />
            </div>

            {/* Animated Energy Line */}
            <div className="relative mx-auto mt-8 h-[2px] w-4/5 overflow-hidden rounded-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent">
                <motion.div
                    className="absolute top-0 h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-violet-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                    animate={{ x: ["-100%", "400%"] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>
        </section>
    );
};

export default ToolsMarquee;
