"use client";

import Lottie from "lottie-react";
import React from "react";
import animationGame from "../icon/animationGame.json";
import { useMediaQuery } from "react-responsive";
import { CtaGameFallback } from "../icon";

const Game = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  return (
    <>
      <div className="cta-game-boy__game">
        {!isMobile ? (
          <Lottie
            style={{
              display: "flex",
              width: 139,
              height: 120,
            }}
            animationData={animationGame}
            loop
            autoPlay
          />
        ) : (
          <CtaGameFallback />
        )}
      </div>
    </>
  );
};

export default Game;
