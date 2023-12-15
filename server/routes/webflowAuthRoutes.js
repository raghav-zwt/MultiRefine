import express from "express";
import { webflowAuth, webflowAuthorized,webflowAuthorizedBy  } from "../controllers/webflowAuthControllers.js";
const router = express.Router();

router.get("/auth", webflowAuth);

router.post("/callback", webflowAuthorized);

router.post("/webflowAuthorizedUser", webflowAuthorizedBy);

export default router;