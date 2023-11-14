import { Button } from "@chakra-ui/react";
import { useWeb3 } from "../contexts/Web3Context";

export const ConnectButton = () => {
  const { connectWallet, account } = useWeb3();

  return (
    <Button onClick={connectWallet}>
      {account ? `Connected: ${account}` : "Connect Wallet"}
    </Button>
  );
};
