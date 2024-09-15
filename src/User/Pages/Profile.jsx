

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// function EditProfilePage() {
//   const [userData, setUserData] = useState({
//     fullName: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//     vehicleType: '',
//     vehicleRegistrationNumber: '',
//     vehicleMake: '',
//     vehicleModel: '',
//     role: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [errors, setErrors] = useState({});
//   const userId = sessionStorage.getItem('userId'); // Retrieve user ID from session storage

//   useEffect(() => {
//     // Fetch the user data from the server
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:1000/User/getProfileData/${userId}`);
//         setUserData(response.data);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     if (userId) {
//       fetchUserData();
//     } else {
//       console.error('No user ID found in session storage');
//     }
//   }, [userId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!userData.fullName) newErrors.fullName = 'Full Name is required';
//     if (!userData.email) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(userData.email)) newErrors.email = 'Email address is invalid';
//     if (userData.password && userData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
//     if (userData.phoneNumber && !/^\d{10}$/.test(userData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';
//     // if (userData.password !== userData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     try {
//       const response = await axios.put(`http://localhost:1000/User/${userId}`, userData);
//       Swal.fire({
//         icon: 'success',
//         title: 'Profile Updated',
//         text: 'Your profile has been updated successfully!',
//         timer: 2000,
//         showConfirmButton: false
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: 'There was an error updating your profile. Please try again.',
//         timer: 2000,
//         showConfirmButton: false
//       });
//     }
//   };

//   return (
//     <div className="bg-gradient-to-r from-teal-600 to-teal-400 min-h-screen p-8 pt-20">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
//         <h1 className="text-3xl font-bold text-teal-800 mb-6">Edit Profile</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <div>
//               <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
//               <input
//                 type="text"
//                 id="fullName"
//                 name="fullName"
//                 value={userData.fullName}
//                 onChange={handleChange}
//                 className={`w-full p-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//                 required
//               />
//               {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={userData.email}
//                 onChange={handleChange}
//                 className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//                 required
//                 disabled
//               />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={userData.password}
//                 onChange={handleChange}
//                 className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               />
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//             </div>
//             {/* <div>
//               <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={userData.confirmPassword}
//                 onChange={handleChange}
//                 className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               />
//               {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//             </div> */}
//             <div>
//               <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
//               <input
//                 type="text"
//                 id="phoneNumber"
//                 name="phoneNumber"
//                 value={userData.phoneNumber}
//                 onChange={handleChange}
//                 className={`w-full p-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               />
//               {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
//             </div>
//             <div>
//               <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={userData.address}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//               />
//             </div>
//             <div>
//               <label htmlFor="vehicleType" className="block text-gray-700 font-medium mb-2">Vehicle Type</label>
//               <input
//                 type="text"
//                 id="vehicleType"
//                 name="vehicleType"
//                 value={userData.vehicleType}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//               />
//             </div>
//             <div>
//               <label htmlFor="vehicleRegistrationNumber" className="block text-gray-700 font-medium mb-2">Vehicle Registration Number</label>
//               <input
//                 type="text"
//                 id="vehicleRegistrationNumber"
//                 name="vehicleRegistrationNumber"
//                 value={userData.vehicleRegistrationNumber}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//               />
//             </div>
//             <div>
//               <label htmlFor="vehicleMake" className="block text-gray-700 font-medium mb-2">Vehicle Make</label>
//               <input
//                 type="text"
//                 id="vehicleMake"
//                 name="vehicleMake"
//                 value={userData.vehicleMake}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//               />
//             </div>
//             <div>
//               <label htmlFor="vehicleModel" className="block text-gray-700 font-medium mb-2">Vehicle Model</label>
//               <input
//                 type="text"
//                 id="vehicleModel"
//                 name="vehicleModel"
//                 value={userData.vehicleModel}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//               />
//             </div>
           
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//           >
//             Update Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditProfilePage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditProfilePage() {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    vehicleType: '',
    vehicleRegistrationNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const userId = sessionStorage.getItem('userId'); // Retrieve user ID from session storage

  useEffect(() => {
    // Fetch the user data from the server
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/User/getProfileData/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      console.error('No user ID found in session storage');
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!userData.fullName) newErrors.fullName = 'Full Name is required';
    if (!userData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(userData.email)) newErrors.email = 'Email address is invalid';
    if (userData.password && userData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (userData.phoneNumber && !/^\d{10}$/.test(userData.phoneNumber)) newErrors.phoneNumber = 'Phone number must be 10 digits';
    // if (userData.password !== userData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.put(`http://localhost:1000/User/${userId}`, userData);
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully!',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an error updating your profile. Please try again.',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  return (
    <div className="min-h-screen p-8 pt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-teal-800 mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
                required
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
                required
                disabled
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            {/* <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div> */}
            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="vehicleType" className="block text-gray-700 font-medium mb-2">Vehicle Type</label>
              <input
                type="text"
                id="vehicleType"
                name="vehicleType"
                value={userData.vehicleType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="vehicleRegistrationNumber" className="block text-gray-700 font-medium mb-2">Vehicle Registration Number</label>
              <input
                type="text"
                id="vehicleRegistrationNumber"
                name="vehicleRegistrationNumber"
                value={userData.vehicleRegistrationNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="vehicleMake" className="block text-gray-700 font-medium mb-2">Vehicle Make</label>
              <input
                type="text"
                id="vehicleMake"
                name="vehicleMake"
                value={userData.vehicleMake}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              />
            </div>
            <div>
              <label htmlFor="vehicleModel" className="block text-gray-700 font-medium mb-2">Vehicle Model</label>
              <input
                type="text"
                id="vehicleModel"
                name="vehicleModel"
                value={userData.vehicleModel}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
