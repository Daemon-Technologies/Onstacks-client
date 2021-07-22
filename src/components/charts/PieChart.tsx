import React from "react";
import ReactApexChart from "react-apexcharts";
import { lightTheme, darkTheme } from "../Themes";

interface Props {
  theme: any;
}

export const PieChart: React.FC<Props> = ({ theme }) => {
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
        labels: [
          "SP4VJD..UDH7SB",
          "SP4VJD..UDH7SB",
          "SP4VJD..UDH7SB",
          "SP4VJD..UDH7SB",
          "SP4VJD..UDH7SB",
        ],
        plotOptions: {
          pie: {
            customScale: 0.8,
            donut: {
              size: "85%",
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                  fontSize: "16px",
                  fontWeight: 500,
                  color: themeMode.greyText,
                  label: "Reward block",
                },
                name: {
                  show: true,
                },
                value: {
                  fontWeight: 700,
                  color: themeMode.greyText,
                  show: true,
                  fontSize: "25px",
                },
              },
            },
          },
        },
        legend: {
          fontSize: "12px",
          fontWeight: 500,
          offsetY: 20,
          position: "right",
          itemMargin: {
            vertical: 8,
          },
          labels: {
            colors: themeMode.text,
          },
        },

        dataLabels: {
          enabled: false,
        },
        colors: colorPalette,

        // dataLabels: {
        //   style: {
        //     colors: themeMode.te
        //   }
        // }
      }}
      series={[44, 55, 41, 17, 15]}
      type="donut"
      width="100%"
      height="100%"
    />
  );
};
