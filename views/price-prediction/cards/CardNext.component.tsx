import { ArrowIcon } from "@/assets/Arrow.icon";
import { Button } from "@/components/Button/Button.component";

import Card from "@/components/Card/Card.component";
import {
    lucroPredictionAddress,
    useLcrAllowance,
    usePrepareLcrApprove,
    usePrepareLucroPredictionBetBull,
    usePrepareLucroPredictionBetBear,
    useLucroPredictionWrite,
    useLcrWrite,
} from "@/hooks/generated";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { useAccount, useContractRead, usePublicClient } from "wagmi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MAX_UINT256 } from "@/utils/constants";
import { Round } from "@/types";
import formatLCR from "@/utils/formatLCR";
import parseLCR from "@/utils/parseLCR";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";
import { useNetwork } from "wagmi";
import { useLucroPredictionGetUserRounds, useLucroPredictionLedger } from "@/hooks/generated";
import { usePrediction } from "@/components/PredictionProvider";

const formatBetError = (error?: string) => {
    if (!error) return;

    if (error.includes("must be greater than minBetAmount")) return "The amount is too low";
    if (error.includes("Pausable: paused")) return "Game paused, please wait";
    if (error.includes("transfer amount exceeds balance")) return "Insufficient balance";
    if (error.includes("Round not bettable")) return "This round is not bettable";
    if (error.includes("only bet once")) return "Bet placed";
    if (error.includes("Insufficient Allowance")) return undefined;
    if (error.includes("Insufficient Balance")) return "Insufficient LCR balance";

    return error;
};

const AMOUNT_PERCENTAGES = [
    ["10", "orange"],
    ["25", "green"],
    ["50", "blue"],
    ["100", "pink"],
] as const;

interface PriceHandlerProps {
    epoch: bigint;
    direction: "up" | "down";
    setCardState: (state: "up" | "down" | "idle") => void;
    upMultiplier: number;
    downMultiplier: number;
    refreshRounds: () => Promise<void>
}

