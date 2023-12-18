import express from "express";
import { webflowAuth, webflowAuthorized,webflowAuthorizedBy, webflowLogin  } from "../controllers/webflowAuthControllers.js";
const router = express.Router();

router.get("/auth", webflowAuth);

router.post("/callback", webflowAuthorized);

router.post("/webflowAuthorizedUser", webflowAuthorizedBy);

router.post("/webflowLogin", webflowLogin);

export default router;