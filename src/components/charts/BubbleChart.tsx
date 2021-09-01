/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Chart from "react-google-charts";
import { randomColorGenerator } from "../../utils/helper";

interface Props {
  theme: any;
  bubbles: any[];
}

export const BubbleChart: React.FC<Props> = ({ theme, bubbles }) => {
  const colorPalette = randomColorGenerator();

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
          ticks: [0, 0.25],
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
