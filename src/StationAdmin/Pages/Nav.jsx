import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session or authentication data from session storage
    sessionStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <nav className="bg-teal-900 p-4 shadow-lg fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold flex items-center">
          <i className="fas fa-bolt mr-2"></i> {/* Add icon here */}
          EV Charging Station Finder
        </div>
        <div className="flex space-x-6">
          <Link to="/StationAdminDashboard" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-tachometer-alt mr-1"></i> Dashboard
          </Link>
          <Link to="/AvailableSlots" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-tasks mr-1"></i> View Slot
          </Link>
          <Link to="/SlotHistory" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-history mr-1"></i> Slot History
          </Link>
          {/* Uncomment this if you need to enable the View Users link */}
          {/* <Link to="/ViewUsers" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-users mr-1"></i> View Users
          </Link> */}
          <Link to="/EmailUser" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-envelope mr-1"></i> Email
          </Link>
          <Link to="/ProfileStation" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-user mr-1"></i> Profile
          </Link>
          <Link to="/ViewBooking" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-calendar-check mr-1"></i> View Booking
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center focus:outline-none"
          >
            <i className="fas fa-sign-out-alt mr-1"></i> Logout
          </button>
        </div>
        
      </div>
    </nav>
  );
}

export default DashboardNavbar;
