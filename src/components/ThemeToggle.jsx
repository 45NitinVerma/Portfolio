import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeToggle = ({ className = "" }) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		if (typeof window !== "undefined") {
			return document.documentElement.classList.contains("dark");
		}
		return false;
	});

	useEffect(() => {
		// Keep state in sync if there are multiple ThemeToggle instances
		const observer = new MutationObserver(() => {
			setIsDarkMode(document.documentElement.classList.contains("dark"));
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
		return () => observer.disconnect();
	}, []);

	const toggleTheme = () => {
		const currentlyDark = document.documentElement.classList.contains("dark");
		if (currentlyDark) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className={`inline-flex items-center justify-center p-2 rounded-full transition-colors duration-300 focus:outline-none ${className}`}
			aria-label={
				isDarkMode ? "Switch to light theme" : "Switch to dark theme"
			}
		>
			{isDarkMode ? (
				<Sun className="h-6 w-6 text-yellow-300" />
			) : (
				<Moon className="h-6 w-6 text-blue-900" />
			)}
		</button>
	);
};

export default ThemeToggle;
