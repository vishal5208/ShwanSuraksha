import React from 'react';
import { useState } from "react";
import '../../styles/about.css';

// import "./Dogs.css";

export function About() {
        const [animation, setAnimation] = useState(false);
        
        const startAnimation = () => {
          setAnimation(true);
        };
      
        return (
          <div>
            <div className="about-container">
              <div className="header">
                <h2>About ShwanSuraksha</h2>
              </div>
              <div className="description">
                <p>Introducing a revolutionary blockchain-based pet dog insurance system - ShwanSuraksha! Our system handles the entire insurance process, from policy creation to policy cancellation, with ease and efficiency. In addition, we've implemented a unique claim system using PolygonID for issuing and verifying claims. With ShwanSuraksha, you can be sure that your furry friend is always protected, giving you peace of mind and security. Join us in making pet insurance accessible, reliable, and hassle-free with ShwanSuraksha!</p>
                <p>Polygon ID is the ultimate solution for secure and trustworthy relationships between apps and users. It ensures self-sovereign identity and privacy by default, making it the most reliable and safe option for issuing and verifying credentials. With Polygon ID, you can trust that your sensitive information is protected and your identity is secure. Join the SSI ecosystem and experience the power of Polygon ID today!</p>
              </div>
            </div>
            <div className='dog-box'>
            <div className="dogs-container">
              <div className={`dog-image ${animation ? "animate" : ""}`} onClick={startAnimation}>
                <img src="dog1.jpg" alt="Dog 1" />
                <div className="speech-bubble">
                  <p>"I heard about this new insurance system called ShwanSuraksha. We should definitely get it, guys. It'll give us the protection we need!"</p>
                </div>
              </div>
              <div className={`dog-image ${animation ? "animate" : ""}`} onClick={startAnimation}>
                <img src="dog2.jpg" alt="Dog 2" />
                <div className="speech-bubble">
                  <p>"Yeah, I don't want to end up in a situation where my owners can't afford my medical bills. That would be ruff."</p>
                </div>
              </div>
              <div className={`dog-image ${animation ? "animate" : ""}`} onClick={startAnimation}>
                <img src="dog3.jpg" alt="Dog 3" />
                <div className="speech-bubble">
                  <p>"Plus, with ShwanSuraksha, we can get the care we need without our owners having to worry about the cost. It's a win-win situation!"</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        );
      }
      
      
      







