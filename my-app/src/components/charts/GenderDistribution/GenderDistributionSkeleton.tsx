const GenderDistributionSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4 animate-pulse"></div>
      <div className="flex items-center justify-center mt-20 mr-4">
        <div className="flex-1 flex justify-center">
          <div className="w-52 h-52 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
        <ul className="flex flex-col gap-4">
          <li className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></li>
          <li className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></li>
          <li className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></li>
          <li className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></li>
          <li className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></li>
          <li className="w-40 h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></li>
        </ul>
      </div>
    </div>
  );
};

export default GenderDistributionSkeleton;
