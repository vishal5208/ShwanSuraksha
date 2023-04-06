// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IPremimumCalculator {
    function calculatePremium(
        string memory _breed,
        uint _ageInMonths,
        string memory _healthCondition,
        string memory _region,
        string memory _policyType
    ) external view returns (uint premium);

    function calculatePayout(uint premiumAmount) external view returns (uint);

    function getDetails() external view returns (uint, uint, uint);
}
