import { ChakraProvider, Box, theme, VStack } from "@chakra-ui/react";
import { ProposalForm } from "./components/ProposalForm";
import { ProposalList } from "./components/ProposalList";
import { Web3Context } from "./contexts/Web3Context";
import { useEffect, useState } from "react";
import { Web3 } from "web3";
import { ConnectButton } from "./components/ConnetButton";

export const App = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    if ((window as any).ethereum) {
      const web3Instance = new Web3((window as any).ethereum);
      setWeb3(web3Instance);
    } else {
      console.error("Please install MetaMask!");
    }
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Failed to connect wallet", error);
      }
    } else {
      console.error("Web3 is not initialized!");
    }
  };

  return (
    <Web3Context.Provider value={{ web3, account, connectWallet }}>
      <ChakraProvider theme={theme}>
        <VStack
          spacing={8}
          align="center"
          justify="center"
          style={{
            minHeight: "100vh",
            padding: "2rem",
          }}
        >
          <Box width="100%" maxW="800px" textAlign="center" fontSize="xl">
            {account ? <ProposalForm /> : <ConnectButton />}
          </Box>
          <Box width="100%" maxW="800px">
            <ProposalList />
          </Box>
        </VStack>
      </ChakraProvider>
    </Web3Context.Provider>
  );
};
