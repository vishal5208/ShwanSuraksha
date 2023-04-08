// import { useState } from "react";
// import { useConnectWallet } from "../Hooks/useConnectWallet";

// export function WalletComponent() {
//   const { account, requestAccount, connectStatus } = useConnectWallet();

//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleConnectWallet = async () => {
//     setIsLoading(true);
//     setErrorMsg("");

//     const result = await requestAccount();

//     setIsLoading(false);

//     if (!result.success) {
//       setErrorMsg(result.msg);
//     }
//   };

//   return (
//     <div style={{ position: "relative", zIndex: 1 }}>
//       {connectStatus === "disconnected" && (
//         <div
//           style={{
//             backgroundColor: "purple",
//             color: "white",
//             padding: "10px",
//             borderRadius: "5px",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <span style={{ marginRight: "10px" }}>Connect Wallet</span>
//           {isLoading && <span style={{ marginRight: "10px" }}>Loading...</span>}
//           {errorMsg && (
//             <span style={{ marginRight: "10px" }}>Error: {errorMsg}</span>
//           )}
//           {!isLoading && !errorMsg && (
//             <button
//               onClick={handleConnectWallet}
//               style={{ marginRight: "10px" }}
//             >
//               Connect
//             </button>
//           )}
//         </div>
//       )}

//       {connectStatus === "connecting" && (
//         <div
//           style={{
//             backgroundColor: "purple",
//             color: "white",
//             padding: "10px",
//             borderRadius: "5px",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <span style={{ marginRight: "10px" }}>Connecting...</span>
//         </div>
//       )}

//       {connectStatus === "connected" && (
//         <div
//           style={{
//             backgroundColor: "var(--primary-color)",
//             color: "white",
//             padding: "5px",
//             borderRadius: "5px",
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <span style={{ marginRight: "10px" }}>
//             {account.slice(0, 5)}...{account.slice(-4)}
//           </span>
//           <span style={{ marginRight: "10px" }}>Connected</span>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import { useConnectWallet } from "../Hooks/useConnectWallet";
import "../../styles/walletcomponent.css";

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
    <div className="wallet-component-wrapper">
      {connectStatus === "disconnected" && (
        <div className="connect-wallet-wrapper">
          <span>Connect&nbsp;Wallet</span>
          {isLoading && <span>Loading...</span>}
          {errorMsg && <span>Error: {errorMsg}</span>}
          {!isLoading && !errorMsg && (
            <button onClick={handleConnectWallet}>Connect</button>
          )}
        </div>
      )}

      {connectStatus === "connecting" && (
        <div className="connecting-wallet-wrapper">
          <span>Connecting...</span>
        </div>
      )}

      {connectStatus === "connected" && (
        <div className="connected-wallet-wrapper">
          <div>
            {account.slice(0, 5)}...{account.slice(-4)}
          </div>
          <div>Connected</div>
        </div>
      )}
    </div>
  );
}
