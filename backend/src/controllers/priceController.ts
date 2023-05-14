import { prisma } from "..";
import { readCompanyPrice } from "../prisma";

export const getCompanyPrice = async (req, res) => {
  try {
    if (req.query.period === undefined) {
      res.status(418).json({ error: "period undefined" });
    } else if (req.query.symbol === undefined) {
      res.status(418).json({ error: "symbol undefined" });
    } else {
      const period = parseInt(req.query.period.toString(), 10);
      const symbol = req.query.symbol.toString().toUpperCase();
      const companyPrices = await readCompanyPrice(prisma, symbol, period);
      res.json(companyPrices);
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error," });
  }
};
