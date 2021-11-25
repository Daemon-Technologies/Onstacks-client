/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { OverviewProps } from "../hooks/useOverview";
import { useHistory } from "react-router-dom";
import { ExplorerHeader } from "../components/ExplorerHeader";
import Stacks from "../assets/side-menu/stacks.svg";
import BlockLight from "../assets/explorer/block-light.svg";
import BlockDark from "../assets/explorer/block-dark.svg";
import Bitcoin from "../assets/side-menu/bitcoin.svg";
import StacksTransferLight from "../assets/explorer/stacks-transfer-light.svg";
import FunctionCallLight from "../assets/explorer/function-call-light.svg";
import StacksTransferDark from "../assets/explorer/stacks-transfer-dark.svg";
import FunctionCallDark from "../assets/explorer/function-call-dark.svg";
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
import useInfiniteScroll from "react-infinite-scroll-hook";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

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
    getRecentPendingTransactions,
    recentBlocks,
    isLoading,
    isAnchoredBlockLoading,
    getMicroBlock,
    getAnchoredBlockList,
  } = useExplorer();
  const transactionsOptions = ["Show confirmed only", "Show pending only"];
  const [transactionState, setStransactionState] = useState(
    transactionsOptions[0]
  );
  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: true,
    onLoadMore: () => {
      if (transactionState === transactionsOptions[0]) {
        getRecentTransactions();
      } else {
        getRecentPendingTransactions();
      }
    },
    disabled: false,
    rootMargin: "0px 0px 400px 0px",
  });

  const [currentBlocks, { rootRef: currentRootBlockRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: true,
    onLoadMore: () => {
      getAnchoredBlockList();
    },
    disabled: false,
    rootMargin: "0px 0px 400px 0px",
  });

  const [blocksRef, { rootRef: rootBlockRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: true,
    onLoadMore: () => {
      getAnchoredBlockList();
    },
    disabled: false,
    rootMargin: "0px 0px 400px 0px",
  });

  const _onSelect = (e: any) => {
    setStransactionState(e.value);
  };

  useEffect(() => {
    if (transactionState === transactionsOptions[0]) {
      getRecentTransactions(0);
    } else {
      getRecentPendingTransactions(0);
    }
  }, [transactionState]);

  const LoadRecentTransactions = useCallback(() => {
    const transactions = recentTransactions.map((transaction) => {
      const isPending = transaction.tx_status === "pending";
      const isConfirmed = transaction.tx_status === "success";
      const isAnchored = !(transaction as any).is_unanchored;
      const didFail = !isPending && !isConfirmed;
      return (
        <>
          <div
            onClick={() => push("/explorer/txId/" + transaction.tx_id)}
            key={transaction.block_hash}
            className="table-item"
          >
            <div className="left-content">
              {transaction.tx_type === "token_transfer" ? (
                <img
                  className="transaction-image"
                  alt="transaction"
                  src={
                    theme === "light" ? StacksTransferLight : StacksTransferDark
                  }
                />
              ) : (
                <img
                  className="transaction-image"
                  alt="transaction"
                  src={theme === "light" ? FunctionCallLight : FunctionCallDark}
                />
              )}
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
  }, [recentTransactions, theme]);

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
                  src={theme === "light" ? BlockLight : BlockDark}
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
                    theme={theme}
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
    [recentBlocks, theme]
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
          <div className="recent-transactions" ref={rootRef}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3>Recent Transactions</h3>
              <Dropdown
                controlClassName="dropdown-cont"
                options={transactionsOptions}
                value={transactionState}
                onChange={_onSelect}
                placeholder="Select an option"
              />
            </div>
            <div className="rt-table">
              <div className="table-header">
                <p>Stacks</p>
              </div>
              {LoadRecentTransactions()}
              {recentTransactions.length > 0 && (
                <div
                  ref={sentryRef}
                  className="load-more"
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
          <div ref={rootBlockRef} className="anchor-block">
            <h3>Anchor Block</h3>
            <div className="ab-table">
              <div className="table-header">
                <p>Bitcoin</p>
              </div>
              {LoadRecentBlocks(false)}
              {recentBlocks.length > 0 && (
                <div
                  className={"load-more"}
                  ref={blocksRef}
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
          <div
            style={{ flex: 1 }}
            className="recent-transactions"
            ref={currentRootBlockRef}
          >
            <h3>Blocks</h3>
            <div className="rt-table">
              <div className="table-header">
                <p>Blocks</p>
              </div>
              {LoadRecentBlocks(true)}
              {recentBlocks.length > 0 && (
                <div
                  className={"load-more"}
                  onClick={() => {
                    getAnchoredBlockList();
                  }}
                  ref={currentBlocks}
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
