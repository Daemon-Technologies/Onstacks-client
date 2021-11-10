import React from "react";
import { numberWithCommas } from "../hooks/useOverview";
import { ReactComponent as LeftArrow } from "../assets/side-menu/left-arrow-disabled.svg";
import { useHistory } from "react-router-dom";

export interface AddressHeaderDetails {
  total_mining_reward: number;
  total_stx_earned: number;
  total_sats_spent: number;
  total_stacking_reward: number;
  total_fees: number;
}

export const ExplorerAddressDetailsHeader: React.FC<{
  headerDetails: AddressHeaderDetails | undefined;
  address: string;
}> = ({ headerDetails, address }) => {
  const { goBack } = useHistory();

  return (
    <>
      <div
        onClick={goBack}
        style={{
          display: "flex",
          marginBottom: 10,
          cursor: "pointer",
          alignItems: "center",
        }}
      >
        <LeftArrow style={{ width: 15, height: 20, marginRight: 10 }} />{" "}
        <p>Back</p>
      </div>

      <div
        style={{
          display: "flex",
          marginBottom: 10,
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p className="screen-title">{address}</p>
      </div>
      <div className={"info-card"}>
        <div className="inner-info-card">
          <p className="title">Total received</p>
          <p className="sub-title">{headerDetails?.total_stx_earned} Blocks</p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total Spent</p>
          <p className="sub-title">
            {numberWithCommas(headerDetails?.total_sats_spent.toFixed(2))} STX
          </p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total mining rewards</p>
          <p className="sub-title">
            {numberWithCommas(headerDetails?.total_mining_reward)} Sats
          </p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total stacking reward</p>
          <p className="sub-title">
            {headerDetails?.total_stacking_reward} EH/s
          </p>
        </div>
        <div className="inner-info-card">
          <p className="title">Rate of return</p>
          <p className="sub-title">{headerDetails?.total_fees} %</p>
        </div>
      </div>
    </>
  );
};
