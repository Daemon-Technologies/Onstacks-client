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

  const [series] = useState([
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
      },
      legend: { labels: { colors: themeMode.greyText } },
    }));
  }, [theme, themeMode.greyText, themeMode.text]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      width="100%"
      height="260"
    />
  );
};
