"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const objects: THREE.Object3D[] = []; // Store objects for animation

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      10,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 20, 150);
    camera.lookAt(0, 10, 0);

    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Helper function to load, position, scale, and add objects to the animation list
    const loadFBXObject = (
      path: string,
      x: number,
      y: number,
      z: number,
      scaleFactor: number
    ) => {
      const loader = new FBXLoader();
      loader.load(
        path,
        (object: any) => {
          object.traverse((child: any) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              (mesh.material as THREE.Material).transparent = true;
            }
          });

          console.log("Loaded object:", object);

          // Set position and scale
          object.position.set(x, y, z);
          object.scale.set(scaleFactor, scaleFactor, scaleFactor);

          scene.add(object);
          objects.push(object); // Add object to the array for rotation
        },
        (xhr) => {
          console.log(`FBX Model Loaded: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        (error) => {
          console.error("Error loading FBX model:", error);
        }
      );
    };

    // Load objects with specific positions and scales
    loadFBXObject("/assets/three/Cone.fbx", -4, 10, 0, 0.01); // Cone
    loadFBXObject("/assets/three/Ico.fbx", 0, 10, 0, 0.01); // Ico
    loadFBXObject("/assets/three/Sphere.fbx", 4, 10, 0, 0.01); // Sphere

    // Add a GridHelper
    const gridHelper = new THREE.GridHelper(30, 30);
    scene.add(gridHelper);

    // Add Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 100);
    pointLight1.position.set(3, 20, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 100);
    pointLight2.position.set(-3, 0, -5);
    scene.add(pointLight2);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate each object around its own Y-axis
      objects.forEach((obj) => {
        obj.rotation.y += 0.01; // Rotate about Y-axis
      });

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default ThreeScene;
