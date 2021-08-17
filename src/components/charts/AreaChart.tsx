import React, { useEffect, useState } from "react";
import { SatsCommittedProps } from "../../hooks/useOverview";
import { darkTheme, lightTheme } from "../Themes";
import useWindowDimensions from "../../hooks/useWindowDimension";
import Chart from "react-google-charts";

interface Props {
  theme: any;
  satsCommitted: SatsCommittedProps;
}

export const AreaChart: React.FC<Props> = ({ theme, satsCommitted }) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  const dims = useWindowDimensions();
  const [data, setData] = useState<any[][]>([]);
  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    colors: ["#FFCE74"],
    chartArea: { top: 10, width: "90%", height: "55%" },
    legend: "none",
    vAxis: {
      format: "short",
      textStyle: { color: themeMode.text },
      gridlines: { color: "none", minSpacing: 20 },
    },
  });

  useEffect(() => {
    if (dims.height > 800) {
      setOptions((o) => ({
        ...o,
        hAxis: {
          textStyle: { color: themeMode.greyText },
        },
        chartArea: { top: 10, width: "90%", right: 10, height: "55%" },
        vAxis: {
          format: "short",
          gridlines: { color: "none", minSpacing: 20 },
          textStyle: { color: themeMode.greyText },
        },
      }));
    }
  }, [dims.height, dims.width, theme, themeMode]);

  useEffect(() => {
    if (dims.height < 800) {
      setOptions((o) => ({
        ...o,
        hAxis: {
          textStyle: { color: themeMode.greyText },
        },
        chartArea: { top: 10, width: "90%", right: 10, height: "50%" },
        vAxis: {
          format: "short",
          gridlines: { color: "none", minSpacing: 20 },
          textStyle: { color: themeMode.greyText },
        },
      }));
    }
  }, [dims.height, dims.width, theme, themeMode]);

  useEffect(() => {
    let values: any = satsCommitted;
    values.block_number.unshift("Block Number");
    values.total_sats_committed.unshift("Sats");
    setData(
      values.block_number.map((v: any, i: number) => {
        return [values.block_number[i], values.total_sats_committed[i]];
      })
    );
  }, [satsCommitted]);

  useEffect(() => {
    if (dims.width > 500 && dims.height > 1050) {
      setOptions((o) => ({
        ...o,
        chartArea: { top: 10, width: "90%", right: 10, height: "85%" },
      }));
    }
  }, [dims]);

  return (
    <Chart
      width={"100%"}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      options={options}
      data={data}
      legendToggle={false}
      rootProps={{ "data-testid": "2" }}
    />
  );
};
