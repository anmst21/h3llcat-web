import React from "react";

const BaseIcon = ({ size }: { size: number }) => {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <rect width="24" height="24" fill="#8FADAB" rx="6"></rect>
      <path
        fill="#fff"
        d="M12 9.167L9.167 6.333 12 3.5l2.833 2.833L12 9.167zM17.667 9.167h-2.834V6.333h2.834v2.834zM17.667 14.833L20.5 12l-2.833-2.833L14.833 12l2.834 2.833zM14.833 17.667h2.834v-2.834h-2.834v2.834zM9.167 17.667L12 20.5l2.833-2.833L12 14.833l-2.833 2.834zM6.333 14.833v2.834h2.834v-2.834H6.333zM6.333 9.167L9.167 12l-2.834 2.833L3.5 12l2.833-2.833zM6.333 9.167V6.333h2.834v2.834H6.333z"
      ></path>
    </svg>
  );
};

export default BaseIcon;
