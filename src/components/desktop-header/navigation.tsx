"use client";
import { menuItems } from "../menu/items";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="desktop-header__navigation">
      {menuItems.map((item, index) => (
        <Link
          className={classNames("desktop-header__navigation__item", {
            "desktop-header__navigation__item--active":
              item.href !== "/"
                ? pathname.includes(item.href)
                : pathname === "/",
          })}
          href={item.href}
          key={index}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
