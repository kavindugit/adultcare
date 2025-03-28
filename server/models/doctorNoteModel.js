import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", // Reference to the Doctor model
        required: true,
    },
    adultId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Adult", // Reference to the Adult model
        required: true,
    },
    note: {
        type: [String],
        required: true,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const noteModel = mongoose.models.note || mongoose.model('DoctorNote', noteSchema);
export default noteModel;
