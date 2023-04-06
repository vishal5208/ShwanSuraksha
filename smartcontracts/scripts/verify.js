const hre = require("hardhat");
const contracts = require("../contracts.json");

async function verifyContracts(contractInfo) {
	for (const info of contractInfo) {
		await hre.run("verify:verify", {
			address: info.address,
			constructorArguments: info.args || [],
		});
	}
}

const contractsToVerify = [
	{
		address: contracts.premimumCalculator,
		args: [], // Add constructor arguments for Contract 1
	},

	{
		address: contracts.swhanSurkshaClaimVerifier,
		args: [contracts.shwanSurksha], // Add constructor arguments for Contract 3
	},
	{
		address: contracts.shwanSurksha,
		args: [], // Add constructor arguments for Contract 4
	},
];

verifyContracts(contractsToVerify);
