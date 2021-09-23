/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddressDetailsHeader } from "../components/AddressDetailsHeader";
import { AreaChart } from "../components/charts/AreaChart";
import { RecentBlocksAddress } from "../components/RecentBlocksAddress";
import { Tooltip } from "../components/Tooltip";
import { useAddressDetails } from "../hooks/useAddressDetails";
import { numberWithCommas } from "../hooks/useOverview";
import BitcoinVerified from "../assets/side-menu/bitcoin-verified.svg";
import BitcoinPending from "../assets/side-menu/bitcoin-pending.svg";
import STXVerified from "../assets/side-menu/stx-verified.svg";
import STXPending from "../assets/side-menu/stx-pending.svg";
import Search from "../assets/side-menu/search.svg";
import Reward from "../assets/side-menu/reward-verified.svg";
import RewardPending from "../assets/side-menu/reward.svg";
import { getBlockHash } from "../utils/helper";
import { CurrentBlock } from "../hooks/useMiningData";

interface Props {
  theme: any;
  themeToggler: any;
  getBlockByNumber: (block: string) => void;
  currentBlock: CurrentBlock | undefined;
}

export const AddressDetails: React.FC<Props> = ({
  theme,
  themeToggler,
  currentBlock,
  getBlockByNumber,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const [status, setBlockStatus] = useState(1);
  const [address, setAddress] = useState("");
  const {
    getMinerInfo,
    minerInfo,
    getAddressSatsCommitted,
    satsCommitted,
    blocks,
    getBlocksMiner,
    getBlocksForAddress,
    currentBlocks,
  } = useAddressDetails();

  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);

  useEffect(() => {
    if (params?.address) {
      setAddress(params.address);
    }
  }, [params]);

  useEffect(() => {
    console.log(address);
    if (address) {
      getMinerInfo(address);
      getAddressSatsCommitted(address);
      getBlocksMiner(address);
      getBlocksForAddress(address);
    }
  }, [address]);

  useEffect(() => {
    if (blocks.length > 0) {
      getBlockByNumber(blocks[0].block_number.toString().substr(1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  return (
    <div className="addressDetails">
      <div id="main">
        <AddressDetailsHeader address={address} headerDetails={minerInfo} />
      </div>
      <div id="content1">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>Participation History</p>
          <div className="blocks-legend">
            <div>
              <div className={"block"}></div> <p>Block Won</p>
            </div>
            <div>
              <div style={{ background: "#FFDFC0" }} className={"block"}></div>
              <p>Block Lost</p>
            </div>
            <div>
              <div style={{ background: "#EBEAED" }} className={"block"}></div>
              <p>Inactive</p>
            </div>
          </div>
        </div>
        {currentBlocks.length > 0 && (
          <div className={"block-analyzer"}>
            {currentBlocks.map((block) => {
              return (
                <Tooltip message={`#${block.block_number}`} position={"top"}>
                  <div
                    onClick={() => {
                      getBlockByNumber(block.block_number.toString());
                      setBlockStatus(block.block_status);
                    }}
                    data-tip={block.block_number}
                    className={"block"}
                    style={{
                      background:
                        block.block_status === 1
                          ? "#FFDFC0"
                          : block.block_status === 2
                          ? "#20C9AC"
                          : "#EBEAED",
                    }}
                  ></div>
                </Tooltip>
              );
            })}
          </div>
        )}
        <hr style={{ marginTop: 16, marginBottom: 28 }} className="divider" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 16 }} className="sub-title">
            Block information
          </p>
          <div
            className="button-view"
            onClick={() => getBlockHash(currentBlock?.blockNumber)}
          >
            <img src={Search} alt={"search"} />
            View on explorer
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="sub-title" style={{ fontSize: 32 }}>
            #{currentBlock?.blockNumber}
          </p>
          <div
            style={{
              background:
                status === 1
                  ? "#FFDFC0" + "60"
                  : status === 2
                  ? "#20C9AC" + 30
                  : "#EBEAED" + 90,
              padding: 4,
              marginLeft: 10,
              borderRadius: 4,
              color:
                status === 1 ? "#FFDFC0" : status === 2 ? "#20C9AC" : "black",
              width: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 30,
            }}
          >
            <div
              className="circle-data"
              style={{
                background:
                  status === 1
                    ? "#FFDFC0"
                    : status === 2
                    ? "#20C9AC"
                    : "#EBEAED",
              }}
            ></div>
            <p style={{ fontSize: 12, fontWeight: 600 }}>{`${
              status === 1
                ? "Block Lost"
                : status === 2
                ? "Block Won"
                : "Inactive"
            }`}</p>
          </div>
        </div>
        <div className={"lines"}>
          <div onClick={() => getBlockHash(currentBlock?.blockNumber)}>
            <img
              src={
                currentBlock?.block_info.is_stx_pending
                  ? STXPending
                  : STXVerified
              }
              alt={"Stacks"}
            />
            <p>STX Confirmation</p>
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
            <p>Bitcoin Confirmation</p>
          </div>
          <div>
            <img
              src={
                currentBlock?.block_info.is_reward_pending
                  ? RewardPending
                  : Reward
              }
              alt={"Stacks"}
            />
            <p>Reward Confirmation</p>
          </div>
          <hr className={"hr"} />
        </div>
        <hr className="divider" />
        <div>
          <div className={"row-content"}>
            <p>Winner Address</p>
            <p
              className={"a-tag"}
              onClick={() =>
                window.open(
                  `https://explorer.stacks.co/address/${currentBlock?.block_info.winning_address}`,
                  "_blank"
                )
              }
            >{`${currentBlock?.block_info.winning_address.substring(
              0,
              8
            )} ... ${currentBlock?.block_info.winning_address.substring(
              currentBlock?.block_info.winning_address.length - 9,
              currentBlock?.block_info.winning_address.length - 1
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
              currentBlock?.block_info.tx_id.length - 9,
              currentBlock?.block_info.tx_id.length - 1
            )}`}</p>
          </div>
          <div className={"row-content"}>
            <p>BTC Block height</p>
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
            <p>Stacks Awarded</p>
            <p className={"black"}>
              {numberWithCommas(currentBlock?.block_info.stacks_awarded)}
            </p>
          </div>
          <div className={"row-content"}>
            <p>Winning Mining Spend</p>
            <p className={"black"}>
              {numberWithCommas(
                currentBlock?.block_info.winning_miner_burn_fee
              )}
            </p>
          </div>
          <div className={"row-content"}>
            <p>Rate of Return</p>
            <p className={"black"}>{currentBlock?.block_info.return_rate}</p>
          </div>
        </div>
      </div>
      <div id="content2">
        <p className="title">Total sats committed per block</p>
        <div className="seprator">
          {satsCommitted.block_number.length > 0 && (
            <AreaChart satsCommitted={satsCommitted} theme={theme} />
          )}
        </div>
      </div>
      <div id="content4">
        <p className="title-table">Recent blocks</p>
        {blocks.length > 0 && <RecentBlocksAddress blocks={blocks} />}
      </div>
    </div>
  );
};
