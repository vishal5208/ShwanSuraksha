const hre = require("hardhat");
const fs = require("fs");

let premimumCalculator, shwanSurksha, swhanSurkshaClaimVerifier;
const usdcAddr = "0x2d1953E354d338b88CAD180DD7Fc38e297C2E53A";

async function main() {
	// premium calculator
	const PremimumCalculator = await hre.ethers.getContractFactory(
		"PremimumCalculator"
	);
	premimumCalculator = await PremimumCalculator.deploy();
	await premimumCalculator.deployed();

	// inititalze premimiumCalculator
	await premimumCalculator.initialize("300000000", "10", "90");

	// // usdcToken
	// const USDCToken = await hre.ethers.getContractFactory("USDCToken");
	// const uSDCToken = await USDCToken.deploy("9999999999999999000000");
	// await uSDCToken.deployed();

	// shwanSurksha
	const ShwanSurksha = await hre.ethers.getContractFactory("ShwanSurksha");
	shwanSurksha = await ShwanSurksha.deploy();
	await shwanSurksha.deployed();

	//SwhanSurkshaClaimVerifier
	const SwhanSurkshaClaimVerifier = await hre.ethers.getContractFactory(
		"SwhanSurkshaClaimVerifier"
	);
	swhanSurkshaClaimVerifier = await SwhanSurkshaClaimVerifier.deploy(
		shwanSurksha.address
	);
	await swhanSurkshaClaimVerifier.deployed();

	// initialize shwanSurksha
	await shwanSurksha.updateContractsAddress(
		usdcAddr,
		premimumCalculator.address,
		swhanSurkshaClaimVerifier.address
	);

	console.log(
		"PremimumCalculator is deployed at : ",
		premimumCalculator.address
	);

	console.log("USDCToken is deployed at : ", usdcAddr);

	console.log(
		"SwhanSurkshaClaimVerifier is deployed at : ",
		swhanSurkshaClaimVerifier.address
	);

	console.log("shwanSurksha is deployed at : ", shwanSurksha.address);

	// Write contract addresses to file
	const contracts = {
		premimumCalculator: premimumCalculator.address,
		shwanSurksha: shwanSurksha.address,
		swhanSurkshaClaimVerifier: swhanSurkshaClaimVerifier.address,
		usdcAddr: usdcAddr,
	};
	fs.writeFileSync("contracts.json", JSON.stringify(contracts, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
