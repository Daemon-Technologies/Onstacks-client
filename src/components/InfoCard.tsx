// eslint-disable-next-line
import React from "react";

export const InfoCard: React.FC<{ overviewData: any }> = ({ overviewData }) => {
  return (
    <div className={"info-card"}>
      <div className="inner-info-card">
        <p className="title">BTC spent *</p>
        <p className="sub-title">
          {(+overviewData.btcSpent / 100000000).toLocaleString()} BTC
        </p>
      </div>
      <div className="inner-info-card">
        <p className="title">BTC spent all time</p>
        <p className="sub-title">
          {(+overviewData.btc_total / 100000000).toLocaleString()} BTC
        </p>
      </div>
      <div className="inner-info-card">
        <p className="title">Tx fees per block *</p>
        <p className="sub-title">
          {overviewData.avg_tx_fees_per_block.toLocaleString()} STX
        </p>
      </div>
      <div className="inner-info-card">
        <p className="title">Current BTC hashrate</p>
        <p className="sub-title">{overviewData.btc_hash_rate}0 EH/s</p>
      </div>
      <div className="inner-info-card">
        <p className="title">Active miners *</p>
        <p className="sub-title">{overviewData.active_miners}</p>
      </div>
    </div>
  );
};
