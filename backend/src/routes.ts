import express from "express";
import { getAllCompaniesData } from "./controllers/companiesController";
import { getCompanyProfile } from "./controllers/profileController";
import { getCompanyPrice } from "./controllers/priceController";
const router = express.Router();

router.get("/companies", (req, res) => getAllCompaniesData(req, res));
router.get("/profile", (req, res) => getCompanyProfile(req, res));
router.get("/price", (req, res) => getCompanyPrice(req, res));

export default router;
