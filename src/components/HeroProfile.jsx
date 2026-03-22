import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { MapPin, Code2, Sparkles, Github, Linkedin, Twitter } from "lucide-react";
import profileImg from "../assets/icons/profile.png";

const HeroProfile = ({ isDark }) => {
	const containerRef = useRef(null);
	const [isHovered, setIsHovered] = useState(false);

	// Mouse tracking coordinates
	const mouseX = useMotionValue(0.5);
	const mouseY = useMotionValue(0.5);

	// Spring physics for smooth movement
	const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
	const smoothX = useSpring(mouseX, springConfig);
	const smoothY = useSpring(mouseY, springConfig);

	// Map mouse values to rotations (-15 to +15 degrees)
	const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
	const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);

	// Subtle scale and depth shifts based on hover state
	const scale = useSpring(isHovered ? 1.05 : 1, springConfig);
    const zOffset = useSpring(isHovered ? 30 : 0, springConfig);

	const handleMouseMove = (e) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		// Normalize mouse coordinates to 0..1 bounding box
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		mouseX.set(x);
		mouseY.set(y);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
		// Return to center
		mouseX.set(0.5);
		mouseY.set(0.5);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	// Accent color context based on theme
	const glowColor = isDark ? "rgba(164, 201, 255, 0.12)" : "rgba(0, 0, 0, 0.1)";
	const ringColor = isDark ? "rgba(164, 201, 255, 0.08)" : "rgba(0, 0, 0, 0.03)";

	return (
		<div
			className="relative w-full h-full flex flex-col items-center justify-center p-4 lg:p-8"
			style={{ perspective: "1000px" }}
		>
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
				}}
				className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 p-6 md:p-8 rounded-[2rem] bg-card/60 border border-border/40 shadow-2xl backdrop-blur-xl cursor-default w-full max-w-[500px] md:max-w-none md:w-auto"
			>
				{/* Avatar Container */}
				<div 
					className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0"
					style={{ transform: "translateZ(30px)" }}
				>
					{/* Soft Outer Glow / Ring */}
					<motion.div
						className="absolute inset-0 rounded-full"
						style={{
							background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`,
							border: `1px solid ${ringColor}`,
							transform: "translateZ(-20px) scale(1.1)",
							filter: "blur(8px)",
						}}
					/>

					{/* Floating inner rings for depth */}
					<div 
						className="absolute inset-2 rounded-full border border-white/10 dark:border-white/5 opacity-50 pointer-events-none" 
						style={{ transform: "translateZ(10px)" }}
					/>

					{/* Main Circular Profile Photo Container */}
					<div
						className="relative w-full h-full rounded-full overflow-hidden p-[3px]"
						style={{
							background: isDark
								? "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(0,0,0,0.4))"
								: "linear-gradient(145deg, rgba(0,0,0,0.05), rgba(255,255,255,0.8))",
							boxShadow: isDark
								? "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)"
								: "0 25px 50px -12px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)",
							transform: "translateZ(20px)",
						}}
					>
						{/* Inner cut-out mask */}
						<div className="w-full h-full rounded-full overflow-hidden bg-background relative inner-mask">
							<img
								src={profileImg}
								alt="Nitin Verma"
								className="w-full h-full object-cover"
								style={{ 
									objectPosition: "center 10%",
									filter: isDark ? "contrast(1.05) brightness(0.95)" : "none" 
								}}
							/>
							{/* Subtle top reflection overlay */}
							<div 
								className="absolute inset-0 pointer-events-none" 
								style={{
									background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%)",
									borderRadius: "50%",
								}}
							/>
						</div>
					</div>

					{/* Floating Accent Badge (Subtle detail) */}
					<motion.div
						className="absolute bottom-2 right-2 bg-background border px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest shadow-lg backdrop-blur-md uppercase text-primary"
						style={{
							borderColor: isDark ? "rgba(164, 201, 255, 0.2)" : "rgba(0,0,0,0.1)",
							transform: "translateZ(50px)",
						}}
					>
						Available
					</motion.div>
				</div>

				{/* Detail Section */}
				<div 
					className="flex flex-col text-center md:text-left flex-1"
					style={{ transform: "translateZ(40px)" }}
				>
					<div>
						<h3 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight mb-1">Nitin Verma</h3>
						<p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4">Full Stack Developer</p>
					</div>
					
					<ul className="text-sm text-muted-foreground flex flex-col gap-3 font-medium mb-6">
						<li className="flex items-center justify-center md:justify-start gap-3">
							<MapPin size={16} className="text-foreground/70 flex-shrink-0" />
							Ghaziabad, UP, India
						</li>
						<li className="flex items-center justify-center md:justify-start gap-3">
							<Code2 size={16} className="text-foreground/70 flex-shrink-0" />
							React, Node.js, Python
						</li>
					</ul>

					{/* Socials */}
					<div className="flex items-center justify-center md:justify-start gap-3 mt-auto">
						{[
							{ icon: Github, href: "https://github.com/45NitinVerma", "label": "GitHub" },
							{ icon: Linkedin, href: "https://www.linkedin.com/in/45nitinverma", "label": "LinkedIn" },
							{ icon: Twitter, href: "https://x.com/45NitinVerma", "label": "Twitter" }
						].map(({ icon: Icon, href, label }, i) => (
							<a
								key={i}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="flex items-center justify-center w-10 h-10 rounded-full bg-muted border border-border/40 text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
							>
								<Icon size={18} />
							</a>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default HeroProfile;
