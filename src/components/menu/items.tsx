import {
  MenuHome,
  MenuBeta,
  MenuBlog,
  MenuContacts,
  MenuPrivacy,
} from "../icon";

export const menuItems = [
  {
    title: "Home",
    value: "Learn about Display",
    icon: <MenuHome />,
    href: "/",
  },
  {
    title: "Beta",
    value: "Sign up for early access",
    icon: <MenuBeta />,
    href: "/beta",
  },
  {
    title: "Blog",
    value: "Updates & announcements",
    icon: <MenuBlog />,
    href: "/blog",
  },
  {
    title: "Contacts",
    value: "Get in touch with us",
    icon: <MenuContacts />,
    href: "/contacts",
  },
  {
    title: "Privacy",
    value: "Privacy & data usage",
    icon: <MenuPrivacy />,
    href: "/privacy",
  },
];

export const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      delay: (index / 1.5) * 0.1, // Apply a delay based on the index
    },
  }),
};

export const walletOptions = {
  hidden: { opacity: 0, y: -10 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      delay: index * 0.1, // Apply a delay based on the index
    },
  }),
};

export const walletProps = (i: number) => {
  return {
    custom: i,
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: walletOptions,
  };
};

export const buttonProps = (i: number) => {
  return {
    custom: i,
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: buttonVariants,
  };
};
