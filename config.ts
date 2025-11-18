import { bsc, bscTestnet } from "wagmi/chains";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

const projectId = "e06fe47568d3ee42bd394c125a498dcd";

const metadata = {
  name: "Lucro Prediction",
  description: "A prediction game on the Binance Smart Chain",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const isDefined = <T>(val: T | boolean): val is T => Boolean(val);

const chains = [bsc, process.env.NODE_ENV === "development" && bscTestnet].filter(isDefined);

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
});
