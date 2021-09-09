import React from "react";
import { MiningInfo } from "../hooks/useMiningData";
import { Blocks } from "../hooks/useOverview";
import { FlowChartNodes } from "./charts/FlowChartNodes";
import { LineChart } from "./charts/LineChart";
import { RecentBlocks } from "./RecentBlocks";

export const MiningDataOverview: React.FC<{
  areaBlocks: string[];
  areaSeries: any;
  miningInfo: MiningInfo;
  blocks: Blocks[];
  theme: any;
}> = ({ areaBlocks, areaSeries, theme, blocks, miningInfo }) => {
  return (
    <>
      <div className="flow-chart" id="content1">
        <FlowChartNodes theme={theme} miningInfo={miningInfo} />
      </div>
      <div id="content3">
        <p className="title">Top Miners - Sats Spent Per Block</p>
        <div className="seprator">
          {areaBlocks.length > 0 && areaSeries.length > 0 && (
            <LineChart
              areaBlocks={areaBlocks}
              areaSeries={areaSeries}
              theme={theme}
            />
          )}
        </div>
      </div>
      <div id="content4">
        <p className={"title-table"}>Recent blocks</p>
        {blocks.length > 0 && <RecentBlocks blocks={blocks} />}
      </div>
    </>
  );
};
