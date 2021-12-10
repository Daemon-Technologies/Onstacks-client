import React from "react";
import { numberWithCommas } from "../hooks/useOverview";
import { ReactComponent as LeftArrow } from "../assets/side-menu/left-arrow-disabled.svg";
import Search from "../assets/side-menu/search.svg";
import { useHistory } from "react-router-dom";

export interface AddressHeaderDetails {
  total_blocks_won: number;
  total_stx_earned: number;
  total_sats_spent: number;
  return_rate: number;
}
export const AddressDetailsHeader: React.FC<{
  headerDetails: AddressHeaderDetails | undefined;
  address: string;
}> = ({ headerDetails, address }) => {
  const { goBack, push } = useHistory();

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
        <div
          className="button-view"
          onClick={() => push("/explorer/address/" + address)}
        >
          <img src={Search} alt={"search"} />
          View on explorer
        </div>
      </div>
      <div className={"info-card"}>
        <div className="inner-info-card">
          <p className="title">Total blocks won</p>
          <p className="sub-title">{headerDetails?.total_blocks_won} Blocks</p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total STX earned</p>
          <p className="sub-title">
            {numberWithCommas(headerDetails?.total_stx_earned.toFixed(2))} STX
          </p>
        </div>
        <div className="inner-info-card">
          <p className="title">Total Sats spent</p>
          <p className="sub-title">
            {numberWithCommas(headerDetails?.total_sats_spent)} Sats
          </p>
        </div>
        {/* <div className="inner-info-card">
        <p className="title">Mining participation</p>
        <p className="sub-title">{headerDetails?.btc_hash_rate} EH/s</p>
      </div> */}
        <div className="inner-info-card">
          <p className="title">Rate of return</p>
          <p className="sub-title">{headerDetails?.return_rate} %</p>
        </div>
      </div>
    </>
  );
};
