import React from "react";
import { useHistory } from "react-router-dom";
import Transaction from "../utils/explorer-types";
import { getTxTitle, getTxTypeName } from "../utils/utils";
import Arrow from "../assets/explorer/arrow.svg";
import Stacks from "../assets/side-menu/stacks.svg";
import Bottom from "../assets/explorer/Bottom.svg";
import Bitcoin from "../assets/side-menu/bitcoin.svg";
import Check from "../assets/explorer/check.png";
import BlockLight from "../assets/explorer/block-light.svg";
import BlockDark from "../assets/explorer/block-dark.svg";
import Pending from "../assets/explorer/pending.svg";
import Failed from "../assets/explorer/failed.svg";
import dayjs from "dayjs";

export const TransactionHeaderDetails: React.FC<{
  transaction: Transaction;
  theme: any;
  dims: any;
}> = ({ transaction, dims, theme }) => {
  const { push } = useHistory();
  const status = transaction.tx_status;
  const failed =
    status === "abort_by_response" || status === "abort_by_post_condition";
  const isPending = status === "pending";
  const failedMessage =
    status === "abort_by_response"
      ? "This transaction did not succeed because the transaction was aborted during its execution."
      : "This transaction would have succeeded, but was rolled back by a supplied post-condition.";
  const longPending =
    dayjs().diff(dayjs.unix((transaction as any).receipt_time), "h") > 24;

  const longPendingMessage =
    "Transactions that cannot be confirmed within 256 blocks are eventually canceled automatically.";

  return (
    <div id="main">
      {isPending ? (
        <div
          style={{
            padding: 10,
            height: 50,
            color: "#FFA043",
            fontWeight: 600,
            fontSize: 14,
            justifyContent: "flex-start",
          }}
          className={"transaction-card"}
        >
          {" "}
          <img
            className="transaction-image"
            alt="transaction"
            style={{ marginRight: 10 }}
            src={Pending}
          />
          Pending. Transation is currently pending confirmation
        </div>
      ) : (
        <>
          {!failed ? (
            <div style={{ padding: 24 }} className={"transaction-card"}>
              <div
                style={{ padding: 8, borderTop: 0 }}
                // onClick={() => push("/explorer/txId/" + transaction.tx_id)}
                className="table-item tr-card"
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
              <img
                style={{
                  width: dims.width > 700 ? 120 : 14,
                  marginLeft: dims.width > 700 ? 0 : 25,
                }}
                src={dims.width > 700 ? Arrow : Bottom}
                alt={"arrow"}
              />
              <div
                style={{ padding: 8, borderTop: 0 }}
                // onClick={() => push("/explorer/txId/" + transaction.tx_id)}
                className="table-item tr-card"
              >
                <div style={{ width: 258 }} className="left-content">
                  <img
                    className="transaction-image"
                    alt="transaction"
                    src={theme === "light" ? BlockLight : BlockDark}
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
                      {(transaction as any).block_anchor_info
                        ? (transaction as any).block_anchor_info
                            .bitcoin_block_height
                        : "Pending.."}
                    </p>
                  </div>
                </div>
              </div>
              <img
                style={{
                  width: dims.width > 700 ? 120 : 14,
                  marginLeft: dims.width > 700 ? 0 : 25,
                }}
                src={dims.width > 700 ? Arrow : Bottom}
                alt={"arrow"}
              />
              <div
                style={{ padding: 8, borderTop: 0 }}
                className="table-item tr-card"
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
          ) : (
            <div
              style={{
                padding: 10,
                height: 50,
                color: "#FF4242",
                fontWeight: 600,
                fontSize: 14,
                justifyContent: "flex-start",
              }}
              className={"transaction-card"}
            >
              {" "}
              <img
                className="transaction-image"
                alt="transaction"
                style={{ marginRight: 10 }}
                src={Failed}
              />
              {longPending ? longPendingMessage : failedMessage}
            </div>
          )}
        </>
      )}
    </div>
  );
};
