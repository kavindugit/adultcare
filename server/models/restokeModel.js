import mongoose from "mongoose";

const restokeSchema = new mongoose.Schema({
    medicineName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    Notes: {
        type: String,
    },

    status:{
        type: String,
        enum : ['Pending','Completed'],
        default: 'Pending'
    },

    createdAt:{
        type: Date,
        default: Date.now
    }

     // Reference to Stock model
}, {timestamps: true}
);

const Restoke = mongoose.model('Restoke', restokeSchema);

export default Restoke;