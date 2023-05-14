import { prisma } from "..";
import { readCompanyProfile } from "../prisma";

export const getCompanyProfile = async (req, res) => {
  const everySymbolLength = 3;
  try {
    const symbol = req.query.symbol.toString().toUpperCase();
    if (symbol.length === everySymbolLength) {
      const companyProfile = await readCompanyProfile(prisma, symbol);
      res.status(200).json(companyProfile);
    } else res.status(418).json({ error: "Invalid symbol" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
