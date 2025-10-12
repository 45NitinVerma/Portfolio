import { ArrowRight, ExternalLink, Github } from "lucide-react";
import React, { useState } from "react";
import Modal from "./ui/Modal";

const projects = [
	{
		id: 1,
		title: "Taskify",
		description:
			"A task management app to organize your to-dos efficiently.",
		image: "/projects/Taskify.png",
		tags: ["React", "Node.js", "MongoDB"],
		demoUrl: "https://taskify-eight-livid.vercel.app/",
		githubUrl: "https://github.com/45NitinVerma/Taskify",
	},
	{
		id: 2,
		title: "QuickChat",
		description:
			"A chat app where users can connect and chat in realtime.",
		image: "/projects/QuickChat.png",
		tags: ["React", "Node.js", "MongoDB", "Socket.io", "Express.js"],
		demoUrl: "https://quick-chat-jet.vercel.app/",
		githubUrl: "https://github.com/45NitinVerma/QuickChat",
	},
	{
		id: 3,
		title: "RealTime Face Mask Detection",
		description:
			"A web app that detects face masks in real-time using webcam.",
		image: "/projects",
		tags: ["Python", "OpenCV", "TensorFlow"],
		demoUrl: "#",
		githubUrl: "#",
	},
	{
		id: 4,
		title: "GoFood",
		description:
			"A food delivery app with real-time tracking and multiple payment options.",
		image: "/projects",
		tags: ["React", "Node.js", "Stripe API"],
		demoUrl: "#",
		githubUrl: "#",
	},
];

const ProjectsSection = () => {
	const [selected, setSelected] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const openModal = (project) => {
		setSelected(project);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setSelected(null);
	};

	return (
		<section id="projects" className="py-24 px-4 relative">
			<div className="container mx-auto max-w-5xl">
				<h2 className="text-3xl md:text-4xl font-bold text-center">
					Featured <span className="text-primary">Projects</span>
				</h2>

				<p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
					Here are some of my recents projects. Each project is
					carefully crafted with attention to detail, performance, and
					user experience.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project) => (
						<div
							key={project.id}
							role="button"
							tabIndex={0}
							onClick={() => openModal(project)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ")
									openModal(project);
							}}
							className="group bg-card rounded-lg overflow-hidden shadow-x card-hover cursor-pointer"
						>
							<div className="h-48 overflow-hidden p-5">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-lg"
								/>
							</div>

							<div className="p-6">
								<div className="flex flex-wrap gap-2 mb-4">
									{project.tags.map((tag) => (
										<span
											key={tag}
											className="px-2 py-1 border text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
										>
											{tag}
										</span>
									))}
								</div>

								<h3 className="text-xl font-semibold mb-2">
									{project.title}
								</h3>
								<p className="text-muted-foreground text-sm mb-4">
									{project.description}
								</p>

								<div className="flex justify-between items-center">
									<div className="text-foreground/70 text-sm">
										Click to preview
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<a
						className="cosmic-button w-fit flex items-center mx-auto gap-2"
						href="https://github.com/45nitinverma"
					>
						Check My Github <ArrowRight size={16} />
					</a>
				</div>

				<Modal
					isOpen={isOpen}
					onClose={closeModal}
					title={selected?.title ?? "Preview"}
				>
					{selected && (
						<div>
							<div className="h-64 md:h-96 overflow-hidden p-5">
								<img
									src={selected.image}
									alt={selected.title}
									className="w-full h-full object-cover rounded-lg"
								/>
							</div>

							<div className="p-6">
								<p className="text-muted-foreground mb-4">
									{selected.description}
								</p>
								<div className="flex flex-wrap gap-2 mb-4">
									{selected.tags.map((t) => (
										<span
											key={t}
											className="px-2 py-1 border text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
										>
											{t}
										</span>
									))}
								</div>

								<div className="mt-2 flex gap-3">
									<a
										href={selected.demoUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:brightness-95"
									>
										<ExternalLink size={16} /> Live Demo
									</a>

									<a
										href={selected.githubUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted"
									>
										<Github size={16} /> View on GitHub
									</a>
								</div>
							</div>
						</div>
					)}
				</Modal>
			</div>
		</section>
	);
};

export default ProjectsSection;
