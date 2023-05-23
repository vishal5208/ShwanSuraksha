import React, { useEffect, useRef } from "react";
import "../../styles/header.css";
import { WalletComponent } from "../UI/walletComponent";
import { Link } from "react-router-dom";
const nav__links = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/Registration",
    display: "Registration",
  },
  {
    path: "/Policy",
    display: "Claim",
  },
  {
    path: "/about",
    display: "About",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const headerFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerFunc);

    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
          <div className="logo">
            <h2>ShwanSuraksha</h2>
          </div>

          {/* navigation for desktop */}
          <div className="navigation">
            <ul className="menu">
              {nav__links.map((item) => (
                <li className="nav__item">
                  <Link to={item.path}>{item.display}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* navigation for mobile */}

          <div className="navigation-mobile">
            <ul className="menu">
              {nav__links.map((item) => (
                <li className="nav__item">
                  <Link to={item.path}>{item.display}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="wallet-for-mobile">
            <WalletComponent />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
