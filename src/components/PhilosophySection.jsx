import React from "react";
import { motion } from "framer-motion";
import {
	Lightbulb, Heart, Zap, RefreshCw, BookOpen, Gauge,
} from "lucide-react";

const principles = [
	{
		icon: Lightbulb,
		title: "Think First, Code Second",
		description:
			"Architecture and planning before a single line of code. Understanding the problem deeply makes the solution elegant.",
		color: "hsl(40 95% 60%)",
	},
	{
		icon: Heart,
		title: "Clean Code is Kind Code",
		description:
			"Code is read more often than written. I write for the next developer — including future me — with clarity and intent.",
		color: "hsl(0 80% 65%)",
	},
	{
		icon: Gauge,
		title: "Performance Matters",
		description:
			"Every millisecond counts. Building fast, optimized experiences that feel snappy and responsive is non-negotiable.",
		color: "hsl(215 95% 60%)",
	},
	{
		icon: Heart,
		title: "Design with Empathy",
		description:
			"The best UIs are invisible — they get out of the way and let users accomplish their goals effortlessly.",
		color: "hsl(320 70% 65%)",
	},
	{
		icon: RefreshCw,
		title: "Ship, Learn, Iterate",
		description:
			"Perfect is the enemy of good. I ship early, gather feedback, measure results, and continuously improve.",
		color: "hsl(185 85% 50%)",
	},
	{
		icon: BookOpen,
		title: "Never Stop Learning",
		description:
			"Technology evolves fast. Staying curious, reading docs, experimenting and exploring new ideas keeps me sharp.",
		color: "hsl(270 70% 65%)",
	},
];

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.95 },
	visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.2, 0.85, 0.25, 1] } },
};

const PhilosophySection = () => {
	return (
		<section id="philosophy" className="py-28 px-4 relative">
			<div className="container mx-auto max-w-6xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
						How I Think
					</p>
					<h2 className="section-heading">
						My Development <span className="text-gradient">Philosophy</span>
					</h2>
					<p className="section-subtext mt-4">
						Beyond syntax and frameworks — the mindset and principles that guide
						how I approach every project and problem.
					</p>
				</motion.div>

				{/* Cards grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-60px" }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{principles.map(({ icon: Icon, title, description, color }) => (
						<motion.div
							key={title}
							variants={cardVariants}
							whileHover={{ y: -8, scale: 1.02 }}
							className="glass rounded-2xl p-7 philosophy-card text-left group"
						>
							{/* Icon */}
							<div
								className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
								style={{
									background: `${color}15`,
									border: `1px solid ${color}30`,
									boxShadow: `0 4px 20px ${color}20`,
								}}
							>
								<Icon size={22} color={color} />
							</div>

							<h3 className="font-bold text-base mb-2">{title}</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{description}
							</p>

							{/* Bottom accent line */}
							<div
								className="mt-5 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full"
								style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
							/>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default PhilosophySection;
