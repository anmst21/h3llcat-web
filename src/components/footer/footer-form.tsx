"use client";

import FooterInput from "../subscribe-input/footer-input";

import { useNewsletterForm } from "@/hooks/useNewsletterForm";

import SubmitCta from "../button/submit-cta";
import FormStatusBar from "./form-status-bar";
import { MenuArrow } from "../icon";
import { motion } from "motion/react";

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

  const arrowVariants = {
    initial: { x: 0 },
    hover: { x: 3 }, // On hover, arrow moves right by 10 pixels.
    active: { x: 6 }, // On press, arrow moves further right by 20 pixels.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="footer__form__bottom">
      <div className="footer__form__container">
        <div className="footer__form__input">
          <FooterInput
            type="email"
            register={register("email")}
            placeholder="example@displaymint.app"
          />
        </div>
        <div className="footer__form__cta">
          <SubmitCta isSubmitting={isSubmitting} />
          <motion.div
            initial="initial"
            whileHover="hover"
            whileTap="active"
            className="arrow-btn"
            style={{ cursor: "pointer" }}
          >
            <motion.button
              type="submit"
              variants={arrowVariants}
              style={{ display: "flex" }}
            >
              <MenuArrow />
            </motion.button>
          </motion.div>
        </div>
      </div>
      <FormStatusBar
        disableError={disableError}
        showSuccessMessage={showSuccessMessage}
        isCaptchaError={isCaptchaError}
      />
    </form>
  );
};

export default FooterForm;
