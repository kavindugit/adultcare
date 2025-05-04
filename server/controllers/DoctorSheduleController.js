import mongoose from "mongoose";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday.js"; // ✅ Fix
import DoctorModel from "../models/doctorModel.js";
import FullTimeScheduleModel from "../models/FullTimeSheduleModel.js";
import UserModel from "../models/userModel.js";

dayjs.extend(weekday);
const FULL_DAY_SLOTS = [
  "08:00–10:00",
  "10:00–12:00",
  "12:00–14:00",
  "14:00–16:00",
  "16:00–18:00"
];
k


const weekdaysMap = {
  "Sunday": 0,
  "Monday": 1,
  "Tuesday": 2,
  "Wednesday": 3,
  "Thursday": 4,
  "Friday": 5,
  "Saturday": 6,
};

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const getDoctorAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // ✅ Lookup by userId instead of MongoDB _id
    const doctor = await DoctorModel.findOne({ userId: doctorId });
    if (!doctor || doctor.availableWorkingHours !== "Full Time") {
      return res.status(400).json({ message: "Doctor not found or not Full-Time" });
    }

    const today = dayjs().startOf('week').add(1, 'day'); // Monday
    const weekDates = Array.from({ length: 5 }, (_, i) => today.add(i, 'day'));

    const startDate = weekDates[0].toDate();
    const endDate = weekDates[4].endOf('day').toDate();

    const sessions = await FullTimeScheduleModel.find({
      doctorId: doctor.userId, // now use Mongo ID to query schedule
      date: { $gte: startDate, $lte: endDate }
    });

    const availabilityMap = {};

    for (let i = 0; i < 5; i++) {
      const day = weekdays[i];
      const currentDate = weekDates[i].format("YYYY-MM-DD");

      const bookedSlots = sessions
        .filter(s => dayjs(s.date).format("YYYY-MM-DD") === currentDate)
        .map(s => s.timeSlot);

      const availableSlots = FULL_DAY_SLOTS.filter(slot => !bookedSlots.includes(slot));

      availabilityMap[day] = {
        booked: bookedSlots,
        available: availableSlots
      };
    }

    res.json({ doctorId, availability: availabilityMap });
  } catch (err) {
    console.error("Availability Error:", err);
    res.status(500).json({ message: "Server error fetching availability" });
  }
};

export const assignDoctorSession = async (req, res) => {
    try {
      const {
        doctorUserId,
        adultId,
        day,              // ✅ "Monday", "Friday", etc.
        timeSlot,
        assignedBy,
        packageId
      } = req.body;
  
      // ✅ Validate day name
      if (!weekdaysMap.hasOwnProperty(day)) {
        return res.status(400).json({ message: "Invalid day name" });
      }
  
      // ✅ Find doctor by userId
      const doctor = await DoctorModel.findOne({ userId: doctorUserId });
      if (!doctor || doctor.availableWorkingHours !== "Full Time") {
        return res.status(400).json({ message: "Doctor not found or not Full-Time" });
      }
  
      // ✅ Find assignedBy user by userId
      const adminUser = await UserModel.findOne({ userId: assignedBy });
      if (!adminUser) {
        return res.status(404).json({ message: "AssignedBy user not found" });
      }
  
      // ✅ Find next upcoming date for the given day name
      const today = dayjs();
      const targetWeekday = weekdaysMap[day];
      const targetDate = today.day() <= targetWeekday
        ? today.day(targetWeekday)
        : today.add(1, 'week').day(targetWeekday);
  
      const formattedDate = targetDate.startOf('day').toDate();
  
      // ✅ Check if already booked
      const existing = await FullTimeScheduleModel.findOne({
        doctorId: doctor.userId,
        date: formattedDate,
        timeSlot
      });
  
      if (existing) {
        return res.status(409).json({ message: "Doctor already booked for this slot" });
      }
  
      // ✅ Save schedule
      const newSchedule = await FullTimeScheduleModel.create({
        doctorId: doctor.userId,
        adultId,
        date: formattedDate,
        timeSlot,
        assignedBy: adminUser._id,
        packageId
      });
  
      res.status(201).json({
        success: true,
        message: "Session assigned successfully",
        schedule: newSchedule
      });
  
    } catch (err) {
      console.error("Error assigning session:", err);
      res.status(500).json({ message: "Server error assigning session" });
    }
  };