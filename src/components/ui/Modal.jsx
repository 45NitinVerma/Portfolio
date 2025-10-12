import React, { useEffect, useRef, useState } from "react";

/**
 * Modal
 * Props:
 * - isOpen: boolean
 * - onClose: () => void
 * - title?: string
 * - children
 */
export default function Modal({ isOpen, onClose, title, children }) {
	const [mounted, setMounted] = useState(false);
	const [visible, setVisible] = useState(false);
	const modalRef = useRef(null);
	const closeRef = useRef(null);
	const lastFocused = useRef(null);

	useEffect(() => {
		if (isOpen) {
			lastFocused.current = document.activeElement;
			setMounted(true);
			// allow mount then trigger visible for animation
			requestAnimationFrame(() =>
				requestAnimationFrame(() => setVisible(true))
			);
		} else if (mounted) {
			// start closing animation
			setVisible(false);
			const t = setTimeout(() => {
				setMounted(false);
				// restore focus
				try {
					if (lastFocused.current && lastFocused.current.focus)
						lastFocused.current.focus();
				} catch (e) {
					// ignore
				}
			}, 200);
			return () => clearTimeout(t);
		}
	}, [isOpen]);

	useEffect(() => {
		if (!mounted) return;
		// focus the close button or first focusable
		const focusEl =
			closeRef.current ||
			modalRef.current?.querySelector(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
		try {
			focusEl?.focus();
		} catch (e) {}
	}, [mounted]);

	useEffect(() => {
		const onKey = (e) => {
			if (!mounted) return;
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [mounted, onClose]);

	const onOverlayMouseDown = (e) => {
		if (e.target === e.currentTarget) onClose();
	};

	const handleTrapKeyDown = (e) => {
		if (e.key !== "Tab") return;
		const container = modalRef.current;
		if (!container) return;
		const focusable = container.querySelectorAll(
			'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
		);
		if (!focusable || focusable.length === 0) return;
		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (e.shiftKey) {
			if (document.activeElement === first) {
				e.preventDefault();
				last.focus();
			}
		} else {
			if (document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	};

	// prevent background scroll while visible
	useEffect(() => {
		document.body.style.overflow = visible ? "hidden" : "";
	}, [visible]);

	if (!mounted) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center px-4"
			aria-modal="true"
			role="dialog"
			onMouseDown={onOverlayMouseDown}
		>
			<div
				className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
					visible ? "opacity-100" : "opacity-0"
				}`}
			/>

			<div
				ref={modalRef}
				onKeyDown={handleTrapKeyDown}
				className={`relative z-10 max-w-3xl w-full bg-card rounded-lg overflow-hidden shadow-lg transform transition-all duration-200 ${
					visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
				}`}
			>
				<div className="p-4 flex items-start justify-between">
					<div className="font-semibold text-lg">{title}</div>
					<button
						ref={closeRef}
						onClick={onClose}
						className="ml-4 text-foreground/80 hover:text-primary transition-colors duration-200"
						aria-label="Close"
					>
						✕
					</button>
				</div>

				<div>{children}</div>
			</div>
		</div>
	);
}
