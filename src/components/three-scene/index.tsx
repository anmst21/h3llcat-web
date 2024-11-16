"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 40);
    camera.lookAt(0, 10, 0);

    // Initialize the renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Helper function to load, position, and scale FBX objects
    const loadFBXObject = (
      path: string,
      x: number,
      y: number,
      z: number,
      scaleFactor: number,
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
        },
        (xhr) => {
          console.log(`FBX Model Loaded: ${(xhr.loaded / xhr.total) * 100}%`);
        },
        (error) => {
          console.error("Error loading FBX model:", error);
        }
      );
    };

    // Left/Right X
    // Up/Down Y
    // Near/Far Z

    // Load and place objects with specific positions and scales
    loadFBXObject("/assets/three/Cone.fbx", -4, 10, 0, 0.01);
    loadFBXObject("/assets/three/Ico.fbx", -3, 15, 0, 0.01);
    loadFBXObject("/assets/three/Sphere.fbx", 6, 10, 0, 0.01);
    //loadFBXObject("/assets/three/Cube.fbx", 1, 10, 2, 0.01);
    // loadFBXObject("/assets/three/Cylinder.fbx", 10, -10, -10, 0.01);

    // Add a GridHelper
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // Add Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
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
