import express from "express";
import { webflowAuth, webflowAuthorized,webflowAuthorizedBy, webflowRegister, webflowLogin  } from "../controllers/webflowAuthControllers.js";
const router = express.Router();

router.get("/auth", webflowAuth);

router.post("/callback", webflowAuthorized);

router.post("/webflowAuthorizedUser", webflowAuthorizedBy);

router.post("/register", webflowRegister);

router.post("/login", webflowLogin);

export default router;