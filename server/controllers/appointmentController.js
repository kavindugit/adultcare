// server/controllers/appointmentController.js
import Appointment from "../models/appointmentModel.js";

export const createAppointment = async (req, res) => {
  try {
    const { name, age, email, date, slot, sessionType, note } = req.body;

    if (!name || !age || !email || !date || !slot || !sessionType) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const appointment = new Appointment({
      name,
      age,
      email,
      date,
      slot,
      sessionType,
      note,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Server error. Could not create appointment." });
  }
};
