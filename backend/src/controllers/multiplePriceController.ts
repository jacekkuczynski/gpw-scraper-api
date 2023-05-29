import { prisma } from "..";
import { readMultipleCurrentPrice } from "../database/prisma";

export const getMultiplePrice = async (req, res) => {
  const symbols = req.query.symbols.toUpperCase().split(",");

  try {
    if (req.query.symbols === undefined) {
      res.status(418).json({ error: "symbols undefined" });
    } else {
      const currentPrices = await readMultipleCurrentPrice(prisma, symbols);
      res.json(currentPrices);
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error," });
  }
};
