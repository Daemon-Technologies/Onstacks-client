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
  TokenPriceProps,
} from "../hooks/useOverview";
import { Sidebar } from "../components/Sidebar";
interface Props {
  theme: any;
  overviewData: OverviewProps;
  satsCommitted: SatsCommittedProps;
  areaBlocks: string[];
  areaSeries: ApexAxisChartSeries;
  blocks: Blocks[];
  winnerAddresses: string[];
  totalWinners: number[];
  themeToggler: any;
  tokens: TokenPriceProps;
}

export const Overview: React.FC<Props> = ({
  theme,
  overviewData,
  satsCommitted,
  areaBlocks,
  tokens,
  themeToggler,
  areaSeries,
  blocks,
  winnerAddresses,
  totalWinners,
}) => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 600);
  }, [toggle]);

  useEffect(() => {}, [totalWinners]);
  return (
    <div className="container">
      <Sidebar
        tokens={tokens}
        overviewData={overviewData}
        theme={theme}
        themeToggler={themeToggler}
      />
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
          {areaBlocks.length > 0 && (
            <LineChart
              areaBlocks={areaBlocks}
              areaSeries={areaSeries}
              theme={theme}
            />
          )}
        </div>
      </div>
      <div id="content3">
        <PieChart
          totalWinners={totalWinners}
          winnerAddresses={winnerAddresses}
          theme={theme}
        />
      </div>
      <div id="content4">
        <p>Recent blocks</p>
        {blocks.length > 0 && <RecentBlocks blocks={blocks} />}
      </div>
    </div>
  );
};
