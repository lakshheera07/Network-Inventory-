import React, { useState, useEffect } from 'react'
import { MdInventory } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import UserProfile from './UserProfile'
import Cookies from "js-cookie";

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
  const [user, setUser] = useState({ username: "", role: "" });

  useEffect(() => {
    // Example: get token from localStorage
    const token = Cookies.get("accessToken");
    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data.username && data.role) {
            setUser({ username: data.username, role: data.role });
          }
        })
        .catch(() => setUser({ username: "", role: "" }));
    }
  }, []);

  const handleLogout = () => {
    setShowProfile(false);
    localStorage.removeItem("accessToken");
    setUser({ username: "", role: "" });
    // Add your logout logic here (e.g., redirect to login)
  };

  return (
    <>
      <div className='w-full h-24 bg-black text-white flex items-center justify-between shadow-lg px-4 sticky top-0 z-50'>
        <div className='flex items-center w-auto'>
          <span className='text-4xl font-bold mx-2'>Network Inventory</span>
          <MdInventory size={44} color='red'/>
        </div>
        <div>
          <ul className='flex'>
            {navLinks
              .filter(link => link.name !== "Admin Dashboard" || user.role === "networkAdmin")
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
          username={user.username}
          role={user.role}
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