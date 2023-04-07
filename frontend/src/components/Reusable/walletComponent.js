import { useState } from "react";
import { useConnectWallet } from "../Hooks/useConnectWallet";

export function WalletComponent() {
  const { account, requestAccount, connectStatus } = useConnectWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleConnectWallet = async () => {
    setIsLoading(true);
    setErrorMsg("");

    const result = await requestAccount();

    setIsLoading(false);

    if (!result.success) {
      setErrorMsg(result.msg);
    }
  };

  return (
    <div>
      {connectStatus === "disconnected" && (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}

      {connectStatus === "connecting" && <div>Loading...</div>}

      {connectStatus === "connected" && <div>Account: {account}</div>}

      {errorMsg && <div>Error: {errorMsg}</div>}
    </div>
  );
}
