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
      // let data = await contract.calculatePremium(
      //   "Labrador Retriever",
      //   "20",
      //   "SEVERE",
      //   "North",
      //   "Premium"
      // );

      const { _breed, _ageInMonths, _healthCondition, _region, _policyType } =
        obj;

      const startdate = new Date();
      const endDate = new Date(
        startdate.getFullYear() + 1,
        startdate.getMonth(),
        startdate.getDate()
      );
      const startTimestamp = Math.floor(startdate.getTime() / 1000);
      const endTimestamp = Math.floor(endDate.getTime() / 1000);

      const receipt = await contract.addPolicy(
        _breed,
        _ageInMonths,
        _healthCondition,
        _region,
        _policyType,
        "1680519558234",
        "168051955878787"
      );

      //

      // Get the filter for the PolicyAdded event
      const filter = contract.filters.PolicyAdded();

      // Listen for the event and retrieve the emitted policyId value
      contract.on(
        filter,
        (policyId, owner, premium, payout, startDate, endDate) => {
          alert(`Policy Added Succesfully with policyId ${policyId}`);
          console.log(`New policy added with ID ${policyId}`);
          return policyId;
          // Store the policyId value in a variable or update your UI with the new policyId
        }
      );
      //
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
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log({ signer });
      const contract = new ethers.Contract(
        shwanSurkshaAddress,
        shwanSurksha.abi,
        signer
      );

      const policyData = await contract.getPolicy(policyId);

      console.log(policyData);
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
