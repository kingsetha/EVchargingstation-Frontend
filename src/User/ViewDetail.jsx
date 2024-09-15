import React from 'react';
import Nav from './Pages/Nav'; // Import Nav for the navbar
import Footer from './Pages/Footer';
import ViewDetail from './Pages/ViewDetails'; // Import Footer for the footer

function UserHome() {
  return (
    <div>
      <Nav /> {/* Render the navigation bar */}
      
      <ViewDetail/>

      <Footer /> 
    </div>
  );
}

export default UserHome;
