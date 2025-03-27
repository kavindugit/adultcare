import {nanoid} from 'nanoid';
import bcrypt from 'bcryptjs';
import Doctor from '../models/doctorModel.js';
import User from '../models/userModel.js';


export const registerDoctor = async (req, res) => {
    try {
      const {
        email,
        password,
        fullName,
        phoneNumber,
        gender,
        dob,
        address,
        nic,
        // Doctor-specific
        medicalLicenseNumber,
        licenseExpireDate,
        nationalMedicalRegistrationNumber,
        specialization,
        subspecialities,
        yearsOfExperience,
        languagesSpoken,
        availableDate,
        availableWorkingHours,
        consultationFee,
        currentHospital
      } = req.body;
  
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ success: false, message: "Email already exists" });
  
      // Create user in userModel
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = nanoid(12);
      const user = await User.create({
        userId: userId,
        fullName,
        email,
        password: hashedPassword,
        phoneNo: phoneNumber,
        address,
        gender,
        dob,
        nic,
        role: "Doctor",
        isAdmin: false,
        isVerified: true,
      });
  
      // Create doctor in doctorModel
      await Doctor.create({
        userId: userId,
        medicalLicenseNumber,
        licenseExpireDate,
        nationalMedicalRegistrationNumber,
        specialization,
        subspecialities,
        yearsOfExperience,
        languagesSpoken,
        availableDate,
        availableWorkingHours,
        consultationFee,
        currentHospital,
      });
  
      res.status(201).json({ success: true, message: "Doctor registered successfully" });
    } catch (error) {
      console.error("Doctor Registration Error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };