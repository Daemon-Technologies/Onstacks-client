import React, { useEffect, useRef, useState } from "react";
import Chart from "react-google-charts";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { randomColorGenerator } from "../../utils/helper";
import { lightTheme, darkTheme } from "../Themes";

interface Props {
  theme: any;
  areaBlocks: string[];
  areaSeries: ApexAxisChartSeries;
}

export const LineChart: React.FC<Props> = ({
  theme,
  areaBlocks,
  areaSeries,
}) => {
  const colorPalette = randomColorGenerator();
  const dims = useWindowDimensions();
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  let chartRef: any = useRef(null);

  const [data, setData] = useState<any[][]>([]);
  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    isStacked: "percent",
    legend: {
      position: "top",
    },
    colors: colorPalette,
    hAxis: {
      textStyle: { color: themeMode.text },
      viewWindow: {
        min: 0,
        max: 10,
      },
    },
    vAxis: { textStyle: { color: themeMode.text } },
  });

  useEffect(() => {
    const values: any = [
      areaSeries.map((series: any, index) => {
        return series.name;
      }),
    ];
    values[0].unshift("Miners");
    areaBlocks.forEach((e, index) => {
      values[index + 1] = [e];
      areaSeries.forEach((x: any, i) => {
        values[index + 1][i + 1] = parseFloat(x.data[index]) || null;
      });
    });
    setData(values);
  }, [areaBlocks, areaBlocks.length, areaSeries, areaSeries.length]);

  useEffect(() => {
    if (dims.height > 800) {
      setOptions((o) => ({
        ...o,
        legend: {
          maxLines: 2,
          position: dims.width > 500 && dims.height < 800 ? "none" : "top",
          textStyle: { color: themeMode.text },
          scrollArrows: {
            inactiveColor: themeMode.text,
            activeColor: themeMode.text,
            pagingTextStyle: { color: theme.text },
          },
        },
        hAxis: {
          textStyle: { color: themeMode.text },
          viewWindow: {
            min: 0,
            max: 50,
          },
        },
        vAxis: { textStyle: { color: themeMode.text } },
      }));
    }
  }, [dims.height, dims.width, theme, themeMode]);

  useEffect(() => {
    if (dims.width > 500 && dims.height < 800) {
      setOptions((o) => ({
        ...o,
        chartArea: { top: 10, width: "80%", height: 100 },
        legend: {
          maxLines: 2,
          position: dims.width > 500 && dims.height < 800 ? "none" : "top",
          textStyle: { color: themeMode.text },
          scrollArrows: {
            inactiveColor: themeMode.text,
            activeColor: themeMode.text,
            pagingTextStyle: { color: theme.text },
          },
        },
        hAxis: {
          textStyle: { color: themeMode.text },
          viewWindow: {
            min: 0,
            max: 10,
          },
        },
        vAxis: { textStyle: { color: themeMode.text } },
      }));
    }
  }, [dims, theme.text, themeMode.text]);

  return (
    <>
      {areaSeries.length > 0 && areaBlocks.length === 50 && (
        <Chart
          width={"100%"}
          height={"100%"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          options={options}
          data={data}
          getChartWrapper={(chartWrapper) => {
            chartRef = chartWrapper;
          }}
          rootProps={{ "data-testid": "2" }}
        />
      )}
    </>
  );
};
