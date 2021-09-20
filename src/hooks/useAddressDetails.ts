import differenceInMinutes from "date-fns/differenceInMinutes";
import { useState } from "react";
import axios from "../axios/axios";
import {
  getAddressBlocksHistory,
  getBriefMinerInfo,
  getSatsCommittedAdressPerBlock,
  getBlocksForSpecificAddress,
} from "../axios/requests";
import { AddressHeaderDetails } from "../components/AddressDetailsHeader";
import { numFormatter } from "../utils/helper";
import { Blocks, SatsCommittedProps } from "./useOverview";

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

export interface CurrentBlocks {
  block_number: number;
  burn_fee: number;
  block_status: 1;
  tx_id: string;
  btc_height: number;
  stacks_reward: number;
  return_rate: number;
}

export const useAddressDetails = () => {
  const [blocks, setBlocks] = useState<Blocks[]>([]);
  const [currentBlock] = useState<CurrentBlock>();
  const [minerInfo, setMinerInfo] = useState<AddressHeaderDetails>();
  const [satsCommitted, setSatsCommitted] = useState<SatsCommittedProps>({
    block_number: [],
    total_sats_committed: [],
  });
  const [currentBlocks, setCurrentBlocks] = useState<CurrentBlocks[]>([]);

  const getMinerInfo = (stxAddress: string) => {
    console.log(stxAddress);
    axios.get(getBriefMinerInfo(stxAddress)).then((data: any) => {
      setMinerInfo(data);
    });
  };

  const getAddressSatsCommitted = (stxAddress: string) => {
    axios.get(getSatsCommittedAdressPerBlock(stxAddress)).then((data: any) => {
      setSatsCommitted({
        block_number: data.map((item: any) => +item.block_number),
        total_sats_committed: data.map(
          (item: any) => +item.total_sats_committed
        ),
      });
    });
  };

  const getBlocksMiner = (stxAddress: string) => {
    axios.get(getAddressBlocksHistory(stxAddress)).then((data: any) => {
      setBlocks(
        data.map((r: Blocks) => {
          return {
            block_number: "#" + r.block_number,
            mined_at:
              differenceInMinutes(new Date(), r.mined_at * 1000) +
              (window.innerWidth > 800 ? " Mins" : ""),
            sats_spent: numFormatter(+r.sats_spent),
            block_status: r.block_status === 2 ? "Won" : "Lost",
          };
        })
      );
    });
  };

  const getBlocksForAddress = (stxAddress: string) => {
    axios.get(getBlocksForSpecificAddress(stxAddress)).then((data: any) => {
      setCurrentBlocks(data);
    });
  };
  // const getBlockByNumber = (blockNumber: string) => {
  //   axios.get(getBlockNumber(blockNumber.substring(1))).then((data: any) => {
  //     setCurrentBlock({ ...data, blockNumber });
  //   });
  // };

  return {
    blocks,
    currentBlock,
    getMinerInfo,
    getBlocksMiner,
    minerInfo,
    getAddressSatsCommitted,
    satsCommitted,
    getBlocksForAddress,
    currentBlocks,
  };
};
