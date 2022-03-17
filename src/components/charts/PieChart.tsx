/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart as PieCharts,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { randomColorGenerator } from "../../utils/helper";
import { truncateMiddle } from "../../utils/utils";
interface Props {
  theme: any;
  pieData: any;
}

export const PieChart: React.FC<Props> = ({ theme, pieData }) => {
  const [data, setData] = useState<any[]>([]);
  const COLORS = randomColorGenerator();
  useEffect(() => {
    console.log(pieData);
    const pie = Object.entries(pieData);
    setData(
      pie.map((x) => {
        return {
          name: truncateMiddle(x[0], 6),
          value: x[1],
        };
      })
    );
  }, [pieData]);

  console.log(data);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieCharts width={400} height={400}>
        <Pie
          legendType={"square"}
          data={data}
          dataKey="value"
          isAnimationActive={false}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={60}
          fill="#8884d8"
          paddingAngle={1}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        <Tooltip />
      </PieCharts>
    </ResponsiveContainer>
  );
};
