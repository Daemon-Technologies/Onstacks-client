/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { OverviewProps } from "../hooks/useOverview";
import { useHistory } from "react-router-dom";
import { ExplorerHeader } from "../components/ExplorerHeader";

import { useExplorer } from "../hooks/useExplorer";
import useInfiniteScroll from "react-infinite-scroll-hook";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { LoadTransactions } from "../components/LoadTransactions";
import { LoadBlocks } from "../components/LoadBlocks";

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
      getRecentTransactions(1);
    } else {
      getRecentPendingTransactions(1);
    }
  }, [transactionState]);

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
              <LoadTransactions
                recentTransactions={recentTransactions}
                theme={theme}
              />
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
              <LoadBlocks
                getMicroBlock={getMicroBlock}
                isMicroblocks={false}
                recentBlocks={recentBlocks}
                theme={theme}
              />
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
              <LoadBlocks
                getMicroBlock={getMicroBlock}
                isMicroblocks={true}
                recentBlocks={recentBlocks}
                theme={theme}
              />
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
