import {
  getBlocks,
  getSatsCommittedPerBlock,
  getTokenPrice,
  getTopBurnFeePerBlock,
} from "./../axios/requests";
import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { getOverviewData } from "../axios/requests";

export interface OverviewProps {
  active_miners: number;
  avg_tx_fees_per_block: number;
  btc_block_height: string;
  btc_hash_rate: string;
  last_tx_fees: number;
  next_stx_halving: number;
  reward_payout_interval: number;
  stx_block_height: number;
  total_sats_committed: number;
}

export interface TokenPriceProps {
  BTC: string;
  STX: string;
}

export interface SatsCommittedProps {
  total_sats_committed: number[];
  block_number: number[];
}

export interface TotalBurnedMinerFees {
  miner_list: {
    burn_fee: string;
    leader_key_address: string;
    btc_address: string;
  }[];
  block_number: string;
}

export interface Blocks {
  block_number: number;
  mined_at: number;
  sats_spent: string;
  winner_address: string;
}

export const useOverview = () => {
  const [overviewData, setOverviewData] = useState<OverviewProps>({
    active_miners: 0,
    avg_tx_fees_per_block: 0,
    btc_block_height: "",
    btc_hash_rate: "",
    last_tx_fees: 0,
    next_stx_halving: 0,
    reward_payout_interval: 0,
    stx_block_height: 0,
    total_sats_committed: 0,
  });
  const [tokens, setTokens] = useState<TokenPriceProps>({
    BTC: "0",
    STX: "0",
  });

  const [satsCommitted, setSatsCommitted] = useState<SatsCommittedProps>({
    block_number: [],
    total_sats_committed: [],
  });

  const [topMinerFees, setTopMinerFees] = useState<TotalBurnedMinerFees>();

  const [blocks, setBlocks] = useState<Blocks[]>([]);

  useEffect(() => {
    axios.get(getOverviewData).then((data: any) => {
      setOverviewData(data);
    });
    axios.get(getTokenPrice).then((data: any) => {
      setTokens({
        BTC: data.find((token: any) => token.token_name === "BTC").token_price,
        STX: data.find((token: any) => token.token_name === "STX").token_price,
      });
    });
    axios.get(getSatsCommittedPerBlock).then((data: any) => {
      setSatsCommitted({
        block_number: data.map((item: any) => item.block_number),
        total_sats_committed: data.map(
          (item: any) => item.total_sats_committed
        ),
      });
    });
    axios.get(getTopBurnFeePerBlock).then((data: any) => {
      setTopMinerFees(data);
    });
    axios.get(getBlocks).then((data: any) => {
      setBlocks(
        data.slice(0, 5).map((r: Blocks) => {
          return {
            block_number: "#" + r.block_number,
            mined_at: r.mined_at + " Mins",
            sats_spent: numberWithCommas(r.sats_spent),
            winner_address:
              r.winner_address.substring(0, 8) +
              ".." +
              r.winner_address.substring(
                r.winner_address.length - 5,
                r.winner_address.length - 1
              ),
          };
        })
      );
    });
  }, []);

  const numberWithCommas = (x: string) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return {
    overviewData,
    tokens,
    topMinerFees,
    satsCommitted,
    blocks,
  };
};
