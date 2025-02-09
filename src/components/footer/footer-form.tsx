"use client";

import FooterInput from "../subscribe-input/footer-input";

import { useNewsletterForm } from "@/hooks/useNewsletterForm";

import SubmitCta from "../button/submit-cta";
import FormStatusBar from "./form-status-bar";

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
          <SubmitCta isSubmitting={isSubmitting} />
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
