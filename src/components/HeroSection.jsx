import React from "react";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
	return (
		<section
			id="hero"
			className="relative min-h-screen flex flex-col items-center justify-center px-4"
		>
			<div className="container max-w-4xl mx-auto text-center z-10">
				<div className="space-y-6">
					<h1 className="text-4xl md:text-6xl font-bold tracking-tight">
						<span className="opacity-0 animate-fade-in">
							{" "}
							Hi, I'm
						</span>
						<span className="text-primary opacity-0 animate-fade-in-delay-1">
							{" "}
							Nitin
						</span>
						<span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
							{" "}
							Verma
						</span>
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-4">
						I’m a passionate Full-stack Developer and also a ML
						Engineer. I work with Python, Java, and JavaScript, and
						enjoy building both the frontend and backend. I’m always
						learning new technologies and also solve real-world
						problems through clean, thoughtful code.
					</p>

                    <div className="opacity-0 animate-fade-in-delay-4">
                        <a href="#projects" className="cosmic-button">View My Work</a>
                    </div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
