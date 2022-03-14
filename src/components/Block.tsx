// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { randomColorGenerator } from "../utils/helper";
import { BlockInformation } from "./BlockInformation";
import { BubbleCharts } from "./charts/BubbleChart";
import right from "../assets/side-menu/right-arrow-active.svg";
import rightDisabled from "../assets/side-menu/right-arrow-disabled.svg";
import left from "../assets/side-menu/left-arrow-active.svg";
import leftDisabled from "../assets/side-menu/left-arrow-disabled.svg";

export const Block: React.FC<any> = ({
  currentBlock,
  getBlockByNumber,
  blocks,
  params,
  setTabIndex,
  blockHeights,
  theme,
}) => {
  const { push } = useHistory();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(1);
  const [winnerAddressIndex, setWinnerAddressColor] = useState(0);
  const [winnerAddress, setWinnerAddress] = useState("");
  const colorPalette = randomColorGenerator();
  const [timeElapsed, setTimeElapsed] = useState("0");
  const [currentBlockNumber, setCurrentBlockNumber] = useState(0);

  useEffect(() => {
    if (currentBlock) {
      const block = blocks.find(
        (block: any) =>
          block.block_number
            .toString()
            .substr(1, block.block_number.toString().length) ===
          currentBlock.blockNumber
      );
      setTimeElapsed(block?.mined_at + " ");
    }
  }, [currentBlock, blocks]);

  useEffect(() => {
    if (currentBlock?.block_info.winning_address) {
      setWinnerAddress(currentBlock?.block_info.winning_address);
    }
    const index: any = currentBlock?.miners_info.findIndex(
      (x: any) => x.miner_address === currentBlock.block_info.winning_address
    );
    if (index !== -1) {
      setWinnerAddressColor(index);
    }
  }, [currentBlock, winnerAddress]);

  useEffect(() => {
    if (blocks.length > 0 || params?.block) {
      setCurrentBlockNumber(blocks[1].block_number.toString().substr(1));
      getBlockByNumber(
        params?.block || blocks[1].block_number.toString().substr(1)
      );
    }
    if (params?.index || params?.block) {
      setTabIndex(params?.index ? +params?.index : 0);
      const index = blocks.findIndex((block: any) =>
        block.block_number.toString().includes(params.block)
      );
      setCurrentBlockIndex(index !== -1 ? index : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks, params]);

  const nextBlock = () => {
    if (blocks.length - 1 > currentBlockIndex) {
      getBlockByNumber(
        blocks[currentBlockIndex + 1].block_number.toString().substr(1)
      );
      setCurrentBlockNumber(
        blocks[currentBlockIndex + 1].block_number.toString().substr(1)
      );
      setCurrentBlockIndex(currentBlockIndex + 1);
    }
  };

  const prevBlock = () => {
    if (currentBlockIndex !== 0) {
      getBlockByNumber(
        blocks[currentBlockIndex - 1].block_number.toString().substr(1)
      );
      setCurrentBlockNumber(
        blocks[currentBlockIndex - 1].block_number.toString().substr(1)
      );
      setCurrentBlockIndex(currentBlockIndex - 1);
    }
  };

  return (
    <>
      {blocks.length > 0 && (
        <div className={"block-content"}>
          <p className={"block-number"}>
            Block <span>{blocks[currentBlockIndex].block_number}</span>
          </p>
          <div
            style={{
              background:
                blocks.length - 1 > currentBlockIndex
                  ? "rgba(255, 160, 67, 0.25)"
                  : "#EBEAED",
            }}
            onClick={nextBlock}
          >
            <img
              alt={"left"}
              src={blocks.length - 1 >= currentBlockIndex ? left : leftDisabled}
            />
          </div>
          <div
            style={{
              background:
                currentBlockIndex !== 0
                  ? "rgba(255, 160, 67, 0.25)"
                  : "#EBEAED",
            }}
            onClick={prevBlock}
          >
            <img
              alt={"right"}
              src={currentBlockIndex === 0 ? rightDisabled : right}
            />
          </div>
        </div>
      )}
      {currentBlock && (
        <div
          id={"content3"}
          className={"bubble-chart"}
          style={{ minHeight: "450px", maxHeight: "550px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="title">Total miners competed in block</p>
            <p className="title burn-address">Total fees burn</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <p
                className="sub-title"
                style={{ fontSize: 27, marginRight: 10 }}
              >
                {currentBlock.miners_count} Miners
              </p>
              {winnerAddress && (
                <div
                  style={{
                    background: colorPalette[winnerAddressIndex] + "10",
                    padding: 4,
                    borderRadius: 4,
                    color: colorPalette[winnerAddressIndex],
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => push("/miner/address/" + winnerAddress)}
                >
                  <div
                    className="circle-data"
                    style={{ background: colorPalette[winnerAddressIndex] }}
                  ></div>
                  <p
                    style={{ fontSize: 11, fontWeight: 600 }}
                  >{`${winnerAddress}`}</p>
                </div>
              )}
            </div>
            <p className="sub-title burn-address" style={{ fontSize: 16 }}>
              {currentBlock.total_burn_fee
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              sats
            </p>
          </div>
          <div className={"bubble-chart-container"}>
            <BubbleCharts
              winnerAddress={winnerAddress}
              currentBlock={currentBlock}
              theme={theme}
            />
          </div>
          <div className={"mob-address"}>
            <p className="title">Total fees burn</p>
            <p className="sub-title" style={{ fontSize: 16 }}>
              {currentBlock.total_burn_fee
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              sats
            </p>
          </div>
        </div>
      )}
      {blockHeights.STX_HEIGHT !== "" && (
        <BlockInformation
          timeElapsed={timeElapsed}
          blockHeights={blockHeights}
          blockNumber={currentBlockNumber}
        />
      )}
    </>
  );
};
