import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Inventory from "../Pages/Inventory/Inventory";
import AddDevice from "../Pages/Inventory/AddDevice";
import UpdateDevice from "../Pages/Inventory/UpdateDevice";
import DeleteDevice from "../Pages/Inventory/DeleteDevice";
import Map from "../Pages/Map/Map";
import Home from "../Pages/HomePage/Home";
import FindDevice from "../Pages/FindDevices/FindDevice";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";

const AppRoutes = () => {
  const [devices, setDevices] = useState([]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes under MainLayout */}
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<Home />} />
      <Route path="inventory" element={<Inventory />} />
      <Route
        path="inventory/add"
        element={<AddDevice devices={devices} setDevices={setDevices} />}
      />
      <Route path="inventory/update" element={<UpdateDevice />} />
      <Route path="inventory/delete" element={<DeleteDevice />} />
      <Route path="map" element={<Map />} />
      <Route path="find-devices" element={<FindDevice />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
