import express from "express";
import { signup, signin, allUser, createUser,editUser, deleteUser,addGamePoint,getGamePoint } from "../controllers/user.js";
import { validateUser, validateUserSignUp } from "../middleware/auth.js";
import {authenticateToken} from "../middleware/auth.js";
const router = express.Router();


router.post("/login",validateUser, signin);
router.post("/register",validateUserSignUp, signup);
router.post("/createUser",createUser);
router.get("/getUser",allUser);
router.put("/editUser/:id",editUser);
router.delete("/deleteUser/:id",deleteUser);
router.put("/addGamePoint",addGamePoint);
router.get("/getGamePoint/:id",getGamePoint);

export default router;