import React, { useEffect, useState } from "react";
import { Blocks, OverviewProps, TokenPriceProps } from "../hooks/useOverview";
import { MiningDataHeader } from "../components/MiningDataHeader";
import { MiningDataOverview } from "../components/MiningDataOverview";
import { useMiningData } from "../hooks/useMiningData";
import { Miners } from "../components/Miners";

import { BubbleCharts } from "../components/charts/BubbleChart";
import { Tabs } from "../components/Tabs";
import { BlockInformation } from "../components/BlockInformation";
import right from "../assets/side-menu/right-arrow-active.svg";
import rightDisabled from "../assets/side-menu/right-arrow-disabled.svg";
import left from "../assets/side-menu/left-arrow-active.svg";
import leftDisabled from "../assets/side-menu/left-arrow-disabled.svg";
import { useParams } from "react-router-dom";
import { randomColorGenerator } from "../utils/helper";

interface Props {
  theme: any;
  overviewData: OverviewProps;
  themeToggler: any;
  tokens: TokenPriceProps;
  areaBlocks: string[];
  areaSeries: any;
  blocks: Blocks[];
}

export const MiningData: React.FC<Props> = ({
  theme,
  overviewData,
  tokens,
  areaBlocks,
  blocks,
  areaSeries,
  themeToggler,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const [tabIndex, setTabIndex] = useState(params?.index ? +params?.index : 0);
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [winnerAddress, setWinnerAddress] = useState("");
  const [winnerAddressIndex, setWinnerAddressColor] = useState(0);
  const colorPalette = randomColorGenerator();
  const {
    blocks: minersBlocks,
    getBlockByNumber,
    currentBlock,
    miningInfo,
  } = useMiningData();

  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);

  useEffect(() => {
    if (currentBlock?.block_info.winning_address) {
      setWinnerAddress(currentBlock?.block_info.winning_address);
    }
    const index: any = currentBlock?.miners_info.findIndex(
      (x) => x.miner_address === currentBlock.block_info.winning_address
    );
    if (index !== -1) {
      setWinnerAddressColor(index);
    }
  }, [currentBlock, winnerAddress]);

  useEffect(() => {
    if (blocks.length > 0 || params?.block) {
      getBlockByNumber(
        params?.block || blocks[0].block_number.toString().substr(1)
      );
    }
    if (params) {
      setTabIndex(params?.index ? +params?.index : 0);
      const index = blocks.findIndex((block) =>
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
      setCurrentBlockIndex(currentBlockIndex + 1);
    }
  };

  const prevBlock = () => {
    if (currentBlockIndex !== 0) {
      getBlockByNumber(
        blocks[currentBlockIndex - 1].block_number.toString().substr(1)
      );
      setCurrentBlockIndex(currentBlockIndex - 1);
    }
  };
  return (
    <div className="miningData">
      <div id="main">
        <MiningDataHeader tabIndex={tabIndex} overviewData={overviewData} />
        <Tabs setTabIndex={setTabIndex} tabIndex={tabIndex} />
      </div>
      {tabIndex === 0 && (
        <MiningDataOverview
          areaBlocks={areaBlocks}
          miningInfo={miningInfo}
          areaSeries={areaSeries}
          blocks={blocks}
          theme={theme}
        />
      )}
      {tabIndex === 1 && (
        <div id={"content1"}>
          <p className={"title-table"}>Recent active miners</p>
          {blocks.length > 0 && (
            <Miners initialPageSize={10} blocks={minersBlocks} />
          )}
        </div>
      )}
      {tabIndex === 2 && (
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
                  src={
                    blocks.length - 1 >= currentBlockIndex ? left : leftDisabled
                  }
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
                  <p className="sub-title" style={{ fontSize: 27 }}>
                    {currentBlock.miners_count} Miners
                  </p>
                  {winnerAddress && (
                    <div
                      style={{
                        background: colorPalette[winnerAddressIndex] + "10",
                        padding: 4,
                        marginLeft: 10,
                        borderRadius: 4,
                        color: colorPalette[winnerAddressIndex],
                        display: "flex",
                        alignItems: "center",
                      }}
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
          <BlockInformation
            currentBlock={currentBlock}
            overviewData={overviewData}
          />
        </>
      )}
    </div>
  );
};
