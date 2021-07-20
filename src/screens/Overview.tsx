import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { InfoCard } from "../components/InfoCard";
import ReactApexChart from "react-apexcharts";
import { AreaChart } from "../components/charts/AreaChart";
import { LineChart } from "../components/charts/LineChart";

export const Overview: React.FC = () => {
  const colorPalette = [
    "#FFA043",
    "#5542F6",
    "#00A5FF",
    "#20C9AC",
    "#FF4560",
    "#FA699D",
  ];
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 420);
  }, [toggle]);
  return (
    <>
      {toggle && <Header />}
      <div id="main">
        <p className="screen-title">Overview</p>
        <InfoCard />
      </div>
      <div id="content1">
        <AreaChart />
      </div>
      <div id="content2">
        <LineChart />
      </div>
      <div id="content3">
        <ReactApexChart
          options={{
            noData: {
              text: undefined,
            },
            dataLabels: {
              enabled: false,
            },
            colors: colorPalette,
          }}
          series={[44, 55, 41, 17, 15]}
          type="donut"
          width="60%"
          height="177"
        />
      </div>
      <div id="content4"></div>
    </>
  );
};
