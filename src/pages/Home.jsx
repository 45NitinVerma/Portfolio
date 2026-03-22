import { useState, useEffect } from "react";
import AboutSection from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { Navbar } from "../components/NavBar";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import Background from "../components/Background";
import ScrollButton from "../components/ScrollButton";
import CustomCursor from "../components/CustomCursor";
import ScrollProgress from "../components/ScrollProgress";
import JourneySection from "../components/JourneySection";

export const Home = () => {
	const [isDark, setIsDark] = useState(
		() => document.documentElement.classList.contains("dark")
	);

	useEffect(() => {
		const observer = new MutationObserver(() => {
			setIsDark(document.documentElement.classList.contains("dark"));
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	return (
		<div className="min-h-screen bg-transparent text-foreground overflow-x-hidden">
			{/* Global overlays */}
			<CustomCursor />
			<ScrollProgress />

			{/* CSS blob + noise layer (now R3F Galaxy) */}
			<Background />

			{/* Navbar */}
			<Navbar />

			{/* Main content */}
			<main>
				<HeroSection />
				<AboutSection />
				<SkillsSection />
				<ProjectsSection />
				<JourneySection />
				<ContactSection />
			</main>

			{/* Footer */}
			<Footer />

			{/* Floating scroll-to-top */}
			<ScrollButton />
		</div>
	);
};
