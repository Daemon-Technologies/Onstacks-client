import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import useWindowDimensions from "../../hooks/useWindowDimension";
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
  const dims = useWindowDimensions();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      redrawOnParentResize: true,
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
        rotate: 0,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
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
    if (areaSeries.length > 0 && areaBlocks.length > 0) {
      setSeries(
        areaSeries.map((s: any) => {
          return {
            ...s,
            name:
              s.name.substring(0, 4) +
              ".." +
              s.name.substring(s.name.length - 5, s.name.length - 1),
          };
        })
      );
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
          show: dims.width > 800 && dims.height > 700 ? true : false,
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
    }
  }, [
    areaBlocks,
    areaSeries,
    dims.height,
    dims.width,
    theme,
    themeMode.greyText,
    themeMode.text,
  ]);
  return (
    <>
      {areaSeries.length > 0 && areaBlocks.length === 50 && (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          width="99%"
          height={
            dims.height > 820
              ? "120%"
              : dims.height > 700
              ? "100%"
              : dims.height > 600
              ? "80%"
              : "60%"
          }
        />
      )}
    </>
  );
};
