/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import Transaction from "../utils/explorer-types";
import { explorerInstance } from "../axios/axios";
import { getTxByTxId } from "../axios/requests";

export const useTransaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();

  const getTransaction = (id: string) => {
    setIsLoading(true);
    explorerInstance.get(getTxByTxId(id)).then((data: any) => {
      setTransaction(data);
    });
    setIsLoading(false);
  };

  return {
    hasError,
    isLoading,
    transaction,
    getTransaction,
  };
};
