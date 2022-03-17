/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect } from "react";
import { AreaChart } from "../components/charts/AreaChart";
import { LineChart } from "../components/charts/LineChart";
import { RecentBlocks } from "../components/RecentBlocks";
import { PieChart } from "../components/charts/PieChart";
import { Blocks } from "../hooks/useOverview";
import useWindowDimensions from "../hooks/useWindowDimension";
import { useHistory } from "react-router-dom";
import { useState } from "react";

interface Props {
  theme: any;
  blocks: Blocks[];
  winnerAddresses: string[];
  totalWinners: number[];
  themeToggler: any;
  failure: boolean;
  miningData: any;
  logEvent: any;
}

export const Overview: React.FC<Props> = ({
  theme,
  failure,
  miningData,
  blocks,
  logEvent,
  winnerAddresses,
  totalWinners,
}) => {
  const dims = useWindowDimensions();
  useEffect(() => {}, [totalWinners]);
  const { push } = useHistory();
  const [pieData, setPieData] = useState();
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
      <div id="content1" className={"containerContent"}>
        <div className="containerOne" style={{ width: "50%" }}>
          {miningData && miningData.btcSpent && (
            <p className="sub-title">{miningData.btcSpent.toLocaleString()}</p>
          )}
          <p className="title">Total sats committed</p>
          <div style={{ maxHeight: 220 }} className="seprator">
            <AreaChart theme={theme} />
          </div>
        </div>
        <div id="content2" style={{ width: "50%" }}>
          {miningData && miningData.btcSpent && (
            <p className="sub-title">{miningData.btcSpent.toLocaleString()}</p>
          )}

          <p className="title">Top Miners - Sats spent per block</p>
          <div style={{ maxHeight: 220 }} className="seprator">
            <LineChart setPieData={setPieData} theme={theme} />
          </div>
        </div>
      </div>

      <div id="content3">
        {miningData && miningData.active_miners && (
          <p className="sub-title">
            {miningData.active_miners.toLocaleString() + " Miners"}
          </p>
        )}
        <p className="title">
          Block reward distribution to miners (last 100 blocks)
        </p>
        {pieData && <PieChart pieData={pieData} theme={theme} />}
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
