/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line
import React from "react";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import { getBtcCommits } from "../graphql/query/commitValue";
import { OverviewProps } from "../hooks/useOverview";
import { getBlockHash } from "../utils/helper";
import { InfoCard } from "./InfoCard";

export const MiningDataHeader: React.FC<{
  overviewData: OverviewProps;
  blockHeights: any;
  setMiningData: any;
  tabIndex?: number;
}> = ({ blockHeights, setMiningData }) => {
  const { data } = useQuery(getBtcCommits, {
    variables: {
      stacks_block_height: blockHeights.STX_HEIGHT - 100,
    },
  });
  const [currentData, setCurrentData] = useState({
    active_miners: 0,
    btc_total: 0,
    avg_tx_fees_per_block: "",
    btc_hash_rate: "",
    btcSpent: "",
  });

  useEffect(() => {
    if (data) {
      setCurrentData({
        active_miners: data.activeMinersCount.aggregate.count,
        avg_tx_fees_per_block: data.blockFeesRecent.aggregate.avg.tx_reward,
        btc_total:
          data.btcSpentAllTime.aggregate.sum.commit_value +
          data.btcFeesAllTime.aggregate.sum.commit_btc_gas_fee,
        btcSpent:
          data.btcSpentRecent.aggregate.sum.commit_value +
          data.btcFeesRecent.aggregate.sum.commit_btc_gas_fee,
        btc_hash_rate: data.config[0].value,
      });
      setMiningData({
        active_miners: data.activeMinersCount.aggregate.count,
        avg_tx_fees_per_block: data.blockFeesRecent.aggregate.avg.tx_reward,
        btc_total:
          data.btcSpentAllTime.aggregate.sum.commit_value +
          data.btcFeesAllTime.aggregate.sum.commit_btc_gas_fee,
        btcSpent:
          data.btcSpentRecent.aggregate.sum.commit_value +
          data.btcFeesRecent.aggregate.sum.commit_btc_gas_fee,
        btc_hash_rate: data.config[0].value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
        <p className="screen-title">Overview</p>
        <div className="data">
          <a onClick={() => getBlockHash(blockHeights.STX_HEIGHT)}>
            STX block height:&nbsp; <span>#{blockHeights.STX_HEIGHT} </span>
          </a>
          <a
            style={{ marginLeft: 16 }}
            target="_blank"
            href={"https://btc.com/btc/block/" + blockHeights.BTC_HEIGHT}
            rel="noopener noreferrer"
          >
            BTC block height: &nbsp;
            <span>#{blockHeights.BTC_HEIGHT}</span>
          </a>
        </div>
      </div>
      <InfoCard overviewData={currentData} />
    </>
  );
};
