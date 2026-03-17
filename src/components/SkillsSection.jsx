import React, { useState, useRef, useEffect } from "react";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGithub,
  
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import { motion } from "framer-motion";

const iconMap = {
  react: SiReact,
  javascript: SiJavascript,
  htmlcss: SiHtml5,
  tailwindcss: SiTailwindcss,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  mysql: SiMysql,
  "git/github": SiGithub,
  vscode: DiVisualstudio,
};

const skills = [
  { name: "HTML/CSS", level: 90, category: "frontend" },
  { name: "JavaScript", level: 85, category: "frontend" },
  { name: "React", level: 80, category: "frontend" },
  { name: "Tailwind CSS", level: 80, category: "frontend" },
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Express", level: 85, category: "backend" },
  { name: "MongoDB", level: 80, category: "backend" },
  { name: "MySQL", level: 75, category: "backend" },
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = skills.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-10 text-center"
        >
          My <span className="text-primary">Skills</span>
        </motion.h2>

        {/* Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12"
          role="tablist"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              aria-pressed={activeCategory === c}
              className={`category-button capitalize px-5 py-2 rounded-full transition-all duration-300 ${
                activeCategory === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 hover:bg-secondary text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Skill Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((skill, idx) => (
            <SkillCard key={skill.name} skill={skill} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillCard = ({ skill, idx }) => {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const ref = useRef(null);

  const Icon =
    iconMap[skill.name.toLowerCase().replace(/[^a-z0-9]/g, "")] ?? SiReact;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible) {
      let start = 0;
      const duration = 1000;
      const startTime = performance.now();
      const animate = (now) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setPercent(Math.floor(skill.level * eased));
        if (t < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [visible, skill.level]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: idx * 0.05, duration: 0.6, ease: "easeOut" }}
      className="group relative bg-card backdrop-blur-md rounded-2xl border border-blue-500/20 hover:border-blue-400/50 
                 shadow-lg hover:shadow-blue-500/20 p-6 text-center transition-all duration-500 card-hover animate-float"
    >
      {/* Circular Progress */}
      <div className="relative mx-auto w-24 h-24 mb-4">
        <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="hsl(var(--border))"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${(percent / 100) * 283} 283`}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <Icon className="text-3xl text-primary" />
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-1">{skill.name}</h3>
      <p className="text-sm text-muted-foreground capitalize mb-3">
        {skill.category}
      </p>

      <span className="text-primary font-medium text-lg">{percent}%</span>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none rounded-2xl bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
    </motion.div>
  );
};

export default SkillsSection;
