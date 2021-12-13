import React from "react";
import { numberWithCommas, OverviewProps } from "../hooks/useOverview";
import BitcoinVerified from "../assets/side-menu/bitcoin-verified.svg";
import BitcoinPending from "../assets/side-menu/bitcoin-pending.svg";
import STXVerified from "../assets/side-menu/stx-verified.svg";
import STXPending from "../assets/side-menu/stx-pending.svg";
import Search from "../assets/side-menu/search.svg";
import Reward from "../assets/side-menu/reward-verified.svg";
import RewardPending from "../assets/side-menu/reward.svg";
import { getBlockHash } from "../utils/helper";
import { CurrentBlock } from "../hooks/useMiningData";
import { useHistory } from "react-router-dom";

interface Props {
  overviewData: OverviewProps;
  currentBlock: CurrentBlock | undefined;
  timeElapsed: string;
}

export const BlockInformation: React.FC<Props> = ({
  overviewData,
  timeElapsed,
  currentBlock,
}) => {
  const { push } = useHistory();

  return (
    <>
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
            onClick={() => push("/explorer/block/" + currentBlock?.blockNumber)}
          >
            <img src={Search} alt={"search"} />
            View on explorer
          </div>
        </div>
        <p className="sub-title" style={{ fontSize: 32 }}>
          {currentBlock?.blockNumber}
        </p>

        <div className={"lines"}>
          <div onClick={() => getBlockHash(overviewData.stx_block_height)}>
            <img
              src={
                currentBlock?.block_info.is_stx_pending
                  ? STXPending
                  : STXVerified
              }
              alt={"Stacks"}
            />
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
            <img
              src={
                currentBlock?.block_info.is_btc_pending
                  ? BitcoinPending
                  : BitcoinVerified
              }
              alt={"Bitcoin"}
            />
            <p>Bitcoin confirmation</p>
          </div>
          <div>
            <img
              src={
                !currentBlock?.block_info.is_reward_pending
                  ? RewardPending
                  : Reward
              }
              alt={"Stacks"}
            />
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
                push(
                  "/miner/address/" + currentBlock?.block_info.winning_address
                )
              }
            >{`${currentBlock?.block_info.winning_address.substring(
              0,
              8
            )} ... ${currentBlock?.block_info.winning_address.substring(
              currentBlock?.block_info.winning_address.length - 8,
              currentBlock?.block_info.winning_address.length
            )}`}</p>
          </div>
          <div className={"row-content"}>
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
          </div>
          <div className={"row-content"}>
            <p>BTC block height</p>
            <p
              onClick={() =>
                window.open(
                  `https://www.blockchain.com/btc/block/${currentBlock?.block_info.block_height}`,
                  "_blank"
                )
              }
              className={"a-tag"}
            >
              #{currentBlock?.block_info.block_height}
            </p>
          </div>
          <div className={"row-content"}>
            <p>STX Awarded</p>
            <p className={"black"}>
              {numberWithCommas(currentBlock?.block_info.stacks_awarded)} STX
            </p>
          </div>
          <div className={"row-content"}>
            <p>Sats Spent</p>
            <p className={"black"}>
              {numberWithCommas(
                currentBlock?.block_info.winning_miner_burn_fee
              )}{" "}
              Sats
            </p>
          </div>
          <div className={"row-content"}>
            <p>Time Elapsed</p>
            <p className={"black"}>{timeElapsed}</p>
          </div>
        </div>
      </div>
    </>
  );
};
