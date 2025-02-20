import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { props } from "../footer/animation";

type Props = {
  isSubmitting: boolean;
  contacts?: boolean;
  back?: boolean;
  callback?: () => void;
};

const SubmitCta = ({ isSubmitting, contacts, back, callback }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <button
        onClick={callback}
        className="email-submit"
        disabled={isSubmitting}
        type="submit"
      >
        <AnimatePresence mode="wait">
          {isSubmitting ? (
            <motion.span {...props} key="loading">
              Loading
            </motion.span>
          ) : (
            <motion.span {...props} key="submit">
              {contacts ? "Submit" : back ? "Go Back" : "Subscribe"}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </AnimatePresence>
  );
};

export default SubmitCta;
