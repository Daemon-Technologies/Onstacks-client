/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect } from "react";
import { useState } from "react";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { CurrentBlock } from "../../hooks/useMiningData";
import { randomColorGenerator } from "../../utils/helper";

interface Props {
  theme: any;
  currentBlock: CurrentBlock;
  winnerAddress: string;
}

export const BubbleCharts: React.FC<Props> = ({
  theme,
  currentBlock,
  winnerAddress,
}) => {
  const [bubble, setBubbles] = useState<any>({});
  const colorPalette = randomColorGenerator();

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
      colors={colorPalette}
      colorBy="id"
      childColor={{ from: "color", modifiers: [["opacity", 1]] }}
      padding={1}
      leavesOnly={true}
      enableLabels={true}
      label="none"
      tooltip={(x) => {
        return (
          <div className="bubble-tooltip">
            <div>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div className="circle" style={{ background: x.color }}></div>
                <p className="name">{`${x.data.name.substring(
                  0,
                  8
                )} ... ${x.data.name.substring(
                  x.data.name.length - 9,
                  x.data.name.length
                )}`}</p>
              </div>
              {winnerAddress === x.data.name && (
                <div
                  style={{
                    background: x.color + "10",
                    padding: 8,
                    borderRadius: 4,
                    width: 80,
                    color: x.color,
                  }}
                >
                  <p className="Winner">Winner</p>
                </div>
              )}
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
      borderWidth={1}
      // labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.4 ] ] }}
      borderColor={{ from: "color", modifiers: [["darker", 1]] }}
      animate={true}
    />
  );
};
