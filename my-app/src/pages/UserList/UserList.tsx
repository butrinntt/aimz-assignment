import UserDashboard from "./components/UserDashboard";

export default function Dashboard() {
  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-gray-900 py-8">
      <div className="w-7/12 max-xl:w-full mx-auto">
        <UserDashboard />
      </div>
    </div>
  );
}
