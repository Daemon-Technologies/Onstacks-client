import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Bitcoin from "../assets/side-menu/bitcoin.svg";
import Stacks from "../assets/side-menu/stacks.svg";
import { ReactComponent as OverviewLogo } from "../assets/side-menu/overview-grey.svg";
import { ReactComponent as OverviewActive } from "../assets/side-menu/overview.svg";
import { ReactComponent as MiningData } from "../assets/side-menu/person-grey.svg";
import { ReactComponent as MiningDataActive } from "../assets/side-menu/person.svg";
import { ReactComponent as Trending } from "../assets/side-menu/trending.svg";
import { ReactComponent as MiningDocs } from "../assets/side-menu/book.svg";
import { ReactComponent as HighLightedSun } from "../assets/side-menu/sun.svg";
import { ReactComponent as Moon } from "../assets/side-menu/cloud-dark.svg";
import { ReactComponent as Sun } from "../assets/side-menu/sun-dark.svg";
import { ReactComponent as HighLightedMoon } from "../assets/side-menu/cloud-light.svg";
import { ReactComponent as Arrow } from "../assets/side-menu/download.svg";
import { ReactComponent as Slash } from "../assets/side-menu/back-slash.svg";
import { MobileHeader } from "./MobileHeader";
import { OverviewProps, TokenPriceProps } from "../hooks/useOverview";
import { useHistory } from "react-router-dom";
interface Props {
  theme: any;
  themeToggler: any;
  overviewData: OverviewProps;
  tokens: TokenPriceProps;
  active: number;
}

export const Sidebar: React.FC<Props> = ({
  theme,
  themeToggler,
  overviewData,
  active: activeState,
  tokens,
}) => {
  const [active, setActive] = useState(activeState);
  const [toggle, setToggle] = useState(false);
  const { push } = useHistory();
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, []);
  return (
    <>
      {window.innerWidth < 1025 && (
        <MobileHeader theme={theme} toggle={toggle} setToggle={setToggle} />
      )}
      <ProSidebar
        id="sidebar"
        toggled={toggle}
        onToggle={setToggle}
        breakPoint="md"
        className="side-bar"
      >
        <SidebarContent>
          {window.innerWidth < 1025 && (
            <MobileHeader theme={theme} toggle={toggle} setToggle={setToggle} />
          )}
          <Menu iconShape="square">
            <MenuItem
              onClick={() => {
                setActive(0);
                push("/");
              }}
              active={active === 0}
              icon={active === 0 ? <OverviewActive /> : <OverviewLogo />}
            >
              Overview
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActive(1);
                push("/mining-data");
              }}
              active={active === 1}
              icon={active === 1 ? <MiningDataActive /> : <MiningData />}
            >
              Mining Data
            </MenuItem>
            <MenuItem active={active === 2} icon={<Trending />}>
              <a
                target="_blank"
                href="https://explorer.stacks.co/?chain=mainnet"
                rel="noopener noreferrer"
              >
                Network Activity
              </a>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActive(3);
              }}
              active={active === 3}
              icon={<MiningDocs />}
            >
              <a
                target="_blank"
                href="https://docs.stacks.co/understand-stacks/mining"
                rel="noopener noreferrer"
              >
                Mining docs
              </a>
            </MenuItem>
            <div className="hr" />
          </Menu>

          <div className="menu-content">
            <div>
              <div className="crypto">
                <div id="btc">
                  <img alt="bitcoin" src={Bitcoin} /> $
                  {Number.parseFloat(tokens.BTC).toFixed(2)}
                </div>
                <div>
                  {" "}
                  <img alt="stacks" src={Stacks} /> $
                  {Number.parseFloat(tokens.STX).toFixed(2)}
                </div>
              </div>
              <p>
                <span>#{overviewData.stx_block_height}</span> STX Blockheight
              </p>
              <p>
                <span>#{overviewData.btc_block_height}</span> BTC Blockheight
              </p>
              {/* <p>
                <span>{overviewData.next_stx_halving} days</span> Next STX
                halving
              </p>
              <p>
                <span>{overviewData.btc_hash_rate} EH/s</span> BTC Hashrate
              </p> */}
            </div>
            <div>
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
              <div className="download">
                <Arrow />
                <p>Export data</p>
              </div>
              <h3>STX Mining Monitor</h3>
              <p>A non-profit initiative from Daemon Technologies © 2021 </p>
            </div>
          </div>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};
