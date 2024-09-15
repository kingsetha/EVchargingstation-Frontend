

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
// import { IoIosArrowForward } from 'react-icons/io';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// function ViewDetails() {
//   const { id } = useParams();
//   const [station, setStation] = useState(null);
//   const [slots, setSlots] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStationDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:1000/StationAdmin/${id}`);
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         setStation(data);

//         const slotsResponse = await fetch(`http://localhost:1000/station/slots/available?stationId=${id}`);
//         if (!slotsResponse.ok) throw new Error(`HTTP error! status: ${slotsResponse.status}`);
//         const slotsData = await slotsResponse.json();
//         setSlots(slotsData);
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError('Failed to fetch station details or slots.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStationDetails();
//   }, [id]);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentLocation({ latitude, longitude });
//         },
//         (error) => {
//           console.error('Error getting location', error);
//           setError('Unable to retrieve your location.');
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   const getTodayDateRange = () => {
//     const now = new Date();
//     const startOfDay = new Date(now.setHours(0, 0, 0, 0));
//     const endOfDay = new Date(now.setHours(23, 59, 59, 999));
//     return { startOfDay, endOfDay };
//   };

//   const filteredSlots = slots.filter(slot => {
//     const slotEnd = new Date(slot.endTime);
//     return slotEnd > new Date(); // Slot's end time should be in the future
//   });

//   const handleBookSlot = (slotId) => {
//     navigate(`/slotbook/${id}/${slotId}`);
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <main className="flex-grow pt-16"> {/* Padding to account for the fixed navbar */}
//         <section className="bg-white py-12 shadow-md rounded-lg">
//           <div className="container mx-auto px-4">
//             {loading ? (
//               <div className="flex justify-center items-center h-48">
//                 <div className="loader">Loading...</div>
//               </div>
//             ) : error ? (
//               <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
//                 {error}
//               </div>
//             ) : (
//               <div>
//                 <h1 className="text-3xl font-bold text-teal-700 mb-4">{station?.chargingStationName}</h1>
//                 <p className="text-gray-600 mb-4 flex items-center">
//                   <FaMapMarkerAlt className="mr-2" />
//                   {station?.chargingStationLocation}
//                 </p>

//                 {/* Map Integration */}
//                 <div className="mb-6 h-96 relative">
//                   {station && (
//                     <MapContainer
//                       center={[station.latitude, station.longitude]}
//                       zoom={12}
//                       style={{ height: '100%', width: '100%' }}
//                       className="absolute top-0 left-0 w-full h-full"
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                       />
//                       <Marker position={[station.latitude, station.longitude]}>
//                         <Popup>
//                           {station.name}<br />
//                           {station.address}
//                         </Popup>
//                       </Marker>
//                       {currentLocation && (
//                         <Marker position={[currentLocation.latitude, currentLocation.longitude]}>
//                           <Popup>
//                             Your location
//                           </Popup>
//                         </Marker>
//                       )}
//                     </MapContainer>
//                   )}
//                 </div>

//                 <h2 className="text-2xl font-bold text-teal-700 mb-4">Available Slots</h2>
//                 <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6">
//                   {filteredSlots.length > 0 ? (
//                     filteredSlots.map((slot) => (
//                       <div
//                         key={slot.id}
//                         className={`flex justify-between items-center border-b last:border-b-0 py-4 ${slot.status === 'AVAILABLE' ? 'text-gray-800' : 'text-gray-400'}`}
//                       >
//                         <div className="flex items-center">
//                           <FaRegClock className="mr-2 text-gray-500" />
//                           {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
//                         </div>
//                         {slot.status === 'AVAILABLE' ? (
//                           <button
//                             onClick={() => handleBookSlot(slot.id)}
//                             className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 flex items-center"
//                           >
//                             <IoIosArrowForward className="ml-2" />
//                             Book Slot
//                           </button>
//                         ) : (
//                           <span className="text-gray-400">Not Available</span>
//                         )}
//                       </div>
//                     ))
//                   ) : (
//                     <p>No slots available for today.</p>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default ViewDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ViewDetails() {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:1000/StationAdmin/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setStation(data);

        const slotsResponse = await fetch(`http://localhost:1000/station/slots/available?stationId=${id}`);
        if (!slotsResponse.ok) throw new Error(`HTTP error! status: ${slotsResponse.status}`);
        const slotsData = await slotsResponse.json();
        setSlots(slotsData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch station details or slots.');
      } finally {
        setLoading(false);
      }
    };

    fetchStationDetails();
  }, [id]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting location', error);
          setError('Unable to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const getTodayDateRange = () => {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));
    return { startOfDay, endOfDay };
  };

  const filteredSlots = slots.filter(slot => {
    const slotEnd = new Date(slot.endTime);
    return slotEnd > new Date(); // Slot's end time should be in the future
  });

  const handleBookSlot = (slotId) => {
    navigate(`/slotbook/${id}/${slotId}`);
  };

  const getGoogleMapsLink = () => {
    if (station && currentLocation) {
      const { latitude: stationLat, longitude: stationLng } = station;
      const { latitude: userLat, longitude: userLng } = currentLocation;
      return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${stationLat},${stationLng}`;
    }
    return '#';
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow pt-16"> {/* Padding to account for the fixed navbar */}
        <section className="bg-white py-12 shadow-md rounded-lg">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="loader">Loading...</div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                {error}
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold text-teal-700 mb-4">{station?.chargingStationName}</h1>
                <p className="text-gray-600 mb-4 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {station?.chargingStationLocation}
                </p>

                {/* Map Integration */}
                <div className="mb-6 h-96 relative">
                  {station && (
                    <MapContainer
                      center={[station.latitude, station.longitude]}
                      zoom={12}
                      style={{ height: '100%', width: '100%' }}
                      className="absolute top-0 left-0 w-full h-full"
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[station.latitude, station.longitude]}>
                        <Popup>
                          {station.chargingStationName}<br />
                          {station.chargingStationLocation}
                        </Popup>
                      </Marker>
                      {currentLocation && (
                        <Marker position={[currentLocation.latitude, currentLocation.longitude]}>
                          <Popup>
                            Your location
                          </Popup>
                        </Marker>
                      )}
                    </MapContainer>
                  )}
                </div>

                {/* View on Google Maps Button */}
                {station && currentLocation && (
                  <div className="mb-6">
                    <a
                      href={getGoogleMapsLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center"
                    >
                      <FaMapMarkerAlt className="mr-2" />
                      View on Google Maps
                    </a>
                  </div>
                )}

                <h2 className="text-2xl font-bold text-teal-700 mb-4">Available Slots</h2>
                <div className="bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6">
                  {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`flex justify-between items-center border-b last:border-b-0 py-4 ${slot.status === 'AVAILABLE' ? 'text-gray-800' : 'text-gray-400'}`}
                      >
                        <div className="flex items-center">
                          <FaRegClock className="mr-2 text-gray-500" />
                          {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
                        </div>
                        {slot.status === 'AVAILABLE' ? (
                          <button
                            onClick={() => handleBookSlot(slot.id)}
                            className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 flex items-center"
                          >
                            <IoIosArrowForward className="ml-2" />
                            Book Slot
                          </button>
                        ) : (
                          <span className="text-gray-400">Not Available</span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>No slots available for today.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ViewDetails;
