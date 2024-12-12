"use client";

import { useRef } from "react";
import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { Mesh } from "three";

export function Model(props: any) {
  const { nodes, materials } = useGLTF("/assets/icoDEFOL.glb");
  const { nodes: nodesStar, materials: materialsStar } =
    useGLTF("/assets/star.glb");
  const { nodes: nodesCube, materials: materialCube } =
    useGLTF("/assets/cube.glb");
  const { nodes: nodesKognac, materials: materialsKognac } =
    useGLTF("/assets/konyak.glb");

  const myMesh = useRef<Mesh>(null!);
  const starRef = useRef<Mesh>(null!);
  const kognacRef = useRef<Mesh>(null!);
  useFrame(({ clock }) => {
    myMesh.current.rotation.x = clock.getElapsedTime() / 2 / 4;
    myMesh.current.rotation.z = clock.getElapsedTime() / 3 / 4;
    myMesh.current.rotation.y = clock.getElapsedTime() / 0.5 / 4;

    starRef.current.rotation.x = clock.getElapsedTime() / 1.5 / 4;
    starRef.current.rotation.z = clock.getElapsedTime() / 1.2 / 4;
    starRef.current.rotation.y = clock.getElapsedTime() / 3 / 4;

    kognacRef.current.rotation.x = -clock.getElapsedTime() / 0.5 / 4;
    kognacRef.current.rotation.z = -clock.getElapsedTime() / 3 / 4;
    kognacRef.current.rotation.y = -clock.getElapsedTime() / 2 / 4;
  });

  return (
    <group position={[0, 0, 0]} castShadow {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodesCube.Cube as any).geometry}
        material={materialCube["Material.001"]}
        ref={kognacRef}
        scale={0.2}
        position={[0, 0, 0]}
      >
        <MeshTransmissionMaterial
          thickness={0.2}
          roughness={0}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.2}
          backside
          opacity={1}
          clearcoat={1}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodesKognac.Cube as any).geometry}
        material={materialsKognac["Material.001"]}
        ref={kognacRef}
        scale={0.7}
        position={[-1.5, -2, 0]}
      >
        <MeshTransmissionMaterial
          thickness={0.2}
          roughness={0}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.2}
          backside
          opacity={1}
          clearcoat={1}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Icosphere001 as any).geometry}
        material={materials["Material.001"]}
        // scale={0.586}
        position={[3.5, 2, -5]}
        ref={myMesh}
      >
        <MeshTransmissionMaterial
          thickness={0.2}
          roughness={0}
          transmission={1}
          ior={2}
          chromaticAberration={0.2}
          backside
          opacity={1}
          clearcoat={1}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodesStar.Icosphere as any).geometry}
        material={materialsStar["Material.001"]}
        position={[-2, 2, 0]}
        scale={5}
        ref={starRef}
      >
        <MeshTransmissionMaterial
          thickness={0.2}
          roughness={0}
          transmission={1}
          ior={2}
          chromaticAberration={0.2}
          backside
          opacity={1}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/assets/icoDEFOL.glb");
useGLTF.preload("/assets/star.glb");
useGLTF.preload("/assets/konyak.glb");

export default function AnimatedFBX() {
  // const groupRef = useRef<THREE.Group>(null);

  return (
    <Canvas style={{ width: "100%", height: "100%" }} shadows>
      <color attach="background" args={["#fc0"]} />
      <Environment preset="studio" />

      <ambientLight intensity={1} />
      <Suspense fallback={null}>
        <Model /> {/* Left */}
      </Suspense>
      <directionalLight intensity={2} position={[0, 2, 3]} />

      {/* <ContactShadows
        position={[0.8, -2.5, 0]}
        opacity={1}
        scale={20}
        blur={0.5}
        far={4.5}
      /> */}
    </Canvas>
  );
}
