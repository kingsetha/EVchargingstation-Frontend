


// //delete functionality
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '@fortawesome/fontawesome-free/css/all.min.css'; 
// import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

// const ViewStations = () => {
//   const [stations, setStations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedStationId, setSelectedStationId] = useState(null); // State for selected card

//   useEffect(() => {
//     axios.get('http://localhost:1000/superadmin/allStation')
//       .then(response => {
//         setStations(response.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch data: ' + err.message);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:1000/superadmin/deleteStation/${id}`)
//       .then(() => {
//         setStations(stations.filter(station => station.id !== id));
//         toast.success('Station deleted successfully');
//       })
//       .catch(err => {
//         toast.error('Failed to delete station: ' + err.message);
//       });
//   };

//   const handleBlockToggle = async (id) => {
//     const index = stations.findIndex(station => station.id === id);
//     if (index === -1) return;

//     const updatedStations = [...stations];
//     const currentStatus = updatedStations[index].isBlocked;
//     const newStatus = !currentStatus;

//     updatedStations[index] = { ...updatedStations[index], isBlocked: newStatus };
//     setStations(updatedStations);

//     try {
//       const response = await fetch(`http://localhost:1000/superadmin/${newStatus ? 'block' : 'unblock'}/${id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         console.log(`Station ${newStatus ? 'blocked' : 'unblocked'} successfully.`);
//         const updatedResponse = await axios.get('http://localhost:1000/superadmin/allStation');
//         setStations(updatedResponse.data);
//       } else {
//         const responseBody = await response.text(); // Get response body
//         console.error(`Failed to ${newStatus ? 'block' : 'unblock'} station: ${responseBody}`);
//         toast.error(`Failed to ${newStatus ? 'block' : 'unblock'} station: ${responseBody}`);
//       }
//     } catch (error) {
//       console.error('Error updating block status:', error);
//       toast.error('Error updating block status: ' + error.message);
//     }
//   };

//   if (loading) return <div className="text-center p-6">Loading...</div>;
//   if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

//   return (
//     <div className="bg-gray-100 min-h-screen pt-16"> {/* Add padding-top to offset fixed navbar */}
//       <div className="container mx-auto px-4 py-6">
//         <h1 className="text-2xl font-bold mb-4 text-teal-900">EV Charging Stations</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {stations.map((station) => {
//             let imageUrl = 'https://via.placeholder.com/300x200'; // Default placeholder image

//             if (station.imageUrl) {
//               if (station.imageUrl.startsWith('data:image/')) {
//                 imageUrl = station.imageUrl; // Base64 image
//               } else if (station.imageUrl.startsWith('http') || station.imageUrl.startsWith('https')) {
//                 imageUrl = station.imageUrl; // Direct URL
//               } else {
//                 imageUrl = `http://localhost:1000/${station.imageUrl}`; // Relative URL
//               }
//             }

//             const isSelected = station.id === selectedStationId; // Check if the card is selected

//             return (
//               <div
//                 key={station.id}
//                 className={`bg-white p-4 rounded-lg shadow-md transition-transform transform ${isSelected ? 'bg-teal-50' : 'hover:scale-105'} relative`}
//                 onClick={() => setSelectedStationId(station.id)}
//               >
//                 <img 
//                   src={imageUrl} 
//                   alt={station.chargingStationName} 
//                   onError={(e) => e.target.src = 'https://via.placeholder.com/300x200'} // Fallback image if the URL fails
//                   className="w-full h-40 object-cover rounded-lg mb-3" 
//                 />
//                 <h2 className="text-xl font-semibold text-teal-800 mb-2">{station.chargingStationName}</h2>
//                 <p className="text-gray-700 text-sm mb-2"><i className="fas fa-map-marker-alt mr-1"></i> {station.chargingStationAddress}</p>
//                 <p className="text-gray-700 text-sm mb-2"><i className="fas fa-bolt mr-1"></i> {station.totalDevice} Devices</p>
//                 <p className="text-gray-700 text-sm mb-2"><i className="fas fa-clock mr-1"></i> {station.openingHours || '24'}</p>
//                 <p className="text-gray-700 text-sm mb-3"><i className="fas fa-phone-alt mr-1"></i> {station.phoneNumber || 'N/A'}</p>

