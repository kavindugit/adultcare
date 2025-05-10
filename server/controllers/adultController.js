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

    // ✅ Check and Ensure Guardian Role
    const guardianUser = await userModel.findOne({ userId: guardianId });
    if (guardianUser) {
      if (guardianUser.role !== "Guardian") {
        guardianUser.role = "Guardian"; // Update user role to Guardian
        await guardianUser.save();
      }
    } else {
      return res.status(404).json({ success: false, message: "Guardian user not found." });
    }

    let existingUser = await userModel.findOne({ nic });

    let userId;

    if (existingUser) {
      userId = existingUser.userId;

      // ✅ Ensure existing user is set as Adult
      if (existingUser.role !== "Adult") {
        existingUser.role = "Adult";
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
        email: `adult-${userId}@adultcare.placeholder`,
        phoneNo,
        gender,
        address,
        password: hashedPassword,
        role: "Adult",
        isVerified: false,
        status: "Inactive",
      });

      await newUser.save();
    }

    // ✅ Check if adult record already exists
    const existingAdult = await adultModel.findOne({ userId });
    if (existingAdult) {
      return res.status(400).json({ success: false, message: "This user is already registered as an adult." });
    }

    // ✅ Create adult profile
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





export const getLinkedAdultsByGuardian = async (req, res) => {
  try {
    const guardianId = req.params.guardianId;

    if (!guardianId) {
      return res.status(400).json({ success: false, message: "Guardian ID is required" });
    }

    const linkedAdults = await adultModel.find({ guardianId });

    if (!linkedAdults || linkedAdults.length === 0) {
      return res.status(404).json({ success: false, message: "No linked adults found" });
    }

    // ✅ Now get fullName and nic also
    const formattedAdults = await Promise.all(linkedAdults.map(async (adult) => {
      const user = await userModel.findOne({ userId: adult.userId });
      return {
        userId: adult.userId,
        fullName: user ? user.fullName : "Unknown",
        nic: user ? user.nic : "Unknown",
        bloodGroup: adult.bloodGroup,
      };
    }));

    return res.status(200).json({
      success: true,
      adults: formattedAdults,
    });
  } catch (error) {
    console.error("Error fetching linked adults:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAdultProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const adultProfile = await adultModel.findOne({ userId });

    if (!adultProfile) {
      return res.status(404).json({ success: false, message: "Adult profile not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        userId: adultProfile.userId,
        dietaryPreference: adultProfile.dietaryPreference,
        smokingStatus: adultProfile.smokingStatus,
        drinkingStatus: adultProfile.drinkingStatus,
        homeType: adultProfile.homeType,
        preferredLanguage: adultProfile.preferredLanguage,
        chronicConditions: adultProfile.chronicConditions 
          ? adultProfile.chronicConditions.split(",").map(c => c.trim()) 
          : [],
        medications: adultProfile.medications 
          ? adultProfile.medications.split(",").map(m => m.trim()) 
          : [],
        bloodGroup: adultProfile.bloodGroup,
        guardianId: adultProfile.guardianId
      }
    });
  } catch (error) {
    console.error("Error fetching adult profile:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const getAdults = async (req, res) => {
  try {
    const users = await userModel.find({ role: "adult" });
    return  res.status(200).json(
     users
    );
  } catch (error) {
    console.error("Error fetching adults:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
