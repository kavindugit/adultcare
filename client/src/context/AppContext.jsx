import { createContext, useState } from "react"; 
import axios from "axios";  // Import axios
import { toast } from "react-toastify";  // Import toast

export const AppContent = createContext(); 

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;  

  // State for login status and user data
  const [isLoggedin, setIsLoggedin] = useState(false); 
  const [userData, setUserData] = useState(null);  

  // Function to get user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });
      
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Context value
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
