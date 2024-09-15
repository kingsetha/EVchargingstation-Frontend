// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaShoppingCart } from 'react-icons/fa';

// function OrderSummary() {
//   const navigate = useNavigate();
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];

//   // Calculate the total price
//   const getTotalPrice = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//   };

//   const handleConfirmOrder = () => {
//     navigate('/payment'); // Redirect to the payment page
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="bg-blue-800 p-4 shadow-lg fixed top-0 w-full z-10">
//         <div className="container mx-auto flex items-center justify-between">
//           <div className="text-white text-2xl font-bold">Employee Management</div>
//           <div className="flex items-center space-x-4">
//             <Link to="/" className="text-white hover:text-gray-200 transition duration-300 text-lg">Home</Link>
//             <Link to="/supermarket" className="text-white hover:text-gray-200 transition duration-300 text-lg">Supermarket</Link>
//             <Link to="/login" className="text-white hover:text-gray-200 transition duration-300 text-lg">Login</Link>
//             <Link to="/register" className="text-white hover:text-gray-200 transition duration-300 text-lg">Register</Link>
//             <Link to="/cart" className="text-white hover:text-gray-200 transition duration-300 relative text-lg">
//               <FaShoppingCart size={24} />
//               {cart.length > 0 && (
//                 <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
//                   {cart.length}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="flex-grow pt-16">
//         <header className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-blue-700">Order Summary</h1>
//         </header>
//         <div className="container mx-auto">
//           {cart.length === 0 ? (
//             <div className="text-center text-lg">
//               <p>Your cart is empty. <Link to="/supermarket" className="text-blue-600 hover:underline">Go back to the supermarket</Link></p>
//             </div>
//           ) : (
//             <div>
//               <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
//                 {cart.map(item => (
//                   <div key={item.id} className="flex items-center border-b border-gray-300 p-4">
//                     <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
//                     <div className="ml-4 flex-grow">
//                       <h2 className="text-xl font-semibold">{item.name}</h2>
//                       <p className="text-gray-600">Quantity: {item.quantity}</p>
//                       <p className="text-gray-600">Price: ${(item.price * item.quantity).toFixed(2)}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="text-right mt-8 pr-4">
//                 <h2 className="text-xl font-semibold mb-4">Total Price: ${getTotalPrice()}</h2>
//                 <button 
//                   onClick={handleConfirmOrder} 
//                   className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
//                 >
//                   Confirm Order
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-blue-800 via-purple-600 to-pink-500 py-12 mt-12">
//         <div className="container mx-auto px-6">
//           <div className="text-center text-white mb-12">
//             <h2 className="text-4xl font-extrabold mb-6">Connect With Us</h2>
//             <div className="flex justify-center space-x-8 mb-8">
//               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition duration-300">
//                 <FaFacebookF size={28} />
//               </a>
//               <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition duration-300">
//                 <FaTwitter size={28} />
//               </a>
//               <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition duration-300">
//                 <FaLinkedinIn size={28} />
//               </a>
//               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-100 transition duration-300">
//                 <FaInstagram size={28} />
//               </a>
//             </div>
//             <nav className="mb-8">
//               <Link to="/about" className="text-white hover:text-gray-100 mx-6 text-lg font-semibold transition duration-300">About Us</Link>
//               <Link to="/contact" className="text-white hover:text-gray-100 mx-6 text-lg font-semibold transition duration-300">Contact</Link>
//               <Link to="/privacy" className="text-white hover:text-gray-100 mx-6 text-lg font-semibold transition duration-300">Privacy Policy</Link>
//               <Link to="/terms" className="text-white hover:text-gray-100 mx-6 text-lg font-semibold transition duration-300">Terms of Service</Link>
//             </nav>
//           </div>
//           <div className="text-center text-white border-t border-gray-300 pt-6">
//             <p className="text-sm">&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default OrderSummary;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaShoppingCart } from 'react-icons/fa';

function OrderSummary() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Calculate the total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleConfirmOrder = () => {
    navigate('/payment'); // Redirect to the payment page
  };

  const handleAddMoreItems = () => {
    navigate('/Items'); // Redirect to the supermarket page
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
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-2 py-1">
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
          <h1 className="text-4xl font-bold text-blue-700">Order Summary</h1>
        </header>
        <div className="container mx-auto">
          {cart.length === 0 ? (
            <div className="text-center text-lg">
              <p>Your cart is empty. <Link to="/supermarket" className="text-blue-600 hover:underline">Go back to the supermarket</Link></p>
            </div>
          ) : (
            <div>
              <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center border-b border-gray-300 p-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                    <div className="ml-4 flex-grow">
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">Price: ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-right mt-8 pr-4">
                <h2 className="text-xl font-semibold mb-4">Total Price: ${getTotalPrice()}</h2>
                <button 
                  onClick={handleConfirmOrder} 
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                >
                  Confirm Order
                </button>
                <button
                  onClick={handleAddMoreItems}
                  className="bg-blue-600 text-white py-2 px-4 rounded ml-4 hover:bg-blue-700 transition duration-300"
                >
                  Add More Items
                </button>
              </div>
            </div>
          )}
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

export default OrderSummary;
