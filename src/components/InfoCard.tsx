// eslint-disable-next-line
import React from "react";

export const InfoCard: React.FC<{ overviewData: any }> = ({ overviewData }) => {
  return (
    <div className={"info-card"}>
      <div className="inner-info-card">
        <p className="title">BTC spent*</p>
        <p className="sub-title">
          {(+overviewData.btcSpent / 100000000).toLocaleString()}{" "}
          <span className="sub-text">BTC</span>
        </p>
      </div>
      <div className="inner-info-card">
        <p className="title">BTC spent all time</p>
        <p className="sub-title">
          {(+overviewData.btc_total / 100000000).toLocaleString()}{" "}
          <span className="sub-text">BTC</span>
        </p>
      </div>
      <div className="inner-info-card">
        <p className="title">Tx fees per block</p>
        <p className="sub-title">
          {overviewData.avg_tx_fees_per_block.toLocaleString()}{" "}
          <span className="sub-text">STX</span>
        </p>
      </div>
      <div className="inner-info-card">
        <p className="title">Total btc fees from miners</p>
        <p className="sub-title">
          {overviewData.total_fees.toLocaleString()}{" "}
          <span className="sub-text">Sats</span>
        </p>
      </div>
      <div className="inner-info-card">
        <p className="title">Current BTC hashrate</p>
        <p className="sub-title">
          {overviewData.btc_hash_rate} <span className="sub-text">EH/s</span>
        </p>
      </div>
      <div className="inner-info-card">
        <p className="title">Active miners*</p>
        <p className="sub-title">
          {overviewData.active_miners} <span className="sub-text">Miners</span>
        </p>
      </div>
    </div>
  );
};
