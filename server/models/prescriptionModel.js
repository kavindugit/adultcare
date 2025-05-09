import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  patient: {
    type: String,
    required: true,
  },
  prescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Prepared'],
    default: 'Pending',
  },
  medicines: [{
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stock',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  preparedBy: {
    type: String
  },
  preparedAt: {
    type: Date
  }
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;