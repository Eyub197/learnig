"use client";

import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import React from "react";
import { Group, PointLight } from "three";
import gsap from "gsap";

export default function Page() {
  const [groupRef, setGroupRef] = React.useState<Group | null>(null);
  const [lightRef, setLightRef] = React.useState<PointLight | null>(null);

  useGSAP(
    () => {
      if (!groupRef) return;
      if (!lightRef) return;

      gsap.from(groupRef.position, {
        y: -1,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(groupRef.rotation, {
        x: 0.5,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(lightRef, {
        intensity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      gsap.to(lightRef?.position, {
        x: -4,
        duration: 1.2,
        ease: "power2.out",
      });
    },
    { dependencies: [groupRef, lightRef] },
  );

  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black">
      <Canvas>
        <group ref={setGroupRef}>
          <Scene />
        </group>
        <pointLight ref={setLightRef} position={[10, 2, 2]} intensity={10} />
        <PerspectiveCamera makeDefault position={[0, 2, 6]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

function Scene() {
  const { scene } = useGLTF("/models/rover/source/Perseverance.glb");

  return <primitive object={scene} />;
}
