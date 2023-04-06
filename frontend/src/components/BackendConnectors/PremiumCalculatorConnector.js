const { ethers } = require("ethers");
const premiumCalculator = require("../../constants/premiumCalculatorJson.json");
const { requestAccount, getEthAddress } = require("./commonConnectors");
const contracts = require("./addresses.json");
const premiumCalculatorContractAddress = contracts.premimumCalculator;

const sixDecimals = 6;

export const calcaulatePremium = async (obj) => {
  console.log(obj, "obj");
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log({ signer });
      const contract = new ethers.Contract(
        premiumCalculatorContractAddress,
        premiumCalculator.abi,
        signer
      );

      console.log("i'm in calculate premium");
      // let data = await contract.calculatePremium(
      //   "Labrador Retriever",
      //   "20",
      //   "SEVERE",
      //   "North",
      //   "Premium"
      // );

      const { _breed, _ageInMonths, _healthCondition, _region, _policyType } =
        obj;

      let data = await contract.calculatePremium(
        _breed,
        _ageInMonths,
        _healthCondition,
        _region,
        _policyType
      );
      console.log("data le lo : ", data.toString());
      if (data) {
        return {
          data: ethers.utils.formatUnits(data, sixDecimals),
          success: true,
        };
      }
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
