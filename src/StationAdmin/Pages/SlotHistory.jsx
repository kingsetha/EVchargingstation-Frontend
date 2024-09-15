

// import React, { useState, useEffect } from 'react'; 
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { FaExclamationCircle, FaSyncAlt } from 'react-icons/fa'; // Import icons for no slots and refresh

// const SlotHistory = () => {
//   const [slots, setSlots] = useState([]);
//   const [currentCategory, setCurrentCategory] = useState('today');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to get stationAdminId from session storage
//   const getStationAdminId = () => {
//     const userId = sessionStorage.getItem('userId'); // Retrieve userId from session storage
//     return userId ? parseInt(userId, 10) : null; // Convert to integer and return
//   };

//   // Fetch slots when component mounts or currentCategory changes
//   useEffect(() => {
//     const stationAdminId = getStationAdminId();
//     if (stationAdminId) {
//       fetchSlots(stationAdminId);
//     } else {
//       setError('Invalid or missing stationAdminId.');
//       setLoading(false);
//     }
//   }, [currentCategory]);

//   const fetchSlots = async (id) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`http://localhost:1000/station/slots/history/${id}`);
//       console.log('Slots fetched:', response.data); // Log the response data
//       setSlots(response.data);
//     } catch (error) {
//       console.error('Error fetching slots:', error); // Log the error
//       setError(`Error fetching slot data: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const parseDate = (dateStr) => {
//     return new Date(dateStr);
//   };

//   const categorizeSlots = () => {
//     const now = new Date();

//     // Calculate the start and end times for each category
//     const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const todayEnd = new Date(todayStart);
//     todayEnd.setDate(todayEnd.getDate() + 1); // End of today

//     const yesterdayStart = new Date(todayStart);
//     yesterdayStart.setDate(yesterdayStart.getDate() - 1);
//     const yesterdayEnd = todayStart; // End of yesterday is start of today

//     const startOfWeek = now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1); // Adjust to Monday
//     const lastWeekStart = new Date(now.setDate(startOfWeek - 7)); // Start of last week
//     const lastWeekEnd = new Date(now.setDate(startOfWeek)); // Start of this week

//     const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1; // Last month index
//     const lastMonthStart = new Date(now.getFullYear(), lastMonth, 1);
//     const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of last month

//     return slots.filter(slot => {
//       const slotEndDate = parseDate(slot.endTime);
//       switch (currentCategory) {
//         case 'today':
//           return slotEndDate >= todayStart && slotEndDate < todayEnd;
//         case 'yesterday':
//           return slotEndDate >= yesterdayStart && slotEndDate < yesterdayEnd;
//         case 'lastWeek':
//           return slotEndDate >= lastWeekStart && slotEndDate < lastWeekEnd;
//         case 'lastMonth':
//           return slotEndDate >= lastMonthStart && slotEndDate <= lastMonthEnd;
//         case 'older':
//           return slotEndDate < lastMonthStart;
//         default:
//           return false;
//       }
//     });
//   };

//   const handleViewDetails = (slot) => {
//     Swal.fire({
//       title: 'Slot Details',
//       html: `
//         <p><strong>Start Time:</strong> ${parseDate(slot.startTime).toLocaleString()}</p>
//         <p><strong>End Time:</strong> ${parseDate(slot.endTime).toLocaleString()}</p>
//         <p><strong>Status:</strong> ${slot.status}</p>
//         <p><strong>Level 1 Count:</strong> ${slot.level1Count}</p>
//         <p><strong>Level 2 Count:</strong> ${slot.level2Count}</p>
//         <p><strong>DC Fast Charging Count:</strong> ${slot.dcFastChargingCount}</p>
//       `,
//       confirmButtonText: 'Close'
//     });
//   };

//   const filteredSlots = categorizeSlots();

