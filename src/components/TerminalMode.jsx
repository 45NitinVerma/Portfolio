import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const BOOT_LINES = [
	{ text: "> Initializing portfolio...", delay: 300, color: "#9d9e9e" },
	{ text: "> Loading assets... done", delay: 700, color: "#9d9e9e" },
	{ text: "> user: Nitin Verma", delay: 1100, color: "#a4c9ff" },
	{ text: "> role: Full-Stack Developer", delay: 1500, color: "#a4c9ff" },
	{ text: "> stack: React · Node.js · Three.js · Python", delay: 1900, color: "#bcd6ff" },
	{ text: "> status: AVAILABLE FOR OPPORTUNITIES ✓", delay: 2400, color: "#a4c9ff" },
	{ text: "> projects: AI Resume Builder · Taskify · QuickChat", delay: 2900, color: "#e2e2e2" },
	{ text: "> Contact: 45nitinverma@gmail.com", delay: 3400, color: "#e2e2e2" },
	{ text: "> Type 'view --work' to see projects", delay: 3900, color: "#9d9e9e" },
	{ text: "> Type 'contact --me' to get in touch", delay: 4300, color: "#9d9e9e" },
];

const HEADER = "Portfolio OS v2.0.1 — Nitin Verma";
const SYSTEM_INFO = "Build: 2025.03 | Node v22 | React v19 | Three.js v0.183";

const TerminalMode = () => {
	const [visibleLines, setVisibleLines] = useState([]);
	const [showCursor, setShowCursor] = useState(true);
	const linesEndRef = useRef(null);
	const containerRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

	const mouseX = useMotionValue(0.5);
	const mouseY = useMotionValue(0.5);
	const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
	const smoothX = useSpring(mouseX, springConfig);
	const smoothY = useSpring(mouseY, springConfig);
	const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
	const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);
	const scale = useSpring(isHovered ? 1.02 : 1, springConfig);
    const zOffset = useSpring(isHovered ? 20 : 0, springConfig);

	const handleMouseMove = (e) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		mouseX.set(x);
		mouseY.set(y);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		mouseX.set(0.5);
		mouseY.set(0.5);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	useEffect(() => {
		const timers = BOOT_LINES.map(({ text, delay, color }, idx) =>
			setTimeout(() => {
				setVisibleLines((prev) => [...prev, { text, color, id: idx }]);
			}, delay)
		);
		return () => timers.forEach(clearTimeout);
	}, []);

	useEffect(() => {
		linesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
	}, [visibleLines]);

	// Blinking cursor
	useEffect(() => {
		const id = setInterval(() => setShowCursor((v) => !v), 530);
		return () => clearInterval(id);
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20, scale: 0.97 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: -10, scale: 0.97 }}
			transition={{ duration: 0.4, ease: [0.2, 0.85, 0.25, 1] }}
			className="w-full max-w-2xl mx-auto"
			style={{ perspective: "1000px" }}
		>
			{/* Terminal window */}
			<motion.div
				ref={containerRef}
				onMouseMove={handleMouseMove}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{
					rotateX,
					rotateY,
					scale,
					z: zOffset,
					background: "rgba(10, 12, 20, 0.92)",
					border: "1px solid rgba(164, 201, 255, 0.15)",
					borderRadius: "12px",
					overflow: "hidden",
					boxShadow:
						"0 0 0 1px rgba(164,201,255,0.05), 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(164,201,255,0.04)",
					backdropFilter: "blur(16px)",
					WebkitBackdropFilter: "blur(16px)",
				}}
			>
				{/* Title bar */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "8px",
						padding: "10px 16px",
						background: "rgba(255,255,255,0.04)",
						borderBottom: "1px solid rgba(255,255,255,0.06)",
					}}
				>
					{/* Traffic lights */}
					<div style={{ display: "flex", gap: "6px" }}>
						{["#ff5f57", "#febc2e", "#28c840"].map((c) => (
							<div
								key={c}
								style={{
									width: "10px",
									height: "10px",
									borderRadius: "50%",
									background: c,
								}}
							/>
						))}
					</div>
					<div style={{ flex: 1, textAlign: "center" }}>
						<span
							style={{
								fontFamily: "'Fira Code', monospace",
								fontSize: "11px",
								color: "rgba(255,255,255,0.35)",
								letterSpacing: "0.05em",
							}}
						>
							{HEADER}
						</span>
					</div>
				</div>

				{/* Terminal body */}
				<div
					style={{
						padding: "20px 24px 24px",
						fontFamily: "'Fira Code', monospace",
						fontSize: "clamp(12px, 1.5vw, 13.5px)",
						minHeight: "260px",
						maxHeight: "340px",
						overflowY: "auto",
					}}
				>
					{/* System info line */}
					<div
						style={{
							color: "rgba(160,174,192,0.5)",
							marginBottom: "16px",
							fontSize: "11px",
						}}
					>
						{SYSTEM_INFO}
					</div>

					{/* Boot lines */}
					{visibleLines.map(({ text, color, id }) => (
						<motion.div
							key={id}
							initial={{ opacity: 0, x: -8 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.3, ease: "easeOut" }}
							style={{
								color,
								marginBottom: "6px",
								lineHeight: 1.5,
								letterSpacing: "0.02em",
							}}
						>
							{text}
						</motion.div>
					))}

					{/* Active prompt */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "6px",
							marginTop: "12px",
							color: "#68d391",
						}}
					>
						<span style={{ color: "#bcd6ff" }}>nitin@portfolio</span>
						<span style={{ color: "rgba(255,255,255,0.3)" }}>:</span>
						<span style={{ color: "#e2e2e2" }}>~</span>
						<span style={{ color: "rgba(255,255,255,0.5)" }}>$</span>
						<span
							style={{
								marginLeft: "4px",
								opacity: showCursor ? 1 : 0,
								background: "#a4c9ff",
								display: "inline-block",
								width: "8px",
								height: "14px",
								verticalAlign: "middle",
								borderRadius: "1px",
							}}
						/>
					</div>

					<div ref={linesEndRef} />
				</div>

				{/* Footer hint */}
				<div
					style={{
						borderTop: "1px solid rgba(255,255,255,0.05)",
						padding: "8px 24px",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<span
						style={{
							fontFamily: "'Fira Code', monospace",
							fontSize: "10px",
							color: "rgba(160,174,192,0.4)",
						}}
					>
						ESC to switch mode
					</span>
					<div style={{ display: "flex", gap: "12px" }}>
						{[
							{ label: "GitHub", href: "https://github.com/45NitinVerma" },
							{ label: "LinkedIn", href: "https://linkedin.com/in/45nitinverma" },
						].map(({ label, href }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								style={{
									fontFamily: "'Fira Code', monospace",
									fontSize: "10px",
									color: "#a4c9ff",
									textDecoration: "none",
								}}
							>
								{`[${label}]`}
							</a>
						))}
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
};

export default TerminalMode;
