import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { InfoCard } from "../components/InfoCard";
import { AreaChart } from "../components/charts/AreaChart";
import { LineChart } from "../components/charts/LineChart";
import { RecentBlocks } from "../components/RecentBlocks";
import { PieChart } from "../components/charts/PieChart";
import {
  Blocks,
  OverviewProps,
  SatsCommittedProps,
  TotalBurnedMinerFees,
} from "../hooks/useOverview";
interface Props {
  theme: any;
  overviewData: OverviewProps;
  satsCommitted: SatsCommittedProps;
  topMinerFees: TotalBurnedMinerFees | undefined;
  blocks: Blocks[];
}

export const Overview: React.FC<Props> = ({
  theme,
  overviewData,
  satsCommitted,
  topMinerFees,
  blocks,
}) => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 600);
  }, [toggle]);

  return (
    <>
      {toggle && <Header />}
      <div id="main">
        <p className="screen-title">Overview</p>
        <InfoCard overviewData={overviewData} />
      </div>
      <div id="content1">
        <p className="title">Total sats committed</p>
        <p className="sub-title">
          {overviewData.total_sats_committed.toLocaleString()} Sats
        </p>
        <div className="seprator">
          {satsCommitted.block_number.length > 0 && (
            <AreaChart satsCommitted={satsCommitted} theme={theme} />
          )}
        </div>
      </div>
      <div id="content2">
        <p className="title">Top miner burned fees</p>
        <div className="seprator">
          {topMinerFees && (
            <LineChart topMinerFees={topMinerFees} theme={theme} />
          )}
        </div>
      </div>
      <div id="content3">
        {/* <p></p> */}
        <PieChart theme={theme} />
      </div>
      <div id="content4">
        <p>Recent blocks</p>
        {blocks.length > 0 && <RecentBlocks blocks={blocks} />}
      </div>
    </>
  );
};
