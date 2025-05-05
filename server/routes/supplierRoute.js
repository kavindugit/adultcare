import express from "express";
import { createSupplier, deleteSupplier, getAllSuppliers, updateSupplier } from "../controllers/supplierController.js";

const router = express.Router();

router.post("/add", createSupplier);
router.get("/get-suppliers", getAllSuppliers);
router.put("/update-supplier/:id", updateSupplier);
router.delete("/delete-supplier/:id", deleteSupplier);

export default router;