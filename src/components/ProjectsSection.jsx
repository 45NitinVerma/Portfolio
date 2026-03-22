import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

const projects = [
	{
		id: 1,
		title: "AI Resume Builder",
		subtitle: "Smart, cloud-powered resume creation",
		description:
			"A modern full-stack web application that lets users create, edit, and manage professional resumes with real-time updates, AI-powered text parsing, and cloud-based image storage via ImageKit. Features secure JWT authentication and BCrypt password hashing.",
		image: "/projects/ResumeBuilder.png",
		tags: ["React", "Node.js", "MongoDB", "ImageKit"],
		tagColor: "hsl(215 95% 60%)",
		demoUrl: "https://resume-builder-coral-mu.vercel.app/",
		githubUrl: "https://github.com/45NitinVerma/ResumeBuilder",
		gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
		featured: true,
	},
	{
		id: 2,
		title: "Taskify",
		subtitle: "Productive task management app",
		description:
			"A clean and efficient task management application to organize todos with categories, priorities, and deadlines. Built with the MERN stack featuring secure user authentication, persistent state, and an intuitive drag-and-drop interface.",
		image: "/projects/Taskify.png",
		tags: ["React", "Node.js", "MongoDB", "Tailwind"],
		tagColor: "hsl(270 70% 65%)",
		demoUrl: "https://taskify-eight-livid.vercel.app/",
		githubUrl: "https://github.com/45NitinVerma/Taskify",
		gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
	},
	{
		id: 3,
		title: "QuickChat",
		subtitle: "Real-time messaging platform",
		description:
			"A feature-rich real-time chat application where users can connect and chat instantly. Built with Socket.io for live messaging, Cloudinary for media uploads, and JWT for secure authentication. Supports multiple rooms and user presence indicators.",
		image: "/projects/QuickChat.png",
		tags: ["React", "Node.js", "Socket.io", "Cloudinary"],
		tagColor: "hsl(185 85% 50%)",
		demoUrl: "https://quick-chat-jet.vercel.app/",
		githubUrl: "https://github.com/45NitinVerma/QuickChat",
		gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
	},
	{
		id: 4,
		title: "Face Mask Detection",
		subtitle: "Real-time ML vision model",
		description:
			"A computer vision application that detects whether individuals are wearing face masks in real-time using a webcam feed. Built with Python, OpenCV for video capture, and a TensorFlow/Keras deep learning model for classification.",
		image: "/projects/RTMD.png",
		tags: ["Python", "TensorFlow", "OpenCV"],
		tagColor: "hsl(40 95% 60%)",
		demoUrl: "#",
		githubUrl: "https://github.com/45NitinVerma",
		gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
	},
];

