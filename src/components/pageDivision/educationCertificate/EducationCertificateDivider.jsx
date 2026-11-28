
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import EducationCertificateScene3D from "./EducationCertificateScene3D";

export default function EducationCertificateDivider() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section
            className={`relative isolate w-full overflow-hidden ${isDark ? "bg-[#050816]" : "bg-[#F8FAFF]"
                }`}
        >
            {/* Animated background glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 50, -30, 0],
                        y: [0, -25, 30, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[10%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[110px]"
                />

                <motion.div
                    animate={{
                        x: [0, -50, 30, 0],
                        y: [0, 30, -25, 0],
                        scale: [1, 0.9, 1.2, 1],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute right-[10%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[110px]"
                />
            </div>

            {/* 3D Gallery */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2 }}
                className="relative z-10 mx-auto h-[260px] w-full max-w-[1900px] sm:h-[330px] lg:h-[400px]"
            >
                <EducationCertificateScene3D />

                {/* Top fade */}
                <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-16 ${isDark
                        ? "bg-gradient-to-b from-[#050816] to-transparent"
                        : "bg-gradient-to-b from-[#F8FAFF] to-transparent"
                        }`}
                />

                {/* Bottom fade */}
                <div
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-24 ${isDark
                        ? "bg-gradient-to-t from-[#050816] to-transparent"
                        : "bg-gradient-to-t from-[#F8FAFF] to-transparent"
                        }`}
                />

                {/* Divider title */}
                <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <p
                            className={`text-xs font-semibold uppercase tracking-[0.35em] sm:text-sm ${isDark ? "text-cyan-300" : "text-violet-600"
                                }`}
                        >
                            Beyond Learning
                        </p>

                        <div
                            className={`mx-auto mt-5 inline-flex w-fit items-center justify-center rounded-full border px-5 py-2 backdrop-blur-xl ${isDark
                                ? "border-white/10 bg-white/[0.04] text-slate-300 shadow-[0_0_30px_rgba(139,92,246,0.12)]"
                                : "border-slate-300/60 bg-white/60 text-slate-600 shadow-[0_0_30px_rgba(99,102,241,0.10)]"
                                }`}
                        >
                            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-xs">
                                From Education to Certifications
                            </span>
                        </div>
                    </motion.div>

                </div>
            </motion.div>

        </section>
    );
}
