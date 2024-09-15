import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterSelectionPage() {
  const navigate = useNavigate();

  const handleUserRegistration = () => {
    navigate('/register');
  };

  const handleStationRegistration = () => {
    navigate('/RegisterStation');
  };

  return (
    <div className="bg-gradient-to-r from-teal-600 to-teal-400 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mx-4 sm:mx-8">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">Select Registration Type</h1>
        <div className="space-y-4">
          <button
            onClick={handleUserRegistration}
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          >
            Register as User
          </button>
          <button
            onClick={handleStationRegistration}
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          >
            Register as Station Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterSelectionPage;
