import React, { useState } from "react";
import "../../styles/polygonid.css";
import { QRCode } from "react-qr-svg";
import { claimPolicy } from "../BackendConnectors/shwanSurkshaConnector";

const data = {
  id: "c811849d-6bfb-4d85-936e-3d9759c7f105",
  typ: "application/iden3comm-plain-json",
  type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  body: {
    transaction_data: {
      contract_address: "0x449aF2d309ecc01Bf1827CabD77cE3Bfd994EF2c",
      method_id: "b68967e2",
      chain_id: 80001,
      network: "polygon-mumbai",
    },
    reason: "SwhanSurkshaClaim",
    scope: [
      {
        id: 1,
        circuit_id: "credentialAtomicQuerySig",
        rules: {
          query: {
            allowed_issuers: ["*"],
            req: {
              ShwanSurkshaClaim: {
                $eq: 1,
              },
            },
            schema: {
              url: "https://platform-test.polygonid.com/claim-link/cd9902a8-c4fb-4d1f-8b36-3e68f38f4487",
              type: "ShwanSurkshaClaim",
            },
          },
        },
      },
    ],
  },
};

function ClaimButton({ policyId }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClick = async () => {
    try {
      const response = await claimPolicy(policyId);
      if (response.success) {
        setSuccess(true);
        setError(null);
      } else {
        setSuccess(false);
        setError(response.msg);
      }
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <main>
        <section className="blockpass-package-left-side">
          <section
            className="repu-card blockpass-package-flex-center button-group bottom-buttons"
            style={{
              background: "#C1B4F3",
            }}
          >
            <button
              onClick={() => {
                openInNewTab(
                  "https://platform-test.polygonid.com/claim-link/cd9902a8-c4fb-4d1f-8b36-3e68f38f4487"
                );
              }}
              className="bottom-button"
            >
              Claim ShwanSurksha
            </button>
          </section>

          <section
            className="blockpass-package-flex-center repu-card qrcode-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#C1B4F3",
            }}
          >
            <h3>Verify the claim and get your payout</h3>
            <QRCode
              level="Q"
              style={{ width: 256 }}
              value={JSON.stringify(data)}
            />
          </section>

          {/* <section
            className="repu-card blockpass-package-flex-center button-group bottom-buttons"
            style={{
              background: "#C1B4F3",
            }}
          >
            <h3>Only after verification click here</h3>
            <div>
              <button onClick={handleClick}>Claim Policy</button>
              {error && <p>Error: {error}</p>}
              {success && <p>Policy claimed successfully!</p>}
            </div>
          </section> */}
        </section>
      </main>
    </div>
  );
}

export default ClaimButton;
