import React from "react";
import "../../styles/insurance.css";
import lunges from "../../assets/img/icon.png";
import extended from "../../assets/img/hospital.png";
import yoga from "../../assets/img/theft2.png";

const insurance = () => {
  return (
    <section>
      <div className="container insurance__container">
        <div className="insurance__top">
          <h2 className="section__title">
            Why <span className="hightlights">ShwanSuraksha </span>Pet Dog
            Insurance Policy?
          </h2>
          <p>
            For a lot of us, our pets are like our family. We do everything we
            can to take care of them. We ensure that our pets are well-fed,
            trained well, get enough of space to run and be fit and, of course,
            get showered with love and attention. So why not include them in the
            circle of protection that insurance offers, ShwanSuraksha Insurance
            Policy.
          </p>
        </div>

        <div className="insurance__wrapper">
          <div className="insurance__item">
            <span className="insurance__icon">
              <img src={lunges} alt="" />
            </span>

            <div className="insurance__content">
              <h4>Protection</h4>
              <p>
                Provides protection against third party legal liability of pet
                owner including the legal costs for defending the claim
              </p>
            </div>
          </div>

          <div className="insurance__item">
            <span className="insurance__icon">
              <img src={yoga} alt="" />
            </span>

            <div className="insurance__content">
              <h4>Theft Loss</h4>
              <p>Covers the theft/loss as well as straying of the pet dog</p>
            </div>
          </div>

          <div className="insurance__item">
            <span className="insurance__icon">
              <img src={extended} alt="" />
            </span>

            <div className="insurance__content">
              <h4>Hospitalization</h4>
              <p>
                Covers treatment costs of specified diseases/injuries,
                hospitalization or death due to illnesses or accidents
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default insurance;
