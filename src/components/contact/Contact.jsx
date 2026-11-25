
import { motion } from "framer-motion";
import { Sparkles, Globe2 } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import contactData from "../../data/contact";

import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import Contact3DScene from "./Contact3DScene";

const Contact = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const heading = contactData.heading;

    const title = heading.title || "Let's Connect & Collaborate";

    return (
        <section
            id="contact"
            className={`relative isolate w-full scroll-mt-24 overflow-hidden py-24 transition-colors duration-700 md:py-32 ${isDark ? "bg-[#050816]" : "bg-[#F8FAFF]"
                }`}
        >
            {/* Background Effects */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 60, -30, 0],
                        y: [0, -40, 30, 0],
                        scale: [1, 1.2, 0.95, 1],
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

                <div
                    className={`absolute inset-0 ${isDark
                        ? "bg-[radial-gradient(circle_at_center,transparent_0%,#050816_85%)]"
                        : "bg-[radial-gradient(circle_at_center,transparent_0%,#F8FAFF_85%)]"
                        }`}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12">
                {/* Section Heading */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] ${isDark
                            ? "border-violet-400/20 bg-violet-400/10 text-cyan-300"
                            : "border-violet-200 bg-violet-50 text-violet-700"
                            }`}
                    >
                        <Sparkles size={14} />
                        {heading.eyebrow || "LET'S CONNECT"}
                    </motion.div>


                    <motion.h2
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${isDark ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {title.split(" ").slice(0, 2).join(" ")}{" "}
                        <span className="bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {title.split(" ").slice(2).join(" ")}
                        </span>
                    </motion.h2>


                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className={`mx-auto mt-6 max-w-2xl text-sm leading-8 sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"
                            }`}
                    >
                        {heading.description}
                    </motion.p>
                </div>

                {/* Contact Layout */}
                <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-2 xl:gap-10">
                    {/* LEFT: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className={`relative min-w-0 overflow-hidden rounded-[2rem] border p-5 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10 ${isDark
                            ? "border-white/10 bg-white/[0.045] shadow-violet-950/20"
                            : "border-white bg-white/80 shadow-violet-200/40"
                            }`}
                    >
                        {/* Form Card Glow */}
                        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />

                        <div className="relative z-10 mb-8">
                            <div className="mb-3 flex items-center gap-2">
                                <Globe2
                                    size={18}
                                    className="text-cyan-400"
                                />

                                <span
                                    className={`text-xs font-bold uppercase tracking-[0.18em] ${isDark ? "text-cyan-300" : "text-violet-600"
                                        }`}
                                >
                                    Get In Touch
                                </span>
                            </div>

                            <h3
                                className={`text-2xl font-bold sm:text-3xl ${isDark ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                Send Me a Message
                            </h3>

                            <p
                                className={`mt-3 text-sm leading-7 ${isDark ? "text-slate-400" : "text-slate-500"
                                    }`}
                            >
                                Have a question or a project in mind? Fill out the form
                                and I'll get back to you.
                            </p>
                        </div>

                        <div className="relative z-10">
                            <ContactForm />
                        </div>

                        {/* Contact Information */}
                        <div className="relative z-10 mt-8 border-t border-white/10 pt-7">
                            <ContactInfo />
                        </div>
                    </motion.div>

                    {/* RIGHT: 3D Planetary Universe */}
                    <motion.div
                        initial={{ opacity: 0, x: 35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className="relative flex min-h-[430px] w-full items-center justify-center sm:min-h-[550px] xl:min-h-[700px]"
                    >
                        {/* Universe Glow */}
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute left-1/2 top-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

                            <div className="absolute right-[10%] top-[15%] h-40 w-40 rounded-full bg-cyan-500/10 blur-[80px]" />
                        </div>

                        {/* 3D Canvas */}
                        <div className="absolute inset-0 z-10">
                            <Contact3DScene />
                        </div>

                        {/* Universe Caption */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className={`absolute bottom-5 left-1/2 z-20 w-max max-w-[90%] -translate-x-1/2 rounded-2xl border px-6 py-4 text-center shadow-xl backdrop-blur-xl ${isDark
                                ? "border-white/10 bg-[#0b1024]/75"
                                : "border-white/80 bg-white/75"
                                }`}
                        >
                            <p
                                className={`text-sm font-bold ${isDark ? "text-white" : "text-slate-900"
                                    }`}
                            >
                                Explore The Universe
                            </p>

                            <p
                                className={`mt-1 text-xs ${isDark ? "text-slate-400" : "text-slate-500"
                                    }`}
                            >
                                Every great connection starts with a message.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
