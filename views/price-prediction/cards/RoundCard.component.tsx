import React from "react";
import CardNext from "@/views/price-prediction/cards/CardNext.component";
import CardExpired from "@/views/price-prediction/cards/CardExpired.component";
import CardLive from "@/views/price-prediction/cards/CardLive.component";
import { BIG_ZERO } from "@/utils/constants";
import { getMultiplier } from "@/utils/getMultiplier.util";
import { Round } from "@/types";

interface RoundCardProps {
    round: Round;
    currentEpoch: bigint;
    chainlinkOraclePrice: bigint;
    userWon?: boolean;
}

export enum BetPosition {
    BULL = "Bull",
    BEAR = "Bear",
    HOUSE = "House",
}

export const getRoundPosition = (lockPrice?: bigint | null, closePrice?: bigint | null) => {
    if (!closePrice || !lockPrice) {
        return null;
    }

    if (closePrice === lockPrice) {
        return BetPosition.HOUSE;
    }

    return closePrice > lockPrice ? BetPosition.BULL : BetPosition.BEAR;
};

export const RoundCard = ({ round, currentEpoch, chainlinkOraclePrice, userWon }: RoundCardProps) => {
    const { epoch, lockPrice, closePrice, totalAmount, bullAmount, bearAmount } = round;

    const betPosition = getRoundPosition(lockPrice ?? BigInt(0), closePrice ?? BigInt(0));

    const isUp = betPosition === BetPosition.BULL;

    const upMultiplier = totalAmount && bullAmount ? getMultiplier(totalAmount, bullAmount) : BIG_ZERO;
    const downMultiplier = totalAmount && bearAmount ? getMultiplier(totalAmount, bearAmount) : BIG_ZERO;

    const formattedUpMultiplier = upMultiplier.toFixed(upMultiplier.isZero() ? 0 : 2);
    const formattedDownMultiplier = downMultiplier.toFixed(downMultiplier.isZero() ? 0 : 2);

    // Next (open) round
    if (epoch === currentEpoch && lockPrice === BigInt(0)) {
        return (
            <CardNext
                round={round}
                formattedUpMultiplier={formattedUpMultiplier}
                formattedDownMultiplier={formattedDownMultiplier}
            />
        );
    }

    // Live round
    if (closePrice === BigInt(0) && epoch === currentEpoch - BigInt(1)) {
        return (
            <CardLive
                round={round}
                chainlinkOraclePrice={chainlinkOraclePrice}
                formattedUpMultiplier={formattedUpMultiplier}
                formattedDownMultiplier={formattedDownMultiplier}
            />
        );
    }

    return (
        <CardExpired
            round={round}
            isUp={isUp}
            formattedUpMultiplier={formattedUpMultiplier}
            formattedDownMultiplier={formattedDownMultiplier}
            justExpired={epoch === currentEpoch - BigInt(2)}
            userWon={userWon}
        />
    );
};
