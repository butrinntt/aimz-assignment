import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector, useFetch } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import type { iUser } from "../../../types";
import {
  Button,
  EmailDomains,
  EmailDomainsSkeleton,
  GenderDistribution,
  GenderDistributionSkeleton,
  IPDistribution,
  IPDistributionSkeleton,
} from "../../../components";
import { setError, setLoading, setUsers } from "../../../store";

const UserStatistics = () => {
  const { users, loading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const { fetchCsvData } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (users.length === 0) {
        try {
          dispatch(setLoading(true));
          const data = await fetchCsvData<iUser>("/mock_data.csv");
          if (data) {
            dispatch(setUsers(data));
          }
        } catch (error) {
          console.error(error);
          dispatch(setError("Failed to fetch users"));
        } finally {
          dispatch(setLoading(false));
        }
      }
    };
    fetchUsers();
  }, [dispatch, fetchCsvData, users.length]);

  const genderStats = useMemo(() => {
    return Object.entries(
      users.reduce((acc, user) => {
        acc[user.gender] = (acc[user.gender] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));
  }, [users]);

  const emailDomains = useMemo(() => {
    const domains = users.reduce((acc, user) => {
      const domain = user.email.split("@")[1];
      acc[domain] = (acc[domain] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(domains)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [users]);

  const ipDistribution = useMemo(() => {
    return Object.entries(
      users.reduce((acc, user) => {
        const firstOctet = user.ip_address.split(".")[0];
        const range = `${firstOctet}.x.x.x`;
        acc[range] = (acc[range] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    )
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
  }, [users]);

  return (
    <div className="grid gap-6 w-full p-4 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Charts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {loading
              ? "Loading..."
              : `${users.length} user${users.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <FaArrowLeft size={14} />
          Back to Dashboard
        </Button>
      </div>

      <div className="min-h-full w-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        {loading ? (
          <GenderDistributionSkeleton />
        ) : (
          <GenderDistribution data={genderStats} />
        )}
        {loading ? (
          <EmailDomainsSkeleton />
        ) : (
          <EmailDomains data={emailDomains} />
        )}
        {loading ? (
          <IPDistributionSkeleton />
        ) : (
          <IPDistribution data={ipDistribution} />
        )}
      </div>
    </div>
  );
};

export default UserStatistics;
