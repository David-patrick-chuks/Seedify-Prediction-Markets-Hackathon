import CurrentInfoRoundCard from "@/components/Card/CurrentInfoRoundCard.component";
import useCountdown from "@/hooks/useCountdown";
import { usePrediction } from "@/components/PredictionProvider";
import formatCountdown from "@/utils/formatCountdown";

export const CountdownCard = () => {
    const { currentRound, intervalSeconds } = usePrediction();

    const timeLeft = useCountdown({
        targetDate: Number(currentRound.closeTimestamp * 1000n),
    });

    // const timeLeft = useCountdown({
    //     targetDate: Number((currentRound.lockTimestamp + intervalSeconds) * 1000n),
    // });

    const { minutes, seconds } = formatCountdown(timeLeft);

    const intervalMinutes = Math.floor(Number(intervalSeconds) / 60);
    const intervalSecondsFormatted = Number(intervalSeconds) % 60;

    return (
        <CurrentInfoRoundCard className="md:h-[200px] md:w-[200px] bg-gradient-to-b from-[#006EEF] to-[#1A9FFF] gap-2 text-shadow-[0_0_12px_rgba(0,0,0,.25)]">
            <p className="hidden md:block">TIME LEFT</p>
            <p className="text-3xl leading-normal md:text-4.5xl">
                {minutes}:{seconds}
            </p>
            <p className="text-center text-sm hidden md:block">
                RENEWS EVERY {intervalMinutes} MIN
                {intervalSecondsFormatted > 0 && ` AND ${intervalSecondsFormatted} SECS`}
            </p>
        </CurrentInfoRoundCard>
    );
};
