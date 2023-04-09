import { ethers } from "ethers";
import shwanSurksha from "../../constants/ShwanSurkshaJson.json";
import addressesJson from "../BackendConnectors/addresses.json";
import { useEffect } from "react";

const shwanSurkshaAddr = addressesJson.shwanSurksha;

export function PolicyClaimedListener() {
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      shwanSurkshaAddr,
      shwanSurksha.abi,
      signer
    );
    const policyClaimedEvent = contract?.events?.PolicyClaimed();
    if (policyClaimedEvent) {
      policyClaimedEvent.on("data", (event) => {
        console.log("PolicyClaimed event data: ", event.returnValues);
        // Perform any action you want to take when the event is received
      });
      policyClaimedEvent.on("error", (error) => {
        console.error("Error while listening to PolicyClaimed event: ", error);
      });
    }

    return () => {
      if (policyClaimedEvent) {
        policyClaimedEvent.removeAllListeners();
      }
    };
  }, []);

  return null;
}
