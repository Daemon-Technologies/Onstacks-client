/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import {
  addressArea,
  getRelativeTimestamp,
  getTxTitle,
  getTxTypeName,
  truncateMiddle,
} from "../utils/utils";
import StacksTransferLight from "../assets/explorer/stacks-transfer-light.svg";
import FunctionCallLight from "../assets/explorer/function-call-light.svg";
import StacksTransferDark from "../assets/explorer/stacks-transfer-dark.svg";
import FunctionCallDark from "../assets/explorer/function-call-dark.svg";
import { useHistory } from "react-router-dom";
import Transaction from "../utils/explorer-types";

export const LoadTransactions: React.FC<{
  recentTransactions: Transaction[];
  theme: any;
}> = ({ theme, recentTransactions }) => {
  const { push } = useHistory();

  const LoadRecentTransactions = useCallback(() => {
    const transactions = recentTransactions.map((transaction) => {
      const isPending = transaction.tx_status === "pending";
      const isConfirmed = transaction.tx_status === "success";
      const isAnchored = !(transaction as any).is_unanchored;
      const didFail = !isPending && !isConfirmed;
      return (
        <>
          <div
            onClick={() => push("/explorer/txId/" + transaction.tx_id)}
            key={transaction.block_hash}
            className="table-item"
          >
            <div className="left-content">
              {transaction.tx_type === "token_transfer" ? (
                <img
                  className="transaction-image"
                  alt="transaction"
                  src={
                    theme === "light" ? StacksTransferLight : StacksTransferDark
                  }
                />
              ) : (
                <img
                  className="transaction-image"
                  alt="transaction"
                  src={theme === "light" ? FunctionCallLight : FunctionCallDark}
                />
              )}
              <div>
                <p className="title">{getTxTitle(transaction)}</p>
                <p className="subtitle">
                  {getTxTypeName(transaction.tx_type)} •{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      push("/explorer/address/" + transaction.sender_address)
                    }
                  >
                    {addressArea(transaction)}
                  </span>
                </p>
              </div>
            </div>
            <div
              onClick={() => push("/explorer/txId/" + transaction.tx_id)}
              className="right-content"
            >
              <p className="title">{getRelativeTimestamp(transaction)}</p>
              <p className="subtitle">
                {isPending && "Pending"}
                {isConfirmed && !isAnchored && "In microblock"}
                {isConfirmed && isAnchored && "In anchor block"}
                {didFail && "Failed"} • {truncateMiddle(transaction.tx_id, 4)}
              </p>
            </div>
          </div>
        </>
      );
    });
    return transactions;
  }, [recentTransactions, theme]);

  return <>{recentTransactions.length > 0 && LoadRecentTransactions()}</>;
};
