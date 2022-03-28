/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTransaction } from "../../hooks/useTransaction";
import { truncateMiddle } from "../../utils/utils";
import { LoadTransactions } from "../../components/LoadTransactions";
interface Props {
  theme: any;
  themeToggler: any;
  failure: boolean;
  logEvent: any;
}

export const Blockdetails: React.FC<Props> = ({
  theme,
  themeToggler,
  failure,
  logEvent,
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
    logEvent("Block Details");
  }, []);

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
            <div
              style={{ flex: 1, marginRight: 0 }}
              className="recent-transactions"
            >
              <div className="rt-table rtt-table">
                <div className="table-header">
                  <p>Transaction in block ({block.txs.length})</p>
                </div>
                <LoadTransactions
                  recentTransactions={blockTransaction}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
