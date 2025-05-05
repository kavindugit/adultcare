import express from "express";
import { addInventryItem, deleteInventoryItem, getAllInventory, updateInventoryItem } from "../controllers/stockController.js";

const router = express.Router();

router.post("/add", addInventryItem);
router.get("/get-stock", getAllInventory);
router.put("/update-stock/:id", updateInventoryItem);
router.delete("/delete-stock/:id", deleteInventoryItem);


export default router;
