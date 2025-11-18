import { Native, ChainId, CurrencyAmount, TradeType, Percent, ERC20Token } from "@pancakeswap/sdk";
import { SmartRouter, SmartRouterTrade, SMART_ROUTER_ADDRESSES, SwapRouter } from "@pancakeswap/smart-router";
import { SiBnbchain } from "react-icons/si";

import { GraphQLClient } from "graphql-request";

import { Button } from "@/components/Button/Button.component";
import Card from "@/components/Card/Card.component";
import { useAccount, usePublicClient } from "wagmi";
import { hexToBigInt, parseEther } from "viem";
import { useSendTransaction } from "wagmi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import LCRIcon from "@/components/Icons/LCR.icon";
import { HiArrowNarrowDown, HiRefresh } from "react-icons/hi";
import { SWAP_ADDRESSES } from "@/constants";
import { toast } from "react-toastify";

const chainId = ChainId.BSC;
const swapFrom = Native.onChain(chainId);
const swapTo = new ERC20Token(chainId, SWAP_ADDRESSES[chainId], 9, "LCR", "Lucro");

const v3SubgraphClient = new GraphQLClient("https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc");
const v2SubgraphClient = new GraphQLClient("https://proxy-worker-api.pancakeswap.com/bsc-exchange");

function calculateGasMargin(value: bigint, margin = 1000n): bigint {
  return (value * (10000n + margin)) / 10000n;
}

const quoteProvider = SmartRouter.createQuoteProvider({
  // @ts-ignore
  onChainProvider: () => client,
});

export const SwapCard = () => {
  const { address, isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const [inputValue, setInputValue] = useState("1");
  const [_amount, setAmount] = useState("1");
  const [loading, setLoading] = useState(false);

  const [debouncedInputValue] = useDebounce(inputValue, 1000);

  useEffect(() => {
    setAmount(debouncedInputValue);
  }, [debouncedInputValue]);

  const debouncedAmount = useMemo(() => CurrencyAmount.fromRawAmount(swapFrom, parseEther(_amount || "1")), [_amount]);

  const [trade, setTrade] = useState<SmartRouterTrade<TradeType> | null>(null);

  const publicClient = usePublicClient();

  const [routingError, setRoutingError] = useState<string | null>(null);

  const getBestRoute = useCallback(async () => {
    setRoutingError(null);
    setLoading(true);
    const [v2Pools, v3Pools] = await Promise.all([
      SmartRouter.getV2CandidatePools({
        // @ts-ignore
        onChainProvider: () => publicClient,
        v2SubgraphProvider: () => v2SubgraphClient,
        v3SubgraphProvider: () => v3SubgraphClient,
        currencyA: debouncedAmount.currency,
        currencyB: swapTo,
      }),
      SmartRouter.getV3CandidatePools({
        // @ts-ignore
        onChainProvider: () => publicClient,
        subgraphProvider: () => v3SubgraphClient,
        currencyA: debouncedAmount.currency,
        currencyB: swapTo,
        subgraphFallback: false,
      }),
    ]);
    const pools = [...v2Pools, ...v3Pools];
    try {
      const trade = await SmartRouter.getBestTrade(debouncedAmount, swapTo, TradeType.EXACT_INPUT, {
        gasPriceWei: () => publicClient.getGasPrice(),
        maxHops: 2,
        maxSplits: 2,
        poolProvider: SmartRouter.createStaticPoolProvider(pools),
        quoteProvider,
        quoterOptimization: true,
      });
      setTrade(trade);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setRoutingError(e instanceof Error ? e.message : "An error occurred while routing the trade");
      setLoading(false);
    }
  }, [debouncedAmount, publicClient]);

  const swapCallParams = useMemo(() => {
    if (!trade) return null;

    const { value, calldata } = SwapRouter.swapCallParameters(trade, {
      recipient: address,
      slippageTolerance: new Percent(1),
    });

    return {
      address: SMART_ROUTER_ADDRESSES[chainId],
      calldata,
      value,
    };
  }, [trade, address]);

  const onSwap = useCallback(async () => {
    if (!isConnected) return;
    if (!swapCallParams || !address) return;

    const { value, calldata, address: routerAddress } = swapCallParams;

    const tx = {
      account: address,
      to: routerAddress,
      data: calldata,
      value: hexToBigInt(value),
    };

    try {
      const gasEstimate = await publicClient.estimateGas(tx);

      await sendTransactionAsync({
        account: address,
        chainId,
        to: routerAddress,
        data: calldata,
        value: hexToBigInt(value),
        gas: calculateGasMargin(gasEstimate),
      });
    } catch (e: any) {
      console.error(e);

      if (e.message.includes("the account does not have enough funds")) {
        toast.error("Insufficient BNB balance");
      } else {
        toast.error("Error swapping: " + e.message);
      }
    }
  }, [isConnected, swapCallParams, address, publicClient, sendTransactionAsync]);

  useEffect(() => {
    try {
      getBestRoute();
    } catch (e) {
      console.error(e);
    }
  }, [debouncedAmount, getBestRoute]);

  return (
    <div>
      <Card legend="quick swap" color="pinia" className="p-5 " classNameParent="w-full max-w-[440px]">
        {/* {routingError && <div className="bg-red-200 p-3 rounded-lg text-red-800">{routingError}</div>} */}
        <div className="flex flex-row gap-9 h-[160px]">
          <div className="w-1/2 py-4 flex flex-col justify-around items-center">
            <div className="grid grid-cols-[auto,1fr,auto] gap-2 items-center w-full border-2 border-white/80 p-2 rounded-lg">
              <SiBnbchain color="#F9D230" size={24} />
              <input
                type="number"
                className="bg-transparent w-full outline-none ring-0 placeholder-white placeholder-opacity-50"
                placeholder="1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading || !isConnected}
              />
              <p>BNB</p>
            </div>

            {loading ? <HiRefresh className="infiniteSpin" size={24} /> : <HiArrowNarrowDown size={24} />}

            <div className="grid grid-cols-[auto,1fr,auto] gap-2 items-center w-full border-2 border-white/80 p-2 rounded-lg">
              <LCRIcon className="stroke-0" />
              <input
                type="number"
                className="bg-transparent w-full outline-none ring-0 placeholder-white placeholder-opacity-50"
                placeholder="0.0000013 LCR"
                disabled
                value={trade?.outputAmount.toExact() || "?"}
              />
              <p>LCR</p>
            </div>
          </div>

          <div className="w-[148px] py-4">
            <Button
              onClick={onSwap}
              className="w-full h-full text-shadow-[0_4px_4px_rgba(161,148,38,1)] !text-[40px] !rounded-3xl"
              color="yellow"
            >
              SWAP
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
