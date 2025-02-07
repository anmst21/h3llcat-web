"use client";

import FooterInput from "../subscribe-input/footer-input";

import { useNewsletterForm } from "@/hooks/useNewsletterForm";
import { FormSuccess, FormError } from "../icon";
import { AnimatePresence, motion } from "framer-motion";

const FooterForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    showSuccessMessage,
    isCaptchaError,
    isSubmitting,
    disableError,
  } = useNewsletterForm();

  const props = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.3 },
  };

  // const isCaptchaError = true;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="footer__form__bottom">
      <div className="footer__form__container">
        <div className="footer__form__input">
          <FooterInput
            type="email"
            register={register("email")}
            placeholder="E-Mail"
          />
        </div>
        <div className="footer__form__cta">
          <AnimatePresence mode="wait">
            <button disabled={isSubmitting} type="submit">
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
        </div>
      </div>
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
            <div
              className={"footer__form__success footer__form__success--error"}
            >
              Capcha Error <FormError />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
};

export default FooterForm;
