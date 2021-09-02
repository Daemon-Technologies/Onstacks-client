import { useEffect, useState } from "react";
import axios from "../axios/axios";
import {
  getMinersInfo,
  getBlockNumber,
  getMiningInfo,
} from "../axios/requests";

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

export interface MiningInfo {
  total_sats_spent: number;
  total_stx_reward: number;
  miners_info: {
    stx_address: string;
    total_sats_spent: number;
    total_stx_reward: number;
  }[];
}

export const useMiningData = () => {
  const [blocks, setBlocks] = useState<MinerInfo[]>([]);
  const [currentBlock, setCurrentBlock] = useState<CurrentBlock>();
  const [miningInfo, setMiningInfo] = useState<MiningInfo>({
    miners_info: [],
    total_sats_spent: 0,
    total_stx_reward: 0,
  });

  useEffect(() => {
    axios.get(getMinersInfo).then((data: any) => {
      setBlocks(
        data.map((r: MinerInfo) => {
          return {
            stx_address:
              window.innerWidth > 600
                ? `${r.stx_address.substring(
                    0,
                    12
                  )} ... ${r.stx_address.substring(
                    r.stx_address.length - 12,
                    r.stx_address.length - 1
                  )}`
                : `${r.stx_address.substring(
                    0,
                    4
                  )} ... ${r.stx_address.substring(
                    r.stx_address.length - 4,
                    r.stx_address.length - 1
                  )}`,
            total_burnfee: numberWithCommas(r.total_burnfee) || 0,
            total_block_reward: numberWithCommas(r.total_block_reward) || 0,
            total_participation: numberWithCommas(r.total_participation) || 0,
            total_stx_reward: numberWithCommas(r.total_stx_reward) || 0,
          };
        })
      );
    });
    axios.get(getMiningInfo).then((data: any) => {
      setMiningInfo(data);
    });
  }, []);
  const numberWithCommas = (x: number) => {
    if (x)
      return x
        .toFixed(1)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const getBlockByNumber = (blockNumber: string) => {
    axios.get(getBlockNumber(blockNumber.substring(1))).then((data: any) => {
      setCurrentBlock({ ...data, blockNumber });
    });
  };

  return {
    blocks,
    miningInfo,
    getBlockByNumber,
    currentBlock,
  };
};
