import React from "react";

export const InfoCard: React.FC = () => {
  return (
    <div className={"info-card"}>
      <div className="inner-info-card">
        <p className="title">Total sats commited</p>
        <p className="sub-title">1,483,482 Sats</p>
      </div>
      <div className="inner-info-card">
        <p className="title">Reward Payout Interval</p>
        <p className="sub-title">100 Blocks (~24 hr)</p>
      </div>
      <div className="inner-info-card">
        <p className="title">Avg tx fees per block</p>
        <p className="sub-title">100 STX</p>
      </div>
      <div className="inner-info-card">
        <p className="title">Last transaction fees</p>
        <p className="sub-title">100 STX</p>
      </div>
    </div>
  );
};
