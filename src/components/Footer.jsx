import React from "react";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const socials = [
	{ icon: Github, href: "https://github.com/45NitinVerma", label: "GitHub" },
	{ icon: Linkedin, href: "https://www.linkedin.com/in/45nitinverma", label: "LinkedIn" },
	{ icon: Twitter, href: "https://x.com/45NitinVerma", label: "Twitter" },
];

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative py-10 px-4 border-t border-border/60">
			{/* Gradient top line */}
			<div
				className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3"
				style={{
					background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--accent)), transparent)",
				}}
			/>

			<div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
				{/* Logo */}
				<div className="text-center md:text-left">
					<a href="#hero" className="text-xl font-black">
						<span className="text-foreground">Nitin</span>
						<span className="text-gradient">.dev</span>
					</a>
					<p className="text-xs text-muted-foreground mt-1">
						Full-Stack Developer & ML Engineer
					</p>
				</div>

				{/* Social links */}
				<div className="flex items-center gap-3">
					{socials.map(({ icon: Icon, href, label }) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={label}
							className="social-icon"
						>
							<Icon size={17} />
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};