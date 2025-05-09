import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import Doctor from '../models/doctorModel.js';
import Nurse from '../models/nurseModel.js';
import Driver from '../models/DriverModel.js';
import User from '../models/userModel.js';
import Caregiver from '../models/CaregiverModel.js';

// Updated registerDoctor API
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
      medicalLicenseNumber,
      licenseExpireDate,
      nationalMedicalRegistrationNumber,
      specialization,
      subspecialities,  // This comes as a string from frontend
      yearsOfExperience,
      languagesSpoken,  // This comes as a string from frontend
      availableDate,
      availableWorkingHours,  // Changed from availableTimeSlots to match frontend
      consultationFee,
      currentHospital
    } = req.body;

    // Validate required fields
    if (!email || !password || !fullName || !phoneNumber || !gender || !dob || !address || !nic ||
        !medicalLicenseNumber || !licenseExpireDate || !nationalMedicalRegistrationNumber ||
        !specialization || !yearsOfExperience || !availableDate || !availableWorkingHours ||
        !consultationFee || !currentHospital) {
      return res.status(400).json({ 
        success: false, 
        message: "All required fields must be provided" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }

    // Check if doctor license already exists
    const existingLicense = await Doctor.findOne({ medicalLicenseNumber });
    if (existingLicense) {
      return res.status(400).json({ 
        success: false, 
        message: "Medical license number already exists" 
      });
    }

    // Check if national registration number already exists
    const existingRegNumber = await Doctor.findOne({ nationalMedicalRegistrationNumber });
    if (existingRegNumber) {
      return res.status(400).json({ 
        success: false, 
        message: "National medical registration number already exists" 
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate a unique user ID
    const userId = nanoid(12);
   
    // Create the user first
    const newUser = await User.create({
      userId,
      fullName,
      email,
      password: hashedPassword,
      phoneNo: phoneNumber,  // Ensure this matches your User model field
      address,
      gender,
      dob,
      nic,
      role: "Doctor",
      isAdmin: false,
      isVerified: true,  // Consider if you want to add email verification later
    });

    // Parse numeric fields
    const parsedExperience = Number(yearsOfExperience);
    const parsedFee = Number(consultationFee);

    // Create the doctor profile
    const newDoctor = await Doctor.create({
      userId,
      medicalLicenseNumber,
      licenseExpireDate,
      nationalMedicalRegistrationNumber,
      specialization,
      subspecialities,  // Store as a string
      yearsOfExperience: parsedExperience,
      languagesSpoken,  // Store as a string
      availableDate,    // This is an array from frontend
      availableWorkingHours,  // This is an array from frontend
      consultationFee: parsedFee,
      currentHospital,
    });

    // Send success response
    res.status(201).json({ 
      success: true, 
      message: "Doctor registered successfully",
      userId
    });
  } catch (error) {
    console.error("Doctor Registration Error:", error);
    // Handle specific errors
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ 
        success: false, 
        message: "Duplicate value detected. Please check your input." 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
};

export const registerNurse = async (req, res) => {
  console.log("Nurse Registration Request Body:", req.body); // Log the request body for debugging
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
      licenseNumber,
      yearsOfExperience,
      specialization,
      availableShifts,
      certifications,
      salary,
      preferredWorkingDays,
      preferredTimeSlots,
      isPartTime
    } = req.body;

    // Validate form data
    if (!email || !password || !fullName || !phoneNumber || !gender || !dob || !address || !nic ||
      !licenseNumber || !yearsOfExperience || !specialization || !availableShifts || !salary) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    // Validate required arrays
    if (!preferredWorkingDays || !Array.isArray(preferredWorkingDays) || preferredWorkingDays.length === 0) {
      return res.status(400).json({ success: false, message: "At least one preferred working day must be selected" });
    }

    // Validate time slots for part-time
    if (isPartTime && (!preferredTimeSlots || !Array.isArray(preferredTimeSlots) || preferredTimeSlots.length === 0)) {
      return res.status(400).json({ success: false, message: "Part-time nurses must select at least one time slot" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = nanoid(12);

    // Create user record
    const user = await User.create({
      userId,
      fullName,
      email,
      password: hashedPassword,
      phoneNo: phoneNumber,
      address,
      gender,
      dob,
      nic,
      role: "Nurse",
      isAdmin: false,
      isVerified: true,
    });

    // Process certifications (convert from string if needed)
    const certArray = Array.isArray(certifications)
      ? certifications
      : typeof certifications === 'string'
        ? certifications.split(",").map((c) => c.trim()).filter((c) => c !== "")
        : [];

    // Create nurse record with new fields
    await Nurse.create({
      userId,
      licenseNumber,
      yearsOfExperience,
      specialization,
      availableShifts,
      preferredWorkingDays,
      preferredTimeSlots: isPartTime ? preferredTimeSlots : [],
      isPartTime,
      certifications: certArray,
      salary
    });

    res.status(201).json({ success: true, message: "Nurse registered successfully" });
  } catch (error) {
    console.error("Nurse Registration Error:", error);
    if (error.name === 'ValidationError') {
      // Handle mongoose validation errors
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const registerCaregiver = async (req, res) => {
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
      // Caregiver-specific fields
      yearsOfExperience,
      preferredWorkHours,
      // New scheduling fields
      preferredWorkingDays,
      preferredShift,
      isPartTime, // Get isPartTime flag directly from request
      preferredTimeSlots,
      skills,
      languagesSpoken,
      salary
    } = req.body;

    // Validate required fields
    if (!email || !password || !fullName || !phoneNumber || !gender || !dob || !address || !nic ||
        !yearsOfExperience || !preferredWorkingDays || !preferredWorkingDays.length || 
        !preferredShift || !skills || !skills.length || !languagesSpoken || !salary) {
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }

    // Check if part-time is selected by preferred shift value (regardless of isPartTime flag)
    const isPart = preferredShift === "Part-Time (Custom time slots)";
    
    // Validate part-time time slots
    if (isPart && (!preferredTimeSlots || preferredTimeSlots.length === 0)) {
      return res.status(400).json({ 
        success: false, 
        message: "Time slots are required for part-time caregivers" 
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate user ID
    const userId = nanoid(12);
    
    // Create user record
    const user = await User.create({
      userId,
      fullName,
      email,
      password: hashedPassword,
      phoneNo: phoneNumber,
      address,
      gender,
      dob,
      nic,
      role: "Caregiver",
      isAdmin: false,
      isVerified: true,
    });

    // Create caregiver record with scheduling information
    await Caregiver.create({
      userId,
      yearsOfExperience,
      preferredWorkHours, // Keep for backward compatibility
      preferredWorkingDays,
      preferredShift,
      isPartTime: isPart, // Use calculated value to ensure consistency
      preferredTimeSlots, // Will be empty array for non-part-time
      skills,
      languagesSpoken,
      salary
    });

    res.status(201).json({ 
      success: true, 
      message: "Caregiver registered successfully"
    });
  } catch (error) {
    console.error("Caregiver Registration Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const registerDriver = async (req, res) => {
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
      // Driver-specific
      licenseNumber,
      licenseExpiry,
      identificationNumber,
      yearsOfExperience,
      availabilityHours,
      monthlySalary,
      otRate
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "Email already exists" });

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
      role: "Driver",
      isAdmin: false,
      isVerified: true,
    });

    await Driver.create({
      userId: userId,
      licenseNumber,
      licenseExpiry,
      identificationNumber,
      yearsOfExperience,
      availabilityHours,
      monthlySalary,
      otRate
    });

    res.status(201).json({ success: true, message: "Driver registered successfully" });
  } catch (error) {
    console.error("Driver Registration Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getEmployeeDetails = async (req, res) => {
  try {
    const { employeeType, employeeId } = req.params;

    let employeeModel;
    if (employeeType === "Doctor") {
      employeeModel = Doctor;
    } else if (employeeType === "Nurse") {
      employeeModel = Nurse;
    } else if (employeeType === "Caregiver") {
      employeeModel = Caregiver;
    } else if (employeeType === "Driver") {
      employeeModel = Driver;
    } else {
      return res.status(400).json({ success: false, message: "Invalid employee type" });
    }

    const employee = await employeeModel.findOne({ userId: employeeId });
    if (!employee) {
      console.log(`Employee not found: ${employeeType} with userId ${employeeId}`);
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error(`Error fetching employee details for ${employeeType}/${employeeId}:`, error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};