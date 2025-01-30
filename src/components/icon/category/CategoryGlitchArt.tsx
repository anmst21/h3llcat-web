import React from "react";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <rect width="24" height="24" fill="#2BA661" rx="6"></rect>
      <path
        fill="#fff"
        d="M8.458 4.917H12l3.541 3.542V12L12 8.46 8.458 4.917z"
      ></path>
      <path
        fill="#fff"
        d="M8.458 8.459H12L8.458 12l-3.542 3.542V12L8.459 8.46z"
      ></path>
      <path
        fill="#fff"
        d="M8.458 15.542V12L12 15.542l3.541 3.542H12l-3.542-3.542zM15.541 15.542H12L15.54 12l3.542-3.541V12l-3.541 3.542zM15.541 15.542v3.542h3.542v-3.542h-3.541zM8.458 15.542H4.916v3.542h3.542v-3.542zM8.458 8.459H4.916V4.917h3.542v3.542zM19.083 8.459h-3.541V4.917h3.541v3.542z"
      ></path>
    </svg>
  );
};

export default BaseIcon;
