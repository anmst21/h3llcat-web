const dynamicButtonVariant = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

export const dynamicButtonProps = {
  variants: dynamicButtonVariant,
  initial: "initial",
  animate: "animate",
  exit: "exit",
  transition: { duration: 0.3 },
} as const;

const variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 },
};

export const dynamicMintProps = {
  ...dynamicButtonProps,
  variants,
} as const;
