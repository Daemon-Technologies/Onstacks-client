import React from "react";
import { Blocks } from "../hooks/useOverview";
import { Tooltip } from "./Tooltip";

interface Props {
  getBlockByNumber: (block: string) => void;
  blocks: Blocks[];
}

export const BlockAnalyzer: React.FC<Props> = ({
  blocks,
  getBlockByNumber,
}) => {
  return (
    <>
      {blocks.length > 0 && (
        <div className={"block-analyzer"}>
          {blocks.map((block) => {
            return (
              <Tooltip message={block.block_number} position={"top"}>
                <div
                  onClick={() => {
                    getBlockByNumber(block.block_number.toString());
                  }}
                  data-tip={block.block_number}
                  className={"block"}
                ></div>
              </Tooltip>
            );
          })}
        </div>
      )}
    </>
  );
};
