import { ethers } from "ethers";
import shwanSurksha from "../../constants/ShwanSurkshaJson.json";
import addressesJson from "../BackendConnectors/addresses.json";
import { useEffect } from "react";
import "../BackendConnectors/style.css";

const shwanSurkshaAddr = addressesJson.shwanSurksha;

export function PolicyClaimedListener() {
  useEffect(() => {
    async function listenToPolicyClaimedEvent() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          shwanSurkshaAddr,
          shwanSurksha.abi,
          signer
        );

        // contract.on("PolicyClaimed", (policyId, owner, payout, event) => {
        //   console.log("PolicyClaimed event data: ", {
        //     policyId,
        //     owner,
        //     payout,
        //   });
        //   // Perform any action you want to take when the event is received
        //   const alertBox = document.createElement("div");
        //   alertBox.innerText = `The claim for ShwanSuraksha has been successfully processed for the owner ${owner} with the policy ID ${policyId}. The payout $${payout} has been transferred to the owner's account!!!.`;

        //   alertBox.classList.add("alert-box");
        //   document.body.appendChild(alertBox);
        //   setTimeout(() => {
        //     document.body.removeChild(alertBox);
        //   }, 10000);
        // });

        const filter = contract.filters.PolicyClaimed();
        contract.on(filter, async (policyId, owner, payout) => {
          console.log("Event is emited : ", policyId, owner, payout);
          const alertBox = document.createElement("div");
          alertBox.classList.add("alert-box");
          alertBox.textContent = `The claim for ShwanSuraksha has been successfully processed for the owner ${owner} with the policy ID ${policyId}. The payout $${ethers.utils.formatUnits(
            payout,
            6
          )} has been transferred to the owner's account!!!.`;
          document.body.appendChild(alertBox);
          await new Promise((resolve) => setTimeout(resolve, 10000));
          alertBox.remove();
        });
      } catch (error) {
        console.error("Error while listening to PolicyClaimed event: ", error);
      }
    }

    listenToPolicyClaimedEvent();

    return () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          shwanSurkshaAddr,
          shwanSurksha.abi,
          signer
        );

        contract.removeAllListeners("PolicyClaimed");
      } catch (error) {
        console.error(
          "Error while removing listener for PolicyClaimed event: ",
          error
        );
      }
    };
  }, []);

  return null;
}
