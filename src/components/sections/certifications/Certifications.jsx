
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
    Award,
    CalendarDays,
    Sparkles,
    LayoutGrid,
    List,
    ExternalLink,
    Image as ImageIcon,
} from "lucide-react";

import { useTheme } from "../../../context/ThemeContext";
import certificationData from "../../../data/certifications";
import CertificationBackground3D from "./CertificationBackground3D";

export default function Certifications() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [view, setView] = useState("grid");

    const heading = certificationData?.heading ?? {};
    const certifications =
        certificationData?.certifications ?? [];

    const cardStyle = isDark
        ? "border-white/10 bg-[#0b1023]/80"
        : "border-slate-200 bg-white/80";

    return (
        <section
            id="certifications"
            className={`relative isolate w-full scroll-mt-24 overflow-hidden py-24 transition-colors duration-700 md:py-32 ${isDark ? "bg-[#050816]" : "bg-[#F8FAFF]"
                }`}
        >

            {/* Background Effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <motion.div
                    animate={{
                        x: [0, 60, -30, 0],
                        y: [0, -40, 30, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute -left-40 top-10 h-[450px] w-[450px] rounded-full blur-[130px] ${isDark ? "bg-violet-600/15" : "bg-violet-400/20"
                        }`}
                />

                <motion.div
                    animate={{
                        x: [0, -50, 40, 0],
                        y: [0, 35, -25, 0],
                        scale: [1, 0.9, 1.15, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className={`absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full blur-[140px] ${isDark ? "bg-cyan-500/10" : "bg-cyan-400/20"
                        }`}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">


                {/* Heading */}
                <div className="mx-auto mb-14 max-w-3xl text-center">


                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={`mb-5 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-xl ${isDark
                            ? "border-violet-400/20 bg-violet-400/10 text-cyan-300"
                            : "border-violet-200 bg-violet-50 text-violet-700"
                            }`}
                    >
                        <Sparkles size={14} />
                        {heading.eyebrow || "MY CERTIFICATIONS"}
                    </motion.div>


                    <motion.h2
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${isDark ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {(heading.title || "Certifications & Achievements").split(" ")[0]}{" "}
                        <span className="bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {(heading.title || "Certifications & Achievements")
                                .split(" ")
                                .slice(1)
                                .join(" ")}
                        </span>
                    </motion.h2>


                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className={`mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"
                            }`}
                    >
                        {heading.description}
                    </motion.p>
                </div>


                {/* Toolbar */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

                    <div>
                        <p
                            className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-800 text-xl"
                                }`}
                        >
                            MY CERTIFICATES
                        </p>

                        <p
                            className={`mt-1 text-sm ${isDark ? "text-slate-500" : "text-slate-500"
                                }`}
                        >
                            {certifications.length} certificates available
                        </p>
                    </div>






                    {/* Grid / List Switcher */}
                    <div
                        className={`flex items-center gap-1 rounded-xl border p-1 backdrop-blur-xl ${isDark
                            ? "border-white/10 bg-white/[0.04]"
                            : "border-slate-200 bg-white/80"
                            }`}
                    >
                        <button
                            type="button"
                            onClick={() => setView("grid")}
                            aria-label="Grid view"
                            aria-pressed={view === "grid"}
                            className={`flex h-10 w-11 items-center justify-center rounded-lg transition-all duration-300 ${view === "grid"
                                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                                : isDark
                                    ? "text-slate-400 hover:text-white"
                                    : "text-slate-500 hover:text-violet-600"
                                }`}
                        >
                            <LayoutGrid size={19} />
                        </button>

                        <button
                            type="button"
                            onClick={() => setView("list")}
                            aria-label="List view"
                            aria-pressed={view === "list"}
                            className={`flex h-10 w-11 items-center justify-center rounded-lg transition-all duration-300 ${view === "list"
                                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                                : isDark
                                    ? "text-slate-400 hover:text-white"
                                    : "text-slate-500 hover:text-violet-600"
                                }`}
                        >
                            <List size={19} />
                        </button>
                    </div>
                </div>



                {/* Certificates */}
                {certifications.length > 0 ? (
                    <motion.div
                        layout
                        className={
                            view === "grid"
                                ? "grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3"
                                : "flex flex-col gap-5"
                        }
                    >
                        <AnimatePresence mode="popLayout">
                            {certifications.map((certificate, index) => (
                                <motion.article
                                    layout
                                    key={certificate.id}
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.04,
                                    }}
                                    whileHover={{ y: -5 }}
                                    className={`group relative overflow-hidden rounded-3xl border p-[1px] transition-all duration-500 ${isDark
                                        ? "border-white/10 bg-gradient-to-br from-violet-500/30 via-cyan-400/10 to-blue-500/30"
                                        : "border-slate-200 bg-gradient-to-br from-violet-300/70 via-white to-cyan-300/70 shadow-lg shadow-indigo-500/5"
                                        }`}
                                >
                                    <div
                                        className={`relative flex h-full overflow-hidden rounded-[23px] ${view === "grid"
                                            ? "flex-col p-5 sm:p-6"
                                            : "flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6"
                                            } ${cardStyle}`}
                                    >

                                        {/* Certificate Image */}
                                        <div
                                            className={`group/image relative h-52 w-full shrink-0 overflow-hidden rounded-2xl border sm:h-60 ${isDark
                                                ? "border-white/10 bg-slate-900/60"
                                                : "border-violet-100 bg-white/70"
                                                }`}
                                        >
                                            {certificate.image ? (
                                                <img
                                                    src={certificate.image}
                                                    alt={`${certificate.title} Certificate`}
                                                    className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover/image:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <ImageIcon
                                                        size={48}
                                                        className={isDark ? "text-slate-500" : "text-violet-300"}
                                                    />
                                                </div>
                                            )}

                                            {/* Open Image in New Tab Button */}
                                            {certificate.image && (
                                                <a
                                                    href={certificate.image}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`Open ${certificate.title} certificate`}
                                                    title="Open full certificate"
                                                    className={`absolute bottom-3 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-110 ${isDark
                                                        ? "border-cyan-300/30 bg-slate-950/85 text-cyan-300 hover:bg-cyan-500 hover:text-white"
                                                        : "border-violet-200 bg-white/95 text-violet-600 hover:bg-violet-600 hover:text-white"
                                                        }`}
                                                >
                                                    <ExternalLink size={19} />
                                                </a>
                                            )}

                                            {/* Certificate Label */}
                                            <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-slate-950/65 px-3 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-md">
                                                CERTIFICATE
                                            </div>
                                        </div>


                                        {/* Certificate Details */}
                                        <div className="flex min-w-0 flex-1 flex-col">

                                            <h3
                                                className={`text-xl font-extrabold leading-snug transition-colors duration-300 group-hover:text-cyan-400 ${isDark ? "text-white" : "text-slate-900"
                                                    }`}
                                            >
                                                {certificate.title}
                                            </h3>

                                            {/* Institution Name */}
                                            <div className="mt-2 flex items-center gap-2">
                                                <Award size={15} className="shrink-0 text-violet-400" />

                                                <span className={`text-xs font-semibold ${isDark ? "text-cyan-300" : "text-violet-600"
                                                    }`}>
                                                    {certificate.institution}
                                                </span>
                                            </div>

                                            <p
                                                className={`mt-3 text-sm leading-7 ${isDark ? "text-slate-400" : "text-slate-600"
                                                    }`}
                                            >
                                                {certificate.paragraph}
                                            </p>


                                            {/* Certification Dates */}
                                            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">

                                                {/* Issue Date */}
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                                                        <CalendarDays size={16} />
                                                    </div>

                                                    <div>
                                                        <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"
                                                            }`}>
                                                            Issue Date
                                                        </p>

                                                        <p className={`mt-0.5 text-xs font-semibold ${isDark ? "text-slate-200" : "text-slate-700"
                                                            }`}>
                                                            {certificate.date}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Expiry Date */}
                                                {certificate.expiryDate && (
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-400">
                                                            <CalendarDays size={16} />
                                                        </div>

                                                        <div>
                                                            <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-slate-500" : "text-slate-400"
                                                                }`}>
                                                                Expiry Date
                                                            </p>

                                                            <p className={`mt-0.5 text-xs font-semibold ${isDark ? "text-slate-200" : "text-slate-700"
                                                                }`}>
                                                                {certificate.expiryDate}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>


                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div
                        className={`rounded-3xl border p-12 text-center ${isDark
                            ? "border-white/10 bg-white/[0.035]"
                            : "border-slate-200 bg-white/70"
                            }`}
                    >
                        <Award
                            size={48}
                            className="mx-auto mb-5 text-violet-400"
                        />

                        <h3
                            className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-900"
                                }`}
                        >
                            Certifications Coming Soon
                        </h3>

                        <p
                            className={`mx-auto mt-3 max-w-md text-sm leading-7 ${isDark ? "text-slate-400" : "text-slate-600"
                                }`}
                        >
                            My professional certifications and learning achievements
                            will be displayed here.
                        </p>
                    </div>
                )}


            </div>
            {/* 3D Certification Background */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 opacity-60">
                    <CertificationBackground3D />
                </div>
            </div>
        </section>
    );
}
