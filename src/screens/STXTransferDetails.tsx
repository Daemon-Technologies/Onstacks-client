/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTransaction } from "../hooks/useTransaction";
import {
  capitalize,
  getAddressValue,
  getAmount,
  getConditionTicker,
  getPrettyCode,
  getTxTitle,
  getTxTypeName,
  truncateMiddle,
} from "../utils/utils";
import Arrow from "../assets/explorer/arrow.svg";
import Stacks from "../assets/side-menu/stacks.svg";
import Block from "../assets/explorer/block.svg";
import Bitcoin from "../assets/side-menu/bitcoin.svg";
import Check from "../assets/explorer/check.png";
import { Events } from "../components/Events";

interface Props {
  theme: any;
  themeToggler: any;
  failure: boolean;
}

export const STXTransferDetails: React.FC<Props> = ({
  theme,
  themeToggler,
  failure,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const [txId, setTxId] = useState("");
  const { getTransaction, transaction } = useTransaction();
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);
  const { push } = useHistory();

  useEffect(() => {
    if (params?.txId) {
      setTxId(params.txId);
    }
  }, [params]);

  useEffect(() => {
    if (txId) {
      getTransaction(txId);
      // getAddressSatsCommitted(address);
      // getBlocksMiner(address);
      // getBlocksForAddress(address);
    }
  }, [txId]);

  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);
  console.log(transaction);
  return (
    <div className="explorer">
      {transaction && (transaction as any).contract_call && (
        <>
          <div id="main">
            <div style={{ padding: 32 }} className={"transaction-card"}>
              <div
                style={{ padding: 8, borderTop: 0 }}
                // onClick={() => push("/explorer/txId/" + transaction.tx_id)}
                className="table-item"
              >
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={Stacks}
                  />
                  <div>
                    <p
                      onClick={() =>
                        push("/explorer/txId/" + transaction.tx_id)
                      }
                      className="title"
                    >
                      {getTxTitle(transaction)}
                    </p>
                    <p className="subtitle">
                      {getTxTypeName(transaction.tx_type)}
                    </p>
                  </div>
                </div>
              </div>
              <img style={{ width: 120 }} src={Arrow} alt={"arrow"} />
              <div
                style={{ padding: 8, borderTop: 0 }}
                // onClick={() => push("/explorer/txId/" + transaction.tx_id)}
                className="table-item"
              >
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={Block}
                  />
                  <div>
                    <p className="title">
                      <img
                        className="transaction-image"
                        alt="transaction"
                        src={Stacks}
                      />
                      #{transaction.block_height} →
                      <img
                        className="transaction-image"
                        alt="transaction"
                        src={Bitcoin}
                      />
                      #
                      {
                        (transaction as any).block_anchor_info
                          .bitcoin_block_height
                      }
                    </p>
                  </div>
                </div>
              </div>
              <img style={{ width: 120 }} src={Arrow} alt={"arrow"} />
              <div style={{ padding: 8, borderTop: 0 }} className="table-item">
                <div className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={Stacks}
                  />
                  <div>
                    <p
                      onClick={() =>
                        push("/explorer/txId/" + transaction.tx_id)
                      }
                      className="title"
                    >
                      {getTxTitle(transaction)}
                    </p>
                    <p className="subtitle">
                      {getTxTypeName(transaction.tx_type)}
                      <img
                        style={{ marginLeft: 10, width: 18 }}
                        alt="transaction"
                        src={Check}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="transactionContainer" className="transaction-container">
            <div className="recent-transactions">
              <div style={{ height: "auto" }} className="rt-table">
                <div className="table-header">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={Stacks}
                  />
                  <p>Overview</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Contract</p>
                  <p className="subtitle">
                    {(transaction as any).tx_type === "contract_call" &&
                      (transaction as any).contract_call.contract_id}
                  </p>
                </div>
                <div className="transaction-row">
                  <p className="title">Transaction ID</p>
                  <p className="subtitle">{transaction?.tx_id}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Called by</p>
                  <p className="subtitle">{transaction?.sender_address}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Fees</p>
                  <p className="subtitle">{transaction?.fee_rate}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Nonce</p>
                  <p className="subtitle">{transaction?.nonce}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Block Height</p>
                  <p className="subtitle">{transaction?.block_height}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Block hash</p>
                  <p className="subtitle">{transaction?.block_hash}</p>
                </div>
              </div>
              {transaction.events.length > 0 && (
                <div style={{ height: "auto" }} className="rt-table">
                  <div className="table-header">
                    <img
                      className="transaction-image"
                      alt="transaction"
                      src={Stacks}
                    />
                    <p>Events</p>
                  </div>
                  <Events events={transaction.events} />
                </div>
              )}
              <div style={{ height: "auto" }} className="rt-table">
                <div className="table-header">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={Stacks}
                  />
                  <p>Function Call</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Function Name</p>
                  <p className="subtitle">
                    {(transaction as any).contract_call.function_name}
                  </p>
                </div>
                {(transaction as any).contract_call &&
                  (transaction as any).contract_call.function_args &&
                  (transaction as any).contract_call.function_args.map(
                    (arg: any) => {
                      return (
                        <div className="function-call">
                          <div
                            style={{ borderTop: 0 }}
                            className="transaction-row"
                          >
                            <p className="title">Arguments</p>
                            <p className="subtitle color">{arg.name}</p>
                          </div>
                          <div
                            style={{ borderTop: 0 }}
                            className="transaction-row"
                          >
                            <p className="title">hashbytes</p>
                            <p className="subtitle">
                              {truncateMiddle(arg?.hex, 10)}
                            </p>
                          </div>
                          <div
                            style={{ borderTop: 0 }}
                            className="transaction-row"
                          >
                            <p className="title">version</p>
                            <p className="subtitle">{arg?.repr}</p>
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
              {transaction.post_conditions.length > 0 && (
                <div style={{ height: "auto" }} className="rt-table">
                  <div className="table-header">
                    <img
                      className="transaction-image"
                      alt="transaction"
                      src={Stacks}
                    />
                    <p>Post conditions</p>
                  </div>
                  {transaction.post_conditions.map((condition) => {
                    return (
                      <div>
                        <p className="subtitle">
                          {truncateMiddle(getAddressValue(condition), 8)}
                        </p>
                        <p className="title">
                          {capitalize(
                            getPrettyCode(condition.condition_code, true)
                          )}{" "}
                          {getAmount(condition)} {getConditionTicker(condition)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="anchor-block">
              <div style={{ height: "auto" }} className="ab-table">
                <div className="table-header">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={Stacks}
                  />
                  <p>Contract Detail</p>
                </div>
                <div style={{ borderTop: 0 }} className="transaction-row">
                  <p className="subtitle">
                    {
                      (transaction as any).contract_call.contract_id.split(
                        "."
                      )[1]
                    }
                  </p>
                  <p className="title">
                    {truncateMiddle(transaction.block_hash, 10)}
                  </p>
                </div>
                <div className="transaction-row">
                  <p className="title">Function</p>
                  <p className="subtitle">{0}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Variables</p>
                  <p className="subtitle">0</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Map</p>
                  <p className="subtitle">0</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Token</p>
                  <p className="subtitle">0</p>
                </div>
              </div>
              <div style={{ height: "auto" }} className="ab-table">
                <div className="table-header">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={Stacks}
                  />
                  <p className="title">Bitcoin anchor</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Bitcoin Block Height</p>
                  <p className="subtitle">
                    {
                      (transaction as any).block_anchor_info
                        .bitcoin_block_height
                    }
                  </p>
                </div>
                <div className="transaction-row">
                  <p className="title">Bitcoin Block Hash</p>
                  <p className="subtitle">
                    {truncateMiddle(
                      (transaction as any).block_anchor_info.bitcoin_block_hash,
                      10
                    )}
                  </p>
                </div>
                <div className="transaction-row">
                  <p className="title">Anchor transaction id</p>
                  <p className="subtitle">
                    {truncateMiddle(
                      (transaction as any).block_anchor_info.bitcoin_tx_hash,
                      10
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
