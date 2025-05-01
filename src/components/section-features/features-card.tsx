"use client";

import classNames from "classnames";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import Lottie from "lottie-react";

type Props = {
  item: {
    header: string;
    paragraph: string;
    animation: unknown;
  };
  index: number;
  activeItemIndex: number | null;
  setActiveItemIndex: Dispatch<SetStateAction<number | null>>;
};

const FeaturesCards = ({
  item,
  index,
  setActiveItemIndex,
  activeItemIndex,
}: Props) => {
  const num = index + 1;
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });
  const scale = useMotionValue(1);

  // Combine tilt and scale into one transform
  const transform = useMotionTemplate`
    scale(${scale})
    rotateX(${xSpring}deg)
    rotateY(${ySpring}deg)
    translateZ(75px)
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate tilt values based on mouse position
    const tiltX = (mouseY / height - 0.5) * 16 * -1;
    const tiltY = (mouseX / width - 0.5) * 16;
    x.set(tiltX);
    y.set(tiltY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const setActive = useCallback(
    (id: number | null) => {
      setActiveItemIndex(id);
    },
    [setActiveItemIndex]
  );

  // Animate scale on hover start/end
  const handleHoverStart = () => {
    setActive(index);
    animate(scale, 1.2, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleHoverEnd = () => {
    setActive(null);

    // animate(scale, 1, { type: "spring", stiffness: 300, damping: 30 });
  };

  useEffect(() => {
    if (activeItemIndex !== null && activeItemIndex + 1 === num) {
      animate(scale, 1.2, { type: "spring", stiffness: 300, damping: 30 });
    } else {
      animate(scale, 1, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [activeItemIndex, num, scale]);

  const isActive = activeItemIndex === index;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        handleHoverEnd();
      }}
      onMouseEnter={handleHoverStart}
      style={{
        transformStyle: "preserve-3d",
        transform,
        zIndex: 50,
      }}
      key={index}
      className={classNames("section-features__grid__item", {
        "section-features__grid__item--1": num === 1,
        "section-features__grid__item--2": num === 2,
        "section-features__grid__item--3": num === 3,
        "section-features__grid__item--4": num === 4,
        "section-features__grid__item--5": num === 5,
        "section-features__grid__item--6": num === 6,
        "section-features__grid__item--active-on-top":
          (activeItemIndex !== null &&
            num === 4 &&
            activeItemIndex + 1 === 1) ||
          (activeItemIndex !== null && num === 6 && activeItemIndex + 1 === 3),
        "section-features__grid__item--active-under":
          (activeItemIndex !== null &&
            num === 1 &&
            activeItemIndex + 1 === 4) ||
          (activeItemIndex !== null && num === 3 && activeItemIndex + 1 === 6),
        "section-features__grid__item--hover":
          activeItemIndex !== null && activeItemIndex + 1 === num,
      })}
    >
      <div className="top-left-corner">
        <div className="card-circle" />
      </div>
      <div className="top-mid-section"></div>
      <div className="top-right-corner">
        <div className="card-circle" />
      </div>

      <div className="mid-left-side"></div>
      <div className="mid-center-section">
        <motion.div
          style={{ width: 270, height: 182 }}
          animate={{ opacity: isActive ? 1 : 0.3 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Lottie
            style={{ display: "flex", width: 270, height: 182 }}
            animationData={item.animation}
            loop
            autoPlay
          />
        </motion.div>
      </div>
      <div className="mid-right-side"></div>

      <div className="bot-left-corner">
        <div className="card-circle" />
      </div>
      <div className="bot-center-section">
        <h4>{item.header}</h4>
        <p>{item.paragraph}</p>
      </div>
      <div className="bot-right-corner">
        <div className="card-circle" />
      </div>
    </motion.div>
  );
};

export default FeaturesCards;
