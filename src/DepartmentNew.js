import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Save, X, Eye, Users, IndianRupee, Building2, Calendar, User } from 'lucide-react';
import apiService from './services/api';

const DepartmentNew = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({
    departmentId: '',
    name: '',
    description: '',
    managerId: '',
    managerName: '',
    budget: '',
    employeeCount: 0,
    createdAt: '',
    updatedAt: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    filterDepartments();
  }, [searchTerm, departments]);

  const loadDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await apiService.getAllDepartments();
      setTimeout(() => {
        setDepartments(response);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error loading departments:', error);
      setIsLoading(false);
    }
  };

  const filterDepartments = () => {
    if (!searchTerm) {
      setFilteredDepartments(departments);
    } else {
      const filtered = departments.filter(dept =>
        dept.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dept.ManagerName && dept.ManagerName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredDepartments(filtered);
    }
  };

  const openModal = (mode, department = null) => {
    setModalMode(mode);
    setSelectedDepartment(department);
    setErrors({});

    if (mode === 'add') {
      setFormData({
        departmentId: '',
        name: '',
        description: '',
        managerId: '',
        managerName: '',
        budget: '',
        employeeCount: 0,
        createdAt: '',
        updatedAt: ''
      });
    } else if (department) {
      setFormData({
        departmentId: department.DepartmentId,
        name: department.Name,
        description: department.Description,
        managerId: department.ManagerId,
        managerName: department.ManagerName || '',
        budget: department.Budget,
        employeeCount: department.EmployeeCount,
        createdAt: department.CreatedAt,
        updatedAt: department.UpdatedAt
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDepartment(null);
    setFormData({});
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Department name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = 'Budget must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const departmentData = {
        DepartmentId: formData.departmentId,
        Name: formData.name,
        Description: formData.description,
        ManagerId: formData.managerId || null,
        ManagerName: formData.managerName || null,
        Budget: parseFloat(formData.budget),
        EmployeeCount: parseInt(formData.employeeCount) || 0,
        CreatedAt: modalMode === 'add' ? new Date().toISOString() : formData.createdAt,
        UpdatedAt: new Date().toISOString()
      };

      if (modalMode === 'add') {
        // Replace with actual API call
        // const response = await fetch('/api/departments', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(departmentData)
        // });

        departmentData.DepartmentId = Math.max(...departments.map(d => d.DepartmentId)) + 1;
        setDepartments(prev => [...prev, departmentData]);
      } else {
        // Replace with actual API call
        // const response = await fetch(`/api/departments/${formData.departmentId}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(departmentData)
        // });

        setDepartments(prev => prev.map(dept =>
          dept.DepartmentId === formData.departmentId ? departmentData : dept
        ));
      }

      setTimeout(() => {
        closeModal();
        setIsLoading(false);
      }, 600);
    } catch (error) {
      console.error('Error saving department:', error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (departmentId) => {
    if (!window.confirm('Are you sure you want to delete this department?')) return;

    setIsLoading(true);
    try {
      // Replace with actual API call
      // await fetch(`/api/departments/${departmentId}`, { method: 'DELETE' });

      setTimeout(() => {
        setDepartments(prev => prev.filter(dept => dept.DepartmentId !== departmentId));
        setIsLoading(false);
      }, 400);
    } catch (error) {
      console.error('Error deleting department:', error);
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  const getBudgetColor = (budget) => {
    if (budget >= 1000000) return 'text-emerald-600 bg-emerald-50';
    if (budget >= 800000) return 'text-blue-600 bg-blue-50';
    return 'text-orange-600 bg-orange-50';
  };

  const getEmployeeCountColor = (count) => {
    if (count >= 15) return 'text-purple-600 bg-purple-50';
    if (count >= 10) return 'text-indigo-600 bg-indigo-50';
    return 'text-pink-600 bg-pink-50';
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Department Management
              </h2>
            </div>
            <button
              onClick={() => openModal('add')}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-5 flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus className='h-5 w-5' />
              <span className="font-medium">Add Department</span>
            </button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md bg-white border border-gray-100 rounded-lg shadow-sm">
              <Search className="absolute left-4 top-5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Departments</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">{departments.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Employees</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {departments.reduce((sum, dept) => sum + dept.EmployeeCount, 0)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Budget</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {formatCurrency(departments.reduce((sum, dept) => sum + dept.Budget, 0))}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <IndianRupee className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Budget</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {departments.length > 0 ? formatCurrency(departments.reduce((sum, dept) => sum + dept.Budget, 0) / departments.length) : '$0'}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <IndianRupee className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Department Cards */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDepartments.map((department) => (
              <div key={department.DepartmentId} className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full opacity-50 transform translate-x-16 -translate-y-16"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {department.Name}
                      </h3>
                      {/* <p className="text-gray-600 text-sm text-base leading-relaxed line-clamp-1">{department.Description}</p> */}
                    </div>
                    <div className="flex gap-1 ml-4">
                      <button
                        onClick={() => openModal('view', department)}
                        className="p-2 text-blue-500 hover:text-blue-900 hover:bg-blue-100 rounded-5 transition-all duration-200 transform hover:scale-110"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => openModal('edit', department)}
                        className="p-2 text-emerald-500 hover:text-emerald-900 hover:bg-emerald-100 rounded-5 transition-all duration-200 transform hover:scale-110"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(department.DepartmentId)}
                        className="p-2 text-red-500 hover:text-red-900 hover:bg-red-100 rounded-5 transition-all duration-200 transform hover:scale-110"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {department.ManagerName && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="p-1.5 bg-green-100 rounded-5">
                          <User className="text-green-600" size={14} />
                        </div>
                        <span className="text-gray-600">Manager:</span>
                        <span className="font-medium text-gray-900">{department.ManagerName}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getBudgetColor(department.Budget)}`}>
                        <IndianRupee size={16} />
                        <div>
                          <p className="text-xs font-medium opacity-75">Budget</p>
                          <p className="font-bold text-sm">{department.Budget}</p>
                        </div>
                      </div>

                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getEmployeeCountColor(department.EmployeeCount)}`}>
                        <Users size={16} />
                        <div>
                          <p className="text-xs font-medium opacity-75">Employees</p>
                          <p className="font-bold text-sm">{department.EmployeeCount}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                      <Calendar size={12} />
                      <span>Updated: {formatDate(department.UpdatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredDepartments.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Building2 className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500 text-xl mb-2">No departments found</p>
            {searchTerm && (
              <p className="text-gray-400 text-sm">
                Try adjusting your search criteria
              </p>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-screen overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalMode === 'add' ? '➕ Add Department' :
                    modalMode === 'edit' ? '✏️ Edit Department' : '👁️ Department Details'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    } ${modalMode === 'view' ? 'bg-gray-50 text-gray-600' : 'bg-white'}`}
                  placeholder="Enter department name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-2 flex items-center gap-1">⚠️ {errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    } ${modalMode === 'view' ? 'bg-gray-50 text-gray-600' : 'bg-white'}`}
                  placeholder="Enter department description"
                />
                {errors.description && <p className="text-red-500 text-xs mt-2 flex items-center gap-1">⚠️ {errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Manager ID
                  </label>
                  <input
                    type="number"
                    name="managerId"
                    value={formData.managerId}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${modalMode === 'view' ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-white border-gray-200'
                      }`}
                    placeholder="Enter manager ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Employee Count
                  </label>
                  <input
                    type="number"
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${modalMode === 'view' ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-white border-gray-200'
                      }`}
                    placeholder="Enter employee count"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Manager Name
                </label>
                <input
                  type="text"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${modalMode === 'view' ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-white border-gray-200'
                    }`}
                  placeholder="Enter manager name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Budget *
                </label>
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  disabled={modalMode === 'view'}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.budget ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    } ${modalMode === 'view' ? 'bg-gray-50 text-gray-600' : 'bg-white'}`}
                  placeholder="Enter budget amount"
                />
                {errors.budget && <p className="text-red-500 text-xs mt-2 flex items-center gap-1">⚠️ {errors.budget}</p>}
              </div>

              {modalMode === 'view' && selectedDepartment && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 space-y-3 border border-blue-100">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Calendar size={16} className="text-blue-600" />
                    Timeline Information
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium text-gray-900">{formatDate(selectedDepartment.CreatedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium text-gray-900">{formatDate(selectedDepartment.UpdatedAt)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {modalMode !== 'view' && (
              <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-100 px-6 py-4">
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                  >
                    <Save size={16} />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 transform hover:scale-[1.02] font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentNew;