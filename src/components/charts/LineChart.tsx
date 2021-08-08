import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { format, randomColorGenerator } from "../../utils/helper";
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
  const colorPalette = randomColorGenerator();

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
        rotateAlways: false,
        style: {
          colors: themeMode.text,
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    legend: {
      show: false,
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
        tickAmount: 5,
        type: "numeric",
        range: 49,
      },
      legend: {
        labels: { colors: themeMode.greyText },
        show: window.innerWidth > 800 ? true : false,
      },
      yaxis: {
        show: true,
        tickAmount: 3,
        labels: {
          style: { colors: themeMode.text },
          formatter: (val) => format(val),
        },
      },
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
  }, [theme, themeMode.greyText, themeMode.text, areaSeries, areaBlocks]);
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      width="99%"
      height={window.innerWidth > 600 ? "200" : "320"}
    />
  );
};
