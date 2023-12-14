import express from "express";
import { getAccessToken } from "../controllers/authControllers.js";
const router = express.Router();

router.get("/getAccessToken", getAccessToken);

export default router;