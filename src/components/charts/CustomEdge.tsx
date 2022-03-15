// eslint-disable-next-line
import React from "react";
import {
  getBezierPath,
  getEdgeCenter,
  getMarkerEnd,
} from "react-flow-renderer";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  arrowHeadType,
  markerEndId,
}: any) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <>
        <path
          id={id}
          style={style}
          className="react-flow__edge-path"
          d={edgePath}
          markerEnd={markerEnd}
        />
        <foreignObject
          width={300}
          height={100}
          x={edgeCenterX - 140}
          y={edgeCenterY + 10}
          className="edgebutton-foreignobject"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div style={style.div}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                textAlign: "start",
                marginBottom: 8,
              }}
            >
              {data.title}
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                textAlign: "start",
              }}
            >
              {data.text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              {data.subtitle}
            </p>
          </div>
        </foreignObject>
      </>
    </>
  );
}
