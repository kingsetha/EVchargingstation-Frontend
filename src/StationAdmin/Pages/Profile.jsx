

// // import React, { useState, useEffect } from 'react';
// // import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
// // import { BsFillImageFill } from 'react-icons/bs';

// // function StationAdminProfile() {
// //   const [stationAdmin, setStationAdmin] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const userId = sessionStorage.getItem('userId');

// //   useEffect(() => {
// //     if (!userId) {
// //       setError('No user ID found.');
// //       setLoading(false);
// //       return;
// //     }

// //     const fetchStationAdmin = async () => {
// //       try {
// //         const response = await fetch(`http://localhost:1000/StationAdmin/getProfileData/${userId}`);
// //         if (!response.ok) throw new Error('Network response was not ok.');
// //         const data = await response.json();
// //         setStationAdmin(data);
// //       } catch (err) {
// //         setError('Failed to fetch Station Admin details.');
// //         console.error('Fetch error:', err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchStationAdmin();
// //   }, [userId]);

// //   if (loading) {
// //     return <div className="flex justify-center items-center h-screen">Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="text-red-500 text-center">{error}</div>;
// //   }

// //   return (
// //     <div className="bg-gray-100 min-h-screen pt-24 p-6"> {/* Adjusted pt-24 for more top padding */}
// //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
// //         <h1 className="text-3xl font-bold text-teal-700 mb-4">Station Admin Profile</h1>
// //         <div className="flex items-center mb-6">
// //           <div className="w-48 h-48 border border-gray-300 mr-6">
// //             {stationAdmin.imageUrl ? (
// //               <img
// //                 src={stationAdmin.imageUrl}
// //                 alt="Station Image"
// //                 className="w-full h-full object-cover"
// //               />
// //             ) : (
// //               <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
// //                 <BsFillImageFill />
// //               </div>
// //             )}
// //           </div>
// //           <div>
// //             <h2 className="text-2xl font-semibold text-gray-800">{stationAdmin.name}</h2>
// //             <p className="text-gray-600 mt-2">
// //               <FaMapMarkerAlt className="inline mr-1" />
// //               {stationAdmin.address}
// //             </p>
// //             <p className="text-gray-600 mt-2">
// //               <FaPhoneAlt className="inline mr-1" />
// //               {stationAdmin.phoneNumber}
// //             </p>
// //             <p className="text-gray-600 mt-2">
// //               <FaEnvelope className="inline mr-1" />
// //               {stationAdmin.email}
// //             </p>
// //           </div>
// //         </div>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div>
// //             <h3 className="text-xl font-semibold text-teal-700">Station Details</h3>
// //             <p className="text-gray-600 mt-2">
// //               <span className="font-semibold">Name:</span> {stationAdmin.chargingStationName}
// //             </p>
// //             <p className="text-gray-600 mt-2">
// //               <span className="font-semibold">Location:</span> {stationAdmin.chargingStationLocation}
// //             </p>
// //             <p className="text-gray-600 mt-2">
// //               <span className="font-semibold">Address:</span> {stationAdmin.chargingStationAddress}
// //             </p>
// //             <p className="text-gray-600 mt-2">
// //               <span className="font-semibold">Total Devices:</span> {stationAdmin.totalDevice}
// //             </p>
// //             <p className="text-gray-600 mt-2">
// //               <FaCalendarAlt className="inline mr-1" />
// //               <span className="font-semibold">Created At:</span> {new Date(stationAdmin.createdAt).toLocaleDateString()}
// //             </p>
// //             <p className="text-gray-600 mt-2">
// //               <FaCalendarAlt className="inline mr-1" />
// //               <span className="font-semibold">Updated At:</span> {new Date(stationAdmin.updatedAt).toLocaleDateString()}
// //             </p>
// //           </div>
// //           <div>
// //             <h3 className="text-xl font-semibold text-teal-700">Additional Info</h3>
// //             {/* <p className="text-gray-600 mt-2">
// //               <span className="font-semibold">Status:</span> {stationAdmin.status}
// //             </p> */}
// //             {/* <p className="text-gray-600 mt-2">
// //               <span className="font-semibold">Role:</span> {stationAdmin.role}
// //             </p> */}
// //             <p className="text-gray-600 mt-2">
// //               <span className="font-semibold">Latitude:</span> {stationAdmin.latitude}
// //             </p>
// //             <p className="text-gray-600 mt-2">
// //               <span className="font-semibold">Longitude:</span> {stationAdmin.longitude}
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default StationAdminProfile;
// import React, { useState, useEffect } from 'react';
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
// import { BsFillImageFill } from 'react-icons/bs';
// import Swal from 'sweetalert2';

// function StationAdminProfile() {
//   const [stationAdmin, setStationAdmin] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     name: '',
//     address: '',
//     phoneNumber: '',
//     email: ''
//   });

//   const userId = sessionStorage.getItem('userId');

//   useEffect(() => {
//     if (!userId) {
//       setError('No user ID found.');
//       setLoading(false);
//       return;
//     }

