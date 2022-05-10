/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AddressDetailsHeader } from "../../components/AddressDetailsHeader";
import { AreaChart } from "./charts/AreaChart";
import { RecentBlocksAddress } from "../../components/RecentBlocksAddress";
import { Tooltip } from "../../components/Tooltip";
import { useAddressDetails } from "../../hooks/useAddressDetails";
import { numberWithCommas } from "../../hooks/useOverview";
import NoMiner from "../../assets/side-menu/No-miner.svg";
import Search from "../../assets/side-menu/search.svg";
import useWindowDimensions from "../../hooks/useWindowDimension";

interface Props {
  theme: any;
  themeToggler: any;
  failure: boolean;
  logEvent: any;
}

export const AddressDetails: React.FC<Props> = ({
  theme,
  themeToggler,
  failure,
  logEvent,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const [status, setBlockStatus] = useState(1);
  const [address, setAddresss] = useState("");
  const [concurrentBlock, setConcurrentBlock] = useState<any>();
  const {
    minerInfo,
    satsCommitted,
    blocks,
    currentBlocks,
    username,
    getAddressName,
    currentBlock,
    getBlockByNumber,
    setAddress,
  } = useAddressDetails();

  useEffect(() => {
    logEvent("Mining Address Details");
  }, []);

  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);
  const dims = useWindowDimensions();
  const { push } = useHistory();

  useEffect(() => {
    if (params?.address) {
      setAddresss(params.address);
    }
  }, [params]);

  useEffect(() => {
    if (address) {
      setAddress(address);
      // getMinerInfo(address);
      getAddressName(address);
    }
  }, [address]);

  useEffect(() => {
    if (currentBlock && currentBlock.block_status) {
      setBlockStatus(currentBlock.block_status);
      setConcurrentBlock(currentBlock);
    }
  }, [currentBlock]);

  useEffect(() => {
    if (blocks.length > 0) {
      getBlockByNumber(blocks[49].block_number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);

  return (
    <div className="addressDetails">
      <div className="header-wrapper"></div>
      <div id="main">
        <AddressDetailsHeader
          username={username}
          address={address}
          headerDetails={minerInfo}
        />
      </div>
      <div id="content1">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>Participation History (Last 50 Blocks)</p>
        </div>
        {currentBlocks.length > 0 && (
          <div className={"block-analyzer"}>
            {currentBlocks.map((block) => {
              return (
                <Tooltip message={`#${block.block_number}`} position={"top"}>
                  <div
                    onClick={() => {
                      getBlockByNumber(block.block_number);
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
        <hr style={{ marginTop: 16, marginBottom: 28 }} className="divider" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: 16 }} className="sub-title">
            Miner's block participation details
          </p>
          <div
            className="button-view"
            onClick={() =>
              push("/explorer/block/" + concurrentBlock?.blockNumber)
            }
          >
            <img src={Search} alt={"search"} />
            View on explorer
          </div>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", margin: "15px 0" }}
        >
          <p className="sub-title" style={{ fontSize: 32, marginBottom: 10 }}>
            #{concurrentBlock?.block_number}
          </p>
          <div
            style={{
              background:
                status === 1
                  ? "#FFA04310"
                  : status === 2
                  ? "#20C9AC" + 30
                  : "#EBEAED" + 90,
              padding: 4,
              marginLeft: 10,
              borderRadius: 4,
              color:
                status === 1 ? "#FFA043" : status === 2 ? "#20C9AC" : "#84818a",
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
                    ? "#FFA043"
                    : status === 2
                    ? "#20C9AC"
                    : "#84818a",
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
        <>
          {status === 0 ? (
            <div className="no-miner">
              <img src={NoMiner} alt={"No miner"} />
              <p>Miner is not active in this block.</p>
            </div>
          ) : (
            <>
              {/* {status === 2 && (
                <div className={"lines"}>
                  <div onClick={() => getBlockHash(concurrentBlock?.blockNumber)}>
                    <img
                      src={
                        concurrentBlock?.block_info.is_stx_pending
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
                        `https://www.blockchain.com/btc/tx/${concurrentBlock?.block_info.tx_id}`,
                        "_blank"
                      )
                    }
                  >
                    <img
                      src={
                        concurrentBlock?.block_info.is_btc_pending
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
                        !concurrentBlock?.block_info.is_reward_pending
                          ? RewardPending
                          : Reward
                      }
                      alt={"Stacks"}
                    />
                    <p>Reward Confirmation</p>
                  </div>
                  <hr className={"hr"} />
                </div>
              )} */}
              <hr className="divider" />
              <div>
                {status === 2 && (
                  <div className={"row-content"}>
                    <p>Winner Address</p>
                    <p
                      className={"a-tag"}
                      onClick={() =>
                        window.open(
                          `https://explorer.stacks.co/address/${address}`,
                          "_blank"
                        )
                      }
                    >{`${address.substring(0, 8)} ... ${address.substring(
                      address.length - 9,
                      address.length - 1
                    )}`}</p>
                  </div>
                )}
                <div className={"row-content"}>
                  <p>BTC Tx ID</p>
                  <p
                    onClick={() =>
                      window.open(
                        `https://www.blockchain.com/btc/tx/${concurrentBlock?.tx_id}`,
                        "_blank"
                      )
                    }
                    className={"a-tag"}
                  >{`${concurrentBlock?.tx_id.substring(
                    0,
                    8
                  )} ... ${concurrentBlock?.tx_id.substring(
                    concurrentBlock?.tx_id.length - 9,
                    concurrentBlock?.tx_id.length - 1
                  )}`}</p>
                </div>
                <div className={"row-content"}>
                  <p>BTC Block height</p>
                  <p
                    onClick={() =>
                      window.open(
                        `https://www.blockchain.com/btc/block/${concurrentBlock?.btc_height}`,
                        "_blank"
                      )
                    }
                    className={"a-tag"}
                  >
                    #{concurrentBlock?.btc_height}
                  </p>
                </div>
                <div className={"row-content"}>
                  <p>STX awarded</p>
                  <p className={"black"}>
                    {status === 2
                      ? numberWithCommas(concurrentBlock?.stacks_reward)
                      : 0}{" "}
                    STX
                  </p>
                </div>
                <div className={"row-content"}>
                  <p>Burn fees</p>
                  <p className={"black"}>
                    {numberWithCommas(concurrentBlock?.burn_fee)} Sats
                  </p>
                </div>
                <div className={"row-content"}>
                  <p>Time Elapsed</p>
                  <p className={"black"}>{concurrentBlock?.timeElapsed}</p>
                </div>
              </div>
            </>
          )}
        </>
      </div>
      <div id="content2" style={{ height: 300 }}>
        <p className="title">Total sats committed per block</p>
        <div className="seprator">
          {satsCommitted.block_number.length > 0 && <AreaChart theme={theme} />}
        </div>
      </div>
      <div
        id={"content4"}
        style={{ padding: 0 }}
        className={dims.width < 700 ? "mobile-table" : "s"}
      >
        {dims.width < 700 ? (
          blocks.map((block) => {
            return (
              <div className="table-card-container">
                <div className="table-card">
                  <p className="table-title">Block No.</p>
                  <p className="table-subtitle" style={{ color: "#FFA043" }}>
                    {block.block_number}
                  </p>
                </div>
                <div className="table-card">
                  <p className="table-title">Time Elapsed</p>
                  <p className="table-subtitle">{block.mined_at}</p>
                </div>
                <div className="table-card">
                  <p className="table-title">Total Sats spent</p>
                  <p className="table-subtitle">{block.sats_spent}</p>
                </div>
                <div className="table-card">
                  <p className="table-title"> Block Status</p>
                  <p className="table-subtitle">{block.block_status}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            {blocks.length > 0 && <RecentBlocksAddress blocks={blocks} />}
          </div>
        )}
      </div>
    </div>
  );
};
