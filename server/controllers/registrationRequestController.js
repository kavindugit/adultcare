import RegistrationRequest from "../models/RegistrationRequest.js";
import userModel from "../models/userModel.js";

export const getPendingRegistrationRequests = async (req, res) => {
  try {
    const { guardianId } = req.params;

    if (!guardianId) {
      return res.status(400).json({ success: false, message: "Guardian ID is required" });
    }

    const pendingRequests = await RegistrationRequest.find({
      guardianUserId: guardianId,
      status: "Pending",
    });

    if (!pendingRequests || pendingRequests.length === 0) {
      return res.status(404).json({ success: false, message: "No pending requests found" });
    }

    const result = await Promise.all(
      pendingRequests.map(async (request) => {
        const adultUser = await userModel.findOne({ userId: request.adultUserId });
        if (!adultUser) return null;

        return {
          requestId: request._id,
          adultUserId: adultUser.userId,
          fullName: adultUser.fullName,
          nic: adultUser.nic,
          email: adultUser.email,
          status: request.status,
        };
      })
    );

    const filteredResult = result.filter((r) => r !== null);

    return res.status(200).json({
      success: true,
      pendingRequests: filteredResult,
    });
  } catch (error) {
    console.error("Error fetching pending registration requests:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const approveRegistrationRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await RegistrationRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    await userModel.updateOne(
      { userId: request.adultUserId },
      { status: "Active", isVerified: true, role: "adult" }
    );

    request.status = "Approved";
    await request.save();

    return res.status(200).json({ success: true, message: "Registration request approved." });
  } catch (error) {
    console.error("Error approving registration request:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const rejectRegistrationRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await RegistrationRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    request.status = "Rejected";
    await request.save();

    return res.status(200).json({ success: true, message: "Registration request rejected." });
  } catch (error) {
    console.error("Error rejecting registration request:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
