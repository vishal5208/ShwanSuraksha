// import React from "react";
// import "../../styles/userdata.css";

// export const UserData = ({ policy }) => {
//   return (
//     <div className="policy-container">
//       <div className="policy-details">
//         <p>
//           <strong>Owner:</strong> {policy.owner}
//         </p>
//         <p>
//           <strong>Premium:</strong> {policy.premium}
//         </p>
//         <p>
//           <strong>Payout:</strong> {policy.payout}
//         </p>
//         <p>
//           <strong>Start Date:</strong> {policy.startDate}
//         </p>
//         <p>
//           <strong>End Date:</strong> {policy.endDate}
//         </p>
//         <p>
//           <strong>Claimed:</strong> {policy.claimed ? "Yes" : "No"}
//         </p>
//         <p>
//           <strong>Breed:</strong> {policy.breed}
//         </p>
//         <p>
//           <strong>Age in Months:</strong> {policy.ageInMonths}
//         </p>
//         <p>
//           <strong>Health Condition:</strong> {policy.healthCondition}
//         </p>
//         <p>
//           <strong>Region:</strong> {policy.region}
//         </p>
//         <p>
//           <strong>Policy Type:</strong> {policy.policyType}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default UserData;

import React, { useState } from "react";
import { getPolicy } from "../BackendConnectors/shwanSurkshaConnector";

export function PolicyButton() {
  const [policyData, setPolicyData] = useState(null);
  const [policyId, setPolicyId] = useState("");
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const data = await getPolicy(policyId);
      if (data.success) {
        setPolicyData(data.data);
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
    <div>
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
          <p>Premium: {policyData.premium.toString()}</p>
          <p>Payout: {policyData.payout.toString()}</p>
          <p>Start Date: {policyData.startDate.toString()}</p>
          <p>End Date: {policyData.endDate.toString()}</p>
          <p>Claimed: {policyData.claimed.toString()}</p>
          <p>Breed: {policyData.breed.toString()}</p>
          <p>Age In Months: {policyData.ageInMonths.toString()}</p>
          <p>Health Condition: {policyData.healthCondition.toString()}</p>
          <p>Region: {policyData.region.toString()}</p>
          <p>Policy Type: {policyData.policyType.toString()}</p>
        </div>
      )}
      <button>claim</button>
    </div>
  );
}