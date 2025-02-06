"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useState, useCallback, useEffect } from "react";
import { UserData } from "./types";

const apiUrl = "https://api-airdrop.h3llcat.app/api/v1/privyforms/me";

/**
 * Custom hook that fetches user token data.
 *
 * @param getAccessToken A function that returns a Promise resolving to an access token.
 * @returns An object containing the user data, any error encountered, and a function to refetch the data.
 */
export function useToken() {
  const [userData, setUserData] = useState<UserData>({
    did: null,
    email: null,
    isMinted: false,
  });
  const [error, setError] = useState<Error | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const { getAccessToken, ready } = usePrivy();
  const fetchToken = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: UserData = await response.json();
      console.log("Response data:", data);
      setUserData(data);
      setIsLoadingData(false);
    } catch (err: any) {
      setIsLoadingData(false);

      console.error("Error fetching /api/v1/privyforms/me:", err);
      setError(err);
    }
  }, [getAccessToken]);

  // Automatically fetch token data when the hook is first used.
  useEffect(() => {
    if (ready) {
      fetchToken();
    }
  }, [fetchToken, ready]);

  return { userData, error, fetchToken, setUserData, isLoadingData };
}
