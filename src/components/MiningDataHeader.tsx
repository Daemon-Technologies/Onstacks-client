import React from "react";
import { OverviewProps } from "../hooks/useOverview";
import { InfoCard } from "./InfoCard";

export const MiningDataHeader: React.FC<{ overviewData: OverviewProps }> = ({
  overviewData,
}) => {
  return (
    <>
      {" "}
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
        <p className="based">*Based on the last 100 blocks.</p>
        <div className="data">
          <a
            target="_blank"
            href={
              "https://stacks-node-api.mainnet.stacks.co/extended/v1/block/by_height/" +
              overviewData.stx_block_height
            }
            rel="noopener noreferrer"
          >
            <span>#{overviewData.stx_block_height} </span> STX Blockheight
          </a>
          <a
            style={{ marginLeft: 16 }}
            target="_blank"
            href={"https://btc.com/btc/block/" + overviewData.btc_block_height}
            rel="noopener noreferrer"
          >
            <span>#{overviewData.btc_block_height}</span>
            BTC Blockheight
          </a>
        </div>
      </div>
    </>
  );
};
