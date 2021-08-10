import React, { useEffect } from "react";
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
import useWindowDimensions from "../hooks/useWindowDimension";

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
  const dims = useWindowDimensions();

  useEffect(() => {}, [totalWinners]);
  return (
    <div className="container">
      <Sidebar
        tokens={tokens}
        active={0}
        overviewData={overviewData}
        theme={theme}
        themeToggler={themeToggler}
      />
      {dims.width >= 1025 && <Header theme={theme} />}
      <div id="main">
        <p className="screen-title">Overview</p>
        <InfoCard overviewData={overviewData} />
      </div>
      <div id="content1">
        <p className="title">Total sats committed in current block</p>
        {dims.height > 700 && (
          <>
            <p className="sub-title">
              {satsCommitted.block_number.length > 0 &&
                satsCommitted.total_sats_committed[
                  satsCommitted.block_number.length - 1
                ].toLocaleString()}{" "}
              Sats
            </p>
          </>
        )}
        <div className="seprator">
          {satsCommitted.block_number.length > 0 && (
            <AreaChart satsCommitted={satsCommitted} theme={theme} />
          )}
        </div>
      </div>
      <div id="content2">
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
      <div id="content3">
        {totalWinners.length > 0 &&
          winnerAddresses.length > 0 &&
          totalWinners.length === winnerAddresses.length && (
            <PieChart
              totalWinners={totalWinners}
              winnerAddresses={winnerAddresses}
              theme={theme}
            />
          )}
      </div>
      <div id="content4">
        <p>Recent blocks</p>
        {blocks.length > 0 && <RecentBlocks blocks={blocks} />}
      </div>
    </div>
  );
};
