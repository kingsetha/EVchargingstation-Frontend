
// // image url
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerSuccess, registerFailure } from '../redux/Action';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// function RegisterStationAdminPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [chargingStationName, setChargingStationName] = useState('');
//   const [chargingStationLocation, setChargingStationLocation] = useState('');
//   const [chargingStationAddress, setChargingStationAddress] = useState('');
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [availableSlots, setAvailableSlots] = useState('');
//   const [totalDevice, setTotalDevice] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [registrationCertificateNumber, setRegistrationCertificateNumber] = useState('');
//   const [errors, setErrors] = useState({});
//   const [certificateError, setCertificateError] = useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const error = useSelector((state) => state.data.error);

//   // Fetch current location if needed
//   useEffect(() => {
//     const fetchLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             setLatitude(latitude.toString());
//             setLongitude(longitude.toString());
//           },
//           (error) => {
//             console.error('Error fetching location:', error);
//             setLatitude('');
//             setLongitude('');
//           }
//         );
//       } else {
//         setLatitude('');
//         setLongitude('Geolocation is not supported by this browser.');
//       }
//     };

//     fetchLocation();
//   }, []);

//   const validateCertificateNumber = async () => {
//     try {
//         const response = await axios.get('http://localhost:1000/api/check-certificate', {
//             params: { certificateNumber: registrationCertificateNumber }
//         });

//         // Extract the response message
//         const responseMessage = response.data;

//         if (responseMessage === 'Certificate number was inactive and is now activated.') {
//             setCertificateError(''); // Clear any previous errors
//             return true;
//         } else if (responseMessage === 'Certificate number is already active.') {
//             setCertificateError('Certificate number is already active.');
//             return true;
//         } else if (responseMessage === 'Invalid or inactive certificate number.') {
//             setCertificateError('Invalid or inactive certificate number.');
//             return false;
//         } else {
//             setCertificateError('Unexpected response from server.');
//             return false;
//         }
//     } catch (error) {
//         console.error('Error checking certificate number:', error);
//         setCertificateError('Error validating certificate number');
//         return false;
//     }
// };

// const validateForm = async () => {
//   const newErrors = {};

//   if (!name.trim()) newErrors.name = 'Name is required';
//   if (!email.trim()) newErrors.email = 'Email is required';
//   else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
//   if (!password) newErrors.password = 'Password is required';
//   else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
//   if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//   if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
//   if (!address.trim()) newErrors.address = 'Address is required';
//   if (!chargingStationName.trim()) newErrors.chargingStationName = 'Charging station name is required';
//   if (!chargingStationLocation.trim()) newErrors.chargingStationLocation = 'Charging station location is required';
//   if (!chargingStationAddress.trim()) newErrors.chargingStationAddress = 'Charging station address is required';
//   if (!latitude.trim()) newErrors.latitude = 'Latitude is required';
//   if (!longitude.trim()) newErrors.longitude = 'Longitude is required';
//   if (!availableSlots.trim()) newErrors.availableSlots = 'Available slots are required';
//   // if (!totalDevice.trim()) newErrors.totalDevice = 'Total devices are required';
//   if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
//   if (!registrationCertificateNumber.trim()) newErrors.registrationCertificateNumber = 'Certificate number is required';

