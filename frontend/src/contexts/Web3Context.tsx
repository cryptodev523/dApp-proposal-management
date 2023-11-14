import { createContext, useContext } from "react";
import { Web3 } from "web3";

interface IWeb3Context {
  web3: Web3 | null;
  account: string | null;
  connectWallet: () => Promise<void>;
}

export const Web3Context = createContext<IWeb3Context>({
  web3: null,
  account: null,
  connectWallet: async () => {},
});

export const useWeb3 = () => useContext(Web3Context);
