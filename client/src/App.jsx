
import React from "react"
import {Routes , Route} from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import ResetPassword from "./pages/Auth/ResetPassword"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gallery from "./pages/Gallery"
import SignUp from "./pages/Auth/SignUp"

import EmployeeApplication from "./pages/Admin/EmployeeApplication"

import AdminPanel from "./pages/Admin/AdminPanel"
import AdultProfile from "./pages/User/AdutProfile"
import UserProfile from "./pages/User/UserProfile"
import GuardianProfile from "./pages/User/GuardianProfile"
import AdminSessionTable from "./pages/Reservations/AdminSessionTable"
import Services from "./components/User/Services"

import AdultRegistrationForm from "./pages/Admin/AdultRegistrationForm"
import AddAppointment from "./pages/Reservations/AddAppointment"
import Booking from "./pages/Reservations/Booking"
import CreateSessionForm from "./pages/Reservations/CreateSessionForm"
import RServices from "./pages/Reservations/RServices"





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
      
      

        <Route path = "/booking" element ={<Booking/>}/>
        <Route path = "/services" element ={<Services/>}/>
        <Route path = "/rservices" element= {<RServices/>}/>
        <Route path = "/admin-session-table" element ={<AdminSessionTable/>}/>
        <Route path = "/createForm" element ={<CreateSessionForm/>}/>
        <Route path = "/add-appointment" element ={<AddAppointment/>}/>

      </Routes>
    </div>
  )
   
}

export default App
