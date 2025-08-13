import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Inventory from "./Inventory";
import AddDevice from "./Pages/Inventory/AddDevice";
import UpdateDevice from "./Pages/Inventory/UpdateDevice";
import DeleteDevice from "./Pages/Inventory/DeleteDevice";

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/inventory" element={<Inventory/>}/>
      <Route path="/inventory/adddevice" element={<AddDevice/>}/>
      <Route path="/inventory/updatedevice" element={<UpdateDevice/>}/>
      <Route path="/inventory/deletedevice" element={<DeleteDevice/>}/>
    </Routes>
    </>
  )
}
