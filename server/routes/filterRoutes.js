import express from "express";
const router = express.Router();
import { filterAddList } from "../controllers/filterControllers.js"

router.post("/add", filterAddList);

export default router;