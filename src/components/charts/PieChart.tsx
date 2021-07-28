import React from "react";
import ReactApexChart from "react-apexcharts";
import { lightTheme, darkTheme } from "../Themes";

interface Props {
  theme: any;
  winnerAddresses: string[];
  totalWinners: number[];
}

export const PieChart: React.FC<Props> = ({
  theme,
  totalWinners,
  winnerAddresses,
}) => {
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const colorPalette = [
    "#FFA043",
    "#5542F6",
    "#00A5FF",
    "#20C9AC",
    "#FF4560",
    "#FA699D",
  ];
  return (
    <ReactApexChart
      options={{
        stroke: {
          show: true,
          colors: [themeMode.background],
        },
        title: {
          text: "Block reward distribution to miners (last 100 blocks)",
          align: "left",
          margin: 10,
          floating: false,
          style: {
            fontSize: "14px",
            fontWeight: 500,
            color: themeMode.greyText,
          },
        },
        labels: winnerAddresses.map((address) => {
          return (
            address.substring(0, 6) +
            ".." +
            address.substring(address.length - 6, address.length - 1)
          );
        }),
        plotOptions: {
          pie: {
            expandOnClick: true,
            customScale: window.innerWidth > 600 ? 1 : 1.2,
            donut: {
              size: window.innerWidth > 600 ? "90%" : "80%",
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                  fontSize: window.innerWidth > 600 ? "16px" : "12px",
                  fontWeight: 500,
                  color: themeMode.greyText,
                  label: "Reward block",
                },
                name: {
                  show: true,
                  offsetY: window.innerWidth > 600 ? -10 : 0,
                },
                value: {
                  fontWeight: 700,
                  color: themeMode.greyText,
                  show: true,
                  offsetY: window.innerWidth > 600 ? 0 : -1,
                  fontSize: window.innerWidth > 600 ? "25px" : "16px",
                },
              },
            },
          },
        },
        legend: {
          fontSize: "12px",
          fontWeight: 500,
          offsetY: 20,
          position: window.innerWidth > 600 ? "right" : "bottom",
          itemMargin: {
            vertical: 3,
          },
          labels: {
            colors: themeMode.text,
          },
        },

        dataLabels: {
          enabled: false,
        },
        colors: colorPalette,
      }}
      series={totalWinners}
      type="donut"
      width="90%"
      height="100%"
    />
  );
};
