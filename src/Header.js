import React, { useState } from 'react';
import { Users, Building2, Home, LogOut, User, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu after navigation
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white shadow-md relative">
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
      <div className="w-full px-4 py-3">
        <div className="flex flex-row items-center justify-between">

          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <AnimatedLogo />
            <h3
              className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-900 cursor-pointer transition-all duration-300"
              style={{ color: `hsla(210, 78%, 33%, 1.00)` }}
              onClick={() => handleNavigation('/dashboard')}
            >
              <span className="hidden md:inline">Employee Management System</span>
              <span className="md:hidden">EMS</span>
            </h3>
          </div>

          <div className='flex items-center space-x-3'>
            {/* Navigation Tabs - Always in Row */}
            <nav className="hidden sm:flex items-center space-x-1 lg:space-x-3 pr-3 border-r border-gray-400">
              <button
                onClick={() => handleNavigation('/dashboard')}
                className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-5 transition-all duration-200 text-sm lg:text-base ${isActive('/dashboard')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden lg:inline">Dashboard</span>
              </button>

              <button
                onClick={() => handleNavigation('/department')}
                className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-5 transition-all duration-200 text-sm lg:text-base ${isActive('/department')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="hidden lg:inline">Department</span>
              </button>

              <button
                onClick={() => handleNavigation('/employee')}
                className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-5 transition-all duration-200 text-sm lg:text-base ${isActive('/employee')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <Users className="w-4 h-4" />
                <span className="hidden lg:inline">Employee</span>
              </button>
            </nav>
            
            {/* Desktop User Profile */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex items-center space-x-2 pr-3 border-r border-gray-400">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-0">
                    {user?.FirstName && user?.LastName ? `${user.FirstName} ${user.LastName}` : user?.Name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 mb-0">
                    {user?.Company || 'Company'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-5 transition-all duration-200"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Navigation Tabs for Medium Screens */}
            <nav className="hidden sm:flex lg:hidden items-center space-x-1">
              <button
                onClick={() => handleNavigation('/dashboard')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${isActive('/dashboard')
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <Home className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavigation('/department')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${isActive('/department')
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <Building2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavigation('/employee')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${isActive('/employee')
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <Users className="w-4 h-4" />
              </button>
            </nav>

            {/* Mobile/Tablet Hamburger Menu Button */}
            <div className="lg:hidden relative">
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">

                  {/* User Profile Section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-0">
                          {user?.FirstName && user?.LastName ? `${user.FirstName} ${user.LastName}` : user?.Name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 mb-0">
                          {user?.Company || 'Company'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation - Only show on small screens */}
                  <div className="sm:hidden border-b border-gray-100 py-2">
                    <button
                      onClick={() => handleNavigation('/dashboard')}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-all duration-200 ${isActive('/dashboard')
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <Home className="w-4 h-4" />
                      <span>Dashboard</span>
                    </button>

                    <button
                      onClick={() => handleNavigation('/department')}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-all duration-200 ${isActive('/department')
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Department</span>
                    </button>

                    <button
                      onClick={() => handleNavigation('/employee')}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-all duration-200 ${isActive('/employee')
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <Users className="w-4 h-4" />
                      <span>Employee</span>
                    </button>
                  </div>

                  {/* Logout Button */}
                  <div className="px-2 py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Header;