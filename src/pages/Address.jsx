import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaShoppingCart } from 'react-icons/fa';

function Address() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save or process the form data
    console.log('Address Data:', formData);
    // Redirect to a confirmation or order summary page
    navigate('/OrderSummary');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-800 p-4 shadow-lg fixed top-0 w-full z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-2xl font-bold">Employee Management</div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-200 transition duration-300 text-lg">Home</Link>
            <Link to="/supermarket" className="text-white hover:text-gray-200 transition duration-300 text-lg">Supermarket</Link>
            <Link to="/login" className="text-white hover:text-gray-200 transition duration-300 text-lg">Login</Link>
            <Link to="/register" className="text-white hover:text-gray-200 transition duration-300 text-lg">Register</Link>
            <Link to="/cart" className="text-white hover:text-gray-200 transition duration-300 relative text-lg">
              <FaShoppingCart size={24} />
              {/* Cart length would be handled in Cart component */}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">Shipping Address</h1>
        </header>
        <div className="container mx-auto">
          <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg shadow-md p-8">
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2" htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label className="block text-lg font-semibold mb-2" htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-lg font-semibold mb-2" htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1">
                <label className="block text-lg font-semibold mb-2" htmlFor="zip">Zip Code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-lg font-semibold mb-2" htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
              >
                Submit Address
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500 py-12 mt-12">
        <div className="container mx-auto px-6">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-extrabold mb-6">Connect With Us</h2>
            <div className="flex justify-center space-x-8 mb-8">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition duration-300">
                <FaFacebookF size={28} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition duration-300">
                <FaTwitter size={28} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition duration-300">
                <FaLinkedinIn size={28} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition duration-300">
                <FaInstagram size={28} />
              </a>
            </div>
            <nav className="mb-8">
              <Link to="/about" className="text-white hover:text-gray-100 mx-6 text-lg font-semibold transition duration-300">About Us</Link>
              <Link to="/contact" className="text-white hover:text-gray-100 mx-6 text-lg font-semibold transition duration-300">Contact</Link>
              <Link to="/privacy" className="text-white hover:text-gray-100 mx-6 text-lg font-semibold transition duration-300">Privacy Policy</Link>
              <Link to="/terms" className="text-white hover:text-gray-100 mx-6 text-lg font-semibold transition duration-300">Terms of Service</Link>
            </nav>
          </div>
          <div className="text-center text-white border-t border-gray-300 pt-6">
            <p className="text-sm">&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Address;
