import React from "react";
import { OverviewProps } from "../hooks/useOverview";
import Bitcoin from "../assets/side-menu/Bitcoin-Oval.svg";
import Stacks from "../assets/side-menu/Stacks-Oval.svg";
import { getBlockHash } from "../utils/helper";
import { CurrentBlock } from "../hooks/useMiningData";

interface Props {
  overviewData: OverviewProps;
  currentBlock: CurrentBlock | undefined;
}

export const BlockInformation: React.FC<Props> = ({
  overviewData,
  currentBlock,
}) => {
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
          <p
            className="button-view"
            onClick={() => getBlockHash(overviewData.stx_block_height)}
          >
            View on explorer
          </p>
        </div>
        <p className="sub-title">{currentBlock?.blockNumber}</p>

        <div className={"lines"}>
          <div>
            <img src={Stacks} alt={"Stacks"} />
            <p>STX Confirmation</p>
          </div>
          <div>
            <img src={Bitcoin} alt={"Bitcoin"} />
            <p>Bitcoin Confirmation</p>
          </div>
          <div>
            <img src={Stacks} alt={"Stacks"} />
            <p>STX Confirmation</p>
          </div>
          <hr className={"hr"} />
        </div>
        <hr />
        <div>
          <div className={"row-content"}>
            <p>Winner Address</p>
            <p
              className={"a-tag"}
            >{`${currentBlock?.block_info.winning_address.substring(
              0,
              8
            )} ... ${currentBlock?.block_info.winning_address.substring(
              currentBlock?.block_info.winning_address.length - 10,
              currentBlock?.block_info.winning_address.length - 1
            )}`}</p>
          </div>
          <div className={"row-content"}>
            <p>Tx ID</p>
            <p className={"a-tag"}>{`${currentBlock?.block_info.tx_id.substring(
              0,
              8
            )} ... ${currentBlock?.block_info.tx_id.substring(
              currentBlock?.block_info.tx_id.length - 10,
              currentBlock?.block_info.tx_id.length - 1
            )}`}</p>
          </div>
          <div className={"row-content"}>
            <p>Block height</p>
            <p className={"a-tag"}>{currentBlock?.block_info.block_height}</p>
          </div>
          <div className={"row-content"}>
            <p>Stacks Awarded</p>
            <p>{currentBlock?.block_info.stacks_awarded}</p>
          </div>
          <div className={"row-content"}>
            <p>Winner Miner Burned Fees</p>
            <p>{currentBlock?.block_info.winning_miner_burn_fee}</p>
          </div>
          <div className={"row-content"}>
            <p>Rate of Return</p>
            <p>{currentBlock?.block_info.return_rate}</p>
          </div>
        </div>
      </div>
    </>
  );
};
