import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { lightTheme, darkTheme } from "../Themes";

interface Props {
  theme: any;
  areaBlocks: string[];
  areaSeries: ApexAxisChartSeries;
}

export const LineChart: React.FC<Props> = ({
  theme,
  areaBlocks,
  areaSeries,
}) => {
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
      categories: areaBlocks,
      tooltip: {
        enabled: false,
      },
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
  const [series, setSeries] = useState<ApexAxisChartSeries>(areaSeries);
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
        categories: areaBlocks,
      },
      legend: { labels: { colors: themeMode.greyText }, show: true },
    }));
    let s = areaSeries.map((s: any) => {
      return {
        ...s,
        name:
          s.name.substring(0, 4) +
          ".." +
          s.name.substring(s.name.length - 5, s.name.length - 1),
      };
    });
    setSeries(s);
  }, [theme, themeMode.greyText, themeMode.text, areaSeries]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      width="99%"
      height="200"
    />
  );
};
