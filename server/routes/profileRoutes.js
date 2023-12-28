import express from "express";
import { profileUpdate } from "../controllers/profileControllers.js";
const router = express.Router();

router.put("/update/:id", profileUpdate);

export default router;