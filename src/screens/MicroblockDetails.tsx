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

export const MicroblockDetails: React.FC<Props> = ({
  theme,
  themeToggler,
  failure,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const { microBlock, getMicroblocks } = useTransaction();

  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);
  const { push } = useHistory();

  useEffect(() => {
    if (params?.microblock) {
      getMicroblocks(params?.microblock);
    }
  }, [params]);

  // useEffect(() => {
  //   if (block) {
  //     getBlockTransactions(block.hash)
  //   }
  // }, [block]);

  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);
  console.log(microBlock);

  return (
    <div className="block-details">
      {microBlock && (
        <>
          <h3>Microblock #{truncateMiddle(microBlock.microblock_hash, 10)}</h3>
          <div className="transaction-container">
            <div
              style={{ flex: 1, marginBottom: 16 }}
              className="recent-transactions"
            >
              <div className="rt-table rtt-table">
                <div className="table-header">
                  <p>Summary</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Hash</p>
                  <p className="subtitle">
                    {truncateMiddle(microBlock.microblock_hash, 10)}
                  </p>
                </div>
                <div className="transaction-row">
                  <p className="title">Height</p>
                  <p className="subtitle">{microBlock?.block_height}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Block hash</p>
                  <p className="subtitle">
                    {truncateMiddle(microBlock?.block_hash, 10)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="transaction-container">
            <div style={{ flex: 1 }} className="recent-transactions">
              <div className="rt-table rtt-table">
                <div className="table-header">
                  <p>Transaction in block ({microBlock.txs.length})</p>
                </div>
                {microBlock.txs.map((tx: any) => (
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
                        {toRelativeTime(
                          microBlock.parent_burn_block_time * 1000
                        )}
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
