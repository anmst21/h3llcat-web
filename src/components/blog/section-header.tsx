import Divider from "./divider";
import { BlogBack } from "../icon";
import Link from "next/link";
type Props = {
  featured?: boolean;
  header: string;
  subHeader: string;
};

const SectionHeader = ({ featured, header, subHeader }: Props) => {
  return (
    <div className="section-header">
      <div className="section-header__text">
        <span>{subHeader}</span>
        <h2>{header}</h2>
      </div>
      {featured && (
        <Link href={"/subscribe"} className="section-header__cta">
          <span>Get email updates</span>
          <div className="link-button__icon">
            <BlogBack />
          </div>
        </Link>
      )}
      <Divider />
    </div>
  );
};

export default SectionHeader;
