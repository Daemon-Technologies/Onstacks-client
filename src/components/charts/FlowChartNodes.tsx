/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect } from "react";
import { useState } from "react";
import ReactFlow, { PanOnScrollMode } from "react-flow-renderer";
import { MiningInfo } from "../../hooks/useMiningData";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { randomColorGenerator } from "../../utils/helper";
import { nodeTypes, edgeTypes, customElements } from "./NodeUtils";

export const FlowChartNodes: React.FC<{
  miningInfo: MiningInfo;
  theme: any;
}> = ({ miningInfo, theme }) => {
  const [selectedNodeId, setSelectedNodeId] = useState("");
  const dims = useWindowDimensions();
  const [selectedColor, setselectedColor] = useState("");
  const [elements, setElements] = useState([]);
  const [width, setWidth] = useState(900);
  const colorPalette = randomColorGenerator();
  const onElementClick = (event: any, element: any) => {
    if (element.data) {
      if (selectedNodeId !== element.data.stx_address) {
        setSelectedNodeId(element.data.stx_address);
        setselectedColor(colorPalette[element.data.index]);
      } else {
        setSelectedNodeId("");
        setselectedColor("");
      }
    }
  };

  useEffect(() => {
    let miners: any = [];
    if (miningInfo.total_sats_spent) {
      miningInfo.miners_info
        .sort((a, b) => {
          return b.total_sats_spent - a.total_sats_spent;
        })
        .slice(0, 5)
        .forEach((miner, index) => {
          miners.push(
            {
              id: `input-${miner.stx_address}`,
              type: "leftNode", // input node
              data: {
                stx_address: miner.stx_address,
                index,
                title:
                  miner.stx_address.substring(0, 8) +
                  "..." +
                  miner.stx_address.substring(
                    miner.stx_address.length - 9,
                    miner.stx_address.length - 1
                  ),
                subtitle: miner.total_sats_spent,
                bgColor:
                  selectedNodeId === "" || selectedNodeId === miner.stx_address
                    ? colorPalette[index]
                    : theme === "light"
                    ? "#EBEAED"
                    : "#565559",
              },
              sourcePosition: "right",
              targetPosition: "left",
              style: { border: 0 },
              position: { x: 18, y: 70 + index * 70 },
            },
            {
              id: `e-in-${miner.stx_address}`,
              source: `input-${miner.stx_address}`,
              target: "2",
              arrowHeadType: "arrow",
              style: {
                stroke:
                  selectedNodeId === ""
                    ? colorPalette[index]
                    : theme === "light"
                    ? "#EBEAED"
                    : "#565559",
                strokeWidth: 4,
                borderRadius: 20,
              },
              type: "smoothstep",
            },
            {
              id: `e-out-${miner.stx_address}`,
              source: `2`,
              target: `output-${miner.stx_address}`,
              arrowHeadType: "arrow",
              style: {
                stroke:
                  selectedNodeId === ""
                    ? colorPalette[index]
                    : theme === "light"
                    ? "#EBEAED"
                    : "#565559",
                strokeWidth: 4,
                borderRadius: 20,
              },
              type: "smoothstep",
            },
            {
              id: `output-${miner.stx_address}`,
              type: "rightNode", // output node
              sourcePosition: "right",
              targetPosition: "left",
              data: {
                index,
                stx_address: miner.stx_address,
                title:
                  miner.stx_address.substring(0, 8) +
                  "..." +
                  miner.stx_address.substring(
                    miner.stx_address.length - 9,
                    miner.stx_address.length - 1
                  ),
                subtitle: miner.total_stx_reward,
                bgColor:
                  selectedNodeId === "" || selectedNodeId === miner.stx_address
                    ? colorPalette[index]
                    : theme === "light"
                    ? "#EBEAED"
                    : "#565559",
              },
              position: { x: width + 50, y: 70 + index * 70 },
            }
          );
        });
      setElements(
        miners.concat(
          customElements(miningInfo, selectedNodeId, selectedColor, width)
        )
      );
    }
  }, [miningInfo, selectedNodeId]);

  useEffect(() => {
    if (dims.width > 1299) {
      setWidth(900);
    } else {
      setWidth(800);
    }
  }, [dims]);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <p className="title">STX Mining Asset Flow - Last 100 Blocks</p>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        edgeTypes={edgeTypes}
        maxZoom={1}
        minZoom={1}
        style={{ height: "90%", width: "100%" }}
        panOnScroll={dims.width < 1300}
        preventScrolling={false}
        onElementClick={onElementClick}
        paneMoveable={dims.width < 1300}
        panOnScrollMode={PanOnScrollMode.Horizontal}
        arrowHeadColor="transparent"
        elements={elements}
      />
    </div>
  );
};
