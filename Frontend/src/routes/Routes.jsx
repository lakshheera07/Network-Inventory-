import React from "react";
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        {/* Inventory Routes */}
        <Route path="inventory" element={<Inventory />} />
        <Route path="inventory/add" element={<AddDevice />} />
        <Route path="inventory/update" element={<UpdateDevice />} />
        <Route path="inventory/delete" element={<DeleteDevice />} />

        {/* Map Routes */}
        <Route path="map" element={<Map />} />

        {/* Find Devices Route */}
        <Route path="find-devices" element={<FindDevice />} />

        {/* About Us Route */}
        <Route path="about-us" element={<AboutUs />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
