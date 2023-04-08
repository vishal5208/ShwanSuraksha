import React from "react";
import "../../styles/footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__box">
            <div className="logo">
              <h2>ShwanSuraksha</h2>
            </div>
            <p>Provides comprehensive coverage for your furry friend.</p>
          </div>

          <div className="footer__box">
            <h4 className="footer__title">Quick Links</h4>

            <ul className="footer__links">
              <li>
                <a href="#"></a>About Us
              </li>
              <li>
                <a href="#"></a>Contact Us
              </li>
            </ul>
          </div>
        </div>

        <p className="copyright">Copyright - {year}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
