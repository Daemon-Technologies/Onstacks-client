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
        labels: [
          "SP4VJD..UDH7SB",
          "SP4VJD..UDH7SB",
          "SP4VJD..UDH7SB",
          "SP4VJD..UDH7SB",
          "SP4VJD..UDH7SB",
        ],
        plotOptions: {
          pie: {
            customScale: 1,
            donut: {
              labels: {
                show: true,
                name: {
                  show: false,
                },
                value: {
                  fontWeight: 600,
                },
              },
            },
          },
        },
        legend: {
          labels: {
            colors: themeMode.text,
          },
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
      height="200"
    />
  );
};
