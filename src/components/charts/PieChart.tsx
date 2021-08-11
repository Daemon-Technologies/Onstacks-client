/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ReactApexChart from "react-apexcharts";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { randomColorGenerator } from "../../utils/helper";
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
  const dims = useWindowDimensions();
  const colorPalette = randomColorGenerator();
  return (
    <>
      {totalWinners.length > 0 &&
        winnerAddresses.length > 0 &&
        totalWinners.length === winnerAddresses.length && (
          <ReactApexChart
            options={{
              stroke: {
                show: true,
                colors: [themeMode.background],
              },
              title: {
                text: "Block reward distribution to miners (last 100 blocks)",
                align: "left",
                margin: 30,
                floating: false,
                style: {
                  fontSize: "14px",
                  fontWeight: 500,
                  color: themeMode.greyText,
                },
              },
              labels: winnerAddresses,
              plotOptions: {
                pie: {
                  expandOnClick: true,
                  customScale: dims.width > 800 ? 1 : 1.2,
                  donut: {
                    size: dims.width > 800 ? "90%" : "80%",
                    labels: {
                      show: true,
                      total: {
                        showAlways: true,
                        show: true,
                        fontSize: dims.width > 800 ? "16px" : "12px",
                        fontWeight: 500,
                        color: themeMode.greyText,
                        label: "Reward block",
                      },
                      name: {
                        show: true,
                        offsetY: dims.width > 800 ? -10 : 0,
                      },
                      value: {
                        fontWeight: 700,
                        color: themeMode.greyText,
                        show: true,
                        offsetY: dims.width > 800 ? 0 : -1,
                        fontSize: dims.width > 800 ? "25px" : "16px",
                      },
                    },
                  },
                },
              },
              legend: {
                fontSize: "12px",
                fontWeight: 500,
                offsetY: dims.width > 800 ? 10 : 20,
                position: dims.width > 800 ? "right" : "bottom",
                itemMargin: {
                  vertical: 2,
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
            height={dims.width > 800 ? "220" : "320"}
          />
        )}
    </>
  );
};
