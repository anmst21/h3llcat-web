import { HTMLInputTypeAttribute, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormSchema } from "./form-schema";
import classNames from "classnames";

interface FormInputProps {
  register: ReturnType<UseFormRegister<FormSchema>>;
  type: HTMLInputTypeAttribute | "subject";
  placeholder: string;
  icon: React.ReactNode;
  isError: boolean;
  optional?: boolean;
  beta?: boolean;
  textArea?: boolean;
}

const FooterInput: React.FC<FormInputProps> = ({
  register,
  type,
  placeholder,
  icon,
  optional,
  textArea,
  isError,
  beta,
}) => {
  const [hasValue, setHasValue] = useState(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  console.log("has value", hasValue);
  const { onChange, ref: registerRef, ...rest } = register;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(event.target.value.length > 0);
  };

  const handleInput = () => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // const { ref: textAreaRef, ...rest } = register("message");

  return (
    <label
      className={classNames("footer__form__input__label", {
        "form-input--error": isError,
        "form-input--textarea": textArea,
        "form-input--optional": optional,
        "form-input--beta": beta,
      })}
    >
      <div className="form-input__wrapper">
        {textArea ? (
          <textarea
            ref={(e) => {
              ref.current = e;
              registerRef(e);
            }}
            onInput={handleInput}
            {...rest}
            placeholder={placeholder}
          />
        ) : (
          <input
            ref={registerRef}
            onChange={(e) => {
              onChange(e);
              handleInputChange(e);
            }}
            {...rest}
            type={type}
            placeholder={placeholder}
          />
        )}
        {optional && <span>Optional</span>}
      </div>
      {icon}
    </label>
  );
};

export default FooterInput;
