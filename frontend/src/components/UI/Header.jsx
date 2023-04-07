import React, { useEffect, useRef } from "react";
import "../../styles/header.css";
import { WalletComponent } from "../Reusable/walletComponent";

const nav__links = [
  {
    path: "#home",
    display: "Home",
  },
  {
    path: "#insurance",
    display: "Benefits",
  },
  {
    path: "#",
    display: "Claim",
  },
  {
    path: "#",
    display: "Insure",
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

  const handleClick = (e) => {
    e.preventDefault();

    const targetAttr = e.target.getAttribute("href");
    const location = document.querySelector(targetAttr).offsetTop;

    window.scrollTo({
      left: 0,
      top: location - 80,
    });
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
          <div className="logo">
            <h2>ShwanRaksha</h2>
          </div>
          <div className="navigation">
            <ul className="menu">
              {nav__links.map((item) => (
                <li className="nav__item">
                  <a onClick={handleClick} href={item.path}>
                    {item.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <WalletComponent />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
