"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { subscribeUser } from "@/actions/subscribe";
import {
  SubscribeFormSchema,
  subscribeFormSchema,
} from "@/components/subscribe-input/subscribe-form-schema";
import { submitBeta } from "@/actions/submit-beta";
import { usePrivy } from "@privy-io/react-auth";
import { UserData } from "./types";

interface NewsletterFormHook extends UseFormReturn<SubscribeFormSchema> {
  onSubmit: (data: SubscribeFormSchema) => Promise<void>;
  showSuccessMessage: boolean;
  isCaptchaError: boolean;
}

export function useBetaSubmit({
  setUserData,
}: {
  setUserData: (data: UserData) => void;
}): NewsletterFormHook {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [
    isCaptchaError,
    //  setIsCaptchaError
  ] = useState(false);

  const formMethods = useForm<SubscribeFormSchema>({
    resolver: zodResolver(subscribeFormSchema),
  });

  const { handleSubmit, reset, register, ...rest } = formMethods;

  const { getAccessToken } = usePrivy();

  const setData = useCallback(
    (data: UserData) => {
      setUserData(data);
    },
    [setUserData]
  );

  const onSubmit = async (data: SubscribeFormSchema) => {
    const accessToken = await getAccessToken();

    const token: UserData = await submitBeta(data, accessToken);
    setData(token);

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
