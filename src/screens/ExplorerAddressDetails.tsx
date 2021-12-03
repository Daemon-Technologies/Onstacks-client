/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ExplorerAddressDetailsHeader } from "../components/ExplorerAddressDetailsHeader";
import Stacks from "../assets/explorer/stacks-block.png";
import Mining from "../assets/explorer/mining-block.svg";
import MiningInfo from "../assets/explorer/mining-info.svg";
import OtherAssets from "../assets/explorer/other-assets.svg";
import Burn from "../assets/explorer/burn-block.svg";
import { AddressTokens } from "../components/AddressTokens";
import { useExplorerAddressDetails } from "../hooks/useExplorerAddressDetail";
import { LoadTransactions } from "../components/LoadTransactions";

interface Props {
  theme: any;
  themeToggler: any;
  failure: boolean;
}

export const ExplorerAddressDetails: React.FC<Props> = ({
  theme,
  themeToggler,
  failure,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const {
    recentTransactions,
    setAddress,
    address,
    overviewData,
    nativeInfo,
    getRecentTransactions,
    isLoading,
    tokens,
  } = useExplorerAddressDetails();

  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);
  const { push } = useHistory();

  useEffect(() => {
    if (params?.address) {
      setAddress(params.address);
    }
  }, [params]);

  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);

  return (
    <div className="explorer">
      <div id="main">
        <ExplorerAddressDetailsHeader
          address={address}
          headerDetails={overviewData}
        />
        <div className={"tabs"}>
          <div
            onClick={() => setTabIndex(0)}
            className={tabIndex === 0 ? "active" : ""}
          >
            Overview
          </div>
          <div
            onClick={() => setTabIndex(1)}
            className={tabIndex === 1 ? "active" : ""}
          >
            Tokens
          </div>
          <div
            onClick={() => setTabIndex(2)}
            className={tabIndex === 2 ? "active" : ""}
          >
            Collections
          </div>
        </div>
      </div>
      {tabIndex === 0 && (
        <div id="transactionContainer" className="transaction-container">
          <div className="recent-transactions">
            <div style={{ marginTop: 0 }} className="rt-table">
              <div className="table-header">
                <p>Transactions</p>
              </div>
              <LoadTransactions
                recentTransactions={recentTransactions}
                theme={theme}
              />
              {recentTransactions.length > 0 && (
                <div
                  style={{
                    borderTop: "1px solid #84818A",
                    color: "#84818A",
                    fontSize: 12,
                    paddingTop: 15,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    getRecentTransactions();
                  }}
                >
                  <p style={{ textAlign: "center", fontWeight: 600 }}>
                    {isLoading ? "Loading..." : "Load More"}
                  </p>
                </div>
              )}
            </div>
          </div>
          {nativeInfo?.assets_info && (
            <div className="address-blocks">
              <div className="address-card">
                <div className="address-card-header">
                  <p>Assets</p>
                </div>
                <div className="address-card-item">
                  <img alt="stacks" src={Stacks} />
                  <div>
                    <p className="title">Total Balance</p>
                    <p className="sub-title">
                      {nativeInfo.assets_info.balance} STX
                    </p>
                  </div>
                </div>
                <div className="address-card-item">
                  <img alt="stacks" src={OtherAssets} />
                  <div>
                    <p className="title">Other Assets</p>
                    <p className="sub-title">
                      {nativeInfo.assets_info.fungible_tokens.length +
                        nativeInfo.assets_info.non_fungible_tokens.length}{" "}
                      tokens
                    </p>
                  </div>
                </div>
              </div>
              <div className="address-card">
                <div className="address-card-header">
                  <p>Stacking</p>
                </div>
                <div className="address-card-header"></div>
                <div className="address-card-item">
                  <img alt="stacks" src={Mining} />
                  <div>
                    <p className="title">STX Stacked</p>
                    <p className="sub-title">
                      {nativeInfo.stacking_info.percents} STX
                    </p>
                  </div>
                </div>
              </div>
              <div className="address-card">
                <div className="address-card-header">
                  <p>Mining</p>
                  <img
                    onClick={() => push("/miner/address/" + address)}
                    alt="stacks"
                    src={MiningInfo}
                  />
                </div>
                <div className="address-card-header"></div>
                <div className="address-card-item">
                  <img alt="stacks" src={Mining} />
                  <div>
                    <p className="title">Mining reward earned</p>
                    <p className="sub-title">
                      {nativeInfo.mining_info.miner_rewards} STX
                    </p>
                  </div>
                </div>
                <div className="address-card-item">
                  <img alt="stacks" src={Burn} />
                  <div>
                    <p className="title">Fees burn</p>
                    <p className="sub-title">
                      {nativeInfo.mining_info.total_burnt} Sats
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {tabIndex === 1 && (
        <div id="transactionContainer" className="tokens-container">
          <p className={"title-table"}>All Tokens</p>
          <div>
            <AddressTokens initialPageSize={10} tokens={tokens} />
          </div>
        </div>
      )}
      {tabIndex === 2 && (
        <div id="transactionContainer">
          <div className="collections-header">
            <input
              className="search-bar"
              type="text"
              id="header-search"
              placeholder="Search for TxHash / Address / Block"
              name="s"
            />
            <select value="Sort by recent">
              <option value="Orange">Recent</option>
              <option value="Radish">Oldest</option>
              <option value="Cherry">Rarest</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
