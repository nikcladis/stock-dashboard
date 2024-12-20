import Card from "@components/Card";
import { useContext, useState } from "react";
import { chartConfig } from "@constants/config";
import ChartFilter from "@components/ChartFilter";
import ThemeContext from "@contexts/ThemeContext";
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

  const { darkMode } = useContext(ThemeContext);

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
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => setFilter(item)}
              />
            </li>
          );
        })}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={formatData(data)}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkMode ? "#312e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
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
          <Tooltip
            contentStyle={darkMode ? { background: "#111827" } : null}
            itemStyle={darkMode ? { color: "#818cf8" } : null}
          />
          <XAxis dataKey={"date"} />
          <YAxis domain={["dataMin", "dataMax"]} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
