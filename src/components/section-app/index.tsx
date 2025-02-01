import React from "react";
import { IphoneFrame, LogoDisplayMock, LogoNexusMock } from "../icon";
import BtnCarousel from "./btn-carousel";

type Props = {};

const SectionApp = (props: Props) => {
  return (
    <div className="section-app">
      <BtnCarousel />
      <div className="app">
        <div className="app__top">
          <div className="app__text">
            <span>Display</span>
            <h1>APP</h1>
          </div>
          <div className="app__logo">
            <LogoNexusMock />
            <LogoDisplayMock />
          </div>
        </div>
        <div className="app__mock">
          <IphoneFrame src="/mocks/one.png" alt="Screen Swipe" />
          <IphoneFrame src="/mocks/two.png" alt="Screen Details" />
          <IphoneFrame src="/mocks/three.png" alt="Screen Collection" />
          <IphoneFrame src="/mocks/four.png" alt="Screen Wallet" />
        </div>
      </div>
    </div>
  );
};

export default SectionApp;
