
// import { motion } from "framer-motion";
// import { useTheme } from "../../../context/ThemeContext";
// import EducationContactScene3D from "./EducationContactScene3D";

// export default function EducationContactDivider() {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   return (
//     <section
//       className={`relative isolate w-full overflow-hidden ${
//         isDark ? "bg-[#050816]" : "bg-[#F8FAFF]"
//       }`}
//     >
//       {/* Background glow */}
//       <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
//         <motion.div
//           animate={{
//             x: [0, 45, -25, 0],
//             y: [0, -30, 25, 0],
//             scale: [1, 1.2, 0.9, 1],
//           }}
//           transition={{
//             duration: 14,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="absolute left-[10%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-600/15 blur-[110px]"
//         />

//         <motion.div
//           animate={{
//             x: [0, -45, 30, 0],
//             y: [0, 35, -20, 0],
//             scale: [1, 0.85, 1.15, 1],
//           }}
//           transition={{
//             duration: 16,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//           className="absolute right-[10%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[110px]"
//         />
//       </div>

//       {/* 3D portal scene */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.92 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         viewport={{ once: true, amount: 0.2 }}
//         transition={{ duration: 1.2, ease: "easeOut" }}
//         className="relative z-10 mx-auto h-[300px] w-full max-w-[1500px] sm:h-[360px] lg:h-[440px]"
//       >
//         <div className="absolute inset-0">
//           <EducationContactScene3D />
//         </div>

//         {/* Top fade */}
//         <div
//           className={`pointer-events-none absolute inset-x-0 top-0 h-16 ${
//             isDark
//               ? "bg-gradient-to-b from-[#050816] to-transparent"
//               : "bg-gradient-to-b from-[#F8FAFF] to-transparent"
//           }`}
//         />

//         {/* Bottom fade */}
//         <div
//           className={`pointer-events-none absolute inset-x-0 bottom-0 h-20 ${
//             isDark
//               ? "bg-gradient-to-t from-[#050816] to-transparent"
//               : "bg-gradient-to-t from-[#F8FAFF] to-transparent"
//           }`}
//         />

//         {/* Center caption */}
//         <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex justify-center px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//             className="text-center"
//           >
//             <p
//               className={`text-xs font-semibold uppercase tracking-[0.35em] sm:text-sm ${
//                 isDark ? "text-cyan-300" : "text-violet-600"
//               }`}
//             >
//               Beyond Learning
//             </p>

//             <h3
//               className={`mt-2 text-xl font-bold tracking-wide sm:text-2xl ${
//                 isDark ? "text-white" : "text-slate-900"
//               }`}
//             >
//               Let's Connect & Create
//             </h3>

//             <p
//               className={`mt-2 text-xs sm:text-sm ${
//                 isDark ? "text-slate-400" : "text-slate-500"
//               }`}
//             >
//               From knowledge to meaningful connections
//             </p>
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }




import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import EducationContactScene3D from "./EducationContactScene3D";

export default function EducationContactDivider() {
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
                <EducationContactScene3D />

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

                        <h3
                            className={`mt-2 text-xl font-extrabold tracking-tight sm:text-2xl ${isDark ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Let's Connect & Create
                        </h3>

                        <p
                            className={`mt-2 text-xs sm:text-sm ${isDark ? "text-slate-400" : "text-slate-500"
                                }`}
                        >
                            Turning knowledge into meaningful connections
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
