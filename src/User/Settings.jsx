import React from 'react';
import Nav from './Pages/Nav'; // Import Nav for the navbar
import Footer from './Pages/Footer';
import Settings from './Pages/Settings'; // Import Footer for the footer

function UserHome() {
  return (
    <div>
      <Nav /> {/* Render the navigation bar */}
      
      <Settings/>

      <Footer /> 
    </div>
  );
}

export default UserHome;
