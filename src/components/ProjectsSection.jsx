import { ArrowRight, ExternalLink, Github } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./ui/Modal";

const projects = [
  {
    id: 1,
    title: "Resume Builder",
    description:
      "A modern web application that allows users to create, edit, and manage professional resumes with real-time updates, AI-powered text parsing, and cloud-based image storage.",
    image: "/projects/ResumeBuilder.png",
    tags: ["MERN", "JWT/BcryptJS", "ImageKit", "TailwindCSS"],
    demoUrl: "https://resume-builder-coral-mu.vercel.app/",
    githubUrl: "https://github.com/45NitinVerma/ResumeBuilder",
  },
  {
    id: 2,
    title: "Taskify",
    description: "A task management app to organize your to-dos efficiently.",
    image: "/projects/Taskify.png",
    tags: ["MERN", "JWT/BcryptJS", "TailwindCSS"],
    demoUrl: "https://taskify-eight-livid.vercel.app/",
    githubUrl: "https://github.com/45NitinVerma/Taskify",
  },
  {
    id: 3,
    title: "QuickChat",
    description: "A chat app where users can connect and chat in realtime.",
    image: "/projects/QuickChat.png",
    tags: ["MERN", "JWT/BcryptJS", "Socket.io", "Cloudinary", "TailwindCSS"],
    demoUrl: "https://quick-chat-jet.vercel.app/",
    githubUrl: "https://github.com/45NitinVerma/QuickChat",
  },
  {
    id: 4,
    title: "RealTime Face Mask Detection",
    description:
      "A web app that detects face masks in real-time using webcam.",
    image: "/projects/RTMD.png",
    tags: ["Python", "OpenCV", "TensorFlow"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

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
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Featured <span className="text-primary">Projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Here are some of my recent projects — built with performance,
          precision, and modern design in mind.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              custom={i}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              whileHover={{ scale: 1.03 }}
              className="group relative bg-dark/60 backdrop-blur-md border border-blue-500/20 dark:border-blue-400 hover:border-blue-500/40 
                        rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer"
              onClick={() => openModal(project)}
            >
              <div className="m-2 rounded-md h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, idx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.3 + idx * 0.1 },
                      }}
                      className="px-2 py-1 border border-blue-400/30 text-xs font-medium rounded-full bg-secondary/30 
                                text-secondary-foreground backdrop-blur-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex justify-between items-center text-blue-400 text-sm">
                  <span className="opacity-80 group-hover:opacity-100 transition">
                    Click to preview
                  </span>
                  <ArrowRight
                    size={18}
                    className="transform translate-x-0 group-hover:translate-x-2 transition-transform"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            href="https://github.com/45nitinverma"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check My GitHub <ArrowRight size={16} />
          </a>
        </motion.div>

        <Modal isOpen={isOpen} onClose={closeModal} title={selected?.title ?? "Preview"}>
          {selected && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="m-2 h-64 md:h-96 overflow-hidden rounded-xl">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover"
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
            </motion.div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default ProjectsSection;
