"use client";

import { useNewsletterForm } from "@/hooks/useNewsletterForm";
import FooterInput from "./footer-input";
import FormStatusBar from "../footer/form-status-bar";
import SubmitCta from "../button/submit-cta";

function BlogForm() {
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
    <form onSubmit={handleSubmit(onSubmit)} className="subscribe-field__input">
      <FooterInput
        type="email"
        register={register("email")}
        placeholder="example@display.app"
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
  );
}

export default BlogForm;
