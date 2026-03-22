import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, RoundedBox, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import profileImg from "../assets/icons/profile.png";

/* ─── Floating, tilting glass panel ──────────────────────── */
function GlassPanel({ isDark }) {
	const groupRef = useRef();
	const meshRef = useRef();
	const [hovered, setHovered] = useState(false);

	// Mouse tracking for tilt
	// Use state or ref for smoothed mouse position to avoid jerky movement
	const targetRot = useRef({ x: 0, y: 0 });

	useFrame((state, delta) => {
		// 1. Slow up/down floating motion
		const t = state.clock.getElapsedTime();
		if (groupRef.current) {
			groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
			// Very subtle idle rotation if not hovered
			if (!hovered) {
				targetRot.current.x = Math.sin(t * 0.5) * 0.05;
				targetRot.current.y = Math.cos(t * 0.4) * 0.05;
			}
		}

		// 2. Mouse tracking
		if (hovered && groupRef.current) {
			// Calculate standard mouse coords (-1 to 1) based on pointer
			const mx = (state.pointer.x * Math.PI) / 8; // max tilt angle
			const my = -(state.pointer.y * Math.PI) / 8;

			// Smooth damp towards target
			targetRot.current.x += (my - targetRot.current.x) * 0.1;
			targetRot.current.y += (mx - targetRot.current.y) * 0.1;
		} else {
            // return to idle rotation
            targetRot.current.x += (Math.sin(t * 0.5) * 0.05 - targetRot.current.x) * 0.05;
            targetRot.current.y += (Math.cos(t * 0.4) * 0.05 - targetRot.current.y) * 0.05;
        }

		if (groupRef.current) {
			groupRef.current.rotation.x = targetRot.current.x;
			groupRef.current.rotation.y = targetRot.current.y;
		}
	});

    // Glass material parameters
    // We want high transmission, low roughness, and a slight tint
	const materialProps = {
		transmission: 0.95, // high transmission for glass
		opacity: 1,
		transparent: true,
		roughness: 0.15, // slight blur
		ior: 1.5,
		thickness: 0.2,
		color: isDark ? "#111111" : "#ffffff",
		specularIntensity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
	};

	return (
		<group 
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
			{/* Glass Mesh */}
			<RoundedBox ref={meshRef} args={[3.6, 2.4, 0.05]} radius={0.1} smoothness={8}>
				<meshPhysicalMaterial {...materialProps} />
			</RoundedBox>

			{/* UI Content inside the glass panel */}
			<Html
				transform
				occlude="blending"
				position={[0, 0, 0.03]} // slightly in front of the glass
				style={{
					width: "340px",
					height: "220px",
                    background: isDark ? "rgba(10, 10, 10, 0.6)" : "rgba(255, 255, 255, 0.5)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
					borderRadius: "14px",
					border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
					padding: "20px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					color: isDark ? "#ffffff" : "#000000",
					userSelect: "none",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
				}}
			>
                {/* Minimal premium UI representation */}
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<div style={{ fontSize: "14px", fontWeight: "600", letterSpacing: "-0.02em" }}>Nitin Verma</div>
					<div 
						style={{ 
							width: "40px", 
							height: "40px", 
							borderRadius: "50%", 
							overflow: "hidden", 
							border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
							boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
						}}
					>
						<img 
							src={profileImg} 
							alt="Nitin Verma" 
							style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} 
						/>
					</div>
				</div>
                
                <div style={{ padding: "10px 0" }}>
                    <div style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px", lineHeight: "1.2" }}>
                        Crafting digital<br/>experiences.
                    </div>
                    <div style={{ fontSize: "10px", opacity: 0.6, maxWidth: "200px" }}>
                        Interactive interfaces, scalable systems, and premium web design.
                    </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{ flex: 1, height: "32px", background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.05)", borderRadius: "6px" }} />
                    <div style={{ width: "32px", height: "32px", background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.05)", borderRadius: "6px" }} />
                </div>
			</Html>
		</group>
	);
}

/* ─── Main Component ─────────────────────────────────────── */
export default function FloatingGlassPanel({ isDark }) {
	return (
		<div style={{ width: "100%", height: "100%", cursor: "grab", active: { cursor: "grabbing" } }}>
			<Canvas
				camera={{ position: [0, 0, 5], fov: 45 }}
				dpr={[1, 2]}
				gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
			>
				{/* Soft minimal lighting */}
				<ambientLight intensity={isDark ? 0.3 : 0.6} />
				<directionalLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 1.2} />
				<spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={isDark ? 0.5 : 0.8} />

				{/* Floating panel */}
				<GlassPanel isDark={isDark} />

				{/* Environment reflections (important for glass materials) */}
				<Environment preset="city" />

				{/* Soft shadow underneath */}
				<ContactShadows
					position={[0, -1.8, 0]}
					opacity={isDark ? 0.4 : 0.2}
					scale={8}
					blur={2.5}
					far={4}
				/>
			</Canvas>
		</div>
	);
}
