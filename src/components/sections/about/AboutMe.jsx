
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  Code2,
  Terminal,
  Network,
  Sparkles,
  Lightbulb,
  Rocket,
  Cpu,
  Layers3,
} from "lucide-react";

import { useTheme } from "../../../context/ThemeContext";
import aboutData from "../../../data/about";
import DeveloperAvatar3D from "../about/DeveloperAvatar3D";

const reveal = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" },
  },
};

const iconMap = {
  code: Code2,
  terminal: Terminal,
  brain: Brain,
  network: Network,
};

const AboutMe = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const panel = isDark
    ? "border-white/10 bg-white/[0.045] shadow-[0_10px_50px_rgba(0,0,0,0.2)]"
    : "border-slate-200 bg-white/75 shadow-[0_10px_40px_rgba(51,65,85,0.08)]";

  const muted = isDark ? "text-slate-400" : "text-slate-600";
  const heading = isDark ? "text-white" : "text-slate-900";

  const technologies = aboutData.technologies;

  return (
    <section
      id="about"
      className={`relative isolate w-full scroll-mt-24 overflow-hidden py-24 transition-colors duration-700 md:py-32 ${isDark ? "bg-[#050816] text-white" : "bg-[#F8FAFF] text-slate-900"
        }`}
    >
      {/* BACKGROUND LIGHTS */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
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
          className={`absolute -left-40 top-20 h-[350px] w-[350px] rounded-full blur-[110px] ${isDark ? "bg-purple-700/20" : "bg-purple-300/30"
            }`}
        />

        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -right-40 top-[35%] h-[400px] w-[400px] rounded-full blur-[120px] ${isDark ? "bg-cyan-600/15" : "bg-cyan-300/25"
            }`}
        />

        <div
          className={`absolute inset-0 ${isDark
            ? "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.07),transparent_65%)]"
            : "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05),transparent_65%)]"
            }`}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* SECTION HEADING */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 text-center md:mb-20"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            <span className="text-xs font-semibold tracking-[0.25em] text-purple-500">
              {aboutData.heading.eyebrow}
            </span>
          </div>

          <h2 className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl ${heading}`}>
            {aboutData.heading.title}
            <br />
            <span className="bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {aboutData.heading.highlight}
            </span>
          </h2>

          <p className={`mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg ${muted}`}>
            {aboutData.heading.description}
          </p>
        </motion.div>

        {/* MAIN PROFILE + 3D AVATAR */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10">

          {/* PROFILE CARD */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -6 }}
            className={`relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-2xl transition-colors duration-500 sm:p-8 ${panel}`}
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">

              {/* PROFILE IMAGE */}
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <div className="absolute -inset-2 animate-pulse rounded-[2rem] bg-gradient-to-br from-violet-500 via-cyan-400 to-blue-500 opacity-50 blur-md" />

                <div className="relative h-44 w-40 overflow-hidden rounded-[1.6rem] border border-white/30 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 sm:h-48 sm:w-44">
                  <img
                    src={aboutData.profile.image}
                    alt={aboutData.profile.imageAlt}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050816]/60 via-transparent to-transparent" />
                </div>

                <div className="absolute -bottom-3 -right-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[#111827] shadow-xl">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                </div>
              </div>

              {/* PROFILE TEXT */}
              <div className="relative flex-1 text-center sm:text-left">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-xs font-medium text-emerald-500">
                    {aboutData.profile.status}
                  </span>
                </div>

                <h3 className={`text-xl font-extrabold leading-tight sm:text-2xl ${heading}`}>
                  {aboutData.profile.name}
                </h3>

                <p className="mt-2 text-sm font-semibold text-violet-500">
                  {aboutData.profile.role}
                </p>

                <p className="mt-1 text-sm font-medium text-cyan-500">
                  {aboutData.profile.secondaryRole}
                </p>

                <p className={`mt-4 text-sm leading-7 ${muted}`}>
                  {aboutData.profile.description}
                </p>
              </div>
            </div>

            <div className="relative mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-5">
              {["Creative Thinker", "Problem Solver", "Tech Enthusiast"].map((item) => (
                <span
                  key={item}
                  className={`rounded-full border px-3 py-2 text-xs font-medium ${isDark
                    ? "border-white/10 bg-white/5 text-slate-300"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 3D AVATAR CARD */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={`relative min-w-0 overflow-hidden rounded-[2rem] border backdrop-blur-2xl ${panel}`}
          >
            <div className="absolute left-6 top-6 z-10">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                {aboutData.avatar.label}
              </div>
              <p className={`mt-2 text-xs ${muted}`}>
                {aboutData.avatar.caption}
              </p>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.17),transparent_60%)]" />

            <div className="relative">
              <DeveloperAvatar3D />
            </div>

            <div className="absolute bottom-5 left-0 right-0 z-10 text-center">
              <span className={`rounded-full border px-4 py-2 text-xs backdrop-blur-xl ${isDark
                ? "border-white/10 bg-black/30 text-slate-300"
                : "border-slate-200 bg-white/70 text-slate-700"
                }`}>
                Interactive 3D Developer
              </span>
            </div>
          </motion.div>
        </div>

        {/* TECHNICAL UNIVERSE */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 md:mt-28"
        >
          <div className="mb-9 text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-cyan-500">
              MY TECHNICAL UNIVERSE
            </p>
            <h3 className={`mt-3 text-3xl font-bold sm:text-4xl ${heading}`}>
              Technologies I Explore
            </h3>
            <p className={`mx-auto mt-3 max-w-xl text-sm leading-7 ${muted}`}>
              Different technologies, connected by one passion: building useful and innovative digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {technologies.map((technology, index) => {
              const Icon = iconMap[technology.icon];

              return (
                <motion.div
                  key={technology.name}
                  initial={{ opacity: 0, y: 35, rotateX: -12 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.12,
                  }}
                  whileHover={{
                    y: -10,
                    rotateY: 5,
                    scale: 1.025,
                  }}
                  className={`group relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl ${panel}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: technology.color }}
                  />

                  <div
                    className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
                    style={{ color: technology.color }}
                  >
                    {Icon && <Icon size={28} />}
                  </div>

                  <h4 className={`relative text-lg font-bold ${heading}`}>
                    {technology.name}
                  </h4>

                  <p className={`relative mt-2 text-sm ${muted}`}>
                    {technology.detail}
                  </p>

                  <div
                    className="relative mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-500/20"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        delay: index * 0.15,
                      }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: technology.color }}
                    />
                  </div>

                  <ArrowUpRight
                    className="absolute bottom-6 right-6 opacity-30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                    size={18}
                    style={{ color: technology.color }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* TERMINAL + PHILOSOPHY */}
        <div className="mt-20 grid grid-cols-1 gap-6 lg:mt-28 lg:grid-cols-2">

          {/* TERMINAL */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={`overflow-hidden rounded-3xl border backdrop-blur-2xl ${panel}`}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-cyan-500" />
                <span className={`text-sm font-semibold ${heading}`}>
                  {aboutData.terminal.title}
                </span>
              </div>

              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="space-y-5 p-6 sm:p-8">
              {aboutData.terminal.lines.map((line, index) => (
                <motion.div
                  key={line.prompt}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.35, duration: 0.5 }}
                >
                  <p className="font-mono text-sm font-semibold text-cyan-500">
                    {line.prompt}
                  </p>
                  <p className={`mt-1 pl-4 font-mono text-sm ${muted}`}>
                    <span className="mr-2 text-purple-500">↳</span>
                    {line.output}
                  </p>
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block h-4 w-2 bg-cyan-400"
              />
            </div>
          </motion.div>

          {/* PHILOSOPHY */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -5 }}
            className={`relative overflow-hidden rounded-3xl border p-7 backdrop-blur-2xl sm:p-9 ${panel}`}
          >
            <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-500">
                <Lightbulb size={28} />
              </div>

              <p className="text-xs font-bold tracking-[0.25em] text-purple-500">
                {aboutData.philosophy.eyebrow}
              </p>

              <h3 className={`mt-4 text-2xl font-extrabold leading-tight sm:text-3xl ${heading}`}>
                {aboutData.philosophy.title}
              </h3>

              <p className={`mt-5 text-sm leading-8 ${muted}`}>
                {aboutData.philosophy.description}
              </p>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {aboutData.philosophy.principles.map((principle, index) => (
                  <motion.div
                    key={principle}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 }}
                    className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-medium ${isDark
                      ? "border-white/10 bg-white/5 text-slate-300"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                  >
                    <Sparkles size={14} className="shrink-0 text-cyan-500" />
                    {principle}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* INTERESTS */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={`mt-8 rounded-3xl border p-6 backdrop-blur-2xl sm:p-8 ${panel}`}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-purple-500">
                <Rocket size={18} />
                <span className="text-xs font-bold tracking-[0.25em]">
                  BEYOND MY CODE
                </span>
              </div>
              <h3 className={`mt-2 text-2xl font-bold ${heading}`}>
                Things That Inspire Me
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 md:max-w-2xl md:justify-end">
              {aboutData.interests.map((interest) => (
                <span
                  key={interest}
                  className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 hover:text-purple-500 ${isDark
                    ? "border-white/10 bg-white/5 text-slate-300"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutMe;
