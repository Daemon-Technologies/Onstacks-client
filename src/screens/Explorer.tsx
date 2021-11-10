/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { OverviewProps } from "../hooks/useOverview";
import { useHistory } from "react-router-dom";
import { ExplorerHeader } from "../components/ExplorerHeader";
import TransactionImage from "../assets/explorer/transaction.svg";
import Stacks from "../assets/side-menu/stacks.svg";
import Bitcoin from "../assets/side-menu/bitcoin.svg";
import { useExplorer } from "../hooks/useExplorer";
import {
  getRelativeTimestamp,
  getTxTitle,
  getTxTypeName,
  truncateMiddle,
} from "../utils/utils";
import Transaction from "../utils/explorer-types";

interface Props {
  theme: any;
  overviewData: OverviewProps;
  themeToggler: any;
  failure: boolean;
}

export const Explorer: React.FC<Props> = ({
  theme,
  failure,
  overviewData,
  themeToggler,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { push } = useHistory();
  const { getRecentTransactions, recentTransactions } = useExplorer();

  useEffect(() => {
    getRecentTransactions();
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);

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
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    push("/explorer/address/" + transaction.sender_address)
                  }
                >
                  {addressArea(transaction)}
                </span>
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

  return (
    <div className="explorer">
      <div id="main">
        <ExplorerHeader tabIndex={tabIndex} overviewData={overviewData} />
        <div className={"tabs"}>
          <div
            onClick={() => setTabIndex(0)}
            className={tabIndex === 0 ? "active" : ""}
          >
            Transactions
          </div>
          <div
            onClick={() => setTabIndex(1)}
            className={tabIndex === 1 ? "active" : ""}
          >
            Blocks
          </div>
        </div>
      </div>

      {tabIndex === 0 && (
        <div id="transactionContainer" className="transaction-container">
          <div className="recent-transactions">
            <h3>Recent Transactions</h3>
            <div className="rt-table">
              <div className="table-header">
                <img
                  className="transaction-image"
                  alt="transaction"
                  src={Stacks}
                />
                <p>Stacks</p>
              </div>
              {recentTransactions.length > 0 && LoadRecentTransactions()}
            </div>
          </div>
          <div className="anchor-block">
            <h3>Anchor Block</h3>
            <div className="ab-table">
              <div className="table-header">
                <img
                  className="transaction-image"
                  alt="transaction"
                  src={Bitcoin}
                />
                <p>Bitcoin</p>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {tabIndex === 1 && (
        <div id="transactionContainer" className="transaction-container">
          <div style={{ flex: 1 }} className="recent-transactions">
            <h3>Recent Transactions</h3>
            <div className="rt-table">
              <div className="table-header">
                <img
                  className="transaction-image"
                  alt="transaction"
                  src={Stacks}
                />
                <p>Stacks</p>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
              <div className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={TransactionImage}
                  />
                  <div>
                    <p className="title">00 Mins ago</p>
                    <p className="subtitle">In anchor block • 0x5698...2a02</p>
                  </div>
                </div>
                <div className="right-content">
                  <p className="title">00 Mins ago</p>
                  <p className="subtitle">In anchor block • 0x5698...2a02</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
