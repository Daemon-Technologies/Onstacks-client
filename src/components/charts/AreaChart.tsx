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
    colors: ["#FFA043"],
    chartArea: { top: 30, width: "90%", height: "230px" },
    legend: "none",
    vAxis: {
      format: "short",
      textStyle: { color: themeMode.text },
      gridlines: { color: "none", minSpacing: 20 },
    },
    hAxis: {
      textStyle: { color: themeMode.text },
    },
  });

  useEffect(() => {
    setOptions((o) => ({
      ...o,
      hAxis: {
        textStyle: { color: themeMode.greyText },
        minorGridlines: { color: "transparent" },
        gridlines: { color: theme === "light" ? "#EBEAED" : "#84818A" },
      },
      vAxis: {
        format: "short",
        gridlines: { color: "none", minSpacing: 20 },
        textStyle: { color: themeMode.greyText },
      },
      tooltip: { isHtml: true },
    }));
  }, [dims.height, dims.width, theme, themeMode]);

  useEffect(() => {
    if (satsCommitted && satsCommitted.block_number.length > 0) {
      let values: any = satsCommitted;
      if (values.block_number[0] !== "Block Number") {
        values.block_number.unshift("Block Number");
        values.total_sats_committed.unshift("Sats");
      }
      setData(
        values.block_number.map((v: any, i: number) => {
          return [
            values.block_number[i],
            values.total_sats_committed[i],
            i === 0
              ? { role: "tooltip", type: "string", p: { html: true } }
              : `<div class="tool-tip-chart">
             <p class="header-text">#${values.block_number[i]}</p>
             <div style="display: flex; align-items: center">
                <div style="width: 10px; height: 10px;border-radius: 5px; background-color: ${"#FFA043"}; margin-right: 10px"></div>
                <p>${values.total_sats_committed[i]}</p>
             </div>
          </div>`,
          ];
        })
      );
    }
  }, [satsCommitted]);

  // useEffect(() => {
  //   if (dims.width > 500 && dims.height > 1050) {
  //     setOptions((o) => ({
  //       ...o,
  //       chartArea: { top: 10, width: "90%", right: 10, height: "85%" },
  //     }));
  //   }
  // }, [dims]);

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
