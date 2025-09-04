import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Mail, Phone, X, User } from 'lucide-react';
import { variables } from './Variables';

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentEmployee, setCurrentEmployee] = useState({
    EmployeeID: 0,
    EmployeeName: '',
    EmailId: '',
    // Phone: '',
    Department: '',
    // Position: '',
    DOJ: '',
    // Salary: ''
  });

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(variables.API_URL + 'employee/GetEmployee');
      // const response = await fetch(variables.API_URL + 'EmployeeNew');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      // Handle error (show notification, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      setIsDepartmentsLoading(true);
      const response = await fetch(variables.API_URL + 'department/GetDepartment'); // Update with your actual endpoint
      //const response = await fetch(variables.API_URL + 'DepartmentNew'); // Update with your actual endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      // Handle error (show notification, etc.)
    } finally {
      setIsDepartmentsLoading(false);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.EmployeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.Department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(variables.API_URL + 'employee/DeleteEmployee?id=' + id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        console.log("Response is : ", response);
        if (!response.ok) {
          throw new Error('Failed to delete employee');
        }

        // Remove from local state
        setEmployees(prev => prev.filter(emp => emp.EmployeeID !== id));

        // Optional: Show success message
        console.log('Employee deleted successfully');
      } catch (error) {
        console.error('Error deleting employee:', error);
        // Handle error (show notification, etc.)
      }
    }
  };

  const handleAdd = () => {
    setCurrentEmployee({
      EmployeeID: 0,
      EmployeeName: '',
      EmailId: '',
      // Phone: '',
      Department: '',
      // Position: '',
      DOJ: '',
      // Salary: ''
    });
    setModalType('add');
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setCurrentEmployee({ ...employee });
    setModalType('edit');
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      let response;

      if (modalType === 'add') {
        // Add new employee
        response = await fetch(variables.API_URL + 'employee/AddEmployee', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(currentEmployee)
        });

        if (!response.ok) {
          throw new Error('Failed to add employee');
        }
        const newEmployee = await response.json();
        setEmployees(prev => [...prev, newEmployee]);
        console.log('Employee added successfully');

      } else {
        // Update existing employee
        response = await fetch(variables.API_URL + 'employee/UpdateEmployee', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(currentEmployee)
        });

        if (!response.ok) {
          throw new Error('Failed to update employee');
        }

        setEmployees(prev =>
          prev.map(emp =>
            emp.EmployeeID === currentEmployee.EmployeeID ? currentEmployee : emp
          )
        );
        console.log('Employee updated successfully');
      }
      await fetchEmployees();
      handleModalClose();

    } catch (error) {
      console.error('Error saving employee:', error);
      // Handle error (show notification, etc.)
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentEmployee({
      EmployeeID: 0,
      EmployeeName: '',
      EmailId: '',
      // Phone: '',
      Department: '',
      // Position: '',
      DOJ: '',
      // Salary: ''
    });
  };

  const handleInputChange = (field, value) => {
    setCurrentEmployee(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-bold text-gray-900">Employee</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-3 flex items-center space-x-2 transition-colors shadow-lg hover:shadow-xl"
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
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-12">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No employees found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or add a new employee</p>
              </div>
            ) : (
              <table className="min-w-full">
                <thead className="bg-black" style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider flex justify-start ml-30">Employee</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Joining Date</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.EmployeeID} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td className="px-6 py-3 whitespace-nowrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md">
                            <span className="text-sm font-bold text-white">
                              {employee.EmployeeName?.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.EmployeeName}</div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <Mail className="h-3 w-3 mr-1" />
                              {employee.EmailId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {employee.Department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.DOJ ? employee.DOJ.split('T')[0] : 'N/A'}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center justify-center space-x-3 gap-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 hover:scale-110 transition-all"
                            onClick={() => handleEdit(employee)}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 hover:scale-110 transition-all"
                            onClick={() => handleDelete(employee.EmployeeID)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Enhanced Modal for Add/Edit */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <User className="h-10 w-10 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-0">
                          {modalType === 'add' ? 'Add New Employee' : 'Edit Employee'}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {modalType === 'add' ? 'Enter employee information' : 'Update employee information'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleModalClose}
                      className="p-2 hover:bg-gray-100 rounded-5 transition-colors"
                    >
                      <X className="h-6 w-6 text-gray-400" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="px-8 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Employee Name */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          value={currentEmployee.EmployeeName || ''}
                          onChange={(e) => handleInputChange('EmployeeName', e.target.value)}
                          placeholder="Enter full name"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={currentEmployee.EmailId || ''}
                            onChange={(e) => handleInputChange('EmailId', e.target.value)}
                            placeholder="email@company.com"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={currentEmployee.Phone || ''}
                            onChange={(e) => handleInputChange('Phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div> */}

                      {/* Department */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department *
                        </label>
                        <select
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          value={currentEmployee.Department || ''}
                          onChange={(e) => handleInputChange('Department', e.target.value)}
                          required
                          disabled={isDepartmentsLoading}
                        >
                          <option value="">
                            {isDepartmentsLoading ? 'Loading departments...' : 'Select Department'}
                          </option>
                          {departments.map((dept) => (
                            <option key={dept.DepartmentID} value={dept.DepartmentName}>
                              {dept.DepartmentName}
                            </option>
                          ))}
                        </select>
                        {isDepartmentsLoading && (
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                            Loading departments...
                          </div>
                        )}
                      </div>

                      {/* Position */}
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Position *
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          value={currentEmployee.Position || ''}
                          onChange={(e) => handleInputChange('Position', e.target.value)}
                          placeholder="Job title"
                          required
                        />
                      </div> */}

                      {/* Join Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Join Date *
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          value={currentEmployee.DOJ ? currentEmployee.DOJ.split('T')[0] : ''}
                          onChange={(e) => handleInputChange('DOJ', e.target.value)}
                          required
                        />
                      </div>

                      {/* Salary */}
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Salary
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-3.5 text-gray-400 font-medium">$</span>
                          <input
                            type="number"
                            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={currentEmployee.Salary || ''}
                            onChange={(e) => handleInputChange('Salary', e.target.value)}
                            placeholder="50000"
                            min="0"
                            step="1000"
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex items-center justify-end space-x-4 px-8 py-4 gap-3 bg-gray-50 rounded-b-2xl">
                    <button
                      type="button"
                      className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-3 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-colors font-medium"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-8 py-3 bg-blue-600 text-white rounded-3 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors font-medium shadow-lg"
                      onClick={handleSave}
                    >
                      {modalType === 'add' ? 'Add Employee' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee;