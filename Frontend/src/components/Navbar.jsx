import React, { useState, useEffect } from 'react'
import { MdInventory } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import UserProfile from './UserProfile'
import Cookies from "js-cookie";
import logo from '../assests/image.png'
const navLinks = [
  { name: "Home", to: "/home" },
  { name: "Inventory", to: "/home/inventory" },
  { name: "Find Devices", to: "/home/find-devices" },
  { name: "Map", to: "/home/map" },
  { name: "About Us", to: "/home/about-us" },
  { name: "Admin Dashboard", to: "/home/admin" }
];

const Navbar = () => {
  const [active, setActive] = useState(navLinks[0].to);
  const [showProfile, setShowProfile] = useState(false);
  const username = Cookies.get("username") || "";
  const role = Cookies.get("role") || "";

  const handleLogout = () => {
    setShowProfile(false);
    Cookies.remove("accessToken");
    Cookies.remove("username");
    Cookies.remove("role");
    window.location.href = "/";
  };

  return (
    <>
      <div className='w-full h-24 bg-black text-white flex items-center justify-between shadow-lg px-4 sticky top-0 z-50'>
        <div className='flex items-center w-auto'>
          <img src={logo} alt="Logo" className='h-12 w-12 mx-2 bg-transparent rounded-full'/>
          <span className='text-4xl font-bold mx-2'>NetStore</span>
          
          {/* <MdInventory size={44} color='red'/> */}
        </div>
        <div>
          <ul className='flex'>
            {navLinks
              .filter(link => link.name !== "Admin Dashboard" || role === "networkAdmin")
              .map(link => (
                <li
                  key={link.name}
                  className={`px-3 cursor-pointer duration-200 ease-in-out text-xl ${active === link.to ? 'text-teal-400 font-bold' : 'hover:text-teal-400'}`}
                  onClick={() => setActive(link.to)}
                >
                  <Link to={link.to}>{link.name}</Link>
                </li>
              ))}
          </ul>
        </div>
        <div className='flex items-center mx-5 gap-4'>
          <FaUserCircle
            size={44}
            color='white'
            className='cursor-pointer hover:text-teal-400 transition'
            onClick={() => setShowProfile(true)}
          />
        </div>
      </div>
      {/* Sliding UserProfile sidebar */}
      <div
        className={`fixed top-0 right-0 h-full z-[100] transition-transform duration-500 ${
          showProfile ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "320px" }}
      >
        <UserProfile
          username={username}
          role={role}
          onLogout={handleLogout}
          onClose={() => setShowProfile(false)}
        />
        {/* Overlay to close sidebar */}
        {showProfile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-[99]"
            onClick={() => setShowProfile(false)}
          />
        )}
      </div>
    </>
  )
}

export default Navbar;