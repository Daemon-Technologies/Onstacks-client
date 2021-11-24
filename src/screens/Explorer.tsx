/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { OverviewProps } from "../hooks/useOverview";
import { useHistory } from "react-router-dom";
import { ExplorerHeader } from "../components/ExplorerHeader";
import TransactionImage from "../assets/explorer/transaction.svg";
import Stacks from "../assets/side-menu/stacks.svg";
import Block from "../assets/explorer/block.svg";
import Bitcoin from "../assets/side-menu/bitcoin.svg";
import { useExplorer } from "../hooks/useExplorer";
import {
  addressArea,
  getRelativeTimestamp,
  getTxTitle,
  getTxTypeName,
  truncateMiddle,
} from "../utils/utils";
import { useCallback } from "react";
import { Microblock } from "../components/Microblock";

interface Props {
  theme: any;
  overviewData: OverviewProps;
  themeToggler: any;
  failure: boolean;
}

export const Explorer: React.FC<Props> = ({ theme, failure, themeToggler }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { push } = useHistory();
  const {
    getRecentTransactions,
    recentTransactions,
    overviewData,
    recentBlocks,
    isLoading,
    isAnchoredBlockLoading,
    getMicroBlock,
    getAnchoredBlockList,
  } = useExplorer();

  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);

  const LoadRecentTransactions = useCallback(() => {
    const transactions = recentTransactions.map((transaction) => {
      const isPending = transaction.tx_status === "pending";
      const isConfirmed = transaction.tx_status === "success";
      const isAnchored = !(transaction as any).is_unanchored;
      const didFail = !isPending && !isConfirmed;
      return (
        <>
          <div key={transaction.block_hash} className="table-item">
            <div className="left-content">
              <img
                className="transaction-image"
                alt="transaction"
                src={TransactionImage}
              />
              <div>
                <p
                  onClick={() => push("/explorer/txId/" + transaction.tx_id)}
                  className="title"
                >
                  {getTxTitle(transaction)}
                </p>
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
            <div
              onClick={() => push("/explorer/txId/" + transaction.tx_id)}
              className="right-content"
            >
              <p className="title">{getRelativeTimestamp(transaction)}</p>
              <p className="subtitle">
                {isPending && "Pending"}
                {isConfirmed && !isAnchored && "In microblock"}
                {isConfirmed && isAnchored && "In anchor block"}
                {didFail && "Failed"} • {truncateMiddle(transaction.tx_id, 4)}
              </p>
            </div>
          </div>
        </>
      );
    });
    return transactions;
  }, [recentTransactions]);

  const LoadRecentBlocks = useCallback(
    (isMicroblocks?: boolean) => {
      const transactions = recentBlocks.map((transaction) => {
        const STXBlock = transaction.height;
        const BTCBlock = transaction.burn_block_height;
        const BlockHash = transaction.hash;
        const txs = transaction.txs.length;
        return (
          <>
            <div
              // onClick={() => push("/explorer/txId/" + transaction.tx_id)}
              className="table-item"
              key={transaction.hash}
            >
              <div className="left-content">
                <img
                  className="transaction-image"
                  alt="transaction"
                  src={Block}
                />
                <div>
                  <p className="title">
                    <img
                      className="transaction-image"
                      alt="transaction"
                      src={Stacks}
                    />{" "}
                    #{STXBlock} →
                    <img
                      className="transaction-image"
                      alt="transaction"
                      src={Bitcoin}
                    />
                    #{BTCBlock}
                  </p>
                  <p className="subtitle">{txs} Transactions</p>
                </div>
              </div>
              <div className="right-content">
                <p className="title">{getRelativeTimestamp(transaction)}</p>
                <p className="subtitle">{truncateMiddle(BlockHash, 6)}</p>
              </div>
            </div>
            {isMicroblocks &&
              transaction.microblocks_accepted.map((block: any) => {
                return (
                  <Microblock
                    parent_burn_block_time={transaction.burn_block_time}
                    getMicroBlock={getMicroBlock}
                    block={block}
                  />
                );
              })}
          </>
        );
      });
      return transactions;
    },
    [recentBlocks]
  );
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
              {LoadRecentTransactions()}
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
              {LoadRecentBlocks(false)}
              {recentBlocks.length > 0 && (
                <div
                  style={{
                    borderTop: "1px solid #84818A",
                    color: "#84818A",
                    fontSize: 12,
                    paddingTop: 15,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    getAnchoredBlockList();
                  }}
                >
                  <p style={{ textAlign: "center", fontWeight: 600 }}>
                    {isAnchoredBlockLoading ? "Loading..." : "Load More"}
                  </p>
                </div>
              )}
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
              {LoadRecentBlocks(true)}
              {recentBlocks.length > 0 && (
                <div
                  style={{
                    borderTop: "1px solid #84818A",
                    color: "#84818A",
                    fontSize: 12,
                    paddingTop: 15,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    getAnchoredBlockList();
                  }}
                >
                  <p style={{ textAlign: "center", fontWeight: 600 }}>
                    {isAnchoredBlockLoading ? "Loading..." : "Load More"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
