"use client";

import { Button } from "@/components/Button/Button.component";
import { useSidebar } from "@/context/SidebarContext";
import { usePrepareLucroPredictionClaim, useLucroPredictionWrite, lucroPredictionABI } from "@/hooks/generated";
import { useGetNodeHistory } from "@/hooks/useGetNodeHistory";
import { useGetRoundsData } from "@/hooks/useGetRoundsData";
import { getUserRounds } from "@/hooks/useGetUserRounds";
import formatLCR from "@/utils/formatLCR";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ReadContractResult } from "wagmi/dist/actions";
import { usePrediction } from "@/components/PredictionProvider";

interface HistoryItemProps {
  round: ReadContractResult<typeof lucroPredictionABI, "getUserRounds">[1][number];
  epoch: bigint;
  isClaimable?: boolean;
}

const HistoryItem = ({ round: userRound, epoch, isClaimable }: HistoryItemProps) => {
  const { config } = usePrepareLucroPredictionClaim({ args: [[epoch]], enabled: userRound["claimed"] === false });

  const { write: claim } = useLucroPredictionWrite({
    ...config,
    onSuccess() {
      setIsClaimed(true);
    },
    onError() {
      // call toaster maybe?
      setIsClaimed(false);
      console.error("error");
    },
  });

  const [isClaimed, setIsClaimed] = useState(userRound["claimed"]);

  useEffect(() => {
    setIsClaimed(userRound["claimed"]);
  }, [userRound]);

  return (
    <div className="flex items-center justify-between px-3 min-h-[60px] h-[60px] rounded-xl bg-black/10">
      <p># {epoch.toString()}</p>
      <p>{formatLCR(userRound["amount"])}</p>
      {!isClaimed && isClaimable ? <Button onClick={() => claim?.()}>Claim</Button> : <div>Claimed</div>}
    </div>
  );
};

interface ClaimRewardsNotificationProps {
  userRounds: Awaited<ReturnType<typeof getUserRounds>>;
}

const ClaimRewardsNotification = ({ userRounds }: ClaimRewardsNotificationProps) => {
  const [dismissed, setDismissed] = useState(false);

  const { data: roundsData, isLoading } = useGetRoundsData();

  if (isLoading) return null;
  if (!roundsData) return null;

  const latestUserRoundEpoch = userRounds.result[userRounds.cursor - 1]?.epoch;
  // const isLatestRoundClaimable = !userRounds[1][Number(userRounds[2]) - 1]?.claimed;

  const latestEpoch = roundsData[roundsData.length - 1]?.epoch;

  // if (!isLatestRoundClaimable) return null;
  if (!latestEpoch) return null;

  if (latestUserRoundEpoch < latestEpoch) return null;

  if (dismissed) return null;

  return (
    <div className="fixed top-0 bg-red-500 p-4 z-10">
      <button
        onClick={() => {
          setDismissed(true);
        }}
      >
        X
      </button>
      Claim Reward
    </div>
  );
};

const HistorySidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const { address } = useAccount();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { data, isLoading } = useGetNodeHistory(address);
  const { currentEpoch } = usePrediction();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setIsVisible(false), 300); // Match this with your transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (isLoading) return <div>Loading...</div>;

  const userRounds = data?.bets;

  const sidebarClasses = `
      fixed right-0 top-0 bottom-0 md:top-2 md:bottom-2 z-50 md:p-2 md:rounded-3xl 
      h-(calc(100%-80px)) w-screen xs:w-[400px] md:bg-[rgba(255,255,255,0.4)] 
      md:shadow-[0px_4px_12px_rgba(0,0,0,0.25)]
      ${isVisible ? "block" : "hidden"}
      ${isAnimating ? "translate-x-0 md:-translate-x-2" : "translate-x-full"}
      transition-transform duration-300
    `;

  return (
    <>
      <div className={sidebarClasses}>
        <div className="bg-purple-600 h-full p-5 md:rounded-2xl overflow-hidden grid grid-rows-[auto,1fr] gap-4">
          <div className="flex items-center justify-between">
            <p className="text-2xl">Claimable History</p>
            <Button color="red" onClick={toggleSidebar}>
              Exit
            </Button>
          </div>

          <div className="grid grid-rows-[auto] gap-2 overflow-scroll">
            {userRounds?.result
              ?.map((_, index, array) => array[array.length - 1 - index])
              .map((userRound, index) => {
                if (userRound.epoch >= currentEpoch - BigInt(1)) return;

                return (
                  <HistoryItem
                    key={index}
                    round={userRound.ledger}
                    epoch={BigInt(userRound.epoch)}
                    isClaimable={data?.claimableStatuses[Number(userRound.epoch)]}
                  />
                );
              })}
          </div>
        </div>
      </div>
      {userRounds && <ClaimRewardsNotification key={userRounds.cursor} userRounds={userRounds} />}
    </>
  );
};

export default HistorySidebar;
