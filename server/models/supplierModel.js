import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    medicineSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }], // Reference to Stock model
}, {timestamps: true}
);

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;