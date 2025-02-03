"use client";
import { subscribeUser } from "@/actions/subscribe";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  SubscribeFormSchema,
  subscribeFormSchema,
} from "./subscribe-form-schema";

const SubscribeInput = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isCapchaError, setIsCapchaError] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
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

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  return (
    <div className="subscribe-field">
      <span>Receive updates from the Display's team to your inbox</span>
      <div>
        <form method="POST" className="subscribe-field__input">
          <label
          // className={classNames("form-input", {
          //   "form-input--error": isError,
          // })}
          >
            {/* {formIcon} */}

            <input
              className="form-input__input"
              type="email"
              //   onChange={(e) => {
              //     onChange(e);
              //     handleInputChange(e);
              //   }}
              //   {...rest}
              placeholder="Email"
            />

            {/* {optional && !hasValue && <span>Optional</span>} */}
            <div className="form-input__underline" />
          </label>
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeInput;
