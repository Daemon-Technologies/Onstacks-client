/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { useState, useEffect } from "react";
import { instance as axios } from "../axios/axios";
import { getBriefMinerInfo } from "../axios/requests";
import { AddressHeaderDetails } from "../components/AddressDetailsHeader";
import { minerInformations } from "../graphql/query/miningMonitorConfig";
import { numFormatter } from "../utils/helper";
import { SatsCommittedProps } from "./useOverview";

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
  const [blocks, setBlocks] = useState<any[]>([]);
  const [minerInfo, setMinerInfo] = useState<AddressHeaderDetails>();
  const [satsCommitted, setSatsCommitted] = useState<SatsCommittedProps>({
    block_number: [],
    total_sats_committed: [],
  });
  const [currentBlocks, setCurrentBlocks] = useState<CurrentBlocks[]>([]);
  const [currentBlock, setCurrentBlock] = useState<any>();
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const { data } = useQuery(minerInformations);

  useEffect(() => {
    if (data) {
      const arr: CurrentBlocks[] = data.block_info.map((i: any) => {
        const index = i.winner_to_all_commit.findIndex(
          (s: any) => s.stx_address === address
        );
        const val = i.winner_to_all_commit[index];
        return {
          block_number: i.stacks_block_height,
          timeElapsed: i.timestamp,
          burn_fee: val ? val.commit_value : 0,
          block_status: index === -1 ? 0 : val.is_winner ? 2 : 1,
          tx_id: val ? val.commit_info_to_commit_gas.commit_btc_tx_id : "0",
          btc_height: i.btc_block_height,
          stacks_reward: i.block_reward,
          return_rate: 0,
        };
      });
      setCurrentBlocks(arr.reverse());
    }
    // setCurrentBlocks(data);
  }, [address, data]);

  const getMinerInfo = (stxAddress: string) => {
    axios.get(getBriefMinerInfo(stxAddress)).then((data: any) => {
      setMinerInfo(data);
    });
  };

  useEffect(() => {
    if (currentBlocks.length > 0) {
      setSatsCommitted({
        block_number: currentBlocks.map((block: any) => +block.block_number),
        total_sats_committed: currentBlocks.map(
          (block: any) => +block.burn_fee
        ),
      });
      getBlocksMiner();
      getBlockByNumber(currentBlocks[49].block_number);
    }
  }, [currentBlocks]);

  const getAddressSatsCommitted = (stxAddress: string) => {
    setSatsCommitted({
      block_number: currentBlocks.map((block: any) => +block.block_number),
      total_sats_committed: currentBlocks.map((block: any) => +block.burn_fee),
    });
  };

  const getBlocksMiner = () => {
    setBlocks(
      currentBlocks.map((r: any) => {
        return {
          block_number: "#" + r.block_number,
          mined_at:
            differenceInMinutes(new Date(), r.timeElapsed * 1000) + " Mins",
          sats_spent: numFormatter(+r.burn_fee),
          block_status:
            r.block_status === 2
              ? "Won"
              : r.block_status === 1
              ? "Lost"
              : "Inactive",
        };
      })
    );
  };

  const getBlockByNumber = (blockNumber: any) => {
    const index = currentBlocks.findIndex(
      (block) => block.block_number === blockNumber
    );
    setCurrentBlock(currentBlocks[index]);
  };

  const getAddressName = async (address: string) => {
    const result = await fetch(
      `https://stacks-node-api.mainnet.stacks.co/v1/addresses/stacks/${address}`
    );
    const resData = await result.json();
    if (resData && resData.names.length > 0) {
      setUsername(resData.names[0]);
    }
  };

  return {
    blocks,
    currentBlock,
    getMinerInfo,
    getBlocksMiner,
    minerInfo,
    getAddressSatsCommitted,
    satsCommitted,
    getAddressName,
    currentBlocks,
    getBlockByNumber,
    username,
    setAddress,
  };
};
