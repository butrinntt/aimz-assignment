import UserStatistics from "./components/UserStatistics";

export default function UserCharts() {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-8 overflow-auto">
      <div className="w-9/12 max-xl:w-full mx-auto">
        <UserStatistics />
      </div>
    </div>
  );
}
