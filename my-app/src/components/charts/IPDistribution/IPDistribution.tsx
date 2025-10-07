import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface IPDistributionProps {
  data: Array<{ name: string; count: number }>;
}

const IPDistribution: React.FC<IPDistributionProps> = ({ data }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg lg:col-span-2">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        IP Address Distribution
      </h3>
      <ResponsiveContainer width="100%" height={700}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={90} />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IPDistribution;