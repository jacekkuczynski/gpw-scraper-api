import express from "express";
import { getAllCompaniesData } from "./controllers/companiesController";
import { getCompanyProfile } from "./controllers/profileController";
import { getChartPrices } from "./controllers/priceController";
import { getCurrentPrice } from "./controllers/currentPriceController";
import { getMultiplePrice } from "./controllers/multiplePriceController";
const router = express.Router();

router.get("/companies", (req, res) => getAllCompaniesData(req, res));
router.get("/profile", (req, res) => getCompanyProfile(req, res));
router.get("/price", (req, res) => getChartPrices(req, res));
router.get("/currentPrice", (req, res) => getCurrentPrice(req, res));
router.get("/multiplePrice", (req, res) => getMultiplePrice(req, res));

export default router;