//   const getCategoryColor = (category) => {
//     switch (category) {
//       case 'today':
//         return 'bg-teal-100';
//       case 'yesterday':
//         return 'bg-yellow-100';
//       case 'lastWeek':
//         return 'bg-blue-100';
//       case 'lastMonth':
//         return 'bg-purple-100';
//       case 'older':
//         return 'bg-gray-100';
//       default:
//         return 'bg-white';
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <main className="flex-grow container mx-auto p-10 mt-16">
//         {loading && <p className="text-lg font-medium text-gray-700">Loading...</p>}
//         {error && <p className="text-lg font-medium text-red-700">{error}</p>}

//         {!loading && !error && (
//           <>
//             <div className="flex justify-center mb-10">
//               <button
//                 onClick={() => setCurrentCategory('today')}
//                 className={`px-4 py-2 mr-2 rounded-md ${currentCategory === 'today' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//               >
//                 Today
//               </button>
//               <button
//                 onClick={() => setCurrentCategory('yesterday')}
//                 className={`px-4 py-2 mr-2 rounded-md ${currentCategory === 'yesterday' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//               >
//                 Yesterday
//               </button>
//               <button
//                 onClick={() => setCurrentCategory('lastWeek')}
//                 className={`px-4 py-2 mr-2 rounded-md ${currentCategory === 'lastWeek' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//               >
//                 Last Week
//               </button>
//               <button
//                 onClick={() => setCurrentCategory('lastMonth')}
//                 className={`px-4 py-2 mr-2 rounded-md ${currentCategory === 'lastMonth' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//               >
//                 Last Month
//               </button>
//               <button
//                 onClick={() => setCurrentCategory('older')}
//                 className={`px-4 py-2 rounded-md ${currentCategory === 'older' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//               >
//                 Older
//               </button>
//             </div>

