import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";

const ResumeButton = ({ className = "" }) => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);

	// Close when clicking outside
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (containerRef.current && !containerRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<motion.div 
            layout
            className="relative inline-flex items-center justify-center min-h-[44px]" 
            ref={containerRef}
        >
			<AnimatePresence mode="popLayout" initial={false}>
				{!isOpen ? (
					<motion.button
                        layoutId="resume-widget"
						key="main-btn"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ type: "spring", stiffness: 450, damping: 30 }}
						onClick={(e) => {
							e.preventDefault();
							setIsOpen(true);
						}}
						className={`outline-button gap-2 text-sm justify-center ${className}`}
                        style={{ border: "1px solid hsl(var(--border))" }}
					>
						<FileText size={16} />
						Resume
					</motion.button>
				) : (
					<motion.div
                        layoutId="resume-widget"
						key="options"
						className="flex items-center gap-2 md:gap-3 p-1 rounded-full w-full sm:w-auto"
                        style={{ 
                            border: "1px solid hsl(var(--border))",
                            background: "hsl(var(--card) / 0.6)",
                            backdropFilter: "blur(12px)"
                        }}
					>
						<motion.a
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
							href="/MyResume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className={`outline-button gap-2 text-sm justify-center ${className}`}
							title="View Resume"
                            style={{ 
                                border: "1px solid hsl(var(--border) / 0.5)", 
                                background: "hsl(var(--background))" 
                            }}
						>
							<Eye size={16} />
							View
						</motion.a>
						<motion.a
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.15, duration: 0.2, ease: "easeOut" }}
							href="/MyResume.pdf"
							download="Nitin-Verma-Resume.pdf"
							className={`cosmic-button gap-2 text-sm shadow-lg justify-center ${className}`}
							title="Download Resume"
                            style={{ 
                                border: "1px solid hsl(var(--primary) / 0.5)" 
                            }}
						>
							<Download size={16} />
							Save
						</motion.a>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default ResumeButton;
