import React from "react";
import { OverviewProps } from "../hooks/useOverview";

export const InfoCard: React.FC<{ overviewData: OverviewProps }> = ({
  overviewData,
}) => {
  return (
    <div className={"info-card"}>
      <div className="inner-info-card">
        <p className="title">Total sats commited</p>
        <p className="sub-title">
          {overviewData.total_sats_committed.toLocaleString()} Sats
        </p>
      </div>
      <div className="inner-info-card">
        <p className="title">Reward Payout Interval</p>
        <p className="sub-title">
          {overviewData.reward_payout_interval} Blocks (~24 hr)
        </p>
      </div>
      <div className="inner-info-card">
        <p className="title">Avg tx fees per block</p>
        <p className="sub-title">{overviewData.avg_tx_fees_per_block} STX</p>
      </div>
      <div className="inner-info-card">
        <p className="title">Last transaction fees</p>
        <p className="sub-title">{overviewData.last_tx_fees} STX</p>
      </div>
      <div className="inner-info-card">
        <p className="title">Active Miners</p>
        <p className="sub-title">{overviewData.active_miners} Miners</p>
      </div>
    </div>
  );
};
