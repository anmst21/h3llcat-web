import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MenuArrow } from "../icon";
import classNames from "classnames";

type Props = {
  title: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
  callback: () => void;
  buttonProps: any;
  isActive?: boolean;
};

const MenuItem = ({
  title,
  icon,
  value,
  href,
  callback,
  buttonProps,
  isActive,
}: Props) => {
  const router = useRouter();

  return (
    <motion.button
      {...buttonProps}
      onClick={() => {
        if (href) {
          router.push(href);
        }

        callback();
      }}
      className={classNames("wallet-item wallet-item--hover", {
        "wallet-item--active": isActive,
      })}
    >
      <div className="wallet-item__icon">{icon}</div>
      <div className="wallet-item__right">
        <div className="wallet-item__user">
          <div className="wallet-item__title">
            <span>{title}</span>
            <div className="wallet-item__title__arrow">
              <MenuArrow />
            </div>
          </div>
          <span className="wallet-item__address">{value}</span>
        </div>
      </div>
    </motion.button>
  );
};

export default MenuItem;
