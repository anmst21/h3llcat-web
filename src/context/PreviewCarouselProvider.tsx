"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type CarouselContextValue = {
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};

const CarouselContext = createContext<CarouselContextValue | undefined>(
  undefined
);

export const useCarousel = (): CarouselContextValue => {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error("useCarousel must be used within a CarouselProvider");
  }
  return ctx;
};

type ProviderProps = { children: ReactNode };
export const PreviewCarouselProvider = ({ children }: ProviderProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <CarouselContext.Provider value={{ selectedIndex, setSelectedIndex }}>
      {children}
    </CarouselContext.Provider>
  );
};
