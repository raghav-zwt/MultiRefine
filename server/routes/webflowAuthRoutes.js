import express from "express";
import { webflowAuth, webflowAuthCallback } from "../controllers/webflowAuthControllers.js";
const router = express.Router();

router.get("", webflowAuth);

router.get("/webflow-auth-callback", webflowAuthCallback);

export default router;