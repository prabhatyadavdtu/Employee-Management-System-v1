import React, { useState } from 'react';
import { Users, Building2, Home, Plus, Search, Edit, Trash2, Mail, Phone, Calendar, MapPin, Heart, Github, Linkedin, Twitter } from 'lucide-react';

// Mock data
const mockEmployees = [
  { id: 1, name: 'John Smith', email: 'john.smith@company.com', phone: '+1-555-0123', department: 'Engineering', position: 'Senior Developer', joinDate: '2022-01-15', salary: '$95,000' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@company.com', phone: '+1-555-0124', department: 'Marketing', position: 'Marketing Manager', joinDate: '2021-08-20', salary: '$75,000' },
  { id: 3, name: 'Mike Chen', email: 'mike.chen@company.com', phone: '+1-555-0125', department: 'Engineering', position: 'Frontend Developer', joinDate: '2023-03-10', salary: '$80,000' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', phone: '+1-555-0126', department: 'HR', position: 'HR Specialist', joinDate: '2020-11-05', salary: '$65,000' }
];

const mockDepartments = [
  { id: 1, name: 'Engineering', employees: 15, manager: 'John Smith', budget: '$1,200,000' },
  { id: 2, name: 'Marketing', employees: 8, manager: 'Sarah Johnson', budget: '$450,000' },
  { id: 3, name: 'HR', employees: 5, manager: 'Emily Davis', budget: '$320,000' },
  { id: 4, name: 'Sales', employees: 12, manager: 'Robert Wilson', budget: '$800,000' }
];



const Dashboard = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
      <h2 className="text-3xl font-bold mb-4">Welcome to Employee Management System</h2>
      <p className="text-xl opacity-90">Streamline your workforce management with our comprehensive platform</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Employees</p>
            <p className="text-3xl font-bold text-gray-900">40</p>
          </div>
          <Users className="h-12 w-12 text-blue-500" />
        </div>
        <p className="text-sm text-green-600 mt-2">+2 this month</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Departments</p>
            <p className="text-3xl font-bold text-gray-900">4</p>
          </div>
          <Building2 className="h-12 w-12 text-green-500" />
        </div>
        <p className="text-sm text-blue-600 mt-2">Across all offices</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">New Hires</p>
            <p className="text-3xl font-bold text-gray-900">5</p>
          </div>
          <Calendar className="h-12 w-12 text-yellow-500" />
        </div>
        <p className="text-sm text-gray-600 mt-2">This quarter</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Budget</p>
            <p className="text-3xl font-bold text-gray-900">$2.8M</p>
          </div>
          <MapPin className="h-12 w-12 text-purple-500" />
        </div>
        <p className="text-sm text-gray-600 mt-2">Annual allocation</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm">Mike Chen joined Engineering department</p>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm">Sarah Johnson promoted to Marketing Manager</p>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <p className="text-sm">New HR policies updated</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Plus className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-medium">Add Employee</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
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

export default Dashboard;