//             {filteredSlots.length === 0 ? (
//               <div className="flex items-center justify-center min-h-[300px] bg-gray-50 p-6 rounded-lg shadow-lg">
//                 <div className="text-center">
//                   <FaExclamationCircle className="text-red-500 text-4xl mb-4 mx-auto" />
//                   <p className="text-lg font-medium text-gray-700 mb-4">No slots available for the selected category.</p>
//                   <button
//                     onClick={() => fetchSlots(getStationAdminId())} // Refresh data
//                     className="flex items-center justify-center mx-auto px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
//                   >
//                     <FaSyncAlt className="mr-2" />
//                     Refresh
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredSlots.map(slot => (
//                   <div key={slot.id} className={`flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm ${getCategoryColor(currentCategory)}`}>
//                     <div>
//                       <p><strong>Start Time:</strong> {parseDate(slot.startTime).toLocaleString()}</p>
//                       <p><strong>End Time:</strong> {parseDate(slot.endTime).toLocaleString()}</p>
//                       <p><strong>Status:</strong> {slot.status}</p>
//                       <p><strong>Level 1 Count:</strong> {slot.level1Count}</p>
//                       <p><strong>Level 2 Count:</strong> {slot.level2Count}</p>
//                       <p><strong>DC Fast Charging Count:</strong> {slot.dcFastChargingCount}</p>
//                     </div>
//                     <button
//                       onClick={() => handleViewDetails(slot)}
//                       className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default SlotHistory;

import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaExclamationCircle, FaSyncAlt } from 'react-icons/fa'; // Import icons for no slots and refresh

const SlotHistory = () => {
  const [slots, setSlots] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('today');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get stationAdminId from session storage
  const getStationAdminId = () => {
    const userId = sessionStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  };

  // Fetch slots when component mounts or currentCategory changes
  useEffect(() => {
    const stationAdminId = getStationAdminId();
    if (stationAdminId) {
      fetchSlots(stationAdminId);
    } else {
      setError('Invalid or missing stationAdminId.');
      setLoading(false);
    }
  }, [currentCategory]);

  const fetchSlots = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:1000/station/slots/history/${id}`);
      console.log('Slots fetched:', response.data); // Log the response data
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error); // Log the error
      setError(`Error fetching slot data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const parseDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date() : date; // Return a default date if invalid
  };

  const categorizeSlots = () => {
    const now = new Date();

    // Calculate the start and end times for each category
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1); // End of today

    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const yesterdayEnd = todayStart; // End of yesterday is start of today

    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)); // Start of the week (Monday)
    const lastWeekStart = new Date(startOfWeek);
    lastWeekStart.setDate(startOfWeek.getDate() - 7); // Start of last week
    const lastWeekEnd = startOfWeek; // End of last week

    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of last month

    return slots.filter(slot => {
      const slotEndDate = parseDate(slot.endTime);
      switch (currentCategory) {
        case 'today':
          return slotEndDate >= todayStart && slotEndDate < todayEnd;
        case 'yesterday':
          return slotEndDate >= yesterdayStart && slotEndDate < yesterdayEnd;
        case 'lastWeek':
          return slotEndDate >= lastWeekStart && slotEndDate < lastWeekEnd;
        case 'lastMonth':
          return slotEndDate >= lastMonthStart && slotEndDate <= lastMonthEnd;
        case 'older':
          return slotEndDate < lastMonthStart;
        default:
          return false;
      }
    });
  };

  const handleViewDetails = (slot) => {
    Swal.fire({
      title: 'Slot Details',
      html: `
        <p><strong>Start Time:</strong> ${parseDate(slot.startTime).toLocaleString()}</p>
        <p><strong>End Time:</strong> ${parseDate(slot.endTime).toLocaleString()}</p>
        <p><strong>Status:</strong> ${slot.status}</p>
        <p><strong>Level 1 Count:</strong> ${slot.level1Count}</p>
        <p><strong>Level 2 Count:</strong> ${slot.level2Count}</p>
        <p><strong>DC Fast Charging Count:</strong> ${slot.dcFastChargingCount}</p>
      `,
      confirmButtonText: 'Close'
    });
  };

  const filteredSlots = categorizeSlots();

  const getCategoryColor = (category) => {
    switch (category) {
      case 'today':
        return 'bg-teal-100';
      case 'yesterday':
        return 'bg-yellow-100';
      case 'lastWeek':
        return 'bg-blue-100';
      case 'lastMonth':
        return 'bg-purple-100';
      case 'older':
        return 'bg-gray-100';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-10 mt-16">
        {loading && <p className="text-lg font-medium text-gray-700">Loading...</p>}
        {error && <p className="text-lg font-medium text-red-700">{error}</p>}

        {!loading && !error && (
          <>
            <div className="flex justify-center mb-10">
              {['today', 'yesterday', 'lastWeek', 'lastMonth', 'older'].map(category => (
                <button
                  key={category}
                  onClick={() => setCurrentCategory(category)}
                  className={`px-4 py-2 mr-2 rounded-md ${currentCategory === category ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {filteredSlots.length === 0 ? (
              <div className="flex items-center justify-center min-h-[300px] bg-gray-50 p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <FaExclamationCircle className="text-red-500 text-4xl mb-4 mx-auto" />
                  <p className="text-lg font-medium text-gray-700 mb-4">No slots available for the selected category.</p>
                  <button
                    onClick={() => fetchSlots(getStationAdminId())} // Refresh data
                    className="flex items-center justify-center mx-auto px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                  >
                    <FaSyncAlt className="mr-2" />
                    Refresh
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSlots.map(slot => (
                  <div key={slot.id} className={`flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm ${getCategoryColor(currentCategory)}`}>
                    <div>
                      <p><strong>Start Time:</strong> {parseDate(slot.startTime).toLocaleString()}</p>
                      <p><strong>End Time:</strong> {parseDate(slot.endTime).toLocaleString()}</p>
                      <p><strong>Status:</strong> {slot.status}</p>
                      <p><strong>Level 1 Count:</strong> {slot.level1Count}</p>
                      <p><strong>Level 2 Count:</strong> {slot.level2Count}</p>
                      <p><strong>DC Fast Charging Count:</strong> {slot.dcFastChargingCount}</p>
                    </div>
                    <button
                      onClick={() => handleViewDetails(slot)}
                      className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default SlotHistory;
