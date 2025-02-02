import Link from "next/link";
import { BlogBack } from "../icon";

interface CarouselBtnProps {
  href: string;
  content: string;
}

const CarouselBtn: React.FC<CarouselBtnProps> = ({ href, content }) => {
  return (
    <Link className="link-button link-button--carousel" href={href}>
      <span>{content}</span>
      <div className="link-button__icon">
        <BlogBack />
      </div>
    </Link>
  );
};

export default CarouselBtn;
