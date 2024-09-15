

// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2'; // Import SweetAlert2

// function ViewUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState('all'); // 'all', 'lastWeek', 'older', 'today'

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:1000/User/all');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         // Sort users by ID in ascending order
//         const sortedData = data.sort((a, b) => a.id - b.id);
//         setUsers(sortedData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const filterUsers = (users) => {
//     const today = new Date();
//     const oneWeekAgo = new Date();
//     oneWeekAgo.setDate(today.getDate() - 7);

//     return users.filter(user => {
//       const registrationDate = new Date(user.registrationDate);
//       if (filter === 'lastWeek') {
//         return registrationDate >= oneWeekAgo && registrationDate < today;
//       } else if (filter === 'older') {
//         return registrationDate < oneWeekAgo;
//       } else if (filter === 'today') {
//         return registrationDate.toDateString() === today.toDateString();
//       } else {
//         return true; // Show all users
//       }
//     });
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const filteredUsers = filterUsers(users);

//   return (
//     <div className="container mx-auto p-4 mt-16">
//       <h1 className="text-2xl font-bold mb-4">Users List</h1>

//       <div className="mb-4 flex space-x-2">
//         <button
//           onClick={() => handleFilterChange('all')}
//           className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'all' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
//         >
//           All Users
//         </button>
//         <button
//           onClick={() => handleFilterChange('today')}
//           className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'today' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
//         >
//           New Users Today
//         </button>
//         <button
//           onClick={() => handleFilterChange('lastWeek')}
//           className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'lastWeek' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
//         >
//           Registered Last Week
//         </button>
//         <button
//           onClick={() => handleFilterChange('older')}
//           className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'older' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
//         >
//           Older Records
//         </button>
//       </div>

//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100 border-b">
//             <th className="py-2 px-4 border-r">ID</th>
//             <th className="py-2 px-4 border-r">Name</th>
//             <th className="py-2 px-4 border-r">Email</th>
//             <th className="py-2 px-4 border-r">Phone Number</th>
//             <th className="py-2 px-4 border-r">Address</th>
//             <th className="py-2 px-4 border-r">Vehicle Type</th>
//             <th className="py-2 px-4 border-r">Vehicle Registration</th>
//             <th className="py-2 px-4 border-r">Vehicle Make</th>
//             <th className="py-2 px-4 border-r">Vehicle Model</th>
//             {/* <th className="py-2 px-4">Role</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td className="py-2 px-4 border-r">{user.id}</td>
//                 <td className="py-2 px-4 border-r">{user.fullName}</td>
//                 <td className="py-2 px-4 border-r">{user.email}</td>
//                 <td className="py-2 px-4 border-r">{user.phoneNumber}</td>
//                 <td className="py-2 px-4 border-r">{user.address}</td>
//                 <td className="py-2 px-4 border-r">{user.vehicleType}</td>
//                 <td className="py-2 px-4 border-r">{user.vehicleRegistrationNumber}</td>
//                 <td className="py-2 px-4 border-r">{user.vehicleMake}</td>
//                 <td className="py-2 px-4 border-r">{user.vehicleModel}</td>
//                 {/* <td className="py-2 px-4">{user.role}</td> */}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9" className="py-2 px-4 text-center">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ViewUsers;

// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2'; // Import SweetAlert2

// function ViewUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState('all'); // 'all', 'today', 'lastWeek', 'older'

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:1000/User/all');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         // Log the data to check its structure
//         console.log('Fetched data:', data);
//         // Sort users by ID in ascending order
//         const sortedData = data.sort((a, b) => a.id - b.id);
//         setUsers(sortedData);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const filterUsers = (users) => {
//     const today = new Date();
    
//     // Calculate the start and end of this week
//     const startOfCurrentWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday of the current week
//     const endOfCurrentWeek = new Date(today.setDate(startOfCurrentWeek.getDate() + 6)); // Sunday of the current week
    
//     // Calculate the start and end of last week
//     const startOfLastWeek = new Date(startOfCurrentWeek.setDate(startOfCurrentWeek.getDate() - 7)); // Monday of last week
//     const endOfLastWeek = new Date(endOfCurrentWeek.setDate(endOfCurrentWeek.getDate() - 7)); // Sunday of last week

//     return users.filter(user => {
//       const registrationDate = new Date(user.registrationDate);

//       if (filter === 'lastWeek') {
//         return registrationDate >= startOfLastWeek && registrationDate <= endOfLastWeek;
//       } else if (filter === 'older') {
//         return registrationDate < startOfLastWeek;
//       } else if (filter === 'today') {
//         return registrationDate.toDateString() === new Date().toDateString();
//       } else {
//         return true; // Show all users
//       }
//     });
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const filteredUsers = filterUsers(users);

//   return (
//     <div className="container mx-auto p-4 mt-16">
//       <h1 className="text-2xl font-bold mb-4">Users List</h1>

//       <div className="mb-4 flex space-x-2">
//         <button
//           onClick={() => handleFilterChange('all')}
//           className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'all' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
//         >
//           All Users
//         </button>
//         <button
//           onClick={() => handleFilterChange('today')}
//           className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'today' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
//         >
//           New Users Today
//         </button>
//         <button
//           onClick={() => handleFilterChange('lastWeek')}
//           className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'lastWeek' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
//         >
//           Registered Last Week
//         </button>
//         <button
//           onClick={() => handleFilterChange('older')}
//           className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'older' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
//         >
//           Older Records
//         </button>
//       </div>

