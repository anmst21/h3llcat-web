"use client";

import { nftProps } from "@/helpers/nftProps";
import Image from "next/image";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useCallback, useState, useMemo } from "react";
import { useToken } from "@/hooks/useToken";
import { MenuBeta, BetaDescription } from "../icon";
import PassDetails from "./pass-details";
import PassMeta from "./pass-meta";
import { AnimatePresence, motion } from "motion/react";
import { betaPageHeader } from "@/helpers/beta-page-assets";
import VideoPlayer from "./video-player";
import { usePrivyViem } from "@/hooks/usePrivyViem";
import { claimWithPrivy } from "@/hooks/useClaim";
import { Address, formatEther } from "viem";
import { SerializedClaimCondition } from "@/types/ClaimCondition";
import { getActiveChain, getContractAddress } from "@/helpers/mintHelpers";
import DynamicActionButton from "./dynamic-action-button";
import { recordMint } from "@/actions/prisma/set-user-data";

const contractAddress = getContractAddress() as Address;
const activeChain = getActiveChain();
const chainId = activeChain.id;

function SectionBeta({ claimCondition }: { claimCondition: SerializedClaimCondition | null }) {
  const { authenticated, ready, user } = usePrivy();

  const { wallets } = useWallets();
  console.log({ claimCondition });
  const userWallet = wallets.find(
    (wallet) => wallet.walletClientType === "coinbase_wallet"
  );

  const { walletClient, publicClient } = usePrivyViem();

  const [timesMinted, setTimesMinted] = useState(
    claimCondition ? Number(claimCondition.supplyClaimed) : 0
  );
  const [numToMint, setNumToMint] = useState(1);
  const [isFundsError, setIsFundsError] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [log, setLog] = useState<string>("");

  console.log({ log, isMinting });

  const {
    userData,
    setUserData,
    isLoadingData,
    // error, fetchToken
  } = useToken();

  const setData = useCallback(
    (data: any) => {
      setUserData(data);
    },
    [setUserData]
  );

  const onClaim = async () => {
    if (!ready || !walletClient || !publicClient || !userWallet || !user)
      return;

    try {
      setIsFundsError(false);
      setIsMinting(true);
      setLog("Sending tx…");

      // Your params

      const receiver = userWallet.address as Address; // mint to the connected Privy wallet
      const quantity = BigInt(numToMint);

      // const balanceWei = await publicClient.getBalance({ address: receiver });
      // console.log({ balanceWei });
      // if (claimCondition.pricePerToken * quantity > balanceWei) return;
      const receipt = await claimWithPrivy({
        walletClient,
        publicClient,
        contractAddress,
        receiver,
        quantity,
        proof: [], // or your Merkle proof if allowlisted
        data: "0x",
      });
      console.log({ receipt });

      const { email, isMinted, did } = await recordMint({
        did: user.id,
        receipt: {
          blockHash: receipt.blockHash,
          blockNumber: Number(receipt.blockNumber),
          cumulativeGasUsed: Number(receipt.cumulativeGasUsed),
          effectiveGasPrice: Number(receipt.effectiveGasPrice),
          gasUsed: Number(receipt.gasUsed),
          from: receipt.from,
          transactionHash: receipt.transactionHash,
        },
      });
      console.log({ receipt });

      setTimesMinted(timesMinted + numToMint);
      setData({ email, isMinted, did });
      setIsMinting(false);
      setIsFundsError(false);
      setLog(
        `✅ Mined in block ${receipt.blockNumber}, tx: ${receipt.transactionHash}`
      );
      console.log({ receipt });
    } catch (e: any) {
      console.error(e);
      setIsMinting(false);
      setIsFundsError(false);
      setLog(`❌ ${e?.shortMessage || e?.message || String(e)}`);
    }
  };
  console.log({ isMinting });
  //////////////////////////////////////////////////

  const disableLogin = !ready || (ready && authenticated);

  console.log({ wallets });

  console.log({ userWallet });
  const userWalletChain =
    Number(userWallet?.chainId.split("eip155:")[1]) || null;

  console.log({ userWallet });

  useEffect(() => {
    if (!authenticated) {
      setData(null);
    }
  }, [authenticated, setData]);

  const currectStep = useMemo(() => {
    const getStep = () => {
      if (!userData || !userData.isMinted) {
        return "1";
      } else if (userData.isMinted && !userData.email) {
        return "2";
      } else if (userData.isMinted && userData.email) {
        return "3";
      } else {
        return "1";
      }
    };
    return getStep();
  }, [userData]);

  // const animationRef = useRef<HTMLDivElement>(null);

  return (
    <div className="section-beta">
      <div className="section-beta__top">
        <div className="wallet-item">
          <div className="wallet-item__user">
            <span className="wallet-item__title">Secure Your Spot</span>
            <span className="wallet-item__address">
              Join our Beta program today
            </span>
          </div>
        </div>

        <Image
          width={2160}
          height={340}
          alt="Nft Header"
          src={betaPageHeader}
        />
      </div>
      <div className="section-beta__bot">
        <div className="section-beta__left">
          <VideoPlayer uri={nftProps.artUri} name={nftProps.name} />
          <PassDetails
            mintGoal={10000}
            price={claimCondition ? Number(
              Number(formatEther(BigInt(claimCondition.pricePerToken))).toFixed(6)
            ) : 0.0025}
            timesMinted={timesMinted}
          />
        </div>
        <div className="section-beta__right">
          <div className="pass-description">
            <div className="wallet-item">
              <div className="wallet-item__icon">
                <BetaDescription />
              </div>
              <div className="wallet-item__user">
                <span className="wallet-item__title">{nftProps.name}</span>
                <span className="wallet-item__address">About:</span>
              </div>
            </div>
            <div className="pass-description__text">
              <p>{nftProps.description}</p>
            </div>
          </div>
          <PassMeta
            contract={contractAddress}
            creator={nftProps.creator}
            standard={nftProps.standard}
          />
          <div className="pass-description">
            <div className="wallet-item">
              <div className="wallet-item__icon">
                <MenuBeta />
              </div>
              <div className="wallet-item__user">
                <span className="wallet-item__title">Secure your spot</span>
                <span
                  style={{ overflow: "hidden" }}
                  className="wallet-item__address"
                >
                  Step:
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={currectStep} // key change triggers re-animation
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{
                        color: "#FFF8E7",
                        width: 12,
                        textAlign: "end",
                      }}
                    >
                      {currectStep}
                    </motion.span>
                  </AnimatePresence>
                  <span>/4</span>
                </span>
              </div>
            </div>
            {/* <button onClick={onClaim}>Mint!!!</button> */}
            <DynamicActionButton
              numToMint={numToMint}
              setNumToMint={setNumToMint}
              setUserData={setData}
              isLoadingContext={!disableLogin}
              isLoadingUserData={isLoadingData}
              isMinting={isMinting}
              isCorrectChain={userWalletChain === chainId}
              isMintSubmitted={userData?.isMinted}
              isEmailSubmitted={userData?.email}
              isEnoughFunds={!isFundsError}
              buyNFTAction={onClaim}
              switchChainAction={async () => {
                if (userWallet) {
                  await userWallet.switchChain(chainId);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionBeta;