//   if (registrationCertificateNumber.trim()) {
//       const isCertificateValid = await validateCertificateNumber();
//       if (!isCertificateValid) {
//           newErrors.registrationCertificateNumber = certificateError; // Use the error from backend
//       }
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!await validateForm()) {
//         console.log('Form validation failed');
//         return;
//     }

//     try {
//         const newAdmin = {
//             name,
//             email,
//             password,
//             phoneNumber,
//             address,
//             chargingStationName,
//             chargingStationLocation,
//             chargingStationAddress,
//             latitude,
//             longitude,
//             availableSlots,
//             totalDevice,
//             imageUrl,
//             registrationCertificateNumber,
//             role: 'station_admin'
//         };

//         const response = await axios.post('http://localhost:1000/StationAdmin/register', newAdmin);
//         console.log('Response received:', response.data);

//         if (response.data === 'Registration request sent to admin. You will be notified once approved.Once approved You can able to login.') {
//             dispatch(registerSuccess(newAdmin));
//             await Swal.fire({
//                 icon: 'info',
//                 title: 'Registration Submitted',
//                 text: 'Your request has been sent to the admin. You will be notified once approved.',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         } else {
//             throw new Error('Registration failed');
//         }
//     } catch (error) {
//         dispatch(registerFailure('Registration failed. Please try again.'));
//         await Swal.fire({
//             icon: 'error',
//             title: 'Registration Failed',
//             text: 'There was an issue with your registration. Please try again.',
//             timer: 2000,
//             showConfirmButton: false
//         });
//     }
// };


//   return (
//     <div className="bg-gradient-to-r from-teal-600 to-teal-400 min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mx-4 sm:mx-8 relative">
//         <button 
//           onClick={() => navigate('/')}
//           className="absolute top-4 left-4 bg-teal-600 text-white p-2 rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//         >
//           <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Register as Station Admin</h1>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Name */}
//           <div className="mb-6">
//             <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter your name"
//             />
//             {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
//           </div>
//           {/* Email */}
//           <div className="mb-6">
//             <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
//           </div>
//           {/* Password */}
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter your password"
//             />
//             {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
//           </div>
//           {/* Confirm Password */}
//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Confirm your password"
//             />
//             {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword}</p>}
//           </div>
//           {/* Phone Number */}
//           <div className="mb-6">
//             <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
//             <input
//               type="text"
//               id="phoneNumber"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className={`w-full p-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter your phone number"
//             />
//             {errors.phoneNumber && <p className="text-red-500 mt-1">{errors.phoneNumber}</p>}
//           </div>
//           {/* Address */}
//           <div className="mb-6">
//             <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
//             <input
//               type="text"
//               id="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter your address"
//             />
//             {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
//           </div>
//           {/* Charging Station Name */}
//           <div className="mb-6">
//             <label htmlFor="chargingStationName" className="block text-gray-700 font-medium mb-2">Charging Station Name</label>
//             <input
//               type="text"
//               id="chargingStationName"
//               value={chargingStationName}
//               onChange={(e) => setChargingStationName(e.target.value)}
//               className={`w-full p-3 border ${errors.chargingStationName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter charging station name"
//             />
//             {errors.chargingStationName && <p className="text-red-500 mt-1">{errors.chargingStationName}</p>}
//           </div>
//           {/* Charging Station Location */}
//           <div className="mb-6">
//             <label htmlFor="chargingStationLocation" className="block text-gray-700 font-medium mb-2">Charging Station Location</label>
//             <input
//               type="text"
//               id="chargingStationLocation"
//               value={chargingStationLocation}
//               onChange={(e) => setChargingStationLocation(e.target.value)}
//               className={`w-full p-3 border ${errors.chargingStationLocation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter charging station location"
//             />
//             {errors.chargingStationLocation && <p className="text-red-500 mt-1">{errors.chargingStationLocation}</p>}
//           </div>
//           {/* Charging Station Address */}
//           <div className="mb-6">
//             <label htmlFor="chargingStationAddress" className="block text-gray-700 font-medium mb-2">Charging Station Address</label>
//             <input
//               type="text"
//               id="chargingStationAddress"
//               value={chargingStationAddress}
//               onChange={(e) => setChargingStationAddress(e.target.value)}
//               className={`w-full p-3 border ${errors.chargingStationAddress ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter charging station address"
//             />
//             {errors.chargingStationAddress && <p className="text-red-500 mt-1">{errors.chargingStationAddress}</p>}
//           </div>
//           {/* Latitude */}
//           <div className="mb-6">
//             <label htmlFor="latitude" className="block text-gray-700 font-medium mb-2">Latitude</label>
//             <input
//               type="text"
//               id="latitude"
//               value={latitude}
//               onChange={(e) => setLatitude(e.target.value)}
//               className={`w-full p-3 border ${errors.latitude ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter latitude"
//             />
//             {errors.latitude && <p className="text-red-500 mt-1">{errors.latitude}</p>}
//           </div>
//           {/* Longitude */}
//           <div className="mb-6">
//             <label htmlFor="longitude" className="block text-gray-700 font-medium mb-2">Longitude</label>
//             <input
//               type="text"
//               id="longitude"
//               value={longitude}
//               onChange={(e) => setLongitude(e.target.value)}
//               className={`w-full p-3 border ${errors.longitude ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter longitude"
//             />
//             {errors.longitude && <p className="text-red-500 mt-1">{errors.longitude}</p>}
//           </div>
//           {/* Available Slots */}
//           <div className="mb-6">
//             <label htmlFor="availableSlots" className="block text-gray-700 font-medium mb-2">Available Slots</label>
//             <input
//               type="text"
//               id="availableSlots"
//               value={availableSlots}
//               onChange={(e) => setAvailableSlots(e.target.value)}
//               className={`w-full p-3 border ${errors.availableSlots ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter available slots"
//             />
//             {errors.availableSlots && <p className="text-red-500 mt-1">{errors.availableSlots}</p>}
//           </div>
//           {/* Total Devices */}
//           {/* <div className="mb-6">
//             <label htmlFor="totalDevice" className="block text-gray-700 font-medium mb-2">Total Devices</label>
//             <input
//               type="text"
//               id="totalDevice"
//               value={totalDevice}
//               onChange={(e) => setTotalDevice(e.target.value)}
//               className={`w-full p-3 border ${errors.totalDevice ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter total devices"
//             />
//             {errors.totalDevice && <p className="text-red-500 mt-1">{errors.totalDevice}</p>}
//           </div> */}
//           {/* Image URL */}
//           <div className="mb-6">
//             <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">Station Image URL</label>
//             <input
//               type="text"
//               id="imageUrl"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//               className={`w-full p-3 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter image URL"
//             />
//             {errors.imageUrl && <p className="text-red-500 mt-1">{errors.imageUrl}</p>}
//           </div>
//           {/* Certificate Number */}
//           <div className="mb-6">
//             <label htmlFor="registrationCertificateNumber" className="block text-gray-700 font-medium mb-2">Certificate Number</label>
//             <input
//               type="text"
//               id="registrationCertificateNumber"
//               value={registrationCertificateNumber}
//               onChange={(e) => setRegistrationCertificateNumber(e.target.value)}
//               className={`w-full p-3 border ${errors.registrationCertificateNumber || certificateError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter certificate number"
//             />
//             {(errors.registrationCertificateNumber || certificateError) && <p className="text-red-500 mt-1">{errors.registrationCertificateNumber || certificateError}</p>}
//           </div>
//           <div className="col-span-2">
//             <button
//               type="submit"
//               className="w-full bg-teal-600 text-white p-3 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegisterStationAdminPage;

//rough


//Blob


// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerSuccess, registerFailure } from '../redux/Action';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// function RegisterStationAdminPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [address, setAddress] = useState('');
//   const [chargingStationName, setChargingStationName] = useState('');
//   const [chargingStationLocation, setChargingStationLocation] = useState('');
//   const [chargingStationAddress, setChargingStationAddress] = useState('');
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [availableSlots, setAvailableSlots] = useState('');
//   const [totalDevice, setTotalDevice] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [registrationCertificateNumber, setRegistrationCertificateNumber] = useState('');
//   const [errors, setErrors] = useState({});
//   const [certificateError, setCertificateError] = useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const error = useSelector((state) => state.data.error);

//   // Fetch current location if needed
//   useEffect(() => {
//     const fetchLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             setLatitude(latitude.toString());
//             setLongitude(longitude.toString());
//           },
//           (error) => {
//             console.error('Error fetching location:', error);
//             setLatitude('');
//             setLongitude('');
//           }
//         );
//       } else {
//         setLatitude('');
//         setLongitude('Geolocation is not supported by this browser.');
//       }
//     };

//     fetchLocation();
//   }, []);

//   const validateCertificateNumber = async () => {
//     try {
//         const response = await axios.get('http://localhost:1000/api/check-certificate', {
//             params: { certificateNumber: registrationCertificateNumber }
//         });

//         if (response.status === 200) {
//             const responseMessage = response.data;

//             if (responseMessage === 'Certificate number was inactive and is now activated.') {
//                 setCertificateError(''); // Clear any previous errors
//                 return true;
//             } else if (responseMessage === 'Certificate number is already active.') {
//                 setCertificateError('Certificate number is already active.');
//                 return true;
//             } else {
//                 setCertificateError('Unexpected response from server.');
//                 return false;
//             }
//         } else {
//             setCertificateError('Unexpected response status.');
//             return false;
//         }
//     } catch (error) {
//         console.error('Error checking certificate number:', error);
//         setCertificateError('Error validating certificate number');
//         return false;
//     }
// };


// const validateForm = async () => {
//   const newErrors = {};

//   if (!name.trim()) newErrors.name = 'Name is required';
//   if (!email.trim()) newErrors.email = 'Email is required';
//   else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
//   if (!password) newErrors.password = 'Password is required';
//   else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
//   if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//   if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
//   if (!address.trim()) newErrors.address = 'Address is required';
//   if (!chargingStationName.trim()) newErrors.chargingStationName = 'Charging station name is required';
//   if (!chargingStationLocation.trim()) newErrors.chargingStationLocation = 'Charging station location is required';
//   if (!chargingStationAddress.trim()) newErrors.chargingStationAddress = 'Charging station address is required';
//   if (!latitude.trim()) newErrors.latitude = 'Latitude is required';
//   if (!longitude.trim()) newErrors.longitude = 'Longitude is required';
//   if (!availableSlots.trim()) newErrors.availableSlots = 'Available slots are required';
//   // if (!totalDevice.trim()) newErrors.totalDevice = 'Total devices are required';
//   if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
//   if (!registrationCertificateNumber.trim()) newErrors.registrationCertificateNumber = 'Certificate number is required';

//   if (registrationCertificateNumber.trim()) {
//       const isCertificateValid = await validateCertificateNumber();
//       if (!isCertificateValid) {
//           newErrors.registrationCertificateNumber = certificateError; // Use the error from backend
//       }
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };


