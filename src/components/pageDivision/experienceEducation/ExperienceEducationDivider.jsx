
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import ExperienceEducationScene3D from "./ExperienceEducationScene3D";

export default function ExperienceEducationDivider() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section
            aria-label="Transition from experience to education"
            className={`relative isolate w-full overflow-hidden ${isDark ? "bg-[#050816]" : "bg-[#F8FAFF]"
                }`}
        >
            {/* Ambient background lighting */}
            <div className="pointer-events-none absolute inset-0 z-0">
                <div
                    className={`absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] ${isDark ? "bg-violet-600/20" : "bg-violet-400/20"
                        }`}
                />

                <div
                    className={`absolute left-[12%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-[110px] ${isDark ? "bg-cyan-500/15" : "bg-cyan-400/20"
                        }`}
                />

                <div
                    className={`absolute right-[12%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-[110px] ${isDark ? "bg-blue-500/15" : "bg-blue-400/20"
                        }`}
                />
            </div>

            {/* 3D GlassFusion composition */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                    duration: 1.2,
                    ease: "easeOut",
                }}
                className="relative z-10 mx-auto h-[280px] w-full max-w-[1400px] sm:h-[350px] lg:h-[420px]"
            >
                <ExperienceEducationScene3D />
            </motion.div>

            {/* Glass transition label */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    delay: 0.25,
                }}
                className="pointer-events-none absolute bottom-7 left-0 z-20 flex w-full justify-center px-4"
            >
                <div
                    className={`rounded-full border px-5 py-2 backdrop-blur-xl ${isDark
                            ? "border-white/10 bg-white/[0.04] text-slate-300 shadow-[0_0_30px_rgba(139,92,246,0.12)]"
                            : "border-slate-300/60 bg-white/60 text-slate-600 shadow-[0_0_30px_rgba(99,102,241,0.10)]"
                        }`}
                >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-xs">
                        From Experience to Knowledge
                    </span>
                </div>
            </motion.div>

            {/* Top fade */}
            <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-10 h-12 ${isDark
                        ? "bg-gradient-to-b from-[#050816] to-transparent"
                        : "bg-gradient-to-b from-[#F8FAFF] to-transparent"
                    }`}
            />

            {/* Bottom fade */}
            <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 ${isDark
                        ? "bg-gradient-to-t from-[#050816] to-transparent"
                        : "bg-gradient-to-t from-[#F8FAFF] to-transparent"
                    }`}
            />
        </section>
    );
}
