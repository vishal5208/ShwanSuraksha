import React, { useState } from "react";
import "../../styles/insuranceform.css";
import { calcaulatePremium } from "../BackendConnectors/PremiumCalculatorConnector";
import { addPolicy } from "../BackendConnectors/shwanSurkshaConnector";

export const InsuranceForm = () => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [option5, setOption5] = useState("");
  const [submitButton, setSubmitButton] = useState("Submit");
  const [premium, setPremium] = useState("");
  const [selected, setSelected] = useState(false);
  const [showAddPolicyButton, setShowAddPolicyButton] = useState(false); // Add state for showing Add Policy button

  const handleOption1Change = (e) => {
    setOption1(e.target.value);
  };

  const handleOption2Change = (e) => {
    setOption2(e.target.value);
  };

  const handleOption3Change = (e) => {
    setOption3(e.target.value);
  };

  const handleOption4Change = (e) => {
    setOption4(e.target.value);
  };

  const handleOption5Change = (e) => {
    setOption5(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formobject = {
      _breed: option1,
      _ageInMonths: option2,
      _healthCondition: option3,
      _region: option4,
      _policyType: option5,
    };
    console.log("Option 1:", option1);
    console.log("Option 2:", option2);
    console.log("Option 3:", option3);
    console.log("Option 4:", option4);
    console.log("Option 5:", option5);
    console.log("Calling....");
    let data = calcaulatePremium(formobject);

    setSubmitButton("Submitting...");

    calcaulatePremium(formobject)
      .then((data) => {
        console.log("Premium calculated successfully:", data);
        setPremium(data);
        setSubmitButton("Submitted");
        setShowAddPolicyButton(true); // Show Add Policy button after successful form submission
      })
      .catch((err) => {
        console.error("Error in premium calculation:", err);
        setSubmitButton("Submit");
      });
  };

  const formobject = {
    _breed: option1,
    _ageInMonths: option2,
    _healthCondition: option3,
    _region: option4,
    _policyType: option5,
  };

  const handleAddPolicy = () => {
    addPolicy(formobject)
      .then((response) => {
        // alert("Policy added successfully!");
      })
      .catch((error) => {
        // Handle error response
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <div className="inputs">
        <div>
          <label htmlFor="option1" className="input">
            Breed :
          </label>
          <select
            id="option1"
            name="option1"
            value={option1}
            onChange={handleOption1Change}
          >
            <option value="">Select an option</option>
            <option value="Labrador Retriever">Labrador Retriever</option>
            <option value="German Shepherd">German Shepherd</option>
            <option value="Golden Retriever">Golden Retriever</option>
            <option value="OTHERS">OTHERS</option>
          </select>
        </div>

        <div className="inputs" id="inputs__label">
          <label htmlFor="option2" className="input">
            Age :
          </label>
          <input
            className="age-input-box"
            type="text"
            value={option2}
            onChange={handleOption2Change}
            placeholder="Your dog's age in months"
          />
        </div>

        <div className="inputs">
          <label htmlFor="option3" className="input">
            Region :
          </label>
          <select
            id="option3"
            name="option3"
            value={option3}
            onChange={handleOption3Change}
          >
            <option value="">Select an option</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="OTHERS">OTHERS</option>
          </select>
        </div>

        <div className="inputs">
          <label htmlFor="option4" className="input">
            Health Condition :
          </label>
          <select
            id="option4"
            name="option4"
            value={option4}
            onChange={handleOption4Change}
          >
            <option value="">Select an option</option>
            <option value="MILD">Mild</option>
            <option value="MODERATE">Moderate</option>
            <option value="SEVERE">Severe</option>
            <option value="OTHERS">OTHERS</option>
          </select>
        </div>

        <div className="inputs">
          <label htmlFor="option5" className="input">
            Policy Type :
          </label>
          <select
            id="option5"
            name="option5"
            value={option5}
            onChange={handleOption5Change}
          >
            <option value="">Select an option</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="OTHERS">OTHERS</option>
          </select>
        </div>

        <button type="submit">submit</button>

        {submitButton === "Submitted" && (
          <div className="premium">
            Your Pet's Premium is ${premium.data} dollars.
          </div>
        )}

        {submitButton === "Submitted" && (
          <button onClick={() => handleAddPolicy(formobject)}>
            Add Policy
          </button>
        )}
      </div>
    </form>
  );
};
