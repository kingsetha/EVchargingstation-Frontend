


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ViewBooking() {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [stationId, setStationId] = useState(1); // Set the station ID appropriately
//   const [filter, setFilter] = useState('recent'); // Default filter
//   const [allBookings, setAllBookings] = useState([]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(`http://localhost:1000/api/bookings/byStation?stationId=${stationId}`);
//         console.log('Fetched Bookings:', response.data); // Debugging API response
//         const fetchedBookings = response.data;
//         setAllBookings(fetchedBookings);
//         applyFilter(fetchedBookings, filter);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       }
//     };

//     fetchBookings();
//   }, [stationId]);

//   useEffect(() => {
//     if (allBookings.length > 0) {
//       applyFilter(allBookings, filter);
//     }
//   }, [filter, allBookings]);

//   const applyFilter = (bookings, filter) => {
//     const now = new Date();
//     let filtered = [];

//     switch (filter.toLowerCase()) {
//       case 'today':
//         filtered = bookings.filter(booking => {
//           const bookingDate = new Date(booking.createdAt);
//           return bookingDate.toDateString() === now.toDateString();
//         });
//         break;
//       case 'yesterday':
//         const yesterday = new Date();
//         yesterday.setDate(now.getDate() - 1);
//         filtered = bookings.filter(booking => {
//           const bookingDate = new Date(booking.createdAt);
//           return bookingDate.toDateString() === yesterday.toDateString();
//         });
//         break;
//       case 'thisweek':
//         const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         filtered = bookings.filter(booking => {
//           const bookingDate = new Date(booking.createdAt);
//           return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
//         });
//         break;
//       case 'previous':
//         const startOfPreviousWeek = new Date(now.setDate(now.getDate() - now.getDay() - 6));
//         const endOfPreviousWeek = new Date(startOfPreviousWeek);
//         endOfPreviousWeek.setDate(startOfPreviousWeek.getDate() + 6);
//         filtered = bookings.filter(booking => {
//           const bookingDate = new Date(booking.createdAt);
//           return bookingDate >= startOfPreviousWeek && bookingDate <= endOfPreviousWeek;
//         });
//         break;
//       default:
//         const thirtyDaysAgo = new Date();
//         thirtyDaysAgo.setDate(now.getDate() - 30);
//         filtered = bookings.filter(booking => {
//           const bookingDate = new Date(booking.createdAt);
//           return bookingDate >= thirtyDaysAgo;
//         });
//         break;
//     }

//     console.log('Filtered Data:', filtered); // Debugging filtered data
//     setFilteredBookings(filtered);
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   const getRowClassName = (status) => {
//     switch (status) {
//       case 'CONFIRMED':
//         return 'bg-teal-100 border-teal-300';
//       case 'CANCELLED':
//         return 'bg-red-100 border-red-300';
//       case 'PENDING':
//         return 'bg-yellow-100 border-yellow-300';
//       default:
//         return 'bg-gray-100 border-gray-300';
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 mt-16">
//       {/* <h1 className="text-2xl font-bold mb-4 text-teal-900">Bookings for Station {stationId}</h1> */}
//       <h1 className="text-2xl font-bold mb-4 text-teal-900">Bookings </h1>

//       {/* Filter Buttons */}
//       <div className="mb-6 flex flex-wrap gap-2">
//         <button onClick={() => handleFilterChange('recent')} className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700 transition duration-300">All records</button>
//         <button onClick={() => handleFilterChange('today')} className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-600 transition duration-300">Today</button>
//         <button onClick={() => handleFilterChange('yesterday')} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-500 transition duration-300">Yesterday</button>
//         <button onClick={() => handleFilterChange('thisweek')} className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-400 transition duration-300">This Week</button>
//         <button onClick={() => handleFilterChange('previous')} className="px-4 py-2 bg-teal-400 text-white rounded hover:bg-teal-300 transition duration-300">Previous Records</button>
//       </div>

//       {/* Booking Table */}
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr className="bg-teal-900 text-white">
//             <th className="py-2 px-4 border-b">Booking ID</th>
//             <th className="py-2 px-4 border-b">User</th>
//             <th className="py-2 px-4 border-b">Slot</th>
//             <th className="py-2 px-4 border-b">Booking Time</th>
//             <th className="py-2 px-4 border-b">Status</th>
//             <th className="py-2 px-4 border-b">Device Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredBookings.length > 0 ? (
//             filteredBookings.map(booking => (
//               <tr key={booking.bookingId} className={`border ${getRowClassName(booking.status)}`}>
//                 <td className="py-2 px-4 border-b">{booking.bookingId}</td>
//                 <td className="py-2 px-4 border-b">{booking.user.fullName}</td> {/* Changed to fullName */}
//                 <td className="py-2 px-4 border-b">{booking.slot.id}</td>
//                 <td className="py-2 px-4 border-b">{new Date(booking.bookingTime).toLocaleString()}</td>
//                 <td className="py-2 px-4 border-b">{booking.status}</td>
//                 <td className="py-2 px-4 border-b">{booking.deviceType}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="py-2 px-4 text-center text-gray-500">No bookings found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ViewBooking;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ViewBooking() {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [stationId, setStationId] = useState(1); // Set the station ID appropriately
//   const [filter, setFilter] = useState('recent'); // Default filter
//   const [allBookings, setAllBookings] = useState([]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(`http://localhost:1000/api/bookings/byStation?stationId=${stationId}`);
//         console.log('Fetched Bookings:', response.data); // Debugging API response
//         const fetchedBookings = response.data;
//         setAllBookings(fetchedBookings);
//         applyFilter(fetchedBookings, filter);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       }
//     };

//     fetchBookings();
//   }, [stationId]);

//   useEffect(() => {
//     if (allBookings.length > 0) {
//       applyFilter(allBookings, filter);
//     }
//   }, [filter, allBookings]);

//   const applyFilter = (bookings, filter) => {
//     const now = new Date();
//     let filtered = [];

//     switch (filter.toLowerCase()) {
//       case 'today':
//         filtered = bookings.filter(booking => {
//           const bookingDate = new Date(booking.createdAt);
//           return bookingDate.toDateString() === now.toDateString();
//         });
//         break;
//       case 'yesterday':
//         const yesterday = new Date();
//         yesterday.setDate(now.getDate() - 1);
//         filtered = bookings.filter(booking => {
//           const bookingDate = new Date(booking.createdAt);
//           return bookingDate.toDateString() === yesterday.toDateString();
//         });
//         break;
//       case 'thisweek':
//         const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         filtered = bookings.filter(booking => {
//           const bookingDate = new Date(booking.createdAt);
//           return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
//         });
//         break;
//       case 'previous':
//         const startOfPreviousWeek = new Date(now.setDate(now.getDate() - now.getDay() - 6));
//         const endOfPreviousWeek = new Date(startOfPreviousWeek);
//         endOfPreviousWeek.setDate(startOfPreviousWeek.getDate() + 6);
//         filtered = bookings.filter(booking => {
//           const bookingDate = new Date(booking.createdAt);
//           return bookingDate >= startOfPreviousWeek && bookingDate <= endOfPreviousWeek;
//         });
//         break;
//       default:
//         const thirtyDaysAgo = new Date();
//         thirtyDaysAgo.setDate(now.getDate() - 30);
//         filtered = bookings.filter(booking => {
//           const bookingDate = new Date(booking.createdAt);
//           return bookingDate >= thirtyDaysAgo;
//         });
//         break;
//     }

//     console.log('Filtered Data:', filtered); // Debugging filtered data
//     setFilteredBookings(filtered);
//   };

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter);
//   };

//   const getRowClassName = (status) => {
//     switch (status) {
//       case 'CONFIRMED':
//         return 'bg-teal-100 border-teal-300';
//       case 'CANCELLED':
//         return 'bg-red-100 border-red-300';
//       case 'PENDING':
//         return 'bg-yellow-100 border-yellow-300';
//       default:
//         return 'bg-gray-100 border-gray-300';
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Main Content Container */}
//       <div className="container mx-auto p-24 flex-1">
//         <h1 className="text-2xl font-bold mb-4 text-teal-900">Bookings</h1>

