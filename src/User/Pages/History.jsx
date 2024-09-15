

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { FaMapMarkerAlt, FaCalendarAlt, FaBatteryHalf, FaTag } from 'react-icons/fa';

// function BookingHistory() {
//   const { userId } = useParams();
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const storedUserId = sessionStorage.getItem('userId');
//     const currentUserId = userId || storedUserId;

//     if (currentUserId) {
//       fetchBookings(currentUserId);
//     } else {
//       setError('No user ID found.');
//     }
//   }, [userId]);

//   const fetchBookings = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:1000/api/bookings/user/${userId}`);
//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }
//       const data = await response.json();
//       setBookings(data);
//     } catch (error) {
//       setError('Failed to fetch bookings.');
//       console.error('Error fetching bookings:', error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
//       <main className="flex-grow pt-16 px-4 sm:px-6 lg:px-8">
//         <section className="bg-white py-8 rounded-lg shadow-lg mb-6">
//           <div className="container mx-auto">
//             <h2 className="text-3xl font-semibold text-teal-700 mb-4">Booking History</h2>
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             {bookings.length === 0 ? (
//               <p className="text-gray-600">No bookings found.</p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {bookings.map((booking) => (
//                   <div key={booking.bookingId} className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
//                     <h3 className="text-xl font-semibold text-teal-700 mb-2 flex items-center">
//                       <FaTag className="text-teal-500 mr-2" /> Booking ID: {booking.bookingId}
//                     </h3>
//                     <p className="text-gray-600 flex items-center mb-2">
//                       <FaMapMarkerAlt className="text-teal-500 mr-2" /> 
//                       Slot ID: {booking.slot && booking.slot.id ? booking.slot.id : 'N/A'}
//                     </p>
//                     {booking.slot && booking.slot.chargingStation ? (
//                       <div className="mb-4">
//                         <p className="text-gray-600 flex items-center mb-1">
//                           <FaMapMarkerAlt className="text-teal-500 mr-2" />
//                           Charging Station Name: {booking.slot.chargingStation.chargingStationName}
//                         </p>
//                         <p className="text-gray-600 flex items-center mb-1">
//                           <FaMapMarkerAlt className="text-teal-500 mr-2" />
//                           Location: {booking.slot.chargingStation.chargingStationLocation}
//                         </p>
//                         <p className="text-gray-600 flex items-center">
//                           <FaMapMarkerAlt className="text-teal-500 mr-2" />
//                           Address: {booking.slot.chargingStation.chargingStationAddress}
//                         </p>
//                       </div>
//                     ) : (
//                       <p className="text-gray-600">Charging Station Details: N/A</p>
//                     )}
//                     <p className="text-gray-600 flex items-center mb-2">
//                       <FaCalendarAlt className="text-teal-500 mr-2" />
//                       Booking Time: {new Date(booking.bookingTime).toLocaleString()}
//                     </p>
//                     <p className="text-gray-600 flex items-center mb-2">
//                       <FaBatteryHalf className="text-teal-500 mr-2" />
//                       Status: {booking.status}
//                     </p>
//                     <p className="text-gray-600 flex items-center">
//                       <FaBatteryHalf className="text-teal-500 mr-2" />
//                       Device Type: {booking.deviceType}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default BookingHistory;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaBatteryHalf, FaTag } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

function BookingHistory() {
  const { userId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    const currentUserId = userId || storedUserId;

    if (currentUserId) {
      fetchBookings(currentUserId);
    } else {
      setError('No user ID found.');
    }
  }, [userId]);

  const fetchBookings = async (userId) => {
    try {
      const response = await fetch(`http://localhost:1000/api/bookings/user/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setError('Failed to fetch bookings.');
      console.error('Error fetching bookings:', error);
    }
  };

  const groupBookingsByMonth = (bookings) => {
    const grouped = bookings.reduce((acc, booking) => {
      const monthYear = format(parseISO(booking.bookingTime), 'MMMM yyyy');
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(booking);
      return acc;
    }, {});

    const sortedGrouped = Object.entries(grouped)
      .sort(([a], [b]) => new Date(b) - new Date(a));

    const sortedBookings = sortedGrouped.map(([monthYear, bookings]) => [
      monthYear,
      bookings.sort((a, b) => b.bookingId - a.bookingId),
    ]);

    return sortedBookings;
  };

  const groupedBookings = groupBookingsByMonth(bookings);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="flex-grow pt-16 px-4 sm:px-6 lg:px-8">
        <section className="bg-white py-8 rounded-lg shadow-lg mb-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold text-teal-700 mb-4">Booking History</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {groupedBookings.length === 0 ? (
              <p className="text-gray-600">No bookings found.</p>
            ) : (
              groupedBookings.map(([monthYear, bookings]) => (
                <div key={monthYear} className="mb-8">
                  <h3 className="text-2xl font-semibold text-teal-700 mb-4">{monthYear}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => {
                      const bookingDate = format(parseISO(booking.bookingTime), 'MMMM dd, yyyy');
                      const bookingTime = format(parseISO(booking.bookingTime), 'hh:mm a');
                      return (
                        <div key={booking.bookingId} className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                          <h4 className="text-xl font-semibold text-teal-700 mb-2 flex items-center">
                            <FaTag className="text-teal-500 mr-2" /> Booking ID: {booking.bookingId}
                          </h4>
                          <p className="text-gray-600 flex items-center mb-2">
                            <FaMapMarkerAlt className="text-teal-500 mr-2" />
                            Slot ID: {booking.slot && booking.slot.id ? booking.slot.id : 'N/A'}
                          </p>
                          {booking.slot && booking.slot.chargingStation ? (
                            <div className="mb-4">
                              <p className="text-gray-600 flex items-center mb-1">
                                <FaMapMarkerAlt className="text-teal-500 mr-2" />
                                Charging Station Name: {booking.slot.chargingStation.chargingStationName}
                              </p>
                              <p className="text-gray-600 flex items-center mb-1">
                                <FaMapMarkerAlt className="text-teal-500 mr-2" />
                                Location: {booking.slot.chargingStation.chargingStationLocation}
                              </p>
                              <p className="text-gray-600 flex items-center">
                                <FaMapMarkerAlt className="text-teal-500 mr-2" />
                                Address: {booking.slot.chargingStation.chargingStationAddress}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-600">Charging Station Details: N/A</p>
                          )}
                          <p className="text-gray-600 flex items-center mb-2">
                            <FaCalendarAlt className="text-teal-500 mr-2" />
                            Booking Date: {bookingDate} at {bookingTime}
                          </p>
                          <p className="text-gray-600 flex items-center mb-2">
                            <FaBatteryHalf className="text-teal-500 mr-2" />
                            Status: {booking.status}
                          </p>
                          <p className="text-gray-600 flex items-center">
                            <FaBatteryHalf className="text-teal-500 mr-2" />
                            Device Type: {booking.deviceType}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default BookingHistory;
