import React from "react";
import { MenuArrow } from "../icon";

const ConsentBtn = ({ children, callback, onClick, ...props }: any) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (callback) {
      callback(e);
    }
    if (onClick) {
      // Persist the event if needed in case onClick uses it after delay
      if (e.persist) e.persist();
      setTimeout(() => {
        onClick(e);
      }, 400);
    }
  };
  return (
    <button onClick={handleClick} {...props}>
      <span>
        {children}
        <div className="wallet-item__title__arrow">
          <MenuArrow />
        </div>
      </span>
    </button>
  );
};

export default ConsentBtn;
