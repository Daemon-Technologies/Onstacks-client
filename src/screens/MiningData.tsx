import React, { useEffect, useState } from "react";
import { Blocks, OverviewProps, TokenPriceProps } from "../hooks/useOverview";
import { MiningDataHeader } from "../components/MiningDataHeader";
import { MiningDataOverview } from "../components/MiningDataOverview";
import { useMiningData } from "../hooks/useMiningData";
import { Miners } from "../components/Miners";
import { Tooltip } from "../components/Tooltip";
import Bitcoin from "../assets/side-menu/Bitcoin-Oval.svg";
import Stacks from "../assets/side-menu/Stacks-Oval.svg";

import { BubbleChart } from "../components/charts/BubbleChart";
import { getBlockHash } from "../utils/helper";

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
  const [toggle, setToggle] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [bubbles, setBubbles] = useState<any[]>([]);

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
    let arr: any = [["id", "index", "Propability", "Address", "Burn Fee"]];
    currentBlock?.miners_info.map((miner, index) => {
      arr.push([
        "",
        index + 1,
        +miner.win_probability,
        miner.miner_address,
        miner.burn_fee,
      ]);
    });
    setBubbles(arr);
  }, [currentBlock]);

  useEffect(() => {
    if (blocks.length > 0) {
      getBlockByNumber(blocks[0].block_number.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  return (
    <div className="miningData">
      <div id="main">
        <MiningDataHeader overviewData={overviewData} />
        <div className={"tabs"}>
          <div
            onClick={() => setTabIndex(0)}
            className={tabIndex === 0 ? "active" : ""}
          >
            Overview
          </div>
          <div
            onClick={() => setTabIndex(1)}
            className={tabIndex === 1 ? "active" : ""}
          >
            Miners
          </div>
          <div
            onClick={() => setTabIndex(2)}
            className={tabIndex === 2 ? "active" : ""}
          >
            Blocks
          </div>
        </div>
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
          <p>Recent blocks</p>
          {blocks.length > 0 && (
            <Miners initialPageSize={10} blocks={minersBlocks} />
          )}
        </div>
      )}
      {tabIndex === 2 && (
        <>
          <div id={"content1"}>
            <p>Block analyzer</p>
            {blocks.length > 0 && (
              <div className={"block-analyzer"}>
                {blocks.map((block) => {
                  return (
                    <Tooltip message={block.block_number} position={"top"}>
                      <div
                        onClick={() => {
                          getBlockByNumber(block.block_number.toString());
                        }}
                        data-tip={block.block_number}
                        className={"block"}
                      ></div>
                    </Tooltip>
                  );
                })}
              </div>
            )}
          </div>
          {currentBlock && (
            <div
              id={"content3"}
              className={"bubble-chart"}
              style={{ height: "auto" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p className="title">Total miners competed in block</p>
                <p className="sub-title">
                  {currentBlock.total_burn_fee
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  sats
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p className="sub-title">{currentBlock.miners_count} Miners</p>
                <p className="title">Total fees burn</p>
              </div>
              <BubbleChart bubbles={bubbles} theme={theme} />
            </div>
          )}
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
                <p
                  className={"a-tag"}
                >{`${currentBlock?.block_info.tx_id.substring(
                  0,
                  8
                )} ... ${currentBlock?.block_info.tx_id.substring(
                  currentBlock?.block_info.tx_id.length - 10,
                  currentBlock?.block_info.tx_id.length - 1
                )}`}</p>
              </div>
              <div className={"row-content"}>
                <p>Block height</p>
                <p className={"a-tag"}>
                  {currentBlock?.block_info.block_height}
                </p>
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
      )}
    </div>
  );
};
