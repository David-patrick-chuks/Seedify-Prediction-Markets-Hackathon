import React, { useEffect, useState } from "react";
import { ArrowIcon } from "@/assets/Arrow.icon";
import { useAccount } from "wagmi";

import Card from "@/components/Card/Card.component";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { formatBigIntToFixed } from "@/utils/formatBigIntToFixed";
import { Round } from "@/types";
import useCountdown from "@/hooks/useCountdown";
import formatCountdown from "@/utils/formatCountdown";
import formatLCR from "@/utils/formatLCR";
import { usePrediction } from "@/components/PredictionProvider";
import { useLucroPredictionGetUserRounds, useLucroPredictionRounds } from "@/hooks/generated";

interface CardLiveProps {
    round: Round;
    formattedUpMultiplier: string;
    formattedDownMultiplier: string;
    chainlinkOraclePrice: bigint;
}

const CardLive = ({ round, formattedDownMultiplier, formattedUpMultiplier, chainlinkOraclePrice }: CardLiveProps) => {
    const priceDifference = chainlinkOraclePrice - (round.lockPrice ?? BigInt(0));

    const timeLeft = useCountdown({
        targetDate: Number(round.closeTimestamp * 1000n),
    });

    const { address } = useAccount();

    const { data } = useLucroPredictionGetUserRounds({
        args: [address || "0x0", BigInt(0), BigInt(9999)],
        enabled: !!address,
    });

    const { currentRound, intervalSeconds } = usePrediction();

    const { data: nextRound } = useLucroPredictionRounds({
        args: [ currentRound.epoch + BigInt(1) ]
    })

    const [isEnteredDown, setIsEnteredDown] = useState<boolean>(false);

    const didUserJoinThisRound =
        data &&
        data[0].some((r: bigint) => {
            return r === round.epoch;
        });

    const timestamp = Math.floor(Date.now() / 1000);

    // const timeLeft = useCountdown({
    //     targetDate: Number((currentRound.lockTimestamp + intervalSeconds) * 1000n),
    // });

    const { minutes, seconds } = formatCountdown(timeLeft);
    
    useEffect(() => {
        console.log("timeleft:", timeLeft)
        console.log(minutes, "min", seconds, "sec")
        console.log("operator:", (nextRound?.[2] || 0n) - BigInt(timestamp))
    }, [timeLeft])

    useEffect(() => {
        if (data) {
            const betInfo = data?.[1][data?.[0].indexOf(round.epoch)];
            setIsEnteredDown(betInfo?.position === 1);
        }
    }, [round, data]);

    if (timeLeft <= 0) {
        return (
            <Card
                legend="live"
                className="embla__slide py-3 px-5 flex flex-col w-75 h-full"
                classNameParent="h-[26rem]"
                color="purple"
                isEnteredDown={isEnteredDown}
            >
                <div className="h-5 flex justify-between absolute left-7 right-7 top-5">
                    {minutes}:{seconds}
                    <p>#{round.epoch.toString()}</p>
                </div>
                <div className="flex-1 flex items-center justify-center">Calculating</div>
            </Card>
        );
    }

    return (
        <Card
            legend="live"
            className="embla__slide py-3 px-5 flex flex-col w-75 h-full"
            classNameParent="h-[26rem]"
            color="purple"
            didParticipate={didUserJoinThisRound}
            isEnteredDown={isEnteredDown}
        >
            <div className="h-5 flex justify-between absolute left-7 right-7 top-5">
                {minutes}:{seconds}
                <p>#{round.epoch.toString()}</p>
            </div>

            <div className="flex items-center justify-center relative">
                <ArrowIcon
                    className={`${priceDifference > 0 ? "pulse" : ""}`}
                    {...(priceDifference > 0 && { fillColor: "green", opacity: 1 })}
                />
                <p className="absolute text-xl">{formattedUpMultiplier}x</p>
                <p className="absolute bottom-5 text-xs">PAYOUT</p>
                <p
                    title={"UP"}
                    className={`absolute -bottom-4 
        ${priceDifference > 0 ? "text-3xl with-border whitespace-nowrap green-text-stroke text-[#14FF00]" : "text-2xl"
                        } `}
                >
                    UP
                </p>
            </div>

            <div
                className={`w-full flex-1 rounded-[20px] p-1 ${priceDifference < 0
                    ? "bg-gradient-to-b from-[#7a28e6] via-[#ff006a55] to-[#FF006B]"
                    : priceDifference > 0
                        ? "bg-gradient-to-b from-[#04D41A] via-[#04d41945] to-[#7a28e6]"
                        : "bg-[#3636361a]"
                    }`}
            >
                <div
                    className={`w-full h-full rounded-2xl flex flex-col px-4 py-3 items-center ${priceDifference !== 0n ? "bg-[#7a28e6]" : ""
                        }`}
                >
                    <p className="text-sm mt-1">LAST BTC PRICE</p>
                    <p className="text-2xl">${formatBigIntToFixed(chainlinkOraclePrice, 4, 8)}</p>
                    <div className="flex gap-1 items-center">
                        {priceDifference < 0 ? (
                            <FaArrowDown className="text-[#F3308E] drop-shadow" />
                        ) : (
                            <FaArrowUp className="text-[#A9F330] drop-shadow" />
                        )}

                        <p>${formatBigIntToFixed(priceDifference, 4, 8)}</p>
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
                <div className="scale-y-flip">
                    <ArrowIcon
                        className={`${priceDifference < 0 ? "pulse" : ""}`}
                        {...(priceDifference < 0 && { fillColor: "red", opacity: 1, active: true })}
                    />
                </div>
                <p className="absolute text-xl">{formattedDownMultiplier}x</p>
                <p className="absolute top-5 text-xs">PAYOUT</p>
                <p
                    title={"DOWN"}
                    className={`absolute -top-5
        ${priceDifference < 0 ? "text-3xl with-border whitespace-nowrap red-text-stroke text-[#FF007A]" : "text-2xl"} `}
                >
                    DOWN
                </p>
            </div>
        </Card>
    );
};

export default CardLive;
