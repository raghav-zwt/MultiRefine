import express from "express";
const router = express.Router();
import { filterAddList, userFilterList, filterCss, filterRemove, userDetails, filterUpdate, getFilterCss, embeddedCode } from "../controllers/filterControllers.js"

router.post("/add", filterAddList);

router.post("/list", userFilterList);

router.delete("/remove/:id", filterRemove);

router.get("/listDetails/:id", userDetails);

router.put("/filterUpdate/:id", filterUpdate);

router.post("/filterCss/:id", filterCss);

router.get("/getFilterCss/:id", getFilterCss);

router.get("/embedded_code/:user_id=:user_id&id=:id", embeddedCode);

export default router;