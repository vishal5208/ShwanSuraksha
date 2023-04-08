// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IShwanSurksha {
    function setIsClaimable(address policyHolder, bytes32 policyId) external;

    function getPolicyToBeClaimed(
        address policyHolder
    ) external view returns (bytes32);

    function fulfilThePolicyClaim(bytes32 policyId) external returns (bool);
}
