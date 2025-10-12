import { Briefcase, Code, User } from "lucide-react";
import React from "react";

const AboutSection = () => {
	return (
		<section id="about" className="py-24 px-4 relative">
			<div className="container mx-auto max-x-5xl">
				<h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
					About <span className="text-primary"> Me</span>
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<h3 className="text-2xl font-semibold">
							Passionate Web Developer & ML Enginner
						</h3>

						<p className="text-muted-foreground">
							with over 1 years of experience in Web Dev, I made
							responsive projects using MERN. Also made Machine
							Learning and Deep Learning projects.
						</p>

						<p className="text-muted-foreground">
							I'm passionate about creating elegant solutions to
							complex problems. I believe in writing clean,
							efficient code that not only works but is also easy
							to maintain and scale.
						</p>

					<div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
						<a
							href="#contact"
							className="px-6 py-2 rounded-full border border-primary hover:bg-primary hover:text-background transition-colors duration-300 text-center"
						>
							Get In Touch
						</a>

						<a href="/MyResume.pdf" download="Nitin-Resume.pdf" className="cosmic-button">
							Download Resume
						</a>
					</div>
					</div>


					<div className="grid grid-cols-1 gap-6">
						<div className="gradient-border p-6 card-hover">
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-full bg-primary/10">
									<Code className="h-6 w-6 text-primary" />
								</div>
								<div className="text-left">
									<h4 className="font-semibold text-lg">
										Web Development
									</h4>
									<p className="text-muted-foreground">
										Creating responsive webiste and web
										applications with modern frameworks.
									</p>
								</div>
							</div>
						</div>
						<div className="gradient-border p-6 card-hover">
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-full bg-primary/10">
									<User className="h-6 w-6 text-primary" />
								</div>
								<div className="text-left">
									<h4 className="font-semibold text-lg">
										UI/UX Design
									</h4>
									<p className="text-muted-foreground">
										Designing intuitinve user interfaces and experiences.
									</p>
								</div>
							</div>
						</div>
						<div className="gradient-border p-6 card-hover">
							<div className="flex items-start gap-4">
								<div className="p-3 rounded-full bg-primary/10">
									<Briefcase className="h-6 w-6 text-primary" />
								</div>
								<div className="text-left">
									<h4 className="font-semibold text-lg">
										Project Management
									</h4>
									<p className="text-muted-foreground">
										Leading projects from conception to completion with agile methodologies.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutSection;
