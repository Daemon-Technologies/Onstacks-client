// eslint-disable-next-line
import React from "react";
import ReactFlow from "react-flow-renderer";
import { LeftNode } from "./LeftNode";
import { CustomNode } from "./Node";
import { RightNode } from "./RightNode";

const nodeTypes = {
  selectorNode: CustomNode,
  leftNode: LeftNode,
  rightNode: RightNode,
};

const elements: any = [
  {
    id: "input-0",
    type: "leftNode", // input node
    data: {
      title: "SPZ0RAC1EF...AF4ECT5A7DD",
      subtitle: "2,178,314 sats",
      bgColor: "#20C9AC",
    },
    sourcePosition: "right",
    targetPosition: "left",
    style: { border: 0 },
    position: { x: 18, y: 10 },
  },
  {
    id: "input-1",
    type: "leftNode", // input node
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      title: "SPZ0RAC1EF...AF4ECT5A7DD",
      subtitle: "2,178,314 sats",
      bgColor: "#FA699D",
    },
    position: { x: 19, y: 70 },
  },
  {
    id: "input-2",
    type: "leftNode", // SPZ0RAC1EF...AF4ECT5A7DD
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      title: "SPZ0RAC1EF...AF4ECT5A7DD",
      subtitle: "2,178,314 sats",
      bgColor: "#00A5FF",
    },
    position: { x: 20, y: 130 },
  },
  {
    id: "input-3",
    type: "leftNode", // SPZ0RAC1EF...AF4ECT5A7DD
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      title: "SPZ0RAC1EF...AF4ECT5A7DD",
      subtitle: "2,178,314 sats",
      bgColor: "#FFA043",
    },
    position: { x: 19, y: 190 },
  },
  {
    id: "input-4",
    type: "leftNode", // SPZ0RAC1EF...AF4ECT5A7DD
    data: {
      title: "SPZ0RAC1EF...AF4ECT5A7DD",
      subtitle: "2,178,314 sats",
      bgColor: "#5542F6",
    },
    sourcePosition: "right",
    targetPosition: "left",

    position: { x: 18, y: 250 },
  },
  // default node
  {
    id: "2",
    // you can also pass a React component as a label
    type: "selectorNode",
    position: { x: 550, y: 90 },
  },
  {
    id: "output-0",
    type: "rightNode", // output node
    sourcePosition: "right",
    targetPosition: "left",
    data: {
      title: "SPZ0RAC1EF...AF4ECT5A7DD",
      subtitle: "2,178,314 sats",
      bgColor: "#20C9AC",
    },
    position: { x: 902, y: 10 },
  },
  {
    id: "output-1",
    type: "rightNode", // output node
    targetPosition: "left",
    data: {
      title: "SPZ0RAC1EF...AF4ECT5A7DD",
      subtitle: "2,178,314 sats",
      bgColor: "#FA699D",
    },
    position: { x: 901, y: 70 },
  },
  {
    id: "output-2",
    type: "rightNode", // output node
    targetPosition: "left",
    data: {
      title: "SPZ0RAC1EF...AF4ECT5A7DD",
      subtitle: "2,178,314 sats",
      bgColor: "#00A5FF",
    },
    position: { x: 900, y: 130 },
  },
  {
    id: "output-3",
    type: "rightNode", // output node
    targetPosition: "left",
    data: {
      title: "SPZ0RAC1EF...AF4ECT5A7DD",
      subtitle: "2,178,314 sats",
      bgColor: "#FFA043",
    },
    position: { x: 901, y: 190 },
  },
  {
    id: "output-4",
    type: "rightNode", // output node
    data: {
      title: "SPZ0RAC1EF...AF4ECT5A7DD",
      subtitle: "2,178,314 sats",
      bgColor: "#5542F6",
    },
    targetPosition: "left",
    position: { x: 902, y: 250 },
  },
  // animated edge
  {
    id: "e1-2",
    source: "input-0",
    target: "2",
    arrowHeadType: "arrow",
    style: { stroke: "#20C9AC", strokeWidth: 4, borderRadius: 20 },
    type: "smoothstep",
  },
  {
    id: "e2-3",
    source: "input-1",
    target: "2",
    arrowHeadType: "arrow",
    style: { stroke: "#FA699D", strokeWidth: 4 },
    type: "smoothstep",
  },
  {
    id: "e1-2",
    source: "input-2",
    target: "2",
    arrowHeadType: "arrow",
    style: { stroke: "#00A5FF", strokeWidth: 4 },
    type: "smoothstep",
  },
  {
    id: "e2-3",
    source: "input-3",
    target: "2",
    arrowHeadType: "arrow",
    style: { stroke: "#FFA043", strokeWidth: 4 },
    type: "smoothstep",
  },
  {
    id: "e1-2",
    source: "input-4",
    target: "2",
    arrowHeadType: "arrow",
    style: { stroke: "#5542F6", strokeWidth: 4 },
    type: "smoothstep",
  },
  {
    id: "e2-3",
    source: "2",
    target: "output-0",
    style: { stroke: "#20C9AC", strokeWidth: 4 },
    type: "smoothstep",
  },
  {
    id: "e1-2",
    source: "2",
    target: "output-1",
    style: { stroke: "#FA699D", strokeWidth: 4 },
    type: "smoothstep",
  },
  {
    id: "e2-3",
    source: "2",
    target: "output-2",
    style: { stroke: "#00A5FF", strokeWidth: 4 },
    type: "smoothstep",
  },
  {
    id: "e1-2",
    source: "2",
    target: "output-3",
    style: { stroke: "#FFA043", strokeWidth: 4 },
    type: "smoothstep",
  },
  {
    id: "e2-3",
    source: "2",
    target: "output-4",
    style: { stroke: "#5542F6", strokeWidth: 4 },
    type: "smoothstep",
  },
];

export const FlowChartNodes = () => (
  <div style={{ height: "100%", width: "100%" }}>
    <ReactFlow
      nodeTypes={nodeTypes}
      arrowHeadColor="#5542F6"
      elements={elements}
    />
  </div>
);
