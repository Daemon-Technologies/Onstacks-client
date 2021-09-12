/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { CurrentBlock } from "../../hooks/useMiningData";

interface Props {
  theme: any;
  currentBlock: CurrentBlock;
}

export const BubbleCharts: React.FC<Props> = ({ theme, currentBlock }) => {
  const [bubble, setBubbles] = useState<any>({});

  useEffect(() => {
    let bub: any[] = [];
    currentBlock.miners_info.forEach((miner) => {
      bub.push({
        name: miner.miner_address,
        value: miner.burn_fee,
        prop: miner.win_probability,
      });
    });
    setBubbles({ name: "root", children: bub });
  }, [currentBlock]);
  return (
    <ResponsiveCirclePacking
      data={bubble}
      // margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      id="name"
      colors={{ scheme: "paired" }}
      colorBy="id"
      childColor={{ from: "color", modifiers: [["opacity", 1]] }}
      padding={1}
      leavesOnly={true}
      enableLabels={true}
      label="none"
      tooltip={(x) => {
        console.log(x);
        return (
          <div className="bubble-tooltip">
            <div>
              <div className="circle" style={{ background: x.color }}></div>{" "}
              <p className="name">{x.data.name}</p>
            </div>
            <div>
              <p>Fee Burned</p> <p>{x.data.value}</p>
            </div>
            <div>
              <p>Win Probabilty</p> <p>{x.data.prop}</p>
            </div>
          </div>
        );
      }}
      // labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.4 ] ] }}
      borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
      animate={true}
    />
  );
};
