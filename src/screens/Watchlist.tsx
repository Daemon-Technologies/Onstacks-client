/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import "react-dropdown/style.css";
import { truncateMiddle } from "../utils/utils";
import { SearchResult } from "../utils/search-types";
import { useMiningData } from "../hooks/useMiningData";
import { useQuery } from "@apollo/client";
import { getHeights } from "../graphql/query/miningMonitorConfig";
import { TableWatchList } from "../components/Watchlist-table";

export const Watchlist: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [searchData, setSearchData] = useState<SearchResult>();
  const [isLoading, setLoading] = useState(false);
  const [blockHeights, setBlockHeights] = useState({
    STX_HEIGHT: "",
    BTC_HEIGHT: "",
  });
  const { data } = useQuery(getHeights);
  const {
    blocks,
    // miningInfo,
  } = useMiningData(blockHeights);
  useEffect(() => {
    if (data && data.block_info) {
      setBlockHeights({
        BTC_HEIGHT: data.block_info[0].btc_block_height,
        STX_HEIGHT: data.block_info[0].stacks_block_height,
      });
    }
  }, [data]);

  return (
    <div className="miningData">
      <div id="main">
        <div className="header-wrapper" style={{ height: 250 }}></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p className="screen-title">Watchlist</p>
        </div>
        <div style={{ display: "flex" }}>
          <input
            // value={" "}
            className="search-bar"
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            id="header-search"
            style={{ borderRadius: 4 }}
            placeholder="Search for TxHash / Address / Block"
            name="s"
          />
          <div className="search-button">Add watchlist</div>
        </div>
        {isLoading || searchData ? (
          <div className="search-item">
            <div className="results-header">
              <p>Search results</p>
            </div>
            {isLoading && <div>Loading..</div>}
            {searchData && (
              <div>
                {searchData.found && (
                  <div className="item">
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
      </div>
      <div id={"content1"} style={{ padding: 0 }}>
        <TableWatchList initialPageSize={10} blocks={blocks} />
      </div>
    </div>
  );
};
