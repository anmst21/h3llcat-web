import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { props } from "../footer/animation";

type Props = {
  isSubmitting: boolean;
};

const SubmitCta = ({ isSubmitting }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <button className="email-submit" disabled={isSubmitting} type="submit">
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.span {...props} key="loading">
              Loading
            </motion.span>
          ) : (
            <motion.span {...props} key="submit">
              Subscribe
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </AnimatePresence>
  );
};

export default SubmitCta;
