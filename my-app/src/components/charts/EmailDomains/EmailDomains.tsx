import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface EmailDomainsProps {
  data: Array<{ name: string; count: number }>;
}

const EmailDomains: React.FC<EmailDomainsProps> = ({ data }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Top Email Domains
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmailDomains;
