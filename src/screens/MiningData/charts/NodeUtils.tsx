import { MiningInfo } from "../../../hooks/useMiningData";
import CustomEdge from "./CustomEdge";
import { LeftNode } from "./LeftNode";
import { CustomNode } from "./Node";
import { RightNode } from "./RightNode";

export const nodeTypes = {
  selectorNode: CustomNode,
  leftNode: LeftNode,
  rightNode: RightNode,
};

export const edgeTypes = {
  custom: CustomEdge,
};

export const customElements: any = (
  miningInfo: MiningInfo,
  selectedNodeId: string,
  color: string,
  width: number
) => {
  const custom: any = [
    {
      id: "2",
      type: "selectorNode",
      position: { x: width < 900 ? width - 320 : 540, y: 180 },
    },

    {
      id: `3`,
      type: "rightNode", // input node
      data: {
        isTitle: true,
      },
      position: { x: width - 100, y: 20 },
    },
    {
      id: `1`,
      type: "leftNode", // input node
      data: {
        isTitle: true,
      },
      sourcePosition: "right",
      targetPosition: "left",
      position: { x: 18, y: 20 },
    },
    {
      id: "e1-99",
      source: "2",
      target: "input-" + miningInfo.miners_info[2]?.stx_address,
      type: "custom",
      data: {
        text: miningInfo.total_sats_spent,
        title: "Total Sats Spent",
        subtitle: "sats",
      },
      labelBgStyle: { fill: "#FFCC00", color: "#fff", marginBottom: 10 },
      style: {
        stroke: "transparent",
        marginTop: 20,
        div: {
          marginLeft: 100,
        },
      },
      arrowHeadType: "arrowclosed",
    },
    {
      id: "e1-929",
      source: "2",
      target: "output-" + miningInfo.miners_info[2]?.stx_address,
      type: "custom",
      data: {
        text: miningInfo.total_stx_reward,
        title: "Total STX Reward",
        subtitle: "STX",
      },
      labelBgStyle: { fill: "#FFCC00", color: "#fff", marginBottom: 10 },
      style: {
        stroke: "transparent",
        strokeWidth: 0,
        marginTop: 20,
        div: {
          marginRight: 10,
          backgroundColor: "transparent",
        },
      },
      arrowHeadType: "arrowclosed",
    },
  ];
  if (selectedNodeId !== "") {
    custom.push(
      {
        id: `e-in-${selectedNodeId}-2`,
        source: `input-${selectedNodeId}`,
        target: "2",
        arrowHeadType: "arrow",
        style: {
          stroke: color,
          strokeWidth: 4,
        },
        type: "smoothstep",
      },
      {
        id: `e-out-${selectedNodeId}-2`,
        source: `2`,
        target: `output-${selectedNodeId}`,
        arrowHeadType: "arrow",
        style: {
          stroke: color,
          strokeWidth: 4,
          borderRadius: 20,
        },
        type: "smoothstep",
      }
    );
  }
  return custom;
};
