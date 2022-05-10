/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ExplorerAddressDetailsHeader } from "../../components/ExplorerAddressDetailsHeader";
import Stacks from "../../assets/explorer/stacks-block.png";
import Mining from "../../assets/explorer/mining-block.svg";
import MiningInfo from "../../assets/explorer/mining-info.svg";
import OtherAssets from "../../assets/explorer/other-assets.svg";
import Burn from "../../assets/explorer/burn-block.svg";
import { AddressTokens } from "../../components/AddressTokens";
import { useExplorerAddressDetails } from "../../hooks/useExplorerAddressDetail";
import { LoadTransactions } from "../../components/LoadTransactions";
import Logo from "../../assets/side-menu/no-search-results.svg";
import ProgressBar from "../../components/Progressbar";
import { numberWithCommas } from "../../hooks/useOverview";
import useInfiniteScroll from "react-infinite-scroll-hook";

interface Props {
  theme: any;
  themeToggler: any;
  failure: boolean;
  logEvent: any;
}

export const ExplorerAddressDetails: React.FC<Props> = ({
  theme,
  themeToggler,
  failure,
  logEvent,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  // const [count, setCount] = useState(1);
  const {
    recentTransactions,
    setAddress,
    address,
    overviewData,
    nativeInfo,
    addressNfts,
    hasNextPage,
    username,
    getRecentTransactions,
    isLoading,
    hasNftNextPage,
    isNftLoading,
    blockHeight,
    tokens,
    getAddressNFTs,
  } = useExplorerAddressDetails();

  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    setLoadMore(addressNfts.length > 0 && addressNfts.length % 10 === 0);
  }, [addressNfts.length]);

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: isNftLoading,
    hasNextPage: hasNftNextPage,
    onLoadMore: () => {
      if (loadMore) {
        getAddressNFTs();
      }
    },
    disabled: false,
    rootMargin: "0px 0px 400px 0px",
  });

  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);
  const { push } = useHistory();

  useEffect(() => {
    logEvent("Explorer Address Details");
  }, []);

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
        <div className="header-wrapper"></div>

        <ExplorerAddressDetailsHeader
          address={address}
          username={username}
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
            Collectibles
          </div>
        </div>
      </div>
      {tabIndex === 0 && (
        <div id="transactionContainer" className="transaction-container">
          <div className="recent-transactions">
            <div
              style={{ marginTop: 0, height: "86.8vh" }}
              className="rt-table"
            >
              <div className="table-header">
                <p>Transactions</p>
              </div>
              <LoadTransactions
                recentTransactions={recentTransactions}
                theme={theme}
              />
              {hasNextPage && recentTransactions.length > 0 && (
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
                    <p className="title">Total balance</p>
                    <p className="sub-title">
                      {nativeInfo.assets_info.balance.toLocaleString()} STX
                    </p>
                  </div>
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => setTabIndex(1)}
                  className="address-card-item"
                >
                  <img alt="stacks" src={OtherAssets} />
                  <div>
                    <p className="title">Other assets</p>
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
                    <p className="title">STX stacked(locked)</p>
                    <p className="sub-title">
                      {nativeInfo.stacking_info.stacking_amount.toLocaleString()}{" "}
                      STX
                    </p>
                  </div>
                </div>
                {blockHeight && nativeInfo.stacking_info && (
                  <ProgressBar
                    theme={theme}
                    completed={
                      nativeInfo.stacking_info.stacking_amount
                        ? (
                            ((nativeInfo.stacking_info.burnchain_unlock_at -
                              +blockHeight) *
                              100) /
                            nativeInfo.stacking_info.burnchain_lock_at
                          ).toFixed(1)
                        : 0
                    }
                  />
                )}
                {nativeInfo.stacking_info.stacking_amount !== 0 && (
                  <div
                    style={{
                      marginTop: 5,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <p className="sub-title">
                      #{nativeInfo.stacking_info.burnchain_lock_at}
                    </p>
                    <p className="sub-title">
                      ~
                      {nativeInfo.stacking_info.burnchain_unlock_at -
                        +blockHeight}{" "}
                      (
                      {(
                        ((nativeInfo.stacking_info.burnchain_unlock_at -
                          +blockHeight) *
                          100) /
                        nativeInfo.stacking_info.burnchain_lock_at
                      ).toFixed(1)}
                      %) remaining
                    </p>
                    <p className="sub-title">
                      #{nativeInfo.stacking_info.burnchain_unlock_at}
                    </p>
                  </div>
                )}
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
                    <p className="title">Mining rewards earned</p>
                    <p className="sub-title">
                      {numberWithCommas(nativeInfo.mining_info.miner_rewards)}{" "}
                      STX
                    </p>
                  </div>
                </div>
                <div className="address-card-item">
                  <img alt="stacks" src={Burn} />
                  <div>
                    <p className="title">BTC spent</p>
                    <p className="sub-title">
                      {nativeInfo.mining_info.total_burnt} BTC
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {tabIndex === 1 && (
        <>
          {tokens.length > 0 ? (
            <div id="transactionContainer" className="tokens-container">
              <p className={"title-table"}>All tokens</p>
              <div>
                <AddressTokens initialPageSize={10} tokens={tokens} />
              </div>
            </div>
          ) : (
            <div
              id="transactionContainer"
              style={{
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <img src={Logo} alt="404" />
              <p>Wallet doesnt contain any tokens</p>
            </div>
          )}
        </>
      )}
      {tabIndex === 2 && (
        <div ref={rootRef} id="transactionContainer">
          <div className="image-container">
            {/* <div className="collections-header">
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
           */}
            {addressNfts.map((nft) => {
              return (
                <div className="card-img">
                  <img
                    className="nft-image"
                    alt={nft.image.toString()}
                    src={nft.image}
                  />
                  <p>{nft.name}</p>
                  <p>#{nft.id}</p>
                </div>
              );
            })}
          </div>
          {(isNftLoading || hasNftNextPage) && (
            <div className={"load-more"} ref={sentryRef}>
              <p style={{ textAlign: "center", fontWeight: 600 }}>
                {hasNftNextPage ? "Loading..." : "Load More"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
