import express from "express";
import { getAccessToken } from "../controllers/authControllers.js";
const router = express.Router();

router.post("/getAccessToken", getAccessToken);

export default router;