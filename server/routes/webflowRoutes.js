import express from "express";
const router = express.Router();
import { Publishsite, ListSite, ListCollections, ListCollectionItems, GetSite, GetCollectionItem, GetCollectionDetails } from "../controllers/webflowControllers.js";

router.post("/Publishsite", Publishsite);

router.post("/ListSite", ListSite);

router.post("/ListCollections", ListCollections);

router.post("/ListCollectionItems", ListCollectionItems);

router.post("/GetSite", GetSite);

router.post("/GetCollectionItem", GetCollectionItem);

router.post("/GetCollectionDetails", GetCollectionDetails);

export default router;