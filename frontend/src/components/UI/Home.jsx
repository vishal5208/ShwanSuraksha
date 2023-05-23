import React from "react";
import HomeImg from "../../assets/img/heroImg.png";
import "../../styles/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section id="home">
      <div className="container">
        {/* Home wrapper for desktop */}
        <div className="Home__wrapper">
          <div className="Home__content">
            <h2
              className="Home__content"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <span className="highlights">ShwanSuraksha: </span> Pet Dog
              Insurance!
            </h2>
            <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1800">
              Provides comprehensive coverage for your furry friend. As a pet
              owner, you know that unexpected accidents and illnesses can happen
              at any time, and the cost of veterinary care can be quite
              expensive. ShwanSuraksha offers a variety of insurance plans to
              help you protect your dog's health and your finances.
            </p>

            <div
              className="Home__btns"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="2000"
            >
              <Link to="/Registration">
                <button className="register__btn">Get started</button>
              </Link>
            </div>
          </div>

          <div className="Home__img">
            <div className="Home__img-wrapper">
              <div className="box-01">
                <div className="box-02">
                  <div className="box-03">
                    <div className="box__img">
                      <img src={HomeImg} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home wrapper for mobile */}
        <div className="Home__wrapper-mobile">
          <div className="Home__content">
            <h2
              className="Home__content"
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              <span className="highlights">ShwanSuraksha: </span> Pet Dog
              Insurance!
            </h2>
            <p data-aos="fade-up" data-aos-delay="100" data-aos-duration="1800">
              Provides comprehensive coverage for your furry friend. As a pet
              owner, you know that unexpected accidents and illnesses can happen
              at any time, and the cost of veterinary care can be quite
              expensive. ShwanSuraksha offers a variety of insurance plans to
              help you protect your dog's health and your finances.
            </p>

            <div className="regi-button-div">
              <div
                className="Home__btns"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="2000"
              >
                <Link to="/Registration">
                  <button className="register__btn">Get started</button>
                </Link>
              </div>
            </div>

            <div className="Home__img">
              <div className="Home__img-wrapper">
                <div className="box-01">
                  <div className="box-02">
                    <div className="box-03">
                      <div className="box__img">
                        <img src={HomeImg} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
