"use client";

import { useNewsletterForm } from "@/hooks/useNewsletterForm";

const SubscribeInput = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    // showSuccessMessage,
    // isCaptchaError,
  } = useNewsletterForm();

  return (
    <div className="subscribe-field">
      <span>Receive updates from the Display's team to your inbox</span>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          className="subscribe-field__input"
        >
          <label
          // className={classNames("form-input", {
          //   "form-input--error": isError,
          // })}
          >
            {/* {formIcon} */}

            <input
              className="form-input__input"
              type="email"
              {...register("email")}
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
