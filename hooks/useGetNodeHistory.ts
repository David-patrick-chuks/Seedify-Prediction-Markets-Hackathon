import { lucroPredictionABI, lucroPredictionAddress } from "@/hooks/generated";
import { Address, PublicClient, useNetwork, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { getUserRounds } from "./useGetUserRounds";
import { getRoundsData } from "./useGetRoundsData";

export const getClaimStatuses = async (
    client: PublicClient,
    address: Address,
    args: {
        account: Address;
        epochs: bigint[];
    }
) => {
    const response = await client.multicall({
        contracts: args.epochs.map(
            (epoch) =>
            ({
                abi: lucroPredictionABI,
                address,
                functionName: "claimable",
                args: [BigInt(epoch), args.account] as const,
            } as const)
        ),
        allowFailure: false,
    });

    const claimableStatuses: Record<number, boolean> = {};

    for (let i = 0; i < response.length; i++) {
        claimableStatuses[Number(args.epochs[i])] = response[i];
    }

    return claimableStatuses;
};

export const getUsersRoundsLength = async (
    client: PublicClient,
    address: Address,
    args: {
        account: Address;
    }
) => {
    const userRoundsLength = await client.readContract({
        abi: lucroPredictionABI,
        address,
        functionName: "getUserRoundsLength",
        args: [args.account],
    });

    return userRoundsLength;
};

const getNodeHistory = async (
    client: PublicClient,
    address: Address,
    args: {
        account: Address;
    }
) => {
    const userRoundsLength = Number(await getUsersRoundsLength(client, address, { account: args.account }));

    const emptyResult = {
        bets: {
            result: [],
            cursor: 0,
        },
        claimableStatuses: {} as Record<number, boolean>,
        totalHistory: userRoundsLength,
        roundData: [],
    };

    const userRounds = await getUserRounds(client, address, {
        account: args.account,
        cursor: 0,
        size: 999,
    });

    if (!userRounds) {
        return emptyResult;
    }

    // const epochs = Object.keys(userRounds.result).map((epochStr) => BigInt(epochStr));
    const epochs = userRounds.result.map(round => round.epoch)

    const [roundData, claimableStatuses] = await Promise.all([
        getRoundsData(client, address, {
            epochs,
        }),
        getClaimStatuses(client, address, {
            account: args.account,
            epochs,
        }),
    ]);

    return {
        bets: userRounds,
        claimableStatuses,
        totalHistory: userRoundsLength,
        roundData,
    };
};

export const useGetNodeHistory = (account?: Address) => {
    const client = usePublicClient();
    const { chain } = useNetwork();

    const chainId = (chain?.id || 56) as keyof typeof lucroPredictionAddress;
    const address = lucroPredictionAddress[chainId];

    return useQuery({
        queryKey: ["rounds", account],
        enabled: !!account,
        queryFn: async () => {
            if (!account) {
                return {
                    bets: {
                        result: [],
                        cursor: 0,
                    },
                    claimableStatuses: {},
                    totalHistory: 0,
                    roundData: [],
                };
            }

            return getNodeHistory(client, address, { account });
        },
    });
};
