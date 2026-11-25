
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  Sparkles,
  Building2,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

import { useTheme } from "../../../context/ThemeContext";
import experienceData from "../../../data/experience";

import ExperienceBackground3D from "./ExperienceBackground3D"

const Experience = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const heading = experienceData?.heading ?? {};
  const experiences = experienceData?.experiences ?? [];

  return (
    <section
      id="experience"
      className={`relative isolate w-full overflow-hidden py-24 transition-colors duration-700 md:py-32 ${isDark ? "text-white" : "text-slate-900"
        }`}
    >

      {/* 3D Technology Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <ExperienceBackground3D />
        </div>
      </div>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 70, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2">
            <Sparkles className="h-4 w-4 text-violet-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-500">
              {heading.eyebrow || "MY PROFESSIONAL JOURNEY"}
            </span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {(heading.title || "Experience & Journey").split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {(heading.title || "Experience & Journey")
                .split(" ")
                .slice(1)
                .join(" ")}
            </span>
          </h2>

          <p
            className={`mx-auto mt-6 max-w-2xl text-sm leading-8 sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"
              }`}
          >
            {heading.description ||
              "My professional experience, responsibilities, and technical journey."}
          </p>
        </motion.div>

        {/* Empty State */}
        {experiences.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-violet-500/40 p-12 text-center">
            <BriefcaseBusiness className="mx-auto mb-4 h-10 w-10 text-violet-500" />
            <h3 className="text-xl font-bold">
              No Experience Added Yet
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Add experience records in src/data/experience.js.
            </p>
          </div>
        ) : (

          /* Timeline */
          <div className="relative">

            {/* Vertical Line */}
            <div className="absolute bottom-0 left-5 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-400 md:left-1/2" />

            {/* Animated Line Light */}
            <motion.div
              animate={{ top: ["0%", "100%"] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute left-5 top-0 z-10 h-20 w-[3px] -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_20px_5px_rgba(34,211,238,0.6)] md:left-1/2"
            />

            <div className="space-y-16 md:space-y-24">
              {experiences.map((experience, index) => {
                // Skip incomplete records instead of crashing.
                if (!experience?.companyName || !experience?.jobTitle) {
                  return null;
                }

                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={experience.id ?? index}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: Math.min(index * 0.15, 0.6),
                    }}
                    className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-5 top-8 z-20 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-violet-400 bg-slate-950 shadow-[0_0_20px_5px_rgba(139,92,246,0.4)] md:left-1/2">
                      <div className="h-2 w-2 rounded-full bg-cyan-300" />
                    </div>

                    {/* Empty Column */}
                    <div
                      className={`hidden md:block ${isLeft ? "order-2" : "order-1"
                        }`}
                    />

                    {/* Experience Card */}
                    <div
                      className={`min-w-0 w-full pl-14 ${isLeft
                        ? "md:order-1 md:pl-0 md:pr-8"
                        : "md:order-2 md:pl-8"
                        }`}
                    >
                      <motion.article
                        whileHover={{ y: -7 }}
                        transition={{ duration: 0.3 }}
                        className={`group relative overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur-2xl sm:p-8 ${isDark
                          ? "border-white/10 bg-slate-900/70 shadow-black/20"
                          : "border-slate-200 bg-white/90 shadow-slate-300/30"
                          }`}
                      >
                        {/* Card Glow */}
                        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/10 blur-[70px] transition-all duration-500 group-hover:bg-cyan-500/20" />

                        {/* Top Accent */}
                        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400" />

                        {/* Company and Job */}
                        <div className="relative mb-7 flex items-start gap-4">
                          <div
                            className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border ${isDark
                              ? "border-white/10 bg-white/10"
                              : "border-slate-200 bg-slate-100"
                              }`}
                          >
                            <img
                              src={experience.companyLogo}
                              alt={`${experience.companyName} logo`}
                              className="h-full w-full object-contain p-2"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="text-xl font-bold leading-tight sm:text-2xl">
                              {experience.jobTitle}
                            </h3>

                            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-violet-500">
                              <Building2 className="h-4 w-4 shrink-0" />
                              {experience.companyName}
                            </p>
                          </div>
                        </div>

                        {/* Job Details */}
                        <div className="relative mb-6 flex flex-wrap gap-3">
                          <div
                            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${isDark
                              ? "border-white/10 bg-white/5 text-slate-300"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                              }`}
                          >
                            <CalendarDays className="h-4 w-4 text-cyan-500" />
                            {experience.period}
                          </div>

                          <div
                            className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${isDark
                              ? "border-white/10 bg-white/5 text-slate-300"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                              }`}
                          >
                            <MapPin className="h-4 w-4 text-violet-500" />
                            {experience.companyLocation}
                          </div>

                          {experience.jobType && (
                            <span
                              className={`rounded-xl border px-3 py-2 text-xs ${isDark
                                ? "border-white/10 bg-white/5 text-slate-300"
                                : "border-slate-200 bg-slate-50 text-slate-600"
                                }`}
                            >
                              {experience.jobType}
                            </span>
                          )}
                        </div>

                        {/* Job Overview */}
                        <div className="relative mb-6">
                          <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-violet-500">
                            Job Overview
                          </h4>

                          <p
                            className={`text-sm leading-7 ${isDark ? "text-slate-400" : "text-slate-600"
                              }`}
                          >
                            {experience.jobDescription}
                          </p>
                        </div>

                        {/* Work Description */}
                        <div className="relative mb-7">
                          <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-cyan-500">
                            Work Description
                          </h4>

                          <p
                            className={`text-sm leading-7 ${isDark ? "text-slate-400" : "text-slate-600"
                              }`}
                          >
                            {experience.workDescription}
                          </p>
                        </div>

                        {/* Responsibilities */}
                        {experience.responsibilities?.length > 0 && (
                          <div className="relative mb-7">
                            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-violet-500">
                              Key Responsibilities
                            </h4>

                            <div className="space-y-3">
                              {experience.responsibilities.map(
                                (responsibility, responsibilityIndex) => (
                                  <div
                                    key={responsibilityIndex}
                                    className="flex items-start gap-3"
                                  >
                                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-500" />

                                    <p
                                      className={`text-sm leading-6 ${isDark
                                        ? "text-slate-400"
                                        : "text-slate-600"
                                        }`}
                                    >
                                      {responsibility}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Technologies */}
                        {experience.technologies?.length > 0 && (
                          <div className="relative">
                            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-cyan-500">
                              Technologies Used
                            </h4>

                            <div className="flex flex-wrap gap-3">
                              {experience.technologies.map((tech, techIndex) => (
                                <motion.div
                                  key={techIndex}
                                  whileHover={{
                                    y: -4,
                                    scale: 1.05,
                                  }}
                                  title={tech}
                                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${isDark
                                    ? "border-white/10 bg-white/5 hover:border-violet-400/50 hover:bg-violet-500/10"
                                    : "border-slate-200 bg-slate-50 hover:border-violet-300 hover:bg-violet-50"
                                    }`}
                                >
                                  <span
                                    className={`text-xs font-medium ${isDark
                                      ? "text-slate-300"
                                      : "text-slate-600"
                                      }`}
                                  >
                                    {tech}
                                  </span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Company Website */}
                        {experience.companyWebsite ? (
                          <a
                            href={experience.companyWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition-colors hover:text-cyan-500"
                          >
                            Visit Company
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        ) : (
                          <button
                            onClick={() => alert("Website does not exist")}
                            className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition-colors hover:text-cyan-500 cursor-pointer"
                          >
                            Visit Company
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                        )}

                        {/* Company LinkedIn */}
                        {experience.linkedin ? (
                          <a
                            href={experience.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative mt-3 inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition-colors hover:text-cyan-500 px-3"
                          >
                            Visit LinkedIn
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        ) : (
                          <button
                            onClick={() => alert("LinkedIn does not exist")}
                            className="relative mt-3 inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition-colors hover:text-cyan-500 cursor-pointer px-3"
                          >
                            Visit LinkedIn
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                        )}

                        {/* Company Facebook */}
                        {experience.facebook ? (
                          <a
                            href={experience.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative mt-3 inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition-colors hover:text-cyan-500"
                          >
                            Visit Facebook
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        ) : (
                          <button
                            onClick={() => alert("Facebook does not exist")}
                            className="relative mt-3 inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition-colors hover:text-cyan-500 cursor-pointer"
                          >
                            Visit Facebook
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                        )}

                      </motion.article>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
