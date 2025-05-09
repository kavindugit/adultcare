import Appointment from "../models/AppointmentModel.js";

export const createAppointment = async (req, res) => {
  try {
    const { patientName, age, patientEmail, date, serviceName, note, doctorName } = req.body;

    // Map frontend fields to model fields
    const name = patientName;
    const email = patientEmail;
    const sessionType = serviceName;

    if (!name || !age || !email || !date || !sessionType) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    const appointment = new Appointment({
      name,
      age,
      email,
      date,
      sessionType,
      note,
      // doctorName is sent but will be ignored by Mongoose since it's not in the schema
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully!" });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Server error. Could not create appointment." });
  }
};