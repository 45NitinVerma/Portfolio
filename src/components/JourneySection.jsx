import React from "react";
import { motion } from "framer-motion";
import {
	GraduationCap, Code2, Layers, Brain, Rocket, Star,
} from "lucide-react";

const milestones = [
	{
		year: "2022",
		icon: GraduationCap,
		title: "The Beginning",
		description: "Started my CS degree and wrote my first \"Hello, World!\" in C++. That tiny moment of the screen doing what I told it lit up something I never turned off.",
		color: "hsl(var(--primary))",
		side: "left",
	},
	{
		year: "2023",
		icon: Code2,
		title: "Discovering Web Dev",
		description: "Fell hard for web development. Learned HTML, CSS, and JavaScript, then found React — and never really looked back.",
		color: "hsl(var(--primary))",
		side: "right",
	},
	{
		year: "2023",
		icon: Layers,
		title: "Going Full-Stack",
		description: "Dived into the MERN stack and shipped Taskify and QuickChat — real apps with auth, real-time messaging, and cloud storage.",
		color: "hsl(var(--primary))",
		side: "left",
	},
	{
		year: "2024",
		icon: Brain,
		title: "Exploring AI & ML",
		description: "Ventured into ML with Python and TensorFlow, building a real-time face-mask detector — my first taste of code that actually thinks.",
		color: "hsl(var(--primary))",
		side: "right",
	},
	{
		year: "2024",
		icon: Rocket,
		title: "AI Resume Builder",
		description: "Built my most ambitious project yet — an AI-powered resume builder with cloud storage, smart text parsing, and a production-ready UI.",
		color: "hsl(var(--primary))",
		side: "left",
	},
	{
		year: "2025",
		icon: Star,
		title: "Ready for the World",
		description: "Looking for my first professional role, excited to keep learning, keep shipping, and keep making things that matter. Story very much ongoing.",
		color: "hsl(var(--primary))",
		side: "right",
	},
];

const JourneySection = () => {
	return (
		<section id="journey" className="py-28 px-4 relative overflow-hidden">
			<div className="container mx-auto max-w-5xl">
				{/* Heading */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-24"
				>
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
						My Story
					</p>
					<h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 pb-2 text-foreground">
						The <span className="text-gradient">Journey.</span>
					</h2>
					<p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
						Here's how I got here — one project, one lesson, one late night at a time.
					</p>
				</motion.div>

				{/* Timeline */}
				<div className="relative">
					{/* Vertical line */}
					<div className="timeline-line hidden md:block" />

					{/* Mobile line */}
					<div className="absolute left-5 top-0 bottom-0 w-0.5 md:hidden bg-gradient-to-b from-transparent via-primary/60 to-transparent" />

					<div className="space-y-12 md:space-y-0">
						{milestones.map(({ year, icon: Icon, title, description, color, side }, idx) => (
							<motion.div
								key={idx}
								initial={{ opacity: 0, x: side === "left" ? -40 : 40, y: 10 }}
								whileInView={{ opacity: 1, x: 0, y: 0 }}
								viewport={{ once: true, margin: "-80px" }}
								transition={{
									duration: 0.7,
									delay: idx * 0.1,
									ease: [0.2, 0.85, 0.25, 1],
								}}
								className={`relative flex items-center gap-8 md:gap-0 ${
									side === "left"
										? "md:flex-row"
										: "md:flex-row-reverse"
								} mb-12`}
							>
								{/* Content card */}
								<div
									className={`flex-1 ${
										side === "left"
											? "md:pr-16 md:text-right"
											: "md:pl-16 md:text-left"
									} pl-14 md:pl-0`}
								>
									<motion.div
										whileHover={{ scale: 1.02 }}
										className="bg-card border border-border/40 shadow-sm hover:shadow-xl hover:border-primary/20 rounded-2xl p-6 md:p-8 text-left transition-all duration-300 mb-6"
									>
										{/* Year badge */}
										<span
											className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3"
											style={{
												background: `${color}15`,
												color: color,
												border: `1px solid ${color}30`,
											}}
										>
											{year}
										</span>
										<h3 className="text-xl font-bold mb-2 text-foreground tracking-tight">{title}</h3>
										<p className="text-muted-foreground text-sm md:text-base font-light leading-relaxed">
											{description}
										</p>
									</motion.div>
								</div>

								{/* Center dot — desktop */}
								<div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-10">
									<motion.div
										initial={{ scale: 0 }}
										whileInView={{ scale: 1 }}
										viewport={{ once: true }}
										transition={{ delay: idx * 0.1 + 0.3, type: "spring", stiffness: 300 }}
										className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
										style={{
											background: `${color}18`,
											border: `2px solid ${color}50`,
											boxShadow: `0 0 20px ${color}30`,
										}}
									>
										<Icon size={20} color={color} />
									</motion.div>
								</div>

								{/* Mobile dot */}
								<div
									className="absolute left-0 top-6 w-10 h-10 rounded-xl flex items-center justify-center md:hidden flex-shrink-0"
									style={{
										background: `${color}15`,
										border: `2px solid ${color}40`,
									}}
								>
									<Icon size={16} color={color} />
								</div>

								{/* Empty spacer for opposite side */}
								<div className="flex-1 hidden md:block" />
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default JourneySection;
