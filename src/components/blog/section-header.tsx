import classNames from "classnames";

type Props = {
  featured?: boolean;
  header: string;
  subHeader: string;
};

const SectionHeader = ({ featured, header, subHeader }: Props) => {
  return (
    <div
      className={classNames("section-header", {
        "section-header--featured": featured,
      })}
    >
      <div className="section-header__line" />
      <div className={"section-header__text"}>
        <span>{subHeader}</span>
        <h2>{header}</h2>
      </div>
    </div>
  );
};

export default SectionHeader;
