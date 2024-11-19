import Link from "next/link";
import classNames from "classnames";
import { BtnRoundedType } from "./types";

interface BtnRoundedProps {
  type: BtnRoundedType;
  content: string;
  href: string;
  icon?: React.JSX.Element;
  top?: boolean;
}

const BtnRounded: React.FC<BtnRoundedProps> = ({
  type,
  content,
  href,
  icon,
  top,
}) => {
  return (
    <Link
      className={classNames("btn-rounded", {
        "btn-rounded--accent": type === BtnRoundedType.accent,
        "btn-rounded--active": type === BtnRoundedType.active,
        "btn-rounded--disabled": type === BtnRoundedType.disabled,
        "btn-rounded--top": top,
      })}
      href={href}
    >
      <span>{content}</span>
      {icon && icon}
    </Link>
  );
};

export default BtnRounded;