const ProjectModal = ({ project, onClose }) => {
	if (!project) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-background/60"
			onClick={onClose}
		>
			<motion.div
				initial={{ scale: 0.95, opacity: 0, y: 20 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.95, opacity: 0, y: 20 }}
				transition={{ duration: 0.4, ease: [0.2, 0.85, 0.25, 1] }}
				className="relative w-full max-w-5xl bg-background border border-border/40 rounded-3xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] overflow-y-auto"
				onClick={(e) => e.stopPropagation()}
				onMouseLeave={onClose}
			>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 p-2.5 bg-card/80 hover:bg-card text-foreground rounded-full backdrop-blur-xl transition-all z-10 border border-border/40 shadow-sm hover:shadow-md"
					aria-label="Close modal"
				>
					<X size={18} strokeWidth={2.5} />
				</button>

				{/* Left side: Image and Links */}
				<div className="md:w-1/2 p-6 md:p-10 flex flex-col gap-8 bg-muted/20 border-r border-border/40">
					<div className="relative md:aspect-auto md:flex-1 rounded-xl overflow-hidden shadow-sm border border-border/50 bg-muted/30 min-h-[250px] flex items-center justify-center p-4">
						<img
							src={project.image}
							alt={project.title}
							className="absolute inset-0 w-full h-full object-contain p-4 md:p-6"
						/>
					</div>

					{/* Links below image */}
					<div className="flex flex-col sm:flex-row gap-3 mt-auto">
						{project.demoUrl !== "#" && (
							<a
								href={project.demoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-2 px-5 py-3 flex-1 justify-center bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-md"
							>
								Live Demo
								<ExternalLink size={16} strokeWidth={2.5} />
							</a>
						)}
						<a
							href={project.githubUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 px-5 py-3 flex-1 justify-center bg-secondary text-secondary-foreground rounded-xl text-sm font-bold hover:bg-secondary/80 hover:scale-[1.02] transition-all border border-border/50"
						>
							<Github size={16} strokeWidth={2.5} />
							Source Code
						</a>
					</div>
				</div>

				{/* Right side: Details */}
				<div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
					<h3 className="text-3xl md:text-5xl font-black mb-3 tracking-tighter text-foreground">
						{project.title}
					</h3>
					<p className="text-xl text-muted-foreground font-medium mb-8">
						{project.subtitle}
					</p>

					<div className="space-y-8">
						<div>
							<h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
								Overview
							</h4>
							<p className="text-foreground/80 leading-relaxed text-base md:text-lg font-medium">
								{project.description}
							</p>
						</div>

						<div>
							<h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
								Technologies & Tools
							</h4>
							<div className="flex flex-wrap gap-2">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="px-4 py-1.5 bg-secondary/50 border border-border/50 rounded-lg text-sm font-bold text-foreground transition-all hover:bg-secondary"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

const ProjectCard = ({ project, onHover, onClick }) => {
	const hoverTimeout = useRef(null);

	const handleMouseEnter = () => {
		hoverTimeout.current = setTimeout(() => {
			onHover(project);
		}, 300); // 300ms delay to open preview smoothly
	};

	const handleMouseLeave = () => {
		if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.5, ease: [0.2, 0.85, 0.25, 1] }}
			className={`group relative flex flex-col rounded-3xl border border-border/40 bg-card shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500 cursor-pointer ${
				project.featured ? "md:col-span-2" : "col-span-1"
			}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={() => onClick(project)}
		>
			<div className="p-4 md:p-5 pb-0">
				<div className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted/30 aspect-video flex items-center justify-center">
					<img
						src={project.image}
						alt={project.title}
						className="w-full h-full object-contain p-2 transition-transform duration-1000 group-hover:scale-105"
						loading="lazy"
					/>
					<div className="absolute inset-0 bg-background/5 transition-opacity duration-500 group-hover:opacity-0" />
				</div>
			</div>
			<div className="p-6 md:p-8 flex flex-col flex-1 justify-center">
				<h3 className="text-2xl md:text-3xl font-black tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors">
					{project.title}
				</h3>
				<p className="text-base text-muted-foreground font-medium line-clamp-2">
					{project.subtitle}
				</p>
			</div>
		</motion.div>
	);
};

/* ─── Main Projects Section ────────────────────────────────── */
const ProjectsSection = () => {
	const [activeProject, setActiveProject] = useState(null);
	const [activeFilter, setActiveFilter] = useState("All");

	const popularTags = useMemo(() => {
		const baseTags = ["React", "Node.js", "MongoDB", "Python"];
		return ["All", ...baseTags];
	}, []);

	const filteredProjects = projects.filter(
		(p) => activeFilter === "All" || p.tags.includes(activeFilter),
	);

	return (
		<section id="projects" className="py-32 px-4 relative overflow-hidden">
			<div className="container mx-auto max-w-6xl">
				{/* Editorial Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="max-w-2xl"
					>
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
							Portfolio
						</p>
						<h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 pb-2 text-foreground">
							Featured <span className="text-muted-foreground font-light">Work.</span>
						</h2>
						<p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
							A curated selection of real-world applications showcasing
							performance, precision, and modern design.
						</p>
					</motion.div>

					{/* Filters */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="flex flex-wrap gap-2"
					>
						{popularTags.map((tag) => (
							<button
								key={tag}
								onClick={() => setActiveFilter(tag)}
								className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
									activeFilter === tag
										? "bg-foreground text-background shadow-lg scale-105"
										: "bg-secondary text-secondary-foreground hover:bg-foreground/10"
								}`}
							>
								{tag}
							</button>
						))}
					</motion.div>
				</div>

				{/* Grid Layout */}
				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					<AnimatePresence mode="popLayout">
						{filteredProjects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								onHover={setActiveProject}
								onClick={setActiveProject}
							/>
						))}
					</AnimatePresence>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4 }}
					className="text-center mt-20"
				>
					<a
						href="https://github.com/45NitinVerma"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-bold text-sm hover:bg-secondary/80 hover:scale-105 transition-all shadow-sm group"
					>
						<Github
							size={20}
							className="transition-transform group-hover:-rotate-12"
						/>
						Explore more on GitHub
					</a>
				</motion.div>
			</div>

			<AnimatePresence>
				{activeProject && (
					<ProjectModal
						project={activeProject}
						onClose={() => setActiveProject(null)}
					/>
				)}
			</AnimatePresence>
		</section>
	);
};

export default ProjectsSection;
