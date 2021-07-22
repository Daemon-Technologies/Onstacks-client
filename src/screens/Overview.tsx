import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { InfoCard } from "../components/InfoCard";
import { AreaChart } from "../components/charts/AreaChart";
import { LineChart } from "../components/charts/LineChart";
import { RecentBlocks } from "../components/RecentBlocks";
import { PieChart } from "../components/charts/PieChart";

interface Props {
  theme: any;
}

export const Overview: React.FC<Props> = ({ theme }) => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 420);
  }, [toggle]);
  return (
    <>
      {toggle && <Header />}
      <div id="main">
        <p className="screen-title">Overview</p>
        <InfoCard />
      </div>
      <div id="content1">
        <p className="title">Total sats committed</p>
        <p className="sub-title">1,483,482 Sats</p>
        <div className="seprator">
          <AreaChart theme={theme} />
        </div>
      </div>
      <div id="content2">
        <p className="title">Total sats committed</p>
        <div className="seprator">
          <LineChart theme={theme} />
        </div>
      </div>
      <div id="content3">
        {/* <p></p> */}
        <PieChart theme={theme} />
      </div>
      <div id="content4">
        <p>Recent blocks</p>
        <RecentBlocks />
      </div>
    </>
  );
};
