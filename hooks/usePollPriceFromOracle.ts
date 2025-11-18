import { chainlinkOracleABI } from "@/abi/chainlinkOracle";
import { useEffect } from "react";
import { useAccount, useNetwork, useContractRead } from "wagmi";
import { useLucroPredictionOracle, lucroPredictionAddress } from "./generated";
import { POLLING_INTERVAL } from "@/utils/constants";

export const usePollPriceFromOracle = () => {
  const { chain } = useNetwork();
  const { data } = useLucroPredictionOracle();

  const { data: chainlinkOraclePrice = BigInt(0), refetch: refetchChainlinkOraclePrice } = useContractRead({
    abi: chainlinkOracleABI,
    address: data,
    functionName: "latestAnswer",
    chainId: chain?.id as keyof typeof lucroPredictionAddress,
  });

  useEffect(() => {
    const interval = setInterval(refetchChainlinkOraclePrice, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [refetchChainlinkOraclePrice]);

  return { chainlinkOraclePrice };
};
