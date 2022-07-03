// eslint-disable-next-line
import React, { useContext, useEffect, useState } from "react";
// import Notification from "../assets/side-menu/notifications.svg";
import Close from "../assets/side-menu/close.svg";
import Menu from "../assets/side-menu/menu.svg";
import Logo from "../assets/side-menu/daemon.svg";
import Bitcoin from "../assets/side-menu/bitcoin.svg";
import Stacks from "../assets/side-menu/stacks.svg";
import { useHistory } from "react-router-dom";
// import { ReactComponent as HighLightedSun } from "../assets/side-menu/sun.svg";
// import { ReactComponent as Moon } from "../assets/side-menu/cloud-dark.svg";
// import { ReactComponent as Sun } from "../assets/side-menu/sun-dark.svg";
// import { ReactComponent as HighLightedMoon } from "../assets/side-menu/cloud-light.svg";
// // import { ReactComponent as Arrow } from "../assets/side-menu/download.svg";
// import { ReactComponent as Slash } from "../assets/side-menu/back-slash.svg";
import { useQuery } from "@apollo/client";
import { minerConfig } from "../graphql/query/miningMonitorConfig";
import { UserContext } from "../contexts/UserContext";

export const Header: React.FC<{
  theme: any;
  themeToggler: any;
}> = ({ theme, themeToggler }: any) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [active, setActive] = useState(0);
  const { push, location } = useHistory();
  const { data } = useQuery(minerConfig);
  const { userData } = useContext(UserContext);
  console.log(userData);
  const [tokens, setTokens] = useState({
    BTC: "",
    STX: "",
  });

  useEffect(() => {
    if (data && data.config.length > 0) {
      setTokens({
        BTC: Number.parseFloat(data.config[1].value).toFixed(2),
        STX: Number.parseFloat(data.config[0].value).toFixed(2),
      });
    }
  }, [data]);

  useEffect(() => {
    if (location.pathname === "/") {
      setActive(0);
    } else if (location.pathname === "/explorer") {
      setActive(1);
    }
  }, [location.pathname]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="header">
      <div className="header-inner">
        <div className="mobile-menu" onClick={handleClick}>
          <img alt="menu" src={click ? Close : Menu} />
        </div>
        <div className="logo-nav">
          <div
            onClick={() => {
              setActive(0);
              push("/");
            }}
            className="logo-container"
          >
            <img className="logo mobile-logo" alt="logo" src={Logo} />
            <img className="logo web-logo" alt="logo" src={Logo} />
          </div>
          <ul className={click ? "nav-options-active" : "nav-options"}>
            <li
              className={`option ${active === 0 ? "active" : ""}`}
              onClick={() => {
                setActive(0);
                closeMobileMenu();
                push("/");
              }}
            >
              <p>Home</p>
            </li>
            <li
              className={`option ${active === 1 ? "active" : ""}`}
              onClick={() => {
                setActive(1);
                closeMobileMenu();
                push("/explorer");
              }}
            >
              <p>Explorer</p>
            </li>
            <li className="option" onClick={closeMobileMenu}>
              <a
                target="_blank"
                href="https://www.onstacks.com/wiki/stx-mining-starter"
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
                {/* <li className="option" onClick={closeMobileMenu}>
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
                    <Moon
                      style={{ cursor: "pointer" }}
                      onClick={themeToggler}
                    />
                  )}
                </li> */}
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
          {/* <li className="option head-colors" onClick={closeMobileMenu}>
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
          </li> */}
        </ul>
      </div>
    </div>
  );
};
