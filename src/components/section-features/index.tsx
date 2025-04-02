import classNames from "classnames";
import {
  TopFeaturesHeader,
  StarCarousel,
  FeaturesJap,
  FeaturesSticker,
} from "../icon";
import { featuresCards } from "./features-cards";

const SectionFeatures = () => {
  const items = ["simple", "fast", "on-chain"];
  return (
    <div className="section-features">
      <div className="section-features__header">
        <div className="section-features__header__svg">
          <TopFeaturesHeader />
        </div>
        <div className="section-features__badge">
          {items.map((item, index) => {
            return (
              <div key={index} className="section-features__badge__item">
                <StarCarousel />
                <span>{item}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-features__jap section-features__jap--left">
        <FeaturesJap />
      </div>
      <div className="section-features__jap section-features__jap--right">
        <FeaturesJap />
      </div>

      <div className="section-features__grid__container">
        <div className="section-features__sticker">
          <FeaturesSticker />
        </div>
        {featuresCards.map((item, index) => {
          const num = index + 1;
          return (
            <div
              key={index}
              className={classNames("section-features__grid__item", {
                "section-features__grid__item--1": num === 1,
                "section-features__grid__item--2": num === 2,
                "section-features__grid__item--3": num === 3,
                "section-features__grid__item--4": num === 4,
                "section-features__grid__item--5": num === 5,
                "section-features__grid__item--6": num === 6,
              })}
            >
              <div className="top-left-corner">
                <div className="card-circle" />
              </div>
              <div className="top-mid-section"></div>
              <div className="top-right-corner">
                <div className="card-circle" />
              </div>

              <div className="mid-left-side"></div>
              <div className="mid-center-section"></div>
              <div className="mid-right-side"></div>

              <div className="bot-left-corner">
                <div className="card-circle" />
              </div>
              <div className="bot-center-section">
                <h4>{item.header}</h4>
                <p>{item.paragraph}</p>
              </div>
              <div className="bot-right-corner">
                <div className="card-circle" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionFeatures;
