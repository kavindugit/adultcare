import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({  
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true,
     },  
    adultId: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
        default: '',
    },
    noteType: {
        type: String,
        required: true,
        default: 'Prescription',
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

const noteModel = mongoose.models.note || mongoose.model('Note', noteSchema);
export default noteModel;
