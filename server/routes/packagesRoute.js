import express from "express";
import {
  addParcel,
  getAllParcels,
  getParcel,
  updateParcel,
  deleteParcel,
  createPackageRequest,
  getPendingPackageRequests,
} from "../controllers/parcelController.js"; 

const parcelRouter = express.Router();

parcelRouter.post("/request", createPackageRequest);
parcelRouter.get("/pending", getPendingPackageRequests);

// Route to get all parcels
parcelRouter.get("/all", getAllParcels);

// Route to add a new parcel
parcelRouter.post("/add", addParcel);

// Route to get a specific parcel by id
parcelRouter.get("/:id", getParcel);

// Route to update an existing parcel by id
parcelRouter.put("/:id", updateParcel);

// Route to delete a parcel by id
parcelRouter.delete("/:id", deleteParcel);



export default parcelRouter;
