import DoctorSchedule from "../models/DoctorSchedule.js";
import NurseSchedule from "../models/NurseSchedule.js";
import CaregiverSchedule from "../models/CaregiverSchedule.js";
import User from "../models/userModel.js";
import dayjs from "dayjs";

// Create schedule for an employee (Doctor, Nurse, or Caregiver)
export const createSchedule = async (req, res) => {
  try {
    const { employeeType, employeeId, date, timeSlot, status = "Available" } = req.body;

    let scheduleModel;
    if (employeeType === "Doctor") scheduleModel = DoctorSchedule;
    else if (employeeType === "Nurse") scheduleModel = NurseSchedule;
    else if (employeeType === "Caregiver") scheduleModel = CaregiverSchedule;
    else return res.status(400).json({ success: false, message: "Invalid employee type" });

    // Prevent overlapping schedules
    const existingSchedule = await scheduleModel.findOne({
      [`${employeeType.toLowerCase()}Id`]: employeeId,
      date,
      timeSlot
    });

    if (existingSchedule) {
      return res.status(400).json({ success: false, message: "Schedule already exists for this time slot" });
    }

    const schedule = await scheduleModel.create({
      [`${employeeType.toLowerCase()}Id`]: employeeId,
      date,
      timeSlot,
      status,
    });

    res.status(201).json({ success: true, message: "Schedule created successfully", schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get Schedule (Available + Booked Slots) for any duration
export const getSchedule = async (req, res) => {
  try {
    const { employeeType, employeeId } = req.params;
    const { weeks = 5 } = req.query; // Default to 5 weeks if not specified
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

// Update Schedule
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

// Delete Schedule
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
