
import React from "react"
import {Routes , Route} from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import ResetPassword from "./pages/Auth/ResetPassword"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gallery from "./pages/Gallery"
import SignUp from "./pages/Auth/SignUp"

import AdultRegistrationForm from "./pages/Admin/AdultRegistrationForm"
import DoctorRegistrationForm from "./components/AdminPanel/RegistationForms/DoctorRegistrationForm"
import EmployeeApplication from "./pages/Admin/EmployeeApplication"
import UserProfile from "./pages/User/UserProfile"
import Dashboard from "./pages/InventoryManagement/Dashboard"
import AdminPanel from "./pages/Admin/AdminPanel"
import AdultProfile from "./pages/User/AdutProfile"

import GuardianProfile from "./pages/User/GuardianProfile"

import NurseProfile from "./pages/User/NurseProfile"
import CaregiverProfile from "./pages/User/CaregiverProfile"

import AdminSessionTable from "./pages/Reservations/AdminSessionTable"
import Services from "./components/User/Services"


import AddAppointment from "./pages/Reservations/AddAppointment"
import Booking from "./pages/Reservations/Booking"
import CreateSessionForm from "./pages/Reservations/CreateSessionForm"
import RServices from "./pages/Reservations/RServices"
import Parcels from "./pages/packages/viewpage"
import UpdateParcel from "./pages/packages/UpdateParcel";
import ReportHome from "./pages/MedicationReports/ReportHome"
import SchedulingPackage from "./pages/Admin/SchedulingPackage"
import DoctorProfile from "./pages/User/DoctorProfile"
import RoleBasedProfile from "./pages/User/RoleBasedProfile"
import ProtectedRoute from "./components/User/ProtectedRoute"

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
        <Route path = "/inventory-dashboard" element={<Dashboard/>}/>
        <Route
            path="/admin"
            element={<ProtectedRoute element={<AdminPanel />} />}
          />
        
        <Route path = "/doctor" element = {<DoctorProfile/>}/>
        <Route path = "/guard" element ={<GuardianProfile/>}/>
        <Route path = "/adult" element={<AdultProfile/>}/>
        <Route path = "/nurse" element={<NurseProfile/>}/>
        <Route path="/caregiver" element={<CaregiverProfile/>}/>

        <Route path = "/adult/:userId" element={<AdultProfile/>}/>


        <Route path="/profile" element={<RoleBasedProfile/>}/>
      
      

        <Route path = "/booking" element ={<Booking/>}/>
        <Route path = "/services" element ={<Services/>}/>
        <Route path = "/rservices" element= {<RServices/>}/>
        <Route path = "/admin-session-table" element ={<AdminSessionTable/>}/>
        <Route path = "/createForm" element ={<CreateSessionForm/>}/>
        <Route path = "/add-appointment" element ={<AddAppointment/>}/>
        <Route path = "/packages" element ={<Parcels/>}/>
        <Route path="/update/:id" element={<UpdateParcel />} />
        <Route path="/schedule-manager/:requestId" element={<SchedulingPackage />} />


        <Route path="/report-module" element={<ReportHome />} />
          
        


      </Routes>
    </div>
  )
   
}

export default App
