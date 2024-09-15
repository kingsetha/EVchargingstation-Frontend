// //leaflet

// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaRegClock, FaArrowLeft } from 'react-icons/fa';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet-routing-machine';

// const VALID_DEVICE_TYPES = ['LEVEL_1', 'LEVEL_2', 'DC_FAST_CHARGING'];

// function SlotBook() {
//   const { id: stationId, slotId } = useParams();
//   const [station, setStation] = useState(null);
//   const [slot, setSlot] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [deviceType, setDeviceType] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const mapRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSlotDetails = async () => {
//       setLoading(true);
//       try {
//         const stationResponse = await fetch(`http://localhost:1000/StationAdmin/${stationId}`);
//         if (!stationResponse.ok) throw new Error(`HTTP error! status: ${stationResponse.status}`);
//         const stationData = await stationResponse.json();
//         setStation(stationData);

//         const slotsResponse = await fetch(`http://localhost:1000/station/slots/available?stationId=${stationId}`);
//         if (!slotsResponse.ok) throw new Error(`HTTP error! status: ${slotsResponse.status}`);
//         const slotsData = await slotsResponse.json();
//         console.log('Slots Data:', slotsData);

//         const selectedSlot = slotsData.find(slot => slot.id === parseInt(slotId));
//         if (selectedSlot) {
//           setSlot(selectedSlot);
//         } else {
//           setError('Selected slot not found.');
//         }
//       } catch (err) {
//         setError(`Failed to fetch slot details: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSlotDetails();
//   }, [stationId, slotId]);

//   useEffect(() => {
//     if (station) {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           position => {
//             setUserLocation({
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             });
//           },
//           error => {
//             console.error('Error getting user location:', error);
//             setError('Unable to get your location.');
//           }
//         );
//       } else {
//         setError('Geolocation is not supported by this browser.');
//       }
//     }
//   }, [station]);

//   useEffect(() => {
//     if (userLocation && station && mapRef.current) {
//       const map = L.map(mapRef.current, {
//         center: [userLocation.lat, userLocation.lng],
//         zoom: 14,
//         zoomControl: false,
//       });

//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 19,
//       }).addTo(map);

//       L.marker([userLocation.lat, userLocation.lng])
//         .addTo(map)
//         .bindPopup('You')
//         .openPopup();

//       L.marker([station.latitude, station.longitude])
//         .addTo(map)
//         .bindPopup('Station')
//         .openPopup();

//       // Add routing
//       L.Routing.control({
//         waypoints: [
//           L.latLng(userLocation.lat, userLocation.lng),
//           L.latLng(station.latitude, station.longitude)
//         ],
//         routeWhileDragging: true,
//         createMarker: () => null // Prevent default marker creation
//       }).addTo(map);
//     }
//   }, [userLocation, station]);

//   const handleSelectDeviceType = (type) => {
//     if (VALID_DEVICE_TYPES.includes(type) && checkAvailability(type)) {
//       setDeviceType(type);
//       setError(null);
//     } else {
//       setError('Selected device type is not available.');
//     }
//   };

//   const handleConfirmBooking = async () => {
//     const userId = sessionStorage.getItem('userId');

//     if (!userId) {
//       setError('User not logged in.');
//       return;
//     }

//     if (deviceType && slot) {
//       const bookingData = {
//         user: {
//           id: parseInt(userId, 10),
//         },
//         slot: {
//           id: parseInt(slotId, 10),
//           startTime: slot.startTime || null,
//           endTime: slot.endTime || null,
//           chargingType: deviceType,
//           status: slot.status || 'AVAILABLE',
//         },
//         bookingTime: new Date().toISOString(),
//         status: 'PENDING',
//         deviceType: deviceType,
//         paymentStatus: 'PENDING',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };

//       console.log("Sending Booking Data:", bookingData);

//       try {
//         const response = await axios.post('http://localhost:1000/api/bookings', bookingData, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.status === 201) {
//           const { bookingId } = response.data;
//           console.log("Booking ID:", bookingId);
//           console.log(`Navigating to /confirmation/${stationId}/${slotId}/${deviceType}/${bookingId}`);
// // navigate(`/confirmation/${stationId}/${slotId}/${deviceType}/${bookingId}`);

