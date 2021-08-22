import React from "react";
import { Blocks } from "../hooks/useOverview";
import { FlowChartNodes } from "./charts/FlowChartNodes";
import { LineChart } from "./charts/LineChart";
import { RecentBlocks } from "./RecentBlocks";

export const MiningDataOverview: React.FC<{
  areaBlocks: string[];
  areaSeries: any;
  blocks: Blocks[];
  theme: any;
}> = ({ areaBlocks, areaSeries, theme, blocks }) => {
  return (
    <>
      <div className="flow-chart" id="content1">
        <FlowChartNodes />
      </div>
      <div id="content3">
        <p className="title">Top miner burned fees</p>
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
        <p>Recent blocks</p>
        {blocks.length > 0 && <RecentBlocks blocks={blocks} />}
      </div>
    </>
  );
};
