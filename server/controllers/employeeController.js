import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import Doctor from '../models/doctorModel.js';
import Nurse from '../models/nurseModel.js';
import Driver from '../models/DriverModel.js';
import User from '../models/userModel.js';
import Caregiver from '../models/CaregiverModel.js';

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
      role: "Doctor",
      isAdmin: false,
      isVerified: true,
    });

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
      salary
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = nanoid(12);

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

    // ✅ Convert certifications from string to array if needed
    const certArray = Array.isArray(certifications)
      ? certifications
      : certifications.split(",").map((c) => c.trim()).filter((c) => c !== "");

    await Nurse.create({
      userId,
      licenseNumber,
      yearsOfExperience,
      specialization,
      availableShifts,
      certifications: certArray,
      salary
    });

    res.status(201).json({ success: true, message: "Nurse registered successfully" });

  } catch (error) {
    console.error("Nurse Registration Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
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
      // Caregiver-specific
      yearsOfExperience,
      preferredWorkHours,
      skills,
      languagesSpoken,
      salary
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
      role: "Caregiver",
      isAdmin: false,
      isVerified: true,
    });

    await Caregiver.create({
      userId: userId,
      yearsOfExperience,
      preferredWorkHours,
      skills,
      languagesSpoken,
      salary
    });

    res.status(201).json({ success: true, message: "Caregiver registered successfully" });
  } catch (error) {
    console.error("Caregiver Registration Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
