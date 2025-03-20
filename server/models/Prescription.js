import mongoose from 'mongoose';
import QRCode from 'qrcode';

const PrescriptionSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicines: [{
        name: String,
        quantity: Number,
        price: Number
    }],
    totalAmount: Number,
    status: { type: String, enum: ['Pending', 'Processed', 'Completed'], default: 'Pending' },
    qrCode: String,
    createdAt: { type: Date, default: Date.now }
});

PrescriptionSchema.pre('save', async function (next) {
    if (!this.qrCode) {
        this.qrCode = await QRCode.toDataURL(`Prescription-${this._id}`);
    }
    next();
});

export default mongoose.model('Prescription', PrescriptionSchema);