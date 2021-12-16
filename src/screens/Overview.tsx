/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect } from "react";
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
import useWindowDimensions from "../hooks/useWindowDimension";
import { useHistory } from "react-router-dom";

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
  failure: boolean;
  logEvent: any;
}

export const Overview: React.FC<Props> = ({
  theme,
  overviewData,
  satsCommitted,
  areaBlocks,
  tokens,
  themeToggler,
  areaSeries,
  failure,
  blocks,
  logEvent,
  winnerAddresses,
  totalWinners,
}) => {
  const dims = useWindowDimensions();
  useEffect(() => {}, [totalWinners]);
  const { push } = useHistory();

  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);

  useEffect(() => {
    logEvent("Mining Overview");
  }, []);

  return (
    <>
      {/* <div id="main">
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
          <p className="based">*Average of the last 100 blocks.</p>
          <div className="data">
            <a onClick={() => getBlockHash(overviewData.stx_block_height)}>
              STX Block Height:&nbsp;{" "}
              <span>#{overviewData.stx_block_height} </span>
            </a>
            <a
              style={{ marginLeft: 16 }}
              target="_blank"
              href={
                "https://btc.com/btc/block/" + overviewData.btc_block_height
              }
              rel="noopener noreferrer"
            >
              BTC Block Height: &nbsp;
              <span>#{overviewData.btc_block_height}</span>
            </a>
          </div>
        </div>
      </div> */}
      <div id="content1" className={"containerContent"}>
        <div className="containerOne" style={{ width: "50%" }}>
          <p className="title">Total sats committed in current block</p>
          <div className="seprator">
            {satsCommitted.block_number.length > 0 && (
              <AreaChart satsCommitted={satsCommitted} theme={theme} />
            )}
          </div>
        </div>
        <div id="content2" style={{ width: "50%" }}>
          <p className="title">Top Miners - Sats spent per block</p>
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
      <div id={"content4"} className={dims.width < 700 ? "mobile-table" : "s"}>
        <p className={"title-table"}>Recent blocks</p>
        {dims.width < 700 ? (
          blocks.map((block) => {
            return (
              <div className="table-card-container">
                <div className="table-card">
                  <p className="table-title">Block No.</p>
                  <p className="table-subtitle" style={{ color: "#FFA043" }}>
                    {block.block_number}
                  </p>
                </div>
                <div className="table-card">
                  <p className="table-title">Time elapsed</p>
                  <p className="table-subtitle">{block.mined_at}</p>
                </div>
                <div className="table-card">
                  <p className="table-title">Total Sats spent</p>
                  <p className="table-subtitle">{block.sats_spent}</p>
                </div>
                <div
                  onClick={() => push("/miner/address/" + block.address)}
                  className="table-card"
                >
                  <p className="table-title"> Winner address</p>
                  <p className="table-subtitle">{block.winner_address}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div>{blocks.length > 0 && <RecentBlocks blocks={blocks} />}</div>
        )}
      </div>
    </>
  );
};
