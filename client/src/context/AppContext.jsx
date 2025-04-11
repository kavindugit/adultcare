import { createContext, useState, useEffect } from "react"; 
import axios from "axios";  // Import axios
import { toast } from "react-toastify";  // Import toast

export const AppContent = createContext(); 

export const AppContextProvider = (props) => {

  const defaultState = {
    backendUrl: import.meta.env.VITE_BACKEND_URL,
    adultId: null,
    isLoggedin: false,
    userData: null
  };
  const [appState, setAppState] = useState(() => {
    // Try loading everything from localStorage
    const storedState = localStorage.getItem('appState');
    return storedState
      ? JSON.parse(storedState) : defaultState;
  });

  // Save to localStorage when `user` changes
  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(appState));
  }, [appState]);

  const setUserData = (userData) => setAppState((prev) => ({ ...prev, userData }));
  const setAdultId = (adultId) => {console.log(' changing adultId --- ' + adultId), setAppState((prev) => ({ ...prev, adultId }))};
  const setIsLoggedin = (isLoggedin) => setAppState((prev) => ({ ...prev, isLoggedin }));
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

  const logOut = () => {
    // Set to default values on logout
    localStorage.removeItem('appState'); // Optionally clear from localStorage
    setAppState(defaultState);
  };
  // Context value
  const value = {
    setIsLoggedin,
    setUserData,
    setAdultId,
    getUserData,
    appState,
    backendUrl,
    setAppState,
    logOut
  };

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};
