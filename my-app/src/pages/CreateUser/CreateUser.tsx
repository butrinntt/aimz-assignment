import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import type { iUser, iUserCreateDto } from "../../types";
import { validateUser, type iValidation } from "../../utils";
import { Button, TextField } from "../../components";
import { useAppDispatch } from "../../hooks";
import { addUser } from "../../store";

function CreateUser() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const maxId: number = location.state?.maxId || 0;
  const [formData, setFormData] = useState<iUserCreateDto>({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    ip_address: "",
  });
  const [errors, setErrors] = useState<iValidation["errorMessages"]>({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    ip_address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    const newId = maxId + 1;
    const newUser: iUser = { id: newId, ...formData };
    dispatch(addUser(newUser));
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create New User
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 ml-12">
            Add a new user to the system by filling out the form below.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6"
            noValidate={true}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                error={errors.first_name}
                label="First Name *"
              />
              <TextField
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                error={errors.last_name}
                label="Last Name *"
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
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="e.g., Male, Female, Non-binary"
                error={errors.gender}
                label="Gender *"
              />
              <TextField
                name="ip_address"
                value={formData.ip_address}
                onChange={handleChange}
                placeholder="192.168.1.1"
                error={errors.ip_address}
                label="IP Address *"
              />
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
                className="px-6 py-2 bg-green-600 dark:bg-green-700 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <FaSave size={14} />
                Create User
              </Button>
            </div>
          </form>
        </div>
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-600 mb-2">
            Quick Tips
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-500 space-y-1">
            <li>• All fields marked with * are </li>
            <li>• Use valid email format (e.g., user@example.com)</li>
            <li>• IP address should be in IPv4 format (e.g., 192.168.1.1)</li>
            <li>
              • Gender can be any identity (Male, Female, Non-binary, etc.)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
