import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { FormError, FormSuccess } from "../icon";
import { props } from "./animation";

type Props = {
  disableError: () => void;
  showSuccessMessage: boolean;
  isCaptchaError: boolean;
};

const FormStatusBar = ({
  isCaptchaError,
  showSuccessMessage,
  disableError,
}: Props) => {
  return (
    <AnimatePresence mode="wait">
      {showSuccessMessage && !isCaptchaError && (
        <motion.button
          type="button"
          onClick={disableError}
          key="success"
          {...props}
          className="footer__form__state"
        >
          <div className="footer__form__success">
            Subscribed <FormSuccess />
          </div>
        </motion.button>
      )}
      {!showSuccessMessage && isCaptchaError && (
        <motion.button
          type="button"
          onClick={disableError}
          key="error"
          {...props}
          className="footer__form__state"
        >
          <div className={"footer__form__success footer__form__success--error"}>
            Capcha Error <FormError />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FormStatusBar;
