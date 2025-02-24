import { HTMLInputTypeAttribute } from "react";
import { FooterMail, ContactsMail } from "../icon";
import { SubscribeFormSchema } from "./subscribe-form-schema";
import { UseFormRegister } from "react-hook-form";
import classNames from "classnames";

interface FormInputProps {
  register: ReturnType<UseFormRegister<SubscribeFormSchema>>;
  type: HTMLInputTypeAttribute | "subject";
  placeholder: string;
  // isError: boolean;
  // optional?: boolean;
}

const FooterInput: React.FC<FormInputProps> = ({
  register,
  type,
  placeholder,
}) => {
  return (
    <label className="footer__form__input__label">
      <input {...register} type={type} placeholder={placeholder} />
      <FooterMail />
    </label>
  );
};

export default FooterInput;
