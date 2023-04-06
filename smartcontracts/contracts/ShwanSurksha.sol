// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IPremimumCalculator.sol";

contract ShwanSurksha {
    // Struct to represent a policy
    struct Policy {
        address owner;
        uint256 premium;
        uint256 payout;
        uint256 startDate;
        uint256 endDate;
        bool claimed;
        string breed;
        uint ageInMonths;
        string healthCondition;
        string region;
        string policyType;
    }

    // Mapping to store policies by their unique ID
    mapping(bytes32 => Policy) policy;
    mapping(address => bytes32[]) public policyHolderToIDs;
    mapping(address => mapping(bytes32 => bool)) private isClaimable;

    // Events to emit when policies are added and claimed
    event PolicyAdded(
        bytes32 policyId,
        address owner,
        uint256 premium,
        uint256 payout,
        uint256 startDate,
        uint256 endDate
    );
    event PolicyClaimed(bytes32 policyId, address owner, uint256 payout);
    event PolicyUpdated(bytes32 policyId, address owner, uint256 newEndDate);
    event policyCancelled(bytes32 policyId);

    IERC20 usdc;
    IPremimumCalculator premimumCalculator;
    address private verifier;

    address admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function updateContractsAddress(
        address _usdcTokenAddress,
        address _premimumCalculator,
        address _verifierContractAddress
    ) external onlyAdmin {
        usdc = IERC20(_usdcTokenAddress);
        premimumCalculator = IPremimumCalculator(_premimumCalculator);
        verifier = _verifierContractAddress;
    }

    // set isClaimable true by verifier(polygonID)
    function setIsClaimable(address policyHolder, bytes32 policyId) public {
        require(msg.sender == verifier);
        isClaimable[policyHolder][policyId] = true;
    }

    // Function to add a new policy
    function addPolicy(
        string memory _breed,
        uint _ageInMonths,
        string memory _healthCondition,
        string memory _region,
        string memory _policyType,
        uint256 startDate,
        uint256 endDate
    ) public {
        bytes32 policyId = keccak256(
            abi.encodePacked(
                msg.sender,
                block.timestamp,
                _breed,
                _ageInMonths,
                _healthCondition,
                _region,
                _policyType
            )
        );

        require(policy[policyId].owner == address(0), "Policy already exists");

        require(startDate > block.timestamp, "Invalid start date");
        require(endDate > startDate, "Invalid end date");

        uint premium = premimumCalculator.calculatePremium(
            _breed,
            _ageInMonths,
            _healthCondition,
            _region,
            _policyType
        );
        uint payout = premimumCalculator.calculatePayout(premium);

        // Approve transfer of premium amount from user's account to the contract
        require(usdc.approve(address(this), premium), "USDC approval failed");
        require(
            usdc.transferFrom(msg.sender, address(this), premium),
            "USDC transfer failed"
        );

        policy[policyId] = Policy(
            msg.sender,
            premium,
            payout,
            startDate,
            endDate,
            false,
            _breed,
            _ageInMonths,
            _healthCondition,
            _region,
            _policyType
        );

        policyHolderToIDs[msg.sender].push(policyId);

        emit PolicyAdded(
            policyId,
            msg.sender,
            premium,
            payout,
            startDate,
            endDate
        );
    }

    function claimPolicy(bytes32 policyId) public {
        Policy storage _policy = policy[policyId];

        require(isClaimable[_policy.owner][policyId], "Verify claim first");

        // Check that the policy exists and is not already claimed
        require(
            _policy.owner != address(0) && _policy.owner == msg.sender,
            "Policy does not exist"
        );
        require(!_policy.claimed, "Policy has already been claimed");

        // Check that the policy end date has passed
        require(
            block.timestamp > _policy.startDate,
            "Policy has not expired yet"
        );

        // Mark the policy as claimed
        _policy.claimed = true;

        // Pay out the policy amount to the policy owner
        require(
            usdc.transfer(_policy.owner, _policy.payout),
            "USDC transfer failed"
        );

        isClaimable[_policy.owner][policyId] = false;
        emit PolicyClaimed(policyId, _policy.owner, _policy.payout);
    }

    // cancelPolicy
    function cancelPolicy(bytes32 policyId) public {
        Policy storage _policy = policy[policyId];

        // Check that the policy exists and is not already claimed
        require(_policy.owner != address(0), "Policy does not exist");
        require(!_policy.claimed, "Policy has already been claimed");

        // Check that the policy start date has not passed
        require(
            block.timestamp > _policy.startDate &&
                block.timestamp < _policy.endDate,
            "You can only claim the policy"
        );

        // Refund the premium amount to the policy owner
        require(
            usdc.transfer(_policy.owner, _policy.premium),
            "USDC transfer failed"
        );

        // Delete the policy from the mapping
        delete policy[policyId];
        removePolicy(_policy.owner, policyId);

        emit policyCancelled(policyId);
    }

    function removePolicy(address policyHolder, bytes32 policyId) internal {
        bytes32[] storage policies = policyHolderToIDs[policyHolder];
        for (uint i = 0; i < policies.length; i++) {
            if (policies[i] == policyId) {
                // Remove the opportunity ID from the array
                policies[i] = policies[policies.length - 1];
                policies.pop();
                break;
            }
        }
    }

    function updatePolicy(bytes32 policyId, uint256 newEndDate) public {
        Policy storage _policy = policy[policyId];

        // Check that the policy exists and is owned by the caller
        require(
            _policy.owner == msg.sender,
            "Policy does not exist or you are not the owner"
        );

        // Check that the new end date is greater than the current end date
        require(
            newEndDate > _policy.endDate,
            "New end date must be after current end date"
        );

        // Update the policy's end date
        _policy.endDate = newEndDate;

        emit PolicyUpdated(policyId, msg.sender, newEndDate);
    }

    // getters
    function getPolicy(
        bytes32 policyId
    )
        public
        view
        returns (
            address owner,
            uint256 premium,
            uint256 payout,
            uint256 startDate,
            uint256 endDate,
            bool claimed,
            string memory breed,
            uint ageInMonths,
            string memory healthCondition,
            string memory region,
            string memory policyType
        )
    {
        Policy storage _policy = policy[policyId];
        require(_policy.owner != address(0), "Policy does not exist");
        return (
            _policy.owner,
            _policy.premium,
            _policy.payout,
            _policy.startDate,
            _policy.endDate,
            _policy.claimed,
            _policy.breed,
            _policy.ageInMonths,
            _policy.healthCondition,
            _policy.region,
            _policy.policyType
        );
    }

    function getIsClaimable(
        address policyHolder,
        bytes32 policyId
    ) external view returns (bool) {
        return isClaimable[policyHolder][policyId];
    }

    function getActivePoliciyOf(
        address policyHolder
    ) external view returns (bytes32) {
        require(policyHolder != address(0), "Invalid policyHolder address");
        bytes32[] memory policies = policyHolderToIDs[policyHolder];
        bytes32 policyId;
        for (uint i = 0; i < policies.length; i++) {
            Policy memory _policy = policy[policies[i]];
            if (!_policy.claimed && !isClaimable[policyHolder][policies[i]]) {
                policyId = policies[i];
                break;
            }
        }

        return policyId;
    }
}
