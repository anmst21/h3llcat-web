"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeUser } from "@/actions/subscribe";
import {
  SubscribeFormSchema,
  subscribeFormSchema,
} from "@/components/subscribe-input/subscribe-form-schema";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface NewsletterFormHook extends UseFormReturn<SubscribeFormSchema> {
  onSubmit: (data: SubscribeFormSchema) => Promise<void>;
  showSuccessMessage: boolean;
  isCaptchaError: boolean;
}

export function useNewsletterForm(): NewsletterFormHook {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isCaptchaError, setIsCaptchaError] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const formMethods = useForm<SubscribeFormSchema>({
    resolver: zodResolver(subscribeFormSchema),
  });

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("yourAction");
    return token;
    // Do whatever you want with the token
  }, [executeRecaptcha]);

  const { handleSubmit, reset, register, ...rest } = formMethods;

  const onSubmit = async (data: SubscribeFormSchema) => {
    // Replace "kek" with your actual token logic or reCaptcha verification
    try {
      const token = await handleReCaptchaVerify();
      // const token = "kek";
      console.log(token);
      if (token) {
        const result = await subscribeUser(data, token);
        console.log(result);
        if (!result.success) {
          setIsCaptchaError(true);
          return;
        } else {
          setShowSuccessMessage(true);
          setIsCaptchaError(false);
        }
      } else {
        setIsCaptchaError(true);
        return;
      }
      reset();
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  return {
    register,
    handleSubmit,
    onSubmit,
    showSuccessMessage,
    isCaptchaError,
    reset,
    ...rest,
  };
}
