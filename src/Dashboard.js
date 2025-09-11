import React, { useState, useEffect } from 'react';
import { Users, Building2, Calendar, MapPin, Pin, Plus, Search, IndianRupee } from 'lucide-react';
import apiService from './services/api';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const response = await apiService.getDashboardData();
      console.log('Dashboard loaded:', response);
      setStats(response);
      setTimeout(() => {
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error loading departments:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };


  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Welcome to Employee Management System</h2>
        <p className="text-xl opacity-90">
          Streamline your workforce management with our comprehensive platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900">{stats.TotalEmployees}</p>
            </div>
            <Users className="h-12 w-12 text-blue-500" />
          </div>
          <p className="text-sm text-green-600 mt-2">
            +{stats.NewHiresThisMonth} this month
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-3xl font-bold text-gray-900">{stats.TotalDepartments}</p>
            </div>
            <Building2 className="h-12 w-12 text-green-500" />
          </div>
          <p className="text-sm text-blue-600 mt-2">Across all offices</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Hires</p>
              <p className="text-3xl font-bold text-gray-900">{stats.NewHiresThisMonth}</p>
            </div>
            <Calendar className="h-12 w-12 text-yellow-500" />
          </div>
          <p className="text-sm text-gray-600 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-3xl font-bold text-gray-900">
                ₹{stats.TotalSalaryBudget.toLocaleString()}
              </p>
            </div>
            <IndianRupee className="h-12 w-12 text-purple-500" />
          </div>
          <p className="text-sm text-gray-600 mt-2">Annual allocation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {stats.RecentActivities.slice(0, 3).map(activity => (
              <div key={activity.Id} className="flex items-center space-x-3 p-1 bg-gray-50 rounded-lg">
                {/* <div className="w-2 h-2 bg-green-500 rounded-full"></div> */}
                <Pin className="h-4 w-4 text-red-500 rotate-45 ml-1" />
                <p className="text-sm mt-3">{activity.Description}</p>
                <span className="text-xs text-gray-400 text-right ml-auto mt-3 mr-1">
                  {timeAgo(activity.Timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/employee", { state: { AddEmployeeModal: true } })}
              className="flex items-center justify-center space-x-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-blue-600 font-medium">Add Employee</span>
            </button>
            <button
              onClick={() => navigate("/department", { state: { AddDepartmentModal: true } })}
              className="flex items-center justify-center space-x-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <Building2 className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">Add Department</span>
            </button>            
            <button className="flex items-center justify-center space-x-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Search className="h-5 w-5 text-purple-600" />
              <span className="text-purple-600 font-medium">Search Records</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-600 font-medium">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
