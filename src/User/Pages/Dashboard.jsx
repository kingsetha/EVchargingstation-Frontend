

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCog, FaMapMarkerAlt, FaInfoCircle, FaCalendarCheck } from 'react-icons/fa';
import userImage1 from '../../images/m1.jfif'; 
import chargingImage from '../../images/v10.jfif'; // Add an image for booking a charging slot

function UserDashboard() {
  const [user, setUser] = useState({
    name: "John Doe",
    role: "Electric Vehicle Owner",
    email: "john.doe@example.com",
    vehicleType: "Electric Car",
    recentActivities: [
      "Booked a charging slot at XYZ Station.",
      "Updated vehicle details.",
      "Checked charging history for September."
    ]
  });
  const [nearbyStations, setNearbyStations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Any initial setup can be placed here
  }, []);

  const fetchNearbyStations = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    console.log('Fetching nearby stations...'); 

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); 
        
        try {
          const response = await fetch(`http://localhost:1000/StationAdmin/nearby?latitude=${latitude}&longitude=${longitude}`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const stations = await response.json();
          console.log('Stations fetched:', stations);
          setNearbyStations(stations);
        } catch (error) {
          console.error('Error fetching nearby stations:', error);
          setError('Failed to fetch nearby stations.');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Failed to retrieve your location.');
      }
    );
  };

  const handleStationSelect = (station) => {
    console.log(`Navigating to details of station ID: ${station.id}`); 

    // Store selected station in sessionStorage
    sessionStorage.setItem('selectedStation', JSON.stringify(station));

    navigate(`/ViewDetails/${station.id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="flex-grow pt-16"> {/* Add padding-top to account for the fixed navbar */}
        {/* Charge Vehicle Section */}
        <section className="relative bg-gray-800 text-white py-20 mb-6">
          <img className="absolute inset-0 w-full h-full object-cover object-center z-0" src={chargingImage} alt="Charging Slot" />
          <div className="relative container mx-auto text-center z-10 pt-20">
            <h2 className="text-4xl font-semibold mb-4">Need to Charge Your Vehicle?</h2>
            <p className="text-lg mb-6">
              Book a charging slot and keep your vehicle ready for the road. Click below to find available slots.
            </p>
            {/* <Link
              to="/book-charging-slot"
              className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 flex items-center justify-center"
            >
              <FaCalendarCheck className="mr-2" size={20} />
              Book a Slot
            </Link> */}
          </div>
        </section>

        {/* Find My Location Section */}
        <section className="bg-white py-8 rounded-lg shadow-lg mb-6 flex items-center justify-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-semibold text-teal-700 mb-4 text-center">Find Nearby Charging Stations</h2>
            <button
              onClick={fetchNearbyStations}
              className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 flex items-center mx-auto mb-4"
            >
              <FaMapMarkerAlt className="mr-2" size={20} />
              Locate Nearby Stations
            </button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            {nearbyStations.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyStations.map((station) => (
                  <div key={station.id} className="bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-teal-700 mb-2">{station.name}</h3>
                    <p className="text-gray-600">Distance: {station.distance.toFixed(3)} km</p>
                    <button
                      onClick={() => handleStationSelect(station)}
                      className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 mt-4 flex items-center"
                    >
                      <FaInfoCircle className="mr-2" size={20} />
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent Activities Section */}
        <section className="bg-white py-8 rounded-lg shadow-lg mb-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold text-teal-700 mb-4">Recent Activities</h2>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
              <ul className="list-disc list-inside space-y-4">
                {user.recentActivities.map((activity, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <FaInfoCircle className="text-teal-600" size={18} />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Settings Section */}
        <section className="bg-white py-8 rounded-lg shadow-lg">
          <div className="container mx-auto">
            <h2 className="text-3xl font-semibold text-teal-700 mb-4">Account Settings</h2>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <FaCog size={24} className="text-teal-600" />
                <h3 className="text-xl font-semibold">Profile Settings</h3>
              </div>
              <Link to="/settings" className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300 flex items-center justify-center">
                <FaCog className="mr-2" size={18} />
                Go to Settings
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;

