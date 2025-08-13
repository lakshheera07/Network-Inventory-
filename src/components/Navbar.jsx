import React from 'react'
import { MdInventory } from 'react-icons/md'
import { MdLogin } from 'react-icons/md'
const Navbar = () => {
  return (
    <div className='w-full max-h-32 bg-black text-white flex items-center justify-between shadow-lg px-4'>
        <div className='flex items-center w-auto'>
            <span className='text-2xl font-bold mx-2'>Network Inventory</span>
            <MdInventory size={40} color='red'/>
        </div>
        <div className='w-[40]'>
            <ul className='flex'>
                <li className='px-2 cursor-pointer hover:scale-110  duration-200 ease-in-out'>Home</li>
                <li className='px-2 cursor-pointer hover:scale-110  duration-200 ease-in-out'>Inventory</li>
                <li className='px-2 cursor-pointer hover:scale-110  duration-200 ease-in-out'>Map</li>
                <li className='px-2 cursor-pointer hover:scale-110  duration-200 ease-in-out'>About Us</li>
            </ul>
        </div>
        <div className='flex items-center mx-5'>
            <input type="text" placeholder='Search Device' className='rounded-lg px-5 mr-5 ' />
            <MdLogin size={40} color='green' className='cursor-pointer'/>
        </div>
    </div>
  )
}

export default Navbar