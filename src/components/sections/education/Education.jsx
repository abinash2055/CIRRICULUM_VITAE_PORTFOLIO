
import { motion } from "framer-motion";

import {
  GraduationCap,
  MapPin,
  CalendarDays,
  Sparkles,
  Building2,
  BookOpen,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Medal,
} from "lucide-react";

import { useTheme } from "../../../context/ThemeContext";
import educationData from "../../../data/education";

import EducationBackground3D from "./EducationBackground3D";

const Education = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const heading = educationData?.heading ?? {};
  const educations = educationData?.educations ?? [];

  return (
    <section
      id="education"
      className={`relative isolate w-full overflow-hidden py-24 transition-colors duration-700 md:py-32 ${isDark ? "text-white" : "text-slate-900"
        }`}
    >
      {/* 3D Academic Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <EducationBackground3D />
        </div>
      </div>

      {/* Animated Background Glows */}
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

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2">
            <Sparkles className="h-4 w-4 text-violet-500" />

            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-500">
              {heading.eyebrow || "MY ACADEMIC JOURNEY"}
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {heading.title || "Education & Qualifications"}
          </h2>

          <p
            className={`mx-auto mt-6 max-w-2xl text-sm leading-8 sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"
              }`}
          >
            {heading.description ||
              "My academic background, qualifications, and educational journey."}
          </p>
        </motion.div>

        {/* Empty State */}
        {educations.length === 0 ? (
          <div
            className={`rounded-3xl border border-dashed p-12 text-center backdrop-blur-xl ${isDark
                ? "border-violet-500/40 bg-slate-900/40"
                : "border-violet-300 bg-white/60"
              }`}
          >
            <GraduationCap className="mx-auto mb-4 h-12 w-12 text-violet-500" />

            <h3 className="text-xl font-bold">
              Education Details Coming Soon
            </h3>

            <p className="mt-3 text-sm text-slate-400">
              Add your academic records in src/data/education.js.
            </p>
          </div>
        ) : (
          /* Education Timeline */
          <div className="relative">

            {/* Vertical Timeline Line */}
            <div className="absolute bottom-0 left-5 top-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-violet-500 via-blue-500 to-cyan-400 md:left-1/2" />

            {/* Animated Timeline Light */}
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
              {educations.map((education, index) => {
                if (
                  !education?.institutionName ||
                  !education?.degree
                ) {
                  return null;
                }

                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={education.id ?? index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.7,
                      delay: Math.min(index * 0.15, 0.6),
                    }}
                    className="relative grid grid-cols-1 md:grid-cols-2 md:gap-8"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-5 top-8 z-20 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-violet-400 bg-slate-950 shadow-[0_0_20px_5px_rgba(139,92,246,0.4)] md:left-1/2">
                      <div className="h-2 w-2 rounded-full bg-cyan-300" />
                    </div>

                    {/* Empty Timeline Column */}
                    <div
                      className={`hidden md:block ${isLeft ? "order-2" : "order-1"
                        }`}
                    />

                    {/* Education Card Wrapper */}
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

                        {/* Top Gradient Accent */}
                        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400" />

                        {/* Institution and Degree */}
                        <div className="relative mb-7 flex items-start gap-4">

                          {/* Institution Logo */}
                          <div
                            className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border ${isDark
                                ? "border-white/10 bg-white/10"
                                : "border-slate-200 bg-slate-100"
                              }`}
                          >
                            <GraduationCap className="absolute h-8 w-8 text-violet-500" />

                            {education.institutionLogo && (
                              <img
                                src={education.institutionLogo}
                                alt={`${education.institutionName} logo`}
                                className="relative z-10 h-full w-full bg-inherit object-contain p-2"
                                onError={(event) => {
                                  event.currentTarget.style.display = "none";
                                }}
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="text-xl font-bold leading-tight sm:text-2xl">
                              {education.degree}
                            </h3>

                            {education.fieldOfStudy && (
                              <p className="mt-1 text-sm text-cyan-500">
                                {education.fieldOfStudy}
                              </p>
                            )}

                            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-violet-500">
                              <Building2 className="h-4 w-4 shrink-0" />
                              {education.institutionName}
                            </p>
                          </div>
                        </div>

                        {/* Academic Details */}
                        <div className="relative mb-6 flex flex-wrap gap-3">

                          {/* Study Period */}
                          {education.period && (
                            <div
                              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${isDark
                                  ? "border-white/10 bg-white/5 text-slate-300"
                                  : "border-slate-200 bg-slate-50 text-slate-600"
                                }`}
                            >
                              <CalendarDays className="h-4 w-4 text-cyan-500" />
                              {education.period}
                            </div>
                          )}

                          {/* Institution Location */}
                          {education.institutionLocation && (
                            <div
                              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs ${isDark
                                  ? "border-white/10 bg-white/5 text-slate-300"
                                  : "border-slate-200 bg-slate-50 text-slate-600"
                                }`}
                            >
                              <MapPin className="h-4 w-4 text-violet-500" />
                              {education.institutionLocation}
                            </div>
                          )}

                          {/* Study Status */}
                          {education.status && (
                            <span
                              className={`rounded-xl border px-3 py-2 text-xs ${isDark
                                  ? "border-white/10 bg-white/5 text-slate-300"
                                  : "border-slate-200 bg-slate-50 text-slate-600"
                                }`}
                            >
                              {education.status}
                            </span>
                          )}
                        </div>

                        {/* Academic Grade */}
                        {education.grade && (
                          <div className="relative mb-6 flex items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
                            <Award className="h-6 w-6 shrink-0 text-violet-500" />

                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-violet-500">
                                Academic Performance
                              </p>

                              <p className="mt-1 text-sm font-bold">
                                {education.grade}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Academic Overview */}
                        {education.description && (
                          <div className="relative mb-7">
                            <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-violet-500">
                              Academic Overview
                            </h4>

                            <p
                              className={`text-sm leading-7 ${isDark
                                  ? "text-slate-400"
                                  : "text-slate-600"
                                }`}
                            >
                              {education.description}
                            </p>
                          </div>
                        )}

                        {/* Major Subjects */}
                        {education.majorSubjects?.length > 0 && (
                          <div className="relative mb-7">
                            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-500">
                              <BookOpen className="h-4 w-4" />
                              Major Subjects
                            </h4>

                            <div className="flex flex-wrap gap-3">
                              {education.majorSubjects.map(
                                (subject, subjectIndex) => (
                                  <motion.span
                                    key={subjectIndex}
                                    whileHover={{ y: -4, scale: 1.04 }}
                                    className={`rounded-xl border px-3 py-2 text-xs font-medium ${isDark
                                        ? "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/50 hover:bg-cyan-500/10"
                                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-cyan-300 hover:bg-cyan-50"
                                      }`}
                                  >
                                    {subject}
                                  </motion.span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Academic Achievements */}
                        {education.achievements?.length > 0 && (
                          <div className="relative mb-7">
                            <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-violet-500">
                              <Medal className="h-4 w-4" />
                              Academic Achievements
                            </h4>

                            <div className="space-y-3">
                              {education.achievements.map(
                                (achievement, achievementIndex) => (
                                  <div
                                    key={achievementIndex}
                                    className="flex items-start gap-3"
                                  >
                                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-500" />

                                    <p
                                      className={`text-sm leading-6 ${isDark
                                          ? "text-slate-400"
                                          : "text-slate-600"
                                        }`}
                                    >
                                      {achievement}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Institution Website */}
                        {education.institutionWebsite && (
                          <a
                            href={education.institutionWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative mt-2 inline-flex items-center gap-2 text-sm font-semibold text-violet-500 transition-colors hover:text-cyan-500"
                          >
                            Visit Institution
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
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

export default Education;
