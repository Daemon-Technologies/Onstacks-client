// eslint-disable-next-line
import React, { useEffect } from "react";
import { numberWithCommas } from "../hooks/useOverview";
import BitcoinVerified from "../assets/side-menu/bitcoin-verified.svg";
import STXVerified from "../assets/side-menu/stx-verified.svg";
import Search from "../assets/side-menu/search.svg";
import Reward from "../assets/side-menu/reward-verified.svg";
import { getBlockHash } from "../utils/helper";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { BlockInfo } from "../graphql/query/block";
import { useState } from "react";

interface Props {
  blockNumber: number;
  timeElapsed: string;
  blockHeights: any;
}

export const BlockInformation: React.FC<Props> = ({
  timeElapsed,
  blockNumber,
  blockHeights,
}) => {
  const { push } = useHistory();
  const { data: blockInfo } = useQuery(BlockInfo, {
    variables: {
      stacks_block_height: blockNumber,
    },
  });
  const [currentBlock, setCurrentBlock] = useState<any>();

  useEffect(() => {
    if (blockInfo && blockInfo.block_info.length > 0) {
      setCurrentBlock(blockInfo.block_info[0]);
    }
  }, [blockInfo]);

  return (
    <>
      {currentBlock && currentBlock.winner_stx_address && (
        <div id={"content4"}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="title">Block information</p>
            <div
              className="button-view"
              onClick={() => push("/explorer/block/" + blockNumber)}
            >
              <img src={Search} alt={"search"} />
              View on explorer
            </div>
          </div>
          <p className="sub-title" style={{ fontSize: 32 }}>
            #{blockNumber}
          </p>

          <div className={"lines"}>
            <div onClick={() => getBlockHash(blockHeights.stx_block_height)}>
              <img src={STXVerified} alt={"Stacks"} />
              <p>STX confirmation</p>
            </div>
            <div
              onClick={() =>
                window.open(
                  `https://www.blockchain.com/btc/tx/${currentBlock?.block_info.tx_id}`,
                  "_blank"
                )
              }
            >
              <img src={BitcoinVerified} alt={"Bitcoin"} />
              <p>Bitcoin confirmation</p>
            </div>
            <div>
              <img src={Reward} alt={"Stacks"} />
              <p>Reward confirmation</p>
            </div>
            <hr className={"hr"} />
          </div>
          <hr className="divider" />
          <div>
            <div className={"row-content"}>
              <p>Winner address</p>
              <p
                className={"a-tag"}
                onClick={() =>
                  push("/miner/address/" + currentBlock?.winner_stx_address)
                }
              >{`${currentBlock?.winner_stx_address.substring(
                0,
                8
              )} ... ${currentBlock?.winner_stx_address.substring(
                currentBlock?.winner_stx_address.length - 8,
                currentBlock?.winner_stx_address.length
              )}`}</p>
            </div>
            {/* <div className={"row-content"}>
            <p>BTC Tx ID</p>
            <p
              onClick={() =>
                window.open(
                  `https://www.blockchain.com/btc/tx/${currentBlock?.block_info.tx_id}`,
                  "_blank"
                )
              }
              className={"a-tag"}
            >{`${currentBlock?.block_info.tx_id.substring(
              0,
              8
            )} ... ${currentBlock?.block_info.tx_id.substring(
              currentBlock?.block_info.tx_id.length - 8,
              currentBlock?.block_info.tx_id.length
            )}`}</p>
          </div> */}
            <div className={"row-content"}>
              <p>BTC block height</p>
              <p
                onClick={() =>
                  window.open(
                    `https://www.blockchain.com/btc/block/${currentBlock?.btc_block_height}`,
                    "_blank"
                  )
                }
                className={"a-tag"}
              >
                #{currentBlock?.btc_block_height}
              </p>
            </div>
            <div className={"row-content"}>
              <p>STX Awarded</p>
              <p className={"black"}>
                {numberWithCommas(currentBlock?.block_reward)} STX
              </p>
            </div>
            <div className={"row-content"}>
              <p>Sats Spent</p>
              <p className={"black"}>
                {numberWithCommas(currentBlock?.commit_value)} Sats
              </p>
            </div>
            <div className={"row-content"}>
              <p>Time Elapsed</p>
              <p className={"black"}>{timeElapsed}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
