import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Eye, ChevronDown } from "lucide-react";

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
		<div 
            className="relative inline-flex flex-col items-center justify-center min-h-[44px]" 
            ref={containerRef}
            style={{ zIndex: isOpen ? 50 : "auto" }}
        >
			<button
				onClick={(e) => {
					e.preventDefault();
					setIsOpen(!isOpen);
				}}
				className={`outline-button gap-2 text-sm justify-center transition-all duration-300 ${isOpen ? 'ring-2 ring-primary/20' : ''} ${className}`}
                style={{ border: "1px solid hsl(var(--border))" }}
			>
				<FileText size={16} />
				Resume
                <motion.span 
                    animate={{ rotate: isOpen ? 180 : 0 }} 
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ChevronDown size={14} className="opacity-70" />
                </motion.span>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						key="resume-dropdown"
						initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
						transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} 
						className="absolute top-[calc(100%+0.5rem)] flex items-center gap-2 p-1.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.1)] z-50 whitespace-nowrap"
                        style={{ 
                            border: "1px solid hsl(var(--border) / 0.5)",
                            background: "hsl(var(--card) / 0.8)",
                            backdropFilter: "blur(16px)"
                        }}
					>
						<a
							href="/MyResume.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className={`outline-button gap-1.5 text-sm justify-center px-4 py-2 hover:bg-muted/50 transition-colors ${className}`}
							style={{ 
                                border: "1px solid hsl(var(--border) / 0.5)", 
                                background: "hsl(var(--background))" 
                            }}
							title="View Resume"
                            onClick={() => setIsOpen(false)}
						>
							<Eye size={15} />
							View
						</a>
						<a
							href="/MyResume.pdf"
							download="Nitin-Verma-Resume.pdf"
							className={`cosmic-button gap-1.5 text-sm justify-center shadow-md px-4 py-2 ${className}`}
							title="Download Resume"
                            style={{ 
                                border: "1px solid hsl(var(--primary) / 0.5)" 
                            }}
                            onClick={() => setIsOpen(false)}
						>
							<Download size={15} />
							Download
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ResumeButton;
