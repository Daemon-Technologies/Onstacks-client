import React from "react";

import { Handle, Position } from "react-flow-renderer";

export const RightNode = ({ data }: any) => {
  const styles = {
    circle: {
      background: data.bgColor,
      width: 16,
      height: 16,
      marginRight: 8,
      borderRadius: 8,
    },
    left: {
      borderWidth: 0,
      backgroundColor: "transparent",
      borderColor: data.bgColor,
      width: 14,
      height: 14,
    },
    node: {
      display: "flex",
      marginRight: 16,
      opacity: data.bgColor === "#EBEAED" ? 0.2 : 1,
    },
    title: { fontSize: 14, fontWeight: 500 },
    subtitle: { color: "#84818A", fontSize: 12 },
  };
  return data.isTitle ? (
    <p className="row-flow-p">Total STX Reward per Miner</p>
  ) : (
    <>
      <Handle
        type="source"
        position={Position.Left}
        id="a"
        style={styles.left}
      />
      <i style={{ borderColor: data.bgColor }} className="arrow right"></i>
      <div style={styles.node}>
        <div style={styles.circle} />
        <div>
          <p style={styles.title}>{data.title}</p>
          <p style={styles.subtitle}>
            {data.subtitle.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
      </div>
    </>
  );
};
