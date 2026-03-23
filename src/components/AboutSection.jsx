import React from "react";
import { motion } from "framer-motion";
import { Code, Brain, Palette, Briefcase, Download, Mail } from "lucide-react";
import {
	SiReact, SiNodedotjs, SiMongodb, SiPython, SiJavascript,
} from "react-icons/si";
import { SiThreedotjs } from "react-icons/si";
import ResumeButton from "./ResumeButton";

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.85, 0.25, 1] } },
};

const cards = [
	{
		icon: Code,
		title: "Full-Stack Development",
		desc: "MERN stack end-to-end — pixel-perfect UIs, solid APIs, and everything in between.",
		color: "hsl(var(--primary))",
	},
	{
		icon: Brain,
		title: "Machine Learning",
		desc: "Python, TensorFlow & OpenCV — I build models that actually work in the real world.",
		color: "hsl(var(--primary))",
	},
	{
		icon: Palette,
		title: "UI/UX Design",
		desc: "Interfaces that feel obvious to use and genuinely nice to look at.",
		color: "hsl(var(--primary))",
	},
	{
		icon: Briefcase,
		title: "Project Ownership",
		desc: "From first commit to production — I see things through, start to finish.",
		color: "hsl(var(--primary))",
	},
];

/* ─── Orbiting tech icons around avatar ─────────────── */
const orbitingIcons = [
	{ Icon: SiReact,      color: "#61DAFB", label: "React",      angle: 0   },
	{ Icon: SiNodedotjs,  color: "#68A063", label: "Node.js",    angle: 72  },
	{ Icon: SiMongodb,    color: "#47A248", label: "MongoDB",    angle: 144 },
	{ Icon: SiPython,     color: "#3776AB", label: "Python",     angle: 216 },
	{ Icon: SiJavascript, color: "#F7DF1E", label: "JavaScript", angle: 288 },
];

const ORBIT_RADIUS = 80; // px

const AvatarWithOrbit = () => (
	<div
		style={{
			position: "relative",
			width: `${ORBIT_RADIUS * 2 + 56}px`,
			height: `${ORBIT_RADIUS * 2 + 56}px`,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			margin: "0 auto",
		}}
	>
		{/* Orbit ring */}
		<div
			style={{
				position: "absolute",
				inset: 0,
				borderRadius: "50%",
				border: "1px dashed hsl(var(--primary) / 0.2)",
				animation: "spin-slow 24s linear infinite",
			}}
		/>

		{/* Avatar circle */}
		<motion.div
			initial={{ opacity: 0, scale: 0.5 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true }}
			transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
			style={{
				width: "96px",
				height: "96px",
				borderRadius: "50%",
				background: "hsl(var(--card))",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				fontSize: "2.25rem",
				fontWeight: 800,
				color: "hsl(var(--foreground))",
				letterSpacing: "-0.04em",
				border: "1px solid hsl(var(--border) / 0.15)",
				boxShadow:
					"0 0 0 8px hsl(var(--background)), 0 10px 40px -10px hsl(var(--primary) / 0.2)",
				position: "relative",
				zIndex: 2,
				flexShrink: 0,
			}}
		>
			NV
		</motion.div>

		{/* Orbiting icons */}
		{orbitingIcons.map(({ Icon, color, label, angle }, idx) => {
			// Convert angle to radians
			const rad = (angle * Math.PI) / 180;
			const x = Math.cos(rad) * ORBIT_RADIUS;
			const y = Math.sin(rad) * ORBIT_RADIUS;

			return (
				<motion.div
					key={label}
					initial={{ opacity: 0, scale: 0 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 200 }}
					title={label}
					style={{
						position: "absolute",
						left: `calc(50% + ${x}px - 18px)`,
						top: `calc(50% + ${y}px - 18px)`,
						width: "36px",
						height: "36px",
						borderRadius: "10px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: `${color}15`,
						border: `1px solid ${color}35`,
						boxShadow: `0 4px 12px ${color}20`,
						animation: `float ${4 + idx * 0.7}s ease-in-out ${idx * 0.4}s infinite`,
					}}
				>
					<Icon size={18} color={color} />
				</motion.div>
			);
		})}
	</div>
);

const AboutSection = () => {
	return (
		<section id="about" className="py-28 px-4 relative">
			<div className="container mx-auto max-w-6xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-24"
				>
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
						Who I Am
					</p>
					<h2 className="text-5xl md:text-6xl font-black tracking-tighter">
						About <span className="text-gradient">Me.</span>
					</h2>
				</motion.div>

				{/* Three-column layout: story | avatar orbit | cards */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
					{/* Story — Left */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="space-y-6 text-left lg:col-span-1"
					>
						<motion.h3 variants={itemVariants} className="text-sm md:text-2xl font-extrabold tracking-tight leading-snug">
							<span className="text-gradient">Solving problems. Building products.</span>
						</motion.h3>

						<motion.p
							variants={itemVariants}
							className="text-muted-foreground leading-relaxed text-base font-light"
						>
							I didn’t start coding with a big goal - I was just curious how things worked behind the scenes.
						</motion.p>

						<motion.p
							variants={itemVariants}
							className="text-muted-foreground leading-relaxed text-base font-light"
						>
							That curiosity stuck. Now I spend my time building web apps, solving DSA problems, and improving every day. I like working on both logic and real products—whether it's a backend API or a smooth frontend experience.
							<br />
							<br />
							Still learning, still building.
						</motion.p>

						{/* Tech tags */}
						<motion.div variants={itemVariants} className="flex flex-wrap gap-1">
							{["React", "Node.js", "MongoDB", "Python", "TensorFlow", "Express", "JWT", "Socket.io"].map(
								(tech) => (
									<span key={tech} className="tag-pill">
										{tech}
									</span>
								)
							)}
						</motion.div>

						{/* CTAs */}
						<motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-2">
							<a href="#contact" className="cosmic-button gap-2 text-sm justify-center">
								<Mail size={15} />
								Get In Touch
							</a>
							<ResumeButton className="w-full sm:w-auto h-[48px]" />
						</motion.div>
					</motion.div>

					{/* Center — Avatar with orbiting icons */}
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, ease: [0.2, 0.85, 0.25, 1] }}
						className="flex flex-col items-center gap-6 lg:col-span-1"
					>
						<AvatarWithOrbit />

						{/* Journey tagline */}
						<div className="text-center">
							<p className="text-sm font-semibold text-foreground mb-1">
								My journey from{" "}
								<span className="text-gradient">Curiosity</span> to{" "}
								<span className="text-gradient">Creator</span>
							</p>
							<p className="text-xs text-muted-foreground">
								CS student → Full-Stack Dev → ML Explorer
							</p>
						</div>
					</motion.div>

					{/* Cards — Right */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:col-span-1"
					>
						{cards.map(({ icon: Icon, title, desc, color }) => (
							<motion.div
								key={title}
								variants={itemVariants}
								whileHover={{ y: -4, scale: 1.02 }}
								className="bg-card rounded-2xl p-6 philosophy-card cursor-none border border-border/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
								style={{ "--card-accent": color }}
							>
								<div
									className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
									style={{ background: `hsl(var(--muted))`, border: `1px solid hsl(var(--border) / 0.5)` }}
								>
									<Icon size={20} className="text-foreground" />
								</div>
								<h4 className="font-bold text-base mb-2 tracking-tight text-foreground">{title}</h4>
								<p className="text-muted-foreground text-sm leading-relaxed font-light">{desc}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
