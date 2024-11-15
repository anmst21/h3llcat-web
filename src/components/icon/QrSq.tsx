import * as React from "react";

const SvgIcon = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 7 7"
  >
    <path
      stroke="#FC0"
      d="M2 .5h4.5V5A1.5 1.5 0 0 1 5 6.5H2A1.5 1.5 0 0 1 .5 5V2A1.5 1.5 0 0 1 2 .5Z"
    ></path>
    <path
      fill="#FC0"
      d="M2 3a1 1 0 0 1 1-1h2v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"
    ></path>
  </svg>
);

export default SvgIcon;
