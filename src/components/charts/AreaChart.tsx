import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { darkTheme, lightTheme } from "../Themes";

interface Props {
  theme: any;
}

export const AreaChart: React.FC<Props> = ({ theme }) => {
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
      offsetY: -20,
      fontSize: "20px",
    },
    tooltip: {
      theme,
    },
    title: {
      text: "Total Sats Commited",
      align: "left",
      margin: 10,
      floating: false,
      style: {
        fontSize: "14px",
        fontFamily: undefined,
        color: themeMode.greyText,
      },
    },
    subtitle: {
      text: "1,483,482 Sats",
      align: "left",
      margin: 10,
      floating: false,
      style: {
        fontSize: "30px",
        fontFamily: undefined,
        color: themeMode.greyText,
      },
    },
    yaxis: {
      show: false,
    },
    colors: ["#FFA043"],
  });

  const [series, setSeries] = useState([
    {
      name: "#19021",
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
  ]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      width="100%"
      height="300"
    />
  );
};
