// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

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

export default Footer;
