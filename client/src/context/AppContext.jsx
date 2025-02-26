import { createContext, useState } from "react"; // Import useState

export const AppContext = createContext(); // Create context

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Get backend URL from environment variables

  // State for login status and user data
  const [isLoggedin, setIsLoggedin] = useState(false); // Initialize isLoggedin to false
  const [userData, setUserData] = useState(null); // Initialize userData to null (or {})

  const getUserData = async ()=>{
    try{
        const{data} = await axios.get(backendUrl+'/api/user/data')
        data.success ? setUserData(data.userData ) : toast.error(data.message) 


    }catch{
        toast.error(data.message)
    }
  }
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
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};