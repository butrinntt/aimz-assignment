const IPDistributionSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg lg:col-span-2">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4 animate-pulse"></div>
      <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    </div>
  );
};

export default IPDistributionSkeleton;