//         {/* Filter Buttons */}
//         <div className="mb-6 flex flex-wrap gap-2">
//           <button onClick={() => handleFilterChange('recent')} className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700 transition duration-300">All records</button>
//           <button onClick={() => handleFilterChange('today')} className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-600 transition duration-300">Today</button>
//           <button onClick={() => handleFilterChange('yesterday')} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-500 transition duration-300">Yesterday</button>
//           <button onClick={() => handleFilterChange('thisweek')} className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-400 transition duration-300">This Week</button>
//           <button onClick={() => handleFilterChange('previous')} className="px-4 py-2 bg-teal-400 text-white rounded hover:bg-teal-300 transition duration-300">Previous Records</button>
//         </div>

//         {/* Booking Table */}
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-teal-900 text-white">
//               <th className="py-2 px-4 border-b">Booking ID</th>
//               <th className="py-2 px-4 border-b">User</th>
//               <th className="py-2 px-4 border-b">Slot</th>
//               <th className="py-2 px-4 border-b">Booking Time</th>
//               <th className="py-2 px-4 border-b">Status</th>
//               <th className="py-2 px-4 border-b">Device Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings.length > 0 ? (
//               filteredBookings.map(booking => (
//                 <tr key={booking.bookingId} className={`border ${getRowClassName(booking.status)}`}>
//                   <td className="py-2 px-4 border-b">{booking.bookingId}</td>
//                   <td className="py-2 px-4 border-b">{booking.user.fullName}</td>
//                   <td className="py-2 px-4 border-b">{booking.slot.id}</td>
//                   <td className="py-2 px-4 border-b">{new Date(booking.bookingTime).toLocaleString()}</td>
//                   <td className="py-2 px-4 border-b">{booking.status}</td>
//                   <td className="py-2 px-4 border-b">{booking.deviceType}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="py-2 px-4 text-center text-gray-500">No bookings found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

    
//     </div>
//   );
// }

