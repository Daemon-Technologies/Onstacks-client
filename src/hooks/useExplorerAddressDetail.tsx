/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Transaction from "../utils/explorer-types";
import { explorerInstance } from "../axios/axios";
import {
  explorerGetAddressRecentTxsList,
  getAddressOverview,
  getAddressNativeInfo,
  getAddressTokens,
  explorerGetOverviewData,
} from "../axios/requests";
import { AccountsApi, Configuration } from "@stacks/blockchain-api-client";
import { SmartContractsApi } from "@stacks/blockchain-api-client";
import { cvToString, deserializeCV } from "@stacks/transactions";
export interface ExplorerOverview {
  total_sent: number;
  total_received: number;
  total_fee: number;
  total_mining_rewards: number;
  total_balance: number;
}

export const STACK_API_URL = "https://stacks-node-api.mainnet.stacks.co";
export const config = new Configuration({ basePath: STACK_API_URL });
export const accountsApi = new AccountsApi(config);

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
    stacking_amount: number;
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
  url: string;
  id: string;
  assetName: string;
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
  const [addressNfts, setAddressNfts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasNextPage, sethasNextPage] = useState(true);
  const [blockHeight, setBlockHeight] = useState(0);
  const [username, setUsername] = useState("");
  const api = new SmartContractsApi();
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
          sethasNextPage(data.confirmedTxs.results.length === 10);
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

  const callContract = async (
    contractAddress: string,
    contractName: string,
    args: string,
    id: string
  ) => {
    try {
      const res = await api.callReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: "get-token-uri",
        readOnlyFunctionArgs: { sender: contractAddress, arguments: [args] },
      });
      if (res.result) {
        const hex = res.result.slice(2);
        const bufferCv = Buffer.from(hex, "hex");
        const clarityValue = deserializeCV(bufferCv);
        const x = cvToString(clarityValue);
        const item = x.substring(10, x.length - 2);
        await successURL(item, id, contractName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const successURL = async (item: string, id: string, contractName: string) => {
    try {
      if (item.includes("ipfs://")) {
        const i = item
          .replace("ipfs://", "https://gateway.ipfs.io/ipfs/")
          .replace("{id}", id);
        const url = i.includes("json") ? i : `${i}/${id}.json`;
        const result = await fetch(url.replaceAll('"', ""));
        const resData = await result.json();
        setAddressNfts((oldArray) => [
          ...oldArray,
          {
            image: resData.image.replace(
              "ipfs://",
              "https://gateway.ipfs.io/ipfs/"
            ),
            id,
            name: contractName,
          },
        ]);
      } else {
        const result = await fetch(
          item.replaceAll('"', "").replace("{id}", id)
        );
        const resData = await result.json();
        setAddressNfts((oldArray) => [
          ...oldArray,
          {
            image: resData.image.replace(
              "ipfs://",
              "https://gateway.ipfs.io/ipfs/"
            ),
            id,
            name: contractName,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getName = async () => {
    const result = await fetch(
      `https://stacks-node-api.mainnet.stacks.co/v1/addresses/stacks/${address}`
    );
    const resData = await result.json();
    if (resData && resData.names.length > 0) {
      setUsername(resData.names[0]);
    }
  };

  const getOverviewData = () => {
    explorerInstance.get(explorerGetOverviewData).then((data: any) => {
      setBlockHeight(data.BTC_height);
    });
    explorerInstance.get(getAddressOverview(address)).then((data: any) => {
      setOverviewData(data);
    });
  };

  const getNativeInfo = () => {
    explorerInstance.get(getAddressNativeInfo(address)).then((data: any) => {
      setNativeInfo(data);
    });
  };

  const getAddressNFTs = async () => {
    const data = await accountsApi.getAccountNft({
      principal: address,
      limit: 30,
    });
    data.nft_events.map(async (nft: any) => {
      const assetId = nft.asset_identifier.split("::")[0];
      await callContract(
        assetId.split(".")[0],
        assetId.split(".")[1],
        nft.value.hex,
        nft.value.repr.substr(1)
      );
    });
  };

  const getAddressTokensList = () => {
    explorerInstance.get(getAddressTokens(address, 10, 0)).then((data: any) => {
      setTokens(
        data.results
          .sort((a: any, b: any) => {
            return b.balance - a.balance;
          })
          .map((item: any) => {
            return {
              name: item.name.substr(1),
              balance: item.balance.toLocaleString(),
            };
          })
      );
    });
  };

  useEffect(() => {
    if (address) {
      getOverviewData();
      getName();
      getAddressTokensList();
      getRecentTransactions();
      getNativeInfo();
      getAddressNFTs();
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
    addressNfts,
    blockHeight,
    address,
    tokens,
    callContract,
    username,
  };
};
