import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useConnectWallet() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [connectStatus, setConnectStatus] = useState("disconnected");

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);

        try {
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setConnectStatus("connected");
          }
        } catch (error) {
          console.error(error);
        }

        window.ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length === 0) {
            setAccount(null);
            setConnectStatus("disconnected");
          } else {
            setAccount(accounts[0]);
            setConnectStatus("connected");
          }
        });

        window.ethereum.on("chainChanged", (chainId) => {
          setProvider(new ethers.providers.Web3Provider(window.ethereum));
          setAccount(null);
          setConnectStatus("disconnected");
        });
      } else {
        console.log("No Ethereum wallet detected");
      }
    };
    init();
  }, []);

  const requestAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnectStatus("connected");
        const accounts = await provider.listAccounts();
        setAccount(accounts[0]);
        return { success: true };
      } catch (error) {
        setConnectStatus("disconnected");
        return { success: false, msg: error.message };
      }
    } else {
      setConnectStatus("disconnected");
      return { success: false, msg: "No Ethereum wallet detected" };
    }
  };

  return { provider, account, requestAccount, connectStatus };
}
