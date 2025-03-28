import userModel from "../models/userModel.js";
import adultModel from "../models/adultModel.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export const registerAdult = async (req, res) => {
  try {
    const {
      fullName,
      nic,
      dob,
      phoneNo,
      gender,
      address,
      dietaryPreference,
      smokingStatus,
      drinkingStatus,
      homeType,
      preferredLanguage,
      chronicConditions,
      medications,
      bloodGroup,
      guardId,
    } = req.body;

    const guardianId = guardId;
    if (!guardianId) {
      return res.status(403).json({ success: false, message: "Guardian authentication required." });
    }

    let existingUser = await userModel.findOne({ nic });

    let userId;

    if (existingUser) {
      userId = existingUser.userId;

      if (existingUser.role !== "adult") {
        existingUser.role = "adult";
        await existingUser.save();
      }
    } else {
      
      userId = nanoid();
      const tempPassword = nic.slice(-6) || "password123";
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      const newUser = new userModel({
        userId,
        fullName,
        nic,
        dob,
        email : "Not Provided",
        phoneNo,
        gender,
        address,
        password: hashedPassword,
        role: "adult",
        isVerified: false,
        status: "Inactive", // 👈 important
      });

      await newUser.save();
    }

    // Check if adult record already exists
    const existingAdult = await adultModel.findOne({ userId });
    if (existingAdult) {
      return res.status(400).json({ success: false, message: "This user is already registered as an adult." });
    }

    // Create adult profile
    const newAdult = new adultModel({
      userId,
      dietaryPreference,
      smokingStatus,
      drinkingStatus,
      homeType,
      preferredLanguage,
      chronicConditions,
      medications,
      bloodGroup,
      guardianId,
    });

    await newAdult.save();

    return res.status(201).json({
      success: true,
      message: "Adult registered successfully.",
      userId,
    });
  } catch (err) {
    console.error("Error registering adult:", err);
    return res.status(500).json({ success: false, message: "Server error during registration" });
  }
};
