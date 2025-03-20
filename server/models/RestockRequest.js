const RestockRequestSchema = new mongoose.Schema({
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
    quantityRequested: Number,
    status: { type: String, enum: ['Pending', 'Approved', 'Completed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('RestockRequest', RestockRequestSchema);