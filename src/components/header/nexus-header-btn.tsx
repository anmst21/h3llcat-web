import Link from "next/link";
import classNames from "classnames";

interface NexusHeaderBtnProps {
  isActive: boolean;
  value: string;
  href: string;
}

const NexusHeaderBtn: React.FC<NexusHeaderBtnProps> = ({
  href,
  value,
  isActive,
}) => {
  return (
    <Link
      href={href}
      className={classNames("nexus-header-btn", {
        "nexus-header-btn--active": isActive,
      })}
    >
      {value}
    </Link>
  );
};

export default NexusHeaderBtn;