//     const fetchStationAdmin = async () => {
//       try {
//         const response = await fetch(`http://localhost:1000/StationAdmin/getProfileData/${userId}`);
//         if (!response.ok) throw new Error('Network response was not ok.');
//         const data = await response.json();
//         setStationAdmin(data);
//         setEditForm({
//           name: data.name,
//           address: data.address,
//           phoneNumber: data.phoneNumber,
//           email: data.email
//         });
//       } catch (err) {
//         setError('Failed to fetch Station Admin details.');
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStationAdmin();
//   }, [userId]);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSaveChanges = async () => {
//     try {
//       const response = await fetch(`http://localhost:1000/StationAdmin/update/${userId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(editForm)
//       });

//       let responseData;
//       try {
//         responseData = await response.json();
//       } catch (jsonError) {
//         // Handle non-JSON response
//         const textResponse = await response.text();
//         throw new Error(`Network response was not JSON. Status: ${response.status}. Response text: ${textResponse}`);
//       }

//       if (!response.ok) {
//         throw new Error(`Network response was not ok. Status: ${response.status}. ${JSON.stringify(responseData)}`);
//       }

//       // Show SweetAlert2 confirmation message
//       Swal.fire({
//         icon: 'success',
//         title: 'Update Successful',
//         text: 'Station Admin details updated successfully!',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         // Reload the page to get updated data
//         window.location.reload();
//       });
      
//     } catch (err) {
//       setError(`Failed to update Station Admin details. ${err.message}`);
//       console.error('Update error:', err);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       {error && (
//         <div className="text-red-500 text-center p-4 bg-red-100 border border-red-500">
//           {error}
//         </div>
//       )}
//       <main className="flex-grow bg-gray-100 pt-24 p-6">
//         <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
//           <h1 className="text-3xl font-bold text-teal-700 mb-4">Station Admin Profile</h1>
//           <div className="flex items-center mb-6">
//             <div className="w-48 h-48 border border-gray-300 mr-6">
//               {stationAdmin.imageUrl ? (
//                 <img
//                   src={stationAdmin.imageUrl}
//                   alt="Station Image"
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
//                   <BsFillImageFill />
//                 </div>
//               )}
//             </div>
//             <div>
//               {isEditing ? (
//                 <>
//                   <input
//                     type="text"
//                     name="name"
//                     value={editForm.name}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded mb-2"
//                     placeholder="Name"
//                   />
//                   <input
//                     type="text"
//                     name="address"
//                     value={editForm.address}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded mb-2"
//                     placeholder="Address"
//                   />
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     value={editForm.phoneNumber}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded mb-2"
//                     placeholder="Phone Number"
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={editForm.email}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border border-gray-300 rounded mb-2"
//                     placeholder="Email"
//                   />
//                   <button
//                     onClick={handleSaveChanges}
//                     className="bg-teal-700 text-white py-2 px-4 rounded"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={handleEditToggle}
//                     className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <h2 className="text-2xl font-semibold text-gray-800">{stationAdmin.name}</h2>
//                   <p className="text-gray-600 mt-2">
//                     <FaMapMarkerAlt className="inline mr-1" />
//                     {stationAdmin.address}
//                   </p>
//                   <p className="text-gray-600 mt-2">
//                     <FaPhoneAlt className="inline mr-1" />
//                     {stationAdmin.phoneNumber}
//                   </p>
//                   <p className="text-gray-600 mt-2">
//                     <FaEnvelope className="inline mr-1" />
//                     {stationAdmin.email}
//                   </p>
//                   <button
//                     onClick={handleEditToggle}
//                     className="bg-teal-700 text-white py-2 px-4 rounded mt-4"
//                   >
//                     Edit
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h3 className="text-xl font-semibold text-teal-700">Station Details</h3>
//               <p className="text-gray-600 mt-2">
//                 <span className="font-semibold">Name:</span> {stationAdmin.chargingStationName}
//               </p>
//               <p className="text-gray-600 mt-2">
//                 <span className="font-semibold">Location:</span> {stationAdmin.chargingStationLocation}
//               </p>
//               <p className="text-gray-600 mt-2">
//                 <span className="font-semibold">Address:</span> {stationAdmin.chargingStationAddress}
//               </p>
//               <p className="text-gray-600 mt-2">
//                 <span className="font-semibold">Total Devices:</span> {stationAdmin.totalDevice}
//               </p>
//               <p className="text-gray-600 mt-2">
//                 <FaCalendarAlt className="inline mr-1" />
//                 <span className="font-semibold">Created At:</span> {new Date(stationAdmin.createdAt).toLocaleDateString()}
//               </p>
//               <p className="text-gray-600 mt-2">
//                 <FaCalendarAlt className="inline mr-1" />
//                 <span className="font-semibold">Updated At:</span> {new Date(stationAdmin.updatedAt).toLocaleDateString()}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-teal-700">Additional Info</h3>
//               <p className="text-gray-600 mt-2">
//                 <span className="font-semibold">Latitude:</span> {stationAdmin.latitude}
//               </p>
//               <p className="text-gray-600 mt-2">
//                 <span className="font-semibold">Longitude:</span> {stationAdmin.longitude}
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default StationAdminProfile;


