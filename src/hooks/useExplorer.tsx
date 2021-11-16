/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Transaction from "../utils/explorer-types";
import { explorerInstance } from "../axios/axios";
import {
  explorerGetAnchoredBlockList,
  explorerGetOverviewData,
  explorerGetRecentTxsList,
} from "../axios/requests";

export interface ExplorerOverview {
  total_txs_24hrs: number;
  total_blocks_24hrs: number;
  total_microblocks_24hrs: number;
  total_tx_fees: number;
  STX_height: number;
  BTC_height: number;
  total_volume: number;
}

export interface ExplorerBlockAnchor {
  height: number;
  hash: string;
  burn_block_hash: string;
  burn_block_time: number;
  burn_block_height: string;
  txs: Transaction[];
  microblocks_accepted: {
    canonical: boolean;
    microblock_hash: string;
    block_height: number;
    txs: Transaction[];
  }[];
}

export const useExplorer = () => {
  const [overviewData, setOverviewData] = useState<ExplorerOverview>({
    total_txs_24hrs: 0,
    total_blocks_24hrs: 0,
    total_microblocks_24hrs: 0,
    total_tx_fees: 0,
    STX_height: 0,
    total_volume: 0,
    BTC_height: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [recentBlocks, setRecentBlocks] = useState<ExplorerBlockAnchor[]>([]);

  const getRecentTransactions = () => {
    explorerInstance
      .get(explorerGetRecentTxsList(10, recentTransactions.length))
      .then((data: any) => {
        setRecentTransactions(data.results);
      });
  };

  const getAnchoredBlockList = () => {
    explorerInstance
      .get(explorerGetAnchoredBlockList(10, recentTransactions.length))
      .then((data: any) => {
        setRecentBlocks(data.results);
      });
  };

  const getOverviewData = () => {
    explorerInstance.get(explorerGetOverviewData).then((data: any) => {
      setOverviewData(data);
    });
  };

  useEffect(() => {
    getOverviewData();
    getRecentTransactions();
    getAnchoredBlockList();
  }, []);

  return {
    getRecentTransactions,
    recentTransactions,
    overviewData,
    recentBlocks,
  };
};
