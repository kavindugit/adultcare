import express from "express";
import { getAllRestoke, restokeItem, updateRestokeStatus } from "../controllers/restokeController.js";

const router = express.Router();

router.post("/add", restokeItem);
router.get("/get-restoke", getAllRestoke);
router.patch("/update-status/:id", updateRestokeStatus);



export default router;
 