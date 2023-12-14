import express from "express";
import { accessToken } from "../controllers/accessTokenControllers.js";
const router = express.Router();

router.get("", accessToken);

export default router;