import React, { useEffect, useState } from "react";
import { Blocks, OverviewProps, TokenPriceProps } from "../hooks/useOverview";
import { MiningDataHeader } from "../components/MiningDataHeader";
import { MiningDataOverview } from "../components/MiningDataOverview";
import { RecentBlocks } from "../components/RecentBlocks";

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
  areaSeries,
  blocks,
  themeToggler,
}) => {
  const [toggle, setToggle] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);

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
          areaSeries={areaSeries}
          blocks={blocks}
          theme={theme}
        />
      )}
      {tabIndex === 1 && (
        <div id={"content1"}>
          <p>Recent blocks</p>
          {blocks.length > 0 && (
            <RecentBlocks initialPageSize={10} blocks={blocks} />
          )}
        </div>
      )}
    </div>
  );
};
