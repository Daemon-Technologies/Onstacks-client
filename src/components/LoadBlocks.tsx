/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useCallback } from "react";
import { getRelativeTimestamp, truncateMiddle } from "../utils/utils";
import { useHistory } from "react-router-dom";
import { Microblock } from "./Microblock";
import Stacks from "../assets/side-menu/stacks.svg";
import BlockLight from "../assets/explorer/block-light.svg";
import BlockDark from "../assets/explorer/block-dark.svg";
import Bitcoin from "../assets/side-menu/bitcoin.svg";

export const LoadBlocks: React.FC<{
  recentBlocks: any[];
  theme: any;
  getMicroBlock: any;
  isMicroblocks: boolean;
}> = ({ theme, recentBlocks, getMicroBlock, isMicroblocks }) => {
  const { push } = useHistory();

  const LoadRecentBlocks = useCallback(
    (isMicroblocks?: boolean) => {
      const transactions = recentBlocks.map((transaction, index) => {
        const STXBlock = transaction.height;
        const BTCBlock = transaction.burn_block_height;
        const BlockHash = transaction.hash;
        const txs = transaction.txs.length;
        return (
          <>
            <div
              onClick={() => push("/explorer/block/" + STXBlock)}
              className="table-item"
            >
              <div className="left-content">
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
                    />{" "}
                    #{STXBlock} →
                    <img
                      className="transaction-image"
                      alt="transaction"
                      src={Bitcoin}
                    />
                    #{BTCBlock}
                  </p>
                  <p className="subtitle">{txs} Transactions</p>
                </div>
              </div>
              <div className="right-content">
                <p className="title">{getRelativeTimestamp(transaction)}</p>
                <p className="subtitle">{truncateMiddle(BlockHash, 6)}</p>
              </div>
            </div>
            {isMicroblocks &&
              transaction.microblocks_accepted.map((block: any) => {
                return (
                  <Microblock
                    theme={theme}
                    parent_burn_block_time={transaction.burn_block_time}
                    getMicroBlock={getMicroBlock}
                    block={block}
                  />
                );
              })}
          </>
        );
      });
      return transactions;
    },
    [recentBlocks.length, theme]
  );

  return <>{recentBlocks.length > 0 && LoadRecentBlocks(isMicroblocks)}</>;
};
