/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { OverviewProps } from "../hooks/useOverview";
import { getBlockHash } from "../utils/helper";
import { InfoCard } from "./InfoCard";

export const ExplorerHeader: React.FC<{
  overviewData: OverviewProps;
  tabIndex?: number;
}> = ({ overviewData, tabIndex }) => {
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p className="screen-title">Stacks’ Explorer</p>
        <div className="data">
          <a onClick={() => getBlockHash(overviewData.stx_block_height)}>
            STX Block Height:&nbsp;{" "}
            <span>#{overviewData.stx_block_height} </span>
          </a>
          <a
            style={{ marginLeft: 16 }}
            target="_blank"
            href={"https://btc.com/btc/block/" + overviewData.btc_block_height}
            rel="noopener noreferrer"
          >
            BTC Block Height: &nbsp;
            <span>#{overviewData.btc_block_height}</span>
          </a>
        </div>
      </div>
      <input
        // value={" "}
        className="search-bar"
        // onInput={e => setSearchQuery(e.target.value)}
        type="text"
        id="header-search"
        placeholder="Search for TxHash / Address / Block"
        name="s"
      />
      <InfoCard overviewData={overviewData} />
    </>
  );
};
