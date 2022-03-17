/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Blocks, OverviewProps } from "../hooks/useOverview";
import { MiningDataHeader } from "../components/MiningDataHeader";
import { MiningDataOverview } from "../components/MiningDataOverview";
import { useMiningData } from "../hooks/useMiningData";
import { Miners } from "../components/Miners";

import { Tabs } from "../components/Tabs";

import { useHistory, useParams } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimension";
import { Overview } from "./Overview";
import { useQuery } from "@apollo/client";
import { getHeights } from "../graphql/query/miningMonitorConfig";
import { Block } from "../components/Block";

interface Props {
  theme: any;
  overviewData: OverviewProps;
  themeToggler: any;

  blocks: Blocks[];
  winnerAddresses: string[];
  totalWinners: number[];
  failure: boolean;
  logEvent: any;
}

export const MiningData: React.FC<Props> = ({
  theme,
  overviewData,
  failure,
  blocks,
  totalWinners,
  winnerAddresses,
  themeToggler,
  logEvent,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const [tabIndex, setTabIndex] = useState(params?.index ? +params?.index : 0);
  const { push } = useHistory();
  const [blockHeights, setBlockHeights] = useState({
    STX_HEIGHT: "",
    BTC_HEIGHT: "",
  });
  const {
    blocks: minersBlocks,
    getBlockByNumber,
    currentBlock,
    miningInfo,
  } = useMiningData(blockHeights);

  const dims = useWindowDimensions();

  const { data } = useQuery(getHeights);

  useEffect(() => {
    if (data && data.block_info) {
      setBlockHeights({
        BTC_HEIGHT: data.block_info[0].btc_block_height,
        STX_HEIGHT: data.block_info[0].stacks_block_height,
      });
    }
  }, [data]);

  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);

  useEffect(() => {
    logEvent("Mining Data");
  }, []);

  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);

  return (
    <div className="miningData">
      <div id="main">
        {blockHeights.STX_HEIGHT !== "" && (
          <MiningDataHeader
            blockHeights={blockHeights}
            tabIndex={tabIndex}
            overviewData={overviewData}
          />
        )}
        <Tabs
          logEvent={logEvent}
          setTabIndex={setTabIndex}
          tabIndex={tabIndex}
        />
      </div>

      {tabIndex === 0 && (
        <Overview
          logEvent={logEvent}
          failure={failure}
          themeToggler={themeToggler}
          totalWinners={totalWinners}
          winnerAddresses={winnerAddresses}
          blocks={blocks}
          theme={theme}
        />
      )}
      {tabIndex === 1 && (
        <MiningDataOverview
          miningInfo={miningInfo}
          blocks={blocks}
          theme={theme}
        />
      )}
      {tabIndex === 2 && (
        <div
          id={"content1"}
          className={dims.width < 700 ? "mobile-table" : "s"}
        >
          <p className={"title-table"}>
            Recent active miners ({minersBlocks.length})
          </p>
          {dims.width < 700 ? (
            minersBlocks.map((block) => {
              return (
                <div className="table-card-container">
                  <div
                    className="table-card"
                    onClick={() => push("/miner/address/" + block.address)}
                  >
                    <p className="table-title">Address</p>
                    <p className="table-subtitle" style={{ color: "#FFA043" }}>
                      {block.stx_address}
                    </p>
                  </div>
                  <div className="table-card">
                    <p className="table-title">Total fees burned</p>
                    <p className="table-subtitle">{block.total_burnfee}</p>
                  </div>
                  <div className="table-card">
                    <p className="table-title">Total block reward</p>
                    <p className="table-subtitle">{block.total_block_reward}</p>
                  </div>
                  <div className="table-card">
                    <p className="table-title"> Total participation</p>
                    <p className="table-subtitle">
                      {block.total_participation}
                    </p>
                  </div>
                  <div className="table-card">
                    <p className="table-title">Total STX reward</p>
                    <p className="table-subtitle">{block.total_stx_reward}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              {blocks.length > 0 && (
                <Miners initialPageSize={10} blocks={minersBlocks} />
              )}
            </div>
          )}
        </div>
      )}
      {tabIndex === 3 && (
        <Block
          currentBlock={currentBlock}
          getBlockByNumber={getBlockByNumber}
          blocks={blocks}
          params={params}
          setTabIndex={setTabIndex}
          blockHeights={blockHeights}
          theme={theme}
        />
      )}
    </div>
  );
};
