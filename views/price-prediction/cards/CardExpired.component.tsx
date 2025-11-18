import React, { useEffect, useState } from "react";
import { ArrowIcon } from "@/assets/Arrow.icon";
import { Button } from "@/components/Button/Button.component";
import Card from "@/components/Card/Card.component";
import { usePrediction } from "@/components/PredictionProvider";
import Image from "next/image";
import {
    useLucroPredictionGetUserRounds,
    useLucroPredictionWrite,
    usePrepareLucroPredictionClaim,
} from "@/hooks/generated";
import { Round } from "@/types";
import { formatBigIntToFixed } from "@/utils/formatBigIntToFixed";
import formatLCR from "@/utils/formatLCR";
import getHasRoundFailed from "@/utils/getHasRoundFailed";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import HeadlessDialog from "@/components/Base/HeadlessDialog";

interface CardExpiredProps {
    round: Round;
    isUp: boolean;
    formattedUpMultiplier: string;
    formattedDownMultiplier: string;
    justExpired?: boolean;
    userWon?: boolean;
}

const CardExpired = ({
    round,
    isUp,
    formattedDownMultiplier,
    formattedUpMultiplier,
    justExpired,
    userWon,
}: CardExpiredProps) => {
    const [isWinDialogOpen, setWinDialogOpen] = useState(false);
    const { bufferSeconds } = usePrediction();
    const hasRoundFailed = getHasRoundFailed(round.oracleCalled, round.closeTimestamp, bufferSeconds, round.closePrice);

    const priceDifference = formatBigIntToFixed(
        (round.lockPrice ?? BigInt(0)) - (round.closePrice ?? BigInt(0)),
        4,
        8
    ).replace("-", "");

    const { address } = useAccount();

    const { data } = useLucroPredictionGetUserRounds({
        args: [address || "0x0", BigInt(0), BigInt(9999)],
        enabled: !!address,
    });

    const [isEnteredDown, setIsEnteredDown] = useState<boolean>(false);

    const index = (data && data[0].indexOf(round.epoch)) || -1;

    const didUserJoinThisRound =
        data &&
        data[0].some((r: bigint) => {
            return r === round.epoch;
        });

    // const didUserWinThisRound = data && data[0].some((r) => r === round.epoch);

    const claimed = data && data[1][index]?.claimed;
    const amount = data && data[1][index]?.amount;

    useEffect(() => {
        if (justExpired && didUserJoinThisRound && userWon && claimed === false) {
            const alertedRoundsString = localStorage.getItem("alertedRounds");
            const alertedRounds: Array<number> = JSON.parse(alertedRoundsString || "[]");

            if (alertedRounds.indexOf(Number(round.epoch)) >= 0) return;

            toast(`Click here to claim for round #${round.epoch}!`, {
                toastId: "claimWinning",
                position: "top-center",
                onClick: () => {
                    toast.dismiss();
                    //   return openModal(<WinModalContent />);
                    return setWinDialogOpen(true);
                },
                // autoClose: true,
            });

            alertedRounds.push(Number(round.epoch));
            localStorage.setItem("alertedRounds", JSON.stringify(alertedRounds));
        }
    }, [justExpired, didUserJoinThisRound, userWon, claimed]);

    useEffect(() => {
        if (data) {
            const betInfo = data?.[1][data?.[0].indexOf(round.epoch)];
            setIsEnteredDown(betInfo?.position === 1);
        }
    }, [round, data]);

    if (hasRoundFailed) {
        return (
            <Card
                legend="expired"
                className="embla__slide py-3 px-5 flex flex-col w-75 h-full justify-center items-center"
                classNameParent="h-[26rem]"
                color={isUp ? "limeGreen" : "elektricPurple"}
            >
                <div className="absolute h-5 flex justify-between left-7 right-7 top-5">
                    <div />
                    <p>#{round.epoch.toString()}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">Round failed</div>
            </Card>
        );
    }

    const WinModalContent = () => {
        const { config } = usePrepareLucroPredictionClaim({ args: [[round.epoch]], enabled: claimed === false });

        const { write: claim } = useLucroPredictionWrite({
            ...config,
            onError(e: any) {
                // call toaster maybe?
                setWinDialogOpen(false);
                console.error("error");
                toast.error("Error claiming: " + e.message);
            },
            onSuccess() {
                setClaimModalButtonLoading(false);
                setWinDialogOpen(false);
                toast.success("Succesfully Claimed!");
            },
        });

        const [claimModalButtonLoading, setClaimModalButtonLoading] = useState<boolean>(false);

        const claimReward = () => {
            console.log(config);

            setClaimModalButtonLoading(true);

            claim?.();

            toast.dismiss("claimWinning");
        };

        return (
            <HeadlessDialog isOpen={isWinDialogOpen} onClose={() => setWinDialogOpen(false)}>
                <div className="absolute -top-32 left-0 right-0">
                    <Image className="mx-auto" src="/images/win.png" width={150} height={180} alt="win" />
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex text-center flex-col gap-4">
                        <p>
                            CONGRATULATIONS!
                            <br />
                            YOU HAVE WON A TOTAL OF
                        </p>

                        <p className="text-4xl">{formatLCR(amount ?? BigInt(0))} LCR</p>
                    </div>
                    <Button className="w-full" onClick={claimReward} disabled={claimModalButtonLoading}>
                        CLAIM
                    </Button>
                </div>
            </HeadlessDialog>
        );
    };

    return (
        <Card
            legend="expired"
            className="embla__slide py-3 px-5 flex flex-col w-75 h-full"
            classNameParent="h-[26rem]"
            color={isUp ? "limeGreen" : "elektricPurple"}
            didParticipate={didUserJoinThisRound}
            didWin={userWon}
            expired={true}
            isEnteredDown={isEnteredDown}
        >
            <div className="absolute h-5 flex justify-between left-7 right-7 top-5">
                <div />
                <p>#{round.epoch.toString()}</p>
            </div>
            <div className="flex items-center justify-center relative">
                <div>{isUp ? <ArrowIcon fillColor="green" opacity={1} /> : <ArrowIcon />}</div>
                <p className="absolute text-xl">{formattedUpMultiplier}x</p>
                <p className="absolute bottom-5 text-xs">PAYOUT</p>
                <p
                    title={"UP"}
                    className={`absolute -bottom-4 
        ${!isUp ? "text-2xl" : "text-3xl with-border whitespace-nowrap green-text-stroke text-[#14FF00]"}`}
                >
                    UP
                </p>
            </div>

            <div
                className={`w-full flex-1 rounded-[20px] overflow-hidden p-1 ${isUp ? "bg-gradient-to-b from-[#04D41A] to-[#3636361a]" : "bg-gradient-red-gray"
                    }`}
            >
                <div
                    className={`w-full h-full rounded-[16px] flex flex-col px-4 py-3 items-center ${isUp ? "bg-gradient-green-gray" : "bg-gradient-red-gray"
                        }`}
                >
                    <p className="text-sm">CLOSED BTC PRICE</p>
                    <p className="text-2xl">${formatBigIntToFixed(round.closePrice, 4, 8)}</p>
                    <div className="flex gap-1 items-center">
                        {isUp ? (
                            <FaArrowUp className="text-[#A9F330] drop-shadow" />
                        ) : (
                            <FaArrowDown className="text-[#F3308E] drop-shadow" />
                        )}
                        <p>${priceDifference}</p>
                    </div>

                    <div className="flex flex-col w-full">
                        {!!round.lockPrice && (
                            <div className="flex justify-between w-full text-sm">
                                <p>Locked Price</p>
                                <p>${formatBigIntToFixed(round.lockPrice, 4, 8)}</p>
                            </div>
                        )}
                        <div className="flex justify-between w-full text-sm">
                            <p>Prize Pool</p>
                            <p>{formatLCR(round.totalAmount)} LCR</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center relative">
                <div className="scale-y-flip">{isUp ? <ArrowIcon /> : <ArrowIcon fillColor="red" opacity={1} />}</div>
                <p className="absolute text-xl">{formattedDownMultiplier}x</p>
                <p className="absolute top-5 text-xs">PAYOUT</p>
                <p
                    title={"DOWN"}
                    className={`absolute -top-5 
        ${isUp ? "text-2xl" : "text-3xl with-border whitespace-nowrap red-text-stroke text-[#FF007A]"}`}
                >
                    DOWN
                </p>
            </div>
            {isWinDialogOpen && <WinModalContent />}
        </Card>
    );
};

export default CardExpired;
