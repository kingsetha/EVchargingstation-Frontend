import React from 'react';
import Nav from '../Admin/Pages/Nav'; // Import Nav for the navbar
import Footer from '../Admin/Pages/Footer'; // Import Footer for the footer
import ViewUsers from './Pages/ViewUsers';

function UserHome() {
  return (
    <div>
      <Nav /> {/* Render the navigation bar */}
      
      <ViewUsers/>

      <Footer /> 
    </div>
  );
}

export default UserHome;
