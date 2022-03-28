// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { getRecentBlockCommits } from "../../graphql/query/block";
import { useQuery } from "@apollo/client";
import { randomColorGenerator } from "../../utils/helper";
import { truncateMiddle } from "../../utils/utils";
import useWindowDimensions from "../../hooks/useWindowDimension";

interface Props {
  theme: any;
  setPieData?: any;
}

export const LineChart: React.FC<Props> = ({ theme, setPieData }) => {
  const [dataa, setData] = useState<any[]>([]);
  const colors = randomColorGenerator();
  const { data } = useQuery(getRecentBlockCommits);
  const [elements, setElements] = useState([]);
  const dims = useWindowDimensions();

  useEffect(() => {
    if (data) {
      const x: any = {};
      data.blocks.forEach((element: any) => {
        x[element.winner_stx_address] =
          element.block_reward +
          (x[element.winner_stx_address] ? x[element.winner_stx_address] : 0);
      });
      if (setPieData) {
        setPieData(x);
      }
      setData(
        data.blocks.map((v: any) => {
          return {
            // eslint-disable-next-line no-sequences
            ...v.commits.reduce(
              (obj: any, item: any) => (
                // eslint-disable-next-line no-sequences
                (obj[truncateMiddle(item.address, 6)] = item.value), obj
              ),
              {}
            ),
            name: v.stacksBlockHeight,
          };
        })
      );
      const miners = data.blocks[0].commits.map((element: any) => {
        return truncateMiddle(element.address, 6);
      });
      const minerso = data.blocks[30].commits.map((element: any) => {
        return truncateMiddle(element.address, 6);
      });
      setElements(miners.length > minerso.length ? miners : minerso);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <BarChart
        data={dataa.slice(0, dims.width > 700 ? 30 : 12)}
        barSize={12}
        barGap={10}
        margin={{
          top: 30,
          right: 30,
          left: 10,
          bottom: 0,
        }}
      >
        <XAxis dy={10} fontSize={12} dataKey="name" />
        <YAxis
          tickFormatter={(tick) => {
            return tick.toLocaleString();
          }}
          fontSize={12}
        />
        <Tooltip
          labelStyle={{ fontSize: 14, fontWeight: 600 }}
          contentStyle={{ fontSize: 14, fontWeight: 600 }}
        />
        <CartesianGrid />
        {elements.map((v: any, i: number) => {
          if (elements.length - 1 === i) {
            return (
              <Bar
                dataKey={v}
                stackId={1}
                radius={[4, 4, 0, 0]}
                stroke={colors[i]}
                fill={colors[i]}
              />
            );
          } else {
            return (
              <Bar
                dataKey={v}
                stackId={1}
                stroke={colors[i]}
                fill={colors[i]}
              />
            );
          }
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};
