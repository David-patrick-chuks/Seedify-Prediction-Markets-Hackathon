import { lucroPredictionABI, lucroPredictionAddress } from "@/hooks/generated";
import { Address, PublicClient, useNetwork, usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";

interface GetUserRoundsArgs {
  account: Address;
  cursor: number;
  size: number;
}

export const getUserRounds = async (client: PublicClient, address: Address, args: GetUserRoundsArgs) => {
  const [epochs, ledgers, cursor] = await client.readContract({
    abi: lucroPredictionABI,
    address: address,
    functionName: "getUserRounds",
    args: [args.account, BigInt(args.cursor), BigInt(args.size)],
  });

  const result = [];

  for (let i = 0; i < epochs.length; i++) {
    result.push({
      epoch: epochs[i],
      ledger: ledgers[i],
      cursor,
    });
  }

  return {
    result,
    cursor: Number(cursor),
  };
};

export const useGetUserRounds = (account: Address, cursor = 0, size = 999) => {
  const client = usePublicClient();
  const { chain } = useNetwork();

  const chainId = (chain?.id || 56) as keyof typeof lucroPredictionAddress;
  const address = lucroPredictionAddress[chainId];

  return useQuery({
    queryKey: ["getUserRounds", account, cursor, size],
    queryFn: async () => {
      return getUserRounds(client, address, { account, cursor, size });
    },
  });
};
