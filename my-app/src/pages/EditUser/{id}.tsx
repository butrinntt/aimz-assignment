import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaSave, FaUserEdit } from "react-icons/fa";
import { validateUser, type iValidation } from "../../utils";
import type { iUser } from "../../types";
import { Button, TextField } from "../../components";
import { useAppDispatch } from "../../hooks";
import { updateUser } from "../../store";

function EditUser() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = Number(id);
  const existingUser: iUser | undefined = state?.user;
  const [formData, setFormData] = useState<iUser | null>(null);
  const [errors, setErrors] = useState<iValidation["errorMessages"]>({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    ip_address: "",
  });

  useEffect(() => {
    if (existingUser) {
      setFormData(existingUser);
    }
  }, [existingUser, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
    if (errors[name as keyof iValidation["errorMessages"]]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    const validation = validateUser(formData);
    setErrors(validation.errorMessages);
    if (validation.hasError) return;
    dispatch(updateUser(formData));
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <FaUserEdit size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            User Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The user you're trying to edit doesn't exist or has been removed.
          </p>
          <Button
            onClick={handleCancel}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Button
              onClick={handleCancel}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors"
            >
              <FaArrowLeft size={16} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Edit User
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Editing: {formData.first_name} {formData.last_name}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                error={errors.first_name}
                label="First Name *"
                required
              />
              <TextField
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                error={errors.last_name}
                label="Last Name *"
                required
              />
            </div>

            <TextField
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              error={errors.email}
              label="Email Address *"
              type="email"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="e.g., Male, Female, Non-binary"
                error={errors.gender}
                label="Gender *"
                required
              />
              <TextField
                name="ip_address"
                value={formData.ip_address}
                onChange={handleChange}
                placeholder="192.168.1.1"
                error={errors.ip_address}
                label="IP Address *"
                required
              />
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                User ID
              </label>
              <input
                type="text"
                value={formData.id}
                disabled
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-md border border-gray-300 dark:border-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                User ID cannot be changed
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <FaSave size={14} />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-600 mb-2">
            Editing User
          </h3>
          <ul className="text-sm text-yellow-700 dark:text-yellow-500 space-y-1">
            <li>• All fields marked with * are required</li>
            <li>• Changes will be reflected immediately in the dashboard</li>
            <li>• User ID cannot be modified</li>
            <li>• Ensure email format is valid (e.g., user@example.com)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
