import Link from "next/link";
import { headers } from "next/headers";
import { HeaderLogo } from "../icon";

const navBtns = [
  {
    title: "home",
    href: "/",
  },
  {
    title: "updates",
    href: "/updates",
  },
  {
    title: "logo",
    href: "/",
  },
  {
    title: "socials",
    href: "/socials",
  },
  {
    title: "beta",
    href: "/beta",
  },
];

export default async function Header() {
  const fullUrl = headers().get("referer") || null;

  let pathname: string = "";
  if (fullUrl) {
    pathname = new URL(fullUrl).pathname;
  }

  const navBtnsWithActive = navBtns.map((btn) => ({
    ...btn,
    isActive: pathname === btn.href,
  }));

  return (
    <div className="header">
      {navBtnsWithActive.map((btn, index) => {
        if (btn.title === "logo") {
          return (
            <Link className="header__logo" href={btn.href} key={index}>
              <HeaderLogo />
            </Link>
          );
        }

        return (
          <Link className="header__btn" href={btn.href} key={index}>
            {btn.title}
          </Link>
        );
      })}
    </div>
  );
}
