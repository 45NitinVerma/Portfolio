import React, { useState, useRef, useEffect, useCallback } from "react";
import {
	SiReact, SiJavascript, SiHtml5, SiTailwindcss,
	SiNodedotjs, SiExpress, SiMongodb, SiMysql,
	SiGithub, SiPython, SiTensorflow,
} from "react-icons/si";
import { DiVisualstudio, DiJava, DiCss3 } from "react-icons/di";
import { motion, AnimatePresence } from "framer-motion";

const skillData = [
	{ name: "React", Icon: SiReact, color: "#61DAFB", level: 80, category: "frontend" },
	{ name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", level: 85, category: "frontend" },
	{ name: "HTML5", Icon: SiHtml5, color: "#E34F26", level: 92, category: "frontend" },
	{ name: "CSS3", Icon: DiCss3, color: "#1572B6", level: 88, category: "frontend" },
	{ name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8", level: 82, category: "frontend" },

	{ name: "Node.js", Icon: SiNodedotjs, color: "#68A063", level: 85, category: "backend" },
	{ name: "Express", Icon: SiExpress, color: "#999999", level: 80, category: "backend" },
	{ name: "MongoDB", Icon: SiMongodb, color: "#47A248", level: 78, category: "backend" },
	{ name: "MySQL", Icon: SiMysql, color: "#4479A1", level: 72, category: "backend" },
	{ name: "Python", Icon: SiPython, color: "#3776AB", level: 78, category: "backend" },

	{ name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00", level: 65, category: "tools" },
	{ name: "Java", Icon: DiJava, color: "#ED8B00", level: 70, category: "tools" },
	{ name: "Git / GitHub", Icon: SiGithub, color: "#A0A0A0", level: 88, category: "tools" },
	{ name: "VS Code", Icon: DiVisualstudio, color: "#0078D7", level: 95, category: "tools" },
];

/* ─── Floating Skill Chip ────────────────────────────────── */
const SkillChip = ({ skill, index }) => {
	// Generate random subtle floating animation values
	const randomY = Math.random() * 10 - 5;
	const delay = index * 0.1;

	return (
		<motion.div
			animate={{ y: [0, randomY, 0] }}
			transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay }}
			className="group/chip relative flex items-center gap-2 px-4 py-2 rounded-full cursor-default border transition-all duration-300"
			style={{
				background: "hsl(var(--muted))",
				borderColor: "hsl(var(--border) / 0.4)",
			}}
            whileHover={{ scale: 1.04, y: -2, boxShadow: `0 8px 20px -5px ${skill.color}25`, borderColor: `${skill.color}60`, background: "hsl(var(--card))" }}
		>
			<skill.Icon size={18} color={skill.color} className="drop-shadow-sm transition-transform group-hover/chip:scale-110" />
			<span className="text-xs font-semibold tracking-wide text-foreground/80 group-hover/chip:text-foreground">
				{skill.name}
			</span>
			
			{/* Hover reveal popup */}
			<div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-foreground text-background text-[10px] font-bold opacity-0 group-hover/chip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
				{skill.level}% Proficiency
				<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
			</div>
		</motion.div>
	);
};

/* ─── Bento Card ────────────────────────────────────────── */
const BentoBox = ({ title, category, description, delay }) => {
	const skills = skillData.filter(s => s.category === category);
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const onMouseMove = useCallback((e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * 4, y: -x * 4 }); // Very subtle tilt
    }, []);

    const onMouseLeave = () => setTilt({ x: 0, y: 0 });

	return (
		<motion.div
            ref={cardRef}
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ delay, duration: 0.7, ease: [0.2, 0.85, 0.25, 1] }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
			className="relative overflow-hidden rounded-3xl p-6 md:p-8 border border-border/40 shadow-sm bg-card hover:shadow-xl hover:border-primary/20 transition-all duration-500 group"
			style={{ 
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.5s ease" : "none",
            }}
		>
			{/* Subtle noise/texture overlay could be added here via CSS classes */}
			<div className="relative z-10 flex flex-col h-full">
				<div className="mb-6">
					<h3 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
						{title}
					</h3>
					<p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
						{description}
					</p>
				</div>

				<div className="flex-1 flex flex-wrap content-start gap-2 md:gap-3">
					{skills.map((skill, index) => (
						<SkillChip key={skill.name} skill={skill} index={index} />
					))}
				</div>
			</div>
			
			{/* Abstract glow inside the card based on category color */}
			<div 
				className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
				style={{ 
					background: category === "frontend" ? "#38BDF8" : 
					            category === "backend" ? "#47A248" : "#FF6F00" 
				}}
			/>
		</motion.div>
	);
};

/* ─── Main Skills Section ────────────────────────────────── */
const SkillsSection = () => {
	return (
		<section id="skills" className="py-32 px-4 relative">
			<div className="container mx-auto max-w-6xl">
				{/* Editorial Heading */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center sm:text-left mb-16 max-w-2xl"
				>
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
						My Toolkit
					</p>
					<h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 pb-2">
						My <span className="text-gradient">Skills.</span>
					</h2>
					<p className="text-lg text-muted-foreground leading-relaxed font-light">
						A curated stack of tools and technologies I use to build scalable, 
						premium, and interactive digital experiences.
					</p>
				</motion.div>

				{/* Bento Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Frontend gets a wider card if needed, or equal columns. Let's make Frontend span 2 cols on tablet, and equal on desktop */}
					<div className="md:col-span-2 lg:col-span-1">
						<BentoBox 
							title="Frontend & UI" 
							category="frontend" 
							delay={0.1}
							description="Building pixel-perfect interfaces, complex state management, and smooth 60fps animations in the browser."
						/>
					</div>

					<div className="md:col-span-1 lg:col-span-1">
						<BentoBox 
							title="Backend & Data" 
							category="backend" 
							delay={0.2}
							description="Architecting secure APIs, efficient database schemas, and robust server-side logic."
						/>
					</div>

					<div className="md:col-span-1 lg:col-span-1">
						<BentoBox 
							title="Tools & AI" 
							category="tools" 
							delay={0.3}
							description="Leveraging modern tooling, version control, and deep learning libraries to optimize workflow."
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SkillsSection;
