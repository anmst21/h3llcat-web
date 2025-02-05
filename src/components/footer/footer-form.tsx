"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SubscribeFormSchema,
  subscribeFormSchema,
} from "../subscribe-input/subscribe-form-schema";
import FooterInput from "../subscribe-input/footer-input";
import { subscribeUser } from "@/actions/subscribe";

const FooterForm = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isCapchaError, setIsCapchaError] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    // formState: { errors, isSubmitted },
  } = useForm<SubscribeFormSchema>({
    resolver: zodResolver(subscribeFormSchema),
  });

  const onSubmit = async (data: SubscribeFormSchema) => {
    //  const token = await handleReCaptchaVerify();
    const token = "kek";
    if (token) {
      const form = await subscribeUser(data, token);

      if (!form.success) {
        setIsCapchaError(true);

        return;
      } else {
        setShowSuccessMessage(true);
        setIsCapchaError(false);
      }
    } else {
      setIsCapchaError(true);
      return;
    }

    reset();
  };

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
