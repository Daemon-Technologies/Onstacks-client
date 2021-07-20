import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const LineChart: React.FC = () => {
  const colorPalette = [
    "#FFA043",
    "#5542F6",
    "#00A5FF",
    "#20C9AC",
    "#FF4560",
    "#FA699D",
  ];
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
    colors: colorPalette,
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 25, 50, 49, 21, 70, 51],
    },
    {
      name: "series-2",
      data: [50, 20, 45, 30, 29, 11, 20, 41],
    },
    {
      name: "series-3",
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
