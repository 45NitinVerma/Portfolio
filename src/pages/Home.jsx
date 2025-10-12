import AboutSection from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import HeroSection from "../components/HeroSection";
import { Navbar } from "../components/NavBar";
import ProjectsSection from "../components/ProjectsSection";
import SkillsSection from "../components/SkillsSection";
import Background from "../components/Background";
import ScrollButton from "../components/ScrollButton";

export const Home = () => {
	return (
		<div className="min-h-screen bg-background text-foreground overflow-x-hidden">
			{/* Background effect */}
			<Background />

			{/* Navbar */}
			<Navbar />

			{/* Main content */}
			<main>
				<HeroSection />
				<AboutSection />
				<SkillsSection />
				<ProjectsSection />
				<ContactSection />
			</main>

			{/* Footer */}
			<Footer />
			{/* Floating scroll button overlay */}
			<ScrollButton />
		</div>
	);
};