// export default ViewBooking;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Assuming you have a method to get the stationId from session or some global state
// Replace this with your actual method of retrieving the session-based stationId
const getStationIdFromSession = () => {
  // This is a placeholder function; replace it with your actual logic
  return sessionStorage.getItem('userId') ; // Default to 1 if not set
};

function ViewBooking() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [stationId, setStationId] = useState(getStationIdFromSession()); // Retrieve station ID from session
  const [filter, setFilter] = useState('recent'); // Default filter
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/bookings/byStation?stationId=${stationId}`);
        console.log('Fetched Bookings:', response.data); // Debugging API response
        const fetchedBookings = response.data;
        setAllBookings(fetchedBookings);
        applyFilter(fetchedBookings, filter);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [stationId]);

  useEffect(() => {
    if (allBookings.length > 0) {
      applyFilter(allBookings, filter);
    }
  }, [filter, allBookings]);

  const applyFilter = (bookings, filter) => {
    const now = new Date();
    let filtered = [];

    switch (filter.toLowerCase()) {
      case 'today':
        filtered = bookings.filter(booking => {
          const bookingDate = new Date(booking.createdAt);
          return bookingDate.toDateString() === now.toDateString();
        });
        break;
      case 'yesterday':
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        filtered = bookings.filter(booking => {
          const bookingDate = new Date(booking.createdAt);
          return bookingDate.toDateString() === yesterday.toDateString();
        });
        break;
      case 'thisweek':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        filtered = bookings.filter(booking => {
          const bookingDate = new Date(booking.createdAt);
          return bookingDate >= startOfWeek && bookingDate <= endOfWeek;
        });
        break;
      case 'previous':
        const startOfPreviousWeek = new Date(now.setDate(now.getDate() - now.getDay() - 6));
        const endOfPreviousWeek = new Date(startOfPreviousWeek);
        endOfPreviousWeek.setDate(startOfPreviousWeek.getDate() + 6);
        filtered = bookings.filter(booking => {
          const bookingDate = new Date(booking.createdAt);
          return bookingDate >= startOfPreviousWeek && bookingDate <= endOfPreviousWeek;
        });
        break;
      default:
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        filtered = bookings.filter(booking => {
          const bookingDate = new Date(booking.createdAt);
          return bookingDate >= thirtyDaysAgo;
        });
        break;
    }

    console.log('Filtered Data:', filtered); // Debugging filtered data
    setFilteredBookings(filtered);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const getRowClassName = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-teal-100 border-teal-300';
      case 'CANCELLED':
        return 'bg-red-100 border-red-300';
      case 'PENDING':
        return 'bg-yellow-100 border-yellow-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Container */}
      <div className="container mx-auto p-24 flex-1">
        <h1 className="text-2xl font-bold mb-4 text-teal-900">Bookings</h1>

        {/* Filter Buttons */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button onClick={() => handleFilterChange('recent')} className="px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-700 transition duration-300">All records</button>
          <button onClick={() => handleFilterChange('today')} className="px-4 py-2 bg-teal-700 text-white rounded hover:bg-teal-600 transition duration-300">Today</button>
          <button onClick={() => handleFilterChange('yesterday')} className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-500 transition duration-300">Yesterday</button>
          <button onClick={() => handleFilterChange('thisweek')} className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-400 transition duration-300">This Week</button>
          <button onClick={() => handleFilterChange('previous')} className="px-4 py-2 bg-teal-400 text-white rounded hover:bg-teal-300 transition duration-300">Previous Records</button>
        </div>

        {/* Booking Table */}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-teal-900 text-white">
              <th className="py-2 px-4 border-b">Booking ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Slot</th>
              <th className="py-2 px-4 border-b">Booking Time</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Device Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <tr key={booking.bookingId} className={`border ${getRowClassName(booking.status)}`}>
                  <td className="py-2 px-4 border-b">{booking.bookingId}</td>
                  <td className="py-2 px-4 border-b">{booking.user.fullName}</td>
                  <td className="py-2 px-4 border-b">{booking.slot.id}</td>
                  <td className="py-2 px-4 border-b">{new Date(booking.bookingTime).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{booking.status}</td>
                  <td className="py-2 px-4 border-b">{booking.deviceType}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-2 px-4 text-center text-gray-500">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewBooking;
