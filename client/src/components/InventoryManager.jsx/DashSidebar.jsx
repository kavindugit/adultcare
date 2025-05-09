import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiOutlineClipboardCheck, HiShoppingCart } from 'react-icons/hi';
import { FaUsers } from 'react-icons/fa';
import { AiFillHome, AiOutlineArrowLeft } from 'react-icons/ai';
import { MdOutlineMedicalServices } from 'react-icons/md';

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');
  const [isOpen, setIsOpen] = useState(true); // Open by default in desktop

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab('home');
    }
  }, [location.search]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0 w-64' : 'w-20'} md:relative transition-all duration-300 ease-in-out bg-gradient-to-b from-[#0a174e] via-[#183a6d] to-[#274690] shadow-lg h-screen p-4 z-40 flex flex-col`}
      >
        {/* Collapse But*/}
        <button
          className="absolute top-4 right-4 text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <HiMenu className="w-6 h-6" />
        </button>

        <div className="flex flex-col gap-3 mt-12 md:mt-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/admin')}
            className={`flex items-center gap-2 px-2 py-1 rounded-full bg-transparent text-white hover:bg-white hover:text-[#0a174e] transition-colors mb-2 w-fit ${isOpen ? '' : 'justify-center mx-auto'}`}
            style={{ fontSize: '1rem', minHeight: 'unset', minWidth: 'unset', boxShadow: 'none', border: 'none' }}
          >
            <AiOutlineArrowLeft className="w-4 h-4" />
            {isOpen && <span className="font-medium">Back</span>}
          </button>

          {/* Supplier Tab */}
          <Link to="/inventory-dashboard?tab=supplier">
            <div
              className={`flex items-center p-3 rounded-lg transition duration-300 ease-in-out cursor-pointer 
              ${tab === 'supplier' ? 'bg-white text-[#0a174e]' : 'hover:bg-[#274690] hover:text-white text-white'}`}
            >
              <FaUsers className={`${isOpen ? 'w-6 h-6' : 'w-8 h-8 mx-auto'}`} />
              {isOpen && <span className="ml-3">Suppliers</span>}
            </div>
          </Link>

          {/* Stock Tab */}
          <Link to="/inventory-dashboard?tab=stock">
            <div
              className={`flex items-center p-3 rounded-lg transition duration-300 ease-in-out cursor-pointer 
              ${tab === 'stock' ? 'bg-white text-[#0a174e]' : 'hover:bg-[#274690] hover:text-white text-white'}`}
            >
              <HiShoppingCart className={`${isOpen ? 'w-6 h-6' : 'w-8 h-8 mx-auto'}`} />
              {isOpen && <span className="ml-3">Stock</span>}
            </div>
          </Link>

          {/* Restock Tab */}
          <Link to="/inventory-dashboard?tab=restoke">
            <div
              className={`flex items-center p-3 rounded-lg transition duration-300 ease-in-out cursor-pointer 
              ${tab === 'restoke' ? 'bg-white text-[#0a174e]' : 'hover:bg-[#274690] hover:text-white text-white'}`}
            >
              <HiOutlineClipboardCheck className={`${isOpen ? 'w-6 h-6' : 'w-8 h-8 mx-auto'}`} />
              {isOpen && <span className="ml-3">Restock</span>}
            </div>
          </Link>

          {/* Prescription Tab */}
          <Link to="/inventory-dashboard?tab=prescription">
            <div
              className={`flex items-center p-3 rounded-lg transition duration-300 ease-in-out cursor-pointer 
              ${tab === 'prescription' ? 'bg-white text-[#0a174e]' : 'hover:bg-[#274690] hover:text-white text-white'}`}
            >
              <MdOutlineMedicalServices className={`${isOpen ? 'w-6 h-6' : 'w-8 h-8 mx-auto'}`} />
              {isOpen && <span className="ml-3">Prescription</span>}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
