"use client";

import Lottie from "lottie-react";
import React from "react";
import animationGame from "../icon/animationGame.json";

const Game = () => {
  return (
    <div className="cta-game-boy__game">
      <Lottie
        style={{
          display: "flex",
          width: 146,
          height: 113,
        }}
        animationData={animationGame}
        loop
        autoPlay
      />
    </div>
  );
};

export default Game;
