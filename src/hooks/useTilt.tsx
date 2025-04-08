import { useRef } from "react";
import {
  useMotionValue,
  useSpring,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";

interface UseTiltReturn {
  ref: React.RefObject<HTMLDivElement>;
  transform: MotionValue<string>;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave: () => void;
}

export const useTilt = (tiltValue: number): UseTiltReturn => {
  // Create a ref to attach to the target div
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for the tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smooth transitions
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Combine the tilt transforms into one motion string
  const transform = useMotionTemplate`
    rotateX(${xSpring}deg) 
    rotateY(${ySpring}deg) 
    translateX(-50%) 
    translateZ(75px)
  `;

  // Calculate tilt values based on mouse position relative to the element's bounding rect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    // Compute tilt based on the mouse position (adjust multiplier as needed)
    const tiltX = (mouseY / height - 0.5) * tiltValue * -1;
    const tiltY = (mouseX / width - 0.5) * tiltValue;

    x.set(tiltX);
    y.set(tiltY);
  };

  // Reset the tilt effect when the mouse leaves the element
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    transform,
    handleMouseMove,
    handleMouseLeave,
  };
};
