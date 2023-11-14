import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
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
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            {account ? <ProposalForm /> : <ConnectButton />}
            <ProposalList />
          </Grid>
        </Box>
      </ChakraProvider>
    </Web3Context.Provider>
  );
};
