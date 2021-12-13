/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { OverviewProps } from "../hooks/useOverview";
import { getBlockHash } from "../utils/helper";
import { InfoCard } from "./InfoCard";

export const MiningDataHeader: React.FC<{
  overviewData: OverviewProps;
  tabIndex?: number;
}> = ({ overviewData, tabIndex }) => {
  return (
    <>
      {" "}
      <p className="screen-title">Mining Explorer</p>
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
            STX block height:&nbsp;{" "}
            <span>#{overviewData.stx_block_height} </span>
          </a>
          <a
            style={{ marginLeft: 16 }}
            target="_blank"
            href={"https://btc.com/btc/block/" + overviewData.btc_block_height}
            rel="noopener noreferrer"
          >
            BTC block height: &nbsp;
            <span>#{overviewData.btc_block_height}</span>
          </a>
        </div>
      </div>
    </>
  );
};
