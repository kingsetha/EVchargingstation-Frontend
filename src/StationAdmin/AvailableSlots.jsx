import React from 'react';
import Nav from './Pages/Nav'; 
import Footer from './Pages/Footer'; 
import AvailableSlots from './Pages/AvailableSlots';

function UserHome() {
  return (
    <div>
      <Nav /> {/* Render the navigation bar */}
      
      <AvailableSlots/>

      <Footer /> 
    </div>
  );
}

export default UserHome;
