
import { motion } from "framer-motion";

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
  FaInstagram
} from "react-icons/fa";

import HeroScene from "./HeroScene";

import heroData from "../../data/hero";

// Icon mapping
const buttonIcons = {
  "arrow-right": ArrowRight,
  send: Send,
};

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  instagram: FaInstagram,
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-44 md:px-10 md:pt-48"
    >

      {/* Background Lighting */}

      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-500/15 blur-[140px]" />

      <div className="pointer-events-none absolute -right-32 top-1/4 h-[450px] w-[450px] rounded-full bg-violet-500/15 blur-[150px]" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-[130px]" />

      {/* Main Container */}

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-14">

        {/* LEFT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10"
        >

          {/* Availability */}

          {heroData.availability.enabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-sm font-medium text-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.10)] dark:text-emerald-400"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>

              <Sparkles size={15} />

              {heroData.availability.text}
            </motion.div>
          )}

          {/* Introduction */}

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-3 text-lg font-medium tracking-wide text-slate-600 dark:text-slate-300 md:text-xl"
          >
            {heroData.introduction}
          </motion.p>

          {/* Name */}

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl leading-[1.12] font-black tracking-tight md:text-6xl xl:text-7xl"
          >
            <span className="gradient-text">
              {heroData.name}
            </span>
          </motion.h1>

          {/* Professional Titles */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 flex flex-wrap items-center gap-2 text-xl font-bold text-slate-800 dark:text-white md:text-2xl"
          >
            <Code2 className="text-violet-500" size={25} />

            {heroData.titles.map((title, index) => (
              <span key={title} className="contents">
                {index > 0 && (
                  <span className="text-violet-500">&</span>
                )}

                <span className={index === 1 ? "gradient-text" : ""}>
                  {title}
                </span>
              </span>
            ))}
          </motion.div>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-7 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg"
          >
            {heroData.description}
          </motion.p>

          {/* Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {heroData.buttons.map((button) => {
              const Icon = buttonIcons[button.icon];

              return (
                <a
                  key={button.name}
                  href={button.href}
                  className={
                    button.style === "primary"
                      ? "group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 px-7 py-4 font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.30)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(139,92,246,0.55)]"
                      : "group inline-flex items-center gap-3 rounded-full border border-violet-500/40 bg-white/50 px-7 py-4 font-semibold text-slate-800 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10 dark:bg-white/5 dark:text-white"
                  }
                >
                  <span>{button.name}</span>

                  {Icon && (
                    <Icon
                      size={19}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  )}
                </a>
              );
            })}
          </motion.div>

          {/* Social Links */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-5"
          >
            <span className="text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
              FIND ME ON
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
                  className="group rounded-full border border-violet-500/20 bg-white/60 p-3.5 text-slate-700 shadow-lg shadow-violet-500/5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-violet-500/60 hover:bg-violet-500/10 hover:text-violet-500 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)] dark:bg-white/5 dark:text-white"
                >
                  <Icon
                    size={21}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              );
            })}
          </motion.div>

        </motion.div>

        {/* RIGHT 3D VISUAL */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[600px]"
        >

          {/* Outer Glow */}

          <div className="pointer-events-none absolute -inset-5 rounded-[50px] bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-cyan-500/20 blur-2xl" />

          {/* Glass Container */}

          <div className="glass glow relative isolate overflow-hidden rounded-[40px] border border-violet-400/30 shadow-[0_0_35px_rgba(139,92,246,0.15),0_0_70px_rgba(59,130,246,0.10)] transition-all duration-500 hover:shadow-[0_0_45px_rgba(139,92,246,0.30),0_0_90px_rgba(59,130,246,0.20)]">

            <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-violet-500/15 via-transparent to-cyan-500/15" />

            <div className="relative z-10 h-full w-full">
              <HeroScene />
            </div>

            {/* Bottom Label */}

            <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-slate-950/60 px-5 py-2.5 text-xs font-medium tracking-[0.2em] text-white shadow-xl backdrop-blur-2xl">
              {heroData.visual.bottomLabel}
            </div>

          </div>

          {/* Floating Labels */}

          {heroData.visual.floatingLabels.map((label) => {
            const positions = {
              left: "-left-3 top-[38%] sm:-left-8",
              right: "-right-3 top-[58%] sm:-right-8",
              "top-left": "left-2 top-3 sm:left-5 sm:-top-5",
              "top-right": "right-2 top-3 sm:right-5 sm:-top-5",
              "bottom-left": "bottom-16 left-2 sm:bottom-12 sm:left-5",
              "bottom-right": "bottom-16 right-2 sm:bottom-12 sm:right-5",
            };

            const colorStyles = {
              cyan: "border-cyan-400/30 text-cyan-600 shadow-[0_0_25px_rgba(6,182,212,0.15)] dark:text-cyan-400",
              violet: "border-violet-400/30 text-violet-600 shadow-[0_0_25px_rgba(139,92,246,0.15)] dark:text-violet-400",
              blue: "border-blue-400/30 text-blue-600 shadow-[0_0_25px_rgba(59,130,246,0.15)] dark:text-blue-400",
            };

            return (
              <motion.div
                key={label.name}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0, -2, 0],
                }}
                transition={{
                  duration: 4 + label.animationDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: label.animationDelay,
                }}
                className={`glass absolute z-20 max-w-[155px] rounded-2xl border px-3 py-2 text-center text-xs font-semibold shadow-xl backdrop-blur-xl sm:max-w-none sm:px-5 sm:py-3 sm:text-sm ${positions[label.position] || positions.left
                  } ${colorStyles[label.color] || colorStyles.cyan
                  }`}
              >
                {label.name}
              </motion.div>
            );
          })}


        </motion.div>
      </div>

      {/* Scroll Indicator */}

      <motion.a
        href="#home"
        aria-label="Go to Home section"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-7 left-1/2 z-30 flex h-16 w-9 -translate-x-1/2 items-start justify-center rounded-full border-[3px] border-violet-400/70 bg-white/10 p-2 shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-md transition-colors duration-300 hover:border-cyan-400 dark:border-violet-300/70"
      >
        <motion.span
          animate={{ y: [0, 23, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.8)] dark:bg-violet-300"
        />
      </motion.a>
    </section>
  );
};

export default Hero;
