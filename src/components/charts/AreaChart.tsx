// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "../Themes";
import useWindowDimensions from "../../hooks/useWindowDimension";
import Chart from "react-google-charts";
import { useQuery } from "@apollo/client";
import { getBtcCommitsPerBlock } from "../../graphql/query/commitValue";

interface Props {
  theme: any;
}

export const AreaChart: React.FC<Props> = ({ theme }) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  const dims = useWindowDimensions();
  const [dataa, setData] = useState<any[][]>([]);
  const { data } = useQuery(getBtcCommitsPerBlock);

  const [options, setOptions] = useState({
    backgroundColor: "transparent",
    areaOpacity: 0.3,
    colors: ["#5546FF"],
    chartArea: { top: 30, width: "90%", height: "230px", left: 40 },
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
      chartArea: { top: 40, width: "90%", height: "270px", left: 30 },
      hAxis: {
        textStyle: { color: themeMode.greyText },
        minorGridlines: { color: "transparent" },
        gridlines: { color: "none" },
      },
      vAxis: {
        format: "short",
        gridlines: {
          color: theme === "light" ? "#EBEAED" : "#84818A",
          minSpacing: 40,
        },
        textStyle: { color: themeMode.greyText },
      },
      aggregationTarget: "category",

      tooltip: { isHtml: true },
    }));
  }, [dims.height, dims.width, theme, themeMode]);

  useEffect(() => {
    if (data) {
      let values: any = data.block_info.map((v: any, i: number) => {
        return [
          v.stacks_block_height,
          v.totalSpent.aggregate.sum.commit_value,
          //   i === 0
          //     ? { role: "tooltip", type: "string", p: { html: true } }
          //     : `<div class="tool-tip-chart">
          //    <p class="header-text">#${v.stacks_block_height}</p>
          //    <div style="display: flex; align-items: center">
          //       <div style="width: 10px; height: 10px;border-radius: 5px; background-color: ${"#FFA043"}; margin-right: 10px"></div>
          //       <p>${v.totalSpent.aggregate.sumcommit_value}</p>
          //    </div>
          // </div>`,
        ];
      });
      if (values[0][0] !== "Block Number") {
        values.unshift(["Block Number", "Sats"]);
      }
      setData(values);
    }
  }, [data]);

  return (
    <Chart
      width={"100%"}
      chartType="AreaChart"
      loader={<div>Loading Chart</div>}
      options={options}
      data={dataa}
      legendToggle={false}
      rootProps={{ "data-testid": "2" }}
    />
  );
};