//after including password 
import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { BsFillImageFill } from 'react-icons/bs';
import Swal from 'sweetalert2';

function StationAdminProfile() {
  const [stationAdmin, setStationAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setError('No user ID found.');
      setLoading(false);
      return;
    }

    const fetchStationAdmin = async () => {
      try {
        const response = await fetch(`http://localhost:1000/StationAdmin/getProfileData/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        setStationAdmin(data);
        setEditForm({
          name: data.name,
          address: data.address,
          phoneNumber: data.phoneNumber,
          email: data.email,
          password: '',
          confirmPassword: ''
        });
      } catch (err) {
        setError('Failed to fetch Station Admin details.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStationAdmin();
  }, [userId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!editForm.name) errors.name = 'Name is required.';
    if (!editForm.address) errors.address = 'Address is required.';
    if (!editForm.phoneNumber) errors.phoneNumber = 'Phone number is required.';
    if (!editForm.email) errors.email = 'Email is required.';
    if (editForm.password && editForm.password.length < 6) errors.password = 'Password must be at least 6 characters long.';
    if (editForm.password !== editForm.confirmPassword) errors.confirmPassword = 'Passwords do not match.';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:1000/StationAdmin/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        // Handle non-JSON response
        const textResponse = await response.text();
        throw new Error(`Network response was not JSON. Status: ${response.status}. Response text: ${textResponse}`);
      }

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}. ${JSON.stringify(responseData)}`);
      }

      // Show SweetAlert2 confirmation message
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: 'Station Admin details updated successfully!',
        confirmButtonText: 'OK'
      }).then(() => {
        // Reload the page to get updated data
        window.location.reload();
      });

    } catch (err) {
      setError(`Failed to update Station Admin details. ${err.message}`);
      console.error('Update error:', err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {error && (
        <div className="text-red-500 text-center p-4 bg-red-100 border border-red-500">
          {error}
        </div>
      )}
      {Object.keys(validationErrors).length > 0 && (
        <div className="text-red-500 text-center p-4 bg-red-100 border border-red-500">
          {Object.values(validationErrors).map((err, index) => (
            <p key={index}>{err}</p>
          ))}
        </div>
      )}
      <main className="flex-grow bg-gray-100 pt-24 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-teal-700 mb-4">Station Admin Profile</h1>
          <div className="flex items-center mb-6">
            <div className="w-48 h-48 border border-gray-300 mr-6">
              {stationAdmin.imageUrl ? (
                <img
                  src={stationAdmin.imageUrl}
                  alt="Station Image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                  <BsFillImageFill />
                </div>
              )}
            </div>
            <div>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Name"
                  />
                  {validationErrors.name && <p className="text-red-500">{validationErrors.name}</p>}
                  
                  <input
                    type="text"
                    name="address"
                    value={editForm.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Address"
                  />
                  {validationErrors.address && <p className="text-red-500">{validationErrors.address}</p>}
                  
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editForm.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Phone Number"
                  />
                  {validationErrors.phoneNumber && <p className="text-red-500">{validationErrors.phoneNumber}</p>}
                  
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Email"
                  />
                  {validationErrors.email && <p className="text-red-500">{validationErrors.email}</p>}
                  
                  <input
                    type="password"
                    name="password"
                    value={editForm.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Password"
                  />
                  {validationErrors.password && <p className="text-red-500">{validationErrors.password}</p>}
                  
                  <input
                    type="password"
                    name="confirmPassword"
                    value={editForm.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Confirm Password"
                  />
                  {validationErrors.confirmPassword && <p className="text-red-500">{validationErrors.confirmPassword}</p>}
                  
                  <button
                    onClick={handleSaveChanges}
                    className="bg-teal-700 text-white py-2 px-4 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-gray-800">{stationAdmin.name}</h2>
                  <p className="text-gray-600 mt-2">
                    <FaMapMarkerAlt className="inline mr-1" />
                    {stationAdmin.address}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <FaPhoneAlt className="inline mr-1" />
                    {stationAdmin.phoneNumber}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <FaEnvelope className="inline mr-1" />
                    {stationAdmin.email}
                  </p>
                  <button
                    onClick={handleEditToggle}
                    className="bg-teal-700 text-white py-2 px-4 rounded mt-4"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-teal-700">Station Details</h3>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Name:</span> {stationAdmin.chargingStationName}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Location:</span> {stationAdmin.chargingStationLocation}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Address:</span> {stationAdmin.chargingStationAddress}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Total Devices:</span> {stationAdmin.totalDevice}
              </p>
              <p className="text-gray-600 mt-2">
                <FaCalendarAlt className="inline mr-1" />
                <span className="font-semibold">Created At:</span> {new Date(stationAdmin.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mt-2">
                <FaCalendarAlt className="inline mr-1" />
                <span className="font-semibold">Updated At:</span> {new Date(stationAdmin.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal-700">Additional Info</h3>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Latitude:</span> {stationAdmin.latitude}
              </p>
              <p className="text-gray-600 mt-2">
                <span className="font-semibold">Longitude:</span> {stationAdmin.longitude}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StationAdminProfile;
