// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IShwanSurksha {
    function setIsClaimable(address policyHolder, bytes32 policyId) external;

    function getActivePoliciyOf(
        address policyHolder
    ) external view returns (bytes32);
}
