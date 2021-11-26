/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTransaction } from "../hooks/useTransaction";
import { toRelativeTime, truncateMiddle } from "../utils/utils";
import BlockLight from "../assets/explorer/microblock-light.svg";
import BlockDark from "../assets/explorer/microblock-dark.svg";

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
  const { block, getBlock } = useTransaction();

  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);
  const { push } = useHistory();

  useEffect(() => {
    if (params?.block) {
      console.log(params);
      getBlock(params?.block);
    }
  }, [params]);
  console.log(block);
  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);

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
                {block.txs.map((tx: any) => (
                  <div className="table-item">
                    <div className="left-content">
                      <img
                        className="transaction-image"
                        alt="transaction"
                        src={theme === "light" ? BlockLight : BlockDark}
                      />
                      <div>
                        <p className="title">{truncateMiddle(tx, 10)}</p>
                      </div>
                    </div>
                    <div className="right-content">
                      <p className="title">
                        {toRelativeTime(block.burn_block_time * 1000)}
                      </p>
                      {/* <p className="subtitle">{truncateMiddle(block, 6)}</p> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
