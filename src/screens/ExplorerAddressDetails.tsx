/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ExplorerAddressDetailsHeader } from "../components/ExplorerAddressDetailsHeader";
import TransactionImage from "../assets/explorer/transaction.svg";
import Stacks from "../assets/explorer/stacks-block.png";
import Mining from "../assets/explorer/mining-block.svg";
import OtherAssets from "../assets/explorer/other-assets.svg";
import Burn from "../assets/explorer/burn-block.svg";
import {
  getRelativeTimestamp,
  getTxTitle,
  getTxTypeName,
  truncateMiddle,
} from "../utils/utils";
import Transaction from "../utils/explorer-types";
import { AddressTokens } from "../components/AddressTokens";
import { useExplorerAddressDetails } from "../hooks/useExplorerAddressDetail";

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

  const addressArea = (tx: Transaction) => {
    if (tx.tx_type === "token_transfer") {
      return `${truncateMiddle(tx.sender_address)} to
          ${truncateMiddle(tx.token_transfer.recipient_address)}`;
    }
    if (tx.tx_type === "contract_call") {
      return `By ${truncateMiddle(tx.sender_address)}`;
    }
    if (tx.tx_type === "smart_contract") {
      return `By ${truncateMiddle(tx.sender_address)}`;
    }
    if (tx.tx_type === "coinbase") {
      return `Mined by ${truncateMiddle(tx.sender_address)}`;
    }
    return null;
  };

  const LoadRecentTransactions = () => {
    const transactions = recentTransactions.map((transaction) => {
      const isPending = transaction.tx_status === "pending";
      const isConfirmed = transaction.tx_status === "success";
      const isAnchored = !(transaction as any).is_unanchored;
      const didFail = !isPending && !isConfirmed;
      return (
        <div className="table-item">
          <div className="left-content">
            <img
              className="transaction-image"
              alt="transaction"
              src={TransactionImage}
            />
            <div>
              <p className="title">{getTxTitle(transaction)}</p>
              <p className="subtitle">
                {getTxTypeName(transaction.tx_type)} •{" "}
                {addressArea(transaction)}
              </p>
            </div>
          </div>
          <div className="right-content">
            <p className="title">{getRelativeTimestamp(transaction)}</p>
            <p className="subtitle">
              {" "}
              {isPending && "Pending"}
              {isConfirmed && !isAnchored && "In microblock"}
              {isConfirmed && isAnchored && "In anchor block"}
              {didFail && "Failed"} • {truncateMiddle(transaction.tx_id, 4)}
            </p>
          </div>
        </div>
      );
    });
    return transactions;
  };

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
            <div className="rt-table">
              <div className="table-header">
                <p>Transactions</p>
              </div>
              {recentTransactions.length > 0 && LoadRecentTransactions()}
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
