import express from "express";
import { webflowAuth, webflowAuthorized,webflowAuthorizedBy, webflowRegister, webflowLogin, getToken  } from "../controllers/authControllers.js";
const router = express.Router();

router.get("/auth", webflowAuth);

router.get("/callback", webflowAuthorized);

router.post("/webflowAuthorizedUser", webflowAuthorizedBy);

router.post("/register", webflowRegister);

router.post("/login", webflowLogin);

router.post("/getToken/:id", getToken);

export default router;