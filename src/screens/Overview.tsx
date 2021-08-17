import React, { useEffect } from "react";
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

interface Props {
  theme: any;
  overviewData: OverviewProps;
  satsCommitted: SatsCommittedProps;
  areaBlocks: string[];
  areaSeries: any[];
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
  useEffect(() => {}, [totalWinners]);
  return (
    <div className="container">
      <div id="main">
        <p className="screen-title">Overview</p>
        <InfoCard overviewData={overviewData} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>*Based on the last 100 blocks.</p>
          <p className="data">
            <span>#{overviewData.stx_block_height}</span> STX Blockheight
            <span>#{overviewData.btc_block_height}</span> BTC Blockheight
          </p>
        </div>
      </div>
      <div id="content1">
        <p className="title">Total sats committed in current block</p>
        {/* {dims.height > 800 && (
          <>
            <p className="sub-title">
              {satsCommitted.block_number.length > 0 &&
                satsCommitted.total_sats_committed[
                  satsCommitted.block_number.length - 1
                ].toLocaleString()}{" "}
              Sats
            </p>
          </>
        )} */}
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
        <p className="title">
          Block reward distribution to miners (last 100 blocks)
        </p>
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
