import { HTMLInputTypeAttribute } from "react";
import { ContactsMail } from "../icon";
import { SubscribeFormSchema } from "./subscribe-form-schema";
import { UseFormRegister } from "react-hook-form";

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
      <ContactsMail />
    </label>
  );
};

export default FooterInput;
