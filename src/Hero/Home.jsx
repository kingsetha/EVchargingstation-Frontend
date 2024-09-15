


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userImage1 from '../images/m1.jfif';
import userImage2 from '../images/v1.jfif';
import userImage3 from '../images/v2.jfif';
import userImage4 from '../images/v3.jfif';
import userImage5 from '../images/v4.jfif';
import featureIcon1 from '../images/v5.jfif';
import featureIcon2 from '../images/v6.jfif';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';

function Navbar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setShowModal(true); // Show modal
  };

  const handleUserRegistration = () => {
    navigate('/register');
  };

  const handleStationRegistration = () => {
    navigate('/RegisterStation');
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };
  

  return (
    <nav className="bg-teal-900 p-4 shadow-lg fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold flex items-center">
          <i className="fas fa-bolt text-lg mr-2"></i>
          EV Charging Station Finder
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-home text-sm mr-1"></i>
            Home
          </Link>
          <Link to="/login" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-sign-in-alt text-sm mr-1"></i>
            Login
          </Link>
          <button
            onClick={handleRegisterClick}
            className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center focus:outline-none"
          >
            <i className="fas fa-user-plus text-sm mr-1"></i>
            Register
          </button>
          <Link to="/contact" className="text-white hover:text-gray-200 transition duration-300 text-sm flex items-center">
            <i className="fas fa-envelope text-sm mr-1"></i>
            Contact
          </Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-xl font-bold text-teal-700 mb-4">Select Registration Type</h2>
            <button
              onClick={() => { handleUserRegistration(); closeModal(); }}
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 mb-2"
            >
              Register as User
            </button>
            <button
              onClick={() => { handleStationRegistration(); closeModal(); }}
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            >
              Register as Station Admin
            </button>
            <button
              onClick={closeModal}
              className="mt-4 w-full text-teal-600 hover:text-teal-800 transition duration-300 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-800 via-teal-600 to-teal-400 py-12 mt-12">
      <div className="container mx-auto px-6">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl font-extrabold mb-6">Connect With Us</h2>
          <div className="flex justify-center space-x-8 mb-8">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition duration-300">
              <FaFacebookF size={28} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition duration-300">
              <FaTwitter size={28} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition duration-300">
              <FaLinkedinIn size={28} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition duration-300">
              <FaInstagram size={28} />
            </a>
          </div>
          <nav className="mb-8">
            <Link to="/about" className="text-white hover:text-gray-200 mx-6 text-lg font-semibold transition duration-300">About Us</Link>
            <Link to="/contact" className="text-white hover:text-gray-200 mx-6 text-lg font-semibold transition duration-300">Contact</Link>
            <Link to="/privacy" className="text-white hover:text-gray-200 mx-6 text-lg font-semibold transition duration-300">Privacy Policy</Link>
            <Link to="/terms" className="text-white hover:text-gray-200 mx-6 text-lg font-semibold transition duration-300">Terms of Service</Link>
          </nav>
        </div>
        <div className="text-center text-white border-t border-gray-600 pt-6">
          <p className="text-sm">&copy; {new Date().getFullYear()} EV Charging Station Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Testimonials Component
// Testimonials Component
function Testimonials() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-700 mb-8">What Our Users Say</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Testimonial 1 */}
          <div className="w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-6">
            <p className="text-gray-600 mb-4">
              "The EV charging station finder has made it so easy to locate nearby stations and book slots. It's a game changer!"
            </p>
            <div className="flex items-center">
              <img className="w-12 h-12 rounded-full" src={userImage1} alt="User" />
              <div className="ml-4">
                <p className="text-lg font-semibold">Emily Clark</p>
                <p className="text-gray-500">Electric Vehicle Owner</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-6">
            <p className="text-gray-600 mb-4">
              "The slot booking feature is incredibly convenient and has saved me so much time. Highly recommend!"
            </p>
            <div className="flex items-center">
              <img className="w-12 h-12 rounded-full" src={userImage2} alt="User" />
              <div className="ml-4">
                <p className="text-lg font-semibold">Michael Lee</p>
                <p className="text-gray-500">Fleet Manager</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-6">
            <p className="text-gray-600 mb-4">
              "User-friendly interface and helpful features. It's a must-have app for EV owners."
            </p>
            <div className="flex items-center">
              <img className="w-12 h-12 rounded-full" src={userImage3} alt="User" />
              <div className="ml-4">
                <p className="text-lg font-semibold">Sarah Johnson</p>
                <p className="text-gray-500">EV Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// About Us Component
function AboutUs() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-8">About Us</h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="w-full max-w-md">
            <p className="text-gray-600 text-lg mb-4">
              We are committed to providing the best EV charging station locator and slot management system. Our platform is designed to make finding and reserving charging stations easier and more efficient.
            </p>
            <p className="text-gray-600 text-lg">
              Our mission is to support the growing EV community by offering a seamless and reliable service to enhance the driving experience.
            </p>
          </div>
          <img className="w-full max-w-xs rounded-lg shadow-lg" src={userImage3} alt="About Us" />
        </div>
      </div>
    </section>
  );
}

