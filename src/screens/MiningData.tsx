import React, { useEffect, useState } from "react";
import { Blocks, OverviewProps, TokenPriceProps } from "../hooks/useOverview";
import { MiningDataHeader } from "../components/MiningDataHeader";
import { MiningDataOverview } from "../components/MiningDataOverview";
import { useMiningData } from "../hooks/useMiningData";
import { Miners } from "../components/Miners";

import { BubbleChart } from "../components/charts/BubbleChart";
import { Tabs } from "../components/Tabs";
import { BlockAnalyzer } from "../components/BlockAnalyzer";
import { BlockInformation } from "../components/BlockInformation";

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
          <div id={"content1"}>
            <p>Block analyzer</p>
            <BlockAnalyzer
              blocks={blocks}
              getBlockByNumber={getBlockByNumber}
            />
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
                <p className="sub-title" style={{ fontSize: 16 }}>
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
                <p className="sub-title" style={{ fontSize: 32 }}>
                  {currentBlock.miners_count} Miners
                </p>
                <p className="title">Total fees burn</p>
              </div>
              <BubbleChart bubbles={bubbles} theme={theme} />
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
