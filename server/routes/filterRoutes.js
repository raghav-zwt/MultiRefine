import express from "express";
const router = express.Router();
import { filterAddList, userFilterList } from "../controllers/filterControllers.js"

router.post("/add", filterAddList);

router.get("/userfilter", userFilterList);

export default router;