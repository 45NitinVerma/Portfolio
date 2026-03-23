import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import {
	ArrowDown,
	Download,
	Eye,
	Monitor,
	Terminal,
	Loader2,
} from "lucide-react";
import TerminalMode from "./TerminalMode";
import HeroProfile from "./HeroProfile";

const containerVariants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.2, 0.85, 0.25, 1] },
	},
};

/* ─── Mode toggle pill ────────────────────────────────── */
const ModeToggle = ({ mode, setMode }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.8, duration: 0.5 }}
			className="flex items-center gap-1 p-1 rounded-full"
			style={{
				background: "hsl(var(--muted) / 0.6)",
				border: "1px solid hsl(var(--border) / 0.8)",
				backdropFilter: "blur(8px)",
			}}
		>
			{[
				{ id: "profile", Icon: Monitor, label: "Profile" },
				{ id: "terminal", Icon: Terminal, label: "Terminal" },
			].map(({ id, Icon, label }) => (
				<button
					key={id}
					onClick={() => setMode(id)}
					aria-pressed={mode === id}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300"
					style={{
						background:
							mode === id ? "hsl(var(--primary))" : "transparent",
						color:
							mode === id
								? "hsl(var(--primary-foreground))"
								: "hsl(var(--muted-foreground))",
						boxShadow:
							mode === id
								? "0 4px 12px hsl(var(--primary) / 0.35)"
								: "none",
					}}
				>
					<Icon size={12} />
					{label}
				</button>
			))}
		</motion.div>
	);
};

/* ─── 3D Floating Glass Panel view ───────────────────── */
const ProfileMode = ({ isDark }) => (
	<motion.div
		key="profile"
		initial={{ opacity: 0, scale: 0.95 }}
		animate={{ opacity: 1, scale: 1 }}
		exit={{ opacity: 0, scale: 0.95 }}
		transition={{ duration: 0.5, ease: [0.2, 0.85, 0.25, 1] }}
		className="w-full h-full"
	>
		<Suspense
			fallback={
				<div className="flex items-center justify-center h-full">
					<div className="flex flex-col items-center gap-3">
						<Loader2
							className="animate-spin"
							size={32}
							style={{ color: "hsl(var(--primary))" }}
						/>
						<span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
							Loading 3D scene…
						</span>
					</div>
				</div>
			}
		>
			<HeroProfile isDark={isDark} />
		</Suspense>
	</motion.div>
);

/* ─── HeroSection ────────────────────────────────────── */
const HeroSection = () => {
	const [scrollY, setScrollY] = useState(0);
	const [mode, setMode] = useState("profile");
	const [isDark, setIsDark] = useState(() =>
		document.documentElement.classList.contains("dark"),
	);

	// Track dark mode
	useEffect(() => {
		const obs = new MutationObserver(() => {
			setIsDark(document.documentElement.classList.contains("dark"));
		});
		obs.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => obs.disconnect();
	}, []);

	// Parallax
	useEffect(() => {
		const onScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Escape key to switch mode
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") setMode("profile");
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const scrollToProjects = (e) => {
		e.preventDefault();
		document
			.querySelector("#projects")
			?.scrollIntoView({ behavior: "smooth" });
	};
	const scrollToAbout = (e) => {
		e.preventDefault();
		document
			.querySelector("#about")
			?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section
			id="hero"
			className="relative min-h-screen flex flex-col overflow-hidden"
		>
			{/* ── Desktop layout: two-column ── */}
			<div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 px-4 pt-24 pb-16 container mx-auto max-w-7xl">
				{/* Left — text content */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="flex-1 text-center lg:text-left space-y-8 z-10 max-w-2xl"
				>
					{/* Greeting badge */}
					<motion.div
						variants={itemVariants}
						className="flex justify-center lg:justify-start"
					>
						<span
							className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
							style={{
								background: "hsl(var(--muted))",
								border: "1px solid hsl(var(--border) / 0.2)",
								color: "hsl(var(--foreground))",
								boxShadow:
									"0 4px 20px -5px hsl(var(--primary) / 0.1)",
							}}
						>
							<span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
							Available for opportunities
						</span>
					</motion.div>

					{/* Name */}
					<motion.div variants={itemVariants}>
						<h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter leading-[1.05] drop-shadow-sm">
							<span className="block text-foreground pb-2">
								Nitin Verma.
							</span>
							<span className="block text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gradient opacity-90">
								Full Stack Developer
							</span>
						</h1>
					</motion.div>

					{/* Typing animation */}
					<motion.div
						variants={itemVariants}
						className="text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground flex items-center justify-center lg:justify-start gap-2 flex-wrap"
					>
						<span>I build</span>
						<span
							className="text-foreground font-semibold min-w-full sm:min-w-[260px] inline-block text-center sm:text-left"
						>
							<TypeAnimation
								sequence={[
									"things that actually work.",
									2000,
									"clean and scalable web apps.",
									2000,
									"ideas into real products.",
									2000,
									"logic into meaningful solutions.",
									2000,
									"simple, smooth user experiences.",
									2000,
								]}
								wrapper="span"
								cursor={true}
								repeat={Infinity}
								style={{ display: "inline-block" }}
							/>
						</span>
					</motion.div>

					{/* Description */}
					<motion.p
						variants={itemVariants}
						className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
					>
						Full-stack developer who enjoys solving problems and
						building things from scratch. I spend my time working on
						web apps, practicing DSA, and learning how to write
						better, cleaner code every day. If it runs in a browser,
						I’m probably interested in improving it.
					</motion.p>

					{/* CTAs */}
					<motion.div
						variants={itemVariants}
						className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 w-full"
					>
						<a
							href="#projects"
							onClick={scrollToProjects}
							className="cosmic-button gap-2 text-sm px-8 py-3.5 shadow-lg w-full sm:w-auto justify-center"
						>
							<Eye size={16} />
							View My Work
						</a>
					</motion.div>

					{/* Stats */}
					<motion.div
						variants={itemVariants}
						className="flex items-center justify-center lg:justify-start gap-10 pt-6"
					>
						{[
							{ value: "1+", label: "Year Exp" },
							{ value: "4+", label: "Projects" },
							{ value: "10+", label: "Technologies" },
						].map(({ value, label }) => (
							<div
								key={label}
								className="text-center lg:text-left"
							>
								<div className="text-3xl md:text-4xl font-black text-foreground">
									{value}
								</div>
								<div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">
									{label}
								</div>
							</div>
						))}
					</motion.div>
				</motion.div>

				{/* Right — 3D scene / terminal (hidden on mobile) */}
				<div className="flex-1  lg:flex flex-col items-center gap-4 z-10">
					{/* Mode toggle */}
					<ModeToggle mode={mode} setMode={setMode} />

					{/* Content area */}
					<div
						style={{
							width: "100%",
							height: "550px",
							position: "relative",
						}}
					>
						<AnimatePresence mode="wait">
							{mode === "profile" ? (
								<ProfileMode key="profile" isDark={isDark} />
							) : (
								<motion.div
									key="terminal"
									initial={{ opacity: 0, y: 16, scale: 0.97 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: -10, scale: 0.97 }}
									transition={{
										duration: 0.4,
										ease: [0.2, 0.85, 0.25, 1],
									}}
									className="w-full h-full flex items-center justify-center"
								>
									<TerminalMode />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
