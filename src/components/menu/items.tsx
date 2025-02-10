import { MenuHome, MenuBeta, MenuBlog, MenuContacts } from "../icon";

export const menuItems = [
  {
    title: "Home",
    value: "The Display Product",
    icon: <MenuHome />,
    href: "/",
  },
  {
    title: "Beta",
    value: "The Display Product",
    icon: <MenuBeta />,
    href: "/beta",
  },
  {
    title: "Blog",
    value: "The Display Product",
    icon: <MenuBlog />,
    href: "/blog",
  },
  {
    title: "Contacts",
    value: "The Display Product",
    icon: <MenuContacts />,
    href: "/contacts",
  },
];

export const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      delay: index * 0.1, // Apply a delay based on the index
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
