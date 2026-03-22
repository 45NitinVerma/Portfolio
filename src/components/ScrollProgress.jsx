import React, { useEffect, useState } from "react";

const ScrollProgress = () => {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const update = () => {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight - window.innerHeight;
			const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
			setWidth(Math.min(100, Math.max(0, percent)));
		};

		window.addEventListener("scroll", update, { passive: true });
		update();
		return () => window.removeEventListener("scroll", update);
	}, []);

	return (
		<div
			className="scroll-progress-bar"
			style={{ width: `${width}%` }}
			role="progressbar"
			aria-valuenow={Math.round(width)}
			aria-valuemin={0}
			aria-valuemax={100}
		/>
	);
};

export default ScrollProgress;
