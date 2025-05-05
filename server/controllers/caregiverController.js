import CaregiverModel from "../models/CaregiverModel.js";

export const getCaregiverData = async (req, res) => {
  try {
    const caregiverId = req.params.caregiverId;

    if (!caregiverId) {
      return res.status(400).json({ success: false, message: "Caregiver ID is required" });
    }

    const caregiver = await CaregiverModel.findOne({ userId: caregiverId });

    if (!caregiver) {
      return res.status(404).json({ success: false, message: "Caregiver not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        userId: caregiver.userId,
        yearsOfExperience: caregiver.yearsOfExperience,
        preferredWorkHours: caregiver.preferredWorkHours,
        skills: caregiver.skills,
        languagesSpoken: caregiver.languagesSpoken,
        salary: caregiver.salary,
        createdAt: caregiver.createdAt,
        updatedAt: caregiver.updatedAt
      }
    });
  } catch (error) {
    console.error("Error retrieving caregiver data:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
