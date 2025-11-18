"use client";

import { ReactNode } from "react";
import { useAccount, useConfig, useNetwork, useSwitchNetwork } from "wagmi";

const NetworkGuard = ({ children }: { children: ReactNode }) => {
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { error, switchNetwork } = useSwitchNetwork();
  const { chains } = useConfig();

  if (!isConnected) return <>{children}</>;

  const isSupportedChain = chains?.some((c) => c.id === chain?.id);

  if (isSupportedChain) return <>{children}</>;

  return (
    <div>
      <p>Please select a supported network:</p>
      {chains?.map((chain) => (
        <button key={chain.id} onClick={() => switchNetwork?.(chain.id)}>
          {chain.name}
        </button>
      ))}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default NetworkGuard;
