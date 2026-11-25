
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Code2 } from "lucide-react";

import SkillOrbScene from "./SkillOrbScene";

import { useTheme } from "../../../context/ThemeContext";
import skillsData from "../../../data/skills";

const Skills = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeFilter, setActiveFilter] = useState("all");

  const visibleCategories = useMemo(() => {
    if (activeFilter === "all") return skillsData.categories;

    return skillsData.categories.filter(
      (category) => category.id === activeFilter
    );
  }, [activeFilter]);


  // Ball Sphere logo design
  const [columns, setColumns] = useState(
    window.innerWidth < 640 ? 2 : 4
  );

  useEffect(() => {
    const handleResize = () => {
      setColumns(window.innerWidth < 640 ? 2 : 4);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="skills"
      className={`relative isolate w-full scroll-mt-24 overflow-hidden py-24 transition-colors duration-700 md:py-32 ${isDark
        ? "bg-[#050816] text-white"
        : "bg-[#F8FAFF] text-slate-900"
        }`}
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -left-40 top-20 h-96 w-96 rounded-full blur-[140px] ${isDark ? "bg-violet-600/15" : "bg-violet-300/30"
            }`}
        />

        <div
          className={`absolute -right-40 bottom-10 h-96 w-96 rounded-full blur-[140px] ${isDark ? "bg-cyan-500/10" : "bg-cyan-300/25"
            }`}
        />

        <div
          className={`absolute inset-0 opacity-[0.035] ${isDark
            ? "bg-[radial-gradient(#ffffff_1px,transparent_1px)]"
            : "bg-[radial-gradient(#334155_1px,transparent_1px)]"
            } bg-[size:30px_30px]`}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-14">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <div
            className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold tracking-[0.25em] ${isDark
              ? "border-violet-400/20 bg-violet-400/10 text-violet-300"
              : "border-violet-200 bg-violet-50 text-violet-700"
              }`}
          >
            <Sparkles size={15} />
            {skillsData.heading.eyebrow}
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {skillsData.heading.title.split(" ")[0]}{" "}
            <span className="bg-gradient-to-r from-violet-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {skillsData.heading.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>

          <p
            className={`mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg ${isDark ? "text-slate-400" : "text-slate-600"
              }`}
          >
            {skillsData.heading.description}
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {skillsData.filters.map((filter) => {
            const selected = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${selected
                  ? "border-transparent bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20"
                  : isDark
                    ? "border-white/10 bg-white/[0.04] text-slate-400 hover:border-violet-400/40 hover:text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-700"
                  }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Category Dashboard */}
        <motion.div layout className="space-y-8">
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((category, index) => (
              <motion.div
                layout
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
                className={`group relative overflow-hidden rounded-[28px] border p-6 backdrop-blur-xl transition-all duration-500 md:p-9 ${isDark
                  ? "border-white/10 bg-white/[0.035] hover:border-violet-400/30 hover:bg-white/[0.055]"
                  : "border-slate-200 bg-white/75 shadow-lg shadow-slate-200/30 hover:border-violet-300"
                  }`}
              >
                {/* Decorative Glow */}
                <div
                  className={`pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-[100px] ${isDark ? "bg-violet-500/10" : "bg-violet-300/20"
                    }`}
                />

                <div className="relative">

                  {/* Category Heading */}
                  <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${isDark
                          ? "bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-cyan-300"
                          : "bg-gradient-to-br from-violet-100 to-cyan-100 text-violet-700"
                          }`}
                      >
                        <Code2 size={24} />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold sm:text-2xl">
                          {category.name}
                        </h3>

                        <p
                          className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-500"
                            }`}
                        >
                          {category.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold tracking-[0.2em] ${isDark ? "text-slate-500" : "text-slate-400"
                          }`}
                      >
                        CATEGORY
                      </span>

                      <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-2xl font-black text-transparent">
                        {category.number}
                      </span>
                    </div>
                  </div>

                  {/* Skill Tiles */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={`${category.id}-${skill.name}`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: index * 0.06 + skillIndex * 0.045,
                          duration: 0.35,
                        }}
                        whileHover={{ y: -7, scale: 1.035 }}
                        className={`group/skill relative flex min-h-[135px] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border p-4 backdrop-blur-xl transition-all duration-500 ${isDark
                          ? "border-white/10 bg-gradient-to-br from-white/[0.09] via-[#111A35]/70 to-cyan-400/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_30px_rgba(0,0,0,0.25)] hover:border-cyan-300/40 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_25px_rgba(34,211,238,0.16)]"
                          : "border-white/80 bg-gradient-to-br from-white/95 via-white/75 to-violet-100/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_8px_30px_rgba(100,116,139,0.10)] hover:border-violet-300 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_0_25px_rgba(139,92,246,0.15)]"
                          }`}

                      >
                        {/* Hover Glow */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/0 via-transparent to-cyan-400/0 opacity-0 transition-opacity duration-300 group-hover/skill:from-violet-500/[0.08] group-hover/skill:to-cyan-400/[0.08] group-hover/skill:opacity-100" />

                        {/* Skill Logo */}
                        <div className="relative flex h-12 w-12 items-center justify-center transition-transform duration-300 group-hover/skill:scale-110">
                          <img
                            src={`/icons/${skill.icon}`}
                            alt={skill.name}
                            loading="lazy"
                            className="h-full w-full object-contain"
                          />
                        </div>

                        {/* Skill Name */}
                        <span
                          className={`relative text-center text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"
                            }`}
                        >
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom Accent */}
                  <div
                    className={`mt-8 h-px w-full ${isDark ? "bg-white/[0.07]" : "bg-slate-200"
                      }`}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border p-7 text-center backdrop-blur-xl md:flex-row md:text-left ${isDark
            ? "border-white/10 bg-white/[0.035]"
            : "border-slate-200 bg-white/70"
            }`}
        >
          <div>
            <h3 className="text-xl font-bold">
              {skillsData.footer.title}
            </h3>

            <p
              className={`mt-2 max-w-2xl text-sm leading-7 ${isDark ? "text-slate-400" : "text-slate-500"
                }`}
            >
              {skillsData.footer.description}
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-violet-500/20">
            <ArrowUpRight size={25} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;


