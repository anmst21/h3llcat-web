export const arrowVariants = {
  initial: { opacity: 0, x: 24 },
  hover: { opacity: 1, x: 10, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 24 },
  active: { x: 15 },
};

export const textVariants = {
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
  initial: { opacity: 0, x: -10 },
  hover: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};
