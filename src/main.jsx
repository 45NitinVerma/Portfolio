import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Lenis from "lenis";

// Initialize Lenis smooth scroll
const lenis = new Lenis({
	duration: 1.2,
	easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
	orientation: "vertical",
	gestureOrientation: "vertical",
	smoothWheel: true,
	wheelMultiplier: 0.9,
	touchMultiplier: 1.5,
});

function raf(time) {
	lenis.raf(time);
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Expose lenis globally for components that need it
window.lenis = lenis;

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