//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100 border-b">
//             <th className="py-2 px-4 border-r">ID</th>
//             <th className="py-2 px-4 border-r">Name</th>
//             <th className="py-2 px-4 border-r">Email</th>
//             <th className="py-2 px-4 border-r">Phone Number</th>
//             <th className="py-2 px-4 border-r">Address</th>
//             <th className="py-2 px-4 border-r">Vehicle Type</th>
//             <th className="py-2 px-4 border-r">Vehicle Registration</th>
//             <th className="py-2 px-4 border-r">Vehicle Make</th>
//             <th className="py-2 px-4 border-r">Vehicle Model</th>
//             {/* <th className="py-2 px-4">Role</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.length > 0 ? (
//             filteredUsers.map((user) => (
//               <tr key={user.id}>
//                 <td className="py-2 px-4 border-r">{user.id}</td>
//                 <td className="py-2 px-4 border-r">{user.fullName}</td>
//                 <td className="py-2 px-4 border-r">{user.email}</td>
//                 <td className="py-2 px-4 border-r">{user.phoneNumber}</td>
//                 <td className="py-2 px-4 border-r">{user.address}</td>
//                 <td className="py-2 px-4 border-r">{user.vehicleType}</td>
//                 <td className="py-2 px-4 border-r">{user.vehicleRegistrationNumber}</td>
//                 <td className="py-2 px-4 border-r">{user.vehicleMake}</td>
//                 <td className="py-2 px-4 border-r">{user.vehicleModel}</td>
//                 {/* <td className="py-2 px-4">{user.role}</td> */}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="9" className="py-2 px-4 text-center">No users found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ViewUsers;

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'lastWeek', 'older', 'currentMonth', 'lastMonth'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:1000/User/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Log the data to check its structure
        console.log('Fetched data:', data);
        // Sort users by ID in ascending order
        const sortedData = data.sort((a, b) => a.id - b.id);
        setUsers(sortedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Define the filterUsers function
  const filterUsers = (users) => {
    const today = new Date();
    
    // Calculate the start and end of today
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  
    // Calculate the start and end of the current month
    const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
  
    // Calculate the start and end of the last month
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999);
  
    // Calculate the start and end of this week
    const startOfCurrentWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday of the current week
    const endOfCurrentWeek = new Date(today.setDate(startOfCurrentWeek.getDate() + 6)); // Sunday of the current week
  
    // Calculate the start and end of last week
    const startOfLastWeek = new Date(startOfCurrentWeek.getTime() - 7 * 24 * 60 * 60 * 1000); // Monday of last week
    const endOfLastWeek = new Date(startOfCurrentWeek.getTime() - 1); // Sunday of last week
  
    return users.filter(user => {
      const registrationDate = new Date(user.registrationDate);
  
      if (filter === 'lastWeek') {
        return registrationDate >= startOfLastWeek && registrationDate <= endOfLastWeek;
      } else if (filter === 'older') {
        return registrationDate < startOfCurrentMonth;
      } else if (filter === 'today') {
        return registrationDate >= startOfToday && registrationDate < endOfToday;
      } else if (filter === 'currentMonth') {
        return registrationDate >= startOfCurrentMonth && registrationDate <= endOfCurrentMonth;
      } else {
        return true; // Show all users
      }
    });
  };
  

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredUsers = filterUsers(users);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      <div className="mb-4 flex space-x-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'all' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
        >
          All Users
        </button>
        <button
          onClick={() => handleFilterChange('today')}
          className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'today' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
        >
          New Users Today
        </button>
        <button
          onClick={() => handleFilterChange('lastWeek')}
          className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'lastWeek' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
        >
          Registered Last Week
        </button>
        <button
          onClick={() => handleFilterChange('older')}
          className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'older' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
        >
          Older Records
        </button>
        <button
          onClick={() => handleFilterChange('currentMonth')}
          className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'currentMonth' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
        >
          Current Month
        </button>
        {/* <button
          onClick={() => handleFilterChange('lastMonth')}
          className={`px-4 py-2 rounded-md transition duration-300 ${filter === 'lastMonth' ? 'bg-teal-600 text-white' : 'bg-white text-teal-600 border border-teal-600 hover:bg-teal-100'}`}
        >
          Last Month
        </button> */}
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 border-r">ID</th>
            <th className="py-2 px-4 border-r">Name</th>
            <th className="py-2 px-4 border-r">Email</th>
            <th className="py-2 px-4 border-r">Phone Number</th>
            <th className="py-2 px-4 border-r">Address</th>
            <th className="py-2 px-4 border-r">Vehicle Type</th>
            <th className="py-2 px-4 border-r">Vehicle Registration</th>
            <th className="py-2 px-4 border-r">Vehicle Make</th>
            <th className="py-2 px-4 border-r">Vehicle Model</th>
            {/* <th className="py-2 px-4">Role</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-r">{user.id}</td>
                <td className="py-2 px-4 border-r">{user.fullName}</td>
                <td className="py-2 px-4 border-r">{user.email}</td>
                <td className="py-2 px-4 border-r">{user.phoneNumber}</td>
                <td className="py-2 px-4 border-r">{user.address}</td>
                <td className="py-2 px-4 border-r">{user.vehicleType}</td>
                <td className="py-2 px-4 border-r">{user.vehicleRegistrationNumber}</td>
                <td className="py-2 px-4 border-r">{user.vehicleMake}</td>
                <td className="py-2 px-4 border-r">{user.vehicleModel}</td>
                {/* <td className="py-2 px-4">{user.role}</td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="py-2 px-4 text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewUsers;
