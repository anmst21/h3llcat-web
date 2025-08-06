"use client";

import { useForm } from "react-hook-form";
import { formSchema, FormSchema } from "./form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormStatusBar from "../footer/form-status-bar";
import SubmitCta from "../button/submit-cta";
import { useCallback, useEffect, useState } from "react";
import { sendLetter } from "@/actions/send-letter";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ContactInput from "./contact-input";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckMark,
  ContactsMail,
  ContactsPhone,
  ContactsProfile,
  ContactsSubject,
  ContactsText,
} from "../icon";
import classNames from "classnames";
import { getCookieConsentValue } from "react-cookie-consent";

const ContactsForm = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isCaptchaError, setIsCaptchaError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cookieValue = getCookieConsentValue("cookieConsent");

  const {
    reset,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (cookieValue) {
      setValue("consent", true);
    }
  }, [cookieValue]);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    const token = await executeRecaptcha("yourAction");
    return token;
    // Do whatever you want with the token
  }, [executeRecaptcha]);

  const onSubmit = async (data: FormSchema) => {
    try {
      setIsSubmitting(true);
      const token = await handleReCaptchaVerify();
      // const token = "kek";
      //   console.log(token);
      if (token) {
        const result = await sendLetter(data, token);
        // console.log(result);
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
      console.error("err", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const disableError = useCallback(() => {
    setIsCaptchaError(false);
    setShowSuccessMessage(false);
  }, []);

  const errorsArray = Object.entries(errors);

  const getFirstErrorMessage = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const firstError = errorsArray.find(([_, value]) => value?.message);
    return firstError ? firstError[1].message : null;
  };

  const messageData = (() => {
    if (errorsArray.length > 0 && isSubmitted) {
      return {
        key: "error",
        text: getFirstErrorMessage(),
        className: "contact-form__status contact-form__status__error",
      };
    } else if (isCaptchaError) {
      return {
        key: "captcha",
        text: "Captcha error. Try again later, or message us directly through mail",
        className: "contact-form__status contact-form__status__error",
      };
    } else if (showSuccessMessage) {
      return {
        key: "success",
        text: "Successfully submitted form",
        className: "contact-form__status contact-form__status__success",
      };
    }
    return null;
  })();

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  useEffect(() => {
    if (isCaptchaError) {
      const timer = setTimeout(() => {
        setIsCaptchaError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isCaptchaError]);

  return (
    <form
      className="contacts-form blog-post-page__socials--submit"
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ContactInput
        icon={<ContactsProfile />}
        type="text"
        register={register("name")}
        placeholder={"Steve Jobs"}
        isError={!!errors.name}
      />
      <ContactInput
        icon={<ContactsMail />}
        type="email"
        register={register("email")}
        placeholder={"example@displaymint.app"}
        isError={!!errors.email}
      />
      <ContactInput
        icon={<ContactsPhone />}
        type="tel"
        register={register("phone")}
        placeholder={"+11234567890"}
        isError={!!errors.phone}
        optional
      />
      <ContactInput
        icon={<ContactsSubject />}
        register={register("subject")}
        type="subject"
        placeholder={"Subject"}
        isError={!!errors.subject}
        optional
      />
      <ContactInput
        icon={<ContactsText />}
        register={register("message")}
        type="subject"
        placeholder={"How can we help you?"}
        isError={!!errors.message}
        textArea
      />

      <label
        className={classNames("checkbox-container", {
          "checkbox-container--error": !!errors.consent,
        })}
      >
        Privacy consent
        <div className="check">
          <input type="checkbox" {...register("consent")} />
          <CheckMark />
        </div>
      </label>
      <p className="contacts-form__consent">
        I consent to my data being stored and used to contact me in response to
        my inquiry.
      </p>

      <AnimatePresence>
        {messageData && (
          <motion.p
            key={messageData.key}
            className={messageData.className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {messageData.text}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="subscribe-field__cta">
        <FormStatusBar
          contacts
          disableError={disableError}
          showSuccessMessage={showSuccessMessage}
          isCaptchaError={isCaptchaError}
        />
        <SubmitCta contacts isSubmitting={isSubmitting} />
      </div>
    </form>
  );
};

export default ContactsForm;
