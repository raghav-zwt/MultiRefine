import express from "express";
import { auth, authCallback } from "../controllers/authControllers.js";
const router = express.Router();

router.get("/auth", auth);

router.get("/login", authCallback);

export default router;