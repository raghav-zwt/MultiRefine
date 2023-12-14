import express from "express";
import { auth, authCallBack } from "../controllers/authControllers.js";
const router = express.Router();

router.get("/login", auth);

router.get("/login/auth", authCallBack);

export default router;