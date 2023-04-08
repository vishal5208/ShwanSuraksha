import React, { useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import "../../styles/userdata.css";
import { getPolicy } from "../BackendConnectors/shwanSurkshaConnector";

export function PolicyButton() {
  const [policyData, setPolicyData] = useState(null);
  const [policyId, setPolicyId] = useState("");
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const data = await getPolicy(policyId);
      if (data.success) {
        const policyWithDates = {
          ...data.data,
          startDate: new Date(data.data.startDate * 1000).toLocaleDateString(),
          endDate: new Date(data.data.endDate * 1000).toLocaleDateString(),
        };
        setPolicyData(policyWithDates);
        setError(null);
      } else {
        setPolicyData(null);
        setError(data.msg);
      }
    } catch (error) {
      setPolicyData(null);
      setError(error.message);
    }
  };

  return (
    <div className="userdata-container">
      <input
        type="text"
        value={policyId}
        onChange={(e) => setPolicyId(e.target.value)}
        placeholder="Enter Policy Id"
      />
      <button onClick={handleClick}>Get Policy</button>
      {error && <p>Error: {error}</p>}
      {policyData && (
        <div>
          <p>Owner: {policyData.owner.toString()}</p>
          <p>Premium: ${ethers.utils.formatUnits(policyData.premium, 6)}</p>
          <p>Payout: ${ethers.utils.formatUnits(policyData.payout, 6)}</p>
          <p>Start Date: {policyData.startDate}</p>
          <p>End Date: {policyData.endDate}</p>
          <p>Claimed: {policyData.claimed.toString()}</p>
          <p>Breed: {policyData.breed.toString()}</p>
          <p>Age In Months: {policyData.ageInMonths.toString()}</p>
          <p>Health Condition: {policyData.healthCondition.toString()}</p>
          <p>Region: {policyData.region.toString()}</p>
          <p>Policy Type: {policyData.policyType.toString()}</p>
        </div>
      )}
      <Link to="/claim">
        <button className="register__btn">Claim</button>
      </Link>
    </div>
  );
}
