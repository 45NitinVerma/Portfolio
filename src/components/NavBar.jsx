import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
	{ name: "Home", href: "#hero" },
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Projects", href: "#projects" },
	{ name: "Journey", href: "#journey" },
	{ name: "Contact", href: "#contact" },
];

export const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("#hero");

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const onKey = (e) => { if (e.key === "Escape") setIsMenuOpen(false); };
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	useEffect(() => {
		document.body.style.overflow = isMenuOpen ? "hidden" : "";
	}, [isMenuOpen]);

	// Active section tracking
	useEffect(() => {
		const sections = navItems
			.map((i) => document.querySelector(i.href))
			.filter(Boolean);
		if (!sections.length) return;
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) setActiveSection(`#${e.target.id}`);
				});
			},
			{ rootMargin: "-30% 0px -60% 0px", threshold: 0 }
		);
		sections.forEach((s) => obs.observe(s));
		return () => obs.disconnect();
	}, []);

	const scrollTo = (href) => {
		document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
		setIsMenuOpen(false);
	};

	return (
		<nav
			className={`fixed w-full z-40 transition-all duration-400 ${
				isScrolled
					? "py-3 glass shadow-sm border-b border-border/60"
					: "py-5 bg-transparent"
			}`}
		>
			<div className="container flex items-center justify-between">
				{/* Logo */}
				<a
					href="#hero"
					onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
					className="text-xl font-black tracking-tight flex items-center gap-1"
				>
					<span className="text-foreground">Nitin</span>
					<span className="text-gradient">.dev</span>
				</a>

				{/* Desktop nav */}
				<div className="hidden md:flex items-center gap-1">
					{navItems.map((item) => {
						const isActive = activeSection === item.href;
						return (
							<button
								key={item.name}
								onClick={() => scrollTo(item.href)}
								aria-current={isActive ? "page" : undefined}
								className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
									isActive
										? "text-white"
										: "text-foreground/70 hover:text-foreground"
								}`}
							>
								{isActive && (
									<span
										className="absolute inset-0 rounded-full"
										style={{
											background: "hsl(var(--primary) / 0.15)",
										}}
									/>
								)}
								<span className="relative z-10">{item.name}</span>
							</button>
						);
					})}
					<div className="ml-2">
						<ThemeToggle />
					</div>
				</div>

				{/* Mobile controls */}
				<div className="flex md:hidden items-center gap-2">
					<ThemeToggle />
					<button
						onClick={() => setIsMenuOpen((p) => !p)}
						className="p-2 rounded-lg text-foreground bg-muted/60 hover:bg-muted transition-colors"
						aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
						aria-expanded={isMenuOpen}
					>
						{isMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Mobile sidebar */}
			{isMenuOpen && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 md:hidden"
					onClick={() => setIsMenuOpen(false)}
				/>
			)}
			<aside
				className={`fixed top-0 right-0 h-full w-72 glass-strong z-50 transform transition-transform duration-300 md:hidden border-l border-border ${
					isMenuOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between px-5 py-4 border-b border-border">
					<span className="font-black text-lg text-gradient">Menu</span>
					<button
						onClick={() => setIsMenuOpen(false)}
						className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
					>
						<X size={18} />
					</button>
				</div>
				<nav className="px-4 py-6 flex flex-col gap-2">
					{navItems.map((item) => {
						const isActive = activeSection === item.href;
						return (
							<button
								key={item.name}
								onClick={() => scrollTo(item.href)}
								className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
									isActive
										? "bg-primary text-primary-foreground"
										: "text-foreground/80 hover:bg-muted hover:text-foreground"
								}`}
							>
								{item.name}
							</button>
						);
					})}
				</nav>
			</aside>
		</nav>
	);
};
