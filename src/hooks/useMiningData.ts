import { useEffect, useState } from "react";
import axios from "../axios/axios";
import { getMinersInfo, getBlockNumber } from "../axios/requests";

export interface MinerInfo {
  stx_address: string;
  total_burnfee: number;
  total_block_reward: number;
  total_participation: number;
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

export const useMiningData = () => {
  const [blocks, setBlocks] = useState<MinerInfo[]>([]);
  const [currentBlock, setCurrentBlock] = useState<CurrentBlock>();

  useEffect(() => {
    axios.get(getMinersInfo).then((data: any) => {
      setBlocks(
        data.map((r: MinerInfo) => {
          return {
            stx_address: "#" + r.stx_address,
            total_burnfee: r.total_burnfee || 0,
            total_block_reward: r.total_block_reward || 0,
            total_participation: r.total_participation || 0,
            total_stx_reward: r.total_stx_reward || 0,
          };
        })
      );
      console.log(data);
      // getBlockByNumber(data[data.length - 1].)
    });
  }, []);

  const getBlockByNumber = (blockNumber: string) => {
    axios.get(getBlockNumber(blockNumber.substring(1))).then((data: any) => {
      setCurrentBlock({ ...data, blockNumber });
    });
  };

  return {
    blocks,
    getBlockByNumber,
    currentBlock,
  };
};
