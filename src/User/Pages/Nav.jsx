

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or authentication data from session storage
    sessionStorage.removeItem('userId');

    // Optionally, you might want to perform some cleanup actions here

    // Redirect to the home page
    navigate('/');
  };
  const userRole = sessionStorage.getItem('userRole');
  return (
    <nav className="bg-teal-900 p-4 shadow-lg fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold flex items-center">
          <i className="fas fa-bolt mr-2"></i> {/* Example icon */}
          EV Charging Station Finder
        </div>
        <div className="flex space-x-6">
          <Link to="/UserDashboard" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-tachometer-alt mr-2"></i> {/* Dashboard icon */}
            Dashboard
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-user mr-2"></i> {/* Profile icon */}
            Profile
          </Link>
          <Link to="/settings" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-cog mr-2"></i> {/* Settings icon */}
            Settings
          </Link>
          <Link to="/History" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-history mr-2"></i> {/* History icon */}
            View History
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center focus:outline-none"
          >
            <i className="fas fa-sign-out-alt mr-1"></i> Logout
          </button>
        </div>
        {userRole && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-sm bg-teal-700 px-3 py-1 rounded-full border border-teal-600">
            {userRole}
          </div>
        )}
      </div>
    </nav>
  );
}

export default DashboardNavbar;

