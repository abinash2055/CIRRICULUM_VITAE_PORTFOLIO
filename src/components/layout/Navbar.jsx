
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Eye,
  ChevronDown,
  Home,
  User,
  Code,
  BriefcaseBusiness,
  FolderKanban,
  Mail,
  FileText,
  GraduationCap,
} from "lucide-react";


import { useTheme } from "../../context/ThemeContext";
import navbarData from "../../data/navbar";

const iconMap = {
  Home,
  User,
  Code,
  BriefcaseBusiness,
  FolderKanban,
  Mail,
};

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const [downloadModal, setDownloadModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [downloadingFormat, setDownloadingFormat] = useState(null);

  const [downloadProgress, setDownloadProgress] = useState(0);
  const { logo, title, navLinks, resume } = navbarData;

  // Open download popup
  const openDownloadModal = (option) => {
    setSelectedResume(option);
    setDownloadModal(true);
    setResumeOpen(false);
    setIsOpen(false);
  };

  // Download Resume
  const handleResumeDownload = (format) => {
    if (!selectedResume || downloadingFormat) return;

    const file = selectedResume[format];

    if (!file?.href) return;

    // Start the download immediately
    const link = document.createElement("a");
    link.href = file.href;
    link.download = file.fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Start circular progress animation
    setDownloadingFormat(format);
    setDownloadProgress(0);

    let progress = 0;

    const interval = window.setInterval(() => {
      progress += 5;
      setDownloadProgress(progress);

      if (progress >= 100) {
        window.clearInterval(interval);

        window.setTimeout(() => {
          setDownloadModal(false);
          setDownloadingFormat(null);
          setSelectedResume(null);
          setDownloadProgress(0);
        }, 300);
      }
    }, 35);
  };

  return (
    <header className="fixed top-0 z-50 w-full px-2 pt-4 sm:px-4">

      <nav className="group relative isolate mx-auto flex min-h-[100px] w-full max-w-[1800px] items-center justify-between rounded-3xl border border-violet-400/70 bg-white/75 px-8 py-5 shadow-[0_0_20px_rgba(139,92,246,0.55),0_0_45px_rgba(59,130,246,0.35),0_0_75px_rgba(6,182,212,0.18)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.75),0_0_65px_rgba(59,130,246,0.50),0_0_100px_rgba(6,182,212,0.30)] dark:border-violet-400/60 dark:bg-slate-950/75 dark:shadow-[0_0_25px_rgba(139,92,246,0.65),0_0_50px_rgba(59,130,246,0.40),0_0_85px_rgba(6,182,212,0.22)] dark:hover:shadow-[0_0_35px_rgba(139,92,246,0.85),0_0_75px_rgba(59,130,246,0.60),0_0_110px_rgba(6,182,212,0.35)]">


        {/* Logo and Title */}
        <a href="#home" className="flex items-center gap-3">

          {logo.showImage && (
            <img
              src={logo.image}
              alt={logo.alt}
              className="h-20 w-20 rounded-2xl object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          <div className="flex flex-col">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {title.name || logo.fallback}
            </span>

            <span className="text-md font-medium  dark:text-white">
              {title.designation} | {title.subtitle}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">

          {navLinks.map((link) => {
            const Icon = iconMap[link.icon];

            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 text-xl font-bold text-slate-900 transition-colors hover:text-violet-500 dark:text-slate-300 dark:hover:text-violet-400"
              >
                {/* {Icon && <Icon size={25} />} */}
                {link.name}
              </a>
            );
          })}

        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
          >
            {theme === "dark" ? <Sun size={25} /> : <Moon size={25} />}
          </button>

          {/* Resume Dropdown */}
          <div className="relative hidden sm:block">

            <button
              onClick={() => setResumeOpen(!resumeOpen)}
              className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 text-lg font-bold text-white shadow-lg shadow-violet-500/20 transition hover:scale-105"
            >
              {resume.label || "RESUME"}

              <ChevronDown
                size={20}
                className={`transition-transform duration-200 ${resumeOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            <AnimatePresence>
              {resumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-white/10 dark:bg-slate-900"
                >

                  <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select Resume
                  </p>

                  {resume.options.map((option) => (
                    <div
                      key={option.name}
                      className="flex items-center justify-between gap-3 rounded-xl px-3 py-3 transition hover:bg-violet-500/10"
                    >

                      <span className="text-base font-semibold text-slate-800 dark:text-white">
                        {option.name}
                      </span>

                      <div className="flex items-center gap-2">

                        {/* View PDF */}
                        <a
                          href={option.pdf.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`View ${option.name} Resume`}
                          onClick={() => setResumeOpen(false)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-violet-500 hover:bg-violet-500 hover:text-white dark:border-white/10 dark:text-slate-300"
                        >
                          <Eye size={19} />
                        </a>

                        {/* Open Download Popup */}
                        <button
                          type="button"
                          title={`Download ${option.name} Resume`}
                          onClick={() => openDownloadModal(option)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-blue-500 hover:bg-blue-500 hover:text-white dark:border-white/10 dark:text-slate-300"
                        >
                          <Download size={19} />
                        </button>

                      </div>
                    </div>
                  ))}

                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="rounded-xl border border-slate-200 p-2 text-slate-700 dark:border-white/10 dark:text-white lg:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-white/95 p-5 shadow-xl backdrop-blur-xl dark:bg-slate-950/95 lg:hidden"
          >

            <div className="flex flex-col gap-2">

              {navLinks.map((link) => {
                const Icon = iconMap[link.icon];

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-violet-500/10 hover:text-violet-600 dark:text-slate-200 dark:hover:text-violet-400"
                  >
                    {Icon && <Icon size={18} />}
                    {link.name}
                  </a>
                );
              })}

              {/* Mobile Resume Options */}

              {/* Mobile Resume Dropdown */}
              <div className="mt-3 border-t border-slate-200 pt-3 dark:border-white/10">

                {/* Resume Button */}
                <button
                  type="button"
                  onClick={() => setResumeOpen(!resumeOpen)}
                  className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 text-left text-lg font-bold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02]"
                >
                  <span>{resume.label || "RESUME"}</span>

                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${resumeOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Resume Options - Show Only After Clicking */}
                <AnimatePresence>
                  {resumeOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      {resume.options.map((option) => (
                        <div
                          key={option.name}
                          className="flex items-center justify-between rounded-xl px-4 py-3"
                        >
                          <span className="font-semibold text-slate-700 dark:text-white">
                            {option.name}
                          </span>

                          <div className="flex gap-2">

                            {/* View PDF */}
                            <a
                              href={option.pdf.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View ${option.name} Resume`}
                              onClick={() => setIsOpen(false)}
                              className="rounded-lg border border-slate-200 p-2 dark:border-white/10"
                            >
                              <Eye size={18} />
                            </a>

                            {/* Download Resume */}
                            <button
                              type="button"
                              onClick={() => openDownloadModal(option)}
                              aria-label={`Download ${option.name} Resume`}
                              className="rounded-lg border border-slate-200 p-2 dark:border-white/10"
                            >
                              <Download size={18} />
                            </button>

                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Download Modal */}
      <AnimatePresence>

        {downloadModal && selectedResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-md"
            onClick={() => {
              if (!downloadingFormat) {
                setDownloadModal(false);
                setSelectedResume(null);
              }
            }}
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white p-7 shadow-2xl dark:bg-slate-950"
            >

              {/* Close Button */}
              {!downloadingFormat && (
                <button
                  onClick={() => {
                    setDownloadModal(false);
                    setSelectedResume(null);
                  }}
                  aria-label="Close download popup"
                  className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              )}

              {/* Format Selection */}
              {!downloadingFormat ? (
                <>

                  <div className="mb-5 flex justify-center">
                    <div className="rounded-2xl bg-violet-500/10 p-4">
                      <Download
                        size={32}
                        className="text-violet-600 dark:text-violet-400"
                      />
                    </div>
                  </div>

                  <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
                    Download Resume
                  </h2>

                  <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                    Choose your preferred file format
                  </p>

                  <div className="mt-7 grid grid-cols-2 gap-4">

                    {/* PDF Option */}
                    <button
                      onClick={() => handleResumeDownload("pdf")}
                      className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 p-6 transition hover:border-violet-500 hover:bg-violet-500/5 dark:border-white/10 dark:hover:border-violet-400"
                    >
                      <div className="rounded-xl bg-red-500/10 p-4 text-red-500 transition group-hover:scale-110">
                        <FileText size={32} />
                      </div>

                      <span className="text-lg font-bold text-slate-800 dark:text-white">
                        PDF
                      </span>

                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Portable Document
                      </span>
                    </button>

                    {/* DOCX Option */}
                    <button
                      onClick={() => handleResumeDownload("docx")}
                      className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 p-6 transition hover:border-blue-500 hover:bg-blue-500/5 dark:border-white/10 dark:hover:border-blue-400"
                    >
                      <div className="rounded-xl bg-blue-500/10 p-4 text-blue-500 transition group-hover:scale-110">
                        <FileText size={32} />
                      </div>

                      <span className="text-lg font-bold text-slate-800 dark:text-white">
                        DOCX
                      </span>

                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Word Document
                      </span>
                    </button>

                  </div>

                  <p className="mt-6 text-center text-xs text-slate-400">
                    Resume: {selectedResume.name}
                  </p>

                </>
              ) : (

                /* Circular Download Animation */
                <div className="flex flex-col items-center justify-center py-10">

                  <div className="relative flex h-28 w-28 items-center justify-center">

                    {/* Background Circle */}
                    <svg
                      className="absolute inset-0 h-full w-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="44"
                        stroke="currentColor"
                        strokeWidth="7"
                        fill="none"
                        className="text-slate-200 dark:text-slate-700"
                      />

                      {/* Progress Circle */}
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="44"
                        stroke="url(#progressGradient)"
                        strokeWidth="7"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 44}
                        strokeDashoffset={
                          2 * Math.PI * 44 * (1 - downloadProgress / 100)
                        }
                        transition={{ duration: 0.1 }}
                      />

                      <defs>
                        <linearGradient id="progressGradient">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Percentage Instead of Download Icon */}
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {downloadProgress}%
                    </span>

                  </div>

                  <h2 className="mt-7 text-xl font-bold text-slate-900 dark:text-white">
                    Preparing Download...
                  </h2>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Your {downloadingFormat.toUpperCase()} resume is being downloaded.
                  </p>

                </div>

              )}

            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

    </header>
  );
}
