// eslint-disable-next-line
import React, { useRef } from "react";
import { numberWithCommas } from "../hooks/useOverview";
import { ReactComponent as LeftArrow } from "../assets/side-menu/left-arrow-disabled.svg";
import { useHistory } from "react-router-dom";
import { ExplorerOverview } from "../hooks/useExplorerAddressDetail";
import useWindowDimensions from "../hooks/useWindowDimension";
import { truncateMiddle } from "../utils/utils";
import { Tooltip } from "./Tooltip";

export const ExplorerAddressDetailsHeader: React.FC<{
  headerDetails: ExplorerOverview | undefined;
  address: string;
  username: string;
}> = ({ headerDetails, address, username }) => {
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
          alignItems: dims.width > 700 ? "center" : "flex-start",
          flexDirection: dims.width > 700 ? "row" : "column",
          // justifyContent: "space-between",
        }}
      >
        {username && (
          <Tooltip message={`${username}`} position={"top"}>
            <p
              onClick={() => navigator.clipboard.writeText(username)}
              style={{
                color: "#5546FF",
                cursor: "pointer",
                paddingRight: 16,
                fontSize: 20,
                marginRight: 16,
                borderRight: "2px solid #EBEAED",
              }}
              className="screen-title"
            >
              {username}
            </p>
          </Tooltip>
        )}
        <Tooltip message={`Copy`} position={"top"}>
          <p
            style={{
              cursor: "pointer",
              paddingRight: 16,
              marginRight: 16,
              fontSize: 20,
            }}
            onClick={() => navigator.clipboard.writeText(address)}
            className="screen-title"
          >
            {dims.width > 700 ? address : truncateMiddle(address, 8)}
          </p>
        </Tooltip>
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
          <p className="sub-title">
            {numberWithCommas(headerDetails?.total_received)} STX
          </p>
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
