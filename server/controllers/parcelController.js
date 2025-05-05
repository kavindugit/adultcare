import Parcel from "../models/Parcel.js";

// Create a new parcel/package
export const addParcel = async (req, res) => {
  const { id, name, description, duration, price, roles, extraServices } = req.body;

  try {
    if (!id || !name || !description || !duration || !price) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    const newParcel = new Parcel({
      id,
      name,
      description,
      duration,
      price,
      roles: {
        caregivers: roles?.caregivers ?? true,
        nurses: roles?.nurses ?? true,
        doctors: roles?.doctors ?? true,
      },
      extraServices: {
        transport: extraServices?.transport ?? false,
        extraCaregiverAssignments: extraServices?.extraCaregiverAssignments ?? false,
      },
    });

    await newParcel.save();

    res.status(201).json({ message: "Parcel Added Successfully", data: newParcel });
  } catch (error) {
    console.error("Error adding parcel:", error);
    res.status(500).json({ message: "Error Adding Parcel" });
  }
};

// Get all parcels
export const getAllParcels = async (req, res) => {
  try {
    const allParcels = await Parcel.find();

    if (allParcels.length === 0) {
      return res.status(404).json({ message: "No Parcels Found" });
    }

    res.status(200).json({ message: "Parcels Found", data: allParcels });
  } catch (error) {
    console.error("Error fetching parcels:", error);
    res.status(500).json({ message: "Error Fetching Parcels" });
  }
};

// Get a specific parcel by id
export const getParcel = async (req, res) => {
  const { id } = req.params;

  try {
    const parcel = await Parcel.findById(id);

    if (!parcel) {
      return res.status(404).json({ message: "Parcel Not Found" });
    }

    res.status(200).json({ message: "Parcel Found", data: parcel });
  } catch (error) {
    console.error("Error fetching parcel:", error);
    res.status(500).json({ message: "Error Fetching Parcel" });
  }
};

// Update a parcel by id
export const updateParcel = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedParcel = await Parcel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedParcel) {
      return res.status(404).json({ message: "Parcel Not Found" });
    }

    res.status(200).json({ message: "Parcel Updated Successfully", data: updatedParcel });
  } catch (error) {
    console.error("Error updating parcel:", error);
    res.status(500).json({ message: "Error Updating Parcel" });
  }
};

// Delete a parcel by id
export const deleteParcel = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedParcel = await Parcel.findByIdAndDelete(id);

    if (!deletedParcel) {
      return res.status(400).json({ message: "Parcel Not Found or Already Deleted" });
    }

    res.status(200).json({ message: "Parcel Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting parcel:", error);
    res.status(500).json({ message: "Error Deleting Parcel" });
  }
};