// Features Component
function Features() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };

  return (
    <section className="bg-gray-200 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-700 mb-8">Our Key Features</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Feature 1 */}
          <div
            onClick={() => handleCardClick('feature1')}
            className={`w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center cursor-pointer transition-transform duration-300 transform ${selectedCard === 'feature1' ? 'scale-105' : 'scale-100'}`}
          >
            <img className="w-20 h-20 mx-auto mb-4" src={featureIcon1} alt="Feature 1" />
            <h3 className="text-xl font-semibold mb-2">Easy Station Locator</h3>
            <p className="text-gray-600">
              Quickly find the nearest EV charging stations with our easy-to-use locator.
            </p>
          </div>

          {/* Feature 2 */}
          <div
            onClick={() => handleCardClick('feature2')}
            className={`w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center cursor-pointer transition-transform duration-300 transform ${selectedCard === 'feature2' ? 'scale-105' : 'scale-100'}`}
          >
            <img className="w-20 h-20 mx-auto mb-4" src={featureIcon2} alt="Feature 2" />
            <h3 className="text-xl font-semibold mb-2">Slot Booking</h3>
            <p className="text-gray-600">
              Book your charging slots in advance to ensure availability and convenience.
            </p>
          </div>

          {/* Feature 3 */}
          <div
            onClick={() => handleCardClick('feature3')}
            className={`w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center cursor-pointer transition-transform duration-300 transform ${selectedCard === 'feature3' ? 'scale-105' : 'scale-100'}`}
          >
            <img className="w-20 h-20 mx-auto mb-4" src={featureIcon2} alt="Feature 3" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
            <p className="text-gray-600">
              Get real-time updates on station availability and charging status.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


  function ContactUs() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    const [responseMessage, setResponseMessage] = useState(''); // Add this line
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formParams = new URLSearchParams();
        formParams.append('from', formData.email);  // Assuming formData.email is the 'from' field
        formParams.append('subject', formData.subject);
        formParams.append('body', formData.message);
      
        await axios.post('http://localhost:1000/User/sendEmailToAdmin', formParams, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
  
        // Show success alert
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload();  // Reload the page
        });
      } catch (error) {
        console.error("Error sending message:", error.response?.data);
  
        // Show error alert
        Swal.fire({
          title: 'Error!',
          text: 'There was an error sending your message. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        }).then(() => {
          window.location.reload();  // Reload the page
        });
      }
    };
  

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-8">Contact Us</h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-teal-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Newsletter Signup Component
function NewsletterSignup() {
  return (
    <section className="bg-gray-100 py-12 text-gray-800">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-green-50 rounded-lg shadow-lg p-8">
          <h2 className="text-4xl font-bold mb-6 text-teal-600">Stay Updated</h2>
          <p className="text-lg mb-8 text-gray-600">Sign up for our newsletter to get the latest updates and news directly to your inbox.</p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="p-3 rounded-lg border border-gray-300 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}



// HomePage Component
function HomePage() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId === selectedCard ? null : cardId);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <div className="relative bg-teal-600 text-white">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-5xl font-bold mb-4">Find EV Charging Stations</h1>
            <p className="text-lg mb-8">
              Locate nearby EV charging stations and manage your charging slots with ease.
            </p>
            <Link to="/search" className="bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
              Find Stations
            </Link>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img className="w-full h-full object-cover opacity-30" src={userImage4} alt="Hero Background" />
          </div>
        </div>

        <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-8">Explore Our Features</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Card 1 */}
          <div
            onClick={() => handleCardClick('card1')}
            className={`w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 transform ${selectedCard === 'card1' ? 'scale-105' : 'scale-100'}`}
          >
            <img className="w-full h-48 object-cover" src={userImage5} alt="View Stations" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">View Stations</h2>
              <p className="text-gray-600 mb-4">
                Access a detailed map of charging stations and their availability.
              </p>
              <Link to="/view" className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-teal-700 transition duration-300">View Now</Link>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => handleCardClick('card2')}
            className={`w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 transform ${selectedCard === 'card2' ? 'scale-105' : 'scale-100'}`}
          >
            <img className="w-full h-48 object-cover" src={userImage2} alt="Manage Slots" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Manage Slots</h2>
              <p className="text-gray-600 mb-4">
                Easily manage and book your charging slots to ensure you never run out of power.
              </p>
              <Link to="/manage" className="bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">Manage Now</Link>
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => handleCardClick('card3')}
            className={`w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 transform ${selectedCard === 'card3' ? 'scale-105' : 'scale-100'}`}
          >
            <img className="w-full h-48 object-cover" src={userImage3} alt="Track Usage" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">Track Usage</h2>
              <p className="text-gray-600 mb-4">
                Monitor your charging history and usage patterns to optimize your energy consumption.
              </p>
              <Link to="/track" className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300">Track Now</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

        <Features />
        <AboutUs />
        <Testimonials />
        <ContactUs />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
