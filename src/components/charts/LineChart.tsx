// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart as AreaCharts,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getRecentBlockCommits } from "../../graphql/query/block";
import { useQuery } from "@apollo/client";
import { randomColorGenerator } from "../../utils/helper";
import { truncateMiddle } from "../../utils/utils";

interface Props {
  theme: any;
  setPieData?: any;
}

export const LineChart: React.FC<Props> = ({ theme, setPieData }) => {
  const [dataa, setData] = useState<any[]>([]);
  const colors = randomColorGenerator();
  const { data } = useQuery(getRecentBlockCommits);
  const [elements, setElements] = useState([]);

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
      setElements(
        data.blocks[0].commits.map((element: any) => {
          return truncateMiddle(element.address, 6);
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={"90%"}>
      <AreaCharts
        data={dataa}
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
        {elements.map((v: any, i: number) => {
          return (
            <Area
              type="monotone"
              dataKey={v}
              stackId={1}
              stroke={colors[i]}
              fill={colors[i]}
            />
          );
        })}
      </AreaCharts>
    </ResponsiveContainer>
  );
};
