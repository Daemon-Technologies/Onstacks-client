import { useEffect, useState } from "react";
import { instance as axios } from "../axios/axios";
import {
  getMinersInfo,
  getBlockNumber,
  getMiningInfo,
} from "../axios/requests";
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
  const [miningInfo, setMiningInfo] = useState<MiningInfo>({
    miners_info: [],
    total_sats_spent: 0,
    total_stx_reward: 0,
  });
  const dims = useWindowDimensions();

  useEffect(() => {
    axios.get(getMinersInfo).then((data: any) => {
      setBlocks(
        data.map((r: MinerInfo) => {
          return {
            address: r.stx_address,
            stx_address:
              window.innerWidth > 600
                ? `${r.stx_address.substring(
                    0,
                    10
                  )} ... ${r.stx_address.substring(
                    r.stx_address.length - 10,
                    r.stx_address.length
                  )}`
                : `${r.stx_address.substring(
                    0,
                    7
                  )} ... ${r.stx_address.substring(
                    r.stx_address.length - 7,
                    r.stx_address.length
                  )}`,
            total_burnfee: r.total_burnfee
              ? r.total_burnfee.toLocaleString()
              : 0,
            total_block_reward: r.total_block_reward
              ? r.total_block_reward.toLocaleString()
              : 0,
            total_participation: r.total_participation
              ? r.total_participation.toFixed(0)
              : 0,
            total_stx_reward: r.total_stx_reward
              ? r.total_stx_reward.toLocaleString()
              : 0,
          };
        })
      );
    });
    axios.get(getMiningInfo).then((data: any) => {
      setMiningInfo(data);
    });
  }, [dims]);

  const getBlockByNumber = (blockNumber: string) => {
    axios.get(getBlockNumber(blockNumber)).then((data: any) => {
      setCurrentBlock({ ...data, blockNumber: blockNumber });
    });
  };

  return {
    blocks,
    miningInfo,
    getBlockByNumber,
    currentBlock,
  };
};
