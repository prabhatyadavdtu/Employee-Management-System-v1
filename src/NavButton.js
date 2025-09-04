import React from 'react';

const NavButton = React.memo(({ id, icon: Icon, label, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center space-x-1 px-6 py-3 rounded-3 transition-all duration-200 font-medium
      border border-gray-200
      ${activeTab === id
        ? 'bg-blue-600 text-white shadow-lg scale-105 border-blue-600'
        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 shadow-lg'
      }`
    }
    style={{ minWidth: 120 }} // Optional: ensures all buttons have the same width
  >
    {typeof Icon === 'string' ? <span className="text-xl">{Icon}</span> : <Icon className="h-5 w-5" />}
    <span>{label}</span>
  </button>
));

export default NavButton;