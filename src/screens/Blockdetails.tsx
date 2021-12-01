/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTransaction } from "../hooks/useTransaction";
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
interface Props {
  theme: any;
  themeToggler: any;
  failure: boolean;
}

export const Blockdetails: React.FC<Props> = ({
  theme,
  themeToggler,
  failure,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const { block, getBlock, blockTransaction, getBlockTransactions } =
    useTransaction();

  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);
  const { push } = useHistory();

  useEffect(() => {
    if (params?.block) {
      getBlock(params?.block);
    }
  }, [params]);

  useEffect(() => {
    if (block) {
      getBlockTransactions(block.hash);
    }
  }, [block]);

  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);

  const LoadRecentTransactions = useCallback(() => {
    const transactions = blockTransaction.map((transaction: any) => {
      const isPending = transaction.tx_status === "pending";
      const isConfirmed = transaction.tx_status === "success";
      const isAnchored = !(transaction as any).is_unanchored;
      const didFail = !isPending && !isConfirmed;
      return (
        <>
          <div
            onClick={() => push("/explorer/txid/" + transaction.tx_id)}
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
  }, [blockTransaction, theme]);
  console.log(block);
  return (
    <div className="block-details">
      {block && (
        <>
          <h3>Block #{params.block}</h3>
          <div className="transaction-container">
            <div className="recent-transactions">
              <div className="rt-table rtt-table">
                <div className="table-header">
                  <p>Summary</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Hash</p>
                  <p className="subtitle">{truncateMiddle(block.hash, 10)}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Height</p>
                  <p className="subtitle">{block?.height}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Block Hash</p>
                  <p className="subtitle">
                    {truncateMiddle(block?.burn_block_hash, 10)}
                  </p>
                </div>
              </div>
            </div>
            <div className="anchor-block">
              <div className="ab-table abb-table">
                <div className="table-header">
                  <p>Bitcoin anchor</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Bitcoin block height</p>
                  <p className="subtitle">{block?.burn_block_height}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Bitcoin block hash</p>
                  <p className="subtitle">
                    {truncateMiddle(block?.parent_block_hash, 10)}
                  </p>
                </div>
                <div className="transaction-row">
                  <p className="title">Anchor transaction id</p>
                  <p className="subtitle">
                    {truncateMiddle(block?.burn_block_hash, 10)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="transaction-container">
            <div style={{ flex: 1 }} className="recent-transactions">
              <div className="rt-table rtt-table">
                <div className="table-header">
                  <p>Transaction in block ({block.txs.length})</p>
                </div>
                {blockTransaction.length > 0 && LoadRecentTransactions()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
