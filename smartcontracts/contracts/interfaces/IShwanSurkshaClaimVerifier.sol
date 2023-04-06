// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IShwanSurkshaClaimVerifier {
    function getIsClaimable(address claimer) external view returns (bool);
}
