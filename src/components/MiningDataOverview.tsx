// eslint-disable-next-line
import React from "react";
import { useHistory } from "react-router-dom";
import { MiningInfo } from "../hooks/useMiningData";
import { Blocks } from "../hooks/useOverview";
import useWindowDimensions from "../hooks/useWindowDimension";
import { FlowChartNodes } from "./charts/FlowChartNodes";
import { LineChart } from "./charts/LineChart";
import { RecentBlocks } from "./RecentBlocks";

export const MiningDataOverview: React.FC<{
  miningInfo: MiningInfo;
  blocks: Blocks[];
  theme: any;
}> = ({ theme, blocks, miningInfo }) => {
  const dims = useWindowDimensions();
  const { push } = useHistory();
  return (
    <>
      <div className="flow-chart" id="content1">
        <FlowChartNodes theme={theme} miningInfo={miningInfo} />
      </div>
      <div id="content3">
        <p className="title">Top miners - Sats spent per block</p>
        <div className="seprator">
          <LineChart theme={theme} />
        </div>
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
                  <p className="table-title">Total sats spent</p>
                  <p className="table-subtitle">{block.sats_spent}</p>
                </div>
                <div
                  className="table-card"
                  onClick={() => push("/address/" + block.address)}
                >
                  <p className="table-title"> Winner miner</p>
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
