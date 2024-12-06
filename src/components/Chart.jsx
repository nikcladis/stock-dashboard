import { useState } from "react";
import Card from "@components/Card";
import { mockHistoricalData } from "@constants/mock";
import { convertDateToUnixTimestamp } from "@helpers/date-helper";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = () => {
  const [data, setData] = useState(mockHistoricalData);
  const [filter, setFilter] = useState("1W");

  const formatData = () =>
    data.c
      .map((item, index) => {
        const date = new Date(data.t[index]);
        return isNaN(date.getTime())
          ? null
          : { value: item.toFixed(2), date: convertDateToUnixTimestamp(date) };
      })
      .filter(Boolean);

  return (
    <Card>
      <ResponsiveContainer>
        <AreaChart data={formatData(data)}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="rgb(199 210 254)"
                stopOpacity={0.8}
              />
              <stop offset="95%" stopColor="rgb(199 210 254)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#312e81"
            fill="url(#chartColor)"
            fillOpacity={1}
            strokeWidth={0.5}
          />
          <Tooltip />
          <XAxis dataKey={"date"} />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
