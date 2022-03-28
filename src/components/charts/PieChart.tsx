/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart as PieCharts,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { randomColorGenerator } from "../../utils/helper";
import { truncateMiddle } from "../../utils/utils";
interface Props {
  theme: any;
  pieData: any;
}

export const PieChart: React.FC<Props> = ({ theme, pieData }) => {
  const [data, setData] = useState<any[]>([]);
  const COLORS = randomColorGenerator();
  const [value, setValue] = useState("100%");
  const dims = useWindowDimensions();
  useEffect(() => {
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
          onClick={(e: any) => {
            setValue((e.percent * 100).toFixed(0) + "%");
          }}
          onMouseOver={(e: any) => {
            setValue((e.percent * 100).toFixed(0) + "%");
          }}
          onMouseLeave={(e: any) => {
            setValue("100%");
          }}
          strokeWidth={0}
          fontWeight={500}
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          paddingAngle={1}
        >
          <Label y={100} value={value} fontWeight={800} position="centerTop" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        {dims.width > 700 && (
          <Legend
            layout="vertical"
            fontSize={14}
            verticalAlign="middle"
            align="right"
          />
        )}
        <Tooltip />
      </PieCharts>
    </ResponsiveContainer>
  );
};
