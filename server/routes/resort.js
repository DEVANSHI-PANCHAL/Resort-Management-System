import express from "express";
import { addResort, getResort,editResort,deleteResort, getAvailableResort } from "../controllers/resort.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();


router.post("/addResort", addResort);
router.get("/getResort", getResort);
router.get("/getAvailableResort", getAvailableResort);
router.put("/editResort/:id", editResort);
router.delete("/deleteResort/:id", deleteResort);

export default router;
