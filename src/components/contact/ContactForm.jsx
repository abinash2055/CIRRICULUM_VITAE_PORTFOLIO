
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import {
    Send,
    User,
    Mail,
    MessageSquare,
    FileText,
    CheckCircle2,
    AlertCircle,
    LoaderCircle,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import contactData from "../../data/contact";

const ContactForm = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState({
        type: "",
        message: "",
    });

    const inputClass = `w-full rounded-xl border py-3.5 pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:ring-2 ${isDark
        ? "border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-cyan-400/10"
        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-violet-400 focus:ring-violet-400/10"
        }`;

    const labelClass = `mb-2 block text-xs font-semibold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-slate-600"
        }`;

    const iconClass = `absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-slate-500" : "text-slate-400"
        }`;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (status.message) {
            setStatus({ type: "", message: "" });
        }
    };

    // Automatically hide success/error message after 5 seconds
    useEffect(() => {
        if (!status.message) return;

        const timer = setTimeout(() => {
            setStatus({ type: "", message: "" });
        }, 5000);

        return () => clearTimeout(timer);
    }, [status.message]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSending) return;

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setStatus({
                type: "error",
                message:
                    "Email service is not configured. Please check your environment variables.",
            });
            return;
        }

        setIsSending(true);
        setStatus({ type: "", message: "" });

        try {
            const templateParams = {
                name: form.name.trim(),
                email: form.email.trim(),
                title: form.subject.trim(),
                message: form.message.trim(),
                time: new Date().toLocaleString(),
                from_name: form.name.trim(),
                reply_to: form.email.trim(),
            };

            await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                {
                    publicKey,
                }
            );

            setStatus({
                type: "success",
                message: contactData.form.successMessage,
            });

            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error("EmailJS error:", error);

            setStatus({
                type: "error",
                message: contactData.form.errorMessage,
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
                <label htmlFor="contact-name" className={labelClass}>
                    Full Name
                </label>

                <div className="relative">
                    <User size={17} className={iconClass} />

                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        autoComplete="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={inputClass}
                        disabled={isSending}
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="contact-email" className={labelClass}>
                    Email Address
                </label>

                <div className="relative">
                    <Mail size={17} className={iconClass} />

                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        maxLength={150}
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className={inputClass}
                        disabled={isSending}
                    />
                </div>
            </div>

            {/* Subject */}
            <div>
                <label htmlFor="contact-subject" className={labelClass}>
                    Subject
                </label>

                <div className="relative">
                    <FileText size={17} className={iconClass} />

                    <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        maxLength={150}
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What would you like to discuss?"
                        className={inputClass}
                        disabled={isSending}
                    />
                </div>
            </div>

            {/* Message */}
            <div>
                <label htmlFor="contact-message" className={labelClass}>
                    Your Message
                </label>

                <div className="relative">
                    <MessageSquare
                        size={17}
                        className="absolute left-4 top-4 text-slate-500"
                    />

                    <textarea
                        id="contact-message"
                        name="message"
                        required
                        minLength={10}
                        maxLength={5000}
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        className={`${inputClass} resize-y pl-11`}
                        disabled={isSending}
                    />
                </div>
            </div>

            {/* Submit button */}
            <motion.button
                type="submit"
                whileHover={!isSending ? { scale: 1.025 } : {}}
                whileTap={!isSending ? { scale: 0.97 } : {}}
                disabled={isSending}
                className={`group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 ${isSending
                    ? "cursor-not-allowed opacity-70"
                    : "hover:shadow-cyan-500/30"
                    }`}
            >
                <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[110%]" />

                {isSending ? (
                    <>
                        <LoaderCircle
                            size={18}
                            className="relative animate-spin"
                        />
                        <span className="relative">
                            {contactData.form.sendingText}
                        </span>
                    </>
                ) : (
                    <>
                        <span className="relative">
                            {contactData.form.buttonText}
                        </span>

                        <Send
                            size={17}
                            className="relative transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </>
                )}
            </motion.button>

            {/* Submission feedback */}
            {status.message && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    aria-live="polite"
                    className={`flex items-start gap-2 rounded-xl border p-3 text-xs leading-6 ${status.type === "success"
                        ? isDark
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : isDark
                            ? "border-red-400/20 bg-red-400/10 text-red-300"
                            : "border-red-200 bg-red-50 text-red-700"
                        }`}
                >
                    {status.type === "success" ? (
                        <CheckCircle2 size={17} className="mt-1 shrink-0" />
                    ) : (
                        <AlertCircle size={17} className="mt-1 shrink-0" />
                    )}

                    <span>{status.message}</span>
                </motion.div>
            )}

        </form>
    );
};

export default ContactForm;
