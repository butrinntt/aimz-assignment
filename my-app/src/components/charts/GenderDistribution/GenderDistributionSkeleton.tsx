const GenderDistributionSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4 animate-pulse"></div>
      <div className="flex items-center justify-center">
        <div className="w-64 h-64 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default GenderDistributionSkeleton;
