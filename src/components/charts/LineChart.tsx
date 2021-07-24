import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { lightTheme, darkTheme } from "../Themes";

interface Props {
  theme: any;
  topMinerFees: any;
}

export const LineChart: React.FC<Props> = ({ theme, topMinerFees }) => {
  const colorPalette = [
    "#FFA043",
    "#5542F6",
    "#00A5FF",
    "#20C9AC",
    "#FF4560",
    "#FA699D",
  ];
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      animations: {
        speed: 3,
      },
      redrawOnParentResize: false,
      toolbar: {
        show: false,
      },
    },
    grid: {
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: topMinerFees.slice(0, 5).map((r: any) => r.block_number),
      labels: {
        style: {
          colors: themeMode.text,
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
    legend: {
      show: true,
      position: "top",
      containerMargin: { left: 12 },
      fontWeight: 500,
      horizontalAlign: "left",
      offsetY: -5,
      fontSize: "14px",
      labels: {
        colors: themeMode.greyText,
      },
    },
    tooltip: {
      theme,
    },
    yaxis: {
      show: false,
    },
    colors: colorPalette,
  });
  const [series] = useState<ApexAxisChartSeries>(
    topMinerFees.slice(0, 5).map((r: any) => {
      return {
        name: r.miner_list[0].leader_key_address,
        data: [r.miner_list.map((r: any) => r.burn_fee)],
      };
    })
  );

  useEffect(() => {
    setOptions((data) => ({
      ...data,
      tooltip: {
        theme,
      },
      chart: {
        width: "100%",
      },
      subtitle: { style: { color: themeMode.greyText } },
      title: { style: { color: themeMode.greyText } },
      xaxis: {
        labels: { style: { colors: themeMode.text } },
        categories: topMinerFees.slice(0, 5).map((r: any) => r.block_number),
      },
      legend: { labels: { colors: themeMode.greyText }, show: false },
    }));
  }, [theme, themeMode.greyText, themeMode.text, topMinerFees]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      width="99%"
      height="100%"
    />
  );
};
