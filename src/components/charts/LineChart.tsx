import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { lightTheme, darkTheme } from "../Themes";

interface Props {
  theme: any;
}

export const LineChart: React.FC<Props> = ({ theme }) => {
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
    xaxis: {
      categories: [
        "18000",
        "18500",
        "19000",
        "19500",
        "20000",
        "20500",
        "21000",
        "21500",
      ],
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
      offsetY: -5,
      fontSize: "16px",
      labels: {
        colors: themeMode.text,
      },
    },
    title: {
      text: "Top miner burned fees",
      align: "left",
      margin: 10,
      floating: false,
      style: {
        fontSize: "14px",
        fontFamily: undefined,
        color: themeMode.greyText,
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

  const [series, setSeries] = useState([
    {
      name: "SP4V..H7SB",
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
    {
      name: "SP4V..H7SB",
      data: [50, 20, 45, 30, 29, 11, 20, 41],
    },
    {
      name: "SP4V..H7SB",
      data: [34, 45, 10, 30, 19, 24, 40, 51],
    },
    {
      name: "SP4V..H7SB",
      data: [12, 25, 40, 10, 49, 14, 30, 51],
    },
    {
      name: "SP4V..H7SB",
      data: [34, 45, 10, 30, 19, 24, 40, 51],
    },
  ]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      width="100%"
      height="300"
    />
  );
};
