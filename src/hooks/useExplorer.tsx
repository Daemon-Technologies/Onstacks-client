import { useState } from "react";
import Transaction from "../utils/explorer-types";

export const useExplorer = () => {
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );

  const getRecentTransactions = () => {
    fetch("https://stacks-node-api.mainnet.stacks.co/extended/v1/tx")
      .then((response) => response.json())
      .then((data) => setRecentTransactions(data.results));
  };

  return {
    getRecentTransactions,
    recentTransactions,
  };
};
