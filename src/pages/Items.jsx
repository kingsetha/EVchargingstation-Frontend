
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaShoppingCart } from 'react-icons/fa';

// Sample data for supermarket items
const items = [
  { id: 1, name: 'Apples', price: '$2.99', image: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Bread', price: '$1.99', image: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Milk', price: '$1.49', image: 'https://via.placeholder.com/100' },
  { id: 4, name: 'Cheese', price: '$3.49', image: 'https://via.placeholder.com/100' },
  // Add more items as needed
];

function SupermarketItems() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const navigate = useNavigate();

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBuyNow = (item) => {
    addToCart(item); // Add item to cart first
    navigate('/address'); // Redirect to address page
  };

  useEffect(() => {
    // Update localStorage whenever cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-800 p-4 shadow-lg fixed top-0 w-full z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-2xl font-bold">Employee Management</div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-gray-200 transition duration-300 text-lg">Home</Link>
            <Link to="/supermarket" className="text-white hover:text-gray-200 transition duration-300 text-lg">Supermarket</Link>
            {/* <Link to="/login" className="text-white hover:text-gray-200 transition duration-300 text-lg">Login</Link>
            <Link to="/register" className="text-white hover:text-gray-200 transition duration-300 text-lg">Register</Link> */}
            <Link to="/cart" className="text-white hover:text-gray-200 transition duration-300 relative text-lg">
              <FaShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-5 dark:border-gray-100 ">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">Supermarket Items</h1>
        </header>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.price}</p>
                <div className="flex space-x-4 mt-4">
                  <button 
                    onClick={() => addToCart(item)} 
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleBuyNow(item)} 
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default SupermarketItems;
