/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Transaction from "../utils/explorer-types";
import { explorerInstance } from "../axios/axios";
import { explorerGetOverviewData } from "../axios/requests";

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
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAnchoredBlockLoading, setIsAnchoredBlockLoading] = useState(false);

  const getRecentTransactions = (offs?: number) => {
    setIsLoading(true);
    try {
      fetch(
        `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx?limit=${10}&offset=${
          offs || recentTransactions.length
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          if (offs === 0) {
            setRecentTransactions(data.results);
          } else {
            const transactions = recentTransactions.concat(data.results);
            setRecentTransactions(transactions);
          }
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const getRecentPendingTransactions = (offs?: number) => {
    setIsLoading(true);
    try {
      fetch(
        `https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/mempool?unanchored=true&limit=${10}&offset=${
          offs || recentTransactions.length
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          if (offs === 0) {
            setRecentTransactions(data.results);
          } else {
            const transactions = recentTransactions.concat(data.results);
            setRecentTransactions(transactions);
          }
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const getAnchoredBlockList = async () => {
    setIsAnchoredBlockLoading(true);
    fetch(
      `https://stacks-node-api.mainnet.stacks.co/extended/v1/block?&limit=${10}&offset=${
        recentBlocks.length
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        if (recentBlocks.length === 0) {
          setRecentBlocks(data.results);
        } else {
          const transactions = recentBlocks.concat(data.results);
          setRecentBlocks(transactions);
        }
        setIsAnchoredBlockLoading(false);
      });
  };

  const getOverviewData = () => {
    explorerInstance.get(explorerGetOverviewData).then((data: any) => {
      setOverviewData(data);
    });
  };

  const getMicroBlock = (hash: string) => {
    return fetch(
      "https://stacks-node-api.mainnet.stacks.co/extended/v1/microblock/" + hash
    )
      .then((response) => response.json())
      .then((data) => data);
  };

  useEffect(() => {
    getOverviewData();
    getRecentTransactions();
    getAnchoredBlockList();
  }, []);

  const emptyState = () => {
    setRecentTransactions([]);
  };

  return {
    getRecentTransactions,
    recentTransactions,
    getRecentPendingTransactions,
    overviewData,
    hasError,
    isLoading,
    getAnchoredBlockList,
    recentBlocks,
    emptyState,
    getMicroBlock,
    isAnchoredBlockLoading,
  };
};
