"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useState, useCallback, useEffect } from "react";
import { UserData } from "./types";
import { getUserData } from "@/actions/prisma/get-user-data";

// const apiUrl = "https://api-airdrop.h3llcat.app/api/v1/privyforms/me";

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
  const { ready, authenticated, user } = usePrivy();
  console.log({ user: user?.id });
  const fetchToken = useCallback(
    async (id: string) => {
      setIsLoadingData(true);
      try {
        // const accessToken = await getAccessToken();
        const { did, email, isMinted } = await getUserData(id);
        console.log({ did, email, isMinted });
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }

        // const data: {
        //   did: string;
        //   email: string | null;
        //   totalMints: number;
        //   yourMintsCount: number;
        // } = await response.json();
        // console.log("Response data:", data);
        setUserData({
          did,
          email,
          isMinted,
        });
        setIsLoadingData(false);
      } catch (err: any) {
        setIsLoadingData(false);

        console.error("Error fetching /api/v1/privyforms/me:", err);
        setError(err);
      }
    },
    [setUserData]
  );

  // Automatically fetch token data when the hook is first used.
  useEffect(() => {
    if (ready && authenticated && user) {
      fetchToken(user.id);
    }
  }, [fetchToken, ready, authenticated, user]);

  return { userData, error, fetchToken, setUserData, isLoadingData };
}
