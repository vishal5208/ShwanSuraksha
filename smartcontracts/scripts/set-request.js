const contracts = require("../contracts.json");

async function main() {
	const circuitId = "credentialAtomicQuerySig";

	// CredentialAtomicQuerySigValidator Mumbai address
	const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";

	const schemaHash = "78dc11c89bc5610e0c22a62d9c2d3534";

	const schemaEnd = fromLittleEndian(hexToBytes(schemaHash));

	const onChainQuery = {
		schema: ethers.BigNumber.from(schemaEnd),
		slotIndex: 2,
		operator: 1,
		value: [1, ...new Array(63).fill(0).map((i) => 0)],
		circuitId,
	};

	// add the address of the contract just deployed
	const SwhanSurkshaClaimVerifierAddress = contracts.swhanSurkshaClaimVerifier;

	let swhanSurkshaClaimVerifier = await hre.ethers.getContractAt(
		"SwhanSurkshaClaimVerifier",
		SwhanSurkshaClaimVerifierAddress
	);

	const requestId = await swhanSurkshaClaimVerifier.TRANSFER_REQUEST_ID();

	try {
		const tx = await swhanSurkshaClaimVerifier.setZKPRequest(
			requestId,
			validatorAddress,
			onChainQuery
		);

		await tx.wait(1);

		console.log("Request set for onChainquery");
	} catch (e) {
		console.log("error: ", e);
	}
}

function hexToBytes(hex) {
	for (var bytes = [], c = 0; c < hex.length; c += 2)
		bytes.push(parseInt(hex.substr(c, 2), 16));
	return bytes;
}

function fromLittleEndian(bytes) {
	const n256 = BigInt(256);
	let result = BigInt(0);
	let base = BigInt(1);
	bytes.forEach((byte) => {
		result += base * BigInt(byte);
		base = base * n256;
	});
	return result;
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
