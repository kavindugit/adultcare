import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    medicineName: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    restockThereshold: {
        type: Number,
        required: true,
    },
}, {timestamps: true}
);

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;