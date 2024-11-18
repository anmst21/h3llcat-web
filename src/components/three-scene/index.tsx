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
          uniform float iTime;
          varying vec3 vPosition;
          varying vec3 vNormal;
          varying vec2 vUv;
      
          float noise(vec3 p) {
            return sin(p.x * 1.0 + p.y * 3.0 + p.z * 1.0 + iTime) * 0.5 + 0.5;
          }
      
          void main() {
            vUv = uv;
            vec3 distortedPosition = position + normal * noise(position + sin(iTime)) * 0.5;
            vPosition = distortedPosition;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(distortedPosition, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec2 iResolution;
          uniform float iTime;

          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;

          float opSmoothUnion(float d1, float d2, float k) {
              float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
              return mix(d2, d1, h) - k * h * (1.0 - h);
          }

          float sdSphere(vec3 p, float s) {
              return length(p) - s;
          }

          float map(vec3 p) {
              float d = 2.0;
              for (int i = 0; i < 16; i++) {
                  float fi = float(i);
                  float time = iTime * (fract(fi * 412.531 + 0.513) - 0.5) * 2.0;
                  d = opSmoothUnion(
                      sdSphere(p + sin(time + fi * vec3(52.5126, 64.62744, 632.25)) * vec3(2.0, 2.0, 0.8), mix(0.5, 1.0, fract(fi * 412.531 + 0.5124))),
                      d,
                      0.4
                  );
              }
              return d;
          }

          vec3 calcNormal(in vec3 p) {
              const float h = 1e-5;
              const vec2 k = vec2(1, -1);
              return normalize(
                  k.xyy * map(p + k.xyy * h) +
                  k.yyx * map(p + k.yyx * h) +
                  k.yxy * map(p + k.yxy * h) +
                  k.xxx * map(p + k.xxx * h)
              );
          }

          void main() { 
              vec2 uv = vUv;

              vec3 rayOri = vec3((uv - 0.5) * vec2(iResolution.x / iResolution.y, 1.0) * 6.0, 3.0);
              vec3 rayDir = vec3(0.0, 0.0, -1.0);

              float depth = 0.0;
              vec3 p;

              for (int i = 0; i < 64; i++) {
                  p = rayOri + rayDir * depth;
                  float dist = map(p);
                  depth += dist;
                  if (dist < 1e-6) {
                      break;
                  }
              }

              depth = min(6.0, depth);
              vec3 n = calcNormal(p);
              float b = max(0.0, dot(n, vec3(0.577)));
              vec3 col = (0.5 + 0.5 * cos((b + iTime * 3.0) + uv.xyx * 700.0 + vec3(0, 2, 4))) * (0.85 + b * 0.35);
              // orig
              // vec3 col = (0.5 + 0.5 * cos((b + iTime * 3.0) + uv.xyx * 2.0 + vec3(0, 2, 4))) * (0.85 + b * 0.35);
              col *= exp(-depth * 0.15);

              gl_FragColor = vec4(col, 1.0 - (depth - 0.5) / 2.0);
          }
        `,
        uniforms: {
          iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
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
        <AnimatedFBX path="/assets/three/Sphere.fbx" position={[-10, 18, 0]} scaleFactor={0.013}/>
        <AnimatedFBX path="/assets/three/Sphere.fbx" position={[-13, 1, 0]} scaleFactor={0.017}/>
        <AnimatedFBX path="/assets/three/Sphere.fbx" position={[7, 11, 0]} scaleFactor={0.017}/>
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
