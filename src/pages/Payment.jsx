import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import Swal from sweetalert2
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaShoppingCart } from 'react-icons/fa';

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState(''); // State to keep track of selected payment method
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleProceedToPay = () => {
    // Display a SweetAlert for payment success
    Swal.fire({
      title: 'Payment Done!',
      text: 'Thank you for your purchase.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3085d6'
    }).then(() => {
      // Optionally, navigate to a confirmation or thank you page
      navigate('/Confirmation'); // You need to create this page if you choose to navigate
    });
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
              {/* Cart item count */}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">Payment</h1>
        </header>
        <div className="container mx-auto max-w-lg">
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate(-1)} // Go back to the previous page
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                &larr; Back
              </button>
              <h2 className="text-2xl font-semibold mb-4">Choose Your Payment Method</h2>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <button
                onClick={() => handlePaymentMethodChange('card')}
                className={`w-full py-2 px-4 rounded mb-4 ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Credit/Debit Card
              </button>
              <button
                onClick={() => handlePaymentMethodChange('upi')}
                className={`w-full py-2 px-4 rounded ${paymentMethod === 'upi' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                UPI Payment
              </button>
            </div>

            {/* Conditional Rendering of Payment Forms */}
            {paymentMethod === 'card' && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Credit/Debit Card</h3>
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label className="block text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="MM/YY"
                          maxLength="5"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="123"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">UPI Payment</h3>
                <form>
                  <div>
                    <label className="block text-gray-700 mb-2">UPI ID</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="example@upi"
                    />
                  </div>
                </form>
              </div>
            )}

            <button
              type="submit"
              onClick={handleProceedToPay} // Trigger SweetAlert on click
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
            >
              Proceed to Pay
            </button>
          </div>
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

export default Payment;
