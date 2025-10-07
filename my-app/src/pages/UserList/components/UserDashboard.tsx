import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaRegTrashAlt,
  FaPencilAlt,
  FaDownload,
  FaUserPlus,
  FaFilter,
  FaArrowRight,
} from "react-icons/fa";
import { TbSelect } from "react-icons/tb";
import type { iUser } from "../../../types";
import { useDebounce, useFetch } from "../../../hooks";
import {
  Button,
  Checkbox,
  Modal,
  Pagination,
  Table,
  TableSkeleton,
  TextField,
} from "../../../components";
import { downloadCsv, sortData } from "../../../utils";

function UserDashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<iUser[]>([]);
  const { fetchCsvData } = useFetch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalBulk, setOpenModalBulk] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<iUser | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [genderFilter, setGenderFilter] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;
  const navigate = useNavigate();
  const location = useLocation();
  const [sortConfig, setSortConfig] = useState<{
    key: keyof iUser;
    direction: "asc" | "desc";
  } | null>(null);

  const columns = [
    {
      header: "#",
      key: "id" as keyof iUser,
      sortable: true,
      className: "w-16",
    },
    { header: "First Name", key: "first_name" as keyof iUser, sortable: true },
    { header: "Last Name", key: "last_name" as keyof iUser, sortable: true },
    { header: "Email", key: "email" as keyof iUser, sortable: true },
    {
      header: "Gender",
      key: "gender" as keyof iUser,
      sortable: true,
      className: "w-32",
    },
    {
      header: "IP Address",
      key: "ip_address" as keyof iUser,
      sortable: true,
      className: "w-40",
    },
    {
      header: "Actions",
      key: "actions" as keyof iUser,
      className: "flex align-middle justify-center text-center pr-0",
      sortable: false,
      render: (item: iUser) => (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex space-x-2">
            <Button
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded transition-colors"
              onClick={() =>
                navigate(`/edit-user/${item.id}`, {
                  state: { user: item, data },
                })
              }
            >
              <FaPencilAlt size={14} />
            </Button>
            <Button
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded transition-colors"
              onClick={() => handleDeleteClick(item)}
            >
              <FaRegTrashAlt size={14} />
            </Button>
            <Checkbox
              className="p-2"
              label=""
              checked={selectedIds.includes(item.id)}
              onChange={() => {
                if (selectedIds.includes(item.id)) {
                  setSelectedIds(selectedIds.filter((i) => i !== item.id));
                } else {
                  setSelectedIds([...selectedIds, item.id]);
                }
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  const handleSort = (key: keyof iUser) => {
    if (sortConfig?.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((user) => {
      setCurrentPage(1);
      const matchesSearch =
        user.first_name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        user.last_name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesGender =
        genderFilter === "All" || user.gender === genderFilter;

      return matchesSearch && matchesGender;
    });
  }, [data, debouncedSearchTerm, genderFilter]);

  const sortedData = useMemo(() => {
    return sortData(filteredData, sortConfig);
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  useEffect(() => {
    if (location.state?.updated) {
      setData(location.state.updated);
    } else {
      fetchCsvData("/mock_data.csv", setData);
    }
    setLoading(false);
  }, []);

  const handleDeleteClick = (user: iUser) => {
    setUserToDelete(user);
    setOpenModal(true);
  };

  const handleDeletBulkClick = () => {
    setOpenModalBulk(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      const updatedData = data.filter((u) => u.id !== userToDelete.id);
      setData(updatedData);
      setUserToDelete(null);
      setOpenModal(false);
      navigate(location.pathname, {
        state: { ...location.state, updated: updatedData },
        replace: true,
      });
    }
  };

  const confirmDeleteBulk = () => {
    if (selectedIds.length === 0) return;
    const updatedData = data.filter((u) => !selectedIds.includes(u.id));
    setData(updatedData);
    setSelectedIds([]);
    setOpenModalBulk(false);
    navigate(location.pathname, {
      state: { ...location.state, updated: updatedData },
      replace: true,
    });
  };

  const handleBulkExport = () => {
    const selectedUsers = data.filter((u) => selectedIds.includes(u.id));
    downloadCsv(selectedUsers, "selected_users.csv");
  };

  const selectAll = () => {
    if (selectedIds.length === 0) {
      setSelectedIds(filteredData.map((d) => d.id));
    } else {
      setSelectedIds([]);
    }
  };

  if (loading) {
    return <TableSkeleton columns={columns.length} className="mt-4" />;
  }

  return (
    <div className="grid gap-6 w-full p-4 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredData.length} user{filteredData.length !== 1 ? "s" : ""}{" "}
            found
            {selectedIds.length > 0 && ` • ${selectedIds.length} selected`}
          </p>
        </div>
        <Button
          onClick={() => {
            navigate("/user-charts");
          }}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <FaArrowRight size={14} />
          Go to Charts
        </Button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col gap-4 items-start justify-between">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => navigate("/create-user", { state: { data } })}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <FaUserPlus size={14} />
              Add User
            </Button>
            <Button
              onClick={() => downloadCsv(filteredData, "updated_users.csv")}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <FaDownload size={14} />
              Download CSV
            </Button>
            <Button
              onClick={selectAll}
              className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-700 dark:hover:bg-yellow-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <TbSelect size={18} />
              {filteredData.length === selectedIds.length
                ? "Deselect"
                : "Select"}{" "}
              All
            </Button>
            <Button
              onClick={handleDeletBulkClick}
              disabled={selectedIds.length === 0}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <FaRegTrashAlt size={14} />
              Delete Selected ({selectedIds.length})
            </Button>
            <Button
              onClick={handleBulkExport}
              disabled={selectedIds.length === 0}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <FaDownload size={14} />
              Export Selected ({selectedIds.length})
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto -mb-5">
            <div className="relative flex-1">
              <TextField
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full sm:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="relative flex-1">
              <div className="absolute mt-3.5 left-0 pl-3 pointer-events-none">
                <FaFilter
                  className="text-gray-400 dark:text-gray-500"
                  size={14}
                />
              </div>
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full sm:w-48 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Agender">Agender</option>
                <option value="Bigender">Bigender</option>
                <option value="Genderfluid">Genderfluid</option>
                <option value="Genderqueer">Genderqueer</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Polygender">Polygender</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table
          data={paginatedData}
          columns={columns}
          className="border-0"
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      )}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Confirm Delete"
        footer={
          <div className="flex justify-end gap-3 mr-5">
            <Button
              onClick={() => setOpenModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
            >
              Delete
            </Button>
          </div>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete{" "}
          <strong className="dark:text-white">
            {userToDelete?.first_name} {userToDelete?.last_name}
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>
      <Modal
        isOpen={openModalBulk}
        onClose={() => setOpenModalBulk(false)}
        title="Confirm Bulk Delete"
        footer={
          <div className="flex justify-end gap-3 mr-5">
            <Button
              onClick={() => setOpenModalBulk(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteBulk}
              className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
            >
              Delete {selectedIds.length} User
              {selectedIds.length !== 1 ? "s" : ""}
            </Button>
          </div>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete{" "}
          <strong className="dark:text-white">
            {selectedIds.length} selected users
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}

export default UserDashboard;
