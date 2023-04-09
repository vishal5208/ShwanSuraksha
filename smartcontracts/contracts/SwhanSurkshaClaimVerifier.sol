// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";
import "./interfaces/IShwanSurksha.sol";

contract SwhanSurkshaClaimVerifier is ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;

    IShwanSurksha public shwanSurksha;
    mapping(bytes32 => bool) isClaimed;

    bool private paused;

    event ClaimFailed(address policyHolder, bytes32 policyId);

    constructor(address _shwanSurkshaAddr) {
        shwanSurksha = IShwanSurksha(_shwanSurkshaAddr);
    }

    modifier whenNotPaused() {
        require(
            !paused,
            "Verifier contract is paused and processing another claim, Please wait for sometime"
        );
        _;
    }

    modifier whenPaused() {
        require(
            paused,
            "Verifier contract is paused and processing another claim, Please wait for sometime"
        );
        _;
    }

    function _beforeProofSubmit(
        uint64 /* requestId */,
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal override whenNotPaused {
        // check that challenge input of the proof is equal to the msg.sender
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        require(
            _msgSender() == addr,
            "address in proof is not a sender address"
        );
        paused = true;
    }

    function _afterProofSubmit(
        uint64 /* requestId */,
        uint256[] memory /* inputs*/,
        ICircuitValidator /* validator */
    ) internal override whenPaused {
        bytes32 policyId = shwanSurksha.getPolicyToBeClaimed(_msgSender());
        if (!isClaimed[policyId]) {
            shwanSurksha.setIsClaimable(_msgSender(), policyId);
            // now cliaim the function
            bool success = shwanSurksha.fulfilThePolicyClaim(policyId);
            if (!success) {
                emit ClaimFailed(_msgSender(), policyId);
            } else {
                isClaimed[policyId] = true;
            }
        }

        paused = false;
    }
}
