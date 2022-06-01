import { truncateMiddle } from "./../utils/utils";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { instance as axios } from "../axios/axios";
import { getBlockNumber } from "../axios/requests";
import { minerList } from "../graphql/query/block";
import useWindowDimensions from "./useWindowDimension";

export interface MinerInfo {
  stx_address: string;
  total_burnfee: number;
  total_block_reward: number;
  total_participation: number;
  address: string;
  total_blocks: number;
  total_stx_reward: number;
}

export interface CurrentBlock {
  block_status: string;
  blockNumber: string;
  block_info: {
    block_height: number;
    is_btc_pending: boolean;
    is_reward_pending: boolean;
    is_stx_pending: boolean;
    return_rate: number;
    stacks_awarded: number;
    tx_id: string;
    winning_address: string;
    winning_miner_burn_fee: string;
  };
  miners_count: number;
  total_burn_fee: number;
  miners_info: {
    miner_address: string;
    burn_fee: number;
    win_probability: number;
  }[];
}

export interface MiningInfo {
  total_sats_spent: number;
  total_stx_reward: number;
  miners_info: {
    stx_address: string;
    total_sats_spent: number;
    total_stx_reward: number;
  }[];
}

export const useMiningData = (blockHeights: any) => {
  const [blocks, setBlocks] = useState<MinerInfo[]>([]);
  const [currentBlock, setCurrentBlock] = useState<CurrentBlock>();
  const dims = useWindowDimensions();

  const { data: miners } = useQuery(minerList);

  useEffect(() => {
    if (miners) {
      setBlocks(
        miners.miner_info
          .map((itm: any) => ({
            ...miners.miner_rewards.find(
              (item: any) => item.stx_address === itm.stx_address && item
            ),
            ...itm,
          }))
          .map((item: any) => {
            return {
              address: item.stx_address,
              stx_address: truncateMiddle(item.stx_address, 8),
              total_burnfee: item.total_commits,
              total_participation: item.total_participations
                ? item.total_participations
                : 0,
              total_block_reward: item.total_won ? item.total_won : 0,
              total_stx_reward: item.total_reward ? item.total_reward : 0,
            };
          })
      );
    }
  }, [dims, miners]);

  const getBlockByNumber = (blockNumber: string) => {
    axios.get(getBlockNumber(blockNumber)).then((data: any) => {
      setCurrentBlock({ ...data, blockNumber: blockNumber });
    });
  };

  return {
    blocks,
    getBlockByNumber,
    currentBlock,
  };
};
