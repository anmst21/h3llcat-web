import React from "react";
import {
  ScreenshotApp,
  ScreenshotAppStore,
  ScreenshotDots,
  ScreenshotLogo,
} from "../icon";

import Image from "next/image";

type Props = {};

const SectionMockups = () => {
  return (
    <div className="section-mockups">
      <div className="section-mockups__container">
        <div className="section-mockups__header">
          <div className="section-mockups__header__left">
            <div className="section-mockups__header__left__top">
              <ScreenshotDots />
              <span>Take a peek: the Display</span>
            </div>
            <ScreenshotApp />
          </div>
          <div className="section-mockups__header__right">
            <ScreenshotLogo />
            <ScreenshotAppStore />
          </div>
        </div>
        <div className="section-mockups__screenshots">
          {Array.from({ length: 4 }, (_, index) => (
            <Image
              alt={`Mock image ${index + 1}`}
              width={650}
              height={1321}
              key={index}
              src={`/mockups/${index + 1}.png`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionMockups;
