import React, { useContext } from "react";
import { AppContent} from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdultSearch from "../reports/AdultSearch";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
const Header = () => {
  const {appState, logOut} = useContext(AppContent);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
const handleClose = () => {
  setOpen(false);
};
const handleClickOpen = () => {
  if(appState.isLoggedin)
    setOpen(true);
};


  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true });

      // Clear user data and update login state
      logOut();

      // Show success message
      toast.success("Logged out successfully");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

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
            {appState.userData ? (
              <li><a href="#" className="hover:text-gray-300" onClick={handleClickOpen}>Report Module</a>
                <div>              
                  <AdultSearch open={open} handleClose={handleClose} />
                </div>
              </li>) : ""} 
          </ul>
        </nav>

        {/* Right Section (Login/Logout & Profile) */}
        <div className="flex items-center space-x-4">
          {appState.userData ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold">{appState.userData?.name || "User"}</span>
              <img
                src={appState.userData?.profileImage || "https://placehold.co/40x40"}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <a href="/login" className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
