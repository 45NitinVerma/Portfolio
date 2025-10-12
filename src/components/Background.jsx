import React from "react";

// GradientBackground: replaces animated starfield with a lightweight gradient background.
// Keeps the same placement (fixed, inset-0) and pointer-events-none so it doesn't
// interfere with UI interactions. File keeps the same export name so other files
// (like `Home.jsx`) don't need to change.
const Background = () => {
	return (
		<div className="fixed inset-0 pointer-events-none z-0">
			{/* Light mode subtle background */}
			<div className="absolute inset-0 bg-sky-light dark:opacity-0 opacity-100"></div>

			{/* Dark mode: dark sky blue gradient */}
			<div className="absolute inset-0 bg-sky-dark dark:opacity-100 opacity-0"></div>
		</div>
	);
};

export default Background;
