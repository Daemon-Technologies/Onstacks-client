/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Chart } from "react-google-charts";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { randomColorGenerator } from "../../utils/helper";
import { lightTheme, darkTheme } from "../Themes";

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
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  const colorPalette = randomColorGenerator();

  const [data, setData] = useState<any[][]>([
    ["Total winners", "Winner Addresses"],
  ]);
  const dims = useWindowDimensions();
  const [options, setOptions] = useState({
    colors: colorPalette,
    legend: { position: "right", textStyle: { color: themeMode.text } },
    backgroundColor: "transparent",
    tooltip: { trigger: "selection" },
    enableInteractivity: true,
    pieHole: 1,
  });
  const chartRef: any = useRef(null);

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

  useEffect(() => {
    setOptions((o) => ({
      ...o,
      legend: {
        position: dims.width > 800 ? "right" : "bottom",
        textStyle: { color: themeMode.text },
      },
    }));
    // setTimeout(() => {
    //   chartRef.current.draw();
    // }, 1000);
  }, [theme, themeMode, dims]);

  return (
    <>
      {totalWinners.length > 0 &&
        winnerAddresses.length > 0 &&
        totalWinners.length === winnerAddresses.length && (
          <Chart
            width={"100%"}
            height={"100%"}
            chartType="PieChart"
            ref={chartRef}
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
            rootProps={{ "data-testid": "3" }}
            getChartWrapper={(chartWrapper) => {
              chartWrapper.draw();
            }}
          />
        )}
    </>
  );
};