// const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImageUrl(reader.result);
//     };
//     reader.readAsDataURL(file);
//   }
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!await validateForm()) {
//         console.log('Form validation failed');
//         return;
//     }

//     try {
//         const newAdmin = {
//             name,
//             email,
//             password,
//             phoneNumber,
//             address,
//             chargingStationName,
//             chargingStationLocation,
//             chargingStationAddress,
//             latitude,
//             longitude,
//             availableSlots,
//             totalDevice,
//             imageUrl,
//             registrationCertificateNumber,
//             role: 'station_admin'
//         };

//         const response = await axios.post('http://localhost:1000/StationAdmin/register', newAdmin);
//         console.log('Response received:', response.data);

//         if (response.data === 'Registration request sent to admin. You will be notified once approved.Once approved You can able to login.') {
//             dispatch(registerSuccess(newAdmin));
//             await Swal.fire({
//                 icon: 'info',
//                 title: 'Registration Submitted',
//                 text: 'Your request has been sent to the admin. You will be notified once approved.',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         } else {
//             throw new Error('Registration failed');
//         }
//     } catch (error) {
//         dispatch(registerFailure('Registration failed. Please try again.'));
//         await Swal.fire({
//             icon: 'error',
//             title: 'Registration Failed',
//             text: 'There was an issue with your registration. Please try again.',
//             timer: 2000,
//             showConfirmButton: false
//         });
//     }
// };


//   return (
//     <div className="bg-gradient-to-r from-teal-600 to-teal-400 min-h-screen flex items-center justify-center">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mx-4 sm:mx-8 relative">
//         <button 
//           onClick={() => navigate('/')}
//           className="absolute top-4 left-4 bg-teal-600 text-white p-2 rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//         >
//           <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Register as Station Admin</h1>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Name */}
//           <div className="mb-6">
//             <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter your name"
//             />
//             {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
//           </div>
//           {/* Email */}
//           <div className="mb-6">
//             <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
//           </div>
//           {/* Password */}
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter your password"
//             />
//             {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
//           </div>
//           {/* Confirm Password */}
//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Confirm your password"
//             />
//             {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword}</p>}
//           </div>
//           {/* Phone Number */}
//           <div className="mb-6">
//             <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
//             <input
//               type="text"
//               id="phoneNumber"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className={`w-full p-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter your phone number"
//             />
//             {errors.phoneNumber && <p className="text-red-500 mt-1">{errors.phoneNumber}</p>}
//           </div>
//           {/* Address */}
//           <div className="mb-6">
//             <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
//             <input
//               type="text"
//               id="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter your address"
//             />
//             {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
//           </div>
//           {/* Charging Station Name */}
//           <div className="mb-6">
//             <label htmlFor="chargingStationName" className="block text-gray-700 font-medium mb-2">Charging Station Name</label>
//             <input
//               type="text"
//               id="chargingStationName"
//               value={chargingStationName}
//               onChange={(e) => setChargingStationName(e.target.value)}
//               className={`w-full p-3 border ${errors.chargingStationName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter charging station name"
//             />
//             {errors.chargingStationName && <p className="text-red-500 mt-1">{errors.chargingStationName}</p>}
//           </div>
//           {/* Charging Station Location */}
//           <div className="mb-6">
//             <label htmlFor="chargingStationLocation" className="block text-gray-700 font-medium mb-2">Charging Station Location</label>
//             <input
//               type="text"
//               id="chargingStationLocation"
//               value={chargingStationLocation}
//               onChange={(e) => setChargingStationLocation(e.target.value)}
//               className={`w-full p-3 border ${errors.chargingStationLocation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter charging station location"
//             />
//             {errors.chargingStationLocation && <p className="text-red-500 mt-1">{errors.chargingStationLocation}</p>}
//           </div>
//           {/* Charging Station Address */}
//           <div className="mb-6">
//             <label htmlFor="chargingStationAddress" className="block text-gray-700 font-medium mb-2">Charging Station Address</label>
//             <input
//               type="text"
//               id="chargingStationAddress"
//               value={chargingStationAddress}
//               onChange={(e) => setChargingStationAddress(e.target.value)}
//               className={`w-full p-3 border ${errors.chargingStationAddress ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter charging station address"
//             />
//             {errors.chargingStationAddress && <p className="text-red-500 mt-1">{errors.chargingStationAddress}</p>}
//           </div>
//           {/* Latitude */}
//           <div className="mb-6">
//             <label htmlFor="latitude" className="block text-gray-700 font-medium mb-2">Latitude</label>
//             <input
//               type="text"
//               id="latitude"
//               value={latitude}
//               onChange={(e) => setLatitude(e.target.value)}
//               className={`w-full p-3 border ${errors.latitude ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter latitude"
//             />
//             {errors.latitude && <p className="text-red-500 mt-1">{errors.latitude}</p>}
//           </div>
//           {/* Longitude */}
//           <div className="mb-6">
//             <label htmlFor="longitude" className="block text-gray-700 font-medium mb-2">Longitude</label>
//             <input
//               type="text"
//               id="longitude"
//               value={longitude}
//               onChange={(e) => setLongitude(e.target.value)}
//               className={`w-full p-3 border ${errors.longitude ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter longitude"
//             />
//             {errors.longitude && <p className="text-red-500 mt-1">{errors.longitude}</p>}
//           </div>
//           {/* Available Slots */}
//           <div className="mb-6">
//             <label htmlFor="availableSlots" className="block text-gray-700 font-medium mb-2">Available Slots</label>
//             <input
//               type="text"
//               id="availableSlots"
//               value={availableSlots}
//               onChange={(e) => setAvailableSlots(e.target.value)}
//               className={`w-full p-3 border ${errors.availableSlots ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter available slots"
//             />
//             {errors.availableSlots && <p className="text-red-500 mt-1">{errors.availableSlots}</p>}
//           </div>
//           {/* Total Devices */}
//           {/* <div className="mb-6">
//             <label htmlFor="totalDevice" className="block text-gray-700 font-medium mb-2">Total Devices</label>
//             <input
//               type="text"
//               id="totalDevice"
//               value={totalDevice}
//               onChange={(e) => setTotalDevice(e.target.value)}
//               className={`w-full p-3 border ${errors.totalDevice ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter total devices"
//             />
//             {errors.totalDevice && <p className="text-red-500 mt-1">{errors.totalDevice}</p>}
//           </div> */}
//           {/* Image URL */}
//           <div className="mb-6">
//             <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Upload Image</label>
//             <input
//               type="file"
//               id="image"
//               accept="image/*"
//               onChange={handleImageChange}
//               className={`w-full p-3 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//             />
//             {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
//             {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
//           </div>
//           {/* Certificate Number */}
//           <div className="mb-6">
//             <label htmlFor="registrationCertificateNumber" className="block text-gray-700 font-medium mb-2">Certificate Number</label>
//             <input
//               type="text"
//               id="registrationCertificateNumber"
//               value={registrationCertificateNumber}
//               onChange={(e) => setRegistrationCertificateNumber(e.target.value)}
//               className={`w-full p-3 border ${errors.registrationCertificateNumber || certificateError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
//               placeholder="Enter certificate number"
//             />
//             {(errors.registrationCertificateNumber || certificateError) && <p className="text-red-500 mt-1">{errors.registrationCertificateNumber || certificateError}</p>}
//           </div>
//           <div className="col-span-2">
//             <button
//               type="submit"
//               className="w-full bg-teal-600 text-white p-3 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegisterStationAdminPage;





// image url
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerSuccess, registerFailure } from '../redux/Action';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function RegisterStationAdminPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [chargingStationName, setChargingStationName] = useState('');
  const [chargingStationLocation, setChargingStationLocation] = useState('');
  const [chargingStationAddress, setChargingStationAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [availableSlots, setAvailableSlots] = useState('');
  const [totalDevice, setTotalDevice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [registrationCertificateNumber, setRegistrationCertificateNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [certificateError, setCertificateError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.data.error);

  // Fetch current location if needed
  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude.toString());
            setLongitude(longitude.toString());
          },
          (error) => {
            console.error('Error fetching location:', error);
            setLatitude('');
            setLongitude('');
          }
        );
      } else {
        setLatitude('');
        setLongitude('Geolocation is not supported by this browser.');
      }
    };

    fetchLocation();
  }, []);

  const validateCertificateNumber = async () => {
    try {
        const response = await axios.get('http://localhost:1000/api/check-certificate', {
            params: { certificateNumber: registrationCertificateNumber }
        });

        // Extract the response message
        const responseMessage = response.data;

        if (responseMessage === 'Certificate number was inactive and is now activated.') {
            setCertificateError(''); // Clear any previous errors
            return true;
        } else if (responseMessage === 'Certificate number is already active.') {
            setCertificateError('Certificate number is already active.');
            return true;
        } else if (responseMessage === 'Invalid or inactive certificate number.') {
            setCertificateError('Invalid or inactive certificate number.');
            return false;
        } else {
            setCertificateError('Unexpected response from server.');
            return false;
        }
    } catch (error) {
        console.error('Error checking certificate number:', error);
        setCertificateError('Error validating certificate number');
        return false;
    }
};

