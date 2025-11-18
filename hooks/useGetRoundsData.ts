import { lucroPredictionABI, lucroPredictionAddress } from "@/hooks/generated";
import { Address, PublicClient, useNetwork, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { POLLING_INTERVAL } from "@/utils/constants";
import { Round } from "@/types";

export const getRoundsData = async (client: PublicClient, address: Address, args: { epochs: bigint[] }) => {
    const response = await client?.multicall({
        contracts: args.epochs.map(
            (epoch) =>
            ({
                address,
                abi: lucroPredictionABI,
                functionName: "rounds",
                args: [epoch],
            } as const)
        ),
        allowFailure: false,
    });

    return response.map((r) => ({
        epoch: r[0],
        startTimestamp: r[1],
        lockTimestamp: r[2],
        closeTimestamp: r[3],
        lockPrice: r[4],
        closePrice: r[5],
        lockOracleId: r[6],
        closeOracleId: r[7],
        totalAmount: r[8],
        bullAmount: r[9],
        bearAmount: r[10],
        rewardBaseCalAmount: r[11],
        rewardAmount: r[12],
        oracleCalled: r[13],
    }));
};

export const useGetRoundsData = (epochs: bigint[] = []) => {
    const client = usePublicClient();
    const { chain } = useNetwork();

    const chainId = (chain?.id || 56) as keyof typeof lucroPredictionAddress;
    const address = lucroPredictionAddress[chainId];

    return useQuery<Round[]>({
        refetchInterval: POLLING_INTERVAL,
        placeholderData: (data) => (data?.length === 0 ? undefined : data),
        queryKey: ["rounds", epochs.map((e) => e.toString())],
        queryFn: async () => {
            if (epochs.length === 0) {
                return [];
            }

            return getRoundsData(client, address, { epochs });
        },
    });
};
