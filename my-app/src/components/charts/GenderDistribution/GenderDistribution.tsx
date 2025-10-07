import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  type LegendPayload,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

interface GenderDistributionProps {
  data: Array<{ name: string; value: number }>;
}

const GenderDistribution: React.FC<GenderDistributionProps> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Gender Distribution
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="55%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{
              paddingLeft: "20px",
              right: 0,
            }}
            formatter={(value, entry: LegendPayload) => {
              return (
                <span className="text-gray-700 dark:text-gray-300">
                  {value}: {entry.payload?.value} (
                  {((entry.payload?.value / total) * 100).toFixed(2)}%)
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderDistribution;
