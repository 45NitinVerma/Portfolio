import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Starfield({ isDark }) {
	const count = 3000;
	const positions = useMemo(() => {
		const positions = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			const theta = 2 * Math.PI * Math.random();
			const phi = Math.acos(2 * Math.random() - 1);
			const radius = 20 + Math.random() * 50;

			positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = radius * Math.cos(phi);
		}
		return positions;
	}, [count]);

	const pointsRef = useRef();

	useFrame((state) => {
		if (pointsRef.current) {
			pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
			pointsRef.current.rotation.x = state.clock.elapsedTime * 0.005;
		}
	});

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={positions.length / 3}
					array={positions}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				size={0.12}
				color={isDark ? "#818cf8" : "#6366f1"}
				transparent
				opacity={isDark ? 0.35 : 0.25}
				sizeAttenuation
				depthWrite={false}
			/>
		</points>
	);
}

function Nebula({ isDark }) {
	const count = 40;
	const groupRef = useRef();
	
	const clouds = useMemo(() => {
		const arr = [];
		for(let i=0; i<count; i++) {
			arr.push({
				position: [
					(Math.random() - 0.5) * 60,
					(Math.random() - 0.5) * 60,
					(Math.random() - 0.5) * 20 - 15
				],
				scale: 5 + Math.random() * 15,
				opacity: Math.random() * (isDark ? 0.4 : 0.15)
			});
		}
		return arr;
	}, [count, isDark]);

	useFrame((state) => {
		if(groupRef.current) {
			groupRef.current.rotation.z = state.clock.elapsedTime * 0.02;
		}
	});

	// Create a soft glowing radial texture procedurally
	const texture = useMemo(() => {
		const canvas = document.createElement('canvas');
		canvas.width = 64;
		canvas.height = 64;
		const context = canvas.getContext('2d');
		const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
		gradient.addColorStop(0, 'rgba(255,255,255,1)');
		gradient.addColorStop(1, 'rgba(255,255,255,0)');
		context.fillStyle = gradient;
		context.fillRect(0, 0, 64, 64);
		const tex = new THREE.CanvasTexture(canvas);
		return tex;
	}, []);

	return (
		<group ref={groupRef}>
			{clouds.map((cloud, i) => (
				<mesh key={i} position={cloud.position} scale={cloud.scale}>
					<planeGeometry args={[1, 1]} />
					<meshBasicMaterial 
						map={texture}
						color={i % 2 === 0 ? (isDark ? "#818cf8" : "#6366f1") : (isDark ? "#60a5fa" : "#3b82f6")}
						transparent 
						opacity={cloud.opacity}
						depthWrite={false}
						blending={THREE.AdditiveBlending}
					/>
				</mesh>
			))}
		</group>
	);
}

const Background = () => {
	const isDark = document.documentElement.classList.contains("dark");
	const bgColor = isDark ? "#0b0b0c" : "#fafafa";
	
	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				zIndex: -1,
				background: bgColor,
				transition: "background 0.5s ease"
			}}
		>
			<Canvas
				camera={{ position: [0, 0, 5], fov: 75 }}
				dpr={[1, 1.5]}
				gl={{ antialias: false, alpha: true }}
			>
				<fog attach="fog" args={[bgColor, 40, 80]} />
				<Starfield isDark={isDark} />
				<Nebula isDark={isDark} />
			</Canvas>
			{/* Subtly overlay noise */}
			<div className="noise-overlay" />
		</div>
	);
};

export default Background;
