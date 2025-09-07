import React, { useState, useEffect, useCallback } from "react";
import { Plus, Edit, Trash2, Search, Mail, Phone, X, User } from "lucide-react";
import { variables } from "./Variables";
import apiService from "./services/api";

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentEmployee, setCurrentEmployee] = useState({
    EmployeeID: 0,
    EmployeeName: "",
    EmailId: "",
    Department: "",
    DOJ: "",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Fetch employees with pagination
  const fetchEmployees = useCallback(
    async (page = pagination.page, pageSize = pagination.pageSize) => {
      try {
        setIsLoading(true);
        const response = await apiService.getAllEmployees(page, pageSize);

        const {
          items,
          totalCount,
          page: responsePage,
          pageSize: responsePageSize,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        } = response;

        setEmployees(items || []);
        setPagination({
          page: responsePage || page,
          pageSize: responsePageSize || pageSize,
          totalCount: totalCount || 0,
          totalPages: totalPages || 1,
          hasNextPage: hasNextPage || false,
          hasPreviousPage: hasPreviousPage || false,
        });
        console.log("Successfully loaded", items);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      } finally {
        setIsLoading(false);
      }
    },
    [pagination.page, pagination.pageSize]
  );

  const fetchDepartments = async () => {
    try {
      setIsDepartmentsLoading(true);
      const data = await apiService.getAllDepartments();
      setDepartments(data);
      console.log("Successfully loaded", data.length, "departments");
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setIsDepartmentsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchEmployees(1, 10);
    fetchDepartments();
  }, []);

  // Filter employees based on search term
  const filteredEmployees = Array.isArray(employees)
    ? employees.filter(
        (emp) =>
          emp?.EmployeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp?.Department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp?.FirstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp?.LastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp?.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp?.EmailId?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await apiService.deleteEmployee(id);
        // Refresh current page after deletion
        await fetchEmployees();
        console.log("Employee deleted successfully");
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleAdd = () => {
    setCurrentEmployee({
      EmployeeID: 0,
      EmployeeName: "",
      EmailId: "",
      Department: "",
      DOJ: "",
    });
    setModalType("add");
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setCurrentEmployee({ ...employee });
    setModalType("edit");
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (modalType === "add") {
        await apiService.addEmployee(currentEmployee);
        console.log("Employee added successfully");
      } else {
        await apiService.updateEmployee(currentEmployee);
        console.log("Employee updated successfully");
      }
      await fetchEmployees();
      handleModalClose();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentEmployee({
      EmployeeID: 0,
      EmployeeName: "",
      EmailId: "",
      Department: "",
      DOJ: "",
    });
  };

  const handleInputChange = (field, value) => {
    setCurrentEmployee((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= pagination.totalPages &&
      newPage !== pagination.page
    ) {
      fetchEmployees(newPage, pagination.pageSize);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-bold text-gray-900">
          Employee Management
        </h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          <span>Add Employee</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading employees...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {employees.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No employees found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search or add a new employee
                </p>
              </div>
            ) : (
              <>
                <table className="min-w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Position
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Salary
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Joining Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.map((employee, index) => (
                      <tr
                        key={employee.EmployeeId || index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md">
                              <span className="text-sm font-bold text-white">
                                {employee.FirstName && employee.LastName
                                  ? employee.FirstName[0] + employee.LastName[0]
                                  : employee.EmployeeName}
                              </span>
                            </div>
                            <div className="ml-4 flex flex-col justify-center">
                              <div className="text-sm font-medium text-gray-900">
                                {employee.FirstName && employee.LastName
                                  ? `${employee.FirstName} ${employee.LastName}`
                                  : employee.EmployeeName || "Unknown"}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <Mail className="h-3 w-3 mr-1" />
                                {employee.Email || "No email"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {employee.DepartmentName || "No Department"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-900">
                            {employee.Position || "No Position"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                          {`₹ ${employee.Salary}` || "N/A"} 
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.HireDate
                            ? new Date(employee.HireDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center justify-center space-x-3">
                            <button
                              className="text-blue-600 hover:text-blue-900 hover:scale-110 transition-all"
                              onClick={() => handleEdit(employee)}
                              title="Edit employee"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 hover:scale-110 transition-all"
                              onClick={() => handleDelete(employee.EmployeeID)}
                              title="Delete employee"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Simple Pagination Controls */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1 || isLoading}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={
                        pagination.page >= pagination.totalPages || isLoading
                      }
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                          {employees.length > 0
                            ? (pagination.page - 1) * pagination.pageSize + 1
                            : 0}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            pagination.page * pagination.pageSize,
                            pagination.totalCount
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {pagination.totalCount}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => handlePageChange(pagination.page - 1)}
                          disabled={pagination.page <= 1 || isLoading}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Previous</span>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {[...Array(pagination.totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={isLoading}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              pagination.page === index + 1
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {index + 1}
                          </button>
                        ))}

                        <button
                          onClick={() => handlePageChange(pagination.page + 1)}
                          disabled={
                            pagination.page >= pagination.totalPages ||
                            isLoading
                          }
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Next</span>
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {modalType === "add" ? "Add New Employee" : "Edit Employee"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {modalType === "add"
                      ? "Enter employee information"
                      : "Update employee information"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleModalClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={currentEmployee.EmployeeName || ""}
                    onChange={(e) =>
                      handleInputChange("EmployeeName", e.target.value)
                    }
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      value={currentEmployee.EmailId || ""}
                      onChange={(e) =>
                        handleInputChange("EmailId", e.target.value)
                      }
                      placeholder="email@company.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={currentEmployee.Department || ""}
                    onChange={(e) =>
                      handleInputChange("Department", e.target.value)
                    }
                    required
                    disabled={isDepartmentsLoading}
                  >
                    <option value="">
                      {isDepartmentsLoading
                        ? "Loading departments..."
                        : "Select Department"}
                    </option>
                    {departments.map((dept) => (
                      <option
                        key={dept.DepartmentID}
                        value={dept.DepartmentName}
                      >
                        {dept.DepartmentName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Join Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    value={
                      currentEmployee.DOJ
                        ? currentEmployee.DOJ.split("T")[0]
                        : ""
                    }
                    onChange={(e) => handleInputChange("DOJ", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 px-8 py-6 bg-gray-50 rounded-b-2xl">
              <button
                type="button"
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-colors font-medium"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors font-medium shadow-lg"
                onClick={handleSave}
              >
                {modalType === "add" ? "Add Employee" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
