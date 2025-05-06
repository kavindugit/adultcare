import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Parcel Management</Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Add Package
          </Link>
          <Link
            to="/viewpage"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            View Parcels
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-white"
            aria-label="Open Menu"
            data-toggle="dropdown"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
             
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-blue-600 text-white space-y-2 px-6 py-4">
        <Link
          to="/"
          className="block px-3 py-2 rounded-md text-sm font-medium"
        >
          Home
        </Link>
        <Link
          to="/add-package"
          className="block px-3 py-2 rounded-md text-sm font-medium"
        >
          Add Package
        </Link>
        <Link
          to="/parcels"
          className="block px-3 py-2 rounded-md text-sm font-medium"
        >
          View Parcels
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
