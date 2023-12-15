import express from "express";
import { webflowAuth, webflowAuthorized } from "../controllers/webflowAuthControllers.js";
const router = express.Router();

router.get("/auth", webflowAuth);

router.post("/callback", webflowAuthorized);

router.post("/callback", webflowAuthorized);

export default router;