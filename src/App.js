import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from "./pages/Update";
import Add from "./pages/Add";
import HomePage from "./Hero/Home";
import LoginPage from "./Authentication/Login";
import RegisterPage from "./Authentication/Register";
import Items from "./pages/Items";
import Cart from "./pages/Cart";
import Payment from "./User/Payment";
import Address from "./pages/Address";
import Selection from "./Authentication/selection";
import RegisterStation from "./Authentication/RegisterStation";
import UserDashboard from "./User/Dashboard";
import ViewDetails from "./User/ViewDetail";
import SlotBook from "./User/SlotBook";
import Confirmation from "./User/Confirmation";
import AmountPaid from "./User/AmountPaid";
import PendingDashboard from "./Admin/PendingRequest";
import AdminDashboard from "./Admin/AdminDashBoard";
import ViewStations from "./Admin/ViewStations";
import StationAdminDashboard from "./StationAdmin/StationAdminDashboard";
import Email from "./Admin/Email";
import EmailUser from "./StationAdmin/Email";
import AvailableSlots from "./StationAdmin/AvailableSlots";
import ViewUsers from "./Admin/ViewUsers";
import Profile from "./User/Profile";
import History from"./User/History";
import ProfileStation from"./StationAdmin/Profile";
import SlotHistory from "./StationAdmin/SlotHistory";
import ViewBooking from "./StationAdmin/ViewBooking";
import RatingsAndReview from "./User/RatingAndReview";
import CertificateRegister from "./Authentication/CertificateNumber";
import Settings from "./User/Settings"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ViewDetails/:id" element={<ViewDetails />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/slotbook/:id/:slotId" element={<SlotBook />} />
          <Route path="/create" element={<Add />} />
          <Route
            path="/payment/:id/:slotId/:vehicleType"
            element={<Payment />}
          />
          {/* <Route path="/payment/:bookingId" element={<Payment />} /> */}
          <Route
            path="/confirmation/:stationId/:slotId/:deviceType/:bookingId"
            element={<Confirmation />}
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/selection" element={<Selection />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/RegisterStation" element={<RegisterStation />} />
          <Route path="/Items" element={<Items />} />
          <Route path="/Cart" element={<Cart />} />
          {/* <Route path="/Payment" element={<Payment />} /> */}
          <Route path="/Address" element={<Address />} />
          <Route path="/Review" element={<RatingsAndReview />} />
          <Route path="/ViewUsers" element={<ViewUsers />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/PendingDashboard" element={<PendingDashboard />} />
          <Route
            path="/StationAdminDashboard"
            element={<StationAdminDashboard />}
          />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/SlotHistory" element={<SlotHistory />} />
          <Route path="/ViewStations" element={<ViewStations />} />
          <Route path="/AvailableSlots" element={<AvailableSlots />} />
          <Route path="/Email" element={<Email />} />
          <Route path="/EmailUser" element={<EmailUser />} />
          <Route path="/amountpaid/:id/:slotId" element={<AmountPaid />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ProfileStation" element={<ProfileStation />} />
          <Route path="/History" element={<History />} />
          <Route path="/ViewBooking" element={<ViewBooking />} />
          <Route path="/CertificateRegister" element={<CertificateRegister />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
