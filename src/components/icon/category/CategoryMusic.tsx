import React from "react";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <rect width="24" height="24" fill="#000" rx="6"></rect>
      <path fill="#fff" d="M12 4.917h7.083V12L12 4.917z"></path>
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M12 12V4.917H8.458L4.916 8.459v10.625h10.625l3.542-3.542V12H12zm0 0v7.084L4.917 12H12z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default BaseIcon;
