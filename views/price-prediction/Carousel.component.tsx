import { UseEmblaCarouselType } from "embla-carousel-react";

import CardLater from "@/views/price-prediction/cards/CardLater.component";
import { RoundCard } from "./cards/RoundCard.component";
import { usePrediction } from "@/components/PredictionProvider";

interface CarouselProps {
    emblaRef: UseEmblaCarouselType[0];
}

export const Carousel = ({ emblaRef }: CarouselProps) => {
    const { rounds, userRounds, currentEpoch, chainlinkOraclePrice } = usePrediction();

    return (
        <div className="embla fadeIn pt-7 pb-1 md:py-8 z-10 relative" ref={emblaRef}>
            <div className="embla__container gap-5">
                {rounds.map((round) => {

                    const betInfo = userRounds.filter((userRound) => userRound.epoch === round.epoch)[0];

                    const hasWon =
                        round.oracleCalled &&
                        betInfo?.ledger?.amount != (0 || 0n) &&
                        ((round.closePrice > round.lockPrice && betInfo?.ledger?.position == 0) ||
                            (round.closePrice < round.lockPrice && betInfo?.ledger?.position == 1)) &&
                        round.lockPrice != round.closePrice;

                    return (
                        <RoundCard
                            key={round.epoch.toString()}
                            round={round}
                            currentEpoch={currentEpoch}
                            chainlinkOraclePrice={chainlinkOraclePrice}
                            userWon={hasWon}
                        />
                    );
                })}

                <CardLater epoch={currentEpoch + BigInt(1)} />
                <CardLater epoch={currentEpoch + BigInt(2)} />
            </div>
        </div>
    );
};
