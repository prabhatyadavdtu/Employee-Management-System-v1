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

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-4">
      <div className="w-[90vw] mx-auto sm:px-6">
        <div className="py-12">
          <div className="flex flex-col md:flex-row justify-between items-start">
            {/* Left side - Company info */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-bold">Employee Management System</h3>
              </div>
              <div className='flex flex-row text-left'>
                <p className="text-gray-300 mb-4">
                  Streamline your workforce management with our comprehensive platform.
                  Manage employees, departments, and organizational data efficiently.
                </p>
              </div>
              <div className="flex space-x-4 gap-3">
                <button className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-110">
                  <Github className="h-6 w-6" />
                </button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-110">
                  <Linkedin className="h-6 w-6" />
                </button>
                <button className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-110">
                  <Twitter className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Right side - Quick Links and Support */}
            <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-8 md:justify-between">
              <div></div>
              <div>
                <h4 className="text-lg font-semibold mb-4 ml-6">Quick Links</h4>
                <ul className="space-y-2">
                  <li><button className="text-gray-300 hover:text-white transition-colors text-left w-full">Dashboard</button></li>
                  <li><button className="text-gray-300 hover:text-white transition-colors text-left w-full">Employees</button></li>
                  <li><button className="text-gray-300 hover:text-white transition-colors text-left w-full">Departments</button></li>
                  <li><button className="text-gray-300 hover:text-white transition-colors text-left w-full">Reports</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 ml-6">Quick Links</h4>
                <ul className="space-y-2">
                  <li><button className="text-gray-300 hover:text-white transition-colors text-left w-full">Help Center</button></li>
                  <li><button className="text-gray-300 hover:text-white transition-colors text-left w-full">Documentation</button></li>
                  <li><button className="text-gray-300 hover:text-white transition-colors text-left w-full">Contact Us</button></li>
                  <li><button className="text-gray-300 hover:text-white transition-colors text-left w-full">Privacy Policy</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Employee Management System. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 mt-2 md:mt-0">
              <span className="text-gray-400 text-sm">Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span className="text-gray-400 text-sm">by Your Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;