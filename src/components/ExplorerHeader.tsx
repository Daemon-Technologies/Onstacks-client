/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ExplorerOverview } from "../hooks/useExplorer";
import { numberWithCommas } from "../hooks/useOverview";
import { getBlockHash } from "../utils/helper";
import { SearchResult, SearchResultType } from "../utils/search-types";
import { truncateMiddle } from "../utils/utils";

export const ExplorerHeader: React.FC<{
  overviewData: ExplorerOverview;
  tabIndex?: number;
}> = ({ overviewData, tabIndex }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<SearchResult>();
  const { push } = useHistory();

  useEffect(() => {
    if (searchTerm !== "") {
      setLoading(true);
    }
    const delayDebounceFn = setTimeout(() => {
      _search();
      setLoading(false);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const _search = async () => {
    const result = await fetch(
      `https://stacks-node-api.mainnet.stacks.co/v1/names/${searchTerm.toLowerCase()}`
    );
    const resData = await result.json();
    const res = await fetch(
      `https://stacks-node-api.mainnet.stacks.co/extended/v1/search/${searchTerm}`
    );
    const data = await res.json();

    // this is a workaround for the API not returning data for valid stx addresses
    if (
      data &&
      data?.found === false &&
      data?.result?.entity_type === "standard_address"
    ) {
      setSearchData({
        found: true,
        result: {
          entity_id: searchTerm,
          entity_type: "standard_address",
        },
      });
    }
    if (resData.address) {
      setSearchData({
        found: true,
        result: {
          entity_id: resData.address,
          entity_type: "standard_address",
        },
      });
      setName(searchTerm);
    } else if (!data.message && data.found) {
      const results = await fetch(
        `https://stacks-node-api.mainnet.stacks.co/v1/addresses/stacks/${searchTerm.toLowerCase()}`
      );
      const res = await results.json();
      setSearchData(data);
      setName(res.names[0]);
    }
  };

  const onClick = () => {
    if (searchData?.found)
      switch (searchData.result.entity_type) {
        case SearchResultType.StandardAddress:
          push("/explorer/address/" + searchData.result.entity_id);
          return;
        case SearchResultType.TxId:
          push("/explorer/txid/" + searchData.result.entity_id);
          return;
        case SearchResultType.MempoolTxId:
          push("/explorer/txid/" + searchData.result.entity_id);
          return;
        case SearchResultType.ContractAddress:
          push("/explorer/txid/" + searchData.result.entity_id);
          return;
        default:
          push("/explorer/block/" + searchData.result.entity_id);
          return;
      }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p className="screen-title">Stacks’ Explorer</p>
        <div className="data">
          <a
            style={{ color: "white" }}
            onClick={() => getBlockHash(overviewData.STX_height)}
          >
            STX Block Height:&nbsp;{" "}
            <span style={{ color: "rgb(255, 160, 67)" }}>
              #{numberWithCommas(overviewData.STX_height)}{" "}
            </span>
          </a>
          <a
            style={{ marginLeft: 16, color: "white" }}
            target="_blank"
            href={"https://btc.com/btc/block/" + overviewData.BTC_height}
            rel="noopener noreferrer"
          >
            BTC Block Height: &nbsp;
            <span style={{ color: "rgb(255, 160, 67)" }}>
              #{numberWithCommas(overviewData.BTC_height)}
            </span>
          </a>
        </div>
      </div>
      <input
        // value={" "}
        className="search-bar"
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        id="header-search"
        placeholder="Search for TxHash / Address / Block"
        name="s"
      />
      {isLoading || searchData ? (
        <div className="search-item">
          <div className="results-header">
            <p>Search results</p>
          </div>
          {isLoading && <div>Loading..</div>}
          {searchData && (
            <div>
              {searchData.found && (
                <div onClick={onClick} className="item">
                  <p>{truncateMiddle(searchData.result.entity_id, 10)}</p>
                  <p style={{ color: "#5546FF" }}>
                    {searchData.result.entity_type === "standard_address"
                      ? name
                      : ""}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <>
          {searchTerm.length > 0 && (
            <div className="search-item">
              <div className="results-header">
                <p>Search results</p>
              </div>
              <div className="item">
                <p>No data found</p>
                {/* <p>{searchData.result.entity_type}</p> */}
              </div>
            </div>
          )}
        </>
      )}
      <div className={"info-card"}>
        <div className="inner-info-card">
          <p className="title">Total transactions (24hr)</p>
          <p className="sub-title">
            {numberWithCommas(overviewData.total_txs_24hrs)}
          </p>
        </div>
        <div className="inner-info-card">
          <p className="title">Microblocks (24hr)</p>
          <p className="sub-title">
            {numberWithCommas(overviewData.total_microblocks_24hrs)}
          </p>
        </div>
        <div className="inner-info-card">
          <p className="title">Avg transactions per block(24h)</p>
          <p className="sub-title">
            {numberWithCommas(overviewData.avg_txs_per_block)}
          </p>
        </div>
        <div className="inner-info-card">
          <p className="title">Pending transactions</p>
          <p className="sub-title">
            {numberWithCommas(overviewData.pending_txs_number)}
          </p>
        </div>
      </div>
    </>
  );
};
