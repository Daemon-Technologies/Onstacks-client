import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Blocks, OverviewProps, TokenPriceProps } from "../hooks/useOverview";
import { FlowChartNodes } from "../components/charts/FlowChartNodes";
import { InfoCard } from "../components/InfoCard";
import { RecentBlocks } from "../components/RecentBlocks";
import { LineChart } from "../components/charts/LineChart";

interface Props {
  theme: any;
  overviewData: OverviewProps;
  themeToggler: any;
  tokens: TokenPriceProps;
  areaBlocks: string[];
  areaSeries: ApexAxisChartSeries;
  blocks: Blocks[];
}

export const MiningData: React.FC<Props> = ({
  theme,
  overviewData,
  tokens,
  areaBlocks,
  areaSeries,
  blocks,
  themeToggler,
}) => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 600);
  }, [toggle]);

  return (
    <div className="miningData">
      <Sidebar
        tokens={tokens}
        active={0}
        overviewData={overviewData}
        theme={theme}
        themeToggler={themeToggler}
      />
      {toggle && <Header />}
      <div id="main">
        <p className="screen-title">Overview</p>
        <InfoCard overviewData={overviewData} />
        <p className="data">Data shown above is based on the last 100 blocks</p>
      </div>
      <div id="content1">
        <FlowChartNodes />
      </div>
      <div id="content3">
        <p className="title">Top miner burned fees</p>
        <div className="seprator">
          {areaBlocks.length > 0 && areaSeries.length > 0 && (
            <LineChart
              areaBlocks={areaBlocks}
              areaSeries={areaSeries}
              theme={theme}
            />
          )}
        </div>
      </div>
      <div id="content4">
        <p>Recent blocks</p>
        {blocks.length > 0 && <RecentBlocks blocks={blocks} />}
      </div>
    </div>
  );
};