const validateForm = async () => {
  const newErrors = {};

  if (!name.trim()) newErrors.name = 'Name is required';
  if (!email.trim()) newErrors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
  if (!password) newErrors.password = 'Password is required';
  else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
  if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
  if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
  if (!address.trim()) newErrors.address = 'Address is required';
  if (!chargingStationName.trim()) newErrors.chargingStationName = 'Charging station name is required';
  if (!chargingStationLocation.trim()) newErrors.chargingStationLocation = 'Charging station location is required';
  if (!chargingStationAddress.trim()) newErrors.chargingStationAddress = 'Charging station address is required';
  if (!latitude.trim()) newErrors.latitude = 'Latitude is required';
  if (!longitude.trim()) newErrors.longitude = 'Longitude is required';
  if (!availableSlots.trim()) newErrors.availableSlots = 'Available slots are required';
  // if (!totalDevice.trim()) newErrors.totalDevice = 'Total devices are required';
  if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
  if (!registrationCertificateNumber.trim()) newErrors.registrationCertificateNumber = 'Certificate number is required';

  if (registrationCertificateNumber.trim()) {
      const isCertificateValid = await validateCertificateNumber();
      if (!isCertificateValid) {
          newErrors.registrationCertificateNumber = certificateError; // Use the error from backend
      }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!await validateForm()) {
        console.log('Form validation failed');
        return;
    }

    try {
        const newAdmin = {
            name,
            email,
            password,
            phoneNumber,
            address,
            chargingStationName,
            chargingStationLocation,
            chargingStationAddress,
            latitude,
            longitude,
            availableSlots,
            totalDevice,
            imageUrl,
            registrationCertificateNumber,
            role: 'station_admin'
        };

        const response = await axios.post('http://localhost:1000/StationAdmin/register', newAdmin);
        console.log('Response received:', response.data);

        if (response.data === 'Registration request sent to admin. You will be notified once approved.Once approved You can able to login.') {
            dispatch(registerSuccess(newAdmin));
            await Swal.fire({
                icon: 'info',
                title: 'Registration Submitted',
                text: 'Your request has been sent to the admin. You will be notified once approved.',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        dispatch(registerFailure('Registration failed. Please try again.'));
        await Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: 'There was an issue with your registration. Please try again.',
            timer: 2000,
            showConfirmButton: false
        });
    }
};


  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-400 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mx-4 sm:mx-8 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-teal-600 text-white p-2 rounded-full shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Register as Station Admin</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
          </div>
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
          </div>
          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>
          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
          {/* Phone Number */}
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full p-3 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && <p className="text-red-500 mt-1">{errors.phoneNumber}</p>}
          </div>
          {/* Address */}
          <div className="mb-6">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter your address"
            />
            {errors.address && <p className="text-red-500 mt-1">{errors.address}</p>}
          </div>
          {/* Charging Station Name */}
          <div className="mb-6">
            <label htmlFor="chargingStationName" className="block text-gray-700 font-medium mb-2">Charging Station Name</label>
            <input
              type="text"
              id="chargingStationName"
              value={chargingStationName}
              onChange={(e) => setChargingStationName(e.target.value)}
              className={`w-full p-3 border ${errors.chargingStationName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter charging station name"
            />
            {errors.chargingStationName && <p className="text-red-500 mt-1">{errors.chargingStationName}</p>}
          </div>
          {/* Charging Station Location */}
          <div className="mb-6">
            <label htmlFor="chargingStationLocation" className="block text-gray-700 font-medium mb-2">Charging Station Location</label>
            <input
              type="text"
              id="chargingStationLocation"
              value={chargingStationLocation}
              onChange={(e) => setChargingStationLocation(e.target.value)}
              className={`w-full p-3 border ${errors.chargingStationLocation ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter charging station location"
            />
            {errors.chargingStationLocation && <p className="text-red-500 mt-1">{errors.chargingStationLocation}</p>}
          </div>
          {/* Charging Station Address */}
          <div className="mb-6">
            <label htmlFor="chargingStationAddress" className="block text-gray-700 font-medium mb-2">Charging Station Address</label>
            <input
              type="text"
              id="chargingStationAddress"
              value={chargingStationAddress}
              onChange={(e) => setChargingStationAddress(e.target.value)}
              className={`w-full p-3 border ${errors.chargingStationAddress ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter charging station address"
            />
            {errors.chargingStationAddress && <p className="text-red-500 mt-1">{errors.chargingStationAddress}</p>}
          </div>
          {/* Latitude */}
          <div className="mb-6">
            <label htmlFor="latitude" className="block text-gray-700 font-medium mb-2">Latitude</label>
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className={`w-full p-3 border ${errors.latitude ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter latitude"
            />
            {errors.latitude && <p className="text-red-500 mt-1">{errors.latitude}</p>}
          </div>
          {/* Longitude */}
          <div className="mb-6">
            <label htmlFor="longitude" className="block text-gray-700 font-medium mb-2">Longitude</label>
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className={`w-full p-3 border ${errors.longitude ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter longitude"
            />
            {errors.longitude && <p className="text-red-500 mt-1">{errors.longitude}</p>}
          </div>
          {/* Available Slots */}
          <div className="mb-6">
            <label htmlFor="availableSlots" className="block text-gray-700 font-medium mb-2">Available Slots</label>
            <input
              type="text"
              id="availableSlots"
              value={availableSlots}
              onChange={(e) => setAvailableSlots(e.target.value)}
              className={`w-full p-3 border ${errors.availableSlots ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter available slots"
            />
            {errors.availableSlots && <p className="text-red-500 mt-1">{errors.availableSlots}</p>}
          </div>
          {/* Total Devices */}
          {/* <div className="mb-6">
            <label htmlFor="totalDevice" className="block text-gray-700 font-medium mb-2">Total Devices</label>
            <input
              type="text"
              id="totalDevice"
              value={totalDevice}
              onChange={(e) => setTotalDevice(e.target.value)}
              className={`w-full p-3 border ${errors.totalDevice ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter total devices"
            />
            {errors.totalDevice && <p className="text-red-500 mt-1">{errors.totalDevice}</p>}
          </div> */}
          {/* Image URL */}
          <div className="mb-6">
            <label htmlFor="imageUrl" className="block text-gray-700 font-medium mb-2">Station Image URL</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`w-full p-3 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter image URL"
            />
            {errors.imageUrl && <p className="text-red-500 mt-1">{errors.imageUrl}</p>}
          </div>
          {/* Certificate Number */}
          <div className="mb-6">
            <label htmlFor="registrationCertificateNumber" className="block text-gray-700 font-medium mb-2">Certificate Number</label>
            <input
              type="text"
              id="registrationCertificateNumber"
              value={registrationCertificateNumber}
              onChange={(e) => setRegistrationCertificateNumber(e.target.value)}
              className={`w-full p-3 border ${errors.registrationCertificateNumber || certificateError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter certificate number"
            />
            {(errors.registrationCertificateNumber || certificateError) && <p className="text-red-500 mt-1">{errors.registrationCertificateNumber || certificateError}</p>}
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-3 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterStationAdminPage;
