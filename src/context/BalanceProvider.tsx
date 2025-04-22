"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { formatEther } from "viem";
import { useUserBalance } from "../hooks/useUserBalance";
import { useWallets } from "@privy-io/react-auth";

interface BalanceContextType {
  userBalance: bigint;
  formattedUserBalance: string;
  getUserBalance: () => Promise<void>;
  isLoadingBalance: boolean;
}

// Create the context with an undefined default
const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

// Define the provider's props
interface BalanceProviderProps {
  children: React.ReactNode;
}

// Provider component that wraps your app (or part of it)
export const BalanceProvider: React.FC<BalanceProviderProps> = ({
  children,
}) => {
  const { ready, wallets } = useWallets();
  const userWallet = wallets.find(
    (wallet) => wallet.walletClientType === "coinbase_wallet"
  );
  const { userBalance, getUserBalance, isLoadingBalance } =
    useUserBalance(userWallet);
  // Memoize the formatted balance to prevent unnecessary recalculations
  const formattedUserBalance = useMemo(() => {
    const formatted = formatEther(userBalance);
    // Convert to a float, round to 6 decimals as a string, then convert back to a number
    return parseFloat(formatted).toFixed(6);
  }, [userBalance]);

  // Wrap the async function in useCallback for memoization
  const fetchBalance = useCallback(async () => {
    if (userWallet && ready) {
      await getUserBalance();
    }
  }, [userWallet, getUserBalance, ready]);

  // Automatically fetch the balance when the wallet changes
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);
  // console.log("ready, wallets", userBalance);

  return (
    <BalanceContext.Provider
      value={{
        userBalance,
        formattedUserBalance,
        getUserBalance,
        isLoadingBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

// Custom hook to easily use the BalanceContext
export const useBalanceContext = (): BalanceContextType => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalanceContext must be used within a BalanceProvider");
  }
  return context;
};
