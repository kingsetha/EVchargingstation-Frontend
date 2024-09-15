// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

// function DashboardNavbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     sessionStorage.removeItem('userId'); // Remove specific item from session storage
//     navigate('/'); // Navigate to the home route
//   };

//   return (
//     <nav className="bg-teal-900 p-4 shadow-lg fixed top-0 w-full z-10">
//       <div className="container mx-auto flex items-center justify-between">
//         <div className="text-white text-2xl font-bold flex items-center">
//           <i className="fas fa-bolt mr-2"></i> {/* Add icon here */}
//           EV Charging Station Finder
//         </div>
//         <div className="flex space-x-6">
//           <Link to="/AdminDashboard" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
//             <i className="fas fa-tachometer-alt mr-1"></i> Dashboard
//           </Link>
//           <Link to="/PendingDashboard" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
//             <i className="fas fa-tasks mr-1"></i> View Request
//           </Link>
//           <Link to="/ViewStations" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
//             <i className="fas fa-map-marker-alt mr-1"></i> View Stations
//           </Link>
//           <Link to="/ViewUsers" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
//             <i className="fas fa-users mr-1"></i> View Users
//           </Link>
//           <Link to="/Email" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
//             <i className="fas fa-envelope mr-1"></i> Email
//           </Link>
//           <button
//             onClick={handleLogout}
//             className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center focus:outline-none"
//           >
//             <i className="fas fa-sign-out-alt mr-1"></i> Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default DashboardNavbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

function DashboardNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userId'); // Remove specific item from session storage
    sessionStorage.removeItem('userRole'); // Optionally remove the role as well
    navigate('/'); // Navigate to the home route
  };

  // Retrieve user role from session storage
  const userRole = sessionStorage.getItem('userRole'); // Example: "Admin" or "User"

  return (
    <nav className="bg-teal-900 p-4 shadow-lg fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold flex items-center">
          <i className="fas fa-bolt mr-2"></i> {/* Add icon here */}
          EV Charging Station Finder
        </div>
        <div className="flex space-x-6">
          <Link to="/AdminDashboard" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-tachometer-alt mr-1"></i> Dashboard
          </Link>
          <Link to="/PendingDashboard" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-tasks mr-1"></i> View Request
          </Link>
          <Link to="/ViewStations" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-map-marker-alt mr-1"></i> View Stations
          </Link>
          <Link to="/ViewUsers" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-users mr-1"></i> View Users
          </Link>
          <Link to="/Email" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-envelope mr-1"></i> Email
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center focus:outline-none"
          >
            <i className="fas fa-sign-out-alt mr-1"></i> Logout
          </button>
        </div>
        {/* Display the user role */}
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

