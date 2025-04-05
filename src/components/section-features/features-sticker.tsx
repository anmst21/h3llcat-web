"use client";
import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  animate,
  AnimationPlaybackControls,
} from "framer-motion";
import FeaturesSticker from "../icon/FeaturesSticker";

// Preserved AnimatedSticker component
const AnimatedSticker = () => {
  const rotate = useMotionValue(0);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);

  const startRotation = (duration: number): void => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
    animationRef.current = animate(rotate, 360, {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
    });
  };

  useEffect(() => {
    startRotation(30);
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, []);

  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        rotate,
      }}
      onHoverStart={() => startRotation(50)} // Slow down on hover
      onHoverEnd={() => startRotation(30)} // Return to normal when not hovered
    >
      <FeaturesSticker />
    </motion.div>
  );
};

// Tilt card that wraps the AnimatedSticker
const TiltCardWithSticker = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Combine the tilt transforms into one style
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg) translateX(-50%) translateY(-50%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate tilt values based on mouse position
    const tiltX = (mouseY / height - 0.5) * 32.5 * -1;
    const tiltY = (mouseX / width - 0.5) * 32.5;
    x.set(tiltX);
    y.set(tiltY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="section-features__sticker"
      onMouseLeave={handleMouseLeave}
      style={{
        width: "350px",
        height: "350px",
        borderRadius: "1000px",
        background: "linear-gradient(to bottom right, #0232F8, #050915)",
        transformStyle: "preserve-3d",
        transform,
        position: "absolute",
        margin: "50px auto", // centers the card with some top margin
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px",
          bottom: "20px",
          //   background: "#0232F8",
          //   borderRadius: "12px",
          // boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          transform: "translateZ(75px)",
        }}
      >
        <AnimatedSticker />
      </div>
    </motion.div>
  );
};

export default TiltCardWithSticker;
