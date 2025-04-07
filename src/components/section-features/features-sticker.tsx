"use client";
import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useAnimation,
} from "framer-motion";
import FeaturesSticker from "../icon/FeaturesSticker";

// Preserved AnimatedSticker component

const AnimatedSticker = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: { duration: 30, ease: "linear", repeat: Infinity },
    });
    return () => controls.stop();
  }, [controls]);

  const handleHoverStart = () => {
    controls.start({
      rotate: 360,
      transition: { duration: 50, ease: "linear", repeat: Infinity },
    });
  };

  const handleHoverEnd = () => {
    controls.start({
      rotate: 360,
      transition: { duration: 30, ease: "linear", repeat: Infinity },
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        animate={controls}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        <FeaturesSticker />
      </motion.div>
    </div>
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
      onMouseLeave={handleMouseLeave}
      className="section-features__sticker"
      style={{
        transformStyle: "preserve-3d",
        width: "350px",
        transform,
        height: "350px",
        borderRadius: "1000px",
        background: "linear-gradient(to bottom right, #0232F8, #050915)",
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
