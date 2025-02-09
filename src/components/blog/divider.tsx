import React from "react";

const Divider = ({ transparent }: { transparent?: boolean }) => {
  return (
    <div
      style={{
        backgroundColor: transparent ? "transparent" : undefined,
      }}
      className="divider"
    />
  );
};

export default Divider;
