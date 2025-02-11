"use client";

import { useNewsletterForm } from "@/hooks/useNewsletterForm";
import SubmitCta from "../button/submit-cta";
import FormStatusBar from "../footer/form-status-bar";
import FooterInput from "./footer-input";

const SubscribeInput = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    disableError,
    showSuccessMessage,
    isCaptchaError,
    isSubmitting,
  } = useNewsletterForm();
  return (
    <div className="subscribe-field">
      <span className="subscribe-field__header">
        Subscribe to Display's newsletter
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="subscribe-field__input"
      >
        <FooterInput
          type="email"
          register={register("email")}
          placeholder="E-Mail"
        />
        <div className="subscribe-field__cta">
          <FormStatusBar
            disableError={disableError}
            showSuccessMessage={showSuccessMessage}
            isCaptchaError={isCaptchaError}
          />
          <SubmitCta isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default SubscribeInput;
