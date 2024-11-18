"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useFBX } from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath"; // For smooth damping

function AnimatedFBX({ path, position, scaleFactor }: {
  path: string;
  position: [number, number, number];
  scaleFactor: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const fbx = useFBX(path);
  const dummy = new THREE.Object3D(); // Temporary object for easing

  fbx.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.material = new THREE.ShaderMaterial({
        vertexShader: `
          uniform float time;
          varying vec3 vPosition;
          varying vec3 vNormal;
    
          float noise(vec3 p) {
            return sin(p.x * 1.0 + p.y * 3.0 + p.z * 1.0 + time) * 0.8 + 0.5;
          }
    
          void main() {
            vec3 distortedPosition = position + normal * noise(position + time) * 0.1;
            vPosition = distortedPosition;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vPosition;
          varying vec3 vNormal;
          
          void main() {
              float stripePattern = sin(vPosition.x * 20.0 + time * 2.0);
          
              vec3 color = mix(vec3(0.0, 0.5, 1), vec3(0.0, 0.0, 0.0), step(0.8, stripePattern));
          
              float lighting = dot(vNormal, vec3(0.0, 1.0, 0.5)) * 0.5 + 0.5;
              color *= lighting;
          
              gl_FragColor = vec4(color, 1.0);
          }
        `,
        uniforms: {
          time: { value: 0.0 },
        },
      });
    }
  });

  useFrame((state, dt) => {
    if (groupRef.current) {
      // Rotate on Y-axis
      groupRef.current.rotation.y += 0.01;

      // Make the object look at the mouse position
      const x = state.pointer.x * 10; // Scale mouse.x for scene space
      const y = state.pointer.y * 10; // Scale mouse.y for scene space
      dummy.lookAt(x, y, 1);

      // Smoothly interpolate the rotation of the group to match the dummy's rotation
      easing.dampQ(groupRef.current.quaternion, dummy.quaternion, 0.1, dt);

      // Update uniform time for the shader
      fbx.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          (mesh.material as THREE.ShaderMaterial).uniforms.time.value =
            state.clock.elapsedTime;
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
    // Make the camera look at (0, 10, 0)
    camera.lookAt(0, 10, 0);
  });

  return null; // No visual component, only logic
}

function Scene() {
  return (
    <>
      {/*No light but shader*/}
      {/* Ambient Light */}
      {/*<ambientLight intensity={1} color={[1, 1, 1]} />*/}
      {/* Directional Lights */}
      {/*<pointLight position={[3, 20, 5]} intensity={1} />*/}
      {/*<pointLight position={[-3, 0, -5]} intensity={1} />*/}

      {/* FBX Objects */}
      <AnimatedFBX path="/assets/three/Cube.fbx" position={[-7, 19, 0]} scaleFactor={0.011} />
      <AnimatedFBX path="/assets/three/Ico.fbx" position={[-4, 4, 0]} scaleFactor={0.015} />
      <AnimatedFBX path="/assets/three/Sphere.fbx" position={[6, 11, 0]} scaleFactor={0.015} />
      {/* Grid Helper */}
      {/*<gridHelper args={[30, 30]} />*/}
      {/* Camera LookAt Logic */}
      <CameraLookAt />
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