//           navigate(`/confirmation/${stationId}/${slotId}/${deviceType}/${bookingId}`);
//         } else {
//           Swal.fire({
//             icon: 'error',
//             title: 'Booking Error',
//             text: 'There was an error confirming your booking.',
//           });
//         }
//       } catch (error) {
//         console.error('Booking error:', error.response ? error.response.data : error.message);
//         Swal.fire({
//           icon: 'error',
//           title: 'Booking Error',
//           text: error.response ? error.response.data.message || 'No details available' : error.message,
//         });
//       }
//     } else {
//       setError('Please select a device type and ensure slot information is available.');
//     }
//   };

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   const computeDeviceCounts = () => {
//     if (!slot) return { level1Available: 0, level2Available: 0, dcFastChargingAvailable: 0, level1Booked: 0, level2Booked: 0, dcFastChargingBooked: 0 };

//     const { level1Count, level2Count, dcFastChargingCount, booked = {} } = slot;

//     const level1Available = level1Count || 0;
//     const level2Available = level2Count || 0;
//     const dcFastChargingAvailable = dcFastChargingCount || 0;

//     const level1Booked = booked.level1 || 0;
//     const level2Booked = booked.level2 || 0;
//     const dcFastChargingBooked = booked.dcFastCharging || 0;

//     return {
//       level1Available,
//       level2Available,
//       dcFastChargingAvailable,
//       level1Booked,
//       level2Booked,
//       dcFastChargingBooked,
//     };
//   };

//   const checkAvailability = (type) => {
//     const {
//       level1Available,
//       level2Available,
//       dcFastChargingAvailable,
//     } = computeDeviceCounts();

//     switch (type) {
//       case 'LEVEL_1':
//         return level1Available > 0;
//       case 'LEVEL_2':
//         return level2Available > 0;
//       case 'DC_FAST_CHARGING':
//         return dcFastChargingAvailable > 0;
//       default:
//         return false;
//     }
//   };

//   const {
//     level1Available,
//     level2Available,
//     dcFastChargingAvailable,
//     level1Booked,
//     level2Booked,
//     dcFastChargingBooked
//   } = computeDeviceCounts();

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <main className="flex-grow pt-16">
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
//                 <button
//                   onClick={handleGoBack}
//                   className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
//                 >
//                   <FaArrowLeft className="mr-2" /> Back
//                 </button>

//                 <h1 className="text-3xl font-bold text-teal-700 mb-4">Book Slot at {station.chargingStationName}</h1>
//                 <p className="text-gray-600 mb-4">Address: {station.address}</p>

//                 <div className="mb-6">
//                   <div className="border rounded-lg overflow-hidden">
//                     <div
//                       id="map"
//                       ref={mapRef}
//                       style={{ height: '400px', width: '100%' }}
//                     ></div>
//                   </div>
//                 </div>

//                 {slot ? (
//                   <div>
//                     <div className="p-6 border rounded-lg shadow-lg mb-6">
//                       <div className="flex items-center mb-4">
//                         <FaRegClock className="text-teal-500 text-2xl mr-3" />
//                         <span className="text-lg font-semibold">
//                           {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 mb-4">
//                         <strong>Available:</strong> LEVEL 1: {level1Available}, LEVEL 2: {level2Available}, DC Fast Charging: {dcFastChargingAvailable}
//                         <br />
//                         <strong>Booked:</strong> LEVEL 1: {level1Booked}, LEVEL 2: {level2Booked}, DC Fast Charging: {dcFastChargingBooked}
//                       </p>

//                       <div className="mt-6">
//                         <h2 className="text-xl font-bold text-teal-700 mb-4">Select Device Type</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           {VALID_DEVICE_TYPES.map(type => (
//                             <button
//                               key={type}
//                               onClick={() => handleSelectDeviceType(type)}
//                               className={`p-4 rounded-lg border shadow-md ${deviceType === type ? 'bg-teal-700 text-white border-teal-800' : (checkAvailability(type) ? 'bg-white text-teal-700 border-teal-300' : 'bg-gray-300 text-gray-700 border-gray-400')} hover:bg-teal-600 hover:text-white transition duration-300`}
//                               disabled={!checkAvailability(type)}
//                             >
//                               {type.replace('_', ' ')}
//                             </button>
//                           ))}
//                         </div>
//                         {deviceType && (
//                           <p className="mt-4 text-green-600 font-semibold">Selected Device Type: {deviceType.replace('_', ' ')}</p>
//                         )}
//                       </div>
//                     </div>

//                     <button
//                       onClick={handleConfirmBooking}
//                       className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 mt-6 flex items-center justify-center"
//                     >
//                       Confirm Booking
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="text-center text-gray-500">Slot not available</div>
//                 )}
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default SlotBook;


// //google map
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegClock, FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

const VALID_DEVICE_TYPES = ['LEVEL_1', 'LEVEL_2', 'DC_FAST_CHARGING'];

function SlotBook() {
  const { id: stationId, slotId } = useParams();
  const [station, setStation] = useState(null);
  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceType, setDeviceType] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlotDetails = async () => {
      setLoading(true);
      try {
        const stationResponse = await fetch(`http://localhost:1000/StationAdmin/${stationId}`);
        if (!stationResponse.ok) throw new Error(`HTTP error! status: ${stationResponse.status}`);
        const stationData = await stationResponse.json();
        setStation(stationData);

        const slotsResponse = await fetch(`http://localhost:1000/station/slots/available?stationId=${stationId}`);
        if (!slotsResponse.ok) throw new Error(`HTTP error! status: ${slotsResponse.status}`);
        const slotsData = await slotsResponse.json();
        console.log('Slots Data:', slotsData);

        const selectedSlot = slotsData.find(slot => slot.id === parseInt(slotId));
        if (selectedSlot) {
          setSlot(selectedSlot);
        } else {
          setError('Selected slot not found.');
        }
      } catch (err) {
        setError(`Failed to fetch slot details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSlotDetails();
  }, [stationId, slotId]);

  useEffect(() => {
    if (station) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          error => {
            console.error('Error getting user location:', error);
            setError('Unable to get your location.');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    }
  }, [station]);

  useEffect(() => {
    if (userLocation && station && mapRef.current) {
      const map = L.map(mapRef.current, {
        center: [userLocation.lat, userLocation.lng],
        zoom: 14,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      L.marker([userLocation.lat, userLocation.lng])
        .addTo(map)
        .bindPopup('You')
        .openPopup();

      L.marker([station.latitude, station.longitude])
        .addTo(map)
        .bindPopup('Station')
        .openPopup();

      // Add routing
      L.Routing.control({
        waypoints: [
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(station.latitude, station.longitude)
        ],
        routeWhileDragging: true,
        createMarker: () => null // Prevent default marker creation
      }).addTo(map);
    }
  }, [userLocation, station]);

  const handleSelectDeviceType = (type) => {
    if (VALID_DEVICE_TYPES.includes(type) && checkAvailability(type)) {
      setDeviceType(type);
      setError(null);
    } else {
      setError('Selected device type is not available.');
    }
  };

  const handleConfirmBooking = async () => {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
      setError('User not logged in.');
      return;
    }

    if (deviceType && slot) {
      const bookingData = {
        user: {
          id: parseInt(userId, 10),
        },
        slot: {
          id: parseInt(slotId, 10),
          startTime: slot.startTime || null,
          endTime: slot.endTime || null,
          chargingType: deviceType,
          status: slot.status || 'AVAILABLE',
        },
        bookingTime: new Date().toISOString(),
        status: 'PENDING',
        deviceType: deviceType,
        paymentStatus: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Sending Booking Data:", bookingData);

      try {
        const response = await axios.post('http://localhost:1000/api/bookings', bookingData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 201) {
          const { bookingId } = response.data;
          console.log("Booking ID:", bookingId);
          console.log(`Navigating to /confirmation/${stationId}/${slotId}/${deviceType}/${bookingId}`);

          navigate(`/confirmation/${stationId}/${slotId}/${deviceType}/${bookingId}`);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Booking Error',
            text: 'There was an error confirming your booking.',
          });
        }
      } catch (error) {
        console.error('Booking error:', error.response ? error.response.data : error.message);
        Swal.fire({
          icon: 'error',
          title: 'Booking Error',
          text: error.response ? error.response.data.message || 'No details available' : error.message,
        });
      }
    } else {
      setError('Please select a device type and ensure slot information is available.');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const computeDeviceCounts = () => {
    if (!slot) return { level1Available: 0, level2Available: 0, dcFastChargingAvailable: 0, level1Booked: 0, level2Booked: 0, dcFastChargingBooked: 0 };

    const { level1Count, level2Count, dcFastChargingCount, booked = {} } = slot;

    const level1Available = level1Count || 0;
    const level2Available = level2Count || 0;
    const dcFastChargingAvailable = dcFastChargingCount || 0;

    const level1Booked = booked.level1 || 0;
    const level2Booked = booked.level2 || 0;
    const dcFastChargingBooked = booked.dcFastCharging || 0;

    return {
      level1Available,
      level2Available,
      dcFastChargingAvailable,
      level1Booked,
      level2Booked,
      dcFastChargingBooked,
    };
  };

  const checkAvailability = (type) => {
    const {
      level1Available,
      level2Available,
      dcFastChargingAvailable,
    } = computeDeviceCounts();

    switch (type) {
      case 'LEVEL_1':
        return level1Available > 0;
      case 'LEVEL_2':
        return level2Available > 0;
      case 'DC_FAST_CHARGING':
        return dcFastChargingAvailable > 0;
      default:
        return false;
    }
  };

  const {
    level1Available,
    level2Available,
    dcFastChargingAvailable,
    level1Booked,
    level2Booked,
    dcFastChargingBooked
  } = computeDeviceCounts();

  const googleMapsUrl = userLocation && station
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${station.latitude},${station.longitude}&travelmode=driving`
    : '#';

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow pt-16">
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
                <button
                  onClick={handleGoBack}
                  className="flex items-center text-teal-600 mb-6 hover:text-teal-800 transition duration-300"
                >
                  <FaArrowLeft className="mr-2" /> Back
                </button>

                <h1 className="text-3xl font-bold text-teal-700 mb-4">Book Slot at {station.chargingStationName}</h1>
                <p className="text-gray-600 mb-4">Address: {station.address}</p>
              
                {userLocation && station && (
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center mt-6 text-teal-600 hover:text-teal-800 transition duration-300"
                      >
                        <FaMapMarkerAlt className="mr-2" /> View Route on Google Maps
                      </a>
                    )} <br/>
                <div className="mb-6">
                  <div className="border rounded-lg overflow-hidden">
                    <div
                      id="map"
                      ref={mapRef}
                      style={{ height: '400px', width: '100%' }}
                    ></div>
                  </div>
                </div>
                
                {slot ? (
                  <div>
                    <div className="p-6 border rounded-lg shadow-lg mb-6">
                      <div className="flex items-center mb-4">
                        <FaRegClock className="text-teal-500 text-2xl mr-3" />
                        <span className="text-lg font-semibold">
                          {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">
                        <strong>Available:</strong> LEVEL 1: {level1Available}, LEVEL 2: {level2Available}, DC Fast Charging: {dcFastChargingAvailable}
                        <br />
                        <strong>Booked:</strong> LEVEL 1: {level1Booked}, LEVEL 2: {level2Booked}, DC Fast Charging: {dcFastChargingBooked}
                      </p>

                      <div className="mt-6">
                        <h2 className="text-xl font-bold text-teal-700 mb-4">Select Device Type</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {VALID_DEVICE_TYPES.map(type => (
                            <button
                              key={type}
                              onClick={() => handleSelectDeviceType(type)}
                              className={`p-4 rounded-lg border shadow-md ${deviceType === type ? 'bg-teal-700 text-white border-teal-800' : (checkAvailability(type) ? 'bg-white text-teal-700 border-teal-300' : 'bg-gray-300 text-gray-700 border-gray-400')} hover:bg-teal-600 hover:text-white transition duration-300`}
                              disabled={!checkAvailability(type)}
                            >
                              {type.replace('_', ' ')}
                            </button>
                          ))}
                        </div>
                        {deviceType && (
                          <p className="mt-4 text-green-600 font-semibold">Selected Device Type: {deviceType.replace('_', ' ')}</p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleConfirmBooking}
                      className="bg-teal-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 mt-6 flex items-center justify-center"
                    >
                      Confirm Booking
                    </button>

                  </div>
                ) : (
                  <div className="text-center text-gray-500">Slot not available</div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SlotBook;
