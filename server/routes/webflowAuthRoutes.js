import express from "express";
import { webflowAuth, webflowAuthCallback } from "../controllers/webflowAuthControllers.js";
const router = express.Router();

router.get("/authorize", webflowAuth);

router.get("/callback", webflowAuthCallback);

export default router;