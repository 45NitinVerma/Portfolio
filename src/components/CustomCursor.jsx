import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
	const outerRef = useRef(null);
	const innerRef = useRef(null);
	const [isHovering, setIsHovering] = useState(false);
	const [isClicking, setIsClicking] = useState(false);
	const pos = useRef({ x: -100, y: -100 });
	const outerPos = useRef({ x: -100, y: -100 });
	const rafId = useRef(null);

	useEffect(() => {
		// Don't show on touch devices
		if (window.matchMedia("(pointer: coarse)").matches) return;

		const onMove = (e) => {
			pos.current = { x: e.clientX, y: e.clientY };
			// Inner dot follows immediately
			if (innerRef.current) {
				innerRef.current.style.left = `${e.clientX}px`;
				innerRef.current.style.top = `${e.clientY}px`;
			}
		};

		const onMouseDown = () => setIsClicking(true);
		const onMouseUp = () => setIsClicking(false);

		// Outer ring follows with lag
		const animate = () => {
			outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.13;
			outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.13;
			if (outerRef.current) {
				outerRef.current.style.left = `${outerPos.current.x}px`;
				outerRef.current.style.top = `${outerPos.current.y}px`;
			}
			rafId.current = requestAnimationFrame(animate);
		};
		rafId.current = requestAnimationFrame(animate);

		// Detect hoverable elements
		const interactiveSelector =
			"a, button, [role='button'], input, textarea, select, label, .card-hover, .skill-card, .project-card, .category-button, .social-icon, [data-cursor='hover']";

		const onEnter = () => setIsHovering(true);
		const onLeave = () => setIsHovering(false);

		const attachListeners = () => {
			document.querySelectorAll(interactiveSelector).forEach((el) => {
				el.addEventListener("mouseenter", onEnter);
				el.addEventListener("mouseleave", onLeave);
			});
		};

		// Re-attach on DOM mutations (React renders new elements)
		const observer = new MutationObserver(attachListeners);
		observer.observe(document.body, { childList: true, subtree: true });
		attachListeners();

		window.addEventListener("mousemove", onMove);
		window.addEventListener("mousedown", onMouseDown);
		window.addEventListener("mouseup", onMouseUp);

		return () => {
			window.removeEventListener("mousemove", onMove);
			window.removeEventListener("mousedown", onMouseDown);
			window.removeEventListener("mouseup", onMouseUp);
			cancelAnimationFrame(rafId.current);
			observer.disconnect();
		};
	}, []);

	return (
		<>
			<div
				ref={outerRef}
				className={`cursor-outer ${isHovering ? "hovering" : ""} ${isClicking ? "clicking" : ""}`}
			/>
			<div
				ref={innerRef}
				className={`cursor-inner ${isHovering ? "hovering" : ""}`}
			/>
		</>
	);
};

export default CustomCursor;
