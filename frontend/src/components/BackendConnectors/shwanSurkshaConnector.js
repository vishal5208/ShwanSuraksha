import "./style.css";

const { ethers } = require("ethers");
const shwanSurksha = require("../../constants/ShwanSurkshaJson.json");
const { requestAccount, getEthAddress } = require("./commonConnectors");
const contracts = require("./addresses.json");
const shwanSurkshaAddress = contracts.shwanSurksha;

export const addPolicy = async (obj) => {
  console.log(obj, "obj");
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log({ signer });
      const contract = new ethers.Contract(
        shwanSurkshaAddress,
        shwanSurksha.abi,
        signer
      );

      console.log("i'm in swansurksha");

      const {
        _breed,
        _ageInMonths,
        _healthCondition,
        _region,
        _policyType,
        _ipfsHash,
      } = obj;

      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1); // Set start date to 1 day after current date
      const endDate = new Date(startDate);
      endDate.setFullYear(startDate.getFullYear() + 1); // Set end date to 1 year after start date
      const startTimestamp = Math.floor(startDate.getTime() / 1000);
      const endTimestamp = Math.floor(endDate.getTime() / 1000);

      const receipt = await contract.addPolicy(
        _breed,
        _ageInMonths,
        _healthCondition,
        _region,
        _policyType,
        _ipfsHash,
        startTimestamp.toString(),
        endTimestamp.toString()
      );

      const filter = contract.filters.PolicyAdded();
      contract.on(
        filter,
        async (
          policyId,
          owner,
          premium,
          payout,
          startDate,
          endDate,
          _ipfsHash
        ) => {
          console.log(`New policy added with ID ${policyId}`);
          const alertBox = document.createElement("div");
          alertBox.classList.add("alert-box");
          alertBox.textContent = `Policy Added Successfully with policy ID ${policyId}`;
          document.body.appendChild(alertBox);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          alertBox.remove();
          return policyId;
        }
      );
    } else {
      return {
        success: false,
        msg: "Please connect your wallet!",
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

export const getActivePoliciyOf = async (userAddr) => {
  console.log("User Address : ", userAddr);
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log({ signer });
      const contract = new ethers.Contract(
        shwanSurkshaAddress,
        shwanSurksha.abi,
        signer
      );

      const policyId = await contract.getActivePoliciyOf(userAddr);

      console.log(policyId);
      return policyId;
    } else {
      return {
        success: false,
        msg: "Please connect your wallet!",
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

export const getPolicy = async (policyId) => {
  try {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        shwanSurkshaAddress,
        shwanSurksha.abi,
        signer
      );

      const policyData = await contract.getPolicy(policyId);

      return {
        success: true,
        data: policyData,
      };
    } else {
      return {
        success: false,
        msg: "Please connect your wallet!",
      };
    }
  } catch (error) {
    return {
      success: false,
      msg: error.message,
    };
  }
};

export const claimPolicy = async (policyId) => {
  console.log(policyId, "policyId");
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log({ signer });
      const contract = new ethers.Contract(
        shwanSurkshaAddress,
        shwanSurksha.abi,
        signer
      );
      const transaction = await contract.claimPolicy(policyId);
      console.log(transaction);
      await transaction.wait(); // Wait for transaction to be mined
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
