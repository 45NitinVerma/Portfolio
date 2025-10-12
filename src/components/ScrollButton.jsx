import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

/**
 * Floating scroll button that appears fixed at the bottom-center of the viewport
 * only when the user is near the bottom (end) of a section. It hides when the
 * footer is visible.
 */
const ScrollButton = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [sections, setSections] = useState([]);
	const [visible, setVisible] = useState(false);
	const [mounted, setMounted] = useState(false); // keep mounted during exit animation
	const observerRef = useRef(null);

	// auto-hide timer and snooze to avoid immediate re-show
	const autoHideTimerRef = useRef(null);
	const snoozeUntilRef = useRef(0);
	const AUTO_HIDE_MS = 1000; // how long the button remains visible after appearing
	const SNOOZE_MS = 1500; // cooldown after auto-hide during which it won't reappear

	useEffect(() => {
		const main = document.querySelector("main");
		const nodes = main
			? Array.from(main.querySelectorAll("section"))
			: Array.from(document.querySelectorAll("section"));
		setSections(nodes);

		if (!nodes.length) return;

		const observer = new IntersectionObserver(
			(entries) => {
				// choose the section with the largest intersection ratio
				let best = { ratio: 0, index: 0 };
				entries.forEach((entry) => {
					const idx = nodes.indexOf(entry.target);
					if (entry.intersectionRatio > best.ratio) {
						best = { ratio: entry.intersectionRatio, index: idx };
					}
				});
				setCurrentIndex(best.index);
			},
			{
				root: null,
				rootMargin: "0px",
				threshold: [0, 0.25, 0.5, 0.75, 1],
			}
		);

		nodes.forEach((n) => observer.observe(n));
		observerRef.current = observer;

		return () => observer.disconnect();
	}, []);

	// Show button only when user is near the end (bottom) of the current section
	useEffect(() => {
		if (!sections.length) return;

		let raf = 0;

		const checkVisibility = () => {
			const footer = document.querySelector("footer");
			const footerRect = footer ? footer.getBoundingClientRect() : null;
			const footerInView = footerRect
				? footerRect.top < window.innerHeight && footerRect.bottom > 0
				: false;

			if (footerInView) {
				setVisible(false);
				return;
			}

			// find contact section index; if present and we're at/after it, hide the button
			const contactIndex = sections.findIndex(
				(s) => (s.id || s.getAttribute("id")) === "contact"
			);
			if (contactIndex !== -1 && currentIndex >= contactIndex) {
				setVisible(false);
				return;
			}

			const idx = Math.max(
				0,
				Math.min(currentIndex, sections.length - 1)
			);
			const sec = sections[idx];
			if (!sec) {
				setVisible(false);
				return;
			}

			const rect = sec.getBoundingClientRect();
			// threshold: last 25% of viewport or max 180px
			const threshold = Math.min(180, window.innerHeight * 0.25);
			const nearBottom =
				rect.bottom <= window.innerHeight + 20 &&
				rect.bottom >= window.innerHeight - threshold;

			// if we're near bottom and not snoozed, show and start auto-hide timer
			if (nearBottom && Date.now() > snoozeUntilRef.current) {
				if (!visible) {
					setVisible(true);
					// clear any existing auto-hide timer
					if (autoHideTimerRef.current)
						clearTimeout(autoHideTimerRef.current);
					autoHideTimerRef.current = setTimeout(() => {
						setVisible(false);
						// set snooze so it won't reappear immediately
						snoozeUntilRef.current = Date.now() + SNOOZE_MS;
					}, AUTO_HIDE_MS);
				}
			} else {
				// if not near bottom, clear timer and hide
				if (autoHideTimerRef.current) {
					clearTimeout(autoHideTimerRef.current);
					autoHideTimerRef.current = null;
				}
				setVisible(false);
			}
		};

		const onScroll = () => {
			if (raf) cancelAnimationFrame(raf);
			raf = requestAnimationFrame(checkVisibility);
		};

		// run once to set initial visibility
		checkVisibility();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);

		return () => {
			if (raf) cancelAnimationFrame(raf);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			// clear any auto-hide timer
			if (autoHideTimerRef.current) {
				clearTimeout(autoHideTimerRef.current);
				autoHideTimerRef.current = null;
			}
		};
	}, [sections, currentIndex]);

	// manage mount state so exit animation can play
	useEffect(() => {
		if (visible) setMounted(true);
		else {
			// allow 220ms for animation before unmounting
			const t = setTimeout(() => setMounted(false), 220);
			return () => clearTimeout(t);
		}
	}, [visible]);

	const handleClick = () => {
		if (!sections.length)
			return window.scrollTo({
				top: window.scrollY + window.innerHeight,
				behavior: "smooth",
			});

		const nextIndex = currentIndex + 1;
		if (nextIndex < sections.length) {
			sections[nextIndex].scrollIntoView({ behavior: "smooth" });
		} else {
			const footer = document.querySelector("footer");
			if (footer) footer.scrollIntoView({ behavior: "smooth" });
			else window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	if (!mounted) return null;

	// animation classes: fade + slide up when visible, fade out + slide down when hidden
	const containerClasses = `fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center select-none transition-all duration-200 ease-out ${
		visible
			? "opacity-100 translate-y-0"
			: "opacity-0 translate-y-6 pointer-events-none"
	}`;

	return (
		<div className={containerClasses} aria-hidden={!visible}>
			<button
				onClick={handleClick}
				aria-label="Scroll to next section"
				title="Scroll to next section"
				className="flex flex-col items-center bg-transparent border-0 focus:outline-none"
			>
				<span className="text-sm text-muted-foreground mb-2">
					Scroll
				</span>
				<div className="p-3 rounded-full bg-background/10 dark:bg-background/20 backdrop-blur-sm shadow-lg ring-1 ring-white/5 transform transition-transform duration-200 hover:scale-105">
					{currentIndex < sections.length - 1 ? (
						<ArrowDown className="h-6 w-6 text-primary animate-bounce" />
					) : (
						<ArrowUp className="h-6 w-6 text-primary animate-bounce" />
					)}
				</div>
			</button>
		</div>
	);
};

export default ScrollButton;
