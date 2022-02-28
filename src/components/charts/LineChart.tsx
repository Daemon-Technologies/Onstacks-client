import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
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
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const [data, setData] = useState<any[][]>([]);
  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    isStacked: true,
    areaOpacity: 0.3,
    curveType: "function",
    chartArea: { top: 45, width: "100%", right: 10, height: "100%", left: 0 },
    colors: colorPalette,
    interpolateNulls: true,
    hAxis: {
      format: "0",
      minorGridlines: { color: "transparent" },
      gridlines: { color: theme === "light" ? "#EBEAED" : "#84818A" },
    },
  });

  useEffect(() => {
    const values: any = [
      areaSeries.map((series: any, index) => {
        return (
          series.name.substring(0, 4) +
          ".." +
          series.name.substring(series.name.length - 5, series.name.length - 1)
        );
      }),
    ];
    values[0].unshift("Miners");
    areaBlocks.forEach((e, index) => {
      values[index + 1] = [parseInt(e)];
      areaSeries.forEach((x: any, i) => {
        values[index + 1][i + 1] =
          x.winner_blocks.indexOf(e) > -1
            ? parseInt(x.data[index] ? x.data[index] : 0)
            : 0;
      });
    });
    setData(values);
  }, [areaBlocks, areaSeries]);

  useEffect(() => {
    if (data.length > 0) {
      setOptions((o) => ({
        ...o,
        hAxis: {
          textStyle: { color: themeMode.greyText },
          minorGridlines: { color: "transparent" },
          gridlines: {
            color: theme === "light" ? "#EBEAED" : "#84818A",
            count: -1,
          },
          viewWindow: {
            max: data[data.length - 1][0],
            min: data[1][0],
          },
          format: "0",
        },
        vAxis: {
          format: "short",
          gridlines: {
            color: theme === "light" ? "#EBEAED" : "#84818A",
            minSpacing: 40,
          },
          textStyle: { color: themeMode.greyText },
          interpolateNulls: false,
        },
        curveType: "function",
        tooltip: { isHtml: true },
        focusTarget: "category",
      }));
    }
  }, [theme.text, themeMode.text, themeMode.greyText, data, theme]);
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
