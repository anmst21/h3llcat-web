"use client";
import { getEthPrice } from "@/actions/get-eth-price";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
  useRef,
} from "react";

type EthPriceContextType = {
  ethPrice: number | null;
  loading: boolean;
  error: string | null;
};

const EthPriceContext = createContext<EthPriceContextType | undefined>(
  undefined
);

type EthPriceProviderProps = {
  children: ReactNode;
};

export function EthPriceProvider({ children }: EthPriceProviderProps) {
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isFetchingRef = useRef(false);
  const mountedRef = useRef(true);

  const fetchEthPrice = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setError(null);
    setLoading(true);
    try {
      const price = await getEthPrice();
      if (!mountedRef.current) return;
      if (typeof price !== "number" || Number.isNaN(price)) {
        throw new Error("Invalid price received");
      }
      setEthPrice(price);
    } catch (err: any) {
      if (!mountedRef.current) return;
      setError(err?.message ?? "Failed to fetch ETH price");
    } finally {
      if (!mountedRef.current) return;
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    // mark mounted for safety in async
    mountedRef.current = true;
    fetchEthPrice();

    // refresh every 60s
    const iv = setInterval(fetchEthPrice, 60_000);

    return () => {
      mountedRef.current = false;
      clearInterval(iv);
    };
  }, [fetchEthPrice]);

  return (
    <EthPriceContext.Provider value={{ ethPrice, loading, error }}>
      {children}
    </EthPriceContext.Provider>
  );
}

export function useEthPrice(): EthPriceContextType {
  const context = useContext(EthPriceContext);
  if (context === undefined) {
    throw new Error("useEthPrice must be used within an EthPriceProvider");
  }
  return context;
}
