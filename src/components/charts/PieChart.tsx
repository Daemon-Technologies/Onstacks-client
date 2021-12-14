/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
interface Props {
  theme: any;
  winnerAddresses: string[];
  totalWinners: number[];
}

export const PieChart: React.FC<Props> = ({
  theme,
  totalWinners,
  winnerAddresses,
}) => {
  const [data, setData] = useState<any[][]>([
    ["Total winners", "Winner Addresses"],
  ]);

  useEffect(() => {
    if (totalWinners.length > 0 && winnerAddresses.length > 0) {
      const values = data;
      totalWinners
        .map((v, i) => {
          return [winnerAddresses[i], v];
        })
        .forEach((v) => {
          values.push(v);
        });
      setData(values);
    }
  }, [totalWinners.length, winnerAddresses.length]);

  return (
    <div
      id="pie"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        strokeWidth: 0,
      }}
    ></div>
  );
};
