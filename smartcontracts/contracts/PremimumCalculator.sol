// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

contract PremimumCalculator {
    uint8 constant USDC_DECIMALS = 6;

    uint public basePremium; // in wei
    uint public payoutPercentage;
    uint public loading;

    struct Interval {
        uint min;
        uint max;
        uint coefficient;
    }

    // events
    event CoefficientRemoved(bytes2 coefficientType, uint coefficient);
    event IntervalCoefficientSet(
        bytes2 coefficientType,
        uint minValue,
        uint maxValue,
        uint newCoefficient
    );
    event CoefficientSet(bytes2 coefficientType, string key, uint coefficient);
    event BasePremiumUpdated(uint oldBasePremium, uint newBasePremium);
    event LoadingUpdated(uint oldLoading, uint newLoading);
    event PayoutUpdated(uint oldPayout, uint newPayout);

    address admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    mapping(bytes32 => mapping(string => uint)) coefficients;
    mapping(bytes32 => Interval[]) coefficientIntervals;
    uint constant TOTAL_COEFFICIENTS = 5;

    string constant OTHERS = "OTHERS";

    bytes32 constant BREED = keccak256(abi.encodePacked("BR"));
    bytes32 constant AGE = keccak256(abi.encodePacked("AG")); // in month
    bytes32 constant HEALTH = keccak256(abi.encodePacked("HL"));
    bytes32 constant REGION = keccak256(abi.encodePacked("R"));
    bytes32 constant POLICY_TYPE = keccak256(abi.encodePacked("PT"));

    function initialize(
        uint _basePremium,
        uint _loading,
        uint _payoutPercentage
    ) external onlyAdmin {
        basePremium = _basePremium;
        loading = _loading;
        payoutPercentage = _payoutPercentage;

        // REGION
        coefficients[REGION]["North"] = 100;
        coefficients[REGION]["South"] = 100;
        coefficients[REGION]["East"] = 100;
        coefficients[REGION]["West"] = 100;
        coefficients[REGION][OTHERS] = 110;

        // POLICY_TYPE
        coefficients[POLICY_TYPE]["Basic"] = 100;
        coefficients[POLICY_TYPE]["Premium"] = 105;
        coefficients[POLICY_TYPE][OTHERS] = 110;

        // BREED
        coefficients[BREED]["Labrador Retriever"] = 100;
        coefficients[BREED]["German Shepherd"] = 105;
        coefficients[BREED]["Golden Retriever"] = 102;
        coefficients[BREED][OTHERS] = 110;

        // AGE IN MONTHS
        coefficientIntervals[AGE].push(Interval(0, 12, 90));
        coefficientIntervals[AGE].push(Interval(12, 36, 100));
        coefficientIntervals[AGE].push(Interval(36, 72, 110));
        coefficientIntervals[AGE].push(Interval(72, 120, 120));

        // HEALTH
        coefficients[HEALTH]["SEVERE"] = 80;
        coefficients[HEALTH]["MODERATE"] = 100;
        coefficients[HEALTH]["MILD"] = 120;
        coefficients[HEALTH][OTHERS] = 100;
    }

    function calculatePremium(
        string memory _breed,
        uint _ageInMonths,
        string memory _healthCondition,
        string memory _region,
        string memory _policyType
    ) external view returns (uint premium) {
        uint cof = getCoefficientMultiplier(_breed, _region, _policyType);
        premium = basePremium * cof;

        cof = getIntervalCoefficientMultiplier(_ageInMonths, _healthCondition);
        premium = premium * cof;

        premium =
            ((premium * (100 + loading)) / 100) /
            (100 ** TOTAL_COEFFICIENTS);
    }

    function calculatePayout(uint premiumAmount) public view returns (uint) {
        uint payoutAmount = (premiumAmount * payoutPercentage) / 100; // Calculate the payout amount based on the premium and payout percentage
        return payoutAmount;
    }

    function getCoefficientMultiplier(
        string memory _breed,
        string memory _region,
        string memory _policyType
    ) public view returns (uint coefficient) {
        uint regionMultiplier = coefficients[REGION][OTHERS];
        uint policyTypeMultiplier = coefficients[POLICY_TYPE][OTHERS];
        uint breedMultiplier = coefficients[BREED][OTHERS];

        if (coefficients[REGION][_region] != 0) {
            regionMultiplier = coefficients[REGION][_region];
        }
        if (coefficients[POLICY_TYPE][_policyType] != 0) {
            policyTypeMultiplier = coefficients[POLICY_TYPE][_policyType];
        }
        if (coefficients[BREED][_breed] != 0) {
            breedMultiplier = coefficients[BREED][_breed];
        }
        coefficient =
            regionMultiplier *
            (policyTypeMultiplier) *
            (breedMultiplier);
    }

    function getIntervalCoefficientMultiplier(
        uint _ageInMonths,
        string memory _healthCondition
    ) public view returns (uint result) {
        uint ageMultiplier = getIntervalCoefficient(AGE, _ageInMonths);
        uint healthMultiplier = coefficients[HEALTH][OTHERS];

        if (coefficients[HEALTH][_healthCondition] != 0) {
            healthMultiplier = coefficients[HEALTH][_healthCondition];
        }

        result = ageMultiplier * (healthMultiplier);
    }

    function getIntervalCoefficient(
        bytes32 _type,
        uint _value
    ) public view returns (uint result) {
        for (uint i = 0; i < coefficientIntervals[_type].length; i++) {
            // Check interval exmaple (0, 1] (0 -not included, 1 included)
            if (
                coefficientIntervals[_type][i].min < _value &&
                _value <= coefficientIntervals[_type][i].max
            ) {
                result = coefficientIntervals[_type][i].coefficient;
                break;
            }
        }
    }

    function isClaimable(
        string memory _healthCondition
    ) external pure returns (bool) {
        bytes32 severeHash = keccak256(bytes("SEVERE"));
        bytes32 moderateHash = keccak256(bytes("MODERATE"));
        bytes32 mildHash = keccak256(bytes("MILD"));

        bytes32 healthConditionHash = keccak256(bytes(_healthCondition));

        if (
            healthConditionHash == severeHash ||
            healthConditionHash == moderateHash ||
            healthConditionHash == mildHash
        ) {
            return true;
        } else {
            return false;
        }
    }

    function removeIntervalCoefficient(
        bytes2 _type,
        uint _coefficient
    ) external onlyAdmin {
        for (uint i = 0; i < coefficientIntervals[_type].length; i++) {
            if (coefficientIntervals[_type][i].coefficient == _coefficient) {
                emit CoefficientRemoved(
                    _type,
                    coefficientIntervals[_type][i].coefficient
                );
                delete coefficientIntervals[_type][i];
                break;
            }
        }
    }

    // seters

    function setIntervalCoefficient(
        bytes2 _type,
        uint256 _index,
        bool _insert, // 1 insert, 0 update
        uint256 _minValue,
        uint256 _maxValue,
        uint256 _coefficient
    ) external onlyAdmin {
        if (_insert) {
            emit IntervalCoefficientSet(
                _type,
                _minValue,
                _maxValue,
                _coefficient
            );
            coefficientIntervals[_type].push(
                Interval(_minValue, _maxValue, _coefficient)
            );
        } else {
            require(
                _index < coefficientIntervals[_type].length,
                "Invalid index"
            );

            emit IntervalCoefficientSet(
                _type,
                _minValue,
                _maxValue,
                _coefficient
            );
            coefficientIntervals[_type][_index].min = _minValue;
            coefficientIntervals[_type][_index].max = _maxValue;
            coefficientIntervals[_type][_index].coefficient = _coefficient;
        }
    }

    function setCoefficient(
        bytes2 _type,
        string memory _key,
        uint _coefficient
    ) external onlyAdmin {
        emit CoefficientSet(_type, _key, _coefficient);
        coefficients[_type][_key] = _coefficient;
    }

    function setBasePremium(uint _newBasePremium) external onlyAdmin {
        emit BasePremiumUpdated(basePremium, _newBasePremium);
        basePremium = _newBasePremium;
    }

    function setLoading(uint256 _newLoading) external onlyAdmin {
        emit LoadingUpdated(loading, _newLoading);
        loading = _newLoading;
    }

    function setPayout(uint256 _newPayoutPercentage) external onlyAdmin {
        emit PayoutUpdated(payoutPercentage, _newPayoutPercentage);
        payoutPercentage = _newPayoutPercentage;
    }

    function getDetails() external view returns (uint, uint, uint) {
        return (basePremium, payoutPercentage, loading);
    }

    function getPayoutPercentage() external view returns (uint) {
        return payoutPercentage;
    }
}
