
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import CertificationContactScene3D from "./CertificationContactScene3D";

export default function CertificationContactDivider() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <section
            className={`relative isolate w-full overflow-hidden ${isDark ? "bg-[#050816]" : "bg-[#F8FAFF]"
                }`}
        >
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 80, 0],
                        y: [0, -35, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute left-[15%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[120px]"
                />

                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 40, 0],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute right-[15%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-[120px]"
                />
            </div>

            {/* 3D Gallery */}
            <div className="relative z-10 mx-auto h-[320px] w-full max-w-[1900px] sm:h-[400px] lg:h-[480px]">
                <CertificationContactScene3D />
            </div>

            {/* Fade Edges */}
            <div
                className={`pointer-events-none absolute inset-x-0 top-0 z-20 h-20 ${isDark
                    ? "bg-gradient-to-b from-[#050816] to-transparent"
                    : "bg-gradient-to-b from-[#F8FAFF] to-transparent"
                    }`}
            />

            <div
                className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 ${isDark
                    ? "bg-gradient-to-t from-[#050816] to-transparent"
                    : "bg-gradient-to-t from-[#F8FAFF] to-transparent"
                    }`}
            />

            {/* Caption */}
            <div className="pointer-events-none absolute bottom-8 left-0 z-30 w-full text-center">
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className={`text-xs font-bold uppercase tracking-[0.35em] ${isDark ? "text-cyan-300" : "text-violet-600"
                        }`}
                >
                    From Achievement to Opportunity
                </motion.p>

                <div
                    className={`mx-auto mt-5 inline-flex w-fit items-center justify-center rounded-full border px-5 py-2 backdrop-blur-xl ${isDark
                        ? "border-white/10 bg-white/[0.04] text-slate-300 shadow-[0_0_30px_rgba(139,92,246,0.12)]"
                        : "border-slate-300/60 bg-white/60 text-slate-600 shadow-[0_0_30px_rgba(99,102,241,0.10)]"
                        }`}
                >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-xs">
                        From Certifications to Contact
                    </span>
                </div>
            </div>
        </section>
    );
}
