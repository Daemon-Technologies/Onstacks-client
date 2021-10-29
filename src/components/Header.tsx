import React, { useEffect, useState } from "react";
// import Notification from "../assets/side-menu/notifications.svg";
import Close from "../assets/side-menu/close.svg";
import Menu from "../assets/side-menu/menu.svg";
import Logo from "../assets/side-menu/daemon.svg";
import Bitcoin from "../assets/side-menu/bitcoin.svg";
import Stacks from "../assets/side-menu/stacks.svg";
import { TokenPriceProps } from "../hooks/useOverview";
import { useHistory } from "react-router-dom";
import { ReactComponent as HighLightedSun } from "../assets/side-menu/sun.svg";
import { ReactComponent as Moon } from "../assets/side-menu/cloud-dark.svg";
import { ReactComponent as Sun } from "../assets/side-menu/sun-dark.svg";
import { ReactComponent as HighLightedMoon } from "../assets/side-menu/cloud-light.svg";
// import { ReactComponent as Arrow } from "../assets/side-menu/download.svg";
import { ReactComponent as Slash } from "../assets/side-menu/back-slash.svg";
export const Header: React.FC<{
  theme: any;
  tokens: TokenPriceProps;
  themeToggler: any;
}> = ({ theme, tokens, themeToggler }: any) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [active, setActive] = useState(0);
  const { push, location } = useHistory();

  useEffect(() => {
    if (location.pathname === "/mining") {
      setActive(1);
    } else {
      setActive(0);
    }
  }, [location.pathname]);
  return (
    <div className="header">
      <div className="mobile-menu" onClick={handleClick}>
        <img alt="menu" src={click ? Close : Menu} />
      </div>
      <div className="logo-nav">
        <div className="logo-container">
          <img className="logo mobile-logo" alt="logo" src={Logo} />
          <img className="logo web-logo" alt="logo" src={Logo} />
        </div>
        <ul className={click ? "nav-options active" : "nav-options"}>
          <li
            className={`option ${active === 0 ? "active" : ""}`}
            onClick={() => {
              setActive(0);
              closeMobileMenu();
              push("/explorer");
            }}
          >
            <p>Explorer</p>
          </li>
          <li
            className={`option ${active === 1 ? "active" : ""}`}
            onClick={() => {
              setActive(1);
              closeMobileMenu();
              push("/mining");
            }}
          >
            <p>Mining</p>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a
              target="_blank"
              href="https://explorer.stacks.co/?chain=mainnet"
              rel="noopener noreferrer"
            >
              Protocols (Coming soon)
            </a>
          </li>
          <li className="option" onClick={closeMobileMenu}>
            <a
              target="_blank"
              href="https://docs.stacks.co/understand-stacks/mining"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </li>
          {click && (
            <>
              <li className="option" onClick={closeMobileMenu}>
                <a
                  target="_blank"
                  href="https://www.okcoin.com/prices/bitcoin-btc-price-chart"
                  rel="noopener noreferrer"
                >
                  <img alt="bitcoin" src={Bitcoin} /> ${tokens.BTC}
                </a>
              </li>
              <li className="option" onClick={closeMobileMenu}>
                <a
                  target="_blank"
                  href="https://www.okcoin.com/prices/stacks-stx-price-chart"
                  rel="noopener noreferrer"
                >
                  <img alt="stacks" src={Stacks} /> ${tokens.STX}
                </a>
              </li>
              <li className="option" onClick={closeMobileMenu}>
                {theme === "dark" ? (
                  <Sun style={{ cursor: "pointer" }} onClick={themeToggler} />
                ) : (
                  <HighLightedSun
                    style={{ cursor: "pointer" }}
                    onClick={themeToggler}
                  />
                )}
                <Slash className={"slash"} />{" "}
                {theme === "dark" ? (
                  <HighLightedMoon
                    style={{ cursor: "pointer" }}
                    onClick={themeToggler}
                  />
                ) : (
                  <Moon style={{ cursor: "pointer" }} onClick={themeToggler} />
                )}
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="placeholder"></div>
      <ul className="crypto">
        <li className="aligning" onClick={closeMobileMenu}>
          <a
            target="_blank"
            href="https://www.okcoin.com/prices/bitcoin-btc-price-chart"
            rel="noopener noreferrer"
          >
            <img alt="bitcoin" src={Bitcoin} /> ${tokens.BTC}
          </a>
        </li>
        <li className="aligning" onClick={closeMobileMenu}>
          <a
            target="_blank"
            href="https://www.okcoin.com/prices/stacks-stx-price-chart"
            rel="noopener noreferrer"
          >
            <img alt="stacks" src={Stacks} /> ${tokens.STX}
          </a>
        </li>
        <li className="option head-colors" onClick={closeMobileMenu}>
          {theme === "dark" ? (
            <Sun style={{ cursor: "pointer" }} onClick={themeToggler} />
          ) : (
            <HighLightedSun
              style={{ cursor: "pointer" }}
              onClick={themeToggler}
            />
          )}
          <Slash className={"slash"} />{" "}
          {theme === "dark" ? (
            <HighLightedMoon
              style={{ cursor: "pointer" }}
              onClick={themeToggler}
            />
          ) : (
            <Moon style={{ cursor: "pointer" }} onClick={themeToggler} />
          )}
        </li>
      </ul>
    </div>
  );
};
