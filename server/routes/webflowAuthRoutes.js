import express from "express";
import { webflowAuth } from "../controllers/webflowAuthControllers.js";
const router = express.Router();

router.get("/webflow-auth", webflowAuth);

export default router;