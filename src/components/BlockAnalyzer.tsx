import React from "react";
import { Blocks } from "../hooks/useOverview";

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
              <div
                onClick={() => {
                  getBlockByNumber(block.block_number.toString().substring(1));
                }}
                data-tip={block.block_number}
                className={"block"}
              ></div>
            );
          })}
        </div>
      )}
    </>
  );
};
