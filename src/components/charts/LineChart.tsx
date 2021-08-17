import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { randomColorGenerator } from "../../utils/helper";
import { lightTheme, darkTheme } from "../Themes";

interface Props {
  theme: any;
  areaBlocks: string[];
  areaSeries: any[];
}

export const LineChart: React.FC<Props> = ({
  theme,
  areaBlocks,
  areaSeries,
}) => {
  const colorPalette = randomColorGenerator();
  const dims = useWindowDimensions();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const [data, setData] = useState<any[][]>([]);
  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    isStacked: true,
    areaOpacity: 0.9,
    chartArea: { top: 30, width: "90%", right: 10, height: "70%" },
    legend: {
      position: "top",
    },
    explorer: {
      keepInBounds: true,
      axis: "horizontal",
      maxZoomIn: 4.0,
      maxZoomOut: 2.0,
    },
    colors: colorPalette,
    interpolateNulls: false,
    vAxis: {
      format: "0",
      textStyle: { color: themeMode.text },
      interpolateNulls: false,
      gridlines: { count: -1, color: "none", minSpacing: 20 },
    },
  });

  useEffect(() => {
    const values: any = [
      areaSeries.map((series: any, index) => {
        return (
          series.name.substring(0, 4) +
          ".." +
          series.name.substring(series.name.length - 4, series.name.length - 1)
        );
      }),
    ];
    values[0].unshift("Miners");
    areaBlocks.forEach((e, index) => {
      values[index + 1] = [parseInt(e)];
      areaSeries.forEach((x: any, i) => {
        console.log(
          e,
          x.winner_blocks.indexOf(e) > -1,
          x.winner_blocks,
          x.data[index]
        );
        values[index + 1][i + 1] =
          x.winner_blocks.indexOf(e) > -1
            ? parseInt(x.data[index] ? x.data[index] : 0)
            : 0;
      });
    });
    console.log(values);
    setData(values);
  }, [areaBlocks, areaSeries]);

  useEffect(() => {
    if (dims.height > 800 && data.length > 10) {
      setOptions((o) => ({
        ...o,
        legend: {
          maxLines: 2,
          chartArea: { top: 30, width: "90%", right: 10, height: "70%" },
          position: "top",
          textStyle: { color: themeMode.text },
          scrollArrows: {
            inactiveColor: themeMode.text,
            activeColor: themeMode.text,
            pagingTextStyle: { color: themeMode.text },
          },
        },
        hAxis: {
          textStyle: { color: themeMode.greyText },
          gridlines: { count: -1, color: "#f3f3f3" },
          viewWindow: {
            max: data[data.length - 1][0],
            min: data[1][0],
          },
        },
        vAxis: {
          textStyle: { color: themeMode.greyText },
          interpolateNulls: true,
          format: "0",
          gridlines: { count: -1, color: "none", minSpacing: 20 },
        },
      }));
    }
  }, [dims.height, dims.width, theme, themeMode, data]);

  useEffect(() => {
    if (dims.width > 500 && dims.height < 800 && data.length > 0) {
      setOptions((o) => ({
        ...o,
        chartArea: { top: 30, width: "90%", right: 10, height: "70%" },
        legend: {
          maxLines: 2,
          position: "top",
          textStyle: { color: themeMode.text },
          scrollArrows: {
            inactiveColor: themeMode.text,
            activeColor: themeMode.text,
            pagingTextStyle: { color: themeMode.text },
          },
        },
        hAxis: {
          textStyle: { color: themeMode.greyText },
          gridlines: { count: -1, color: "#f3f3f3" },
          viewWindow: {
            max: data[data.length - 1][0],
            min: data[1][0],
          },
        },
        vAxis: {
          textStyle: { color: themeMode.greyText },
          format: "0",
          interpolateNulls: true,
          gridlines: { count: -1, color: "none", minSpacing: 20 },
        },
      }));
    }
  }, [dims, theme.text, themeMode.text, themeMode.greyText, data]);

  useEffect(() => {
    if (dims.width > 500 && dims.height > 1050) {
      setOptions((o) => ({
        ...o,
        chartArea: { top: 40, width: "90%", right: 10, height: "65%" },
      }));
    }
  }, [dims]);
  return (
    <>
      {areaSeries.length > 0 && areaBlocks.length === 50 && (
        <Chart
          width={"100%"}
          height={"100%"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          options={options}
          data={data}
          rootProps={{ "data-testid": "2" }}
        />
      )}
    </>
  );
};
