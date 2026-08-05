import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function SalesChart({ data, xKey = "label", dataKey = "sales" }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
 <BarChart
    data={data}
    margin={{
        top:20,
        right:20,
        left:25,
        bottom:10,
    }}
    barCategoryGap="35%"
>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        <XAxis
    dataKey={xKey}
    tick={{ fontSize: 13 }}
    tickLine={false}
    axisLine={false}
/>
<YAxis
    width={50}
    tick={{ fontSize: 12 }}
    tickFormatter={(value) =>
        value >= 1000 ? `${value / 1000}k` : value
    }
/>

        <Tooltip />

        <Bar
  dataKey={dataKey}
  fill="#ff6b35"
  radius={[10, 10, 0, 0]}
  barSize={28}
  maxBarSize={35}
/>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SalesChart;