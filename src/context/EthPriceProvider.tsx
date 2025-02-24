"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEthPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch ETH price");
      }
      const data = await response.json();
      setEthPrice(data.ethereum.usd);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEthPrice();
    // refresh every minute
    const intervalId = setInterval(fetchEthPrice, 60000);
    return () => clearInterval(intervalId);
  }, []);

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
