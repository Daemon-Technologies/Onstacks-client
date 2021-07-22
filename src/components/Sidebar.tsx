import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import Bitcoin from "../assets/side-menu/bitcoin.svg";
import Stacks from "../assets/side-menu/stacks.svg";
import { ReactComponent as OverviewLogo } from "../assets/side-menu/overview.svg";
import { ReactComponent as MiningData } from "../assets/side-menu/profile.svg";
import { ReactComponent as Trending } from "../assets/side-menu/trending.svg";
import { ReactComponent as MiningDocs } from "../assets/side-menu/book.svg";
import { ReactComponent as Sun } from "../assets/side-menu/sun.svg";
import { ReactComponent as Moon } from "../assets/side-menu/cloud-dark.svg";
import { ReactComponent as Arrow } from "../assets/side-menu/download.svg";
import { ReactComponent as Slash } from "../assets/side-menu/back-slash.svg";
import { MobileHeader } from "./MobileHeader";

interface Props {
  theme: any;
  themeToggler: any;
}
export const Sidebar: React.FC<Props> = ({ theme, themeToggler }) => {
  const [active, setActive] = useState(0);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 420);
  }, []);
  return (
    <>
      {!toggle && <MobileHeader toggle={toggle} setToggle={setToggle} />}
      <ProSidebar
        id="sidebar"
        toggled={toggle}
        onToggle={setToggle}
        breakPoint="sm"
        className="side-bar"
      >
        <SidebarContent>
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
            <hr style={{ margin: "24px" }} />
          </Menu>

          <div className="menu-content">
            <div>
              <div className="crypto">
                <div>
                  <img alt="bitcoin" src={Bitcoin} /> $40,137.45
                </div>
                <div>
                  {" "}
                  <img alt="stacks" src={Stacks} /> $1.25
                </div>
              </div>
              <p>
                <span>#19,010</span> STX Blockheight
              </p>
              <p>
                <span>#688,034</span> BTC Blockheight
              </p>
              <p>
                <span>1026 days</span> Next STX halving
              </p>
              <p>
                <span>87.5 EH/s</span> BTC Hashrate
              </p>
            </div>
            <div>
              <Sun style={{ cursor: "pointer" }} onClick={themeToggler} />{" "}
              <Slash className={"slash"} />{" "}
              <Moon style={{ cursor: "pointer" }} onClick={themeToggler} />
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
