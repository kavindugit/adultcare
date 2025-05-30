import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  roles: {
    caregivers: {
      type: Boolean,
      default: true,
    },
    nurses: {
      type: Boolean,
      default: true,
    },
    doctors: {
      type: Boolean,
      default: true,
    },
  },
  extraServices: {
    transport: {
      type: Boolean,
      default: false,
    },
    extraCaregiverAssignments: {
      type: Boolean,
      default: false,
    },
  },
}, { timestamps: true });

const Parcel = mongoose.model("Parcel", parcelSchema);

export default Parcel;