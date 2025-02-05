"use client";

import { useState, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeUser } from "@/actions/subscribe";
import {
  SubscribeFormSchema,
  subscribeFormSchema,
} from "@/components/subscribe-input/subscribe-form-schema";

interface NewsletterFormHook extends UseFormReturn<SubscribeFormSchema> {
  onSubmit: (data: SubscribeFormSchema) => Promise<void>;
  showSuccessMessage: boolean;
  isCaptchaError: boolean;
}

export function useBetaSubmit(): NewsletterFormHook {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isCaptchaError, setIsCaptchaError] = useState(false);

  const formMethods = useForm<SubscribeFormSchema>({
    resolver: zodResolver(subscribeFormSchema),
  });

  const { handleSubmit, reset, register, ...rest } = formMethods;

  const onSubmit = async (data: SubscribeFormSchema) => {
    // // Replace "kek" with your actual token logic or reCaptcha verification
    // const token = "kek";
    // if (token) {
    //   const result = await subscribeUser(data, token);
    //   if (!result.success) {
    //     setIsCaptchaError(true);
    //     return;
    //   } else {
    //     setShowSuccessMessage(true);
    //     setIsCaptchaError(false);
    //   }
    // } else {
    //   setIsCaptchaError(true);
    //   return;
    // }
    reset();
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
