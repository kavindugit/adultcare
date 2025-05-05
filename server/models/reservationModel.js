import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  serviceName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  startTime: { 
    type: String, // Using String to store time in 'HH:MM' format (e.g., "14:30")
    required: true 
  },
  endTime: { 
    type: String, 
  },
  patientName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  patientEmail: { 
    type: String, 
    required: true, 
    trim: true, 
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: { 
    type: String, 
    trim: true 
  }
}, { timestamps: true });

export default mongoose.model('Reservation', reservationSchema);
