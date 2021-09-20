/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ResponsiveCalendar } from "@nivo/calendar";

interface Props {
  blocks: any;
}

export const CalendarChart: React.FC<Props> = ({ blocks }) => {
  return (
    <ResponsiveCalendar
      data={blocks}
      from="2015-03-01"
      to="2016-07-12"
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={50}
      yearLegendPosition="after"
      yearLegendOffset={33}
      monthBorderColor="#ffffff"
      monthLegendPosition="after"
      monthLegendOffset={13}
      daySpacing={1}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};
