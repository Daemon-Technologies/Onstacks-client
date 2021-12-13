import React from "react";
import { numberWithCommas } from "../hooks/useOverview";
import { ReactComponent as LeftArrow } from "../assets/side-menu/left-arrow-disabled.svg";
import { useHistory } from "react-router-dom";
import { ExplorerOverview } from "../hooks/useExplorerAddressDetail";
import useWindowDimensions from "../hooks/useWindowDimension";
import { truncateMiddle } from "../utils/utils";

export const ExplorerAddressDetailsHeader: React.FC<{
  headerDetails: ExplorerOverview | undefined;
  address: string;
}> = ({ headerDetails, address }) => {
  const { goBack } = useHistory();
  const dims = useWindowDimensions();
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
        <p className="screen-title">
          {dims.width > 700 ? address : truncateMiddle(address, 8)}
        </p>
      </div>
      <div className={"info-card"}>
        <div className="inner-info-card">
          <p className="title">Total balance</p>
          <p className="sub-title">
            {numberWithCommas(headerDetails?.total_balance)} STX
          </p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total received</p>
          <p className="sub-title">{headerDetails?.total_received} STX</p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total spent</p>
          <p className="sub-title">
            {numberWithCommas(headerDetails?.total_sent.toFixed(2))} STX
          </p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total mining rewards</p>
          <p className="sub-title">
            {numberWithCommas(headerDetails?.total_mining_rewards)} Sats
          </p>
        </div>
        {/* <div className="inner-info-card">
          <p className="title">Total stacking reward</p>
          <p className="sub-title">
            {headerDetails?.total_stacking_reward} EH/s
          </p>
        </div> */}
        <div className="inner-info-card">
          <p className="title">Total fees</p>
          <p className="sub-title">{headerDetails?.total_fee} STX</p>
        </div>
      </div>
    </>
  );
};
