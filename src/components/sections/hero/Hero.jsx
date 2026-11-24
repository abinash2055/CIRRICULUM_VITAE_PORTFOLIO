
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowRight,
  Send,
  Sparkles,
  Code2,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

import { useTheme } from "../../../context/ThemeContext";
import HeroScene from "./HeroScene";
import heroData from "../../../data/hero";

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  instagram: FaInstagram,
};

const positionClasses = {
  "top-left": "top-[12%] left-[5%]",
  "top-right": "top-[10%] right-[5%]",
  left: "top-[45%] left-[1%]",
  right: "top-[45%] right-[1%]",
  "bottom-left": "bottom-[14%] left-[7%]",
  "bottom-right": "bottom-[12%] right-[5%]",
};

const Hero = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeTitle, setActiveTitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTitle(
        (current) => (current + 1) % heroData.titles.length
      );
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className={`relative pt-20 pb-20 isolate flex min-h-[calc(100svh-80px)] w-full scroll-mt-24 items-center overflow-hidden transition-colors duration-700 ${isDark
        ? "bg-[#050816] text-white"
        : "bg-[#F8FAFF] text-slate-900"
        }`}
    >
      {/* Background universe lighting */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">

        <div
          className={`absolute -left-40 top-[-10%] h-[450px] w-[450px] rounded-full blur-[150px] transition-colors duration-700 ${isDark ? "bg-violet-700/20" : "bg-violet-400/25"
            }`}
        />

        <div
          className={`absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full blur-[160px] transition-colors duration-700 ${isDark ? "bg-blue-600/20" : "bg-blue-400/20"
            }`}
        />

        <div
          className={`absolute bottom-[-20%] left-[35%] h-[400px] w-[400px] rounded-full blur-[150px] transition-colors duration-700 ${isDark ? "bg-cyan-500/10" : "bg-cyan-400/20"
            }`}
        />

        <div
          className={`absolute inset-0 transition-colors duration-700 ${isDark
            ? "bg-gradient-to-b from-transparent via-[#050816]/10 to-[#050816]/80"
            : "bg-gradient-to-b from-white/5 via-[#F8FAFF]/10 to-[#F8FAFF]/60"
            }`}
        />
      </div>

      {/* 3D universe */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <HeroScene />
      </div>

      {/* Main content */}
      <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-5 py-28 sm:px-8 md:py-32 lg:grid-cols-2 lg:gap-12 lg:px-14 xl:px-20">

        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -45 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-20 mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left"
        >

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className={`mb-7 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-wide backdrop-blur-xl transition-colors duration-500 ${isDark
              ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.10)]"
              : "border-emerald-500/30 bg-emerald-50/80 text-emerald-700 shadow-[0_5px_25px_rgba(16,185,129,0.08)]"
              }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            {heroData.availability.text}
          </motion.div>

          {/* Introduction */}
          <motion.p
            className={`${heroData.introduction.font} ${heroData.introduction.color} ${heroData.introduction.size} ${heroData.introduction.weight} ${heroData.introduction.tracking}`}
          >
            {heroData.introduction.text}
          </motion.p>


          {/* Name */}
          <motion.h1
            className={`${heroData.name.font} ${heroData.name.size} ${heroData.name.weight} ${heroData.name.gradient} bg-clip-text text-transparent`}
          >
            {heroData.name.text}
          </motion.h1>

          {/* Animated professional title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-7 flex min-h-[45px] items-center justify-center gap-2 lg:justify-start"
          >
            <Code2
              size={23}
              className={`shrink-0 ${isDark ? "text-cyan-400" : "text-indigo-600"
                }`}
            />

            <AnimatePresence mode="wait">
              <motion.p
                key={activeTitle}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className={`bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent sm:text-2xl md:text-3xl ${isDark
                  ? "from-cyan-300 via-blue-400 to-violet-400"
                  : "from-indigo-600 via-blue-600 to-cyan-600"
                  }`}
              >
                {heroData.titles[activeTitle]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className={`mx-auto mt-7 max-w-xl text-sm leading-8 sm:text-base lg:mx-0 ${isDark ? "text-slate-300" : "text-slate-600"
              }`}
          >
            {heroData.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            {heroData.buttons.map((button) => (
              <a
                key={button.label}
                href={button.href}
                className={
                  button.type === "primary"
                    ? `group inline-flex items-center gap-3 rounded-xl px-6 py-3.5 text-base md:text-lg font-semibold text-white transition duration-300 hover:-translate-y-1 ${isDark
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
                      : "bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
                    }`
                    : `group inline-flex items-center gap-3 rounded-xl border px-6 py-3.5 text-base md:text-lg font-semibold backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${isDark
                      ? "border-white/20 bg-white/5 text-white hover:border-cyan-400/60 hover:bg-cyan-400/10"
                      : "border-slate-300 bg-white/70 text-slate-800 shadow-sm hover:border-indigo-400 hover:bg-indigo-50"
                    }`
                }
              >
                {button.label}

                {button.icon === "arrow" ? (
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                ) : (
                  <Send
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                )}
              </a>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-10 flex items-center justify-center gap-4 lg:justify-start"
          >
            <span
              className={`mr-2 text-sm font-semibold uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-slate-500"
                }`}
            >
              Find me on
            </span>

            {heroData.socials.map((social) => {
              const Icon = socialIcons[social.icon];

              if (!Icon) return null;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${isDark
                    ? "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-300"
                    : "border-slate-200 bg-white/70 text-slate-600 shadow-sm hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right visual area */}
        <div className="relative hidden h-[520px] w-full lg:block">

          {/* Floating technology labels */}
          {heroData.visual.floatingLabels.map((item) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.8, y: 15 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                opacity: {
                  delay: 1.2 + item.delay,
                  duration: 0.8,
                },
                scale: {
                  delay: 1.2 + item.delay,
                  duration: 0.8,
                },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                },
              }}
              className={`absolute z-20 ${positionClasses[item.position]} rounded-xl border px-4 py-3 text-xs font-medium tracking-wide backdrop-blur-xl transition-colors duration-500 ${isDark
                ? "border-white/15 bg-slate-950/50 text-slate-200 shadow-[0_0_25px_rgba(139,92,246,0.12)]"
                : "border-indigo-200/80 bg-white/75 text-slate-700 shadow-[0_5px_25px_rgba(99,102,241,0.12)]"
                }`}
            >
              <span
                className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${isDark
                  ? "bg-cyan-400 shadow-[0_0_10px_#22D3EE]"
                  : "bg-indigo-500 shadow-[0_0_10px_#6366F1]"
                  }`}
              />

              {item.text}
            </motion.div>
          ))}

          {/* Galaxy glow */}
          <div
            className={`absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] ${isDark ? "bg-violet-600/10" : "bg-indigo-400/15"
              }`}
          />

          {/* Bottom label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className={`absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[10px] font-semibold tracking-[0.3em] ${isDark ? "text-slate-400" : "text-slate-500"
              }`}
          >
            <Sparkles
              size={14}
              className={isDark ? "text-cyan-400" : "text-indigo-500"}
            />

            {heroData.visual.bottomLabel}
          </motion.div>
        </div>
      </div>

      {/* Scrolling Effect */}
      <motion.a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("home")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        aria-label="Back to home"
        title="Back to home"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="absolute bottom-6 left-1/2 z-20 flex h-[68px] w-10 -translate-x-1/2 cursor-pointer items-start justify-center overflow-hidden rounded-full border-[3px] border-cyan-400/90 bg-cyan-400/10 p-2 shadow-[0_0_12px_rgba(34,211,238,0.35),inset_0_0_10px_rgba(34,211,238,0.15)] backdrop-blur-md transition-all duration-300 hover:border-violet-400 hover:shadow-[0_0_25px_rgba(139,92,246,0.55)]"
      >
        <motion.span
          animate={{
            y: [0, 30, 0],
            opacity: [1, 0.65, 1],
            scale: [1, 0.85, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-1 h-3 w-3 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_8px_#22D3EE,0_0_18px_#06B6D4]"
        />
      </motion.a>
    </section>
  );
};

export default Hero;