const PriceHandler = ({ epoch, direction, setCardState, downMultiplier, upMultiplier, refreshRounds }: PriceHandlerProps) => {
    const [formError, setFormError] = useState<string>();

    const { address } = useAccount();
    const { data: tokenBalance }: { data: bigint | undefined } = useContractRead({
        address: "0x988f7c894e4001eeb7b570cde80dffe21cf7b6b9",
        abi: [
            {
                name: "balanceOf",
                type: "function",
                inputs: [{ name: "account", type: "address" }],
                outputs: [{ name: "balance", type: "uint256" }],
            },
        ],
        functionName: "balanceOf",
        args: [address],
    });

    const { setNextRoundEntered } = usePrediction();

    const [amount, setAmount] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [debouncedAmount] = useDebounce(parseLCR(amount), 500);
    const [isAllowanceSufficient, setIsAllowanceSufficient] = useState<boolean>(false);

    const { chain } = useNetwork();

    const { data: allowance } = useLcrAllowance({
        args: [address!, lucroPredictionAddress[chain?.id as keyof typeof lucroPredictionAddress]],
        enabled: !!address,
    });

    const { config: approveConfig } = usePrepareLcrApprove({
        args: [lucroPredictionAddress[chain?.id as keyof typeof lucroPredictionAddress], BigInt(MAX_UINT256)],
    });
    const { writeAsync: writeLcr, isLoading: isLoadingLcr } = useLcrWrite(approveConfig);

    const {
        config: upConfig,
        error: upError,
        refetch: upConfigRefetch,
    } = usePrepareLucroPredictionBetBull({
        args: [epoch, debouncedAmount],
        enabled: debouncedAmount > 0n,
    });

    const { writeAsync: writeUp, isLoading: isLoadingUp, reset: resetWriteUp } = useLucroPredictionWrite(upConfig);

    const {
        config: downConfig,
        error: downError,
        refetch: downConfigRefetch,
    } = usePrepareLucroPredictionBetBear({
        args: [epoch, debouncedAmount],
        enabled: debouncedAmount > 0n,
    });

    const {
        writeAsync: writeDown,
        isLoading: isLoadingDown,
        reset: resetWriteDown,
    } = useLucroPredictionWrite(downConfig);

    const client = usePublicClient();

    const handleApprove = async (): Promise<boolean> => {
        try {
            const approveTX = await writeLcr?.();

            if (!approveTX) {
                toast.error("approveTX is undefined");
                setDisabled(false);
                // return false;
                throw new Error("approveTx is undefined");
            }

            await client?.waitForTransactionReceipt(approveTX);

            await upConfigRefetch();
            await downConfigRefetch();

            console.info("executeRound", approveTX.toString());
            setIsAllowanceSufficient(true);
            setDisabled(false);

            // Reset the write state
            resetWriteUp();
            resetWriteDown();

            return true;
        } catch (error) {
            throw error;
        }
    };

    const handleBet = useCallback(async () => {
        console.log("writeup:", writeUp);
        console.log("writedown:", writeDown);

        if (!!writeUp && !!writeDown) {
            if (allowance === undefined) {
                toast.error("allowance is undefined");
                setDisabled(false);
                return;
            }

            setDisabled(false);

            if (direction === "up") {
                await writeUp?.();
            } 
            else {
                await writeDown?.();
            }

            await upConfigRefetch();
            await downConfigRefetch();

            setNextRoundEntered({ entered: true, epoch, position: direction === "up" ? 0 : 1 });

            setCardState("idle");
        } else {
            return;
        }
    }, [allowance, client, debouncedAmount, direction, writeDown, writeLcr, writeUp]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            setDisabled(true);

            setFormError(undefined);
            const formData = new FormData(e.currentTarget);
            const amount = formData.get("amount");

            if (!amount) {
                setFormError("Please provide an amount");
                setDisabled(false);
                return;
            }

            if (!isAllowanceSufficient) {
                try {
                    const approved = await handleApprove();
                    if (approved) {
                        await handleBet();
                        await refreshRounds()
                    } else {
                        console.log({ approved });
                    }
                } catch (error) {
                    console.log(error);
                }
            } else { 
                await handleBet();
                await refreshRounds();
            }
        } catch (error) {
            console.error(error);
            setDisabled(false);
        }
    };

    const failReason = formatBetError(upError?.message) || formatBetError(downError?.message) || undefined;

    useEffect(() => {
        if (debouncedAmount > (allowance || 0)) {
            setIsAllowanceSufficient(false);
        } else {
            setIsAllowanceSufficient(true);
        }
    }, [debouncedAmount, allowance]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 h-full">
                <div className="flex flex-col">
                    <label>
                        commit
                        <input
                            type="number"
                            step="any"
                            placeholder="amount"
                            name="amount"
                            className="w-full bg-transparent outline-none border-2 border-white/80 px-3 py-2 rounded-lg placeholder-white placeholder-opacity-50 mt-1"
                            onChange={(e) => setAmount(e.target.value)}
                            value={amount}
                        />
                    </label>
                    {failReason && <div className="text-red-500">{failReason}</div>}
                    {formError && <div className="text-red-500">{formError}</div>}
                </div>

                <div className="flex justify-between py-2 pl-[4px] mb-2">
                    {AMOUNT_PERCENTAGES.map(([label, color]) => (
                        <Button
                            key={label}
                            className="h-12 w-12 !text-lg"
                            color={color}
                            onClick={() => tokenBalance && setAmount(formatLCR((tokenBalance * BigInt(label)) / 100n))}
                        >
                            {label === "100" ? "MAX" : label.concat("%")}
                        </Button>
                    ))}
                </div>

                <Button
                    className="px-5 py-5 mx-auto"
                    type="submit"
                    disabled={
                        disabled || !!failReason || isLoadingUp || isLoadingDown || isLoadingLcr || !address || !debouncedAmount
                    }
                >
                    {/* {!isAllowanceSufficient ? "APPROVE" : "PLACE BET"} */}
                    PLACE BET
                </Button>

                <p className="text-sm text-center mt-2">Please be aware that modification is not allowed after placing bet.</p>
            </div>
        </form>
    );
};

interface CardNextProps {
    round: Round;
    formattedUpMultiplier: string;
    formattedDownMultiplier: string;
}

