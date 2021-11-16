/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { ExplorerOverview } from "../hooks/useExplorer";
import { getBlockHash } from "../utils/helper";

export const ExplorerHeader: React.FC<{
  overviewData: ExplorerOverview;
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
          <a onClick={() => getBlockHash(overviewData.STX_height)}>
            STX Block Height:&nbsp; <span>#{overviewData.STX_height} </span>
          </a>
          <a
            style={{ marginLeft: 16 }}
            target="_blank"
            href={"https://btc.com/btc/block/" + overviewData.BTC_height}
            rel="noopener noreferrer"
          >
            BTC Block Height: &nbsp;
            <span>#{overviewData.BTC_height}</span>
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
      <div className={"info-card"}>
        <div className="inner-info-card">
          <p className="title">Total Transactions (24)</p>
          <p className="sub-title">{overviewData.total_txs_24hrs}</p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total volume</p>
          <p className="sub-title">{overviewData.total_volume}</p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total Microblocks (24hr)</p>
          <p className="sub-title">{overviewData.total_microblocks_24hrs}</p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total Fees</p>
          <p className="sub-title">{overviewData.total_tx_fees}</p>
        </div>
      </div>
    </>
  );
};
