"use client";

import { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Mouse,
  MouseConstraint,
  Runner,
} from "matter-js";
import { errorStickers } from "@/helpers/error-stickers";

interface Sticker {
  uri: string;
  alt: string;
  width: number;
  height: number;
}

export default function FallingObjects(): JSX.Element {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const width = sceneRef.current?.clientWidth;
    const height = sceneRef.current?.clientHeight + 2000;
    const thickness = 50;

    // Create engine and world
    const engine = Engine.create();
    const { world } = engine;

    // Create renderer and attach it to the container
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    // Helper to create boundaries (ceiling, ground, left and right walls)
    const createBoundaries = () => {
      const ceiling = Bodies.rectangle(
        width / 2,
        -thickness / 2,
        width,
        thickness,
        { isStatic: true }
      );
      const ground = Bodies.rectangle(
        width / 2,
        height + thickness / 2,
        width,
        thickness,
        { isStatic: true }
      );
      const leftWall = Bodies.rectangle(
        -thickness / 2,
        height / 2,
        thickness,
        height,
        { isStatic: true }
      );
      const rightWall = Bodies.rectangle(
        width + thickness / 2,
        height / 2,
        thickness,
        height,
        { isStatic: true }
      );

      World.add(world, [ceiling, ground, leftWall, rightWall]);
    };

    // Helper to add sticker bodies with random positions
    const addStickers = () => {
      // Determine the scale factor based on screen width
      const scaleFactor = window.innerWidth < 750 ? 0.8 : 1.2;

      // Array to store timeout IDs for cleanup if needed
      const timeouts: number[] = [];

      errorStickers.forEach((sticker: Sticker, index: number) => {
        const timeoutId = window.setTimeout(() => {
          // Calculate scaled dimensions
          const stickerWidth = sticker.width * scaleFactor;
          const stickerHeight = sticker.height * scaleFactor;

          // Use the scaled dimensions for positioning
          const xPos =
            Math.random() * (width - stickerWidth) + stickerWidth / 2;
          // Limit y position to near the top of the screen using the scaled height
          const yPos = Math.random() * 100 + stickerHeight / 2;

          const body = Bodies.rectangle(
            xPos,
            yPos,
            stickerWidth,
            stickerHeight,
            {
              restitution: 0.5,
              friction: 0.5,
              render: {
                sprite: {
                  texture: sticker.uri,
                  // Scale the sprite accordingly
                  xScale: scaleFactor,
                  yScale: scaleFactor,
                },
              },
            }
          );
          World.add(world, body);
        }, index * 500); // Delay each sticker by 500ms

        timeouts.push(timeoutId);
      });

      // Optional: return timeouts if you want to clear them later during cleanup
      return timeouts;
    };

    // Helper to add mouse control for dragging objects
    const addMouseControl = () => {
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });
      World.add(world, mouseConstraint);
    };

    // Initialize the scene
    createBoundaries();
    addStickers();
    addMouseControl();

    // Run the engine and renderer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Cleanup on component unmount
    return () => {
      Render.stop(render);
      World.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        // right: 0,
        width: "100%",
        bottom: 0,
        zIndex: 0, // ensure canvas is below the overlay
        display: "flex",
        alignItems: "flex-end",
      }}
    />
  );
}
