import express from "express";
import { auth } from "../controllers/authControllers.js";
const router = express.Router();

router.get("/auth", auth);

export default router;