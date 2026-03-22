import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Mouse-tracking icosahedron ─────────────────────── */
function WireIco() {
	const meshRef = useRef();
	const mouse = useRef({ x: 0, y: 0 });
	const targetRot = useRef({ x: 0, y: 0 });
	const baseRot = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const onMove = (e) => {
			// Normalize to [-1, 1]
			mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
			mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
		};
		window.addEventListener("mousemove", onMove, { passive: true });
		return () => window.removeEventListener("mousemove", onMove);
	}, []);

	useFrame((state, delta) => {
		if (!meshRef.current) return;

		// Auto-rotate base
		baseRot.current.x += delta * 0.3;
		baseRot.current.y += delta * 0.45;

		// Mouse tilt on top of base rotation
		targetRot.current.x += (mouse.current.y * 0.6 - targetRot.current.x) * 0.05;
		targetRot.current.y += (mouse.current.x * 0.6 - targetRot.current.y) * 0.05;

		meshRef.current.rotation.x = baseRot.current.x + targetRot.current.x;
		meshRef.current.rotation.y = baseRot.current.y + targetRot.current.y;

		// Subtle pulsing scale
		const scale = 1 + Math.sin(state.clock.elapsedTime * 1.8) * 0.04;
		meshRef.current.scale.setScalar(scale);
	});

	return (
		<mesh ref={meshRef}>
			<icosahedronGeometry args={[1, 0]} />
			<meshBasicMaterial
				color={"#6366f1"}
				wireframe
				transparent
				opacity={0.75}
			/>
		</mesh>
	);
}

/* ─── Inner solid ico (dim fill) ────────────────────── */
function SolidIco() {
	const meshRef = useRef();

	useFrame((state, delta) => {
		if (!meshRef.current) return;
		meshRef.current.rotation.y += delta * 0.3;
		meshRef.current.rotation.x += delta * 0.15;
	});

	return (
		<mesh ref={meshRef} scale={0.82}>
			<icosahedronGeometry args={[1, 0]} />
			<meshBasicMaterial color={"#3b82f6"} transparent opacity={0.08} />
		</mesh>
	);
}

/* ─── FloatingCube ───────────────────────────────────── */
const FloatingCube = () => {
	const [hovered, setHovered] = useState(false);

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			{/* Tooltip */}
			{hovered && (
				<div
					style={{
						position: "absolute",
						bottom: "110%",
						left: "50%",
						transform: "translateX(-50%)",
						background: "hsl(var(--card))",
						border: "1px solid hsl(var(--border))",
						borderRadius: "8px",
						padding: "4px 10px",
						fontSize: "11px",
						fontWeight: 600,
						color: "hsl(var(--foreground))",
						whiteSpace: "nowrap",
						pointerEvents: "none",
						zIndex: 10,
						boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
					}}
				>
					Built with Three.js ✨
				</div>
			)}

			<div
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{
					width: "96px",
					height: "96px",
					borderRadius: "16px",
					overflow: "hidden",
					background: "hsl(var(--card) / 0.5)",
					border: "1px solid hsl(var(--border) / 0.6)",
					backdropFilter: "blur(12px)",
					WebkitBackdropFilter: "blur(12px)",
					boxShadow: hovered
						? "0 0 24px 4px hsl(var(--primary) / 0.25), 0 8px 32px rgba(0,0,0,0.12)"
						: "0 4px 16px rgba(0,0,0,0.08)",
					transition: "box-shadow 0.3s ease",
					cursor: "none",
				}}
			>
				<Canvas
					dpr={[1, 1.5]}
					gl={{ antialias: true, alpha: true }}
					camera={{ position: [0, 0, 2.8], fov: 50 }}
					style={{ width: "100%", height: "100%" }}
				>
					<ambientLight intensity={0.5} />
					<pointLight position={[2, 2, 2]} intensity={1} color={"#6366f1"} />
					<WireIco />
					<SolidIco />
				</Canvas>
			</div>

			{/* Label */}
			<div
				style={{
					textAlign: "center",
					marginTop: "6px",
					fontSize: "9px",
					fontWeight: 700,
					letterSpacing: "0.08em",
					textTransform: "uppercase",
					color: "hsl(var(--muted-foreground))",
				}}
			>
				Three.js
			</div>
		</div>
	);
};

export default FloatingCube;
