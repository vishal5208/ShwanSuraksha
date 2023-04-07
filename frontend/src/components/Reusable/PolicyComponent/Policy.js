import React from "react";
import "./Policy.css";

export const Policy = ({ policy }) => {
  return (
    <div className="policy-container">
      <div className="policy-details">
        <p>
          <strong>Owner:</strong> {policy.owner}
        </p>
        <p>
          <strong>Premium:</strong> {policy.premium}
        </p>
        <p>
          <strong>Payout:</strong> {policy.payout}
        </p>
        <p>
          <strong>Start Date:</strong> {policy.startDate}
        </p>
        <p>
          <strong>End Date:</strong> {policy.endDate}
        </p>
        <p>
          <strong>Claimed:</strong> {policy.claimed ? "Yes" : "No"}
        </p>
        <p>
          <strong>Breed:</strong> {policy.breed}
        </p>
        <p>
          <strong>Age in Months:</strong> {policy.ageInMonths}
        </p>
        <p>
          <strong>Health Condition:</strong> {policy.healthCondition}
        </p>
        <p>
          <strong>Region:</strong> {policy.region}
        </p>
        <p>
          <strong>Policy Type:</strong> {policy.policyType}
        </p>
      </div>
    </div>
  );
};
