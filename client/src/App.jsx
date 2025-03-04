
import React from "react"
import {Routes , Route} from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import ResetPassword from "./pages/Auth/ResetPassword"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gallery from "./pages/Gallery"
import SignUp from "./pages/Auth/SignUp"
import AdultRegistrationForm from "./pages/Admin/adultRegistrationForm"
import DoctorRegistration from "./pages/Admin/DoctorRegistration"
import EmployeeApplication from "./pages/Auth/EmployeeApplication"
import UserProfile from "./pages/UserManagement/userProfile"


const App = () => {

  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
    
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/adult-registration" element={<AdultRegistrationForm/>}/>
        <Route path="/doctor-registration" element={<DoctorRegistration/>}/>
        <Route path ="/employee-application" element={<EmployeeApplication/>}/>
        <Route path = "/userprofile" element={<UserProfile/>}/>

      </Routes>
    </div>
  )
   
}

export default App
