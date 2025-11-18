import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/Button/Button.component";
import { WalletIcon } from "./assets/Wallet.icon";
import { UserIcon } from "./assets/User.icon";
import { applyEllipseInCenter } from "@/utils/Primitives.util";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export const ConnectButton = () => {
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const { open } = useWeb3Modal();

  if (isConnected) {
    return (
      <Button onClick={disconnect} color="purple" prependIcon={<UserIcon />}>
        {applyEllipseInCenter(address as string)}
      </Button>
    );
  }

  return (
    <Button
      // key={connector.id}
      // disabled={isPending}
      onClick={() => open()}
      color="purple"
      prependIcon={<WalletIcon />}
    >
      CONNECT
    </Button>
  );
};
