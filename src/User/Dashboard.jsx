import React from 'react';
import Nav from './Pages/Nav'; // Import Nav for the navbar
import Footer from './Pages/Footer';
import DashboardNavbar from './Pages/Dashboard'; // Import Footer for the footer

function UserHome() {
  return (
    <div>
      <Nav /> {/* Render the navigation bar */}
      
      <DashboardNavbar/>

      <Footer /> 
    </div>
  );
}

export default UserHome;
