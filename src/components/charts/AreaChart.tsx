import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { darkTheme, lightTheme } from "../Themes";

interface Props {
  theme: any;
}

export const AreaChart: React.FC<Props> = ({ theme }) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
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
    chart: {
      redrawOnParentResize: true,

      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      width: "100%",
    },
    xaxis: {
      tickAmount: 3,
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
    yaxis: {
      show: false,
      tickAmount: 1,
    },
    colors: ["#FFA043"],
  });

  const [series] = useState([
    {
      name: "#19021",
      data: [30, 40, 25, 50, 49, 21, 70, 51],
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
        redrawOnParentResize: false,
        animations: {
          enabled: false,
        },
      },
      subtitle: { style: { color: themeMode.text } },
      title: { style: { color: themeMode.greyText } },
      xaxis: {
        labels: { style: { colors: themeMode.text } },
      },
    }));
  }, [theme, themeMode.greyText, themeMode.text]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      width="99%"
      height="100%"
    />
  );
};
