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
    <div style={{ position: "relative", zIndex: 1 }}>
      {connectStatus === "disconnected" && (
        <div
          style={{
            backgroundColor: "purple",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "10px" }}>Connect Wallet</span>
          {isLoading && <span style={{ marginRight: "10px" }}>Loading...</span>}
          {errorMsg && (
            <span style={{ marginRight: "10px" }}>Error: {errorMsg}</span>
          )}
          {!isLoading && !errorMsg && (
            <button
              onClick={handleConnectWallet}
              style={{ marginRight: "10px" }}
            >
              Connect
            </button>
          )}
        </div>
      )}

      {connectStatus === "connecting" && (
        <div
          style={{
            backgroundColor: "purple",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "10px" }}>Connecting...</span>
        </div>
      )}

      {connectStatus === "connected" && (
        <div
          style={{
            backgroundColor: "purple",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "10px" }}>
            {account.slice(0, 5)}...{account.slice(-4)}
          </span>
          <span style={{ marginRight: "10px" }}>Connected</span>
        </div>
      )}
    </div>
  );
}
