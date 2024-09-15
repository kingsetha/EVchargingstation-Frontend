import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerSuccess, registerFailure } from '../redux/Action';
import { Link, useNavigate } from 'react-router-dom';
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
  const [certificateNumber, setCertificateNumber] = useState(''); // New state
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.data.error);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
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

  const validateForm = () => {
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
    if (isNaN(latitude) || latitude.trim() === '') newErrors.latitude = 'Latitude must be a valid number';
    if (isNaN(longitude) || longitude.trim() === '') newErrors.longitude = 'Longitude must be a valid number';
    if (isNaN(availableSlots) || availableSlots.trim() === '') newErrors.availableSlots = 'Available slots must be a valid number';
    if (isNaN(totalDevice) || totalDevice.trim() === '') newErrors.totalDevice = 'Total devices must be a valid number';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (!certificateNumber.trim()) newErrors.certificateNumber = 'Certificate number is required'; // New validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
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
        certificateNumber, // Include in data
        role: 'station_admin' // Static role
      };

      const response = await axios.post('http://localhost:1000/StationAdmin/register', newAdmin);

      if (response.data === 'Registration request sent to admin. You will be notified once approved.Once approved You can able to login.') {
        dispatch(registerSuccess(newAdmin));

        await Swal.fire({
          icon: 'info',
          title: 'Registration Submitted',
          text: 'Your request has been sent to the admin. You will be notified once approved.',
          timer: 2000,
          showConfirmButton: false
        });

        // Clear form fields
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setPhoneNumber('');
        setAddress('');
        setChargingStationName('');
        setChargingStationLocation('');
        setChargingStationAddress('');
        setLatitude('');
        setLongitude('');
        setAvailableSlots('');
        setTotalDevice('');
        setImageUrl('');
        setCertificateNumber(''); // Clear certificate number
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
          {/* Existing Fields */}
          {/* ... All existing input fields ... */}
          {/* Certificate Number */}
          <div className="mb-6">
            <label htmlFor="certificateNumber" className="block text-gray-700 font-medium mb-2">Certificate Number</label>
            <input
              type="text"
              id="certificateNumber"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              className={`w-full p-3 border ${errors.certificateNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300`}
              placeholder="Enter your certificate number"
            />
            {errors.certificateNumber && <p className="text-red-500 mt-1">{errors.certificateNumber}</p>}
          </div>
          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            >
              Register
            </button>
          </div>
          <div className="col-span-full mt-4 text-center">
            <Link to="/login" className="text-teal-600 hover:underline">Already have an account? Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterStationAdminPage;
