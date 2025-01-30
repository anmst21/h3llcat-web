import React from "react";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <rect width={size} height={size} fill="#FF6E3C" rx="6"></rect>
      <path
        fill="#fff"
        d="M12 12V8.46l3.541-3.542h3.542v3.542L15.542 12H12zM12 15.542V12H8.458L12 8.46 8.458 4.917H4.916V12h3.542l-3.542 3.542v3.542h3.542L12 15.542zM12 15.542l3.541 3.542h3.542V12h-3.541L12 15.542z"
      ></path>
    </svg>
  );
};

export default BaseIcon;
