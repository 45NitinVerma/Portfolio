import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
	{ name: "Home", href: "#hero" },
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Projects", href: "#projects" },
	{ name: "Contact", href: "#contact" },
];

export const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("#hero");
	const firstMenuLinkRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close menu on Escape and update focus
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") setIsMenuOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	// Prevent background scroll when mobile menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [isMenuOpen]);

	// Track active section using IntersectionObserver
	useEffect(() => {
		const sections = navItems
			.map((i) => document.querySelector(i.href))
			.filter(Boolean);

		if (sections.length === 0) return;

		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(`#${entry.target.id}`);
					}
				});
			},
			{ root: null, rootMargin: "-30% 0px -60% 0px", threshold: 0 }
		);

		sections.forEach((s) => obs.observe(s));
		return () => obs.disconnect();
	}, []);
	return (
		<nav
			className={`fixed w-full z-40 transition-all duration-300 ${
				isScrolled
					? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
					: "py-5"
			}`}
		>
			<div className="container flex items-center justify-between">
				<a
					className="text-xl font-bold text-primary flex items-center"
					href="#hero"
				>
					<span className="relative z-10">
						<span className="text-glow text-foreground">
							{" "}
							Nitin's{" "}
						</span>{" "}
						Portfolio
					</span>
				</a>

				{/* desktop nav */}
				<div className="hidden md:flex items-center space-x-3">
					{navItems.map((item, key) => {
						const isActive = activeSection === item.href;
						return (
							<div key={key} className="relative">
								{/* animated pill */}
								<span
									aria-hidden
									className={`absolute inset-0 mx-auto my-auto h-9 rounded-full transition-all duration-400 pointer-events-none ${
										isActive
											? "w-full bg-primary backdrop-blur-sm animate-[nav-breathe_2.6s_ease-in-out_infinite]"
											: "w-0"
									}`}
								/>
								<a
									href={item.href}
									className={`relative px-3 py-2 text-foreground/80 transition-colors duration-300 z-10 ${
										isActive
											? "text-white font-semibold"
											: "hover:text-primary"
									}`}
									onClick={(e) => {
										e.preventDefault();
										const el = document.querySelector(
											item.href
										);
										if (el)
											el.scrollIntoView({
												behavior: "smooth",
											});
									}}
									aria-current={isActive ? "page" : undefined}
								>
									{item.name}
								</a>
							</div>
						);
					})}
					{/* theme toggle on desktop */}
					<ThemeToggle />
				</div>

				{/* mobile nav */}

				<button
					onClick={() => setIsMenuOpen((prev) => !prev)}
					className="md:hidden p-2 text-foreground z-50"
					aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
					aria-expanded={isMenuOpen}
				>
					{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>

				{/* mobile sidebar menu (slides from right) */}
				<aside
					role="dialog"
					aria-hidden={!isMenuOpen}
					className={`fixed top-0 right-0 h-full w-72 bg-background backdrop-blur-md z-50 transform transition-transform duration-300 md:hidden ${
						isMenuOpen
							? "translate-x-0 shadow-lg"
							: "translate-x-full"
					}`}
				>
					<div className="flex items-center justify-between px-4 py-3 border-b border-foreground/5">
						<button
							onClick={() => setIsMenuOpen(false)}
							className="p-2 text-foreground"
							aria-label="Close menu"
						>
							<X size={20} />
						</button>
						{/* theme toggle inside sidebar */}
						<div className="ml-2">
							<ThemeToggle />
						</div>
					</div>
					<nav className="bg-background px-6 py-8">
						<div className="flex flex-col space-y-6 text-lg">
							{navItems.map((item, key) => {
								const isActive = activeSection === item.href;
								return (
									<a
										key={key}
										href={item.href}
										
										className={`transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
											isActive
												? "text-white font-semibold"
												: "text-foreground/80 hover:text-primary"
										}`}
										onClick={(e) => {
											e.preventDefault();
											const el = document.querySelector(
												item.href
											);
											if (el)
												el.scrollIntoView({
													behavior: "smooth",
												});
											setIsMenuOpen(false);
										}}
										aria-current={
											isActive ? "page" : undefined
										}
									>
										{item.name}
									</a>
								);
							})}
						</div>
					</nav>
				</aside>
			</div>
		</nav>
	);
};
