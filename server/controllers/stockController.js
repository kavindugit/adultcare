import Stock from "../models/stockModel.js";

export const addInventryItem = async (req, res) => {
    try {
        const { medicineName, quantity, price, restockThereshold } = req.body;
        const newItem = new Stock({ medicineName, quantity, price, restockThereshold });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error('Error adding inventory item:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getAllInventory = async (req, res) => {
    try {
        const inventoryItems = await Stock.find();
        res.status(200).json(inventoryItems);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: error.message });
    }
};

export const updateInventoryItem = async (req, res) => {
    try {
        const updatedItem = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Inventory item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating inventory item:', error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteInventoryItem = async (req, res) => {
    try {
        const deletedItem = await Stock.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Inventory item not found' });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        res.status(500).json({ error: error.message });
    }
};