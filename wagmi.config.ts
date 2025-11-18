import { bscTestnet, bsc } from "wagmi/chains";

import { defineConfig } from "@wagmi/cli";
import { react, hardhat } from "@wagmi/cli/plugins";

import addresses from "@/ignition/deployments/chain-97/deployed_addresses.json";

export default defineConfig(() => {
  return {
    out: "hooks/generated.ts",
    plugins: [
      hardhat({
        project: "./",
        deployments: {
          LucroPrediction: {
            [bsc.id]: "0x1C011e01e9E7CD6a8a349cd0f96B11220A8854F1",
            [bscTestnet.id]: addresses["LucroPredictionModule#LucroPrediction"] as `0x${string}`,
          },
          LCR: {
            [bsc.id]: "0x988F7c894e4001EEB7B570CDE80dffE21CF7B6B9",
            [bscTestnet.id]: addresses["LCRModule#LCR"] as `0x${string}`,
          },
        },
      }),
      react(),
    ],
  };
});
