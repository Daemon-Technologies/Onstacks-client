/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TransactionImage from "../assets/explorer/micro-block.svg";
import { toRelativeTime } from "../utils/utils";

export const Microblock: React.FC<{
  getMicroBlock: any;
  block: any;
  parent_burn_block_time: number;
}> = ({ getMicroBlock, block, parent_burn_block_time }) => {
  const [currentBlock, setCurrentBlock] = useState<any>();
  useEffect(() => {
    getItem();
  }, []);
  const getItem = async () => {
    const x = await getMicroBlock(block);
    setCurrentBlock(x);
  };
  return (
    <>
      {currentBlock && (
        <div className="table-item" key={currentBlock.block_hash}>
          <div className="left-content">
            <img
              className="transaction-image"
              alt="transaction"
              src={TransactionImage}
            />
            <div>
              <p className="title">{currentBlock.microblock_hash}</p>
              <p className="subtitle">{currentBlock.txs.length} Transactions</p>
            </div>
          </div>
          <div className="right-content">
            <p className="title">
              {toRelativeTime(parent_burn_block_time * 1000)}
            </p>
            {/* <p className="subtitle">{truncateMiddle(block, 6)}</p> */}
          </div>
        </div>
      )}
    </>
  );
};
