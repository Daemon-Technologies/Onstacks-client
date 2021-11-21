/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Transaction from "../utils/explorer-types";
import { explorerInstance } from "../axios/axios";
import {
  explorerGetAddressRecentTxsList,
  getAddressOverview,
  getAddressNativeInfo,
  getAddressTokens,
  getAddressNFTList,
} from "../axios/requests";

export interface ExplorerOverview {
  total_sent: number;
  total_received: number;
  total_fee: number;
  total_mining_rewards: number;
  total_balance: number;
}

export interface AddressNativeInfo {
  assets_info: {
    balance: number;
    fungible_tokens: {
      name: string;
      contract_name: string;
      balance: number;
    }[];
    non_fungible_tokens: {
      name: string;
      contract_name: string;
      count: number;
    }[];
  };
  stacking_info: {
    stacked_amount: number;
    burnchain_lock_at: number;
    burnchain_unlock_at: number;
    percents: number;
  };
  mining_info: {
    miner_rewards: number;
    total_burnt: number;
  };
}

export interface TokensList {
  name: string;
  contract_name: string;
  balance: number;
}

export interface AddressNFTs {
  sender: string;
  recipient: string;
  asset_identifier: string;
  value: {
    hex: string;
    repr: string;
  };
  tx_id: string;
  block_height: string;
}

export const useExplorerAddressDetails = () => {
  const [address, setAddress] = useState("");
  const [overviewData, setOverviewData] = useState<ExplorerOverview>({
    total_sent: 0,
    total_received: 0,
    total_fee: 0,
    total_mining_rewards: 0,
    total_balance: 0,
  });
  const [nativeInfo, setNativeInfo] = useState<AddressNativeInfo>();
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [tokens, setTokens] = useState<TokensList[]>([]);
  const [nfts, setNfts] = useState<AddressNFTs[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasNextPage, sethasNextPage] = useState(true);

  const getRecentTransactions = () => {
    setIsLoading(true);
    try {
      explorerInstance
        .get(
          explorerGetAddressRecentTxsList(
            address,
            10,
            recentTransactions.length
          )
        )
        .then((data: any) => {
          sethasNextPage(data.confirmedTxs.length < 10);
          const transactions = recentTransactions.concat(
            data.confirmedTxs.results
          );
          setRecentTransactions(transactions);
          setIsLoading(false);
        });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const getOverviewData = () => {
    explorerInstance.get(getAddressOverview(address)).then((data: any) => {
      setOverviewData(data);
    });
  };

  const getNativeInfo = () => {
    explorerInstance.get(getAddressNativeInfo(address)).then((data: any) => {
      setNativeInfo(data);
    });
  };

  const getAddressTokensList = () => {
    explorerInstance.get(getAddressTokens(address, 10, 0)).then((data: any) => {
      setTokens(data.results);
    });
  };

  const getAddressNFT = () => {
    explorerInstance
      .get(getAddressNFTList(address, 10, nfts.length))
      .then((data: any) => {
        setNfts(data.results);
        console.log(data);
      });
  };

  useEffect(() => {
    if (address) {
      getOverviewData();
      getAddressTokensList();
      getRecentTransactions();
      getNativeInfo();
      getAddressNFT();
    }
  }, [address]);

  return {
    getRecentTransactions,
    recentTransactions,
    overviewData,
    hasError,
    nativeInfo,
    isLoading,
    setAddress,
    hasNextPage,
    address,
    tokens,
  };
};