const CardNext = ({ round, formattedDownMultiplier, formattedUpMultiplier }: CardNextProps) => {
  const { address } = useAccount();

    const { data, refetch } = useLucroPredictionGetUserRounds({
        args: [address || "0x0", BigInt(0), BigInt(9999)],
        enabled: !!address,
    });

    const { nextRoundEntered } = usePrediction();
    const [isEnteredDown, setIsEnteredDown] = useState<boolean>(false);

    const [cardState, setCardState] = useState<"up" | "down" | "idle">("idle");
    const didUserJoinThisRound =
        data &&
        data[0].some((r: bigint) => {
            return r === round.epoch;
        });

    const refreshRounds = async () => {
        await refetch()
    }

    useEffect(() => {
        if(data) {
            const betInfo = data?.[1][data?.[0].indexOf(round.epoch)];
            setIsEnteredDown(betInfo?.position === 1 || nextRoundEntered.position === 1)
        }
    }, [nextRoundEntered, round, data]);

    return (
        <Card
            legend="next"
            className="embla__slide h-full"
            classNameParent="h-[26rem]"
            didParticipate={didUserJoinThisRound || (nextRoundEntered.entered && nextRoundEntered.epoch === round.epoch)}
            isEnteredDown={isEnteredDown}
        >
            <div className={`relative h-full`}>
                <div
                    className={
                        `py-3 px-5 w-[300px] h-full transition-all duration-300 [backface-visibility:hidden] ` +
                        `${cardState !== "idle" && "[transform:rotateY(180deg)]"}`
                    }
                >
                    <div className="h-5 flex justify-between absolute left-5 right-5 top-3">
                        <div />
                        <p>#{round.epoch.toString()}</p>
                    </div>

                    <div className="grid grid-rows-[105px,1fr,105px] h-full">
                        <div className="flex items-center justify-center relative">
                            <ArrowIcon />
                            <p className="absolute text-xl">{formattedUpMultiplier}x</p>
                            <p className="absolute bottom-5 text-xs">PAYOUT</p>
                            <p className="absolute -bottom-4 text-2xl text-[#B997FF]">UP</p>
                        </div>

                        <div className="w-full h-full bg-[#3636361a] rounded-[20px] flex flex-col px-4 py-6 gap-2 items-center">
                            <div className="flex justify-between w-full">
                                <p>Prize Pool</p>
                                <p>{formatLCR(round.totalAmount)} LCR</p>
                            </div>
                            <div className="grid grid-cols-2 w-full h-full gap-3">
                                <Button
                                    color="green"
                                    className="flex-1 h-full"
                                    onClick={() => setCardState("up")}
                                    disabled={
                                        didUserJoinThisRound || (nextRoundEntered.entered && nextRoundEntered.epoch === round.epoch)
                                    }
                                >
                                    <p>
                                        PRICE <span className="text-2xl">UP</span>
                                    </p>
                                </Button>
                                <Button
                                    color="red"
                                    className="flex-1 h-full"
                                    onClick={() => setCardState("down")}
                                    disabled={
                                        didUserJoinThisRound || (nextRoundEntered.entered && nextRoundEntered.epoch === round.epoch)
                                    }
                                >
                                    <p>
                                        PRICE <span className="text-2xl">DOWN</span>
                                    </p>
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-center relative">
                            <div className="scale-y-flip">
                                <ArrowIcon />
                            </div>
                            <p className="absolute text-xl">{formattedDownMultiplier}x</p>
                            <p className="absolute top-5 text-xs">PAYOUT</p>
                            <p className="absolute -top-5 text-2xl text-[#B997FF]">DOWN</p>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        `absolute inset-0 py-3 px-5 transition-all duration-300 [backface-visibility:hidden] flex flex-col gap-3 ` +
                        `${cardState !== "idle" ? "[transform:rotateY(0deg)]" : "[transform:rotateY(180deg)]"} `
                    }
                >
                    {cardState === "up" ? (
                        <>
                            <div className="flex justify-between">
                                <button onClick={() => setCardState("idle")}>BACK</button>
                                <button onClick={() => setCardState("down")} className="flex items-center gap-1">
                                    <FaArrowUp />
                                    UP
                                </button>
                            </div>
                            <PriceHandler
                                refreshRounds={refreshRounds}
                                epoch={round.epoch}
                                direction="up"
                                setCardState={setCardState}
                                downMultiplier={Number(formattedDownMultiplier)}
                                upMultiplier={Number(formattedUpMultiplier)}
                            />
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between">
                                <button onClick={() => setCardState("idle")}>BACK</button>
                                <button onClick={() => setCardState("up")} className="flex items-center gap-1">
                                    <FaArrowDown />
                                    DOWN
                                </button>
                            </div>
                            <PriceHandler
                                refreshRounds={refreshRounds}
                                epoch={round.epoch}
                                direction="down"
                                setCardState={setCardState}
                                downMultiplier={Number(formattedDownMultiplier)}
                                upMultiplier={Number(formattedUpMultiplier)}
                            />
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default CardNext;
