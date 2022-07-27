import { useEffect, useState } from "react";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { numFormatter } from "../utils/helper";
import { useQuery } from "@apollo/client";
import { getBlocksList } from "../graphql/query/block";
export interface OverviewProps {
  active_miners?: number;
  avg_tx_fees_per_block?: number;
  btc_block_height?: string;
  btc_hash_rate?: string;
  last_tx_fees?: number;
  next_stx_halving?: number;
  reward_payout_interval?: number;
  stx_block_height?: number;
  total_sats_committed?: number;
  btc_total?: number;
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
  address: string;
  winner_address: string;
  block_status?: any;
}

export const useOverview = () => {
  const [totalWinners] = useState<any[]>([]);
  const [winnersAddresses] = useState<any[]>([]);

  const [blocks, setBlocks] = useState<Blocks[]>([]);
  const { data } = useQuery(getBlocksList, {
    variables: { limit: 100, offset: 0 },
  });

  useEffect(() => {
    if (data) {
      setBlocks(
        data.block_info.map((r: any) => {
          return {
            address: r.winnerAddress,
            block_number: "#" + r.stacksBlockHeight,
            mined_at:
              differenceInMinutes(new Date(), r.timestamp * 1000) +
              (window.innerWidth > 800 ? " Mins" : "Mins"),
            sats_spent: numFormatter(+r.totalSpent.aggregate.sum.commit_value),
            winner_address:
              r.winnerAddress.substring(0, 4) +
              ".." +
              r.winnerAddress.substring(
                r.winnerAddress.length - 4,
                r.winnerAddress.length
              ),
          };
        })
      );
    }
  }, [data]);

  return {
    blocks,
    totalWinners,
    winnersAddresses,
  };
};

export const numberWithCommas = (x: any) => {
  return new Intl.NumberFormat("en-US").format(parseFloat(x));
};
