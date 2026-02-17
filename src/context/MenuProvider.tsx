"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import Menu from "@/components/menu";
import MenuModal from "@/components/menu/menu-modal";
import { useMediaQuery } from "react-responsive";
import classNames from "classnames";
import { usePathname } from "next/navigation";

// Define the shape of your context data.
interface MenuContextProps {
  isOpenMenu: boolean;
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>;
}

// Create a context with an initial value of undefined.
const MenuContext = createContext<MenuContextProps | undefined>(undefined);

// Define the props for the provider component.
interface MenuProviderProps {
  children: ReactNode;
}

// Provider Component that wraps its children with the Menu and Context.
export const MenuProvider: FC<MenuProviderProps> = ({ children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const pathname = usePathname();

  return (
    <MenuContext.Provider value={{ isOpenMenu, setIsOpenMenu }}>
      {/* Render the Menu component and pass the state as props */}

      <div
        className={classNames("remove-footer", {
          "remove-footer--active":
            isMobile && (pathname === "/" || pathname.includes("/collection")),
        })}
      >
        <MenuModal isOpen={isOpenMenu} setIsOpen={setIsOpenMenu} />

        {children}
        <Menu isOpen={isOpenMenu} setIsOpen={setIsOpenMenu} />
      </div>
    </MenuContext.Provider>
  );
};

// Custom hook for consuming the Menu context.
export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
