"use client";

import FooterInput from "../subscribe-input/footer-input";

import { useNewsletterForm } from "@/hooks/useNewsletterForm";

const FooterForm = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    // showSuccessMessage,
    // isCaptchaError,
  } = useNewsletterForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="footer__form__bottom">
      <div className="footer__form__input">
        <FooterInput
          type="email"
          register={register("email")}
          placeholder="E-Mail"
        />
      </div>
      <div className="footer__form__cta">
        <button>Subscribe</button>
      </div>
    </form>
  );
};

export default FooterForm;
