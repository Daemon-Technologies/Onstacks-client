/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import Transaction from "../utils/explorer-types";
import { explorerInstance } from "../axios/axios";
import { getTxByTxId } from "../axios/requests";
// import { TransactionsApi } from "@stacks/blockchain-api-client";
// import { config } from "./useExplorerAddressDetail";
// import { TransactionsApi } from "@stacks/blockchain-api-client";
// import { config } from "./useExplorerAddressDetail";

export const useTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();
  const [block, setBlock] = useState<any>();
  const [contractDetails, setContractDetails] = useState<any>();
  const [contractCode, setContractCode] = useState<any>();
  const [microBlock, setMicroBlock] = useState<any>();
  const [blockTransaction, setBlockTransaction] = useState<any>([]);
  const [contractTransactions, setContractTransaction] = useState<any>([]);
  const [fails, setFails] = useState(false);
  const [contractData, setContractData] = useState<any>();
  const [contractEvents, setContractEvents] = useState<any>([]);
  const [hasNextPage, sethasNextPage] = useState(true);

  const getBlock = (block: string) => {
    return fetch(
      "https://stacks-node-api.mainnet.stacks.co/extended/v1/block/by_height/" +
        block
    )
      .then((response) => response.json())
      .then((data) => setBlock(data));
  };

  const getMicroblocks = (hash: string) => {
    return fetch(
      "https://stacks-node-api.mainnet.stacks.co/extended/v1/microblock/" + hash
    )
      .then((response) => response.json())
      .then((data) => setMicroBlock(data));
  };

  const getBlockTransactions = (block: string) => {
    return fetch(
      "https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/block/" + block
    )
      .then((response) => response.json())
      .then((data) => setBlockTransaction(data.results));
  };

  const getTransaction = (id: string) => {
    setIsLoading(true);
    try {
      explorerInstance.get(getTxByTxId(id)).then((data: any) => {
        setTransaction(data);
        if (data !== undefined) {
          explorerInstance.get(getTxByTxId(id)).then((data: any) => {
            if (data !== undefined) {
              setTransaction(data);
            }
          });
        }
      });
      setIsLoading(false);
    } catch (error) {
      setFails(true);
    }
  };

  const getContractDetails = (tx: any) => {
    const name = tx.split(".")[1];
    const address = tx.split(".")[0];
    fetch(
      `https://stacks-node-api.mainnet.stacks.co/v2/contracts/interface/${address}/${name}`
    )
      .then((response) => response.json())
      .then((data) =>
        setContractDetails({
          functions: data.functions || [],
          maps: data.map || [],
          variables: data.variables || [],
          fungible_tokens: data.fungible_tokens || [],
        })
      );
  };

  const getContractCode = (tx: any, contractName?: string, addr?: string) => {
    const name = tx.split(".")[1];
    const address = tx.split(".")[0];
    fetch(
      `https://stacks-node-api.mainnet.stacks.co/v2/contracts/source/${
        addr || address
      }/${contractName || name}`
    )
      .then((response) => response.json())
      .then((data) =>
        setContractCode({
          source: data.source,
        })
      );
  };

  const getContractById = (tx: any) => {
    fetch(
      `https://stacks-node-api.mainnet.stacks.co/extended/v1/contract/${tx}`
    )
      .then((response) => response.json())
      .then((data) => setContractData(data));
  };

  const getContractEvents = (tx: any) => {
    return fetch(
      `https://stacks-node-api.mainnet.stacks.co/extended/v1/contract/${tx}/events`
    )
      .then((response) => response.json())
      .then((data) => setContractEvents(data.results));
  };

  const getContractTransactions = (tx: any) => {
    setIsLoading(true);
    try {
      fetch(
        `https://stacks-node-api.stacks.co/extended/v1/address/${tx}/transactions?limit=10&offset=${contractTransactions.length}&unanchored=true`
      )
        .then((response) => response.json())
        .then((data) => {
          sethasNextPage(data.results.length < 10);
          console.log(data.results.length < 10, data.results.length);
          const transactions = contractTransactions.concat(data.results);
          setContractTransaction(transactions);
          setIsLoading(false);
        });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    hasError,
    getContractDetails,
    isLoading,
    transaction,
    getContractById,
    getContractCode,
    contractCode,
    contractDetails,
    getContractTransactions,
    getBlockTransactions,
    block,
    blockTransaction,
    contractTransactions,
    getMicroblocks,
    microBlock,
    getBlock,
    getContractEvents,
    contractEvents,
    contractData,
    getTransaction,
    hasNextPage,
    fails,
  };
};
