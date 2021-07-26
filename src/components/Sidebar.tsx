import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Bitcoin from "../assets/side-menu/bitcoin.svg";
import Stacks from "../assets/side-menu/stacks.svg";
import { ReactComponent as OverviewLogo } from "../assets/side-menu/overview.svg";
import { ReactComponent as MiningData } from "../assets/side-menu/profile.svg";
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
interface Props {
  theme: any;
  themeToggler: any;
  overviewData: OverviewProps;
  tokens: TokenPriceProps;
}

export const Sidebar: React.FC<Props> = ({
  theme,
  themeToggler,
  overviewData,
  tokens,
}) => {
  const [active, setActive] = useState(0);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 600);
  }, []);
  return (
    <>
      {window.innerWidth < 600 && (
        <MobileHeader toggle={toggle} setToggle={setToggle} />
      )}
      <ProSidebar
        id="sidebar"
        toggled={toggle}
        onToggle={setToggle}
        breakPoint="sm"
        className="side-bar"
      >
        <SidebarContent>
          {window.innerWidth < 600 && (
            <MobileHeader toggle={toggle} setToggle={setToggle} />
          )}
          <Menu iconShape="square">
            <MenuItem
              onClick={() => {
                setActive(0);
              }}
              active={active === 0}
              icon={<OverviewLogo />}
            >
              Overview
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActive(1);
              }}
              active={active === 1}
              icon={<MiningData />}
            >
              Mining Data
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActive(2);
              }}
              active={active === 2}
              icon={<Trending />}
            >
              Network Activity
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActive(3);
              }}
              active={active === 3}
              icon={<MiningDocs />}
            >
              Mining Docs
            </MenuItem>
            <hr style={{ margin: "24px 10px" }} />
          </Menu>

          <div className="menu-content">
            <div>
              <div className="crypto">
                <div>
                  <img alt="bitcoin" src={Bitcoin} /> ${+tokens.BTC}
                </div>
                <div>
                  {" "}
                  <img alt="stacks" src={Stacks} /> ${+tokens.STX}
                </div>
              </div>
              <p>
                <span>#{overviewData.stx_block_height}</span> STX Blockheight
              </p>
              <p>
                <span>#{overviewData.btc_block_height}</span> BTC Blockheight
              </p>
              <p>
                <span>{overviewData.next_stx_halving} days</span> Next STX
                halving
              </p>
              <p>
                <span>{overviewData.btc_hash_rate} EH/s</span> BTC Hashrate
              </p>
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