//                 <div className="flex items-center mb-3">
//                   <input 
//                     type="checkbox"
//                     checked={station.isBlocked}
//                     onChange={() => handleBlockToggle(station.id)}
//                     className={`mr-2 h-4 w-4 rounded ${station.isBlocked ? 'bg-teal-600 border-teal-600' : 'bg-gray-200 border-gray-300'}`}
//                   />
//                   <label className={`text-gray-700 text-sm ${station.isBlocked ? 'font-semibold' : 'font-normal'}`}>
//                     {station.isBlocked ? 'Blocked' : 'Block'}
//                   </label>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleDelete(station.id)}
//                     className="bg-teal-400 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
//                   >
//                     <i className="fas fa-trash-alt mr-1"></i> Delete
//                   </button>
//                 </div>
//                 <a 
//                   href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.chargingStationAddress)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-teal-600 hover:text-teal-800 underline text-sm flex items-center mt-3"
//                 >
//                   <i className="fas fa-map-marker-alt mr-1"></i> View on Map
//                 </a>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ViewStations;


//fetch image
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '@fortawesome/fontawesome-free/css/all.min.css'; 
// import { toast, ToastContainer } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css'; 

// // Example static image imports
// const imageImports = [
//   'https://file-loader-lambda-prod.s3.eu-west-1.amazonaws.com/pictures/web1-min_1698077767205.png',
//   'https://i0.wp.com/evduniya.com/wp-content/uploads/2021/09/GRIDEN-Power-EV-charging-station-solution.jpeg?resize=800%2C400&ssl=1&is-pending-load=1',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnShEPS0GKikH4ucpgWhGZGWHuHPfpKFJsZg&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM_waqqp22ACwYfw6By1v_mIo8dOcMH4Qypw&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DY9goTX-ZGnz99UiHdecREAB688H0VkYMg&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStX4n6zhVcLErMsawhcvUcvISR9SyuR1gNxA&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPMhave56P1VjVGIx-hO09gfxB2U-toGAUA&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAHqgK6RE0ipMS2N0giyl6XTHuEvxeoI0kwQ&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Ra0848psUiW_fZ-sa_mbQsY3gaE0pFOe8g&s',
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcwKavyNLtBKr3z9mSzor6ochtpjxyiWY-g&s'
// ];

// const ViewStations = () => {
//   const [stations, setStations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedStationId, setSelectedStationId] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:1000/superadmin/allStation')
//       .then(response => {
//         // Add static image URL to each station
//         const stationsWithImages = response.data.map((station, index) => ({
//           ...station,
//           imageUrl: imageImports[index % imageImports.length] // Cycle through the image imports
//         }));
//         setStations(stationsWithImages);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch data: ' + err.message);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:1000/superadmin/deleteStation/${id}`)
//       .then(() => {
//         setStations(stations.filter(station => station.id !== id));
//         toast.success('Station deleted successfully');
//       })
//       .catch(err => {
//         toast.error('Failed to delete station: ' + err.message);
//       });
//   };

//   const handleBlockToggle = async (id) => {
//     const index = stations.findIndex(station => station.id === id);
//     if (index === -1) return;

//     const updatedStations = [...stations];
//     const currentStatus = updatedStations[index].isBlocked;
//     const newStatus = !currentStatus;

//     updatedStations[index] = { ...updatedStations[index], isBlocked: newStatus };
//     setStations(updatedStations);

