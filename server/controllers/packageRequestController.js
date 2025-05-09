import { nanoid } from "nanoid";
import PackageRequest from "../models/PackageRequest.js";
import User from "../models/userModel.js";
import Adult from "../models/adultModel.js";

// ✅ Create Package Request (Supports Adult or Guardian)
export const createPackageRequest = async (req, res) => {
  try {
    const { guardianId, packageId, adultId, status } = req.body;
   
    // ✅ Validate inputs
    if (!packageId) {
      return res.status(400).json({ message: "packageId is required" });
    }

    // ✅ Check if we have either guardianId or adultId to proceed
    if (!guardianId && !adultId) {
      return res.status(400).json({ message: "Either guardianId or adultId is required" });
    }

    let finalGuardianId = guardianId;
    let finalAdultId = adultId;

    // ✅ If we have adultId but no guardianId, fetch the guardian
    if (adultId && !guardianId) {
      const adultData = await Adult.findOne({ userId: adultId });
      if (!adultData) {
        return res.status(404).json({ message: "Adult profile not found" });
      }
      
      finalGuardianId = adultData.guardianId;
      if (!finalGuardianId) {
        return res.status(400).json({ message: "This adult does not have an assigned guardian." });
      }
    }
    
    // ✅ If we have guardianId but no adultId (should not happen with current UI flow, but just in case)
    if (guardianId && !adultId) {
      return res.status(400).json({ message: "adultId is required when submitting as a guardian" });
    }

    // ✅ Create new package request with NanoID as requestId
    const requestId = nanoid(12); // Generate unique request ID
    const newRequest = await PackageRequest.create({
      requestId,
      guardianId: finalGuardianId,
      adultId: finalAdultId,
      packageId,
      status: status || "pending",
      startDate: null, // Start date can be set later by the scheduling manager
      assignedEmployees: [], // Initially empty
    });

    return res.status(201).json({
      message: "Package request submitted successfully",
      requestId: newRequest.requestId, // ✅ Return the NanoID request ID
      data: newRequest,
    });
  } catch (error) {
    console.error("Error creating package request:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Assign Employees to Package Request (Scheduling Manager)
export const assignEmployeesToPackage = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { startDate, assignedEmployees } = req.body;

    // ✅ Fetch the package request by requestId (NanoID)
    const request = await PackageRequest.findOne({ requestId });
    if (!request) {
      return res.status(404).json({ message: "Package request not found" });
    }

    // ✅ Ensure start date is provided
    if (!startDate) {
      return res.status(400).json({ message: "Start date is required for scheduling" });
    }

    // ✅ Assign employees and start date
    request.startDate = startDate;
    request.assignedEmployees = assignedEmployees;
    request.status = "scheduled";
    await request.save();

    return res.status(200).json({
      message: "Employees assigned to package request successfully",
      data: request,
    });
  } catch (error) {
    console.error("Error assigning employees:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Details of a Specific Package Request
export const getPackageRequestById = async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await PackageRequest.findOne({ requestId });

    if (!request) {
      return res.status(404).json({ message: "Package request not found" });
    }

    return res.status(200).json({
      message: "Package request retrieved successfully",
      data: request,
    });
  } catch (error) {
    console.error("Error fetching package request:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete Package Request
export const deletePackageRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    await PackageRequest.findOneAndDelete({ requestId });

    return res.status(200).json({ message: "Package request deleted successfully" });
  } catch (error) {
    console.error("Error deleting package request:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get All Pending Package Requests
export const getPendingPackageRequests = async (req, res) => {
    try {
      const pendingRequests = await PackageRequest.find({ status: "pending" })
        .populate("guardianId", "fullName email") // Populate guardian details
        .populate("adultId", "fullName"); // Populate adult details
  
      if (pendingRequests.length === 0) {
        return res.status(404).json({ message: "No pending package requests found." });
      }
  
      return res.status(200).json({
        message: "Pending package requests retrieved successfully",
        data: pendingRequests,
      });
    } catch (error) {
      console.error("Error fetching pending package requests:", error.message);
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };