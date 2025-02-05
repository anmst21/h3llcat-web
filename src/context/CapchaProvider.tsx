"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const CapchaProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPCHA_KEY as string}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};
