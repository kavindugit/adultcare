import DoctorSchedule from "../models/DoctorSchedule.js";
import NurseSchedule from "../models/NurseSchedule.js";
import CaregiverSchedule from "../models/CaregiverSchedule.js";

import PackageRequest from "../models/PackageRequest.js";
import dayjs from "dayjs";

export const createSchedule = async (req, res) => {
  try {
    const { employeeType, employeeId, adultId, date, timeSlots = [], status = "Available" } = req.body;

    let scheduleModel;
    if (employeeType === "Doctor") scheduleModel = DoctorSchedule;
    else if (employeeType === "Nurse") scheduleModel = NurseSchedule;
    else if (employeeType === "Caregiver") scheduleModel = CaregiverSchedule;
    else return res.status(400).json({ success: false, message: "Invalid employee type" });

    if (!Array.isArray(timeSlots) || timeSlots.length === 0 || !timeSlots.every(slot => typeof slot === "string" && slot.trim() !== "")) {
      return res.status(400).json({ success: false, message: "timeSlots must be a non-empty array of non-empty strings" });
    }

    const request = await PackageRequest.findOne({ adultId });
    if (!request) return res.status(400).json({ success: false, message: "Invalid adultId" });

    const parsedDate = dayjs(date).isValid() ? dayjs(date).toDate() : null;
    if (!parsedDate) return res.status(400).json({ success: false, message: "Invalid date format. Use YYYY-MM-DD (e.g., 2025-05-15)" });

    const overlappingSchedules = await Promise.all(
      timeSlots.map(async (timeSlot) => {
        const existingSchedule = await scheduleModel.findOne({
          [`${employeeType.toLowerCase()}Id`]: employeeId,
          date: parsedDate,
          timeSlot,
        });
        return existingSchedule ? timeSlot : null;
      })
    );
    const overlappingSlots = overlappingSchedules.filter(slot => slot !== null);
    if (overlappingSlots.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Schedule already exists for time slot(s): ${overlappingSlots.join(", ")}`,
      });
    }

    const schedules = await Promise.all(
      timeSlots.map(timeSlot =>
        scheduleModel.create({
          [`${employeeType.toLowerCase()}Id`]: employeeId,
          adultId,
          date: parsedDate,
          timeSlot,
          status: ["Available", "Booked", "Completed", "Cancelled"].includes(status) ? status : "Available",
          bookedBy: status === "Booked" ? adultId : null,
        })
      )
    );

    const scheduleIds = schedules.map(schedule => schedule._id);
    res.status(201).json({
      success: true,
      message: "Schedules created successfully",
      scheduleIds,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(err => err.message).join(", ");
      return res.status(400).json({ success: false, message: `Validation error: ${messages}` });
    }
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Schedule already exists for one or more time slots (duplicate key error)" });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getSchedule = async (req, res) => {
  try {
    const { employeeType, employeeId } = req.params;
    const { weeks = 5 } = req.query;
    const today = dayjs().startOf('day');
    const endDate = today.add(parseInt(weeks), 'week');

    let scheduleModel;
    if (employeeType === "Doctor") scheduleModel = DoctorSchedule;
    else if (employeeType === "Nurse") scheduleModel = NurseSchedule;
    else if (employeeType === "Caregiver") scheduleModel = CaregiverSchedule;
    else return res.status(400).json({ success: false, message: "Invalid employee type" });

    const schedules = await scheduleModel.find({
      [`${employeeType.toLowerCase()}Id`]: employeeId,
      date: { $gte: today.toDate(), $lte: endDate.toDate() },
    }).sort({ date: 1, timeSlot: 1 });

    res.status(200).json({ success: true, schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { employeeType, scheduleId, date, timeSlot, status } = req.body;

    let scheduleModel;
    if (employeeType === "Doctor") scheduleModel = DoctorSchedule;
    else if (employeeType === "Nurse") scheduleModel = NurseSchedule;
    else if (employeeType === "Caregiver") scheduleModel = CaregiverSchedule;
    else return res.status(400).json({ success: false, message: "Invalid employee type" });

    const updatedSchedule = await scheduleModel.findByIdAndUpdate(scheduleId, { date, timeSlot, status }, { new: true });

    res.status(200).json({ success: true, message: "Schedule updated successfully", updatedSchedule });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const { employeeType, scheduleId } = req.body;

    let scheduleModel;
    if (employeeType === "Doctor") scheduleModel = DoctorSchedule;
    else if (employeeType === "Nurse") scheduleModel = NurseSchedule;
    else if (employeeType === "Caregiver") scheduleModel = CaregiverSchedule;
    else return res.status(400).json({ success: false, message: "Invalid employee type" });

    await scheduleModel.findByIdAndDelete(scheduleId);

    res.status(200).json({ success: true, message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};