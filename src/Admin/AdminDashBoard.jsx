import React from 'react';
import Nav from './Pages/Nav'; // Import Nav for the navbar
import Footer from './Pages/Footer'; // Import Footer for the footer
import AdminDashboard from './Pages/AdminDashBoard';

function UserHome() {
  return (
    <div>
      <Nav /> {/* Render the navigation bar */}
      
      <AdminDashboard/>

      <Footer /> 
    </div>
  );
}

export default UserHome;
