import React from 'react';
import heroImg from "../../assets/img/heroImg.png";
import "../../styles/hero.css";
import { Link } from 'react-router-dom';

const Hero = () => {
  return <section id='home'>
    <div className="container">
        <div className="hero__wrapper">
            <div className="hero__content">
                <h2
                className='hero__content'
                data-aos="fade-up"
                data-aos-duration="1500"
                >
                    <span className="highlights">ShwanRaksha: </span> Pet Dog Insurance!
                </h2>
                <p data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="1800">Provides comprehensive coverage for your furry friend. As a pet owner, you know that unexpected accidents and illnesses can happen at any time, and the cost of veterinary care can be quite expensive. Shwanraksha offers a variety of insurance plans to help you protect your dog's health and your finances.</p>

                <div className="hero__btns" data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="2000">
                   <Link to = "/form"><button className='register__btn'>Get started</button></Link>
                </div>
            </div>

            <div className="hero__img">
                <div className="hero__img-wrapper">
                    <div className="box-01">
                        <div className="box-02">
                            <div className="box-03">
                                <div className="box__img">
                                        <img src={heroImg} alt="" />  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
  
};


export default Hero