//     try {
//       const response = await fetch(`http://localhost:1000/superadmin/${newStatus ? 'block' : 'unblock'}/${id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         console.log(`Station ${newStatus ? 'blocked' : 'unblocked'} successfully.`);
//         const updatedResponse = await axios.get('http://localhost:1000/superadmin/allStation');
//         setStations(updatedResponse.data);
//       } else {
//         const responseBody = await response.text(); 
//         console.error(`Failed to ${newStatus ? 'block' : 'unblock'} station: ${responseBody}`);
//         toast.error(`Failed to ${newStatus ? 'block' : 'unblock'} station: ${responseBody}`);
//       }
//     } catch (error) {
//       console.error('Error updating block status:', error);
//       toast.error('Error updating block status: ' + error.message);
//     }
//   };

//   if (loading) return <div className="text-center p-6">Loading...</div>;
//   if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

//   return (
//     <div className="bg-gray-100 min-h-screen pt-16">
//       <div className="container mx-auto px-4 py-6">
//         <h1 className="text-2xl font-bold mb-4 text-teal-900">EV Charging Stations</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {stations.map((station) => {
//             const isSelected = station.id === selectedStationId; 

//             return (
//               <div
//                 key={station.id}
//                 className={`bg-white p-4 rounded-lg shadow-md transition-transform transform ${isSelected ? 'bg-teal-50' : 'hover:scale-105'} relative`}
//                 onClick={() => setSelectedStationId(station.id)}
//               >
//                 <img 
//                   src={station.imageUrl} 
//                   alt={station.chargingStationName} 
//                   onError={(e) => e.target.src = '/images/default.jpg'} 
//                   className="w-full h-40 object-cover rounded-lg mb-3" 
//                 />
//                 <h2 className="text-xl font-semibold text-teal-800 mb-2">{station.chargingStationName}</h2>
//                 <p className="text-gray-700 text-sm mb-2"><i className="fas fa-map-marker-alt mr-1"></i> {station.chargingStationAddress}</p>
//                 <p className="text-gray-700 text-sm mb-2"><i className="fas fa-bolt mr-1"></i> {station.totalDevice} Devices</p>
//                 <p className="text-gray-700 text-sm mb-2"><i className="fas fa-clock mr-1"></i> {station.openingHours || '24'}</p>
//                 <p className="text-gray-700 text-sm mb-3"><i className="fas fa-phone-alt mr-1"></i> {station.phoneNumber || 'N/A'}</p>

//                 <div className="flex items-center mb-3">
//                   <input 
//                     type="checkbox"
//                     checked={station.isBlocked}
//                     onChange={() => handleBlockToggle(station.id)}
//                     className={`mr-2 h-4 w-4 rounded ${station.isBlocked ? 'bg-teal-600 border-teal-600' : 'bg-gray-200 border-gray-300'}`}
//                   />
//                   <label className={`text-gray-700 text-sm ${station.isBlocked ? 'font-semibold' : 'font-normal'}`}>
//                     {station.isBlocked ? 'Blocked' : 'Block'}
//                   </label>
//                 </div>
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleDelete(station.id)}
//                     className="bg-teal-400 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
//                   >
//                     <i className="fas fa-trash-alt mr-1"></i> Delete
//                   </button>
//                 </div>
//                 <a 
//                   href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.chargingStationAddress)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-teal-600 hover:text-teal-800 underline text-sm flex items-center mt-3"
//                 >
//                   <i className="fas fa-map-marker-alt mr-1"></i> View on Map
//                 </a>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ViewStations;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const imageImports = [
  'https://file-loader-lambda-prod.s3.eu-west-1.amazonaws.com/pictures/web1-min_1698077767205.png',
  'https://i0.wp.com/evduniya.com/wp-content/uploads/2021/09/GRIDEN-Power-EV-charging-station-solution.jpeg?resize=800%2C400&ssl=1&is-pending-load=1',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnShEPS0GKikH4ucpgWhGZGWHuHPfpKFJsZg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM_waqqp22ACwYfw6By1v_mIo8dOcMH4Qypw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DY9goTX-ZGnz99UiHdecREAB688H0VkYMg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStX4n6zhVcLErMsawhcvUcvISR9SyuR1gNxA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlPMhave56P1VjVGIx-hO09gfxB2U-toGAUA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAHqgK6RE0ipMS2N0giyl6XTHuEvxeoI0kwQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Ra0848psUiW_fZ-sa_mbQsY3gaE0pFOe8g&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcwKavyNLtBKr3z9mSzor6ochtpjxyiWY-g&s'
];

