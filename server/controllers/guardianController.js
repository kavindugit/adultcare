import userModel from "../models/userModel.js";
import adultModel from "../models/adultModel.js";

export const getGuardianByAdult = async (req, res) => {
  try {
    const { adultUserId } = req.params;

    const adult = await adultModel.findOne({ userId: adultUserId });

    if (!adult) {
      return res.status(404).json({ success: false, message: "Adult not found" });
    }

    const guardian = await userModel.findOne({ userId: adult.guardianId });

    if (!guardian) {
      return res.status(404).json({ success: false, message: "Guardian not found" });
    }

    return res.status(200).json({
      success: true,
      guardian: {
        userId: guardian.userId,
        fullName: guardian.fullName,
        email: guardian.email,
        phoneNo: guardian.phoneNo,
        address: guardian.address,
      },
    });
  } catch (error) {
    console.error("Error fetching guardian:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
