import express from "express";
import { addGame, getGame,editGame,deleteGame,getAllGames } from "../controllers/game.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();


router.post("/addGame", addGame);
router.get("/getGame/:id", getGame);
router.get("/getAllGames",getAllGames);
// router.get("/getResortGame", getResortGame);
router.put("/editGame/:id", editGame);
router.delete("/deleteGame/:id", deleteGame);

export default router;
