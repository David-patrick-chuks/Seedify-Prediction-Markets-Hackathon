import { ArrowIcon } from "@/assets/Arrow.icon";
import Card from "@/components/Card/Card.component";
import { usePrediction } from "@/components/PredictionProvider";
import useCountdown from "@/hooks/useCountdown";
import formatCountdown from "@/utils/formatCountdown";

interface CardLaterProps {
    epoch: bigint;
}

const CardLater = ({ epoch }: CardLaterProps) => {
    const { currentEpoch, currentRound, intervalSeconds } = usePrediction();
    const offset = Number(epoch - currentEpoch);
    // const timeLeft = useCountdown({
    //     targetDate: Number(currentRound.lockTimestamp * 1000n) + offset * Number(intervalSeconds * 1000n),
    // });

    const timeLeft = useCountdown({
        targetDate: Number(currentRound.closeTimestamp * 1000n) + offset * Number(intervalSeconds * 1000n),
    });

    const { minutes, seconds } = formatCountdown(timeLeft);

    return (
        <Card legend="later" className="embla__slide w-75 py-3 px-5 flex flex-col h-full" classNameParent="h-[26rem]">
            <div className="h-5 flex justify-between absolute left-7 right-7 top-5">
                <div />
                <p>#{epoch.toString()}</p>
            </div>
            <div className="flex justify-center">
                <ArrowIcon />
            </div>

            <div className="w-full flex-1 bg-[#3636361a] rounded-[20px] flex flex-col justify-center items-center">
                <p>Entry starts in</p>
                <p className="text-4.5xl">
                    {minutes}:{seconds}
                </p>
            </div>

            <div className="flex justify-center scale-y-flip">
                <ArrowIcon />
            </div>
        </Card>
    );
};

export default CardLater;
