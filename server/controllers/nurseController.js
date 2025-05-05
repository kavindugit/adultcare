import NurseModel from '../models/nurseModel.js';

// GET all nurses
export const getAllNurses = async (req, res) => {
  try {
    const nurses = await NurseModel.find();
    return res.status(200).json({ success: true, data: nurses });
  } catch (error) {
    console.error("Error fetching nurses:", error);
    return res.status(500).json({ success: false, message: "Server error while fetching nurses." });
  }
};

// GET nurse by userId
export const getNurseByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const nurse = await NurseModel.findOne({ userId });
    if (!nurse) {
      return res.status(404).json({ success: false, message: "Nurse not found." });
    }

    return res.status(200).json({ success: true, data: nurse });
  } catch (error) {
    console.error("Error fetching nurse:", error);
    return res.status(500).json({ success: false, message: "Server error while fetching nurse." });
  }
};
