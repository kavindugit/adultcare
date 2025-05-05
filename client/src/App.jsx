
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

import EmployeeApplication from "./pages/Admin/EmployeeApplication"

import AdminPanel from "./pages/Admin/AdminPanel"
import AdultProfile from "./pages/User/AdutProfile"
import UserProfile from "./pages/User/UserProfile"
import GuardianProfile from "./pages/User/GuardianProfile"
import NurseProfile from "./pages/User/NurseProfile"
import CaregiverProfile from "./pages/User/CaregiverProfile"





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
    
        <Route path ="/employee-application" element={<EmployeeApplication/>}/>
        <Route path = "/userprofile" element={<UserProfile/>}/>
        <Route path = "/admin" element ={<AdminPanel/>}/>
        
        <Route path = "/adultprofile" element={<AdultProfile/>}/>
        <Route path = "/guard" element ={<GuardianProfile/>}/>
        <Route path = "/adult" element={<AdultProfile/>}/>
        <Route path = "/nurse" element={<NurseProfile/>}/>
        <Route path="/caregiver" element={<CaregiverProfile/>}/>
      
      


      </Routes>
    </div>
  )
   
}

export default App
