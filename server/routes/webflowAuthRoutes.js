import express from "express";
import { webflowAuth, webflowAuthorized } from "../controllers/webflowAuthControllers.js";
const router = express.Router();

router.get("/auth", webflowAuth);

router.get("/callback", webflowAuthorized);


export default router;