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
import { useExplorer } from "../hooks/useExplorer";
import {
  getRelativeTimestamp,
  getTxTitle,
  getTxTypeName,
  truncateMiddle,
} from "../utils/utils";
import Transaction from "../utils/explorer-types";
import { AddressTokens } from "../components/AddressTokens";

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
  const [address, setAddress] = useState("");
  const [tabIndex, setTabIndex] = useState(2);
  const { getRecentTransactions, recentTransactions } = useExplorer();

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
      getRecentTransactions();
      setAddress(params.address);
    }
  }, [params]);

  useEffect(() => {
    if (address) {
      // getMinerInfo(address);
      // getAddressSatsCommitted(address);
      // getBlocksMiner(address);
      // getBlocksForAddress(address);
    }
  }, [address]);

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
          headerDetails={{
            total_fees: 10,
            total_mining_reward: 100,
            total_stacking_reward: 100,
            total_sats_spent: 2,
            total_stx_earned: 2,
          }}
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
            </div>
          </div>
          <div className="address-blocks">
            <div className="address-card">
              <div className="address-card-header">
                <p>Assets</p>
              </div>
              <div className="address-card-item">
                <img alt="stacks" src={Stacks} />
                <div>
                  <p className="title">Total Balance</p>
                  <p className="sub-title">13,437 STX</p>
                </div>
              </div>
              <div className="address-card-item">
                <img alt="stacks" src={OtherAssets} />
                <div>
                  <p className="title">Other Assets</p>
                  <p className="sub-title">4 tokens</p>
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
                  <p className="sub-title">16,453 STX</p>
                </div>
              </div>
              <div className="address-card-item">
                <img alt="stacks" src={Burn} />
                <div>
                  <p className="title">Fees burn</p>
                  <p className="sub-title">136,215,453 Sats</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {tabIndex === 1 && (
        <div id="transactionContainer" className="tokens-container">
          <p className={"title-table"}>All Tokens</p>
          <div>
            <AddressTokens
              initialPageSize={10}
              tokens={[
                { token: "Stacks", total_tokens: 200 },
                { token: "Diko", total_tokens: 100 },
              ]}
            />
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
