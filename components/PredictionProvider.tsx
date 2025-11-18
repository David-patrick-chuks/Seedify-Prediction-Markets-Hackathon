import { useAccount } from "wagmi";

import { useGetRoundsData } from "@/hooks/useGetRoundsData";
import { useGetUserRounds } from "@/hooks/useGetUserRounds";
import { usePredictionData } from "@/hooks/usePredictionData";
import { Round } from "@/types";
import { createContext, Dispatch, memo, useContext, useEffect, useState } from "react";

// const getEpochsToFetch = (currentEpoch?: bigint) => {
//     if (!currentEpoch) return [];

//     let lastEpoch = currentEpoch + BigInt(1)

//     let epochs: bigint[] = [lastEpoch];
//     for (let i = 1; i <= lastEpoch && i <= 4; i++) {
//         epochs.unshift(lastEpoch - BigInt(i));
//     }

//     return epochs;
// };

const getEpochsToFetch = (currentEpoch?: bigint) => {
    if (!currentEpoch) return [];
    let epochs: bigint[] = [currentEpoch];
    for (let i = 1; i <= currentEpoch && i <= 4; i++) {
        epochs.unshift(currentEpoch - BigInt(i));
    }
    return epochs;
};

type PredictionContextType = {
    currentEpoch: bigint;
    paused: boolean;
    genesisStartOnce: boolean;
    genesisLockOnce: boolean;
    bufferSeconds: bigint;
    intervalSeconds: bigint;
    minBetAmount: bigint;
    chainlinkOraclePrice: bigint;
    rounds: Round[];
    userRounds: Array<{
        epoch: bigint;
        ledger: {
            position: number;
            amount: bigint;
            claimed: boolean;
        };
        cursor: bigint;
    }>;
    currentRound: Round;
    nextRoundEntered: {
        entered: boolean,
        epoch: bigint,
        position: number,
    },
    setNextRoundEntered: React.Dispatch<React.SetStateAction<{entered: boolean, epoch: bigint, position: number}>>
};
const PredictionContext = createContext<PredictionContextType | undefined>({} as PredictionContextType);

interface PredictionProviderProps {
    children: React.ReactNode;
}

const PredictionProvider = ({ children }: PredictionProviderProps) => {
    const { data: initialData, isLoading: isLoadingInitialData, refetch: refetchInitialData } = usePredictionData();
    const {
        data: rounds,
        isLoading: isLoadingRounds,
        refetch: refetchRounds,
    } = useGetRoundsData(getEpochsToFetch(initialData?.[0]));

    const { address } = useAccount()

    const { data: userRounds } = useGetUserRounds(address || `0x${'0'}`)

    const [nextRoundEntered, setNextRoundEntered] = useState({
        entered: false,
        epoch: 0n,
        position: 0
    })

    if (isLoadingInitialData) {
        return <div>Loading initial data...</div>;
    }

    if (!initialData) {
        return (
            <div>
                Failed loading data
                <button onClick={() => refetchInitialData()}>Retry</button>
            </div>
        );
    }

    if (isLoadingRounds) {
        return <div>Loading rounds...</div>;
    }

    if (!rounds) {
        return (
            <div>
                Failed loading rounds
                <button onClick={() => refetchRounds()}>Retry</button>
            </div>
        );
    }

    return (
        <PredictionContext.Provider
            value={{
                currentEpoch: initialData[0],
                paused: initialData[1],
                genesisStartOnce: initialData[2],
                genesisLockOnce: initialData[3],
                bufferSeconds: initialData[4],
                intervalSeconds: initialData[5],
                minBetAmount: initialData[6],
                chainlinkOraclePrice: initialData[7],
                rounds,
                userRounds: userRounds?.result || [],
                currentRound: rounds[rounds.length - 2],
                nextRoundEntered,
                setNextRoundEntered
            }}
        >
            {children}
        </PredictionContext.Provider>
    );
};

export default PredictionProvider;

export const usePrediction = () => {
    const context = useContext(PredictionContext);
    if (context === undefined) {
        throw new Error("usePrediction must be used within a PredictionProvider");
    }
    return context;
};