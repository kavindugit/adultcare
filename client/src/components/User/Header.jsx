import React from "react";

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-blue-900 text-white p-4 fixed top-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Website Title */}
        <h1 className="text-2xl font-bold">Elder Bliss</h1>

        {/* Navigation Links (Centered) */}
        <nav className="hidden sm:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-6">
            <li><a href="#about" className="hover:text-gray-300">About Us</a></li>
            <li><a href="#services" className="hover:text-gray-300">Services</a></li>
            <li><a href="#testimonials" className="hover:text-gray-300">Testimonials</a></li>
            <li><a href="#contact" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </nav>

        {/* Right Section (Login/Logout & Profile) */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <a href="/login" className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
              Login
            </a>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">{user.username}</span>
              <img src={user.profileImage} alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              <button
                onClick={onLogout}
                className="bg-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
