import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerSuccess, registerFailure } from '../redux/Action';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [role, setRole] = useState('user'); // Default role

  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const error = useSelector((state) => state.data.error);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Full Name Validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      valid = false;
    }

    // Email Validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Password Validation
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    // Phone Number Validation
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      valid = false;
    }

    // Address Validation
    if (!address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }

    // Vehicle Type Validation
    if (!vehicleType) {
      newErrors.vehicleType = 'Vehicle type is required';
      valid = false;
    }

    // Vehicle Registration Number Validation
    if (!vehicleRegistrationNumber.trim()) {
      newErrors.vehicleRegistrationNumber = 'Vehicle registration number is required';
      valid = false;
    }

    // Vehicle Make Validation
    if (!vehicleMake.trim()) {
      newErrors.vehicleMake = 'Vehicle make is required';
      valid = false;
    }

    // Vehicle Model Validation
    if (!vehicleModel.trim()) {
      newErrors.vehicleModel = 'Vehicle model is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newUser = {
        fullName, email, password, phoneNumber, address,
        vehicleType, vehicleRegistrationNumber, vehicleMake, vehicleModel, role
      };

      // Send a POST request to add the new user
      const response = await axios.post('http://localhost:1000/User/register', newUser);

      if (response.data === 'Registered Successfully') {
        dispatch(registerSuccess(newUser));
        
        // Show SweetAlert2 alert
        await Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have been registered successfully!',
          timer: 2000,
          showConfirmButton: false
        });

        // Navigate to /login page
        navigate('/login');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      dispatch(registerFailure('Registration failed. Please try again.'));
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
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Register</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="mb-6">
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full p-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 mt-1">{errors.fullName}</p>}
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
          {/* Vehicle Type */}
          <div className="mb-6">
            <label htmlFor="vehicleType" className="block text-gray-700 font-medium mb-2">Vehicle Type</label>
            <select
              id="vehicleType"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className={`w-full p-3 border ${errors.vehicleType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
            >
              <option value="" disabled>Select your vehicle type</option>
              <option value="Car">Car</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="Truck">Truck</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
              {/* Add more options as needed */}
            </select>
            {errors.vehicleType && <p className="text-red-500 mt-1">{errors.vehicleType}</p>}
          </div>
          {/* Vehicle Registration Number */}
          <div className="mb-6">
            <label htmlFor="vehicleRegistrationNumber" className="block text-gray-700 font-medium mb-2">Vehicle Registration Number</label>
            <input
              type="text"
              id="vehicleRegistrationNumber"
              value={vehicleRegistrationNumber}
              onChange={(e) => setVehicleRegistrationNumber(e.target.value)}
              className={`w-full p-3 border ${errors.vehicleRegistrationNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter your vehicle registration number"
            />
            {errors.vehicleRegistrationNumber && <p className="text-red-500 mt-1">{errors.vehicleRegistrationNumber}</p>}
          </div>
          {/* Vehicle Make */}
          <div className="mb-6">
            <label htmlFor="vehicleMake" className="block text-gray-700 font-medium mb-2">Vehicle Make</label>
            <input
              type="text"
              id="vehicleMake"
              value={vehicleMake}
              onChange={(e) => setVehicleMake(e.target.value)}
              className={`w-full p-3 border ${errors.vehicleMake ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter your vehicle make"
            />
            {errors.vehicleMake && <p className="text-red-500 mt-1">{errors.vehicleMake}</p>}
          </div>
          {/* Vehicle Model */}
          <div className="mb-6">
            <label htmlFor="vehicleModel" className="block text-gray-700 font-medium mb-2">Vehicle Model</label>
            <input
              type="text"
              id="vehicleModel"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              className={`w-full p-3 border ${errors.vehicleModel ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter your vehicle model"
            />
            {errors.vehicleModel && <p className="text-red-500 mt-1">{errors.vehicleModel}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 col-span-2"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
