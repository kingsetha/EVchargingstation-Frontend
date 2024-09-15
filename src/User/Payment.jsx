import React from 'react';
import Nav from './Pages/Nav'; // Import Nav for the navbar
import Footer from './Pages/Footer';
import Payment from './Pages/Payment'; // Import Footer for the footer

function UserHome() {
  return (
    <div>
      <Nav /> {/* Render the navigation bar */}
      
      <Payment/>

      <Footer /> 
    </div>
  );
}

export default UserHome;
