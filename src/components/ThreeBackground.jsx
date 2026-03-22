import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Mouse-reactive camera tilt ─────────────────────────── */
function CameraRig() {
	const { camera } = useThree();
	const mouse = useRef({ x: 0, y: 0 });
	const target = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const onMove = (e) => {
			mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
			mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
		};
		window.addEventListener("mousemove", onMove, { passive: true });
		return () => window.removeEventListener("mousemove", onMove);
	}, []);

	useFrame(() => {
		target.current.x += (mouse.current.x * 0.6 - target.current.x) * 0.04;
		target.current.y += (mouse.current.y * 0.3 - target.current.y) * 0.04;
		camera.position.x +=
			(target.current.x * 1.5 - camera.position.x) * 0.05;
		camera.position.y +=
			(target.current.y * 0.8 - camera.position.y) * 0.05;
		camera.lookAt(0, 0, 0);
	});

	return null;
}

/* ─── Floating particles field ───────────────────────────── */
function Particles({ count = 1800, isDark }) {
	const ref = useRef();

	const positions = useMemo(() => {
		const arr = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			arr[i * 3] = (Math.random() - 0.5) * 28;
			arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
			arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
		}
		return arr;
	}, [count]);

	useFrame((state) => {
		if (ref.current) {
			ref.current.rotation.y = state.clock.elapsedTime * 0.018;
			ref.current.rotation.x =
				Math.sin(state.clock.elapsedTime * 0.008) * 0.12;
		}
	});

	const color = isDark ? "#6fa8dc" : "#3d7fc7";

	return (
		<Points
			ref={ref}
			positions={positions}
			stride={3}
			frustumCulled={false}
		>
			<PointMaterial
				transparent
				color={color}
				size={0.055}
				sizeAttenuation
				depthWrite={false}
				opacity={isDark ? 0.55 : 0.4}
			/>
		</Points>
	);
}

/* ─── Slow-rotating wireframe torus knot ────────────────── */
function TorusKnot({ isDark }) {
	const ref = useRef();

	useFrame((state) => {
		if (ref.current) {
			ref.current.rotation.x = state.clock.elapsedTime * 0.06;
			ref.current.rotation.y = state.clock.elapsedTime * 0.09;
		}
	});

	const color = isDark ? "#4d8fd6" : "#2563a8";
	const opacity = isDark ? 0.1 : 0.07;

	return (
		<mesh ref={ref} position={[0, 0, -4]}>
			<torusKnotGeometry args={[3.2, 0.8, 140, 20, 2, 3]} />
			<meshBasicMaterial
				color={color}
				wireframe
				transparent
				opacity={opacity}
			/>
		</mesh>
	);
}

/* ─── ThreeBackground ────────────────────────────────────── */
const ThreeBackground = ({ isDark }) => {
	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				zIndex: 0,
				pointerEvents: "none",
			}}
		>
			<Canvas
				camera={{ position: [0, 0, 10], fov: 60 }}
				dpr={[1, 1.5]}
				gl={{ antialias: false, alpha: true }}
				style={{ width: "100%", height: "100%" }}
			>
				<fog
					attach="fog"
					args={[isDark ? "#0a0f1e" : "#f0f4ff", 20, 60]}
				/>
				<CameraRig />
				<Particles count={1800} isDark={isDark} />
				<TorusKnot isDark={isDark} />
			</Canvas>
		</div>
	);
};

export default ThreeBackground;
