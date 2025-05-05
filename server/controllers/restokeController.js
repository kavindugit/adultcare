import Restoke from "../models/restokeModel.js";
import Stock from "../models/stockModel.js";

// POST /add
export const restokeItem = async (req, res) => {
    try {
        const { medicineName, quantity, Notes } = req.body;

        if (!medicineName || !quantity) {
            return res.status(400).json({ message: "Medicine name and quantity are required." });
        }

        const newRestoke = new Restoke({
            medicineName,
            quantity,
            Notes
        });

        await newRestoke.save();
        res.status(201).json({ message: "Restoke item added successfully", data: newRestoke });
    } catch (error) {
        console.error("Error adding restoke item:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// GET /get-restoke
export const getAllRestoke = async (req, res) => {
    try {
        const restokeList = await Restoke.find()
            .populate("medicineName")
            .sort({ createdAt: -1 });

        res.status(200).json({ data: restokeList });
    } catch (error) {
        console.error("Error fetching restoke list:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// PATCH /update-status/:id
export const updateRestokeStatus = async (req, res) => {
    try {
        const restokeId = req.params.id;
        const { status } = req.body;

        if (status !== "Completed") {
            return res.status(400).json({ message: "Only status 'Completed' is allowed for update." });
        }

        const restokeItem = await Restoke.findById(restokeId);
        if (!restokeItem) {
            return res.status(404).json({ message: "Restoke item not found" });
        }

        if (restokeItem.status === "Completed") {
            return res.status(400).json({ message: "Restoke item is already marked as Completed." });
        }

        // Update stock quantity
        const stockItem = await Stock.findById(restokeItem.medicineName);
        if (!stockItem) {
            return res.status(404).json({ message: "Related stock item not found" });
        }

        stockItem.quantity += restokeItem.quantity;
        await stockItem.save();

        // Update restoke status
        restokeItem.status = "Completed";
        await restokeItem.save();

        res.status(200).json({ message: "Restoke status updated and stock quantity adjusted successfully." });
    } catch (error) {
        console.error("Error updating restoke status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
