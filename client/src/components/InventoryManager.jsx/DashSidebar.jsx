import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiOutlineClipboardCheck, HiShoppingCart } from 'react-icons/hi';
import { FaUsers } from 'react-icons/fa';

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const [isOpen, setIsOpen] = useState(true); // Open by default in desktop

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0 w-64' : 'w-20'} md:relative transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-800 shadow-lg h-screen p-4 z-40 flex flex-col`}
      >
        {/* Collapse Button */}
        <button
          className="absolute top-4 right-4 text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <HiMenu className="w-6 h-6" />
        </button>

        
        <div className="flex flex-col gap-3 mt-12 md:mt-8">
          {/* Supplier Tab */}
          <Link to="/inventory-dashboard?tab=supplier">
            <div
              className={`flex items-center p-3 rounded-lg transition duration-300 ease-in-out cursor-pointer 
              ${tab === 'supplier' ? 'bg-gray-300 text-black' : 'hover:bg-gray-400 hover:text-black'}`}
            >
              <FaUsers className={`${isOpen ? 'w-6 h-6' : 'w-8 h-8 mx-auto'}`} />
              {isOpen && <span className="ml-3">Suppliers</span>}
            </div>
          </Link>

          {/* Stock Tab */}
          <Link to="/inventory-dashboard?tab=stock">
            <div
              className={`flex items-center p-3 rounded-lg transition duration-300 ease-in-out cursor-pointer 
              ${tab === 'stock' ? 'bg-gray-300 text-black' : 'hover:bg-gray-400 hover:text-black'}`}
            >
              <HiShoppingCart className={`${isOpen ? 'w-6 h-6' : 'w-8 h-8 mx-auto'}`} />
              {isOpen && <span className="ml-3">Stock</span>}
            </div>
          </Link>

          {/* Restock Tab */}
          <Link to="/inventory-dashboard?tab=restoke">
            <div
              className={`flex items-center p-3 rounded-lg transition duration-300 ease-in-out cursor-pointer 
              ${tab === 'restoke' ? 'bg-gray-300 text-black' : 'hover:bg-gray-400 hover:text-black'}`}
            >
              <HiOutlineClipboardCheck className={`${isOpen ? 'w-6 h-6' : 'w-8 h-8 mx-auto'}`} />
              {isOpen && <span className="ml-3">Restock</span>}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
