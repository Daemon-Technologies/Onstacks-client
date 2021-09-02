/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import Chart from "react-google-charts";
import { randomColorGenerator } from "../../utils/helper";

interface Props {
  theme: any;
  bubbles: any[];
}

export const BubbleChart: React.FC<Props> = ({ theme, bubbles }) => {
  const colorPalette = randomColorGenerator();
  const [min, setMin] = useState(10);
  const [max, setMax] = useState(0);

  useEffect(() => {
    let minimum = 10;
    let maximum = 0;
    bubbles.forEach((bubble) => {
      if (bubble[2] > maximum) {
        maximum = bubble[2];
      }
      if (bubble[2] < minimum) {
        minimum = bubble[2];
      }
    });
    setMax(maximum);
    setMin(minimum);
    console.log(minimum, maximum);
  }, [bubbles]);
  return (
    <Chart
      width={"100%"}
      height={"300px"}
      chartType="BubbleChart"
      loader={<div>Loading Chart</div>}
      data={bubbles}
      options={{
        colors: colorPalette,
        vAxis: {
          baseline: "none",
          ticks: [min - 0.05, max + 0.1],
          gridlines: { color: "transparent" },
          textPosition: "none",
        },
        hAxis: { baseline: "none", ticks: [] },
        bubble: { textStyle: { fontSize: 0, color: "transparent" } },
        backgroundColor: "transparent",
        chartArea: {
          left: 20,
          top: 50,
          width: "100%",
          height: "100%",
        },
        legend: "none",
        sizeAxis: { minValue: 20, maxSize: 40 },
        sortBubblesBySize: true,
      }}
      rootProps={{ "data-testid": "2" }}
    />
  );
};
