
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

import PrescriptionProcessing from "./pages/InventoryManagement/PrescriptionProcessing";
import StockManagement from "./pages/InventoryManagement/StockManagement";
import RestockManagement from "./pages/InventoryManagement/RestockManagement";
import SupplierManagement from "./pages/InventoryManagement/SupplierManagement";
import InventoryDashboard from "./pages/InventoryManagement/InventoryDashboard";


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

        {/* Inventory Management Routes */}
        <Route path="/inventory-dashboard" element={<InventoryDashboard />} />
        <Route path="/prescriptions" element={<PrescriptionProcessing />} />
        <Route path="/stock" element={<StockManagement />} />
        <Route path="/restock" element={<RestockManagement />} />
        <Route path="/supliers" element={<SupplierManagement />} />

      </Routes>
    </div>
  )
   
}

export default App
