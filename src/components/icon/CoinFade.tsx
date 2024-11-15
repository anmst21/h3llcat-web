import React from "react";
import { useState, useEffect } from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g clipPath="url(#clip0_1965_10748)">
        <rect width="24" height="24" fill="currentColor" rx="12"></rect>
        <circle
          cx="13"
          cy="11"
          r="13"
          fill="url(#paint0_radial_1965_10748)"
        ></circle>
        <circle
          cx="24"
          cy="6"
          r="12"
          fill="url(#paint1_radial_1965_10748)"
        ></circle>
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_1965_10748"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 13 -13 0 13 11)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.797" stopColor={"#0F0E1B"}></stop>
          <stop offset="1" stopColor={"#0F0E1B"} stopOpacity="0"></stop>
        </radialGradient>
        <radialGradient
          id="paint1_radial_1965_10748"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(0 12 -12 0 24 6)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={"#889697"}></stop>
          <stop offset="1" stopColor={"#889697"} stopOpacity="0"></stop>
        </radialGradient>
        <clipPath id="clip0_1965_10748">
          <rect width="24" height="24" fill="#fff" rx="12"></rect>
        </clipPath>
      </defs>
    </svg>
  );
}

//F7F7F7

export default Icon;
