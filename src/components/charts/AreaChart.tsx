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
import { useQuery } from "@apollo/client";
import { getBtcCommitsPerBlock } from "../../graphql/query/commitValue";

interface Props {
  theme: any;
}

export const AreaChart: React.FC<Props> = ({ theme }) => {
  const [dataa, setData] = useState<any[][]>([]);
  const { data } = useQuery(getBtcCommitsPerBlock);

  useEffect(() => {
    if (data) {
      setData(
        data.block_info.map((v: any) => {
          return {
            sats: v.totalSpent.aggregate.sum.commit_value,
            pv: v.stacks_block_height,
            name: v.stacks_block_height,
          };
        })
      );
    }
  }, [data]);

  return (
    <ResponsiveContainer width={"100%"} maxHeight={270} height={"90%"}>
      <AreaCharts
        data={dataa}
        margin={{ top: 30, right: 30, left: 10, bottom: 0 }}
      >
        <XAxis dy={10} fontSize={12} dataKey="name" />
        <YAxis
          tickFormatter={(tick) => {
            return tick.toLocaleString();
          }}
          fontSize={12}
        />
        <Tooltip />
        <Area type="linear" dataKey="sats" stroke="#5546FF" fill="#bbb7fe" />
      </AreaCharts>
    </ResponsiveContainer>
  );
};
