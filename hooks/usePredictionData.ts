import { chainlinkOracleABI } from "@/abi/chainlinkOracle";
import { lucroPredictionABI, lucroPredictionAddress } from "@/hooks/generated";
import { ORACLE_ADDRESS, POLLING_INTERVAL } from "@/utils/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNetwork, usePublicClient } from "wagmi";

export const usePredictionData = () => {
  const { chain } = useNetwork();
  const client = usePublicClient();

  const chainId = (chain?.id || 56) as 97 | 56;

  const address = lucroPredictionAddress[chainId];

  const predictionContract = useMemo(() => {
    return { address, abi: lucroPredictionABI };
  }, [address]);

  const priceFeedContract = useMemo(() => {
    return { address: ORACLE_ADDRESS[chainId], abi: chainlinkOracleABI };
  }, [chainId]);

  return useQuery({
    queryKey: ["initialData"],
    refetchInterval: POLLING_INTERVAL,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      return await client?.multicall({
        contracts: [
          { ...predictionContract, functionName: "currentEpoch" },
          { ...predictionContract, functionName: "paused" },
          { ...predictionContract, functionName: "genesisStartOnce" },
          { ...predictionContract, functionName: "genesisLockOnce" },
          { ...predictionContract, functionName: "bufferSeconds" },
          { ...predictionContract, functionName: "intervalSeconds" },
          { ...predictionContract, functionName: "minBetAmount" },
          { ...priceFeedContract, functionName: "latestAnswer" },
        ],
        allowFailure: false,
      });
    },
  });
};
