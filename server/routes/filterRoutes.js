import express from "express";
const router = express.Router();
import { filterAddList, userFilterList, filterRemove, userDetails, filterUpdate } from "../controllers/filterControllers.js"

router.post("/add", filterAddList);

router.post("/list", userFilterList);

router.delete("/remove/:id", filterRemove);

router.get("/listDetails/:id", userDetails);

router.put("/filterUpdate/:id", filterUpdate);

export default router;