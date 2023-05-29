import { prisma } from "..";
import { readCompanyProfile } from "../database/prisma";

export const getCompanyProfile = async (req, res) => {
  try {
    const symbol = req.query.symbol.toString().toUpperCase();
    const companyProfile = await readCompanyProfile(prisma, symbol);
    res.status(200).json(companyProfile);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
