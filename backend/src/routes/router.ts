import { Router } from "express";
import { deleteData, getAadharList, ocrController, saveData } from "../controllers/ocrController";

const router = Router();

router.post("/parse-aadhaar", ocrController);
router.post("/save-data", saveData)
router.get("/aadhar-list", getAadharList);
router.delete("/delete-data", deleteData)

export default router