// eslint-disable-next-line
import React from "react";

import { Handle, Position } from "react-flow-renderer";

export const CustomNode = ({ data }: any) => {
  return (
    <>
      <Handle
        type="target"
        id="b"
        position={Position.Left}
        style={{ width: 0 }}
      />
      <div
        style={{
          background: "#FFA043",
          width: 108,
          height: 108,
          borderRadius: 75,
        }}
      ></div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{
          borderWidth: 4,
          marginRight: -10,
          backgroundColor: "transparent",
          borderColor: "#00A5FF",
          width: 14,
          height: 14,
        }}
      />
    </>
  );
};
