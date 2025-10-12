import React, { useState, useRef, useEffect } from "react";
import reactLogo from "../assets/icons/react.svg";
import jsLogo from "../assets/icons/javascript.svg";
import htmlLogo from "../assets/icons/htmlcss.svg";
import tailwindLogo from "../assets/icons/tailwindcss.svg";
import nodeLogo from "../assets/icons/nodejs.svg";
import expressLogo from "../assets/icons/express.svg";
import mongoLogo from "../assets/icons/mongodb.svg";
import mysqlLogo from "../assets/icons/mysql.svg";
import ghLogo from "../assets/icons/github.svg";
import vscodeLogo from "../assets/icons/vscode.svg";
// cn removed; using plain className strings and template literals

const skills = [
	// Frontend
	{ name: "HTML/CSS", level: 90, category: "frontend" },
	{ name: "JavaScript", level: 80, category: "frontend" },
	{ name: "React", level: 80, category: "frontend" },
	{ name: "Tailwind CSS", level: 80, category: "frontend" },

	// Backend
	{ name: "Node.js", level: 90, category: "backend" },
	{ name: "Express", level: 85, category: "backend" },
	{ name: "MongoDB", level: 80, category: "backend" },
	{ name: "MySQL", level: 75, category: "backend" },

	// Tools
	{ name: "Git/GitHub", level: 90, category: "tools" },
	{ name: "VS Code", level: 95, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

const SkillsSection = () => {
	const [activeCategory, setActiveCategory] = useState("all");

	const filteredSkills = skills.filter(
		(skill) => activeCategory === "all" || skill.category === activeCategory
	);

	// keyboard navigation for category buttons (Left/Right/Home/End)
	const categoriesRef = useRef(null);

	const handleCategoryKeyDown = (e) => {
		const currentIndex = categories.indexOf(activeCategory);
		let nextIndex = -1;

		if (e.key === "ArrowRight")
			nextIndex = Math.min(categories.length - 1, currentIndex + 1);
		else if (e.key === "ArrowLeft")
			nextIndex = Math.max(0, currentIndex - 1);
		else if (e.key === "Home") nextIndex = 0;
		else if (e.key === "End") nextIndex = categories.length - 1;

		if (nextIndex >= 0) {
			e.preventDefault();
			setActiveCategory(categories[nextIndex]);
			// move focus to the new button
			const buttons = categoriesRef.current?.querySelectorAll("button");
			if (buttons && buttons[nextIndex]) buttons[nextIndex].focus();
		}
	};

	// Skill card component: handles count-up and progress fill when visible
	function SkillCard({ skill, idx }) {
		const [display, setDisplay] = useState(0);
		const [fill, setFill] = useState(false);
		const nodeRef = useRef(null);
		const startedRef = useRef(false);

		useEffect(() => {
			const node = nodeRef.current;
			if (!node) return;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !startedRef.current) {
							startedRef.current = true;
							setFill(true);

							const duration = 900; // ms
							const start = performance.now();
							const from = 0;
							const to = skill.level;

							function step(now) {
								const elapsed = now - start;
								const t = Math.min(1, elapsed / duration);
								const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
								setDisplay(
									Math.round(from + (to - from) * eased)
								);
								if (t < 1) requestAnimationFrame(step);
							}

							requestAnimationFrame(step);
						}
					});
				},
				{ threshold: 0.25 }
			);

			observer.observe(node);
			return () => observer.disconnect();
		}, [skill.level]);

		const initials = skill.name
			.split(/[^A-Za-z0-9]+/)
			.map((s) => s[0])
			.slice(0, 2)
			.join("")
			.toUpperCase();

		// icon mapping (inline SVGs for small footprint). Normalizes name for matching.
		const normalize = (n) => n.toLowerCase().replace(/[^a-z0-9]/g, "");
		const iconKey = normalize(skill.name);

		const Icon = () => {
			switch (iconKey) {
				case "react":
					return (
						<img src={reactLogo} alt="React" aria-hidden="true" />
					);
				case "javascript":
					return (
						<img src={jsLogo} alt="JavaScript" aria-hidden="true" />
					);
				case "htmlcss":
					return (
						<img
							src={htmlLogo}
							alt="HTML & CSS"
							aria-hidden="true"
						/>
					);
				case "tailwindcss":
					return (
						<img
							src={tailwindLogo}
							alt="Tailwind CSS"
							aria-hidden="true"
						/>
					);
				case "nodejs":
					return (
						<img src={nodeLogo} alt="Node.js" aria-hidden="true" />
					);
				case "express":
					return (
						<img
							src={expressLogo}
							alt="Express"
							aria-hidden="true"
						/>
					);
				case "mongodb":
					return (
						<img src={mongoLogo} alt="MongoDB" aria-hidden="true" />
					);
				case "mysql":
					return (
						<img src={mysqlLogo} alt="MySQL" aria-hidden="true" />
					);
				case "gitgithub":
					return <img src={ghLogo} alt="GitHub" aria-hidden="true" />;
				case "vscode":
					return (
						<img
							src={vscodeLogo}
							alt="VS Code"
							aria-hidden="true"
						/>
					);
				default:
					return null;
			}
		};

		return (
			<article
				ref={nodeRef}
				role="listitem"
				key={skill.name + idx}
				className="bg-card p-5 rounded-lg shadow-xl card-hover flex flex-col justify-between gap-4"
				style={{
					opacity: 0,
					animation: "fade-in 0.6s ease-out forwards",
					animationDelay: `${idx * 80}ms`,
				}}
			>
				<div className="flex items-center gap-4">
					<div className="skill-initial flex-none">
						{Icon() || (
							<span className="text-sm font-medium">
								{initials}
							</span>
						)}
					</div>

					<div className="min-w-0">
						<h3 className="font-semibold text-lg truncate">
							{skill.name}
						</h3>
						<div className="mt-1">
							<span className="skill-badge text-xs">
								{skill.category}
							</span>
						</div>
					</div>
				</div>

				<div>
					<div
						className="w-full bg-secondary/20 h-3 rounded-full overflow-hidden skill-progress-outer"
						role="progressbar"
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={skill.level}
						aria-label={`${skill.name} proficiency`}
					>
						<div
							className="skill-progress h-3 rounded-full"
							style={{ width: fill ? skill.level + "%" : "0%" }}
						/>
					</div>

					<div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
						<span className="text-xs">Proficiency</span>
						<span className="font-medium">{display}%</span>
					</div>
				</div>
			</article>
		);
	}

	return (
		<section id="skills" className="py-24 px-4 relative bg-secondary/30">
			<div className="container mx-auto max-w-5xl">
				<h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
					My <span className="text-primary"> Skills</span>
				</h2>

				<div
					ref={categoriesRef}
					onKeyDown={handleCategoryKeyDown}
					role="tablist"
					aria-label="Skill categories"
					className="flex flex-wrap justify-center gap-4 mb-12"
				>
					{categories.map((category, key) => {
						const active = activeCategory === category;
						const btnClass = `category-button py-2 px-5 rounded-full transition-colors duration-300 capitalize ${
							active
								? "bg-primary text-primary-foreground"
								: "bg-secondary/70 text-foreground hover:bg-secondary"
						}`;
						return (
							<button
								key={key}
								onClick={() => setActiveCategory(category)}
								aria-pressed={active}
								className={btnClass}
							>
								{category}
							</button>
						);
					})}
				</div>

				<div
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
					role="list"
				>
					{filteredSkills.map((skill, idx) => (
						<SkillCard
							key={skill.name + idx}
							skill={skill}
							idx={idx}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default SkillsSection;
