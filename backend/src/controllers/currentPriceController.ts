import { prisma } from "..";
import { readCurrentPrice } from "../prisma";

export const getCurrentPrice = async (req, res) => {
  try {
    if (req.query.symbol === undefined) {
      res.status(418).json({ error: "symbol undefined" });
    } else {
      const symbol = req.query.symbol.toString().toUpperCase();
      const currentPrice = await readCurrentPrice(prisma, symbol);
      res.json(currentPrice);
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error," });
  }
};
