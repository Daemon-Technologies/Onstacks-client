import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { format } from "../../utils/helper";
import { SatsCommittedProps } from "../../hooks/useOverview";
import { darkTheme, lightTheme } from "../Themes";

interface Props {
  theme: any;
  satsCommitted: SatsCommittedProps;
}

export const AreaChart: React.FC<Props> = ({ theme, satsCommitted }) => {
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
    markers: {
      size: 0,
      width: 0,
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      redrawOnParentResize: true,
      toolbar: {
        autoSelected: "pan",
        show: false,
      },
      width: "100%",
    },
    xaxis: {
      tooltip: {
        enabled: false,
      },
      tickAmount: 5,
      type: "numeric",
      categories: satsCommitted.block_number,
      decimalsInFloat: 0,
      labels: {
        style: {
          colors: themeMode.text,
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#FFA043"],
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
      show: true,
      tickAmount: 3,
      labels: {
        formatter: (val) => format(val),
      },
    },
    colors: ["#FFCE74"],
  });

  const [series] = useState([
    {
      name: "",
      data: satsCommitted.total_sats_committed,
    },
  ]);
  useEffect(() => {
    setOptions((data) => ({
      ...data,
      tooltip: {
        theme,
      },
      chart: {
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
        xaxis: {
          min: satsCommitted.block_number[0],
          range: 5,
          max: satsCommitted.block_number[
            satsCommitted.block_number.length - 1
          ],
        },
        width: "100%",
        redrawOnParentResize: false,
      },
      subtitle: { style: { color: themeMode.text } },
      title: { style: { color: themeMode.greyText } },
      xaxis: {
        tickAmount: 5,
        type: "numeric",
        min: satsCommitted.block_number[0],
        range: 49,
        max: satsCommitted.block_number[satsCommitted.block_number.length - 1],
        labels: { style: { colors: themeMode.text } },
        categories: satsCommitted.block_number,
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
  }, [
    theme,
    themeMode.greyText,
    themeMode.text,
    satsCommitted.total_sats_committed,
    satsCommitted.block_number,
  ]);
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      width="99%"
      height="95%"
    />
  );
};