const ViewStations = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStationId, setSelectedStationId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:1000/superadmin/allStation')
      .then(response => {
        const stationsWithImages = response.data.map((station, index) => ({
          ...station,
          imageUrl: imageImports[index % imageImports.length] // Cycle through the image imports
        }));
        setStations(stationsWithImages);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch data: ' + err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:1000/superadmin/deleteStation/${id}`)
      .then(() => {
        setStations(stations.filter(station => station.id !== id));
        toast.success('Station deleted successfully');
      })
      .catch(err => {
        toast.error('Failed to delete station: ' + err.message);
      });
  };

  const handleBlockToggle = async (id) => {
    const index = stations.findIndex(station => station.id === id);
    if (index === -1) return;

    const updatedStations = [...stations];
    const currentStatus = updatedStations[index].isBlocked;
    const newStatus = !currentStatus;

    updatedStations[index] = { ...updatedStations[index], isBlocked: newStatus };
    setStations(updatedStations);

    try {
      const response = await fetch(`http://localhost:1000/superadmin/${newStatus ? 'block' : 'unblock'}/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`Station ${newStatus ? 'blocked' : 'unblocked'} successfully.`);
        const updatedResponse = await axios.get('http://localhost:1000/superadmin/allStation');
        setStations(updatedResponse.data);
      } else {
        const responseBody = await response.text(); 
        console.error(`Failed to ${newStatus ? 'block' : 'unblock'} station: ${responseBody}`);
      }
    } catch (error) {
      console.error('Error updating block status:', error);
    }
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen pt-16">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4 text-teal-900">EV Charging Stations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stations.map((station) => {
            const isSelected = station.id === selectedStationId; 

            return (
              <div
                key={station.id}
                className={`bg-white p-4 rounded-lg shadow-md transition-transform transform ${isSelected ? 'bg-teal-50' : 'hover:scale-105'} relative`}
                onClick={() => setSelectedStationId(station.id)}
              >
                <img 
                  src={station.imageUrl} 
                  alt={station.chargingStationName} 
                  onError={(e) => e.target.src = '/images/default.jpg'} 
                  className="w-full h-40 object-cover rounded-lg mb-3" 
                />
                <h2 className="text-xl font-semibold text-teal-800 mb-2">{station.chargingStationName}</h2>
                <p className="text-gray-700 text-sm mb-2"><i className="fas fa-map-marker-alt mr-1"></i> {station.chargingStationAddress}</p>
                <p className="text-gray-700 text-sm mb-2"><i className="fas fa-bolt mr-1"></i> {station.totalDevice} Devices</p>
                <p className="text-gray-700 text-sm mb-2"><i className="fas fa-clock mr-1"></i> {station.openingHours || '24'}</p>
                <p className="text-gray-700 text-sm mb-3"><i className="fas fa-phone-alt mr-1"></i> {station.phoneNumber || 'N/A'}</p>

                <div className="flex items-center mb-3">
                  <input 
                    type="checkbox"
                    checked={station.isBlocked}
                    onChange={() => handleBlockToggle(station.id)}
                    className={`mr-2 h-4 w-4 rounded ${station.isBlocked ? 'bg-teal-600 border-teal-600' : 'bg-gray-200 border-gray-300'}`}
                  />
                  <label className={`text-gray-700 text-sm ${station.isBlocked ? 'font-semibold' : 'font-normal'}`}>
                    {station.isBlocked ? 'Blocked' : 'Block'}
                  </label>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(station.id)}
                    className="bg-teal-400 text-white text-sm px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                  >
                    <i className="fas fa-trash-alt mr-1"></i> Delete
                  </button>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${station.latitude},${station.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-800 underline text-sm flex items-center mt-3"
                >
                  <i className="fas fa-map-marker-alt mr-1"></i> View on Map
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewStations;
