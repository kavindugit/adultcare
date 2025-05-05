// @ts-nocheck
// controllers/reservationController.js
import Reservation from '../models/reservationModel.js';
import transporter from '../config/nodemaler.js';
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.json({ message: 'Reservation cancelled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const confirmReservation = async (req, res) => {
    try {
      const { patientName,age, patientEmail, specialization,date, doctorName, note, doctorId} = req.body;


      //doctorId
      //booked :[ ]timeslot add , available: [ ]timeslot remove

      
  
      // Create new reservation (MongoDB will generate _id)
      const newReservation = await Reservation.create({
        patientName,
        serviceName,
        date,
        patientEmail,
        startTime,
      });
  
      // Update the status to 'confirmed' using the generated _id
      const reservation = await Reservation.findByIdAndUpdate(
        newReservation._id,
        { status: 'confirmed' },
        { new: true } // return updated doc
      );
  
      // Send email
      if (reservation) {
        await sendConfirmationEmail(
          reservation.patientEmail,
          reservation.serviceName,
          reservation.date,
          reservation.startTime
        );
      }
  
      // Respond with reservation
      res.json(reservation);
    } catch (error) {
      console.error("Reservation error:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  
  export async function sendConfirmationEmail(email, serviceName, date, startTime) {
    const text = 
      `Hello,\n\n` +
      `Your reservation for *${serviceName}* on ${new Date(date).toLocaleDateString()} ` +
      `at ${startTime} has been CONFIRMED.\n\n` +
      `Thank you for choosing us!`;
  
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Your Reservation is Confirmed',
      text
    };
  
    return transporter.sendMail(mailOptions);
  }

/// get all reservations by userId
export const getReservationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Reservation.find({ userId }).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};