"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";

function AnimatedFBX({
  path,
  position,
  scaleFactor,
}: {
  path: string;
  position: [number, number, number];
  scaleFactor: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const originalFBX = useFBX(path);
  const fbx = originalFBX.clone();
  fbx.rotateZ(Math.random() * 100); // if object same
  fbx.rotateY(Math.random() * 0.5); // if object same
  const dummy = new THREE.Object3D(); // Temporary object for easing

  fbx.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.material = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 vUv; 
          void main() {
            vUv = uv; 
            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition; 
          }
        `,
        fragmentShader: `
          uniform vec2 iResolution;
          uniform float iTime;
          varying vec2 vUv;

          void main() { 
              vec2 uv = vUv;

              vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx * vec3(0.5, 0.8, 1.2));
              gl_FragColor = vec4(col, 1.0);
          }
        `,
        uniforms: {
          iResolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
          iTime: { value: 0.0 },
        },
      });
    }
  });

  useFrame((state, dt) => {
    if (groupRef.current) {
      // Rotate the object on Y-axis
      groupRef.current.rotation.y += 0.01;

      // Look at the mouse pointer
      const intensity = 0.5;
      const x = state.pointer.x * intensity; // Scaled for scene space
      const y = state.pointer.y * intensity;
      dummy.lookAt(x, y, 1);

      // Smoothly interpolate rotation to match dummy's rotation
      easing.dampQ(groupRef.current.quaternion, dummy.quaternion, 0.2, dt);

      // Update uniform time for the shader
      fbx.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          (mesh.material as THREE.ShaderMaterial).uniforms.iTime.value = state.clock.elapsedTime;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scaleFactor}>
      <primitive object={fbx} />
    </group>
  );
}

function CameraLookAt() {
  useFrame(({ camera }) => {
    // Make the camera look at the center of the scene
    camera.lookAt(0, 10, 0);
  });

  return null; // No visual component, only logic
}

function Scene() {
  return (
      <>
        {/* Ambient Light */}
        <ambientLight/>
        {/* Directional Lights */}
        <pointLight position={[3, 20, 5]} intensity={1}/>
        <pointLight position={[-3, 0, -5]} intensity={1}/>

        {/* FBX Objects */}
        <AnimatedFBX path="/assets/three/1.fbx" position={[-10, 18, 0]} scaleFactor={0.017}/>
        <AnimatedFBX path="/assets/three/2.fbx" position={[-11, 1, 0]} scaleFactor={0.017}/>
        <AnimatedFBX path="/assets/three/3.fbx" position={[11, 11, 0]} scaleFactor={0.017}/>
        {/* Grid Helper */}
        {/*<gridHelper args={[30, 30]} />*/}
        {/* Camera LookAt Logic */}
        <CameraLookAt/>
      </>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 10, 150], fov: 10 }}>
      <Scene />
    </Canvas>
  );
}
