import mongoose from "mongoose";

const PackageRequestSchema = new mongoose.Schema({
  guardianId: {
    type: String,
    required: true,
  },
  packageId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  }
}, { timestamps: true });

const PackageRequest = mongoose.model("PackageRequest", PackageRequestSchema);

export default PackageRequest;
