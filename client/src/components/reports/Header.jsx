import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import assets from '../../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[95%] bg-white shadow-md shadow-blue-500 z-50 flex items-center justify-between text-sm py-5 px-8 border-b border-gray-300 ">

      {/* Logo */}
      <img src={assets.elderbliss} alt="logo" className="w-24 h-24" />

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-10 font-medium">
          <li className="py-1 ">Patiant Name</li>
          <li className="py-1">Age</li>
          <li className="py-1">Blood Type</li>
          <li className="py-1">Nurse Assigned</li>
      </ul>
      {/* Buttons */}
      <div className="flex items-center gap-6">
        {token ? 
          <div 
            className="flex items-center gap-2 cursor-pointer relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)} 
          >
            <img className="w-10 h-10 rounded-full" src={assets.profile_pic} alt="Profile" />
            <img className="w-3 h-3" src={assets.dropdown_icon} alt="Dropdown" />
            
            {/* Fixed Dropdown: Stays open until cursor leaves both profile & menu */}
            {showMenu && (
              <div 
                className="absolute top-12 right-0 min-w-48 bg-stone-100 rounded-lg flex flex-col gap-4 p-4"
                onMouseEnter={() => setShowMenu(true)}  // ✅ Keep open when hovering over menu
                onMouseLeave={() => setShowMenu(false)} // ✅ Close only when cursor leaves both
              >
                <p onClick={() => setShowMenu(false)}>My Profile</p>
                <p onClick={() => setShowMenu(false)}>My History</p>
                <p onClick={() => setShowMenu(false)}>Logout</p>
              </div>
            )}
          </div>
          : <button onClick={() => navigate('/login')} className="bg-primary text-white py-3 px-8 rounded-full font-light hidden md:block">Create Account</button>
        }
      </div>
    </div>
  );
};

export default Navbar;
