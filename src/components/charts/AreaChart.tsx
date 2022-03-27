// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart as AreaCharts,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useQuery } from "@apollo/client";
import { getBtcCommitsPerBlock } from "../../graphql/query/commitValue";
import { numFormatter } from "../../utils/helper";

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
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      console.log(payload, active, label);
      return (
        <div className="custom-tooltip">
          <div>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: "#5546FF",
              }}
            ></div>
            <p className="label">#{`${label}`}</p>
          </div>
          <p className="desc">{numFormatter(payload[0].value)}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <ResponsiveContainer width={"100%"} maxHeight={270} height={"100%"}>
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
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid vertical={false} />
        <Area
          type="linear"
          dataKey="sats"
          stroke="#5546FF"
          fill="rgba(85, 70, 255, 0.2)"
        />
      </AreaCharts>
    </ResponsiveContainer>
  );
};
