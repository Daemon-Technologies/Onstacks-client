import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const AreaChart: React.FC = () => {
  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
    title: {
      text: "Total Sats Commited",
      align: "left",
      margin: 10,
      floating: false,
      style: {
        fontSize: "14px",
        fontFamily: undefined,
        color: "##84818A",
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
        color: "##84818A",
      },
    },
    yaxis: {
      show: false,
    },
    colors: ["#FFA043"],
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
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
