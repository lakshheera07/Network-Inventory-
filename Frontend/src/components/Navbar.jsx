import React, { useState } from 'react'
import { MdInventory } from 'react-icons/md'
import { MdLogin } from 'react-icons/md'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Inventory", to: "/inventory" },
  { name: "Find Devices", to: "/find-devices" },
  { name: "Map", to: "/map" },
  { name: "About Us", to: "/about-us" },
  { name: "Admin Dashboard", to: "/admin" }
];

const Navbar = () => {
  const [active, setActive] = useState(navLinks[0].to);

  return (
    <div className='w-full h-24 bg-black text-white flex items-center justify-between shadow-lg px-4 sticky top-0 z-50'>
      <div className='flex items-center w-auto'>
        <span className='text-4xl font-bold mx-2'>Network Inventory</span>
        <MdInventory size={44} color='red'/>
      </div>
      <div>
        <ul className='flex'>
          {navLinks.map(link => (
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
      <div className='flex items-center mx-5'>
        <Link to="/login">
          <MdLogin size={44} color='green' className='cursor-pointer' />
        </Link>
      </div>
    </div>
  )
}

export default Navbar;