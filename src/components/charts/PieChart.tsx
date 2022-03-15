/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React from "react";
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
  const [value, setValue] = useState(100);
  const [valueText, setValueText] = useState("Reward Block");
  const [data, setData] = useState<any[][]>([
    ["Total winners", "Winner Addresses"],
  ]);
  const dims = useWindowDimensions();
  const [options, setOptions] = useState({
    colors: colorPalette,
    tooltip: { isHtml: true, showColorCode: true },
    legend: {
      position: "right",
      textStyle: { color: themeMode.text },
      scrollArrows: {
        inactiveColor: themeMode.text,
        activeColor: themeMode.text,
      },
    },
    backgroundColor: "transparent",
    pieSliceText: "none",
    enableInteractivity: true,
    pieHole: 0.9,
  });

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
        scrollArrows: {
          inactiveColor: themeMode.text,
          activeColor: themeMode.text,
        },
      },
    }));
    // setTimeout(() => {
    //   chartRef.current.draw();
    // }, 1000);
  }, [theme, themeMode, dims]);
  return (
    <div
      id="pie"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        strokeWidth: 0,
      }}
    >
      {totalWinners.length > 0 &&
        winnerAddresses.length > 0 &&
        totalWinners.length === winnerAddresses.length && (
          <Chart
            width={"100%"}
            height={"100%"}
            style={{ maxHeight: 275 }}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  setValue(
                    totalWinners[selection[0].row] === value
                      ? 100
                      : totalWinners[selection[0].row]
                  );
                  setValueText(
                    winnerAddresses[selection[0].row] === valueText
                      ? "Reward Block"
                      : winnerAddresses[selection[0].row]
                  );
                  chartWrapper.draw();
                },
              },
            ]}
            getChartWrapper={(chartWrapper) => {
              chartWrapper.draw();
            }}
          />
        )}
      <div id="labelOverlay">
        <p className="used-size">{value}</p>
        <p className="total-size">{valueText}</p>
      </div>
    </div>
  );
};
